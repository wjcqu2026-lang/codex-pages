const sceneTemplates = [
  {
    id: "price_objection",
    name: "价格异议处理",
    category: "异议处理",
    summary: "客户对价格、预算、性价比、竞品价格提出疑问或异议。",
    enabled: true,
    dimensions: [
      {
        id: "objection_acceptance",
        name: "异议承接",
        type: "behavior",
        description: "销售是否正确接住客户的价格顾虑。",
        required: true,
        weight: 20,
        leaf: false,
        expanded: true,
        children: [
          {
            id: "empathy",
            name: "共情承接",
            type: "behavior",
            description: "是否先认可或理解客户的价格压力。",
            required: true,
            weight: 10,
            leaf: true,
            inputLabel: "优秀共情承接标准",
            placeholder: "例如：认可客户预算压力；复述客户担忧；避免直接否定客户。",
            minItems: 1,
            maxItems: 5,
          },
          {
            id: "avoid_confrontation",
            name: "避免直接反驳",
            type: "behavior",
            description: "是否避免用强硬方式否定客户对价格的判断。",
            required: false,
            weight: 10,
            leaf: true,
            inputLabel: "优秀回应边界",
            placeholder: "例如：不说“你这样理解不对”；不直接强调“我们就是值这个价”。",
            minItems: 1,
            maxItems: 5,
          },
        ],
      },
      {
        id: "concern_diagnosis",
        name: "顾虑诊断",
        type: "strategy",
        description: "销售是否识别客户说贵背后的真实原因。",
        required: true,
        weight: 25,
        leaf: false,
        expanded: true,
        children: [
          {
            id: "budget_block",
            name: "预算卡点识别",
            type: "strategy",
            description: "是否判断客户是总价接受不了、预算周期不匹配，还是审批权限不足。",
            required: true,
            weight: 12,
            leaf: true,
            inputLabel: "优秀预算卡点识别标准",
            placeholder: "例如：追问预算范围、付款周期、预算审批人、采购时间。",
            minItems: 1,
            maxItems: 5,
          },
          {
            id: "competitor_reference",
            name: "竞品参照识别",
            type: "strategy",
            description: "是否判断客户是否拿竞品价格作为对比锚点。",
            required: false,
            weight: 13,
            leaf: true,
            inputLabel: "优秀竞品参照识别标准",
            placeholder: "例如：询问客户对比的是哪家、差价在哪里、能力是否一致。",
            minItems: 1,
            maxItems: 5,
          },
        ],
      },
      {
        id: "value_translation",
        name: "价值转化",
        type: "strategy",
        description: "销售是否把价格问题转化为客户可感知的价值问题。",
        required: true,
        weight: 35,
        leaf: false,
        expanded: true,
        children: [
          {
            id: "pain_point_linking",
            name: "痛点关联",
            type: "strategy",
            description: "是否结合客户当前业务痛点解释产品价值。",
            required: true,
            weight: 12,
            leaf: true,
            inputLabel: "优秀痛点关联标准",
            placeholder: "例如：把价格和客户的人力浪费、获客成本、转化损失联系起来。",
            minItems: 1,
            maxItems: 5,
          },
          {
            id: "roi_quantification",
            name: "收益量化",
            type: "evidence",
            description: "是否用数据、金额、效率提升等方式量化收益。",
            required: false,
            weight: 12,
            leaf: true,
            inputLabel: "优秀收益量化标准",
            placeholder: "例如：说明节省的人力成本、提升的转化率、缩短的处理时长。",
            minItems: 1,
            maxItems: 5,
          },
          {
            id: "risk_reframing",
            name: "风险重构",
            type: "strategy",
            description: "是否说明不解决问题可能带来的损失或风险。",
            required: false,
            weight: 11,
            leaf: true,
            inputLabel: "优秀风险重构标准",
            placeholder: "例如：指出继续人工处理会造成线索流失、响应慢、客户体验下降。",
            minItems: 1,
            maxItems: 5,
          },
        ],
      },
      {
        id: "next_step",
        name: "推进闭环",
        type: "outcome",
        description: "销售是否在回应价格异议后推动下一步。",
        required: true,
        weight: 20,
        leaf: true,
        inputLabel: "优秀推进闭环标准",
        placeholder: "例如：确认预算范围、约定下次沟通、推动试用、争取内部评估。",
        minItems: 1,
        maxItems: 5,
      },
    ],
    conditions: [
      {
        id: "root_and",
        name: "命中价格异议处理",
        type: "group",
        operator: "AND",
        description: "核心准入规则全部满足，且不命中排除条件。",
        expanded: true,
        leaf: false,
        children: [
          {
            id: "customer_price_concern",
            name: "客户表达价格顾虑",
            type: "condition",
            description: "客户明确或隐含表达价格高、预算不足、竞品更便宜、性价比不足等问题。",
            required: true,
            leaf: true,
          },
          {
            id: "seller_response",
            name: "销售进行了回应",
            type: "condition",
            description: "销售围绕价值、预算、投入产出、优惠、方案调整等方向回应客户。",
            required: true,
            leaf: true,
          },
          {
            id: "exclude_quote_only",
            name: "排除单纯询价",
            type: "group",
            operator: "NOT",
            description: "客户只是询问价格，没有表达异议时不进入该场景。",
            leaf: false,
            expanded: true,
            children: [
              {
                id: "quote_only",
                name: "客户只是问多少钱",
                type: "condition",
                description: "客户没有说贵、预算不足、不划算等异议，只是在确认价格。",
                required: false,
                leaf: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "need_discovery",
    name: "需求挖掘",
    category: "需求挖掘",
    summary: "销售通过问题识别客户目标、痛点、预算、决策链和时机。",
    enabled: true,
    dimensions: [],
    conditions: [],
  },
  {
    id: "renewal_save",
    name: "续费挽回",
    category: "续费挽回",
    summary: "客户表达不续费、降配、流失倾向时，顾问进行挽回。",
    enabled: false,
    dimensions: [],
    conditions: [],
  },
];

const typeLabels = {
  behavior: "行为",
  strategy: "策略",
  evidence: "证据",
  outcome: "结果",
  condition: "条件",
  group: "条件组",
};

const state = {
  scenes: structuredClone(sceneTemplates),
  activeSceneId: "price_objection",
  activeTab: "conditions",
  selectedId: "root_and",
  filter: "all",
};

const $ = (id) => document.getElementById(id);

function activeScene() {
  return state.scenes.find((scene) => scene.id === state.activeSceneId);
}

function activeTree() {
  return state.activeTab === "conditions" ? activeScene().conditions : activeScene().dimensions;
}

function findNode(nodes, id, path = [], parent = null) {
  for (const node of nodes) {
    const nextPath = [...path, node.name];
    if (node.id === id) return { node, path: nextPath, parent };
    if (node.children) {
      const found = findNode(node.children, id, nextPath, node);
      if (found) return found;
    }
  }
  return null;
}

function removeNode(nodes, id) {
  const index = nodes.findIndex((node) => node.id === id);
  if (index >= 0) {
    nodes.splice(index, 1);
    return true;
  }
  return nodes.some((node) => node.children && removeNode(node.children, id));
}

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

function defaultNode(asChild = false) {
  if (state.activeTab === "conditions") {
    return {
      id: makeId("condition"),
      name: asChild ? "新增条件" : "新增条件组",
      type: asChild ? "condition" : "group",
      operator: asChild ? undefined : "AND",
      description: asChild ? "描述这个条件如何从电话文本中客观判断。" : "设置 AND、OR、NOT 或满足 N 条的组合规则。",
      required: true,
      leaf: asChild,
      expanded: true,
      children: asChild ? undefined : [],
    };
  }

  return {
    id: makeId("dimension"),
    name: asChild ? "新增子维度" : "新增一级维度",
    type: asChild ? "strategy" : "behavior",
    description: asChild ? "描述这个叶子维度如何评价优秀话术。" : "用于组织一组相关评价维度。",
    required: true,
    weight: 10,
    leaf: asChild,
    expanded: true,
    children: asChild ? undefined : [],
    inputLabel: asChild ? "优秀标准" : "",
    placeholder: asChild ? "请填写可从电话文本观察到的具体标准。" : "",
    minItems: 1,
    maxItems: 5,
  };
}

function renderSceneList() {
  const keyword = $("sceneSearch").value.trim();
  const list = $("sceneList");
  list.innerHTML = "";

  state.scenes
    .filter((scene) => !keyword || scene.name.includes(keyword) || scene.category.includes(keyword))
    .forEach((scene) => {
      const card = document.createElement("button");
      card.className = `scene-card ${scene.id === state.activeSceneId ? "active" : ""}`;
      card.innerHTML = `
        <div class="scene-item-head">
          <strong>${scene.name}</strong>
          <span class="mini-pill">${scene.enabled ? "启用" : "草稿"}</span>
        </div>
        <p>${scene.summary}</p>
      `;
      card.addEventListener("click", () => {
        state.activeSceneId = scene.id;
        state.activeTab = "conditions";
        state.selectedId = (scene.conditions[0] || scene.dimensions[0] || {}).id || "";
        renderAll();
      });
      list.appendChild(card);
    });
}

function renderTree() {
  const tree = activeTree();
  const title = state.activeTab === "conditions" ? "客观筛选条件树" : "评价维度树";
  const hint =
    state.activeTab === "conditions"
      ? "条件树只判断是否进入场景，支持 AND、OR、NOT 等组合。"
      : "父节点组织结构，叶子节点承载用户可填写标准。";

  $("treeTitle").textContent = title;
  $("treeHint").textContent = hint;
  $("dimensionToolbar").style.display = state.activeTab === "dimensions" ? "flex" : "none";

  const canvas = $("treeCanvas");
  canvas.innerHTML = "";

  if (!tree.length) {
    canvas.innerHTML = `<div class="empty-state">还没有节点。点击“新增一级”开始配置。</div>`;
    return;
  }

  tree.forEach((node) => canvas.appendChild(renderNode(node, 0)));
}

function renderNode(node, depth) {
  const wrap = document.createElement("div");
  wrap.className = "node-wrap";

  if (state.activeTab === "dimensions" && state.filter !== "all" && node.type !== state.filter) {
    const hasVisibleChild = (node.children || []).some((child) => child.type === state.filter);
    if (!hasVisibleChild) wrap.style.display = "none";
  }

  const hasChildren = node.children && node.children.length;
  const row = document.createElement("div");
  row.className = `node-row ${node.id === state.selectedId ? "selected" : ""}`;
  row.style.paddingLeft = `${8 + depth * 2}px`;
  row.innerHTML = `
    <button class="toggle ${hasChildren ? "" : "placeholder"}">${hasChildren ? (node.expanded === false ? "›" : "⌄") : "·"}</button>
    <div class="node-main">
      <div class="node-title">
        ${node.leaf ? '<span class="leaf-dot"></span>' : ""}
        <strong>${node.name}</strong>
        <span class="tag ${node.type}">${typeLabels[node.type] || node.type}</span>
        ${node.operator ? `<span class="tag group">${node.operator}</span>` : ""}
      </div>
      <div class="node-meta">${node.description || "未填写描述"}</div>
    </div>
  `;

  row.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle") && hasChildren) {
      node.expanded = node.expanded === false;
    } else {
      state.selectedId = node.id;
    }
    renderAll();
  });

  wrap.appendChild(row);

  if (hasChildren && node.expanded !== false) {
    const children = document.createElement("div");
    children.className = "children";
    node.children.forEach((child) => children.appendChild(renderNode(child, depth + 1)));
    wrap.appendChild(children);
  }

  return wrap;
}

function renderInspector() {
  const found = findNode(activeTree(), state.selectedId);
  const disabled = !found;
  const fields = [
    "nodeName",
    "nodeType",
    "nodeDesc",
    "nodeWeight",
    "nodeRequired",
    "nodeLeaf",
    "inputLabel",
    "placeholder",
    "minItems",
    "maxItems",
  ];

  fields.forEach((field) => {
    $(field).disabled = disabled;
  });
  $("deleteNodeBtn").disabled = disabled;

  if (!found) {
    $("selectedPath").textContent = "未选择节点";
    fields.forEach((field) => {
      const element = $(field);
      if (element.type === "checkbox") element.checked = false;
      else element.value = "";
    });
    $("leafEditor").style.display = "none";
    return;
  }

  const { node, path } = found;
  $("selectedPath").textContent = path.join(" / ");
  $("nodeName").value = node.name || "";
  $("nodeType").value = node.type || "strategy";
  $("nodeDesc").value = node.description || "";
  $("nodeWeight").value = node.weight ?? 0;
  $("nodeRequired").value = String(node.required !== false);
  $("nodeLeaf").checked = Boolean(node.leaf);
  $("inputLabel").value = node.inputLabel || "";
  $("placeholder").value = node.placeholder || "";
  $("minItems").value = node.minItems ?? 1;
  $("maxItems").value = node.maxItems ?? 5;
  $("leafEditor").style.display = node.leaf && state.activeTab === "dimensions" ? "grid" : "none";
}

function renderPreview() {
  const scene = activeScene();
  $("sceneName").value = scene.name;
  syncTitleWidth();
  $("crumbScene").textContent = scene.name;
  $("categorySelect").value = scene.category;
  $("statusPill").textContent = scene.enabled ? "已启用" : "已禁用";
  $("statusPill").classList.toggle("disabled", !scene.enabled);
  $("statusPill").parentElement.classList.toggle("disabled", !scene.enabled);

  const payload = {
    scene_id: scene.id,
    scene_name: scene.name,
    condition_tree: scene.conditions,
    evaluation_framework: {
      framework_name: `${scene.name}评价框架`,
      dimension_tree: scene.dimensions,
    },
  };
  $("jsonPreview").textContent = JSON.stringify(payload, null, 2);
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === state.activeTab);
  });
}

