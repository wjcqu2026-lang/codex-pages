const baseMembers = [
  ["张晓敏", "A1021"], ["李嘉诚", "A1022"], ["王雪", "A1023"], ["赵强", "A1024"],
  ["孙雨", "A1025"], ["周楠", "A1026"], ["吴磊", "A1027"], ["郑婷", "A1028"],
  ["冯越", "A1029"], ["陈露", "A1030"], ["刘洋", "A1031"], ["杨帆", "A1032"],
  ["何佳", "A1033"], ["高晨", "A1034"], ["马琳", "A1035"], ["罗敏", "A1036"],
  ["许诺", "A1037"], ["唐宁", "A1038"]
];

const tasks = [
  {
    id: "t1",
    name: "逾期 7-15 天首通优秀话术学习",
    record: "首通建立信任并确认还款意愿",
    due: "今天 18:00",
    duration: 755,
    risk: "首通",
    owner: "陈组长",
    requirement: "听完整段录音，提炼 2 条可复用话术。",
    members: [
      ["张晓敏", "A1021", "已完成", 100, 755, "06-24 10:18", "已提交"],
      ["李嘉诚", "A1022", "学习中", 66, 498, "-", "未提交"],
      ["王雪", "A1023", "未开始", 0, 0, "-", "未提交"],
      ["赵强", "A1024", "已逾期", 35, 264, "-", "未提交"],
      ["孙雨", "A1025", "已完成", 100, 755, "06-24 11:42", "已提交"],
      ["周楠", "A1026", "学习中", 48, 362, "-", "未提交"],
      ["吴磊", "A1027", "已完成", 100, 755, "06-24 09:35", "已提交"],
      ["郑婷", "A1028", "已完成", 100, 755, "06-24 13:04", "已提交"],
      ["冯越", "A1029", "未开始", 0, 0, "-", "未提交"],
      ["陈露", "A1030", "已完成", 100, 755, "06-24 12:16", "已提交"],
      ["刘洋", "A1031", "学习中", 72, 544, "-", "未提交"],
      ["杨帆", "A1032", "已完成", 100, 755, "06-24 14:08", "已提交"],
      ["何佳", "A1033", "已完成", 100, 755, "06-24 15:20", "已提交"],
      ["高晨", "A1034", "学习中", 24, 181, "-", "未提交"],
      ["马琳", "A1035", "已完成", 100, 755, "06-24 10:55", "已提交"],
      ["罗敏", "A1036", "未开始", 0, 0, "-", "未提交"],
      ["许诺", "A1037", "已完成", 100, 755, "06-24 16:05", "已提交"],
      ["唐宁", "A1038", "已完成", 100, 755, "06-24 16:28", "已提交"]
    ]
  },
  {
    id: "t2",
    name: "承诺还款客户跟进节奏学习",
    record: "承诺还款前的确认与风险提示",
    due: "明天 12:00",
    duration: 618,
    risk: "承诺还款",
    owner: "陈组长",
    requirement: "关注客户异议出现后的停顿、复述和确认方式。",
    members: [
      ["张晓敏", "A1021", "学习中", 74, 457, "-", "未提交"],
      ["李嘉诚", "A1022", "已完成", 100, 618, "06-24 11:30", "已提交"],
      ["王雪", "A1023", "学习中", 51, 315, "-", "未提交"],
      ["赵强", "A1024", "未开始", 0, 0, "-", "未提交"],
      ["孙雨", "A1025", "已完成", 100, 618, "06-24 14:10", "已提交"],
      ["周楠", "A1026", "未开始", 0, 0, "-", "未提交"],
      ["吴磊", "A1027", "学习中", 32, 198, "-", "未提交"],
      ["郑婷", "A1028", "已完成", 100, 618, "06-24 15:05", "已提交"],
      ["冯越", "A1029", "未开始", 0, 0, "-", "未提交"],
      ["陈露", "A1030", "学习中", 44, 272, "-", "未提交"]
    ]
  },
  {
    id: "t3",
    name: "高风险投诉苗头安抚案例复盘",
    record: "投诉苗头识别与降温表达",
    due: "06-27 18:00",
    duration: 842,
    risk: "投诉风险",
    owner: "陈组长",
    requirement: "听完后提交一个自己可直接使用的安抚表达。",
    members: baseMembers.slice(0, 12).map((member, index) => [
      member[0],
      member[1],
      index === 4 || index === 10 ? "学习中" : "未开始",
      index === 4 ? 18 : index === 10 ? 29 : 0,
      index === 4 ? 152 : index === 10 ? 244 : 0,
      "-",
      "未提交"
    ])
  }
];

