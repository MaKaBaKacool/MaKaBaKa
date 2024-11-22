import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as d,a as e,b as i,d as t,e as a}from"./app-58e4a7d6.js";const o={},c=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>滥用 shindig Web 应用程序的 UI 小工具加载功能可以利用此漏洞。攻击者可以更改请求中的特定 URL，从而导致服务器向更改后的 URL 发起 GET 请求。通过利用此漏洞，攻击者可以使用服务器执行任意外部服务交互。这可以特别用于与内部网络的节点进行交互，否则这些节点会被网络规则隐藏在外部。攻击者可以利用它来追踪和侦察网络，除此之外，如果有内部端点对 GET 请求进行状态更改操作，那么就有可能很好地破坏它们的完整性。根据端点实施的保护级别，此漏洞的影响可能会有所不同。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WSO2 Identity Server 5.2.0 , 5.3.0 , 5.4.0 , 5.4.1 , 5.5.0 , 5.6.0 , 5.7.0
WSO2 IS as Key Manager 5.3.0 , 5.5.0 , 5.6.0 , 5.7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2>`,5),u={href:"https://github.com/wso2/product-is/releases/download/v5.6.0-rc3/wso2is-5.6.0-rc3.zip",target:"_blank",rel:"noopener noreferrer"},p=e("h2",{id:"漏洞复现",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞复现","aria-hidden":"true"},"#"),i(" 漏洞复现")],-1),g={href:"https://docs.wso2.com/display/Security/Security+Advisory+WSO2-2019-0598",target:"_blank",rel:"noopener noreferrer"},v=a(`<figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241706233.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下载源码启动环境，在IDEA中调试</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241706823.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707257.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>根据官方描述，在全局搜索 shindig 相关代码</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707162.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>打下断点，看一下访问 <code>/shindig/gadgets/js</code> 路径时代码的调用流程</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707337.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到当访问此路径时，调用了对应的 Servlet 下的 doGet方法 来处理<code>(org.apache.shindig.gadgets.servlet.JsServlet.doGet(JsServlet.java:86)</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707039.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们可以在文件 <code>conf/shindig/web.xml 找到对应的调用方法</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707053.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>看到这我们注意到 <code>org.apache.shindig.gadgets.servlet.MakeRequestServlet</code> 似乎与 Jira未授权SSRF漏洞(CVE-2019-8451) 中存在的漏洞点十分的相似</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707509.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但断点调试过程中，却发现这个点是利用失败的</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241707755.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241708844.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>只好去看一下其他的Servele , 最后我们注意到 ProxyServlet</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241708016.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包，打断点看一下处理流程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /shindig/gadgets/proxy?container=default&amp;url=https://www.baidu.com HTTP/1.1
Host: localhost:9443
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Content-Length: 0
Sec-Ch-Ua: &quot; Not A;Brand&quot;;v=&quot;99&quot;, &quot;Chromium&quot;;v=&quot;100&quot;, &quot;Google Chrome&quot;;v=&quot;100&quot;
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: &quot;macOS&quot;
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>org.apache.shindig.gadgets.servlet.ProxyServlet</code> 下的 doGet方法接收参数， 传入 <code>processRequest</code></p><p>中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private void processRequest(HttpServletRequest request, HttpServletResponse servletResponse) throws IOException {
        if (request.getHeader(&quot;If-Modified-Since&quot;) != null) {
            servletResponse.setStatus(304);
        } else {
            Uri reqUri = (new UriBuilder(request)).toUri();

            HttpResponse response;
            try {
                ProxyUri proxyUri = this.proxyUriManager.process(reqUri);
                SecurityToken st = AuthInfoUtil.getSecurityTokenFromRequest(request);
                proxyUri.setSecurityToken(st);
                proxyUri.setUserAgent(request.getHeader(&quot;User-Agent&quot;));
                if (proxyUri.getGadget() == null &amp;&amp; st != null &amp;&amp; !st.isAnonymous()) {
                    proxyUri.setGadget(st.getAppUrl());
                }

                AuthType authType = proxyUri.getAuthType();
                if (AuthType.OAUTH.equals(authType)) {
                    proxyUri.setOAuthArguments(new OAuthArguments(AuthType.OAUTH, request));
                } else if (AuthType.OAUTH2.equals(authType)) {
                    proxyUri.setOAuth2Arguments(new OAuth2Arguments(request));
                }

                String host = request.getHeader(&quot;Host&quot;);
                if (!this.lockedDomainService.isSafeForOpenProxy(host)) {
                    Uri resourceUri = proxyUri.getResource();
                    String msg = &quot;Embed request for url &quot; + (resourceUri != null ? resourceUri.toString() : &quot;n/a&quot;) + &quot; made to wrong domain &quot; + host;
                    if (LOG.isLoggable(Level.INFO)) {
                        LOG.logp(Level.INFO, classname, &quot;processRequest&quot;, &quot;embededImgWrongDomain&quot;, new Object[]{resourceUri != null ? resourceUri.toString() : &quot;n/a&quot;, host});
                    }

                    throw new GadgetException(Code.INVALID_PARAMETER, msg, 400);
                }

                if (&quot;POST&quot;.equalsIgnoreCase(request.getMethod())) {
                    StringBuffer buffer = this.getPOSTContent(request);
                    response = this.proxyHandler.fetch(proxyUri, buffer.toString());
                } else {
                    response = this.proxyHandler.fetch(proxyUri);
                }
            } catch (GadgetException var11) {
                response = ServletUtil.errorResponse(new GadgetException(var11.getCode(), var11.getMessage(), 400));
            }

            ServletUtil.copyToServletResponseAndOverrideCacheHeaders(response, servletResponse);
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向下跟进到<code>org.apache.shindig.gadgets.servlet.ProxyHandler</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241708606.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>org.apache.shindig.gadgets.servlet.ProxyHandler.fatch</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241709066.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接着向下看到 org.apache.shindig.gadgets.servlet.ProxyHandler 下的 <code>buildHttpRequest</code> 方法创建Http请求， 而目标就是我们刚刚传入的Url参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> private HttpRequest buildHttpRequest(ProxyUri uriCtx, Uri tgt, @Nullable String postBody) throws GadgetException, IOException {
        ServletUtil.validateUrl(tgt);
        HttpRequest req = uriCtx.makeHttpRequest(tgt);
        req.setRewriteMimeType(uriCtx.getRewriteMimeType());
        if (postBody != null) {
            req.setMethod(&quot;POST&quot;);
            req.setPostBody(new ByteArrayInputStream(postBody.getBytes()));
        }

        if (req.getHeader(&quot;User-Agent&quot;) == null) {
            String userAgent = uriCtx.getUserAgent();
            if (userAgent != null) {
                req.setHeader(&quot;User-Agent&quot;, userAgent);
            }
        }

        return req;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241709229.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241709438.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最后回显至页面中, 造成存在回显的SSRF</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241709588.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241709610.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,35);function b(m,h){const n=s("ExternalLinkIcon");return l(),d("div",null,[c,e("p",null,[e("a",u,[i("https://github.com/wso2/product-is/releases/download/v5.6.0-rc3/wso2is-5.6.0-rc3.zip"),t(n)])]),p,e("p",null,[i("根据官方描述，漏洞造成的原因主要是 shindig Web 应用程序的 UI 小工具的加载功能, "),e("a",g,[i("WSO2-2019-0598"),t(n)])]),v])}const q=r(o,[["render",b],["__file","WSO2 proxy SSRF漏洞 WSO2-2019-0598.html.vue"]]);export{q as default};
