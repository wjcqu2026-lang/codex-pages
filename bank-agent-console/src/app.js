const navItems = ["总览","实时会话","协同审核","Agent中心","Skill中心","工作流编排","知识体系","运行观测"];
const reviewers = [
  ["fact","事实审核Agent","智识","96","通过","green","产品要素、收益率等数据与知识一致。"],
  ["compliance","合规审核Agent","合规卫士","62","阻断","red","发现合规问题 1 处，需修改后重新审核。"],
  ["sales","销售策略Agent","销售参谋","78","建议","amber","建议补充客户风险提示，并增加对比说明。"],
  ["brand","品牌语气Agent","品牌管家","92","通过","green","语气符合品牌规范，表达友好、专业。"]
];
const flow = ["需求理解Agent","产品推荐Agent","话术生成Agent","事实审核Agent","合规审核Agent","销售策略Agent","品牌语气Agent","决策与路由"];
const draftText = `您好，李女士！根据您的需求（10万元左右、中低风险、期限不长、流动性好），为您推荐以下产品：

1. 建信现金添利：申赎灵活，七日年化约 2.68%，适合日常资金管理。
2. 稳健增利2号（30天持有）：中低风险，近一年年化收益率约 2.85%。

以上产品均为中低风险，请在充分了解产品风险后，根据您的风险承受能力审慎选择。我可以为您提供产品说明书和历史业绩参考。`;