const library = [
  ["首通建立信任并确认还款意愿", "12:35", "首通", "客户从防御到明确承诺"],
  ["承诺还款前的确认与风险提示", "10:18", "承诺还款", "避免模糊承诺，锁定时间金额"],
  ["投诉苗头识别与降温表达", "14:02", "投诉风险", "先承接情绪，再回到方案"],
  ["多次失联客户重新接通", "09:46", "失联修复", "降低压迫感，恢复沟通"],
  ["困难客户分期方案沟通", "11:22", "协商", "用选择题推动可执行方案"],
  ["第三方代偿场景合规表达", "08:58", "合规", "边界清晰，避免敏感表述"]
];

let activeTaskId = "t1";
let activeStatus = "all";
let leaderTaskFilter = "all";
let selectedMemberTask = "t1";
let drawerMode = "reminder";
let taskTimer = null;
let memberTimer = null;
let taskPlaySeconds = 0;
let memberPlaySeconds = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function activeTask() {
  return tasks.find((task) => task.id === activeTaskId) || tasks[0];
}

function taskStats(task) {
  const total = task.members.length;
  const done = task.members.filter((member) => member[2] === "已完成").length;
  const progress = task.members.filter((member) => member[2] === "学习中").length;
  const wait = task.members.filter((member) => member[2] === "未开始").length;
  const late = task.members.filter((member) => member[2] === "已逾期").length;
  const rate = total ? Math.round((done / total) * 100) : 0;
  return { total, done, progress, wait, late, rate };
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function parseDuration(value) {
  const [minutes, seconds] = value.split(":").map(Number);
  return (Number.isFinite(minutes) ? minutes : 10) * 60 + (Number.isFinite(seconds) ? seconds : 0);
}

function statusClass(status) {
  return {
    已完成: "done",
    学习中: "progress",
    未开始: "wait",
    已逾期: "late"
  }[status] || "wait";
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 1800);
}

function renderLeaderSummary() {
  const totalTasks = tasks.length;
  const assigned = tasks.reduce((sum, task) => sum + task.members.length, 0);
  const lateTasks = tasks.filter((task) => taskStats(task).late > 0).length;
  const avgRate = Math.round(tasks.reduce((sum, task) => sum + taskStats(task).rate, 0) / totalTasks);
  const metrics = [
    ["学习任务", totalTasks],
    ["累计分派", assigned],
    ["平均完成率", `${avgRate}%`],
    ["有逾期任务", lateTasks],
    ["本组人数", 18]
  ];

  $("#leaderSummaryGrid").innerHTML = metrics
    .map(([label, value]) => `
      <div class="metric-card">
        <div class="metric-label">${label}</div>
        <div class="metric-value">${value}</div>
      </div>
    `)
    .join("");
}

