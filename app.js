const state = {
  language: "zh",
  length: "medium",
  quantity: 10,
  nsfw: false,
  results: [],
  favorites: []
};

const zh = {
  numbers: ["3号", "7公斤", "42号", "404路", "半夜三点", "第八代", "0糖", "二手", "临时", "野生", "低配", "正版"],
  adjectives: ["会发光的", "过期", "塑料", "反季节", "迷路", "严肃", "透明", "打折", "倔强", "冒泡", "热心", "沉默"],
  subjects: ["外星人", "长颈鹿", "打印机", "混凝土", "土豆", "章鱼", "冰箱", "煎饼", "宇航员", "拖鞋", "云朵", "键盘", "老板椅", "海苔", "扫地机"],
  verbs: ["攻打", "偷吃", "熨烫", "审判", "追尾", "倒立", "举报", "发酵", "修理", "夹击", "哄睡", "拌"],
  objects: ["鞋带", "拌面", "验证码", "月亮", "WiFi", "泡面汤", "说明书", "充电线", "煎饼果子", "电梯按钮", "矿泉水瓶", "云端备份"],
  places: ["便利店门口", "火锅底料里", "服务器机房", "电饭煲宇宙", "地铁末班车", "小区公告栏"],
  roles: ["管理员", "研究所", "售后专员", "临时工", "质检员", "首席拌面官"],
  nsfwSubjects: ["宿醉海王", "微醺前任", "下班猛男", "社死辣妹", "暧昧键盘", "缺德月老"],
  nsfwObjects: ["夜店账单", "成人频道遥控器", "前任朋友圈", "性感拖鞋", "暧昧小票", "酒后承诺"],
  nsfwVerbs: ["撩拨", "偷亲", "翻车", "断片", "调戏", "拉黑"]
};

const en = {
  numbers: ["42", "404", "7kg", "No7", "Midnight", "Budget", "Expired", "Plastic", "Temporary", "Certified", "LowBattery", "HalfCooked"],
  adjectives: ["Wobbly", "Suspicious", "Glowing", "Discount", "Fermented", "Tiny", "Unlicensed", "Crispy", "Confused", "Quantum", "Moody", "Reverse"],
  subjects: ["Alien", "Giraffe", "Printer", "Concrete", "Potato", "Octopus", "Fridge", "Pancake", "Astronaut", "FlipFlop", "Cloud", "Keyboard", "Noodle", "Toaster"],
  verbs: ["Attacks", "Steals", "Irons", "Judges", "Chases", "Repairs", "Reports", "Ferments", "Tickles", "Boils", "Uploads", "Cancels"],
  objects: ["Shoelace", "Noodles", "Captcha", "Moon", "WiFi", "Soup", "Manual", "Cable", "Pancake", "Elevator", "Backup", "Receipt"],
  places: ["Lobby", "Hotpot", "ServerRoom", "RiceCooker", "Subway", "SnackDrawer"],
  roles: ["Admin", "Inspector", "Intern", "Dealer", "Mechanic", "Captain"],
  nsfwSubjects: ["TipsyEx", "HangoverCupid", "FlirtyPrinter", "BadIdeaDaddy", "ThirstyKeyboard", "AfterpartyAlien"],
  nsfwObjects: ["AfterDarkRemote", "RegretReceipt", "ExText", "BedroomWiFi", "DrunkPromise", "SpicyDM"],
  nsfwVerbs: ["FlirtsWith", "Ghosts", "BootyCalls", "Regrets", "Unmatches", "Teases"]
};