function buildPromptPreview() {
  const scene = activeScene();
  const leafDimensions = [];

  function collectLeaves(nodes, prefix = []) {
    nodes.forEach((node) => {
      const path = [...prefix, node.name];
      if (node.leaf || !node.children || !node.children.length) {
        leafDimensions.push({
          path: path.join(" / "),
          inputLabel: node.inputLabel || "用户填写标准",
          placeholder: node.placeholder || "由普通用户填写具体评价标准",
        });
      } else {
        collectLeaves(node.children, path);
      }
    });
  }
  collectLeaves(scene.dimensions);

  return `你是一名销售话术质检与萃取专家。

请先根据【客观筛选条件树】判断电话片段是否属于「${scene.name}」场景。

如果命中场景，再根据以下【评价维度树】判断话术是否优秀。

评价维度占位区：
${leafDimensions
  .map((item, index) => `${index + 1}. ${item.path}\n   ${item.inputLabel}：{{${item.path}标准}}\n   填写提示：${item.placeholder}`)
  .join("\n")}

输出时必须包含：
- 是否命中场景
- 命中的条件与证据原话
- 每个叶子维度的判断结果
- 可萃取话术
- 不足与改进建议`;
}

function renderAll() {
  renderSceneList();
  renderTabs();
  renderTree();
  renderInspector();
  renderPreview();
}