function renderLeaderTaskList() {
  const visible = tasks.filter((task) => {
    const stats = taskStats(task);
    if (leaderTaskFilter === "late") return stats.late > 0;
    if (leaderTaskFilter === "active") return stats.rate < 100;
    return true;
  });

  $("#leaderTaskList").innerHTML = visible
    .map((task) => {
      const stats = taskStats(task);
      return `
        <button class="overview-card" data-task="${task.id}">
          <div>
            <span class="pill ${task.risk.includes("投诉") ? "red" : task.risk.includes("承诺") ? "amber" : "blue"}">${task.risk}</span>
            <div class="task-title" style="margin-top:10px">${task.name}</div>
            <div class="task-meta">
              <span>${task.record}</span>
              <span>截止：${task.due}</span>
              <span>分派：${stats.total} 人</span>
            </div>
          </div>
          <div class="overview-stats">
            <div class="stat-box"><strong>${stats.rate}%</strong><span class="muted">完成率</span></div>
            <div class="stat-box"><strong>${stats.progress + stats.wait}</strong><span class="muted">待完成</span></div>
            <div class="stat-box"><strong>${stats.late}</strong><span class="muted">已逾期</span></div>
          </div>
          <div class="overview-actions">
            <span class="detail-action">查看详情 <span aria-hidden="true">›</span></span>
          </div>
        </button>
      `;
    })
    .join("");

  $$(".overview-card").forEach((card) => {
    card.addEventListener("click", () => openTaskDetail(card.dataset.task));
  });
}

function renderLeaderList() {
  renderLeaderSummary();
  renderLeaderTaskList();
}

function showLeaderList() {
  $("#leaderListView").classList.remove("hidden");
  $("#leaderDetailView").classList.add("hidden");
  $("#pageTitle").textContent = "组长学习任务工作台";
  renderLeaderList();
}

function openTaskDetail(taskId) {
  activeTaskId = taskId;
  taskPlaySeconds = 0;
  $("#leaderListView").classList.add("hidden");
  $("#leaderDetailView").classList.remove("hidden");
  $("#pageTitle").textContent = "优秀录音学习进度";
  renderLeaderDetail();
}

function renderTaskOptions() {
  $("#taskSelect").innerHTML = tasks
    .map((task) => `<option value="${task.id}">${task.name}</option>`)
    .join("");
  $("#taskSelect").value = activeTaskId;
}

function renderMetrics() {
  const stats = taskStats(activeTask());
  const metrics = [
    ["应学人数", stats.total],
    ["已完成", `${stats.rate}%`],
    ["学习中", stats.progress],
    ["未开始", stats.wait],
    ["逾期", stats.late]
  ];
  $("#metricGrid").innerHTML = metrics
    .map(([label, value]) => `
      <div class="metric-card">
        <div class="metric-label">${label}</div>
        <div class="metric-value">${value}</div>
      </div>
    `)
    .join("");
}

function renderRows() {
  const query = $("#memberSearch").value.trim();
  const rows = activeTask().members.filter((member) => {
    const statusMatch = activeStatus === "all" || member[2] === activeStatus;
    const queryMatch = !query || member[0].includes(query) || member[1].includes(query);
    return statusMatch && queryMatch;
  });

  $("#memberRows").innerHTML = rows
    .map((member) => {
      const [name, id, status, progress, listened, finished, feedback] = member;
      const action = status === "已完成" ? "查看" : "提醒";
      return `
        <tr>
          <td>
            <div class="member-cell">
              <div class="avatar">${name.slice(0, 1)}</div>
              <div>
                <div>${name}</div>
                <div class="muted">${id}</div>
              </div>
            </div>
          </td>
          <td><span class="status ${statusClass(status)}">${status}</span></td>
          <td>
            <div class="progress-cell">
              <div class="progress-bar"><span style="width:${progress}%"></span></div>
              <span>${progress}%</span>
            </div>
          </td>
          <td>${formatTime(listened)}</td>
          <td>${finished}</td>
          <td>${feedback}</td>
          <td><button class="row-action" data-member="${name}" data-action="${action}">${action}</button></td>
        </tr>
      `;
    })
    .join("");

  $$(".row-action").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "查看") {
        toast(`${button.dataset.member} 的学习反馈已打开`);
      } else {
        openReminder(button.dataset.member);
      }
    });
  });
}

