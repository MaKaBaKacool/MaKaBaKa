import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as d,c as s,a as n,b as t,d as r,e as o}from"./app-58e4a7d6.js";const l={},p=n("p",null,"参考阅读：",-1),c={href:"https://github.com/OA-HUNTER/TongDa-OA.git",target:"_blank",rel:"noopener noreferrer"},m=o(`<h2 id="通达oa信息收集" tabindex="-1"><a class="header-anchor" href="#通达oa信息收集" aria-hidden="true">#</a> 通达OA信息收集</h2><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http[s]://TongDaOA.domain/inc/expired.php 判断通达版本
http[s]://TongDaOA.domain/inc/reg_trial.php
http[s]://TongDaOA.domain/inc/reg_trial_submit.php
http[s]://TongDaOA.domain/ispirit/retrieve_pwd.php
GET 参数username、email 可爆用户、邮箱
http[s]://TongDaOA.domain/resque/worker.php 计算机名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2013-2017-sqli-path" tabindex="-1"><a class="header-anchor" href="#_2013-2017-sqli-path" aria-hidden="true">#</a> 2013-2017(SQLi path)</h2><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http[s]://TongDaOA.domain/module/crm2010/imageOperation/deleteImage.php 
http[s]://TongDaOA.domain/module/crm2010/product/type_tree.php 
http[s]://TongDaOA.domain/module/crm2010/select/getData.php 
http[s]://TongDaOA.domain/module/crm2010/select/getValue.php 
http[s]://TongDaOA.domain/module/crm2010/select/index.php 
http[s]://TongDaOA.domain/module/crm2010/share/update.php 
http[s]://TongDaOA.domain/portal/webportals/source/oa/news.php
http[s]://TongDaOA.domain/portal/webportals/source/oa/notify.php?LOGIN_USER_ID=
http[s]://TongDaOA.domain/task/crm/account_care_remind.php
http[s]://TongDaOA.domain/task/crm/action_link_remind.php
http[s]://TongDaOA.domain/task/crm/contract_birthday_remind.php
http[s]://TongDaOA.domain/task/crm/contract_near_remind.php
http[s]://TongDaOA.domain/task/crm/contract_remind.php
http[s]://TongDaOA.domain/task/crm/crm_account_contact_bir_remind.php
http[s]://TongDaOA.domain/task/crm/crm_complain_remind.php
http[s]://TongDaOA.domain/task/crm/crm_opportunity_status_remind.php
http[s]://TongDaOA.domain/task/crm/crm_salepay_remind.php
http[s]://TongDaOA.domain/task/crm/crm_stockout_remind.php
http[s]://TongDaOA.domain/task/crm/marketing_near_remind.php
http[s]://TongDaOA.domain/task/crm/order_to_stockout_remind.php
http[s]://TongDaOA.domain/task/crm/payment_near_remind.php
http[s]://TongDaOA.domain/task/crm/storage_near_remind.php
http[s]://TongDaOA.domain/ispirit/myoa.php
http[s]://TongDaOA.domain/ispirit/retrieve_pwd.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v11-v11-6-0day" tabindex="-1"><a class="header-anchor" href="#v11-v11-6-0day" aria-hidden="true">#</a> v11~v11.6 [0day]</h2><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http[s]://TongDaOA.domain/general/approve_center/list/roll_config.inc.php
http[s]://TongDaOA.domain/general/bi_design/reportshop/report_bi.func.php
http[s]://TongDaOA.domain/general/data_center/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/data_center/model_design/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/data_center/model_design/design/report/action.php
http[s]://TongDaOA.domain/general/reportshop/design/report/action.php
http[s]://TongDaOA.domain/general/project/portal/details/budget/table.php
http[s]://TongDaOA.domain/general/reportshop/design/report/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/reportshop/workshop/report/attachment-remark/form3.php
http[s]://TongDaOA.domain/general/system/user/get_key_user_info.php
http[s]://TongDaOA.domain/general/workflow/list/roll_config.inc.php
http[s]://TongDaOA.domain/interface/GetNewAPP.php
http[s]://TongDaOA.domain/interface/GetNewAPP1.php
http[s]://TongDaOA.domain/general/workflow/plugin/turn/kd_k3_applly/kd_k3_applly.php
http[s]://TongDaOA.domain/general/workflow/document_list/roll_config.inc.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v11-6-rce" tabindex="-1"><a class="header-anchor" href="#v11-6-rce" aria-hidden="true">#</a> v11.6 [RCE]</h2><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>http[s]://TongDaOA.domain/module/appbuilder/assets/print.php 任意文件删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8);function h(v,u){const e=i("ExternalLinkIcon");return d(),s("div",null,[p,n("ul",null,[n("li",null,[n("a",c,[t("通达OA漏洞一些漏洞点(Github)"),r(e)])])]),m])}const b=a(l,[["render",h],["__file","通达OA 部分漏洞信息整合.html.vue"]]);export{b as default};