const templates = {
  zh: {
    short: [
      () => `${pick(pool("subjects"))}${pick(pool("objects"))}`,
      () => `${pick(pool("numbers"))}${pick(pool("subjects"))}`,
      () => `${pick(pool("adjectives"))}${pick(pool("subjects"))}`
    ],
    medium: [
      () => `${pick(pool("numbers"))}${pick(pool("subjects"))}${pick(pool("verbs"))}${pick(pool("objects"))}`,
      () => `${pick(pool("adjectives"))}${pick(pool("subjects"))}${pick(pool("verbs"))}${pick(pool("objects"))}`,
      () => `${pick(pool("subjects"))}的${pick(pool("adjectives"))}${pick(pool("objects"))}`,
      () => `${pick(pool("numbers"))}${pick(pool("objects"))}${pick(pool("roles"))}`
    ],
    long: [
      () => `${pick(pool("numbers"))}${pick(pool("subjects"))}在${pick(pool("places"))}${pick(pool("verbs"))}${pick(pool("objects"))}`,
      () => `${pick(pool("adjectives"))}${pick(pool("subjects"))}${pick(pool("verbs"))}${pick(pool("adjectives"))}${pick(pool("objects"))}`,
      () => `${pick(pool("places"))}的${pick(pool("numbers"))}${pick(pool("subjects"))}${pick(pool("roles"))}`
    ]
  },
  en: {
    short: [
      () => pascal([pick(pool("subjects")), pick(pool("objects"))]),
      () => pascal([pick(pool("numbers")), pick(pool("subjects"))]),
      () => pascal([pick(pool("adjectives")), pick(pool("subjects"))])
    ],
    medium: [
      () => pascal([pick(pool("numbers")), pick(pool("subjects")), pick(pool("objects"))]),
      () => pascal([pick(pool("adjectives")), pick(pool("subjects")), pick(pool("verbs")), pick(pool("objects"))]),
      () => pascal([pick(pool("subjects")), pick(pool("objects")), pick(pool("roles"))])
    ],
    long: [
      () => pascal([pick(pool("numbers")), pick(pool("subjects")), pick(pool("verbs")), pick(pool("places")), pick(pool("objects"))]),
      () => pascal([pick(pool("adjectives")), pick(pool("subjects")), pick(pool("verbs")), pick(pool("adjectives")), pick(pool("objects"))]),
      () => `The${pascal([pick(pool("subjects")), pick(pool("verbs")), "The", pick(pool("objects"))])}`
    ]
  },
  mix: {
    short: [
      () => `${pick(pool("subjects", "zh"))}${pick(pool("objects", "en"))}`,
      () => `${pick(pool("adjectives", "en"))}${pick(pool("subjects", "zh"))}`,
      () => `${pick(pool("numbers", "zh"))}${pick(pool("subjects", "en"))}`
    ],
    medium: [
      () => `${pick(pool("numbers", "zh"))}${pick(pool("subjects", "en"))}${pick(pool("verbs", "zh"))}${pick(pool("objects", "zh"))}`,
      () => `${pick(pool("adjectives", "zh"))}${pick(pool("subjects", "zh"))}_${pick(pool("objects", "en"))}`,
      () => `${pick(pool("subjects", "en"))}${pick(pool("verbs", "en"))}${pick(pool("objects", "zh"))}`
    ],
    long: [
      () => `${pick(pool("numbers", "zh"))}${pick(pool("adjectives", "en"))}${pick(pool("subjects", "zh"))}在${pick(pool("places", "zh"))}${pick(pool("verbs", "en"))}${pick(pool("objects", "zh"))}`,
      () => `${pick(pool("subjects", "zh"))}的${pick(pool("objects", "en"))}${pick(pool("roles", "zh"))}`,
      () => `${pick(pool("places", "zh"))}${pick(pool("numbers", "en"))}${pick(pool("subjects", "en"))}${pick(pool("verbs", "zh"))}${pick(pool("objects", "zh"))}`
    ]
  }
};

const optionButtons = document.querySelectorAll("[data-option]");
const resultList = document.querySelector("#resultList");
const favoriteList = document.querySelector("#favoriteList");
const machinePreview = document.querySelector("#machinePreview");
const quantityRange = document.querySelector("#quantityRange");
const quantityLabel = document.querySelector("#quantityLabel");
const nsfwToggle = document.querySelector("#nsfwToggle");
const toast = document.querySelector("#toast");

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pascal(parts) {
  return parts.join("").replace(/[^a-zA-Z0-9]/g, "");
}

function pool(key, language = state.language === "mix" ? "zh" : state.language) {
  const source = language === "en" ? en : zh;
  let items = [...source[key]];

  if (state.nsfw) {
    if (key === "subjects") items = items.concat(source.nsfwSubjects);
    if (key === "objects") items = items.concat(source.nsfwObjects);
    if (key === "verbs") items = items.concat(source.nsfwVerbs);
  }

  return items;
}