function renderDetail() {
  const task = activeTask();
  $("#recordTitle").textContent = task.record;
  $("#riskTag").textContent = task.risk;
  $("#riskTag").className = `pill ${task.risk.includes("投诉") ? "red" : task.risk.includes("承诺") ? "amber" : "blue"}`;
  $("#recordDuration").textContent = formatTime(task.duration);
  $("#taskAudioProgress").style.width = `${Math.min((taskPlaySeconds / task.duration) * 100, 100)}%`;
  $("#taskCurrentTime").textContent = formatTime(taskPlaySeconds);
  $("#taskInfo").innerHTML = `
    <div class="info-item"><span>截止时间</span><strong>${task.due}</strong></div>
    <div class="info-item"><span>分派人</span><strong>${task.owner}</strong></div>
    <div class="info-item"><span>学习要求</span><strong>${task.requirement}</strong></div>
  `;
  const unfinished = task.members.filter((member) => member[2] !== "已完成").slice(0, 3);
  $("#activityFeed").innerHTML = `
    <div class="feed-item">最近完成：${task.members.find((member) => member[2] === "已完成")?.[0] || "暂无"}<div class="muted">系统自动记录完成时间</div></div>
    <div class="feed-item">待提醒：${unfinished.map((member) => member[0]).join("、") || "暂无"}<div class="muted">可批量发送任务提醒</div></div>
  `;
}

function renderLeaderDetail() {
  renderTaskOptions();
  renderMetrics();
  renderRows();
  renderDetail();
}

function renderMemberTasks(filter = "pending") {
  const myTasks = tasks.map((task) => {
    const member = task.members.find((item) => item[0] === "李嘉诚") || task.members[0];
    return { task, member };
  });
  const visible = myTasks.filter(({ member }) => (filter === "done" ? member[2] === "已完成" : member[2] !== "已完成"));

  $("#memberTaskList").innerHTML = visible
    .map(({ task, member }) => `
      <button class="task-card ${selectedMemberTask === task.id ? "active" : ""}" data-task="${task.id}">
        <div>
          <div class="task-title">${task.name}</div>
          <div class="task-meta">
            <span>${task.record}</span>
            <span>截止：${task.due}</span>
            <span>进度：${member[3]}%</span>
          </div>
        </div>
        <span class="status ${statusClass(member[2])}">${member[2]}</span>
      </button>
    `)
    .join("");

  $$(".task-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedMemberTask = card.dataset.task;
      memberPlaySeconds = 0;
      renderMemberTasks(filter);
      renderMemberDetail();
    });
  });

  if (visible.length && !visible.some(({ task }) => task.id === selectedMemberTask)) {
    selectedMemberTask = visible[0].task.id;
  }
  renderMemberDetail();
}

function renderMemberDetail() {
  const task = tasks.find((item) => item.id === selectedMemberTask) || tasks[0];
  const member = task.members.find((item) => item[0] === "李嘉诚") || task.members[0];
  const progressSeconds = memberPlaySeconds || member[4];
  $("#memberTaskTitle").textContent = task.name;
  $("#memberTaskDue").textContent = `截止时间：${task.due}`;
  $("#memberRecordTitle").textContent = task.record;
  $("#memberDuration").textContent = formatTime(task.duration);
  $("#memberCurrentTime").textContent = formatTime(Math.min(progressSeconds, task.duration));
  $("#memberAudioProgress").style.width = `${Math.min((progressSeconds / task.duration) * 100, 100)}%`;
  $("#completeTaskBtn").disabled = member[2] === "已完成";
  $("#completeTaskBtn").textContent = member[2] === "已完成" ? "已完成学习" : "确认完成学习";
}

