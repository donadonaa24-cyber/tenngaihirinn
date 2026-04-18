const CHANNELS = [
  { id: "lucky", name: "ラッキーチャンス", description: "確率を全て+20%" },
  { id: "revive", name: "死者蘇生", description: "任意で気絶キャラ1体を全回復で復帰（一度きり）" },
  { id: "aroma", name: "アロマオイル", description: "回復スキルの回復量+2" },
  { id: "unity", name: "一致団結", description: "フィールドに6人まで設置可能" },
  { id: "blessing", name: "加護", description: "全キャラのHP上限+2" },
  { id: "doping", name: "ドーピング", description: "全キャラのATK+2" },
  { id: "girls", name: "女子会", description: "女子キャラのHP+10" },
  { id: "boys", name: "男子会", description: "男子キャラのHP+6、ATK+1" },
];

const BASE_CHARACTERS = {
  ao: {
    id: "ao",
    name: "碧",
    role: "サポーター",
    gender: "男",
    baseAtk: 3,
    baseHp: 27,
    skill: "味方1体を2回復＆ATK+2（2ターン）",
    portrait: "",
    cardArt: "",
  },
  akatsuki: {
    id: "akatsuki",
    name: "暁",
    role: "アタッカー",
    gender: "男",
    baseAtk: 7,
    baseHp: 22,
    skill: "1割でATK×2攻撃。失敗でATK0扱い",
    portrait: "",
    cardArt: "",
  },
  ako: {
    id: "ako",
    name: "亜湖",
    role: "アタッカー",
    gender: "女",
    baseAtk: 5,
    baseHp: 22,
    skill: "継続ダメージ2を2ターン付与。1割で全体化",
    portrait: "",
    cardArt: "",
  },
  itsuki: {
    id: "itsuki",
    name: "樹",
    role: "デバッファー",
    gender: "男",
    baseAtk: 0,
    baseHp: 22,
    skill: "敵1体を2ターン麻痺",
    portrait: "",
    cardArt: "",
  },
  shiho: {
    id: "shiho",
    name: "志保",
    role: "ヒーラー",
    gender: "女",
    baseAtk: 2,
    baseHp: 27,
    skill: "味方全体を2回復、1割で4回復",
    portrait: "",
    cardArt: "",
  },
  takumi: {
    id: "takumi",
    name: "拓海",
    role: "ヒーラー",
    gender: "男",
    baseAtk: 3,
    baseHp: 27,
    skill: "味方1体を5回復",
    portrait: "",
    cardArt: "",
  },
  chiduru: {
    id: "chiduru",
    name: "千鶴",
    role: "バッファー",
    gender: "女",
    baseAtk: 3,
    baseHp: 22,
    skill: "敵1体ATKを0化し、その値を味方1体へ2ターン上乗せ",
    portrait: "",
    cardArt: "",
  },
  go: {
    id: "go",
    name: "剛",
    role: "サポーター",
    gender: "男",
    baseAtk: 4,
    baseHp: 22,
    skill: "1割で味方1体のATK/スキル数値を2倍（2ターン）",
    portrait: "",
    cardArt: "",
  },
  mai: {
    id: "mai",
    name: "舞依",
    role: "アタッカー",
    gender: "女",
    baseAtk: 5,
    baseHp: 22,
    skill: "自分or味方のHPを削った分をATKに加算して攻撃",
    portrait: "",
    cardArt: "",
  },
  yuzuki: {
    id: "yuzuki",
    name: "結月",
    role: "サブアタ",
    gender: "女",
    baseAtk: 3,
    baseHp: 22,
    skill: "敵に2ダメージ＆自身2回復",
    portrait: "",
    cardArt: "",
  },
  ryuta: {
    id: "ryuta",
    name: "龍太",
    role: "シールダー",
    gender: "男",
    baseAtk: 3,
    baseHp: 22,
    skill: "味方全体に1回攻撃無効シールド",
    portrait: "",
    cardArt: "",
  },
  nana: {
    id: "nana",
    name: "栞那",
    role: "デバッファー",
    gender: "女",
    baseAtk: 4,
    baseHp: 22,
    skill: "毒付与（重ねがけ不可）",
    portrait: "",
    cardArt: "",
  },
};

const CHARACTER_PORTRAIT_FILES = {
  ao: "%E7%A2%A7.png",
  akatsuki: "%E6%9A%81.png",
  ako: "%E4%BA%9C%E6%B9%96.png",
  itsuki: "%E6%A8%B9.png",
  shiho: "%E5%BF%97%E4%BF%9D.png",
  takumi: "%E6%8B%93%E6%B5%B7.png",
  chiduru: "%E5%8D%83%E9%B6%B4.png",
  go: "%E5%89%9B.png",
  mai: "%E8%88%9E%E4%BE%9D.png",
  yuzuki: "%E7%B5%90%E6%9C%88.png",
  ryuta: "%E9%BE%8D%E5%A4%AA.png",
  nana: "%E6%A0%9E%E9%82%A3.png",
};

const CHARACTER_CARD_ART_FILES = {
  // 後からカードイラストを差し込む場合はここに `id: "file.png"` を追加する。
};

function getCharacterPortrait(id) {
  return CHARACTER_PORTRAIT_FILES[id] ?? "";
}

function getCharacterCardArt(id) {
  return CHARACTER_CARD_ART_FILES[id] ?? CHARACTER_PORTRAIT_FILES[id] ?? "";
}

const INITIAL_TEAMS = {
  player: {
    field: ["ao", "akatsuki", "ako"],
    bench: ["itsuki", "shiho", "takumi"],
  },
  enemy: {
    field: ["chiduru", "go", "mai"],
    bench: ["yuzuki", "ryuta", "nana"],
  },
};

const CHARACTERS = {};

const state = {
  screen: "top",
  topStep: "team",
  turn: "player",
  turnIndex: { player: 0, enemy: 0 },
  actionsUsed: 0,
  skillsUsed: 0,
  actedIds: [],
  selectedId: null,
  selectedSide: null,
  selectedZone: null,
  channels: {
    player: null,
    enemy: null,
  },
  fieldLimit: {
    player: 3,
    enemy: 3,
  },
  pendingAction: null,
  gameOver: false,
  winner: null,
  reviveUsed: { player: false, enemy: false },
  animations: {},
  settings: {
    confirmActions: true,
    fastEnemy: false,
  },
  preparation: {
    field: [],
    bench: [],
  },
  player: { field: [...INITIAL_TEAMS.player.field], bench: [...INITIAL_TEAMS.player.bench], grave: [] },
  enemy: { field: [...INITIAL_TEAMS.enemy.field], bench: [...INITIAL_TEAMS.enemy.bench], grave: [] },
};

