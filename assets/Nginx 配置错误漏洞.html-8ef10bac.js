import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as r,a,b as e,d as o,e as d}from"./app-58e4a7d6.js";const l={},c=d(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Vulhub运行成功后，Nginx将会监听8080/8081/8082三个端口，分别对应三种漏洞。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><h3 id="错误1-crlf注入漏洞" tabindex="-1"><a class="header-anchor" href="#错误1-crlf注入漏洞" aria-hidden="true">#</a> 错误1 CRLF注入漏洞</h3><p>Nginx会将<code>$uri</code>进行解码，导致传入<code>%0a%0d</code>即可引入换行符，造成CRLF注入漏洞。</p><p>错误的配置文件示例（原本的目的是为了让http的请求跳转到https上）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location / {
    return 302 https://$host$uri;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Payload: <code>http://your-ip:8080/%0a%0dSet-Cookie:%20a=1</code>，可注入Set-Cookie头。</p>`,9),u={href:"https://www.leavesongs.com/PENETRATION/bottle-crlf-cve-2016-9964.html",target:"_blank",rel:"noopener noreferrer"},h=d(`<h3 id="错误2-目录穿越漏洞" tabindex="-1"><a class="header-anchor" href="#错误2-目录穿越漏洞" aria-hidden="true">#</a> 错误2 目录穿越漏洞</h3><p>Nginx在配置别名（Alias）的时候，如果忘记加<code>/</code>，将造成一个目录穿越漏洞。</p><p>错误的配置文件示例（原本的目的是为了让用户访问到/home/目录下的文件）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /files {
    alias /home/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Payload: <code>http://your-ip:8081/files../</code> ，成功穿越到根目录。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202272220345.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="错误3" tabindex="-1"><a class="header-anchor" href="#错误3" aria-hidden="true">#</a> 错误3</h3><p>Nginx配置文件子块（server、location、if）中的<code>add_header</code>，将会覆盖父块中的<code>add_header</code>添加的HTTP头，造成一些安全隐患。</p><p>如下列代码，整站（父块中）添加了CSP头：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>add_header Content-Security-Policy &quot;default-src &#39;self&#39;&quot;;
add_header X-Frame-Options DENY;

location = /test1 {
    rewrite ^(.*)$ /xss.html break;
}

location = /test2 {
    add_header X-Content-Type-Options nosniff;
    rewrite ^(.*)$ /xss.html break;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但<code>/test2</code>的location中又添加了<code>X-Content-Type-Options</code>头，导致父块中的<code>add_header</code>全部失效，XSS可被触发。</p>`,11);function p(v,m){const i=t("ExternalLinkIcon");return s(),r("div",null,[c,a("p",null,[e("利用《"),a("a",u,[e("Bottle HTTP 头注入漏洞探究"),o(i)]),e("》中的技巧，即可构造一个XSS漏洞。")]),h])}const _=n(l,[["render",p],["__file","Nginx 配置错误漏洞.html.vue"]]);export{_ as default};