function renderLibrary() {
  $("#libraryGrid").innerHTML = library
    .map(
      ([title, duration, tag, desc]) => `
        <article class="library-card">
          <div>
            <span class="pill blue">${tag}</span>
            <h3 style="margin-top:10px">${title}</h3>
            <p class="muted" style="margin-top:8px">${desc}</p>
          </div>
          <div class="waveform">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="info-item"><span>录音时长</span><strong>${duration}</strong></div>
        </article>
      `
    )
    .join("");
}

function switchView(view) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $$(".view").forEach((item) => item.classList.remove("active"));
  $(`#${view}View`).classList.add("active");
  if (view === "leader") {
    showLeaderList();
  } else {
    $("#pageTitle").textContent = {
      member: "我的录音学习待办",
      library: "优秀录音库"
    }[view];
  }
}

function openReminder(name = "未完成组员") {
  drawerMode = "reminder";
  $("#drawerLabel").textContent = "学习提醒";
  $("#drawerTitle").textContent = `提醒 ${name}`;
  $("#drawerBody").innerHTML = `
    <p class="drawer-note">将向 ${name} 发送当前学习任务提醒，提醒会进入组员待办和站内消息。</p>
    <label class="feedback-box">
      提醒内容
      <textarea id="reminderText">请在截止时间前完成《${activeTask().name}》，听完录音后提交学习心得。</textarea>
    </label>
  `;
  $("#drawerPrimary").textContent = "发送提醒";
  $("#drawer").classList.add("open");
}

function openCreateTask(prefillRecord = "") {
  drawerMode = "create";
  $("#drawerLabel").textContent = "新建学习任务";
  $("#drawerTitle").textContent = "分派录音学习";
  $("#drawerBody").innerHTML = `
    <div class="form-grid">
      <label class="field">
        任务名称
        <input id="newTaskName" value="${prefillRecord ? prefillRecord + "学习" : "新增优秀录音学习任务"}" />
      </label>
      <label class="field">
        标杆录音
        <select id="newTaskRecord">
          ${library.map(([title]) => `<option ${title === prefillRecord ? "selected" : ""}>${title}</option>`).join("")}
        </select>
      </label>
      <label class="field">
        截止时间
        <input id="newTaskDue" value="明天 18:00" />
      </label>
      <label class="field">
        学习要求
        <textarea id="newTaskRequirement">听完整段录音，提炼 2 条可复用话术，并提交学习心得。</textarea>
      </label>
      <label class="field">
        分派组员
        <div class="checkbox-grid">
          ${baseMembers.slice(0, 18).map(([name, id], index) => `
            <label class="check-item">
              <input type="checkbox" value="${id}" ${index < 18 ? "checked" : ""} />
              <span>${name}</span>
            </label>
          `).join("")}
        </div>
      </label>
    </div>
  `;
  $("#drawerPrimary").textContent = "创建并分派";
  $("#drawer").classList.add("open");
}

function createTaskFromDrawer() {
  const selectedIds = $$("#drawerBody input[type='checkbox']:checked").map((input) => input.value);
  const selectedMembers = baseMembers.filter((member) => selectedIds.includes(member[1]));
  const record = $("#newTaskRecord").value;
  const found = library.find((item) => item[0] === record);
  const risk = found?.[2] || "学习";
  const duration = parseDuration(found?.[1] || "10:00");
  const newTask = {
    id: `t${Date.now()}`,
    name: $("#newTaskName").value.trim() || "新增优秀录音学习任务",
    record,
    due: $("#newTaskDue").value.trim() || "明天 18:00",
    duration,
    risk,
    owner: "陈组长",
    requirement: $("#newTaskRequirement").value.trim() || "听完整段录音并提交学习心得。",
    members: selectedMembers.map(([name, id]) => [name, id, "未开始", 0, 0, "-", "未提交"])
  };
  tasks.unshift(newTask);
  activeTaskId = newTask.id;
  selectedMemberTask = newTask.id;
  closeDrawer();
  renderMemberTasks($(".mini-tab.active").dataset.memberFilter);
  openTaskDetail(newTask.id);
  toast("学习任务已创建并分派");
}