function syncTitleWidth() {
  const input = $("sceneName");
  const measure = $("titleMeasure");
  measure.textContent = input.value || input.placeholder || "";
  input.style.setProperty("--title-width", `${Math.ceil(measure.offsetWidth) + 10}px`);
}

function updateSelected(mutator) {
  const found = findNode(activeTree(), state.selectedId);
  if (!found) return;
  mutator(found.node);
  renderAll();
}

function bindEvents() {
  $("sceneSearch").addEventListener("input", renderSceneList);

  $("sceneName").addEventListener("input", (event) => {
    activeScene().name = event.target.value;
    syncTitleWidth();
    renderSceneList();
    renderPreview();
  });

  $("categorySelect").addEventListener("change", (event) => {
    activeScene().category = event.target.value;
    renderSceneList();
    renderPreview();
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      state.activeTab = tab.dataset.tab;
      state.selectedId = (activeTree()[0] || {}).id || "";
      renderAll();
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.filter = button.dataset.filter;
      renderTree();
    });
  });

  $("addRootBtn").addEventListener("click", () => {
    const node = defaultNode(false);
    activeTree().push(node);
    state.selectedId = node.id;
    renderAll();
    showToast("已新增一级节点");
  });

  $("addChildBtn").addEventListener("click", () => {
    const found = findNode(activeTree(), state.selectedId);
    if (!found) return showToast("请先选择父节点");
    const child = defaultNode(true);
    found.node.leaf = false;
    found.node.expanded = true;
    found.node.children = found.node.children || [];
    found.node.children.push(child);
    state.selectedId = child.id;
    renderAll();
    showToast("已新增子节点");
  });

  $("deleteNodeBtn").addEventListener("click", () => {
    if (!state.selectedId) return;
    removeNode(activeTree(), state.selectedId);
    state.selectedId = (activeTree()[0] || {}).id || "";
    renderAll();
    showToast("节点已删除");
  });

  $("nodeName").addEventListener("input", (event) => updateSelected((node) => (node.name = event.target.value)));
  $("nodeType").addEventListener("change", (event) => updateSelected((node) => (node.type = event.target.value)));
  $("nodeDesc").addEventListener("input", (event) => updateSelected((node) => (node.description = event.target.value)));
  $("nodeWeight").addEventListener("input", (event) => updateSelected((node) => (node.weight = Number(event.target.value))));
  $("nodeRequired").addEventListener("change", (event) => updateSelected((node) => (node.required = event.target.value === "true")));
  $("nodeLeaf").addEventListener("change", (event) =>
    updateSelected((node) => {
      node.leaf = event.target.checked;
      if (node.leaf) {
        node.children = undefined;
        node.inputLabel ||= "优秀标准";
        node.placeholder ||= "请填写可从电话文本观察到的具体标准。";
        node.minItems ||= 1;
        node.maxItems ||= 5;
      } else {
        node.children = node.children || [];
      }
    }),
  );
  $("inputLabel").addEventListener("input", (event) => updateSelected((node) => (node.inputLabel = event.target.value)));
  $("placeholder").addEventListener("input", (event) => updateSelected((node) => (node.placeholder = event.target.value)));
  $("minItems").addEventListener("input", (event) => updateSelected((node) => (node.minItems = Number(event.target.value))));
  $("maxItems").addEventListener("input", (event) => updateSelected((node) => (node.maxItems = Number(event.target.value))));

  $("previewBtn").addEventListener("click", () => {
    $("promptPreview").textContent = buildPromptPreview();
    $("promptModal").classList.add("open");
  });

  $("closeModalBtn").addEventListener("click", () => $("promptModal").classList.remove("open"));
  $("promptModal").addEventListener("click", (event) => {
    if (event.target.id === "promptModal") $("promptModal").classList.remove("open");
  });

  $("publishBtn").addEventListener("click", () => showToast("配置已发布"));
  $("copyJsonBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("jsonPreview").textContent);
    showToast("JSON 已复制");
  });

  $("newSceneBtn").addEventListener("click", () => {
    const scene = {
      id: makeId("scene"),
      name: "新建场景",
      category: "异议处理",
      summary: "配置场景条件树与评价维度树。",
      enabled: false,
      dimensions: [],
      conditions: [],
    };
    state.scenes.unshift(scene);
    state.activeSceneId = scene.id;
    state.selectedId = "";
    renderAll();
  });
}

let toastTimer;
function showToast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 1600);
}

bindEvents();
renderAll();