function generateOne() {
  const templateSet = templates[state.language][state.length];
  return pick(templateSet)();
}

function generateBatch() {
  const names = new Set();
  let guard = 0;

  while (names.size < state.quantity && guard < 180) {
    names.add(generateOne());
    guard += 1;
  }

  state.results = [...names];
  renderResults();
  pulsePreview();
}

function renderResults() {
  resultList.innerHTML = "";
  state.results.forEach((name) => {
    const card = document.createElement("article");
    card.className = "name-card";

    const text = document.createElement("strong");
    text.textContent = name;

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const copy = document.createElement("button");
    copy.className = "name-action";
    copy.type = "button";
    copy.title = "复制";
    copy.textContent = "⧉";
    copy.addEventListener("click", () => copyText(name));

    const save = document.createElement("button");
    save.className = `name-action ${state.favorites.includes(name) ? "saved" : ""}`;
    save.type = "button";
    save.title = "收藏";
    save.textContent = state.favorites.includes(name) ? "★" : "☆";
    save.addEventListener("click", () => toggleFavorite(name));

    actions.append(copy, save);
    card.append(text, actions);
    resultList.append(card);
  });

  machinePreview.textContent = state.results[0] || "42号混凝土拌面";
}

function renderFavorites() {
  favoriteList.innerHTML = "";
  favoriteList.classList.toggle("empty", state.favorites.length === 0);

  if (state.favorites.length === 0) {
    favoriteList.textContent = "还没收藏。看到顺眼的怪名就点星标。";
    return;
  }

  state.favorites.forEach((name) => {
    const chip = document.createElement("button");
    chip.className = "favorite-chip";
    chip.type = "button";
    chip.textContent = name;
    chip.title = "点击复制";
    chip.addEventListener("click", () => copyText(name));
    favoriteList.append(chip);
  });
}

function toggleFavorite(name) {
  if (state.favorites.includes(name)) {
    state.favorites = state.favorites.filter((item) => item !== name);
    showToast("已从灵光里拿掉。");
  } else {
    state.favorites = [name, ...state.favorites].slice(0, 24);
    showToast("已收藏这个可疑名字。");
  }

  renderResults();
  renderFavorites();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`已复制：${text}`);
  } catch {
    showToast("复制失败，浏览器可能不允许本地剪贴板。");
  }
}

function showToast(message) {
  toast.textContent = message;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.textContent = "";
  }, 1800);
}

function pulsePreview() {
  if (!machinePreview.animate) return;

  machinePreview.animate(
    [
      { transform: "rotate(-1deg) scale(.98)" },
      { transform: "rotate(1deg) scale(1.03)" },
      { transform: "rotate(0deg) scale(1)" }
    ],
    { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" }
  );
}

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const option = button.dataset.option;
    state[option] = button.dataset.value;

    document.querySelectorAll(`[data-option="${option}"]`).forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    generateBatch();
  });
});

quantityRange.addEventListener("input", () => {
  state.quantity = Number(quantityRange.value);
  quantityLabel.textContent = state.quantity;
  generateBatch();
});

nsfwToggle.addEventListener("click", () => {
  state.nsfw = !state.nsfw;
  nsfwToggle.setAttribute("aria-checked", String(state.nsfw));
  showToast(state.nsfw ? "18+ 词库已加入。注意怪名可能开始不正经。" : "已回到全年龄词库。");
  generateBatch();
});

document.querySelector("#generateButton").addEventListener("click", generateBatch);
document.querySelector("#copyAllButton").addEventListener("click", () => copyText(state.results.join("\n")));
document.querySelector("#resetButton").addEventListener("click", () => {
  state.language = "zh";
  state.length = "medium";
  state.quantity = 10;
  state.nsfw = false;
  quantityRange.value = "10";
  quantityLabel.textContent = "10";
  nsfwToggle.setAttribute("aria-checked", "false");

  optionButtons.forEach((button) => {
    const isActive = button.dataset.value === state[button.dataset.option];
    button.classList.toggle("active", isActive);
  });

  generateBatch();
});

generateBatch();
renderFavorites();