function closeDrawer() {
  $("#drawer").classList.remove("open");
}

function bindEvents() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#backToTaskList").addEventListener("click", showLeaderList);
  $("#taskSelect").addEventListener("change", (event) => openTaskDetail(event.target.value));
  $$("#statusFilters .segment").forEach((button) => {
    button.addEventListener("click", () => {
      activeStatus = button.dataset.status;
      $$("#statusFilters .segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRows();
    });
  });
  $$("#leaderTaskTabs .mini-tab").forEach((button) => {
    button.addEventListener("click", () => {
      leaderTaskFilter = button.dataset.taskFilter;
      $$("#leaderTaskTabs .mini-tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderLeaderTaskList();
    });
  });
  $("#memberSearch").addEventListener("input", renderRows);
  $("#remindAllBtn").addEventListener("click", () => openReminder("所有未完成组员"));
  $("#createTaskBtn").addEventListener("click", () => openCreateTask());
  $("#exportBtn").addEventListener("click", () => toast("已生成当前任务进度报表"));
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#cancelDrawer").addEventListener("click", closeDrawer);
  $("#drawerPrimary").addEventListener("click", () => {
    if (drawerMode === "create") {
      createTaskFromDrawer();
    } else {
      closeDrawer();
      toast("提醒已发送");
    }
  });
  $("#drawer").addEventListener("click", (event) => {
    if (event.target.id === "drawer") closeDrawer();
  });
  $("#playTaskBtn").addEventListener("click", () => {
    if (taskTimer) {
      clearInterval(taskTimer);
      taskTimer = null;
      $("#playTaskBtn").textContent = "▶";
      return;
    }
    $("#playTaskBtn").textContent = "Ⅱ";
    taskTimer = setInterval(() => {
      taskPlaySeconds = Math.min(taskPlaySeconds + 8, activeTask().duration);
      renderDetail();
      if (taskPlaySeconds >= activeTask().duration) {
        clearInterval(taskTimer);
        taskTimer = null;
        $("#playTaskBtn").textContent = "▶";
      }
    }, 500);
  });
  $$(".mini-tab[data-member-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".mini-tab[data-member-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderMemberTasks(button.dataset.memberFilter);
    });
  });
  $("#memberPlayBtn").addEventListener("click", () => {
    const task = tasks.find((item) => item.id === selectedMemberTask) || tasks[0];
    if (memberTimer) {
      clearInterval(memberTimer);
      memberTimer = null;
      $("#memberPlayBtn").textContent = "▶";
      return;
    }
    $("#memberPlayBtn").textContent = "Ⅱ";
    memberTimer = setInterval(() => {
      memberPlaySeconds = Math.min(memberPlaySeconds + 10, task.duration);
      renderMemberDetail();
      if (memberPlaySeconds >= task.duration) {
        clearInterval(memberTimer);
        memberTimer = null;
        $("#memberPlayBtn").textContent = "▶";
      }
    }, 500);
  });
  $("#completeTaskBtn").addEventListener("click", () => {
    const task = tasks.find((item) => item.id === selectedMemberTask) || tasks[0];
    const member = task.members.find((item) => item[0] === "李嘉诚");
    if (member) {
      member[2] = "已完成";
      member[3] = 100;
      member[4] = task.duration;
      member[5] = "刚刚";
      member[6] = $("#feedbackText").value.trim() ? "已提交" : "免心得";
    }
    toast("学习任务已完成");
    renderLeaderList();
    if (!$("#leaderDetailView").classList.contains("hidden")) renderLeaderDetail();
    renderMemberTasks($(".mini-tab.active[data-member-filter]").dataset.memberFilter);
  });
}

showLeaderList();
renderMemberTasks();
renderLibrary();
bindEvents();