const metric = (label,value,delta,tone) => `<div class="metric"><div class="metric-icon ${tone}">${label[0]}</div><div><span>${label}</span><strong>${value}</strong><small class="${tone}">${delta}</small></div><svg viewBox="0 0 110 24"><polyline points="0,19 12,15 22,17 34,10 47,14 60,8 72,12 85,7 98,9 110,4"/></svg></div>`;
const root = document.querySelector("#root");
root.innerHTML = `<div class="app-shell">
<aside class="sidebar"><div class="brand"><div class="brand-mark">B</div><div><b>华融银行</b><span>HUARONG BANK</span></div></div><nav>${navItems.map((x,i)=>`<button data-nav="${x}" class="${x==="协同审核"?"active":""}"><span class="nav-symbol">${String(i+1).padStart(2,"0")}</span>${x}</button>`).join("")}</nav><div class="side-foot">‹‹　收起导航</div></aside>
<main><header class="topbar"><button class="env" data-toast="环境切换器已打开">生产环境⌄</button><label class="search"><span>⌕</span><input placeholder="搜索会话、客户、Agent、Skill、知识等"><kbd>⌘ K</kbd></label><div class="top-actions"><button data-toast="暂无新的紧急通知">通知 <i>12</i></button><button data-toast="应用中心已打开">应用</button><div class="operator"><div class="avatar small">张</div><div><b>张晓明</b><span>运营主管</span></div></div></div></header>
<section class="page-head"><div><h1 id="page-title">协同审核工作台</h1><p>智能协同 · 安全合规 · 高效转化</p></div><div class="metrics">${metric("今日接待（人次）","18,746","较昨日 +12.45%","blue")}${metric("Agent解决率","92.73%","较昨日 +3.21pp","green")}${metric("待人工介入","128","较昨日 +14","amber")}${metric("风险拦截（次）","327","较昨日 -8.92%","red")}</div><button class="refresh" data-toast="实时数据已刷新">刷新</button></section>
<section class="workspace">
<aside class="customer-panel"><div class="panel-title">客户信息 <em>VIP</em></div><div class="profile"><div class="avatar">李</div><div><h3>李女士 <span>♀</span></h3><p>客户号：6222 **** 1234</p><p>客户经理：<a>王宇</a></p></div></div>
<div class="section-block"><h4>客户价值与风险</h4><dl><dt>资产规模</dt><dd>1,350.60 万元</dd><dt>贡献度</dt><dd class="stars">★★★★<span>★</span></dd><dt>风险等级</dt><dd><b class="badge amber">中风险</b></dd><dt>上次互动</dt><dd>2025-05-18</dd></dl></div>
<div class="section-block"><h4>当前意图</h4><dl><dt>主题域</dt><dd>理财产品咨询</dd><dt>子意图</dt><dd>中低风险理财推荐</dd></dl></div>
<div class="section-block context"><h4>最近上下文</h4><p>05-21 咨询短期理财产品收益与风险</p><p>05-18 购买理财产品“稳健增利2号”</p><p>05-10 咨询信用卡额度提升</p></div>
<div class="conversation-title"><h4>会话列表</h4><button data-toast="会话筛选器已打开">全部状态⌄</button></div><div class="conversation-list">${["理财产品咨询","信用卡额度咨询","贷款利率咨询","账户安全咨询"].map((x,i)=>`<button class="${i===0?"selected":""}"><b>${i+1}｜${x}</b><time>10:${30-i*3}:25</time><span class="${i===0?"blue":i===1?"amber":"green"}">${i===0?"李女士 · 多方审核中":i===1?"赵先生 · 待人工介入":"已完成"}</span></button>`).join("")}</div></aside>
<article class="conversation"><div class="session-meta">会话ID：C20250521000123　 渠道：手机银行在线客服　 开始：2025-05-21 09:15:32　 时长：00:15:48</div>
<div class="steps">${["需求理解","多Agent推荐","话术生成","多方审核","待裁决"].map((x,i)=>`<div class="${i===3?"current":i<3?"done":""}"><span>${i<3?"✓":i+1}</span><b>${x}</b><small>${i<3?"已完成":i===3?"进行中":"待处理"}</small></div>`).join("")}</div>
<div class="chat"><div class="message customer"><div class="avatar tiny">李</div><div><b>李女士 <time>09:15:32</time></b><p>我想了解一下中低风险的理财产品，10万左右，期限不要太长，最好能随时赎回。</p></div></div><div class="message ai"><div class="avatar tiny bot">AI</div><div><b>智能客服 <time>09:15:40</time></b><p>您好，理解您的需求。为您推荐以下中低风险、流动性较好的理财产品，供您参考。</p></div></div></div>
<div class="draft-head"><div><b>AI生成话术</b><span>由话术生成Agent生成</span></div><div><button data-toast="已插入客户变量">插入变量</button><button data-toast="已插入推荐产品">插入产品</button><button data-toast="AI 已优化话术表达">AI 优化</button></div></div>
<div class="draft"><textarea readonly>${draftText}</textarea><span class="count">${draftText.length}/2000</span></div><div class="evidence-title"><b>证据引用（4）</b><button data-toast="证据链详情已展开">展开全部⌄</button></div>
<div class="evidence">${["建信现金添利","稳健增利2号","理财产品风险分级指引","中低风险产品推荐策略"].map((x,i)=>`<button data-toast="已打开证据详情">${x}<small>${i<2?"产品说明书 2025.2.1":i===2?"2024年修订版":"v2.3"}</small></button>`).join("")}</div>
<div class="products"><b>推荐产品（2）</b><div><button><strong>建信现金添利</strong><span>R2　中低风险　T+1确认</span><small>七日年化 2.68%　起购金额 1,000元</small></button><button><strong>稳健增利2号（30天持有）</strong><span>R2　中低风险　30天持有</span><small>近一年年化 2.85%　起购金额 1万元</small></button></div></div>
<div class="main-actions"><button id="edit">修改话术</button><button data-toast="已提交多 Agent 重新审核">重新审核</button><button data-toast="会话已转交人工坐席">转人工</button><button id="approve" class="primary" disabled>批准发送</button></div></article>
<aside class="review-panel"><div class="review-tabs"><button class="active">审核结论</button><button data-toast="已切换到审核记录">审核记录</button></div><div class="reviewers">${reviewers.map(r=>`<button data-review="${r[0]}" class="${r[0]==="compliance"?"active":""}"><div class="review-icon ${r[5]}">A</div><div><b>${r[1]} · ${r[2]}</b><p>${r[6]}</p></div><span class="badge ${r[5]}">${r[4]}</span><strong class="${r[5]}">${r[3]}<small>/100</small></strong></button>`).join("")}</div>
<div class="review-detail" id="review-detail"></div><label class="note">仲裁备注（选填）<textarea placeholder="请输入仲裁备注…"></textarea></label><div class="decision"><span>仲裁结果</span>${["通过并发送","修改后重审","转人工处理"].map((x,i)=>`<label><input type="radio" name="decision" value="${x}" ${i===1?"checked":""}>${x}</label>`).join("")}</div></aside></section>
<section class="trace"><div class="trace-head"><div><b>工作流追踪</b><span>本次请求链路</span></div><div><button data-toast="已在工作流编排器中打开">在工作流中打开</button><button data-toast="Agent 能力配置面板已打开">配置Agent能力</button><button id="toggle-trace">收起</button></div></div><div id="trace-body"><div class="trace-flow">${flow.map((x,i)=>`<div class="${i===4?"blocked":i===7?"pending":""}"><span>${i+1}</span><b>${x}</b><small>${i===4?"阻断":i===7?"待处理":"已完成"}</small><time>${i===7?"—":(0.54+i*.11).toFixed(2)+"s"}</time></div>`).join("")}</div><div class="trace-foot">总耗时：6.64s　 Token：1,248　 模型调用：enterprise-chat-v3 <button data-toast="原始运行日志已打开">查看原始日志 ›</button></div></div></section><div id="toast" class="toast" hidden></div></main></div>`;

