import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as l,c as r,a as e,b as i,d,e as s}from"./app-58e4a7d6.js";const o={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),i(" 漏洞描述")],-1),g=e("p",null,"泛微OA sysinterface/codeEdit.jsp 页面任意文件上传导致可以上传恶意文件。",-1),b=e("p",null,"参考阅读：",-1),u={href:"https://www.uedbox.com/post/15730/",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="漏洞版本" tabindex="-1"><a class="header-anchor" href="#漏洞版本" aria-hidden="true">#</a> 漏洞版本</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>较老版本，目前无准确版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>filename=******5308.java&amp;filetype=javafilename为文件名称 为空时会自动创建一个
String fileid = &quot;Ewv&quot;;&lt;br&gt;
    String readonly = &quot;&quot;;&lt;br&gt;
    boolean isCreate = false;&lt;br&gt;
    if(StringHelper.isEmpty(fileName)) {&lt;br&gt;
     Date ndate = new Date();&lt;br&gt;
     SimpleDateFormat sf = new SimpleDateFormat(&quot;yyyyMMddHHmmss&quot;);&lt;br&gt;
     String datetime = sf.format(ndate);&lt;br&gt;
     fileid = fileid + datetime;&lt;br&gt;
     fileName= fileid + &quot;.&quot; + filetype;&lt;br&gt;
     isCreate = true;&lt;br&gt;
    } else {&lt;br&gt;
        int pointIndex = fileName.indexOf(&quot;.&quot;);&lt;br&gt;
        if(pointIndex &gt; -1) {&lt;br&gt;
            fileid = fileName.substring(0,pointIndex);&lt;br&gt;
        }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091045304.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091045317.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091045310.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091045312.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091045316.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,9);function p(f,v){const t=n("ExternalLinkIcon");return l(),r("div",null,[c,g,b,e("ul",null,[e("li",null,[e("a",u,[i("泛微OA未授权可导致GetShell"),d(t)])])]),m])}const x=a(o,[["render",p],["__file","泛微OA sysinterfacecodeEdit.jsp 任意文件上传漏洞.html.vue"]]);export{x as default};