const els = {
  battleApp: document.getElementById("battleApp"),
  topScreen: document.getElementById("topScreen"),
  teamStepPanel: document.getElementById("teamStepPanel"),
  channelStepPanel: document.getElementById("channelStepPanel"),
  toChannelStepBtn: document.getElementById("toChannelStepBtn"),
  backToTeamStepBtn: document.getElementById("backToTeamStepBtn"),
  startBattleBtn: document.getElementById("startBattleBtn"),
  openSettingsFromTopBtn: document.getElementById("openSettingsFromTopBtn"),
  openSettingsFromChannelStepBtn: document.getElementById("openSettingsFromChannelStepBtn"),
  playerChannelSelect: document.getElementById("playerChannelSelect"),
  playerChannelDescription: document.getElementById("playerChannelDescription"),
  confirmPlayerChannelBtn: document.getElementById("confirmPlayerChannelBtn"),
  cpuChannelName: document.getElementById("cpuChannelName"),
  cpuChannelDescription: document.getElementById("cpuChannelDescription"),
  channelListPreview: document.getElementById("channelListPreview"),
  openChannelInfoFromTopBtn: document.getElementById("openChannelInfoFromTopBtn"),
  prepRoster: document.getElementById("prepRoster"),
  prepFieldList: document.getElementById("prepFieldList"),
  prepBenchList: document.getElementById("prepBenchList"),
  prepFieldCount: document.getElementById("prepFieldCount"),
  prepBenchCount: document.getElementById("prepBenchCount"),
  prepTotalCount: document.getElementById("prepTotalCount"),
  backToTopBtn: document.getElementById("backToTopBtn"),
  resetGameBtn: document.getElementById("resetGameBtn"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  playerField: document.getElementById("playerField"),
  enemyField: document.getElementById("enemyField"),
  playerBench: document.getElementById("playerBench"),
  enemyBench: document.getElementById("enemyBench"),
  playerGrave: document.getElementById("playerGrave"),
  enemyGrave: document.getElementById("enemyGrave"),
  playerFieldNote: document.getElementById("playerFieldNote"),
  enemyFieldNote: document.getElementById("enemyFieldNote"),
  turnLabel: document.getElementById("turnLabel"),
  actionsUsed: document.getElementById("actionsUsed"),
  skillsUsed: document.getElementById("skillsUsed"),
  victoryLabel: document.getElementById("victoryLabel"),
  playerChannelLabel: document.getElementById("playerChannelLabel"),
  playerChannelDesc: document.getElementById("playerChannelDesc"),
  enemyChannelLabel: document.getElementById("enemyChannelLabel"),
  enemyChannelDesc: document.getElementById("enemyChannelDesc"),
  openChannelInfoBtn: document.getElementById("openChannelInfoBtn"),
  selectedInfo: document.getElementById("selectedInfo"),
  targetHint: document.getElementById("targetHint"),
  logArea: document.getElementById("logArea"),
  attackBtn: document.getElementById("attackBtn"),
  skillBtn: document.getElementById("skillBtn"),
  swapBtn: document.getElementById("swapBtn"),
  cancelTargetBtn: document.getElementById("cancelTargetBtn"),
  endTurnBtn: document.getElementById("endTurnBtn"),
  reviveBtn: document.getElementById("reviveBtn"),
  clearLogBtn: document.getElementById("clearLogBtn"),
  rulesDialog: document.getElementById("rulesDialog"),
  openRulesBtn: document.getElementById("openRulesBtn"),
  closeRulesBtn: document.getElementById("closeRulesBtn"),
  settingsDialog: document.getElementById("settingsDialog"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  confirmActionsToggle: document.getElementById("confirmActionsToggle"),
  fastEnemyToggle: document.getElementById("fastEnemyToggle"),
  actionConfirmDialog: document.getElementById("actionConfirmDialog"),
  actionConfirmMessage: document.getElementById("actionConfirmMessage"),
  actionConfirmOkBtn: document.getElementById("actionConfirmOkBtn"),
  actionConfirmCancelBtn: document.getElementById("actionConfirmCancelBtn"),
  characterActionDialog: document.getElementById("characterActionDialog"),
  characterActionTitle: document.getElementById("characterActionTitle"),
  closeCharacterActionBtn: document.getElementById("closeCharacterActionBtn"),
  channelInfoDialog: document.getElementById("channelInfoDialog"),
  channelInfoList: document.getElementById("channelInfoList"),
  closeChannelInfoBtn: document.getElementById("closeChannelInfoBtn"),
};

let confirmResolver = null;

function createCharacter(base) {
  return {
    id: base.id,
    name: base.name,
    role: base.role,
    gender: base.gender,
    skill: base.skill,
    portrait: getCharacterPortrait(base.id) || base.portrait,
    cardArt: getCharacterCardArt(base.id) || base.cardArt,
    atk: base.baseAtk,
    hp: base.baseHp,
    maxHp: base.baseHp,
    paralyzeTurns: 0,
    poison: null,
    dots: [],
    shieldHits: 0,
    atkBuffs: [],
    atkZeroTurns: 0,
    atkMultiplierTurns: 0,
    skillMultiplierTurns: 0,
    benchLockUntil: 0,
  };
}

function initializeCharacters() {
  Object.keys(BASE_CHARACTERS).forEach((id) => {
    CHARACTERS[id] = createCharacter(BASE_CHARACTERS[id]);
  });
}

function getCharacter(id) {
  return CHARACTERS[id];
}

function getTeam(side) {
  return state[side];
}

function opposite(side) {
  return side === "player" ? "enemy" : "player";
}

function getSideChannel(side) {
  return state.channels[side] ?? null;
}

function getChannelById(channelId) {
  return CHANNELS.find((channel) => channel.id === channelId) ?? null;
}

function rollChance(baseChance, side) {
  const bonus = getSideChannel(side) === "lucky" ? 0.2 : 0;
  return Math.random() < Math.min(1, baseChance + bonus);
}

function randomOf(ids) {
  if (!ids.length) return null;
  return ids[Math.floor(Math.random() * ids.length)];
}

function shuffled(ids) {
  const array = [...ids];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function log(message) {
  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent = message;
  els.logArea.prepend(line);
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getAnimationKey(side, id) {
  return `${side}:${id}`;
}

function triggerCharacterAnimation(side, id, type, duration = 540) {
  const key = getAnimationKey(side, id);
  const until = Date.now() + duration;
  state.animations[key] = { type, until };
  render();
  window.setTimeout(() => {
    const current = state.animations[key];
    if (current && current.until <= Date.now()) {
      delete state.animations[key];
      render();
    }
  }, duration + 20);
}

function getAnimationClass(side, id) {
  const key = getAnimationKey(side, id);
  const anim = state.animations[key];
  if (!anim) return "";
  if (anim.until <= Date.now()) {
    delete state.animations[key];
    return "";
  }
  if (anim.type === "hit") return "fx-hit";
  if (anim.type === "attack") return "fx-attack";
  if (anim.type === "skill") return "fx-skill";
  return "";
}

function confirmAction(message, force = false) {
  if ((!state.settings.confirmActions && !force) || !els.actionConfirmDialog) {
    return Promise.resolve(true);
  }

  if (confirmResolver) {
    return Promise.resolve(false);
  }

  els.actionConfirmMessage.textContent = message;
  els.actionConfirmDialog.showModal();

  return new Promise((resolve) => {
    confirmResolver = resolve;
  });
}

function resolveConfirmDialog(result) {
  if (!confirmResolver) return;
  const resolver = confirmResolver;
  confirmResolver = null;
  els.actionConfirmDialog.close();
  resolver(result);
}

function closeCharacterActionDialog() {
  if (!els.characterActionDialog?.open) return;
  els.characterActionDialog.close();
}

function openCharacterActionDialog(id, zone) {
  if (!els.characterActionDialog) return;
  const character = getCharacter(id);
  if (!character) return;
  const zoneLabel = zone === "bench" ? "控え" : "戦闘中";
  els.characterActionTitle.textContent = `${character.name}（${zoneLabel}）の行動を選択`;
  if (!els.characterActionDialog.open) {
    els.characterActionDialog.showModal();
  }
}

function syncCharacterActionDialog() {
  if (!els.characterActionDialog?.open) return;

  const keepOpen =
    state.turn === "player" &&
    state.screen === "battle" &&
    !state.gameOver &&
    !state.pendingAction &&
    state.selectedSide === "player" &&
    (state.selectedZone === "field" || state.selectedZone === "bench");

  if (!keepOpen) closeCharacterActionDialog();
}

function getEnemyTurnDelay() {
  return state.settings.fastEnemy ? 640 : 1300;
}

function getEnemyActionDelay() {
  return state.settings.fastEnemy ? 380 : 840;
}

function showTopScreen() {
  state.screen = "top";
  els.topScreen.classList.remove("hidden");
  els.battleApp.classList.add("hidden");
}

function showTopStep(step) {
  state.topStep = step;
  if (els.teamStepPanel) {
    els.teamStepPanel.classList.toggle("hidden", step !== "team");
  }
  if (els.channelStepPanel) {
    els.channelStepPanel.classList.toggle("hidden", step !== "channel");
  }
}

function showBattleScreen() {
  state.screen = "battle";
  els.topScreen.classList.add("hidden");
  els.battleApp.classList.remove("hidden");
}

function syncSettingsUI() {
  if (els.confirmActionsToggle) {
    els.confirmActionsToggle.checked = state.settings.confirmActions;
  }
  if (els.fastEnemyToggle) {
    els.fastEnemyToggle.checked = state.settings.fastEnemy;
  }
}

function isPreparationReady() {
  const total = state.preparation.field.length + state.preparation.bench.length;
  return total === 6 && state.preparation.field.length >= 1 && state.preparation.field.length <= 3;
}

function invalidateChannelSelection() {
  state.channels.player = null;
  state.channels.enemy = null;
  updateChannelStepSummary();
}

function getPreparationRole(id) {
  if (state.preparation.field.includes(id)) return "field";
  if (state.preparation.bench.includes(id)) return "bench";
  return "none";
}

function setPreparationRole(id, role) {
  const current = getPreparationRole(id);
  if (current === role) return;

  state.preparation.field = removeFromArray(state.preparation.field, id);
  state.preparation.bench = removeFromArray(state.preparation.bench, id);

  if (role === "none") {
    invalidateChannelSelection();
    renderPreparation();
    return;
  }

  const total = state.preparation.field.length + state.preparation.bench.length;
  if (total >= 6) {
    log("編成は合計6人までです。");
    renderPreparation();
    return;
  }

  if (role === "field") {
    if (state.preparation.field.length >= 3) {
      log("戦闘メンバーは最大3人です。");
      renderPreparation();
      return;
    }
    state.preparation.field.push(id);
  } else if (role === "bench") {
    state.preparation.bench.push(id);
  }

  invalidateChannelSelection();
  renderPreparation();
}

function renderPreparation() {
  if (!els.prepRoster) return;
  const ids = Object.keys(BASE_CHARACTERS);

  const fieldCount = state.preparation.field.length;
  const benchCount = state.preparation.bench.length;
  const total = fieldCount + benchCount;

  els.prepFieldCount.textContent = String(fieldCount);
  els.prepBenchCount.textContent = String(benchCount);
  els.prepTotalCount.textContent = String(total);

  const emptyChip = `<span class="prep-chip">未選択</span>`;

  els.prepFieldList.innerHTML = state.preparation.field.length
    ? state.preparation.field.map((id) => `<span class="prep-chip">${BASE_CHARACTERS[id].name}</span>`).join("")
    : emptyChip;

  els.prepBenchList.innerHTML = state.preparation.bench.length
    ? state.preparation.bench.map((id) => `<span class="prep-chip">${BASE_CHARACTERS[id].name}</span>`).join("")
    : emptyChip;

  els.prepRoster.innerHTML = ids
    .map((id) => {
      const base = BASE_CHARACTERS[id];
      const role = getPreparationRole(id);
      const roleClass = role === "field" ? "is-field" : role === "bench" ? "is-bench" : "";
      const roleLabel = role === "field" ? "戦闘" : role === "bench" ? "控え" : "未選択";
      const portrait = getCharacterPortrait(id);
      const hasPortrait = Boolean(portrait);

      return `
        <article class="prep-card ${roleClass}" data-char-id="${id}">
          <figure class="prep-thumb-wrap">
            <img
              class="prep-thumb ${hasPortrait ? "" : "hidden"}"
              src="${hasPortrait ? portrait : ""}"
              alt="${base.name} portrait"
              onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';"
            />
            <figcaption class="prep-thumb-fallback" style="${hasPortrait ? "display:none;" : ""}">画像なし</figcaption>
          </figure>
          <div class="prep-name">${base.name}</div>
          <div class="prep-meta">${base.role} / ${base.gender}</div>
          <div class="prep-meta">ATK ${base.baseAtk} / HP ${base.baseHp}</div>
          <div class="prep-meta">配置: ${roleLabel}</div>
          <div class="prep-actions">
            <button type="button" class="ghost-btn small" data-prep-action="field" data-char-id="${id}">戦闘</button>
            <button type="button" class="ghost-btn small" data-prep-action="bench" data-char-id="${id}">控え</button>
            <button type="button" class="ghost-btn small" data-prep-action="none" data-char-id="${id}">外す</button>
          </div>
        </article>
      `;
    })
    .join("");

  if (els.toChannelStepBtn) {
    els.toChannelStepBtn.disabled = !isPreparationReady();
  }
  if (els.startBattleBtn) {
    els.startBattleBtn.disabled = !(isPreparationReady() && areChannelsReady());
  }
}
function getPreparedPlayerTeam() {
  if (!isPreparationReady()) {
    return {
      field: [...INITIAL_TEAMS.player.field],
      bench: [...INITIAL_TEAMS.player.bench],
    };
  }

  return {
    field: [...state.preparation.field],
    bench: [...state.preparation.bench],
  };
}

function resetMatchState() {
  Object.keys(CHARACTERS).forEach((id) => {
    delete CHARACTERS[id];
  });
  initializeCharacters();

  state.turn = "player";
  state.turnIndex = { player: 0, enemy: 0 };
  state.actionsUsed = 0;
  state.skillsUsed = 0;
  state.actedIds = [];
  state.selectedId = null;
  state.selectedSide = null;
  state.selectedZone = null;
  state.fieldLimit = { player: 3, enemy: 3 };
  state.pendingAction = null;
  state.gameOver = false;
  state.winner = null;
  state.reviveUsed = { player: false, enemy: false };
  state.animations = {};
  const preparedTeam = getPreparedPlayerTeam();
  state.player.field = [...preparedTeam.field];
  state.player.bench = [...preparedTeam.bench];
  state.player.grave = [];
  state.enemy.field = [...INITIAL_TEAMS.enemy.field];
  state.enemy.bench = [...INITIAL_TEAMS.enemy.bench];
  state.enemy.grave = [];

  if (state.channels.player) {
    applyChannelEffects("player", state.channels.player);
  }
  if (state.channels.enemy) {
    applyChannelEffects("enemy", state.channels.enemy);
  }
}

function getBenchLockRemain(character, side) {
  return Math.max(0, character.benchLockUntil - state.turnIndex[side]);
}

function getCurrentAtk(character) {
  if (character.atkZeroTurns > 0) return 0;
  let value = character.atk;
  character.atkBuffs.forEach((buff) => {
    value += buff.amount;
  });
  if (character.atkMultiplierTurns > 0) value *= 2;
  return Math.max(0, Math.floor(value));
}

function scaleSkillValue(actor, base) {
  return actor.skillMultiplierTurns > 0 ? base * 2 : base;
}

function scaleSkillTurn(actor, turns) {
  return actor.skillMultiplierTurns > 0 ? turns * 2 : turns;
}

function scaleHealValue(actor, base, side) {
  let value = scaleSkillValue(actor, base);
  if (getSideChannel(side) === "aroma") value += 2;
  return Math.max(0, Math.floor(value));
}

function getStatusLabels(character, side, zone) {
  const labels = [];
  if (character.paralyzeTurns > 0) labels.push(`麻痺:${character.paralyzeTurns}`);
  if (character.shieldHits > 0) labels.push(`シールド:${character.shieldHits}`);
  if (character.poison) labels.push(`毒:${character.poison.nextDamage}`);
  if (character.dots.length) {
    character.dots.forEach((dot) => {
      labels.push(`継続:${dot.damage}(${dot.turns})`);
    });
  }
  if (character.atkZeroTurns > 0) labels.push(`ATK0:${character.atkZeroTurns}`);
  if (character.atkMultiplierTurns > 0) labels.push(`ATKx2:${character.atkMultiplierTurns}`);
  if (character.skillMultiplierTurns > 0) labels.push(`スキルx2:${character.skillMultiplierTurns}`);

  const buffTotal = character.atkBuffs.reduce((sum, buff) => sum + buff.amount, 0);
  if (buffTotal !== 0) labels.push(`ATK${buffTotal > 0 ? "+" : ""}${buffTotal}`);

  if (zone === "bench") {
    const remain = getBenchLockRemain(character, side);
    if (remain > 0) labels.push(`出撃不可:${remain}`);
  }
  return labels;
}

function getVictoryText() {
  if (!state.gameOver) return "進行中";
  if (state.winner === "draw") return "引き分け";
  return state.winner === "player" ? "プレイヤー勝利" : "相手勝利";
}

function isTargetable(side, zone, id) {
  const action = state.pendingAction;
  if (!action || state.turn !== "player" || state.gameOver) return false;

  if (action.type === "attack") {
    return side === "enemy" && zone === "field";
  }

  if (action.type === "revive") {
    return side === "player" && zone === "grave";
  }

  if (action.type === "swap") {
    if (action.fromZone === "field") {
      if (side !== "player" || zone !== "bench") return false;
      const candidate = getCharacter(id);
      if (!candidate) return false;
      return getBenchLockRemain(candidate, "player") <= 0;
    }
    return side === "player" && zone === "field";
  }

  if (action.type !== "skill") return false;

  const skillId = action.skillId;
  if (["ao", "takumi", "go"].includes(skillId)) {
    return side === "player" && zone === "field";
  }
  if (["akatsuki", "itsuki", "ako", "yuzuki", "nana"].includes(skillId)) {
    return side === "enemy" && zone === "field";
  }
  if (skillId === "chiduru") {
    if (action.step === "enemy") return side === "enemy" && zone === "field";
    return side === "player" && zone === "field";
  }
  if (skillId === "mai") {
    if (action.step === "source") return side === "player" && zone === "field";
    return side === "enemy" && zone === "field";
  }
  return false;
}

function renderZone(container, ids, owner, zone) {
  container.innerHTML = "";
  const isField = zone === "field";
  const maxSlots = isField ? state.fieldLimit[owner] : 6;
  container.classList.toggle("six-slot", isField && state.fieldLimit[owner] === 6);

  ids.forEach((id) => {
    const character = getCharacter(id);
    if (!character) return;

    const card = document.createElement("button");
    card.type = "button";
    const animationClass = isField ? getAnimationClass(owner, id) : "";
    card.className = isField ? `character-card ${owner} ${animationClass}`.trim() : "bench-card";

    if (state.selectedId === id && state.selectedSide === owner && state.selectedZone === zone) {
      card.classList.add("selected");
    }
    if (isTargetable(owner, zone, id)) card.classList.add("targetable");
    if (zone === "bench" && getBenchLockRemain(character, owner) > 0) card.classList.add("locked");

    const hpPercent = Math.max(0, Math.round((character.hp / character.maxHp) * 100));
    const atk = getCurrentAtk(character);
    const statusLabels = getStatusLabels(character, owner, zone);
    const cooldown = zone === "bench" ? getBenchLockRemain(character, owner) : 0;

    if (!isField) {
      const hasBenchPortrait = Boolean(character.portrait);
      card.innerHTML = `
        <div class="bench-main">
          <div class="bench-avatar-wrap">
            <img class="bench-avatar ${hasBenchPortrait ? "" : "hidden"}" src="${hasBenchPortrait ? character.portrait : ""}" alt="${character.name}アイコン"
              onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';" />
            <div class="bench-avatar-fallback" style="${hasBenchPortrait ? "display:none;" : ""}">${character.name}</div>
          </div>
          <div class="bench-info">
            <div class="bench-name">${character.name}</div>
            <div class="bench-meta">HP ${character.hp}/${character.maxHp} / ATK ${atk}</div>
            <div class="bench-meta">${statusLabels.length ? statusLabels.join(" / ") : "待機中"}</div>
          </div>
        </div>
        <div class="bench-lock">${cooldown > 0 ? `出撃不可: あと${cooldown}ターン` : "出撃可能"}</div>
      `;
      card.addEventListener("click", () => {
        void handleCardClick(id, owner, zone);
      });
      container.appendChild(card);
      return;
    }

    const statusBadges = statusLabels.length
      ? statusLabels.map((text) => `<span class="badge status">${text}</span>`).join("")
      : `<span class="badge">正常</span>`;
    const hasPortrait = Boolean(character.portrait);
    const hasCardArt = Boolean(character.cardArt);

    card.innerHTML = `
      <div class="duel-card-header">
        <div class="character-name">${character.name}</div>
        <div class="duel-card-cost">${character.role}</div>
      </div>
      <div class="duel-card-type-row">
        <span>${character.role} / ${character.gender}</span>
        <span>状態</span>
      </div>
      <div class="portrait-frame" data-char="${character.id}">
        <img class="portrait-img ${hasPortrait ? "" : "hidden"}" src="${hasPortrait ? character.portrait : ""}" alt="${character.name}立ち絵"
          onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';" />
        <div class="portrait-placeholder" style="${hasPortrait ? "display:none;" : ""}">
          画像準備中
        </div>
      </div>
      <div class="duel-effect-box">
        <div class="skill-text">${character.skill}</div>
        <div class="badges">${statusBadges}</div>
      </div>
      <div class="stats-row duel-stats">
        <span>ATK / ${atk}</span>
        <span>HP / ${character.hp} / ${character.maxHp}</span>
      </div>
      <div class="hp-bar"><div class="hp-fill" style="width:${hpPercent}%"></div></div>
      <div class="duel-art-line ${hasCardArt ? "" : "hidden"}">
        <img class="mini-art-img ${hasCardArt ? "" : "hidden"}" src="${hasCardArt ? character.cardArt : ""}" alt="${character.name}カードイラスト"
          onerror="this.classList.add('hidden'); this.parentElement.classList.add('hidden');" />
      </div>
    `;

    card.addEventListener("click", () => {
      void handleCardClick(id, owner, zone);
    });
    container.appendChild(card);
  });

  for (let i = ids.length; i < maxSlots; i += 1) {
    const slot = document.createElement("div");
    slot.className = "empty-slot";
    slot.textContent = isField ? "空きフィールド枠" : "空き控え枠";
    container.appendChild(slot);
  }
}

function renderGraveyard(container, ids, owner) {
  container.innerHTML = "";
  if (!ids.length) {
    const slot = document.createElement("div");
    slot.className = "empty-slot";
    slot.textContent = "気絶キャラなし";
    container.appendChild(slot);
    return;
  }

  ids.forEach((id) => {
    const character = getCharacter(id);
    if (!character) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "grave-chip";
    if (isTargetable(owner, "grave", id)) button.classList.add("targetable");
    button.innerHTML = `<strong>${character.name}</strong><br><small>HP 0</small>`;
    button.addEventListener("click", () => {
      void handleCardClick(id, owner, "grave");
    });
    container.appendChild(button);
  });
}

function updateSelectedInfo() {
  if (!state.selectedId) {
    els.selectedInfo.textContent = "味方フィールドのキャラを選択して行動してください。";
    return;
  }
  const character = getCharacter(state.selectedId);
  if (!character) {
    els.selectedInfo.textContent = "キャラ情報が見つかりません。";
    return;
  }

  const atk = getCurrentAtk(character);
  const statuses = getStatusLabels(character, state.selectedSide, state.selectedZone);
  els.selectedInfo.innerHTML = `
    <strong>${character.name}</strong><br>
    役割：${character.role} / 性別：${character.gender}<br>
    ATK ${atk} / HP ${character.hp}/${character.maxHp}<br>
    スキル：${character.skill}<br>
    状態：${statuses.length ? statuses.join("、") : "なし"}
  `;
}

function updateTargetHint() {
  if (state.gameOver) {
    els.targetHint.textContent = `試合終了：${getVictoryText()}`;
    return;
  }

  if (state.pendingAction) {
    els.targetHint.textContent = state.pendingAction.prompt;
    return;
  }

  if (state.turn === "enemy") {
    els.targetHint.textContent = "相手ターン中です。相手の行動を待ってください。";
    return;
  }

  els.targetHint.textContent = "通常状態：味方キャラを押して行動（通常攻撃 / スキル / 交代）を選択してください。";
}

function hasActed(id) {
  return state.actedIds.includes(id);
}

function canAct(actorId, side) {
  if (state.turn !== side) return false;
  if (state.actionsUsed >= 3) return false;
  if (hasActed(actorId)) return false;
  if (!getTeam(side).field.includes(actorId)) return false;
  const character = getCharacter(actorId);
  if (!character || character.paralyzeTurns > 0) return false;
  return true;
}

function canDeployFromBench(id, side) {
  const team = getTeam(side);
  if (!team.bench.includes(id)) return false;
  if (team.field.length >= state.fieldLimit[side]) return false;
  const remain = getBenchLockRemain(getCharacter(id), side);
  return remain <= 0;
}

function updateButtons() {
  const playerFieldSelected = state.selectedSide === "player" && state.selectedZone === "field";
  const playerBenchSelected = state.selectedSide === "player" && state.selectedZone === "bench";
  const playerTurn = state.turn === "player" && !state.gameOver && state.screen === "battle";
  const pending = Boolean(state.pendingAction);

  const fieldActionReady = playerFieldSelected && canAct(state.selectedId, "player");
  const benchActionReady =
    playerBenchSelected &&
    playerTurn &&
    !hasActed(state.selectedId) &&
    state.actionsUsed < 3 &&
    getBenchLockRemain(getCharacter(state.selectedId), "player") <= 0 &&
    (canDeployFromBench(state.selectedId, "player") || state.player.field.length > 0);

  if (els.attackBtn) {
    els.attackBtn.disabled = !(playerTurn && !pending && fieldActionReady);
  }
  if (els.skillBtn) {
    els.skillBtn.disabled = !(playerTurn && !pending && fieldActionReady && state.skillsUsed < 2);
  }
  if (els.swapBtn) {
    els.swapBtn.disabled = !(playerTurn && !pending && (fieldActionReady || benchActionReady));
  }
  if (els.endTurnBtn) {
    els.endTurnBtn.disabled = !(playerTurn && !pending);
  }
  if (els.cancelTargetBtn) {
    els.cancelTargetBtn.disabled = !pending;
  }

  const playerCanRevive =
    getSideChannel("player") === "revive" &&
    playerTurn &&
    !state.reviveUsed.player &&
    state.player.grave.length > 0 &&
    !pending;
  if (els.reviveBtn) {
    els.reviveBtn.disabled = !playerCanRevive;
  }
}

function render() {
  renderZone(els.enemyField, state.enemy.field, "enemy", "field");
  renderZone(els.enemyBench, state.enemy.bench, "enemy", "bench");
  renderGraveyard(els.enemyGrave, state.enemy.grave, "enemy");

  renderZone(els.playerField, state.player.field, "player", "field");
  renderZone(els.playerBench, state.player.bench, "player", "bench");
  renderGraveyard(els.playerGrave, state.player.grave, "player");

  els.turnLabel.textContent = state.turn === "player" ? "プレイヤー" : "相手";
  els.actionsUsed.textContent = String(state.actionsUsed);
  els.skillsUsed.textContent = String(state.skillsUsed);
  els.victoryLabel.textContent = getVictoryText();

  renderBattleChannels();
  els.playerFieldNote.textContent = `${state.player.field.length} / ${state.fieldLimit.player}`;
  els.enemyFieldNote.textContent = `${state.enemy.field.length} / ${state.fieldLimit.enemy}`;

  updateSelectedInfo();
  updateTargetHint();
  updateButtons();
  syncCharacterActionDialog();
}

function renderChannelListMarkup() {
  return CHANNELS.map(
    (channel) =>
      `<div class="channel-row"><strong>${channel.name}</strong><span>${channel.description}</span></div>`,
  ).join("");
}

function renderChannelReferencePanels() {
  const markup = renderChannelListMarkup();
  if (els.channelListPreview) {
    els.channelListPreview.innerHTML = markup;
  }
  if (els.channelInfoList) {
    els.channelInfoList.innerHTML = markup;
  }
}

function updatePlayerChannelDescription() {
  const selectedId = els.playerChannelSelect?.value;
  const channel = getChannelById(selectedId);
  if (!channel || !els.playerChannelDescription) return;
  els.playerChannelDescription.textContent = channel.description;
}

function setupChannelSelectionUI() {
  if (!els.playerChannelSelect) return;
  els.playerChannelSelect.innerHTML = CHANNELS.map((channel) => `<option value="${channel.id}">${channel.name}</option>`).join("");
  const selected = state.channels.player ?? CHANNELS[0].id;
  els.playerChannelSelect.value = selected;
  updatePlayerChannelDescription();
  renderChannelReferencePanels();
}

function pickEnemyChannelId() {
  const ids = CHANNELS.map((channel) => channel.id);
  return randomOf(ids) ?? CHANNELS[0].id;
}

function areChannelsReady() {
  return Boolean(state.channels.player && state.channels.enemy);
}

function updateChannelStepSummary() {
  const playerChannel = getChannelById(state.channels.player);
  const cpuChannel = getChannelById(state.channels.enemy);
  if (els.confirmPlayerChannelBtn) {
    els.confirmPlayerChannelBtn.textContent = areChannelsReady() ? "チャンネル再確定" : "チャンネルを確定";
  }
  if (els.playerChannelDescription) {
    if (playerChannel) {
      els.playerChannelDescription.textContent = playerChannel.description;
    } else {
      updatePlayerChannelDescription();
    }
  }
  if (els.cpuChannelName) {
    els.cpuChannelName.textContent = cpuChannel ? cpuChannel.name : "未決定";
  }
  if (els.cpuChannelDescription) {
    els.cpuChannelDescription.textContent = cpuChannel
      ? cpuChannel.description
      : "プレイヤーがチャンネル確定後にCPUが選択します。";
  }
  if (els.startBattleBtn) {
    els.startBattleBtn.disabled = !(isPreparationReady() && areChannelsReady());
  }
}

function renderBattleChannels() {
  const playerChannel = getChannelById(state.channels.player);
  const enemyChannel = getChannelById(state.channels.enemy);

  if (els.playerChannelLabel) {
    els.playerChannelLabel.textContent = playerChannel ? playerChannel.name : "未選択";
  }
  if (els.playerChannelDesc) {
    els.playerChannelDesc.textContent = playerChannel ? playerChannel.description : "チャンネル未設定";
  }
  if (els.enemyChannelLabel) {
    els.enemyChannelLabel.textContent = enemyChannel ? enemyChannel.name : "未選択";
  }
  if (els.enemyChannelDesc) {
    els.enemyChannelDesc.textContent = enemyChannel ? enemyChannel.description : "チャンネル未設定";
  }
}

function confirmChannelsForBattle() {
  if (!els.playerChannelSelect) return false;
  if (!isPreparationReady()) return false;
  state.channels.player = els.playerChannelSelect.value;
  state.channels.enemy = pickEnemyChannelId();
  updateChannelStepSummary();
  return areChannelsReady();
}

function applyChannelEffects(side, channelId) {
  state.fieldLimit[side] = channelId === "unity" ? 6 : 3;

  const team = getTeam(side);
  const sideIds = [...team.field, ...team.bench];

  sideIds.forEach((id) => {
    const character = getCharacter(id);
    if (!character) return;

    if (channelId === "blessing") {
      character.maxHp += 2;
      character.hp += 2;
    }

    if (channelId === "doping") {
      character.atk += 2;
    }

    if (channelId === "girls" && character.gender === "女") {
      character.maxHp += 10;
      character.hp += 10;
    }

    if (channelId === "boys" && character.gender === "男") {
      character.maxHp += 6;
      character.hp += 6;
      character.atk += 1;
    }

    character.hp = Math.min(character.hp, character.maxHp);
  });
}

function clearSelection() {
  state.selectedId = null;
  state.selectedSide = null;
  state.selectedZone = null;
  closeCharacterActionDialog();
}

function clearPendingAction() {
  state.pendingAction = null;
  closeCharacterActionDialog();
}

function removeFromArray(array, id) {
  return array.filter((item) => item !== id);
}

function clearPoison(character) {
  character.poison = null;
}

function knockout(side, id) {
  const team = getTeam(side);
  if (!team.field.includes(id) && !team.bench.includes(id)) return;

  team.field = removeFromArray(team.field, id);
  team.bench = removeFromArray(team.bench, id);
  if (!team.grave.includes(id)) team.grave.push(id);

  const character = getCharacter(id);
  character.hp = 0;
  character.paralyzeTurns = 0;
  character.poison = null;
  character.dots = [];
  character.shieldHits = 0;
  character.atkBuffs = [];
  character.atkZeroTurns = 0;
  character.atkMultiplierTurns = 0;
  character.skillMultiplierTurns = 0;

  if (state.selectedId === id) clearSelection();
  if (state.pendingAction && (state.pendingAction.actorId === id || state.pendingAction.data?.enemyId === id || state.pendingAction.data?.sourceId === id)) {
    clearPendingAction();
  }

  log(`${character.name} は気絶した。`);
  checkWinCondition();
}

function applyDamage(targetSide, targetId, damage, context = {}) {
  if (damage <= 0) return 0;
  const target = getCharacter(targetId);
  if (!target || target.hp <= 0) return 0;

  const reason = context.reason || "ダメージ";
  if (!context.ignoreShield && target.shieldHits > 0) {
    target.shieldHits -= 1;
    log(`${target.name} のシールドが攻撃を無効化した。`);
    return 0;
  }

  const before = target.hp;
  target.hp = Math.max(0, target.hp - damage);
  const dealt = before - target.hp;
  log(`${target.name} に${dealt}ダメージ（${reason}）。`);
  triggerCharacterAnimation(targetSide, targetId, "hit", 420);

  if (target.hp <= 0) knockout(targetSide, targetId);
  return dealt;
}

function heal(side, targetId, amount) {
  if (amount <= 0) return 0;
  const target = getCharacter(targetId);
  if (!target || target.hp <= 0) return 0;

  const before = target.hp;
  target.hp = Math.min(target.maxHp, target.hp + amount);
  const recovered = target.hp - before;
  if (recovered > 0) {
    log(`${target.name} が${recovered}回復。`);
  }
  return recovered;
}

function addDot(target, damage, turns) {
  target.dots.push({ damage, turns });
}

function addAtkBuff(target, amount, turns) {
  if (amount === 0 || turns <= 0) return;
  target.atkBuffs.push({ amount, turns });
}

function registerAction(actorId, usedSkill) {
  if (!hasActed(actorId)) {
    state.actedIds.push(actorId);
    state.actionsUsed += 1;
  }
  if (usedSkill) state.skillsUsed += 1;
}

function checkWinCondition() {
  if (state.gameOver) return true;
  const playerDown = state.player.field.length === 0;
  const enemyDown = state.enemy.field.length === 0;

  if (!playerDown && !enemyDown) return false;

  state.gameOver = true;
  if (playerDown && enemyDown) state.winner = "draw";
  else state.winner = playerDown ? "enemy" : "player";

  clearPendingAction();
  const resultText = state.winner === "draw" ? "引き分け。" : `${state.winner === "player" ? "プレイヤー" : "相手"}の勝利。`;
  log(`試合終了：${resultText}`);
  return true;
}

function decayOwnTurnEffects(side) {
  const ids = [...getTeam(side).field, ...getTeam(side).bench];
  ids.forEach((id) => {
    const character = getCharacter(id);
    if (!character) return;

    if (character.paralyzeTurns > 0) character.paralyzeTurns -= 1;
    if (character.atkZeroTurns > 0) character.atkZeroTurns -= 1;
    if (character.atkMultiplierTurns > 0) character.atkMultiplierTurns -= 1;
    if (character.skillMultiplierTurns > 0) character.skillMultiplierTurns -= 1;

    character.atkBuffs = character.atkBuffs
      .map((buff) => ({ ...buff, turns: buff.turns - 1 }))
      .filter((buff) => buff.turns > 0);
  });
}

function applyEndOfTurnStatusDamage() {
  const sides = ["player", "enemy"];
  for (const side of sides) {
    const fieldIds = [...getTeam(side).field];
    for (const id of fieldIds) {
      if (state.gameOver) return;
      const character = getCharacter(id);
      if (!character || character.hp <= 0) continue;

      if (character.poison) {
        const poisonDamage = character.poison.nextDamage;
        log(`${character.name} は毒で苦しんでいる。`);
        applyDamage(side, id, poisonDamage, { reason: "毒" });
        if (character.hp > 0 && character.poison) character.poison.nextDamage += 1;
      }

      if (state.gameOver || character.hp <= 0) continue;

      if (character.dots.length > 0) {
        character.dots.forEach((dot) => {
          if (character.hp > 0) {
            applyDamage(side, id, dot.damage, { reason: "継続ダメージ" });
          }
        });
        character.dots = character.dots
          .map((dot) => ({ ...dot, turns: dot.turns - 1 }))
          .filter((dot) => dot.turns > 0);
      }
    }
  }
}

function resolveTurnEnd(activeSide) {
  applyEndOfTurnStatusDamage();
  if (checkWinCondition()) return;
  decayOwnTurnEffects(activeSide);
}

function startTurn(side) {
  if (state.gameOver || state.screen !== "battle") return;
  state.turn = side;
  state.turnIndex[side] += 1;
  state.actionsUsed = 0;
  state.skillsUsed = 0;
  state.actedIds = [];
  clearPendingAction();
  clearSelection();
  log(`${side === "player" ? "プレイヤー" : "相手"}ターン開始。`);
  render();

  if (side === "enemy" && state.screen === "battle") {
    window.setTimeout(() => {
      void runEnemyTurn();
    }, getEnemyTurnDelay());
  }
}

function executeAttack(side, actorId, targetId) {
  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0) return;
  const targetSide = opposite(side);
  const damage = getCurrentAtk(actor);
  log(`${actor.name} が通常攻撃。`);
  triggerCharacterAnimation(side, actorId, "attack", 460);
  applyDamage(targetSide, targetId, damage, { reason: "通常攻撃" });
}

function executeSkill(side, actorId, targets = {}) {
  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0) return;
  const enemySide = opposite(side);
  const allyTeam = getTeam(side);
  const enemyTeam = getTeam(enemySide);
  triggerCharacterAnimation(side, actorId, "skill", 620);

  switch (actorId) {
    case "ao": {
      const targetId = targets.allyId;
      const healValue = scaleHealValue(actor, 2, side);
      const buffValue = scaleSkillValue(actor, 2);
      const buffTurn = scaleSkillTurn(actor, 2);
      heal(side, targetId, healValue);
      addAtkBuff(getCharacter(targetId), buffValue, buffTurn);
      log(`${actor.name} の支援で ${getCharacter(targetId).name} のATKが上昇。`);
      break;
    }
    case "akatsuki": {
      const targetId = targets.enemyId;
      if (rollChance(0.1, side)) {
        const damage = getCurrentAtk(actor) * 2;
        log(`${actor.name} の勝負勘が発動。ATK2倍！`);
        applyDamage(enemySide, targetId, damage, { reason: "暁スキル" });
      } else {
        log(`${actor.name} のスキルは不発。ATK0扱い。`);
      }
      break;
    }
    case "ako": {
      const dotDamage = scaleSkillValue(actor, 2);
      const dotTurns = scaleSkillTurn(actor, 2);
      if (rollChance(0.1, side)) {
        log(`${actor.name} の継続ダメージが全体化した。`);
        enemyTeam.field.forEach((enemyId) => {
          addDot(getCharacter(enemyId), dotDamage, dotTurns);
        });
      } else {
        addDot(getCharacter(targets.enemyId), dotDamage, dotTurns);
        log(`${getCharacter(targets.enemyId).name} に継続ダメージを付与。`);
      }
      break;
    }
    case "itsuki": {
      const target = getCharacter(targets.enemyId);
      const turn = scaleSkillTurn(actor, 2);
      target.paralyzeTurns = Math.max(target.paralyzeTurns, turn);
      log(`${target.name} は麻痺した（${turn}ターン）。`);
      break;
    }
    case "shiho": {
      const healBase = rollChance(0.1, side) ? 4 : 2;
      const healValue = scaleHealValue(actor, healBase, side);
      allyTeam.field.forEach((allyId) => {
        heal(side, allyId, healValue);
      });
      log(`${actor.name} が味方全体を回復。`);
      break;
    }
    case "takumi": {
      const healValue = scaleHealValue(actor, 5, side);
      heal(side, targets.allyId, healValue);
      break;
    }
    case "chiduru": {
      const enemyTarget = getCharacter(targets.enemyId);
      const allyTarget = getCharacter(targets.allyId);
      const stolenAtk = getCurrentAtk(enemyTarget);
      const turn = scaleSkillTurn(actor, 2);
      enemyTarget.atkZeroTurns = Math.max(enemyTarget.atkZeroTurns, turn);
      addAtkBuff(allyTarget, stolenAtk, turn);
      log(`${enemyTarget.name} のATKを封じ、${allyTarget.name} に${stolenAtk}上乗せ。`);
      break;
    }
    case "go": {
      const allyTarget = getCharacter(targets.allyId);
      if (rollChance(0.1, side)) {
        const turn = scaleSkillTurn(actor, 2);
        allyTarget.atkMultiplierTurns = Math.max(allyTarget.atkMultiplierTurns, turn);
        allyTarget.skillMultiplierTurns = Math.max(allyTarget.skillMultiplierTurns, turn);
        log(`${allyTarget.name} のATKとスキル数値が2倍化。`);
      } else {
        log(`${actor.name} の増幅は失敗した。`);
      }
      break;
    }
    case "mai": {
      const source = getCharacter(targets.sourceId);
      const targetId = targets.enemyId;
      const hpCostBase = scaleSkillValue(actor, 3);
      const hpCost = Math.max(0, Math.min(hpCostBase, source.hp - 1));
      if (hpCost > 0) {
        source.hp -= hpCost;
        log(`${source.name} のHPを${hpCost}消費。`);
      } else {
        log("HP消費ができず、追加威力は0。");
      }
      const damage = getCurrentAtk(actor) + hpCost;
      applyDamage(enemySide, targetId, damage, { reason: "舞依スキル" });
      break;
    }
    case "yuzuki": {
      const damage = scaleSkillValue(actor, 2);
      const healValue = scaleHealValue(actor, 2, side);
      applyDamage(enemySide, targets.enemyId, damage, { reason: "結月スキル" });
      heal(side, actorId, healValue);
      break;
    }
    case "ryuta": {
      const shieldValue = Math.max(1, scaleSkillValue(actor, 1));
      allyTeam.field.forEach((allyId) => {
        const ally = getCharacter(allyId);
        ally.shieldHits += shieldValue;
      });
      log(`${actor.name} が味方全体にシールド付与。`);
      break;
    }
    case "nana": {
      const target = getCharacter(targets.enemyId);
      if (target.poison) {
        log(`${target.name} には既に毒が付与されている。`);
      } else {
        const startDamage = Math.max(1, scaleSkillValue(actor, 1));
        target.poison = { nextDamage: startDamage };
        log(`${target.name} に毒を付与。`);
      }
      break;
    }
    default:
      break;
  }
}

async function handleCardClick(id, side, zone) {
  if (state.gameOver) return;

  if (state.turn === "player" && state.pendingAction) {
    const handled = await handlePendingSelection(id, side, zone);
    if (handled) {
      render();
      return;
    }
  }

  state.selectedId = id;
  state.selectedSide = side;
  state.selectedZone = zone;
  render();

  const canOpenActionDialog =
    state.turn === "player" &&
    state.screen === "battle" &&
    !state.pendingAction &&
    side === "player" &&
    (zone === "field" || zone === "bench");

  if (canOpenActionDialog) {
    openCharacterActionDialog(id, zone);
  } else {
    closeCharacterActionDialog();
  }
}

async function beginAttackSelection() {
  if (state.gameOver || state.turn !== "player" || state.screen !== "battle") return;

  if (!(state.selectedSide === "player" && state.selectedZone === "field")) {
    log("攻撃する味方フィールドキャラを選択してください。");
    return;
  }
  if (!canAct(state.selectedId, "player")) {
    log("このキャラは今ターン行動できません。");
    return;
  }

  state.pendingAction = {
    type: "attack",
    actorId: state.selectedId,
    prompt: `${getCharacter(state.selectedId).name} の攻撃先を選択してください。`,
  };
  closeCharacterActionDialog();
  render();
}

async function beginSkillSelection() {
  if (state.gameOver || state.turn !== "player" || state.screen !== "battle") return;

  if (!(state.selectedSide === "player" && state.selectedZone === "field")) {
    log("スキルを使う味方フィールドキャラを選択してください。");
    return;
  }
  if (!canAct(state.selectedId, "player")) {
    log("このキャラは今ターン行動できません。");
    return;
  }
  if (state.skillsUsed >= 2) {
    log("このターンのスキル使用上限（2回）です。");
    return;
  }

  const actorId = state.selectedId;
  const actor = getCharacter(actorId);

  if (["shiho", "ryuta"].includes(actorId)) {
    if (!(await confirmAction(`${actor.name} のスキルを使用しますか？`))) {
      return;
    }
    log(`${actor.name} がスキルを使用。`);
    executeSkill("player", actorId, {});
    registerAction(actorId, true);
    closeCharacterActionDialog();
    render();
    return;
  }

  if (["ao", "takumi", "go"].includes(actorId)) {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorId,
      step: "ally",
      data: {},
      prompt: `${actor.name} の対象となる味方フィールドを選択してください。`,
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (["akatsuki", "itsuki", "ako", "yuzuki", "nana"].includes(actorId)) {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorId,
      step: "enemy",
      data: {},
      prompt: `${actor.name} の対象となる敵フィールドを選択してください。`,
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (actorId === "chiduru") {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorId,
      step: "enemy",
      data: {},
      prompt: "ATKを封じる敵フィールドを選択してください。",
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (actorId === "mai") {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorId,
      step: "source",
      data: {},
      prompt: "HPを削る味方（自分可）を選択してください。",
    };
    closeCharacterActionDialog();
    render();
  }
}

async function handlePendingSelection(id, side, zone) {
  const action = state.pendingAction;
  if (!action) return false;

  if (action.type === "attack") {
    if (side !== "enemy" || zone !== "field") {
      log("攻撃対象は敵フィールドから選んでください。");
      return true;
    }

    const actor = getCharacter(action.actorId);
    const target = getCharacter(id);
    if (!(await confirmAction(`${actor.name} が ${target.name} を攻撃します。実行しますか？`))) {
      return true;
    }
    executeAttack("player", action.actorId, id);
    registerAction(action.actorId, false);
    clearPendingAction();
    checkWinCondition();
    return true;
  }

  if (action.type === "revive") {
    if (side !== "player" || zone !== "grave") {
      log("蘇生対象はプレイヤー気絶欄から選んでください。");
      return true;
    }
    const target = getCharacter(id);
    if (!(await confirmAction(`${target.name} を死者蘇生しますか？`))) {
      return true;
    }
    useRevive("player", id);
    clearPendingAction();
    return true;
  }

  if (action.type === "swap") {
    if (action.fromZone === "field") {
      if (side !== "player" || zone !== "bench") {
        log("交代先はプレイヤー控えから選択してください。");
        return true;
      }
      const team = state.player;
      const fieldId = action.actorId;
      const benchId = id;
      const fieldChar = getCharacter(fieldId);
      const benchChar = getCharacter(benchId);
      if (!fieldChar || !benchChar) return true;
      if (!team.field.includes(fieldId) || !team.bench.includes(benchId)) return true;
      if (getBenchLockRemain(benchChar, "player") > 0) {
        log("その控えキャラはまだ出撃できません。");
        return true;
      }

      if (!(await confirmAction(`${fieldChar.name} と ${benchChar.name} を交代しますか？`))) {
        return true;
      }

      team.field = removeFromArray(team.field, fieldId);
      team.bench = removeFromArray(team.bench, benchId);
      team.field.push(benchId);
      team.bench.push(fieldId);
      fieldChar.benchLockUntil = state.turnIndex.player + 2;
      clearPoison(fieldChar);
      consumeSwapAction(fieldId);
      log(`${fieldChar.name} と ${benchChar.name} を交代した。`);
      clearPendingAction();
      clearSelection();
      checkWinCondition();
      return true;
    }

    if (side !== "player" || zone !== "field") {
      log("交代先はプレイヤーフィールドから選択してください。");
      return true;
    }
    const team = state.player;
    const benchId = action.actorId;
    const fieldId = id;
    const benchChar = getCharacter(benchId);
    const fieldChar = getCharacter(fieldId);
    if (!benchChar || !fieldChar) return true;
    if (!team.bench.includes(benchId) || !team.field.includes(fieldId)) return true;

    if (!(await confirmAction(`${benchChar.name} と ${fieldChar.name} を交代しますか？`))) {
      return true;
    }

    team.bench = removeFromArray(team.bench, benchId);
    team.field = removeFromArray(team.field, fieldId);
    team.field.push(benchId);
    team.bench.push(fieldId);
    fieldChar.benchLockUntil = state.turnIndex.player + 2;
    clearPoison(fieldChar);
    consumeSwapAction(fieldId);
    log(`${benchChar.name} と ${fieldChar.name} を交代した。`);
    clearPendingAction();
    clearSelection();
    checkWinCondition();
    return true;
  }

  if (action.type !== "skill") return false;

  const actor = getCharacter(action.actorId);
  if (!actor || actor.hp <= 0) {
    clearPendingAction();
    return true;
  }

  const skillId = action.skillId;

  if (["ao", "takumi", "go"].includes(skillId)) {
    if (side !== "player" || zone !== "field") {
      log("味方フィールドを選択してください。");
      return true;
    }
    if (!(await confirmAction(`${actor.name} のスキル対象を ${getCharacter(id).name} にします。実行しますか？`))) {
      return true;
    }
    executeSkill("player", action.actorId, { allyId: id });
    registerAction(action.actorId, true);
    clearPendingAction();
    return true;
  }

  if (["akatsuki", "itsuki", "ako", "yuzuki", "nana"].includes(skillId)) {
    if (side !== "enemy" || zone !== "field") {
      log("敵フィールドを選択してください。");
      return true;
    }
    if (!(await confirmAction(`${actor.name} のスキルを ${getCharacter(id).name} に使用しますか？`))) {
      return true;
    }
    executeSkill("player", action.actorId, { enemyId: id });
    registerAction(action.actorId, true);
    clearPendingAction();
    checkWinCondition();
    return true;
  }

  if (skillId === "chiduru") {
    if (action.step === "enemy") {
      if (side !== "enemy" || zone !== "field") {
        log("まず敵フィールドを選択してください。");
        return true;
      }
      action.data.enemyId = id;
      action.step = "ally";
      action.prompt = "次に、ATKを上乗せする味方フィールドを選択してください。";
      return true;
    }
    if (side !== "player" || zone !== "field") {
      log("味方フィールドを選択してください。");
      return true;
    }
    if (!(await confirmAction(`${actor.name} のスキルを実行しますか？`))) {
      return true;
    }
    executeSkill("player", action.actorId, { enemyId: action.data.enemyId, allyId: id });
    registerAction(action.actorId, true);
    clearPendingAction();
    return true;
  }

  if (skillId === "mai") {
    if (action.step === "source") {
      if (side !== "player" || zone !== "field") {
        log("HPを削る対象は味方フィールドから選択してください。");
        return true;
      }
      action.data.sourceId = id;
      action.step = "enemy";
      action.prompt = "攻撃対象となる敵フィールドを選択してください。";
      return true;
    }
    if (side !== "enemy" || zone !== "field") {
      log("攻撃対象は敵フィールドから選択してください。");
      return true;
    }
    if (!(await confirmAction(`${actor.name} のスキルを実行しますか？`))) {
      return true;
    }
    executeSkill("player", action.actorId, { sourceId: action.data.sourceId, enemyId: id });
    registerAction(action.actorId, true);
    clearPendingAction();
    checkWinCondition();
    return true;
  }

  return false;
}

function consumeSwapAction(markActorId = null) {
  state.actionsUsed += 1;
  if (markActorId && !hasActed(markActorId)) {
    state.actedIds.push(markActorId);
  }
}

async function swapCharacter() {
  if (state.gameOver || state.turn !== "player") return;
  if (!state.selectedId || state.selectedSide !== "player") return;

  const team = state.player;
  const character = getCharacter(state.selectedId);
  if (!character) return;

  if (state.selectedZone === "field") {
    if (!canAct(state.selectedId, "player")) {
      log("このキャラは今ターン行動できません。");
      return;
    }
    if (team.bench.length > 0) {
      if (!(await confirmAction(`${character.name} を控えキャラと交代する対象選択に進みますか？`))) {
        return;
      }
      state.pendingAction = {
        type: "swap",
        fromZone: "field",
        actorId: state.selectedId,
        prompt: `${character.name} と交代する控えキャラを選択してください。`,
      };
      closeCharacterActionDialog();
      render();
      return;
    }
    if (team.field.length <= 1) {
      log("フィールドを0人にはできません。");
      return;
    }
    if (!(await confirmAction(`${character.name} を控えに戻しますか？`))) {
      return;
    }
    team.field = removeFromArray(team.field, state.selectedId);
    team.bench.push(state.selectedId);
    character.benchLockUntil = state.turnIndex.player + 2;
    clearPoison(character);
    registerAction(state.selectedId, false);
    log(`${character.name} を控えに戻した（2ターン出撃不可）。`);
  } else if (state.selectedZone === "bench") {
    if (state.actionsUsed >= 3 || hasActed(state.selectedId)) {
      log("このターンはもう出撃できません。");
      return;
    }
    if (getBenchLockRemain(character, "player") > 0) {
      log("このキャラはまだ出撃できません。");
      return;
    }

    if (team.field.length >= state.fieldLimit.player) {
      if (!(await confirmAction(`${character.name} をフィールドキャラと交代する対象選択に進みますか？`))) {
        return;
      }
      state.pendingAction = {
        type: "swap",
        fromZone: "bench",
        actorId: state.selectedId,
        prompt: `${character.name} と交代するフィールドキャラを選択してください。`,
      };
      closeCharacterActionDialog();
      render();
      return;
    }

    if (!canDeployFromBench(state.selectedId, "player")) {
      log("このキャラはまだ出撃できません。");
      return;
    }
    if (!(await confirmAction(`${character.name} をフィールドに出撃させますか？`))) {
      return;
    }
    team.bench = removeFromArray(team.bench, state.selectedId);
    team.field.push(state.selectedId);
    consumeSwapAction();
    log(`${character.name} をフィールドに出撃させた。`);
    closeCharacterActionDialog();
  }

  clearSelection();
  checkWinCondition();
  render();
}

function startReviveSelection() {
  if (state.gameOver || state.turn !== "player") return;
  if (getSideChannel("player") !== "revive") {
    log("死者蘇生チャンネル選択時のみ使用できます。");
    return;
  }
  if (state.reviveUsed.player) {
    log("死者蘇生は既に使用済みです。");
    return;
  }
  if (!state.player.grave.length) {
    log("蘇生できる気絶キャラがいません。");
    return;
  }

  state.pendingAction = {
    type: "revive",
    prompt: "蘇生するキャラをプレイヤー気絶欄から選択してください。",
  };
  render();
}

function useRevive(side, id) {
  if (getSideChannel(side) !== "revive") return false;
  if (state.reviveUsed[side]) return false;

  const team = getTeam(side);
  if (!team.grave.includes(id)) return false;

  team.grave = removeFromArray(team.grave, id);
  const character = getCharacter(id);
  character.hp = character.maxHp;
  character.paralyzeTurns = 0;
  character.poison = null;
  character.dots = [];
  character.shieldHits = 0;
  character.atkBuffs = [];
  character.atkZeroTurns = 0;
  character.atkMultiplierTurns = 0;
  character.skillMultiplierTurns = 0;
  character.benchLockUntil = 0;

  if (team.field.length < state.fieldLimit[side]) {
    team.field.push(id);
    log(`${character.name} を全回復でフィールド復帰。`);
  } else {
    team.bench.push(id);
    log(`${character.name} を全回復で控え復帰。`);
  }

  state.reviveUsed[side] = true;
  return true;
}

function enemyCanUseSkill(actorId) {
  if (state.skillsUsed >= 2) return false;

  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0 || actor.paralyzeTurns > 0) return false;

  const allyField = [...state.enemy.field];
  const enemyField = [...state.player.field];

  switch (actorId) {
    case "ao":
    case "takumi":
    case "go":
      return allyField.length > 0;
    case "akatsuki":
    case "itsuki":
    case "ako":
    case "yuzuki":
    case "nana":
      return enemyField.length > 0;
    case "shiho":
    case "ryuta":
      return allyField.length > 0;
    case "chiduru":
      return allyField.length > 0 && enemyField.length > 0;
    case "mai":
      return allyField.some((memberId) => getCharacter(memberId).hp > 1) && enemyField.length > 0;
    default:
      return false;
  }
}

function pickEnemySkillTargets(actorId) {
  const allyField = [...state.enemy.field];
  const enemyField = [...state.player.field];

  switch (actorId) {
    case "ao":
    case "takumi": {
      const lowest = allyField.slice().sort((a, b) => getCharacter(a).hp - getCharacter(b).hp)[0];
      return lowest ? { allyId: lowest } : null;
    }
    case "go":
      return allyField.length ? { allyId: randomOf(allyField) } : null;
    case "akatsuki":
    case "itsuki":
    case "ako":
    case "yuzuki":
    case "nana":
      return enemyField.length ? { enemyId: randomOf(enemyField) } : null;
    case "shiho":
    case "ryuta":
      return {};
    case "chiduru":
      if (!allyField.length || !enemyField.length) return null;
      return { enemyId: randomOf(enemyField), allyId: randomOf(allyField) };
    case "mai": {
      const sources = allyField.filter((memberId) => getCharacter(memberId).hp > 1);
      if (!sources.length || !enemyField.length) return null;
      return { sourceId: randomOf(sources), enemyId: randomOf(enemyField) };
    }
    default:
      return null;
  }
}

function maybeEnemyUseRevive() {
  if (getSideChannel("enemy") !== "revive") return;
  if (state.reviveUsed.enemy) return;
  if (!state.enemy.grave.length) return;
  if (!rollChance(0.45, "enemy")) return;
  const targetId = randomOf(state.enemy.grave);
  if (targetId) useRevive("enemy", targetId);
}

async function runEnemyTurn() {
  if (state.gameOver || state.turn !== "enemy" || state.screen !== "battle") return;
  await sleep(getEnemyTurnDelay());

  maybeEnemyUseRevive();
  await sleep(getEnemyActionDelay());

  const order = shuffled(state.enemy.field);
  for (const actorId of order) {
    if (state.gameOver || state.actionsUsed >= 3) break;
    if (!state.enemy.field.includes(actorId)) continue;

    const actor = getCharacter(actorId);
    if (!actor || actor.hp <= 0) continue;
    log(`CPUが ${actor.name} の行動を判断中…`);
    await sleep(getEnemyActionDelay());

    if (actor.paralyzeTurns > 0) {
      log(`${actor.name} は麻痺で行動不能。`);
      await sleep(getEnemyActionDelay());
      continue;
    }

    const useSkill = enemyCanUseSkill(actorId) && Math.random() < 0.55;
    if (useSkill) {
      const targets = pickEnemySkillTargets(actorId);
      if (targets) {
        log(`${actor.name} がスキルを使用。`);
        executeSkill("enemy", actorId, targets);
        registerAction(actorId, true);
        await sleep(getEnemyActionDelay());
        if (checkWinCondition()) break;
        continue;
      }
    }

    const targetId = randomOf(state.player.field);
    if (!targetId) break;
    executeAttack("enemy", actorId, targetId);
    registerAction(actorId, false);
    await sleep(getEnemyActionDelay());
    if (checkWinCondition()) break;
  }

  resolveTurnEnd("enemy");
  if (state.gameOver) {
    render();
    return;
  }
  startTurn("player");
}

async function endPlayerTurn() {
  if (state.gameOver || state.turn !== "player" || state.screen !== "battle") return;
  if (state.pendingAction) {
    log("対象選択をキャンセルしてからターン終了してください。");
    return;
  }
  if (!(await confirmAction("ターンを終了しますか？"))) return;
  resolveTurnEnd("player");
  if (state.gameOver) {
    render();
    return;
  }
  startTurn("enemy");
}

function openSettingsDialog() {
  syncSettingsUI();
  els.settingsDialog.showModal();
}

function closeSettingsDialog() {
  state.settings.confirmActions = Boolean(els.confirmActionsToggle.checked);
  state.settings.fastEnemy = Boolean(els.fastEnemyToggle.checked);
  els.settingsDialog.close();
}

function openChannelInfoDialog() {
  renderChannelReferencePanels();
  els.channelInfoDialog?.showModal();
}

function closeChannelInfoDialog() {
  els.channelInfoDialog?.close();
}

async function startBattle() {
  if (!isPreparationReady()) {
    log("編成を完了してから対戦を開始してください。");
    showTopScreen();
    showTopStep("team");
    renderPreparation();
    return;
  }
  if (!areChannelsReady()) {
    log("チャンネルを確定してから対戦を開始してください。");
    showTopScreen();
    showTopStep("channel");
    updateChannelStepSummary();
    return;
  }
  if (!(await confirmAction("対戦を開始しますか？"))) return;

  els.logArea.innerHTML = "";
  resetMatchState();
  showBattleScreen();
  log("対戦を開始します。");
  startTurn("player");
}

async function resetGame() {
  if (!(await confirmAction("対戦をリセットして最初からやり直しますか？"))) return;
  els.logArea.innerHTML = "";
  resetMatchState();
  showBattleScreen();
  log("対戦をリセットしました。");
  startTurn("player");
}

async function backToTop() {
  const hasPending = Boolean(state.pendingAction);
  const message = hasPending
    ? "対象選択を中断してトップ画面に戻りますか？"
    : "トップ画面に戻りますか？対戦は一時停止します。";
  if (!(await confirmAction(message))) return;
  clearPendingAction();
  clearSelection();
  showTopScreen();
  showTopStep("team");
  setupChannelSelectionUI();
  updateChannelStepSummary();
  renderPreparation();
}

function setupEvents() {
  els.toChannelStepBtn.addEventListener("click", () => {
    if (!isPreparationReady()) {
      log("まず6人編成（戦闘1〜3人、合計6人）を完了してください。");
      renderPreparation();
      return;
    }
    setupChannelSelectionUI();
    updateChannelStepSummary();
    showTopStep("channel");
  });

  els.backToTeamStepBtn.addEventListener("click", () => {
    showTopStep("team");
    renderPreparation();
  });

  els.playerChannelSelect.addEventListener("change", () => {
    updatePlayerChannelDescription();
    state.channels.player = null;
    state.channels.enemy = null;
    updateChannelStepSummary();
  });

  els.confirmPlayerChannelBtn.addEventListener("click", async () => {
    if (!isPreparationReady()) {
      log("編成を完了してからチャンネルを確定してください。");
      showTopStep("team");
      return;
    }
    const selected = getChannelById(els.playerChannelSelect.value);
    const selectedName = selected ? selected.name : "未選択";
    if (!(await confirmAction(`プレイヤーチャンネルを「${selectedName}」で確定しますか？`))) return;
    confirmChannelsForBattle();
    renderBattleChannels();
    log(`チャンネル確定: プレイヤー「${getChannelById(state.channels.player)?.name ?? "未選択"}」 / CPU「${getChannelById(state.channels.enemy)?.name ?? "未選択"}」`);
  });

  els.startBattleBtn.addEventListener("click", () => {
    void startBattle();
  });
  els.openSettingsFromTopBtn.addEventListener("click", openSettingsDialog);
  els.openSettingsFromChannelStepBtn.addEventListener("click", openSettingsDialog);
  els.openChannelInfoFromTopBtn.addEventListener("click", openChannelInfoDialog);
  els.openChannelInfoBtn.addEventListener("click", openChannelInfoDialog);
  els.closeChannelInfoBtn.addEventListener("click", closeChannelInfoDialog);
  els.openSettingsBtn.addEventListener("click", openSettingsDialog);
  els.closeSettingsBtn.addEventListener("click", closeSettingsDialog);
  els.confirmActionsToggle.addEventListener("change", () => {
    state.settings.confirmActions = Boolean(els.confirmActionsToggle.checked);
  });
  els.fastEnemyToggle.addEventListener("change", () => {
    state.settings.fastEnemy = Boolean(els.fastEnemyToggle.checked);
  });
  els.resetGameBtn.addEventListener("click", () => {
    void resetGame();
  });
  els.backToTopBtn.addEventListener("click", () => {
    void backToTop();
  });

  els.prepRoster.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.prepAction;
    const id = target.dataset.charId;
    if (!action || !id) return;
    if (!Object.prototype.hasOwnProperty.call(BASE_CHARACTERS, id)) return;
    setPreparationRole(id, action);
  });

  els.attackBtn.addEventListener("click", () => {
    void beginAttackSelection();
  });
  els.skillBtn.addEventListener("click", () => {
    void beginSkillSelection();
  });
  els.swapBtn.addEventListener("click", () => {
    void swapCharacter();
  });
  els.cancelTargetBtn.addEventListener("click", () => {
    clearPendingAction();
    render();
  });
  els.reviveBtn.addEventListener("click", startReviveSelection);
  els.endTurnBtn.addEventListener("click", () => {
    void endPlayerTurn();
  });

  els.clearLogBtn.addEventListener("click", () => {
    els.logArea.innerHTML = "";
  });

  els.openRulesBtn.addEventListener("click", () => els.rulesDialog.showModal());
  els.closeRulesBtn.addEventListener("click", () => els.rulesDialog.close());
  els.settingsDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeSettingsDialog();
  });
  els.actionConfirmOkBtn.addEventListener("click", () => resolveConfirmDialog(true));
  els.actionConfirmCancelBtn.addEventListener("click", () => resolveConfirmDialog(false));
  els.actionConfirmDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    resolveConfirmDialog(false);
  });
  els.closeCharacterActionBtn.addEventListener("click", closeCharacterActionDialog);
  els.characterActionDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeCharacterActionDialog();
  });
  els.channelInfoDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeChannelInfoDialog();
  });
}

function init() {
  resetMatchState();
  setupEvents();
  syncSettingsUI();
  setupChannelSelectionUI();
  updateChannelStepSummary();
  showTopScreen();
  showTopStep("team");
  renderPreparation();
  log("トップ画面で編成を選択してください。");
  render();
}

init();