const detail = document.querySelector("#review-detail");
function showReview(id) {
  const r = reviewers.find(x=>x[0]===id);
  detail.innerHTML = `<div class="detail-head"><b>${r[1]} · 检查详情</b><span class="badge ${r[5]}">${r[4]}</span></div>${id==="compliance"?`<div class="finding blocking"><b>阻断问题 1</b><p>未充分提示产品风险，需补充风险提示语。</p><mark>建议明确提示：“理财非存款，产品有风险，投资须谨慎。”</mark></div><div class="finding advising"><b>建议问题 2</b><p>建议补充其他同类产品收益对比。</p><p>建议增加赎回规则说明，提升透明度。</p></div>`:`<div class="finding pass"><b>${r[4]} · 得分 ${r[3]}</b><p>${r[6]}</p><mark>该审核 Agent 未发现阻断问题。</mark></div>`}`;
}
showReview("compliance");
function toast(text){const el=document.querySelector("#toast");el.textContent=text;el.hidden=false;clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.hidden=true,2300)}
document.addEventListener("click",e=>{const t=e.target.closest("[data-toast]");if(t)toast(t.dataset.toast)});
document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-nav]").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector("#page-title").textContent=b.dataset.nav==="协同审核"?"协同审核工作台":b.dataset.nav;toast(`${b.dataset.nav}模块已切换`)});
document.querySelectorAll("[data-review]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-review]").forEach(x=>x.classList.remove("active"));b.classList.add("active");showReview(b.dataset.review)});
document.querySelector("#edit").onclick=e=>{const ta=document.querySelector(".draft textarea");ta.readOnly=!ta.readOnly;document.querySelector(".draft").classList.toggle("editing",!ta.readOnly);e.target.textContent=ta.readOnly?"修改话术":"保存话术";toast(ta.readOnly?"话术修改已保存":"进入话术编辑模式")};
document.querySelectorAll('input[name="decision"]').forEach(x=>x.onchange=()=>{document.querySelector("#approve").disabled=x.value!=="通过并发送";toast(`仲裁结果已设为：${x.value}`)});
document.querySelector("#approve").onclick=()=>toast("话术已批准并发送");
document.querySelector("#toggle-trace").onclick=e=>{const body=document.querySelector("#trace-body");body.hidden=!body.hidden;e.target.textContent=body.hidden?"展开":"收起"};
