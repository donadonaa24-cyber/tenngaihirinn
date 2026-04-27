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
    skill: "味方全体に攻撃無効シールド（各キャラ最大2）",
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
  ao: "碧.png",
  akatsuki: "暁.png",
  ako: "亜湖.png",
  itsuki: "樹.png",
  shiho: "志保.png",
  takumi: "拓海.png",
  chiduru: "千鶴.png",
  go: "剛.png",
  mai: "舞依.png",
  yuzuki: "結月.png",
  ryuta: "龍太.png",
  nana: "栞那.png",
};

const CHARACTER_CARD_ART_FILES = {
  // 後からカードイラストを差し込む場合はここに `id: "file.png"` を追加する。
};

const ILLUSTRATION_DIR = "assets/イラスト";

function resolveIllustrationPath(fileName) {
  if (!fileName) return "";
  if (/^(?:https?:|data:|blob:)/.test(fileName)) return fileName;
  if (fileName.startsWith("/") || fileName.startsWith("assets/")) return fileName;
  return `${ILLUSTRATION_DIR}/${fileName}`;
}

function getCharacterPortrait(id) {
  return resolveIllustrationPath(CHARACTER_PORTRAIT_FILES[id] ?? "");
}

function getCharacterCardArt(id) {
  return resolveIllustrationPath(CHARACTER_CARD_ART_FILES[id] ?? CHARACTER_PORTRAIT_FILES[id] ?? "");
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

const PRACTICE_ENEMY_TEAM_PRESETS = [
  {
    id: "standard",
    name: "標準対戦チーム",
    summary: "既存CPU対戦と同じ、バランス確認用の基本編成。",
    field: ["chiduru", "go", "mai"],
    bench: ["yuzuki", "ryuta", "nana"],
  },
  {
    id: "riot_focus",
    name: "Riot守備練習",
    summary: "Riotの被ダメージ軽減を相手側で確認しやすい編成。",
    field: ["chiduru", "ao", "ryuta"],
    bench: ["nana", "akatsuki", "shiho"],
  },
  {
    id: "crest_focus",
    name: "Crest連携練習",
    summary: "Crestの回復・シールド補助を相手側で確認しやすい編成。",
    field: ["akatsuki", "shiho", "go"],
    bench: ["itsuki", "ako", "chiduru"],
  },
  {
    id: "aster_focus",
    name: "Aster火力練習",
    summary: "Asterの直接ダメージ補助を相手側で確認しやすい編成。",
    field: ["mai", "takumi", "yuzuki"],
    bench: ["ao", "nana", "ryuta"],
  },
];

const STORY_TUTORIAL = {
  id: "tutorial-basic",
  title: "チュートリアル: 基本操作",
  summary: "キャラ選択・攻撃・スキル・交代の流れを確認する導入バトルです。",
  scriptPreview: [
    "導入: 操作説明パート（後で本文追加）",
    "演出: キャラ同士の会話パート（後で本文追加）",
    "バトル: 3vs3形式のチュートリアル戦",
  ],
  playerTeam: {
    field: ["ao", "akatsuki", "shiho"],
    bench: ["itsuki", "takumi", "ako"],
  },
  enemyTeam: {
    field: ["chiduru", "go", "mai"],
    bench: ["yuzuki", "ryuta", "nana"],
  },
  channels: {
    player: null,
    enemy: null,
  },
  introLogs: [
    "チュートリアル開始: ここに段階的な説明ログを追加できます。",
    "TODO: チュートリアル専用ガイド演出を実装予定。",
  ],
};

const STORY_CHAPTERS = [
  {
    id: "chapter-01",
    title: "第一章: 開幕の火花",
    summary: "小説パートからチーム戦へ移行する最初の章（本文は後から追加）。",
    scriptPreview: [
      "第一章本文（仮）: プロローグの会話シーン",
      "第一章本文（仮）: チーム結成の動機",
      "第一章本文（仮）: 開幕戦への導線",
    ],
    recommendedTeam: {
      field: ["ao", "akatsuki", "ako"],
      bench: ["itsuki", "shiho", "takumi"],
    },
    enemyTeam: {
      field: ["chiduru", "go", "mai"],
      bench: ["yuzuki", "ryuta", "nana"],
    },
    channels: {
      player: null,
      enemy: null,
    },
    introLogs: [
      "第一章バトル開始: 小説パートの結果をここで反映できます。",
      "TODO: 章ごとの専用演出・分岐処理を追加予定。",
    ],
  },
  {
    id: "chapter-02",
    title: "第二章: 交差する戦略",
    summary: "戦略重視のチーム戦を想定した章（本文は後から追加）。",
    scriptPreview: [
      "第二章本文（仮）: 戦術会議シーン",
      "第二章本文（仮）: 相手チーム分析",
      "第二章本文（仮）: 出撃直前の掛け合い",
    ],
    recommendedTeam: {
      field: ["shiho", "takumi", "go"],
      bench: ["ao", "ako", "itsuki"],
    },
    enemyTeam: {
      field: ["akatsuki", "ryuta", "nana"],
      bench: ["chiduru", "mai", "yuzuki"],
    },
    channels: {
      player: null,
      enemy: null,
    },
    introLogs: [
      "第二章バトル開始: 章専用ルールをここに追加できます。",
      "TODO: 勝敗後の小説分岐を接続予定。",
    ],
  },
];

function cloneTeamConfig(team, fallbackTeam) {
  const fallback = fallbackTeam ?? { field: [], bench: [] };
  const field = Array.isArray(team?.field) ? [...team.field] : [...(fallback.field ?? [])];
  const bench = Array.isArray(team?.bench) ? [...team.bench] : [...(fallback.bench ?? [])];
  return { field, bench };
}

function cloneChannelConfig(channels, fallback = { player: null, enemy: null }) {
  return {
    player: channels?.player ?? fallback.player ?? null,
    enemy: channels?.enemy ?? fallback.enemy ?? null,
  };
}

function createMatchSetup(source, payload = {}) {
  return {
    source,
    storyChapterId: payload.storyChapterId ?? null,
    storyLabel: payload.storyLabel ?? null,
    playerTeam: cloneTeamConfig(payload.playerTeam, INITIAL_TEAMS.player),
    enemyTeam: cloneTeamConfig(payload.enemyTeam, INITIAL_TEAMS.enemy),
    channels: cloneChannelConfig(payload.channels),
    introLogs: Array.isArray(payload.introLogs) ? [...payload.introLogs] : [],
  };
}

const CHARACTERS = {};
const TEAM_PRESET_MAX = 10;
const TEAM_PRESET_NAME_MAX = 24;
const TEAM_PRESET_STORAGE_KEY = "tengai_hirin_team_presets_v1";

const state = {
  screen: "top",
  topStep: "title",
  selectedMode: null,
  prepContext: "cpu",
  storyView: "menu",
  storySelectedChapterId: STORY_CHAPTERS[0]?.id ?? null,
  topHeroImage: null,
  turn: "player",
  turnIndex: { player: 0, enemy: 0 },
  actionsUsed: 0,
  skillsUsed: 0,
  actedIds: [],
  lastAction: { player: null, enemy: null },
  turnActionBonus: { player: 0, enemy: 0 },
  momentum: { player: 0, enemy: 0 },
  signal: {
    lastResolvedRound: 0,
    boostTurns: { player: 0, enemy: 0 },
    holder: null,
    message: "シグナル争奪準備中",
  },
  turnPerks: {
    player: {},
    enemy: {},
  },
  matchStats: {
    playerDamage: 0,
    enemyDamage: 0,
    playerKOs: 0,
    enemyKOs: 0,
    playerTacticalCalls: 0,
    enemyTacticalCalls: 0,
    signalWins: { player: 0, enemy: 0 },
    roleCombos: { player: 0, enemy: 0 },
  },
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
  cpuNotice: "相手待機中",
  autoEndingTurn: false,
  turnTransitioning: false,
  enemyTurnRunning: false,
  audio: {
    track: null,
    sfx: {},
    lastSfxAt: {},
  },
  settings: {
    confirmActions: true,
    fastEnemy: false,
    bgmVolume: 70,
    bgmMuted: false,
    sfxVolume: 80,
    sfxMuted: false,
  },
  prepRoleTargetId: null,
  prepAutoChannelPrompted: false,
  prepAutoChannelPrompting: false,
  practice: {
    enemyTeamPresetId: PRACTICE_ENEMY_TEAM_PRESETS[0]?.id ?? "standard",
    playerChannelId: CHANNELS[0]?.id ?? null,
    enemyChannelId: CHANNELS[1]?.id ?? CHANNELS[0]?.id ?? null,
    cpuBehavior: "normal",
  },
  teamPresets: Array.from({ length: TEAM_PRESET_MAX }, () => null),
  selectedPresetSlot: 0,
  preparation: {
    field: [],
    bench: [],
  },
  matchSetup: createMatchSetup("cpu", {
    playerTeam: INITIAL_TEAMS.player,
    enemyTeam: INITIAL_TEAMS.enemy,
    channels: { player: null, enemy: null },
    storyLabel: null,
    storyChapterId: null,
  }),
  player: { field: [...INITIAL_TEAMS.player.field], bench: [...INITIAL_TEAMS.player.bench], grave: [] },
  enemy: { field: [...INITIAL_TEAMS.enemy.field], bench: [...INITIAL_TEAMS.enemy.bench], grave: [] },
};

const els = {
  battleApp: document.getElementById("battleApp"),
  topScreen: document.getElementById("topScreen"),
  topScreenSettingsBtn: document.getElementById("topScreenSettingsBtn"),
  topIntro: document.getElementById("topIntro"),
  titleStepPanel: document.getElementById("titleStepPanel"),
  modeStepPanel: document.getElementById("modeStepPanel"),
  storyStepPanel: document.getElementById("storyStepPanel"),
  practiceStepPanel: document.getElementById("practiceStepPanel"),
  galleryStepPanel: document.getElementById("galleryStepPanel"),
  modeRulesStepPanel: document.getElementById("modeRulesStepPanel"),
  teamStepPanel: document.getElementById("teamStepPanel"),
  channelStepPanel: document.getElementById("channelStepPanel"),
  beginPreparationBtn: document.getElementById("beginPreparationBtn"),
  chooseStoryModeBtn: document.getElementById("chooseStoryModeBtn"),
  chooseCpuModeBtn: document.getElementById("chooseCpuModeBtn"),
  choosePracticeModeBtn: document.getElementById("choosePracticeModeBtn"),
  openGalleryModeBtn: document.getElementById("openGalleryModeBtn"),
  openModeRulesBtn: document.getElementById("openModeRulesBtn"),
  backToTitleFromModeBtn: document.getElementById("backToTitleFromModeBtn"),
  storyStepHeading: document.getElementById("storyStepHeading"),
  storyStepSummary: document.getElementById("storyStepSummary"),
  storyTutorialEntryBtn: document.getElementById("storyTutorialEntryBtn"),
  storyMainEntryBtn: document.getElementById("storyMainEntryBtn"),
  storyContentTitle: document.getElementById("storyContentTitle"),
  storyContentDescription: document.getElementById("storyContentDescription"),
  storyChapterList: document.getElementById("storyChapterList"),
  storyScriptPreview: document.getElementById("storyScriptPreview"),
  storyStartTutorialBtn: document.getElementById("storyStartTutorialBtn"),
  storySelectChapterBtn: document.getElementById("storySelectChapterBtn"),
  backToModeFromStoryBtn: document.getElementById("backToModeFromStoryBtn"),
  openSettingsFromStoryStepBtn: document.getElementById("openSettingsFromStoryStepBtn"),
  practiceEnemyTeamList: document.getElementById("practiceEnemyTeamList"),
  practicePlayerChannelList: document.getElementById("practicePlayerChannelList"),
  practiceEnemyChannelList: document.getElementById("practiceEnemyChannelList"),
  practiceSetupCpuControl: document.getElementById("practiceSetupCpuControl"),
  practiceSetupSummary: document.getElementById("practiceSetupSummary"),
  practiceStartBtn: document.getElementById("practiceStartBtn"),
  backToTeamFromPracticeBtn: document.getElementById("backToTeamFromPracticeBtn"),
  backToModeFromPracticeBtn: document.getElementById("backToModeFromPracticeBtn"),
  galleryRosterGrid: document.getElementById("galleryRosterGrid"),
  galleryTeamEffectList: document.getElementById("galleryTeamEffectList"),
  modeRulesTeamEffectList: document.getElementById("modeRulesTeamEffectList"),
  modeRulesChannelList: document.getElementById("modeRulesChannelList"),
  backToModeFromGalleryBtn: document.getElementById("backToModeFromGalleryBtn"),
  backToModeFromRulesBtn: document.getElementById("backToModeFromRulesBtn"),
  teamStepTitle: document.getElementById("teamStepTitle"),
  teamStepDescription: document.getElementById("teamStepDescription"),
  toChannelStepBtn: document.getElementById("toChannelStepBtn"),
  backFromTeamStepBtn: document.getElementById("backFromTeamStepBtn"),
  backToTeamStepBtn: document.getElementById("backToTeamStepBtn"),
  openSettingsFromTopBtn: document.getElementById("openSettingsFromTopBtn"),
  openSettingsFromChannelStepBtn: document.getElementById("openSettingsFromChannelStepBtn"),
  channelChoiceList: document.getElementById("channelChoiceList"),
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
  teamPresetSlotSelect: document.getElementById("teamPresetSlotSelect"),
  teamPresetNameInput: document.getElementById("teamPresetNameInput"),
  saveTeamPresetBtn: document.getElementById("saveTeamPresetBtn"),
  loadTeamPresetBtn: document.getElementById("loadTeamPresetBtn"),
  deleteTeamPresetBtn: document.getElementById("deleteTeamPresetBtn"),
  teamPresetList: document.getElementById("teamPresetList"),
  prepSynergyGuide: document.getElementById("prepSynergyGuide"),
  recommendedTeamList: document.getElementById("recommendedTeamList"),
  roleOrderGuide: document.getElementById("roleOrderGuide"),
  openTopMenuBtn: document.getElementById("openTopMenuBtn"),
  topMenuPanel: document.getElementById("topMenuPanel"),
  backToTopBtn: document.getElementById("backToTopBtn"),
  resetGameBtn: document.getElementById("resetGameBtn"),
  menuConfirmActionsToggle: document.getElementById("menuConfirmActionsToggle"),
  menuFastEnemyToggle: document.getElementById("menuFastEnemyToggle"),
  menuBgmVolumeSlider: document.getElementById("menuBgmVolumeSlider"),
  menuBgmVolumeValue: document.getElementById("menuBgmVolumeValue"),
  menuBgmMuteToggleBtn: document.getElementById("menuBgmMuteToggleBtn"),
  menuSfxVolumeSlider: document.getElementById("menuSfxVolumeSlider"),
  menuSfxVolumeValue: document.getElementById("menuSfxVolumeValue"),
  menuSfxMuteToggleBtn: document.getElementById("menuSfxMuteToggleBtn"),
  playerField: document.getElementById("playerField"),
  enemyField: document.getElementById("enemyField"),
  playerBench: document.getElementById("playerBench"),
  enemyBench: document.getElementById("enemyBench"),
  playerGrave: document.getElementById("playerGrave"),
  enemyGrave: document.getElementById("enemyGrave"),
  playerFieldNote: document.getElementById("playerFieldNote"),
  enemyFieldNote: document.getElementById("enemyFieldNote"),
  playerFieldChannelBadge: document.getElementById("playerFieldChannelBadge"),
  enemyFieldChannelBadge: document.getElementById("enemyFieldChannelBadge"),
  playerFieldSynergyPanel: document.getElementById("playerFieldSynergyPanel"),
  turnLabel: document.getElementById("turnLabel"),
  actionsUsed: document.getElementById("actionsUsed"),
  actionLimit: document.getElementById("actionLimit"),
  skillsUsed: document.getElementById("skillsUsed"),
  skillLimit: document.getElementById("skillLimit"),
  victoryLabel: document.getElementById("victoryLabel"),
  playerMomentumFill: document.getElementById("playerMomentumFill"),
  enemyMomentumFill: document.getElementById("enemyMomentumFill"),
  playerMomentumValue: document.getElementById("playerMomentumValue"),
  enemyMomentumValue: document.getElementById("enemyMomentumValue"),
  signalRoundLabel: document.getElementById("signalRoundLabel"),
  signalStatus: document.getElementById("signalStatus"),
  synergyStatus: document.getElementById("synergyStatus"),
  focusCallBtn: document.getElementById("focusCallBtn"),
  recoverCallBtn: document.getElementById("recoverCallBtn"),
  coverCallBtn: document.getElementById("coverCallBtn"),
  tempoCallBtn: document.getElementById("tempoCallBtn"),
  focusCallDialogBtn: document.getElementById("focusCallDialogBtn"),
  recoverCallDialogBtn: document.getElementById("recoverCallDialogBtn"),
  coverCallDialogBtn: document.getElementById("coverCallDialogBtn"),
  tempoCallDialogBtn: document.getElementById("tempoCallDialogBtn"),
  tacticalHint: document.getElementById("tacticalHint"),
  playerChannelLabel: document.getElementById("playerChannelLabel"),
  playerChannelDesc: document.getElementById("playerChannelDesc"),
  playerTopSynergyStatus: document.getElementById("playerTopSynergyStatus"),
  enemyChannelLabel: document.getElementById("enemyChannelLabel"),
  enemyChannelDesc: document.getElementById("enemyChannelDesc"),
  enemyTopSynergyStatus: document.getElementById("enemyTopSynergyStatus"),
  battleChannelList: document.getElementById("battleChannelList"),
  openChannelInfoBtn: document.getElementById("openChannelInfoBtn"),
  turnBanner: document.getElementById("turnBanner"),
  chanceOverlay: document.getElementById("chanceOverlay"),
  chanceTitle: document.getElementById("chanceTitle"),
  chanceRate: document.getElementById("chanceRate"),
  chanceSpinBtn: document.getElementById("chanceSpinBtn"),
  chanceCountdown: document.getElementById("chanceCountdown"),
  chanceResult: document.getElementById("chanceResult"),
  chanceSlots: Array.from(document.querySelectorAll(".chance-slot")),
  practiceCpuControl: document.getElementById("practiceCpuControl"),
  cpuActionNotice: document.getElementById("cpuActionNotice"),
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
  bgmVolumeSlider: document.getElementById("bgmVolumeSlider"),
  bgmVolumeValue: document.getElementById("bgmVolumeValue"),
  bgmMuteToggleBtn: document.getElementById("bgmMuteToggleBtn"),
  sfxVolumeSlider: document.getElementById("sfxVolumeSlider"),
  sfxVolumeValue: document.getElementById("sfxVolumeValue"),
  sfxMuteToggleBtn: document.getElementById("sfxMuteToggleBtn"),
  actionConfirmDialog: document.getElementById("actionConfirmDialog"),
  actionConfirmMessage: document.getElementById("actionConfirmMessage"),
  actionConfirmOkBtn: document.getElementById("actionConfirmOkBtn"),
  actionConfirmCancelBtn: document.getElementById("actionConfirmCancelBtn"),
  hpSpendDialog: document.getElementById("hpSpendDialog"),
  hpSpendPrompt: document.getElementById("hpSpendPrompt"),
  hpSpendRange: document.getElementById("hpSpendRange"),
  hpSpendNumber: document.getElementById("hpSpendNumber"),
  hpSpendValue: document.getElementById("hpSpendValue"),
  hpSpendOkBtn: document.getElementById("hpSpendOkBtn"),
  hpSpendCancelBtn: document.getElementById("hpSpendCancelBtn"),
  characterActionDialog: document.getElementById("characterActionDialog"),
  characterActionTitle: document.getElementById("characterActionTitle"),
  closeCharacterActionBtn: document.getElementById("closeCharacterActionBtn"),
  prepRoleDialog: document.getElementById("prepRoleDialog"),
  prepRoleTitle: document.getElementById("prepRoleTitle"),
  prepToFieldBtn: document.getElementById("prepToFieldBtn"),
  prepToBenchBtn: document.getElementById("prepToBenchBtn"),
  prepToNoneBtn: document.getElementById("prepToNoneBtn"),
  closePrepRoleBtn: document.getElementById("closePrepRoleBtn"),
  channelInfoDialog: document.getElementById("channelInfoDialog"),
  channelInfoList: document.getElementById("channelInfoList"),
  closeChannelInfoBtn: document.getElementById("closeChannelInfoBtn"),
  bgmTitle: document.getElementById("bgmTitle"),
  bgmMenu: document.getElementById("bgmMenu"),
  bgmBattle: document.getElementById("bgmBattle"),
};

let confirmResolver = null;
let hpSpendResolver = null;
let chanceOverlayTimer = null;
let chanceOverlayResultTimer = null;
let chanceSpinAutoTimer = null;
let chanceSpinCountdownTimer = null;
let chanceSpinStartHandler = null;
let chanceSlotIntervals = [];
let chanceSlotStopTimers = [];

const BGM_TRACKS = ["title", "menu", "battle"];
const BGM_VOLUME = {
  title: 0.42,
  menu: 0.4,
  battle: 0.45,
};
const SFX_KEYS = ["attack", "skill", "heal", "paralyze", "poison", "knockout"];
const SFX_SOURCES = {
  attack: "assets/audio/sfx_attack.mp3",
  skill: "assets/audio/sfx_skill.mp3",
  heal: "assets/audio/sfx_heal.mp3",
  paralyze: "assets/audio/sfx_paralyze.mp3",
  poison: "assets/audio/sfx_poison.mp3",
  knockout: "assets/audio/sfx_knockout.mp3",
};
const SFX_BASE_VOLUME = {
  attack: 0.9,
  skill: 0.86,
  heal: 0.82,
  paralyze: 0.84,
  poison: 0.8,
  knockout: 0.9,
};
const TOP_HERO_IMAGES = ["ASTER.png", "CREST.png", "RIOT.png"];
const SKILL_FOLLOWUP_SFX_DELAY = 520;
const BASE_ACTION_LIMIT = 3;
const BASE_SKILL_LIMIT = 2;
const MOMENTUM_MAX = 8;
const SIGNAL_INTERVAL = 3;
const SHIELD_MAX = 2;

const UPDATE_TEAM_MEMBERS = {
  // チーム所属はここを直すだけで、カード表示・チーム効果・シナジー表示へ反映される。
  Riot: ["chiduru", "ao", "nana", "ryuta"],
  Crest: ["akatsuki", "itsuki", "shiho", "ako", "go"],
  Aster: ["takumi", "mai", "yuzuki"],
};

const UPDATE_TEAM_EFFECTS = {
  Riot: {
    name: "Riot: スクラム通信",
    description: "各ターン最初に受ける直接ダメージを1軽減",
  },
  Crest: {
    name: "Crest: セットプレイ",
    description: "各ターン最初の回復かシールド量+1（シールド最大2）",
  },
  Aster: {
    name: "Aster: テンポバースト",
    description: "各ターン最初の直接ダメージ+1",
  },
};

const TACTICAL_CALLS = {
  focus: { name: "フォーカスコール", cost: 3, description: "選択中の味方ATK+2（1ターン）" },
  recover: { name: "リカバーコール", cost: 3, description: "選択中の味方を4回復" },
  cover: { name: "カバーコール", cost: 2, description: "選択中の味方にシールド1（最大2）" },
  tempo: { name: "テンポコール", cost: 5, description: "このターンの行動上限+1" },
};

const RECOMMENDED_TEAM_PRESETS = [
  {
    id: "riot_guard",
    name: "Riot守備連携",
    summary: "戦闘メンバーをRiot3人にして、被ダメージ軽減をすぐ発動する基本形。",
    field: ["ao", "chiduru", "ryuta"],
    bench: ["nana", "akatsuki", "shiho"],
  },
  {
    id: "crest_setplay",
    name: "Crestセットプレイ",
    summary: "Crest2人以上を戦闘に置き、回復とシールド補助を確認しやすい形。",
    field: ["akatsuki", "shiho", "go"],
    bench: ["itsuki", "ako", "chiduru"],
  },
  {
    id: "aster_power",
    name: "Aster火力",
    summary: "Aster3人を中心に、攻めと自己回復の流れを見る編成。",
    field: ["mai", "takumi", "yuzuki"],
    bench: ["akatsuki", "chiduru", "ao"],
  },
  {
    id: "role_check",
    name: "ロール連携確認",
    summary: "複数ロールを並べ、行動順による連携ボーナスを試しやすい編成。",
    field: ["ao", "akatsuki", "ryuta"],
    bench: ["shiho", "chiduru", "nana"],
  },
];

const ROLE_ORDER_GUIDE = [
  "同じターン内で、直前に動いた味方の役割 → 次に動く味方の役割で小ボーナスが出ます。",
  "サポーター → アタッカー: 次の直接ダメージ+1、モメンタム+1。",
  "デバッファー/バッファー → アタッカー: 次の直接ダメージ+1。",
  "ヒーラー → シールダー: シールド量+1（最大2）、モメンタム+1。",
  "シールダー → ヒーラー: 回復量+1、モメンタム+1。",
  "アタッカー → サポーター/バッファー: モメンタム+1。",
  "違う役割でスキルを続けると、上の組み合わせ以外でもモメンタム+1。",
  "行動順の記録は毎ターンリセットされます。",
];

const CHARACTER_TEAM_LOOKUP = Object.entries(UPDATE_TEAM_MEMBERS).reduce((lookup, [teamName, ids]) => {
  ids.forEach((id) => {
    lookup[id] = teamName;
  });
  return lookup;
}, {});

function createCharacter(base, runtimeId = base.id, baseId = base.id) {
  return {
    id: runtimeId,
    baseId,
    name: base.name,
    role: base.role,
    gender: base.gender,
    team: CHARACTER_TEAM_LOOKUP[baseId] ?? "Free",
    skill: base.skill,
    portrait: getCharacterPortrait(baseId) || base.portrait,
    cardArt: getCharacterCardArt(baseId) || base.cardArt,
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
    clutchMomentTriggered: false,
  };
}

function initializeCharacters() {
  Object.keys(BASE_CHARACTERS).forEach((id) => {
    CHARACTERS[id] = createCharacter(BASE_CHARACTERS[id], id, id);
  });
}

function getCharacter(id) {
  return CHARACTERS[id];
}

function getBaseCharacterId(idOrCharacter) {
  if (!idOrCharacter) return null;
  if (typeof idOrCharacter === "string") {
    const character = getCharacter(idOrCharacter);
    return character?.baseId ?? idOrCharacter;
  }
  return idOrCharacter.baseId ?? idOrCharacter.id ?? null;
}

function getSideLabel(side) {
  return side === "player" ? "プレイヤー" : "相手";
}

function getSideRosterIds(side) {
  const team = getTeam(side);
  if (!team) return [];
  return [...new Set([...(team.field ?? []), ...(team.bench ?? []), ...(team.grave ?? [])])];
}

function getSideFieldIds(side) {
  const team = getTeam(side);
  if (!team) return [];
  return [...new Set(team.field ?? [])];
}

function getSideActiveFieldIds(side) {
  return getSideFieldIds(side).filter((id) => {
    const character = getCharacter(id);
    return Boolean(character && character.hp > 0);
  });
}

function getSideAliveIds(side) {
  return getSideRosterIds(side).filter((id) => {
    const character = getCharacter(id);
    return Boolean(character && character.hp > 0);
  });
}

function sideHasBaseCharacter(side, baseId) {
  return getSideActiveFieldIds(side).some((id) => {
    const character = getCharacter(id);
    if (!character) return false;
    if (getBaseCharacterId(character) !== baseId) return false;
    return true;
  });
}

function getTeamRosterCount(side, teamName) {
  const bases = new Set();
  getSideActiveFieldIds(side).forEach((id) => {
    const baseId = getBaseCharacterId(id);
    if (CHARACTER_TEAM_LOOKUP[baseId] === teamName) {
      bases.add(baseId);
    }
  });
  return bases.size;
}

function hasTeamEffect(side, teamName) {
  return getTeamRosterCount(side, teamName) >= 2;
}

function getActiveTeamEffectLabels(side) {
  return Object.keys(UPDATE_TEAM_EFFECTS)
    .filter((teamName) => hasTeamEffect(side, teamName))
    .map((teamName) => `${teamName} x${getTeamRosterCount(side, teamName)}`);
}

function getCharacterDisplayName(baseId) {
  return BASE_CHARACTERS[baseId]?.name ?? baseId;
}

function getCharacterTagLabels(baseId) {
  const labels = [];
  const teamName = CHARACTER_TEAM_LOOKUP[baseId];
  if (teamName) labels.push(teamName);
  return labels;
}

function getUniqueBaseIds(ids) {
  return [...new Set(ids.map((id) => getBaseCharacterId(id)).filter(Boolean))];
}

function getTeamCountInIds(ids, teamName) {
  return getUniqueBaseIds(ids).filter((baseId) => CHARACTER_TEAM_LOOKUP[baseId] === teamName).length;
}

function getTeamEffectLine(teamName, count) {
  const effect = UPDATE_TEAM_EFFECTS[teamName];
  const memberNames = (UPDATE_TEAM_MEMBERS[teamName] ?? []).map((id) => getCharacterDisplayName(id)).join(" / ");
  if (count >= 2) {
    return {
      active: true,
      title: `${effect.name}（${count}人で発動中）`,
      detail: `${effect.description}。判定: 戦闘中メンバー / 対象: ${memberNames}`,
    };
  }
  return {
    active: false,
    title: `${effect.name}（あと${2 - count}人で発動）`,
    detail: `${effect.description}。判定: 戦闘中メンバー / 対象: ${memberNames}`,
  };
}

function renderGuideLines(lines, emptyText = "発動中の追加効果はありません。") {
  if (!lines.length) {
    return `<div class="guide-line muted">${emptyText}</div>`;
  }
  return lines
    .map(
      (line) => `
        <div class="guide-line ${line.active ? "active" : "inactive"}">
          <strong>${line.title}</strong>
          <span>${line.detail}</span>
        </div>
      `,
    )
    .join("");
}

function getSynergyLinesForIds(ids, options = {}) {
  const showInactive = Boolean(options.showInactive);
  const lines = [];
  Object.keys(UPDATE_TEAM_EFFECTS).forEach((teamName) => {
    const count = getTeamCountInIds(ids, teamName);
    if (showInactive || count >= 2) {
      lines.push(getTeamEffectLine(teamName, count));
    }
  });
  return lines;
}

function getSynergyGuideMarkup(ids, options = {}) {
  return renderGuideLines(getSynergyLinesForIds(ids, options), "まだチーム効果は発動していません。");
}

function getPreparationSynergyGuideMarkup(fieldIds) {
  return `
    <div class="guide-line active">
      <strong>発動判定</strong>
      <span>チーム効果は戦闘メンバーだけで判定します。控えや気絶中のキャラは発動対象外です。</span>
    </div>
    ${getSynergyGuideMarkup(fieldIds, { showInactive: true })}
  `;
}

function getSideSynergyGuideMarkup(side) {
  return getSynergyGuideMarkup(getSideActiveFieldIds(side), { showInactive: false });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const escapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escapes[char];
  });
}

function getCompactSynergyTitle(title) {
  return title
    .replace("（発動対象）", "")
    .replace(/（\d+人で発動中）/, "");
}

function getSideSynergyCompactMarkup(side) {
  const lines = getSynergyLinesForIds(getSideActiveFieldIds(side), { showInactive: false });
  if (!lines.length) {
    return `<span class="top-synergy-empty">なし</span>`;
  }
  return lines
    .map((line) => {
      const title = getCompactSynergyTitle(line.title);
      return `<span class="top-synergy-pill" title="${escapeHtml(line.detail)}">${escapeHtml(title)}</span>`;
    })
    .join("");
}

function getFieldSynergyMarkup(side) {
  const lines = getSynergyLinesForIds(getSideActiveFieldIds(side), { showInactive: false });
  if (!lines.length) {
    return `<span class="field-synergy-empty">追加効果なし</span>`;
  }
  return lines
    .map(
      (line) => `
        <article class="field-synergy-item" title="${escapeHtml(line.detail)}">
          <strong>${escapeHtml(getCompactSynergyTitle(line.title))}</strong>
          <span>${escapeHtml(line.detail)}</span>
        </article>
      `,
    )
    .join("");
}

function getRoleOrderGuideMarkup() {
  return ROLE_ORDER_GUIDE.map(
    (line, index) => `
      <div class="guide-line ${index === 0 ? "active" : "inactive"}">
        ${index === 0 ? `<strong>行動順ボーナス</strong>` : ""}
        <span>${line}</span>
      </div>
    `,
  ).join("");
}

function getTeamMemberNames(ids) {
  return ids.map((id) => getCharacterDisplayName(id)).join(" / ");
}

function getPracticeEnemyTeamPreset() {
  return (
    PRACTICE_ENEMY_TEAM_PRESETS.find((preset) => preset.id === state.practice.enemyTeamPresetId) ??
    PRACTICE_ENEMY_TEAM_PRESETS[0]
  );
}

function getPracticeEnemyTeam() {
  const preset = getPracticeEnemyTeamPreset();
  return {
    field: [...(preset?.field ?? INITIAL_TEAMS.enemy.field)],
    bench: [...(preset?.bench ?? INITIAL_TEAMS.enemy.bench)],
  };
}

function renderChannelPickButtons(selectedId, dataName) {
  return CHANNELS.map((channel) => {
    const selectedClass = selectedId === channel.id ? "is-selected" : "";
    return `
      <button type="button" class="practice-choice-item ${selectedClass}" data-${dataName}="${channel.id}">
        <strong>${escapeHtml(channel.name)}</strong>
        <span>${escapeHtml(channel.description)}</span>
      </button>
    `;
  }).join("");
}

function syncPracticeCpuModeButtons(container) {
  if (!container) return;
  container.querySelectorAll("[data-practice-cpu-mode]").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.classList.toggle("is-selected", button.dataset.practiceCpuMode === state.practice.cpuBehavior);
  });
}

function renderPracticeSetup() {
  if (els.practiceEnemyTeamList) {
    els.practiceEnemyTeamList.innerHTML = PRACTICE_ENEMY_TEAM_PRESETS.map((preset) => {
      const selectedClass = preset.id === state.practice.enemyTeamPresetId ? "is-selected" : "";
      const members = getTeamMemberNames([...preset.field, ...preset.bench]);
      return `
        <button type="button" class="practice-choice-item ${selectedClass}" data-practice-enemy-team="${preset.id}">
          <strong>${escapeHtml(preset.name)}</strong>
          <span>${escapeHtml(preset.summary)}</span>
          <small>${escapeHtml(members)}</small>
        </button>
      `;
    }).join("");
  }
  if (els.practicePlayerChannelList) {
    els.practicePlayerChannelList.innerHTML = renderChannelPickButtons(state.practice.playerChannelId, "practice-player-channel");
  }
  if (els.practiceEnemyChannelList) {
    els.practiceEnemyChannelList.innerHTML = renderChannelPickButtons(state.practice.enemyChannelId, "practice-enemy-channel");
  }
  syncPracticeCpuModeButtons(els.practiceSetupCpuControl);

  const enemyPreset = getPracticeEnemyTeamPreset();
  const playerChannel = getChannelById(state.practice.playerChannelId);
  const enemyChannel = getChannelById(state.practice.enemyChannelId);
  const ready = Boolean(enemyPreset && playerChannel && enemyChannel && isPreparationReady());
  if (els.practiceSetupSummary) {
    const prefix = ready ? "開始準備完了" : "未完了";
    const teamName = enemyPreset?.name ?? "未選択";
    const playerChannelName = playerChannel?.name ?? "未選択";
    const enemyChannelName = enemyChannel?.name ?? "未選択";
    const cpuLabel = state.practice.cpuBehavior === "skip" ? "相手ターンスキップ" : "通常";
    els.practiceSetupSummary.textContent =
      `${prefix}: 相手「${teamName}」 / 自分チャンネル「${playerChannelName}」 / 相手チャンネル「${enemyChannelName}」 / CPU「${cpuLabel}」`;
  }
  if (els.practiceStartBtn) {
    els.practiceStartBtn.disabled = !ready;
  }
}

function renderTeamEffectReferenceList(container) {
  if (!container) return;
  container.innerHTML = Object.entries(UPDATE_TEAM_EFFECTS)
    .map(([teamName, effect]) => {
      const members = getTeamMemberNames(UPDATE_TEAM_MEMBERS[teamName] ?? []);
      return `
        <article class="team-effect-reference">
          <h4>${escapeHtml(effect.name)}</h4>
          <p>${escapeHtml(effect.description)}</p>
          <span>対象メンバー: ${escapeHtml(members)}</span>
        </article>
      `;
    })
    .join("");
}

function renderGalleryStep() {
  if (els.galleryRosterGrid) {
    els.galleryRosterGrid.innerHTML = Object.values(BASE_CHARACTERS)
      .map((character) => {
        const teamName = CHARACTER_TEAM_LOOKUP[character.id] ?? "Free";
        const image = getCharacterPortrait(character.id);
        return `
          <article class="gallery-character-card">
            <figure>
              ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(character.name)} イラスト" />` : ""}
            </figure>
            <div>
              <h4>${escapeHtml(character.name)}</h4>
              <p>${escapeHtml(teamName)} / ${escapeHtml(character.role)} / ${escapeHtml(character.gender)}</p>
              <dl>
                <div><dt>ATK</dt><dd>${character.baseAtk}</dd></div>
                <div><dt>HP</dt><dd>${character.baseHp}</dd></div>
              </dl>
              <span>${escapeHtml(character.skill)}</span>
            </div>
          </article>
        `;
      })
      .join("");
  }
  renderTeamEffectReferenceList(els.galleryTeamEffectList);
}

function renderModeRulesStep() {
  renderTeamEffectReferenceList(els.modeRulesTeamEffectList);
  if (els.modeRulesChannelList) {
    els.modeRulesChannelList.innerHTML = CHANNELS.map(
      (channel) => `
        <article class="mode-rule-channel">
          <strong>${escapeHtml(channel.name)}</strong>
          <span>${escapeHtml(channel.description)}</span>
        </article>
      `,
    ).join("");
  }
}

function renderRecommendedTeamList() {
  if (!els.recommendedTeamList) return;
  els.recommendedTeamList.innerHTML = RECOMMENDED_TEAM_PRESETS.map((preset) => {
    const members = [...preset.field, ...preset.bench].map((id) => getCharacterDisplayName(id)).join(" / ");
    return `
      <button type="button" class="recommended-team-btn" data-recommended-team="${preset.id}">
        <strong>${preset.name}</strong>
        <span>${preset.summary}</span>
        <small>${members}</small>
      </button>
    `;
  }).join("");
}

function applyRecommendedTeamPreset(presetId) {
  const preset = RECOMMENDED_TEAM_PRESETS.find((item) => item.id === presetId);
  if (!preset) return;
  state.preparation.field = [...preset.field];
  state.preparation.bench = [...preset.bench];
  state.prepAutoChannelPrompted = false;
  invalidateChannelSelection();
  renderPreparation();
  log(`おすすめ編成「${preset.name}」を反映しました。`);
}

function resetTurnPerks(side) {
  state.turnPerks[side] = {
    riotGuardUsed: false,
    crestSetplayUsed: false,
    asterSparkUsed: false,
    signalStrikeUsed: false,
    signalHealUsed: false,
    signalShieldUsed: false,
  };
}

function getActionLimit(side = state.turn) {
  return BASE_ACTION_LIMIT + (state.turnActionBonus[side] ?? 0);
}

function getSkillLimit() {
  return BASE_SKILL_LIMIT;
}

function clampMomentum(value) {
  return Math.max(0, Math.min(MOMENTUM_MAX, Math.floor(value)));
}

function awardMomentum(side, amount, reason = "") {
  if (!["player", "enemy"].includes(side) || amount <= 0) return 0;
  const before = state.momentum[side] ?? 0;
  state.momentum[side] = clampMomentum(before + amount);
  const gained = state.momentum[side] - before;
  if (gained > 0 && reason) {
    log(`${getSideLabel(side)} モメンタム+${gained}: ${reason}`);
  }
  return gained;
}

function spendMomentum(side, amount) {
  if ((state.momentum[side] ?? 0) < amount) return false;
  state.momentum[side] = clampMomentum(state.momentum[side] - amount);
  return true;
}

function cast(message) {
  log(`実況: ${message}`);
  if (state.screen === "battle") {
    setCpuNotice(message);
  }
}

function normalizeRole(role) {
  if (role === "アタッカー" || role === "サブアタ") return "attacker";
  if (role === "サポーター") return "supporter";
  if (role === "デバッファー") return "debuffer";
  if (role === "バッファー") return "buffer";
  if (role === "ヒーラー") return "healer";
  if (role === "シールダー") return "shielder";
  return "other";
}

function getRoleCombo(side, actorId, actionType) {
  const previous = state.lastAction[side];
  const actor = getCharacter(actorId);
  if (!previous || !actor || previous.actorId === actorId) return null;

  const fromRole = normalizeRole(previous.role);
  const toRole = normalizeRole(actor.role);
  const base = {
    from: previous.role,
    to: actor.role,
    label: "",
    damageBonus: 0,
    healBonus: 0,
    shieldBonus: 0,
    momentumBonus: 0,
    damageConsumed: false,
  };

  if (fromRole === "supporter" && toRole === "attacker") {
    return { ...base, label: "サポート起点", damageBonus: 1, momentumBonus: 1 };
  }
  if ((fromRole === "debuffer" || fromRole === "buffer") && toRole === "attacker") {
    return { ...base, label: "セットアップ攻撃", damageBonus: 1 };
  }
  if (fromRole === "healer" && toRole === "shielder") {
    return { ...base, label: "守備再構築", shieldBonus: 1, momentumBonus: 1 };
  }
  if (fromRole === "shielder" && toRole === "healer") {
    return { ...base, label: "耐久ライン", healBonus: 1, momentumBonus: 1 };
  }
  if (fromRole === "attacker" && (toRole === "supporter" || toRole === "buffer")) {
    return { ...base, label: "テンポ維持", momentumBonus: 1 };
  }
  if (actionType === "skill" && fromRole !== toRole) {
    return { ...base, label: "ロール連携", momentumBonus: 1 };
  }
  return null;
}

function activateRoleCombo(side, actorId, actionType) {
  const combo = getRoleCombo(side, actorId, actionType);
  if (!combo) return null;
  state.matchStats.roleCombos[side] += 1;
  if (combo.momentumBonus > 0) {
    awardMomentum(side, combo.momentumBonus, `${combo.from}→${combo.to} ${combo.label}`);
  }
  log(`${getSideLabel(side)} 連携発動: ${combo.from}→${combo.to}「${combo.label}」`);
  return combo;
}

function getDamageModifier(sourceSide, actorId, targetSide, targetId, context = {}) {
  if (!sourceSide || sourceSide === targetSide) return 0;
  let bonus = 0;
  const perks = state.turnPerks[sourceSide] ?? (state.turnPerks[sourceSide] = {});

  if (context.roleCombo?.damageBonus && !context.roleCombo.damageConsumed) {
    bonus += context.roleCombo.damageBonus;
    context.roleCombo.damageConsumed = true;
  }

  if (state.signal.boostTurns[sourceSide] > 0 && !perks.signalStrikeUsed) {
    bonus += 1;
    perks.signalStrikeUsed = true;
    log(`${getSideLabel(sourceSide)} シグナル優勢: 直接ダメージ+1`);
  }

  if (hasTeamEffect(sourceSide, "Aster") && !perks.asterSparkUsed) {
    bonus += 1;
    perks.asterSparkUsed = true;
    log(`${getSideLabel(sourceSide)} ${UPDATE_TEAM_EFFECTS.Aster.name}: 直接ダメージ+1`);
  }

  return bonus;
}

function getHealBonus(side, targetId, context = {}) {
  let bonus = 0;
  const perks = state.turnPerks[side] ?? (state.turnPerks[side] = {});

  if (context.roleCombo?.healBonus && !context.roleCombo.healConsumed) {
    bonus += context.roleCombo.healBonus;
    context.roleCombo.healConsumed = true;
  }
  if (state.signal.boostTurns[side] > 0 && !perks.signalHealUsed) {
    bonus += 1;
    perks.signalHealUsed = true;
    log(`${getSideLabel(side)} シグナル優勢: 回復+1`);
  }
  if (hasTeamEffect(side, "Crest") && !perks.crestSetplayUsed) {
    bonus += 1;
    perks.crestSetplayUsed = true;
    log(`${getSideLabel(side)} ${UPDATE_TEAM_EFFECTS.Crest.name}: 回復+1`);
  }
  return bonus;
}

function getShieldBonus(side, context = {}) {
  let bonus = 0;
  const perks = state.turnPerks[side] ?? (state.turnPerks[side] = {});
  if (context.roleCombo?.shieldBonus && !context.roleCombo.shieldConsumed) {
    bonus += context.roleCombo.shieldBonus;
    context.roleCombo.shieldConsumed = true;
  }
  if (state.signal.boostTurns[side] > 0 && !perks.signalShieldUsed) {
    bonus += 1;
    perks.signalShieldUsed = true;
    log(`${getSideLabel(side)} シグナル優勢: シールド+1`);
  }
  if (hasTeamEffect(side, "Crest") && !perks.crestSetplayUsed) {
    bonus += 1;
    perks.crestSetplayUsed = true;
    log(`${getSideLabel(side)} ${UPDATE_TEAM_EFFECTS.Crest.name}: シールド+1`);
  }
  return bonus;
}

function addShield(character, amount, sourceLabel = "シールド") {
  if (!character || amount <= 0) return 0;
  const before = character.shieldHits ?? 0;
  character.shieldHits = Math.min(SHIELD_MAX, before + amount);
  const added = character.shieldHits - before;
  if (added <= 0) {
    log(`${character.name} の${sourceLabel}は上限${SHIELD_MAX}のため追加されません。`);
  }
  return added;
}

function getSignalRoundNumber() {
  return Math.max(1, state.turnIndex.player);
}

function calculateSignalScore(side) {
  const fieldIds = [...getTeam(side).field];
  const hpScore = fieldIds.reduce((sum, id) => {
    const character = getCharacter(id);
    if (!character || character.maxHp <= 0) return sum;
    return sum + character.hp / character.maxHp;
  }, 0);
  const statusPenalty = fieldIds.reduce((sum, id) => {
    const character = getCharacter(id);
    if (!character) return sum;
    return sum + (character.paralyzeTurns > 0 ? 1 : 0) + (character.poison ? 0.6 : 0) + (character.dots.length ? 0.4 : 0);
  }, 0);
  const shieldScore = fieldIds.reduce((sum, id) => sum + Math.min(SHIELD_MAX, getCharacter(id)?.shieldHits ?? 0) * 0.25, 0);
  return fieldIds.length * 2 + hpScore + shieldScore + (state.momentum[side] ?? 0) * 0.15 - statusPenalty;
}

function maybeResolveSignalRound() {
  const round = getSignalRoundNumber();
  if (round <= 1 || round % SIGNAL_INTERVAL !== 0 || state.signal.lastResolvedRound === round) return;
  state.signal.lastResolvedRound = round;

  const playerScore = calculateSignalScore("player");
  const enemyScore = calculateSignalScore("enemy");
  const diff = playerScore - enemyScore;
  if (Math.abs(diff) < 0.35) {
    state.signal.holder = null;
    state.signal.message = `第${round}ラウンド: シグナル拮抗。両者モメンタム+1`;
    awardMomentum("player", 1, "シグナル拮抗");
    awardMomentum("enemy", 1, "シグナル拮抗");
    cast("シグナル争奪は拮抗。次の一手が流れを決める。");
    return;
  }

  const winner = diff > 0 ? "player" : "enemy";
  state.signal.holder = winner;
  state.signal.boostTurns[winner] = Math.max(state.signal.boostTurns[winner], 2);
  state.matchStats.signalWins[winner] += 1;
  state.signal.message = `第${round}ラウンド: ${getSideLabel(winner)} がシグナル獲得`;
  awardMomentum(winner, 2, "シグナル獲得");
  cast(`${getSideLabel(winner)} がシグナルを握った。次の攻防にボーナスが乗る。`);
}

function decaySignalBoost(side) {
  if (state.signal.boostTurns[side] > 0) {
    state.signal.boostTurns[side] -= 1;
  }
}

function createEnemyCloneId(baseId) {
  let index = 1;
  let cloneId = `${baseId}__enemy`;
  while (Object.prototype.hasOwnProperty.call(CHARACTERS, cloneId)) {
    index += 1;
    cloneId = `${baseId}__enemy${index}`;
  }
  return cloneId;
}

function createEnemyCloneCharacter(baseId) {
  const base = BASE_CHARACTERS[baseId];
  if (!base) return baseId;
  const cloneId = createEnemyCloneId(baseId);
  CHARACTERS[cloneId] = createCharacter(base, cloneId, baseId);
  return cloneId;
}

function separateSharedCharactersBetweenTeams() {
  const playerIds = new Set([...state.player.field, ...state.player.bench, ...state.player.grave]);
  const normalizeEnemyList = (ids) =>
    ids.map((id) => {
      if (!playerIds.has(id)) return id;
      if (!Object.prototype.hasOwnProperty.call(BASE_CHARACTERS, id)) return id;
      return createEnemyCloneCharacter(id);
    });

  state.enemy.field = normalizeEnemyList(state.enemy.field);
  state.enemy.bench = normalizeEnemyList(state.enemy.bench);
  state.enemy.grave = normalizeEnemyList(state.enemy.grave);
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

function getStoryChapterById(chapterId) {
  return STORY_CHAPTERS.find((chapter) => chapter.id === chapterId) ?? null;
}

function setMatchSetup(setup) {
  state.matchSetup = createMatchSetup(setup.source ?? "cpu", setup);
  state.channels = cloneChannelConfig(state.matchSetup.channels);
}

function isBaseCharacterId(id) {
  return typeof id === "string" && Object.prototype.hasOwnProperty.call(BASE_CHARACTERS, id);
}

function normalizePreparedTeam(rawTeam) {
  const normalized = { field: [], bench: [] };
  const seen = new Set();
  const pushUnique = (target, id) => {
    if (!isBaseCharacterId(id)) return;
    if (seen.has(id)) return;
    seen.add(id);
    target.push(id);
  };

  if (Array.isArray(rawTeam?.field)) {
    rawTeam.field.forEach((id) => {
      pushUnique(normalized.field, id);
    });
  }
  if (Array.isArray(rawTeam?.bench)) {
    rawTeam.bench.forEach((id) => {
      pushUnique(normalized.bench, id);
    });
  }

  return normalized;
}

function isValidPreparedTeam(team) {
  const normalized = normalizePreparedTeam(team);
  const total = normalized.field.length + normalized.bench.length;
  return total === 6 && normalized.field.length >= 1 && normalized.field.length <= 3;
}

function sanitizeTeamPresetName(rawName, slotIndex) {
  const trimmed = String(rawName ?? "")
    .trim()
    .slice(0, TEAM_PRESET_NAME_MAX);
  if (trimmed) return trimmed;
  return `お気に入りチーム${slotIndex + 1}`;
}

function getSafeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (_error) {
    return null;
  }
}

function loadTeamPresetsFromStorage() {
  const fallback = Array.from({ length: TEAM_PRESET_MAX }, () => null);
  const storage = getSafeLocalStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(TEAM_PRESET_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return fallback.map((_, index) => {
      const entry = parsed[index];
      if (!entry) return null;
      const team = normalizePreparedTeam(entry);
      if (!isValidPreparedTeam(team)) return null;
      return {
        name: sanitizeTeamPresetName(entry.name, index),
        field: [...team.field],
        bench: [...team.bench],
      };
    });
  } catch (_error) {
    return fallback;
  }
}

function persistTeamPresets() {
  const storage = getSafeLocalStorage();
  if (!storage) return;
  try {
    storage.setItem(TEAM_PRESET_STORAGE_KEY, JSON.stringify(state.teamPresets));
  } catch (_error) {
    // Ignore storage write errors.
  }
}

function getPresetSlotIndex(rawIndex = state.selectedPresetSlot) {
  const numeric = Number(rawIndex);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(TEAM_PRESET_MAX - 1, Math.max(0, Math.floor(numeric)));
}

function getPresetSummary(entry) {
  if (!entry) return "未保存";
  const toName = (id) => BASE_CHARACTERS[id]?.name ?? id;
  const fieldNames = entry.field.map(toName).join(" / ");
  const benchNames = entry.bench.map(toName).join(" / ");
  return `戦闘: ${fieldNames} ｜ 控え: ${benchNames}`;
}

function syncPresetEditor(preserveNameInput = false) {
  const index = getPresetSlotIndex();
  state.selectedPresetSlot = index;
  if (els.teamPresetSlotSelect) {
    els.teamPresetSlotSelect.value = String(index);
  }
  if (!preserveNameInput && els.teamPresetNameInput) {
    els.teamPresetNameInput.value = state.teamPresets[index]?.name ?? "";
  }
}

function renderTeamPresetList() {
  if (!els.teamPresetList || !els.teamPresetSlotSelect) return;

  els.teamPresetSlotSelect.innerHTML = Array.from({ length: TEAM_PRESET_MAX }, (_, index) => {
    const label = `スロット ${index + 1}`;
    return `<option value="${index}">${label}</option>`;
  }).join("");

  const preserveNameInput = document.activeElement === els.teamPresetNameInput;
  syncPresetEditor(preserveNameInput);

  els.teamPresetList.innerHTML = state.teamPresets
    .map((entry, index) => {
      const selectedClass = index === state.selectedPresetSlot ? "is-selected" : "";
      const slotLabel = `#${String(index + 1).padStart(2, "0")}`;
      const nameLabel = entry?.name ?? "（未保存）";
      const summary = getPresetSummary(entry);
      return `
        <button type="button" class="team-preset-item ${selectedClass}" data-preset-slot="${index}">
          <span class="team-preset-slot">${slotLabel}</span>
          <span class="team-preset-name">${nameLabel}</span>
          <span class="team-preset-meta">${summary}</span>
        </button>
      `;
    })
    .join("");
}

function saveCurrentTeamPreset() {
  if (!isPreparationReady()) {
    log("お気に入りチームは6人編成（戦闘1〜3人、合計6人）で保存できます。");
    return;
  }

  const index = getPresetSlotIndex();
  const team = normalizePreparedTeam({
    field: state.preparation.field,
    bench: state.preparation.bench,
  });
  if (!isValidPreparedTeam(team)) {
    log("現在の編成は保存条件を満たしていません。");
    return;
  }

  state.teamPresets[index] = {
    name: sanitizeTeamPresetName(els.teamPresetNameInput?.value ?? "", index),
    field: [...team.field],
    bench: [...team.bench],
  };
  persistTeamPresets();
  renderTeamPresetList();
  log(`お気に入りチームをスロット${index + 1}に保存しました。`);
}

function loadCurrentTeamPreset() {
  const index = getPresetSlotIndex();
  const entry = state.teamPresets[index];
  if (!entry) {
    log(`スロット${index + 1}は未保存です。`);
    return;
  }

  const team = normalizePreparedTeam(entry);
  if (!isValidPreparedTeam(team)) {
    log(`スロット${index + 1}のデータが不正なため読み込めません。`);
    return;
  }

  state.preparation.field = [...team.field];
  state.preparation.bench = [...team.bench];
  state.prepAutoChannelPrompted = false;
  invalidateChannelSelection();
  renderPreparation();
  log(`お気に入りチーム「${entry.name}」を読み込みました。`);
  void maybePromptReadyToChannel();
}

async function deleteCurrentTeamPreset() {
  const index = getPresetSlotIndex();
  const entry = state.teamPresets[index];
  if (!entry) {
    log(`スロット${index + 1}は既に空です。`);
    return;
  }
  if (!(await confirmAction(`スロット${index + 1}「${entry.name}」を削除しますか？`, true))) return;
  state.teamPresets[index] = null;
  persistTeamPresets();
  renderTeamPresetList();
  log(`スロット${index + 1}を削除しました。`);
}

async function maybePromptReadyToChannel() {
  if (state.prepContext !== "cpu") return;
  if (state.screen !== "top" || state.topStep !== "team") return;
  if (!isPreparationReady()) {
    state.prepAutoChannelPrompted = false;
    return;
  }
  if (state.prepAutoChannelPrompted || state.prepAutoChannelPrompting) return;

  state.prepAutoChannelPrompted = true;
  state.prepAutoChannelPrompting = true;
  try {
    const shouldMove = await confirmAction("6人編成が完了しました。チャンネル選択へ進みますか？", true);
    if (!shouldMove) {
      log("チャンネル選択への移動をキャンセルしました。");
      return;
    }
    if (state.prepContext !== "cpu" || state.screen !== "top" || state.topStep !== "team") return;
    if (!isPreparationReady()) return;
    setPreparationStepContext("cpu");
    setupChannelSelectionUI();
    updateChannelStepSummary();
    showTopStep("channel");
  } finally {
    state.prepAutoChannelPrompting = false;
  }
}

function setPreparationStepContext(context) {
  state.prepContext = context;
  if (!els.teamStepTitle || !els.teamStepDescription || !els.toChannelStepBtn) return;

  if (context === "story-main") {
    const chapter = getStoryChapterById(state.storySelectedChapterId);
    const chapterName = chapter?.title ?? "本格ストーリー";
    els.teamStepTitle.textContent = "STORY TEAM BUILD: 6キャラ編成";
    els.teamStepDescription.textContent =
      `「${chapterName}」に出撃するチームを編成してください。戦闘メンバーは1〜3人、合計6人です。`;
    els.toChannelStepBtn.textContent = "この編成でストーリー戦闘へ";
    if (els.backFromTeamStepBtn) {
      els.backFromTeamStepBtn.textContent = "ストーリー選択へ戻る";
    }
    return;
  }

  if (context === "practice") {
    els.teamStepTitle.textContent = "PRACTICE TEAM BUILD: 6キャラ編成";
    els.teamStepDescription.textContent =
      "練習で動きを確認したいチームを編成してください。戦闘メンバーは1〜3人、合計6人です。";
    els.toChannelStepBtn.textContent = "練習設定へ";
    if (els.backFromTeamStepBtn) {
      els.backFromTeamStepBtn.textContent = "モード選択へ戻る";
    }
    return;
  }

  els.teamStepTitle.textContent = "STEP 1 / 2: 6キャラ編成";
  els.teamStepDescription.textContent =
    "戦闘メンバーと控えメンバーを選んで、君のオリジナルチームを作ろう。戦闘メンバーは1〜3人、合計6人です。";
  els.toChannelStepBtn.textContent = "チャンネル選択へ";
  if (els.backFromTeamStepBtn) {
    els.backFromTeamStepBtn.textContent = "ホーム選択画面へ戻る";
  }
}

function renderStoryStep() {
  if (!els.storyStepPanel) return;

  const view = state.storyView;
  const selectedChapter = getStoryChapterById(state.storySelectedChapterId) ?? STORY_CHAPTERS[0] ?? null;

  if (els.storyTutorialEntryBtn) {
    els.storyTutorialEntryBtn.classList.toggle("is-active", view === "tutorial");
  }
  if (els.storyMainEntryBtn) {
    els.storyMainEntryBtn.classList.toggle("is-active", view === "main");
  }

  if (els.storyStepHeading) {
    els.storyStepHeading.textContent = "STORY MODE";
  }

  const renderScriptLines = (lines) => {
    if (!els.storyScriptPreview) return;
    const source = Array.isArray(lines) && lines.length > 0 ? lines : ["本文は未実装です。後から自由に追加できます。"];
    els.storyScriptPreview.innerHTML = source.map((line) => `<div class="story-line">${line}</div>`).join("");
  };

  if (view === "tutorial") {
    if (els.storyStepSummary) {
      els.storyStepSummary.textContent = "チュートリアルバトルを開始します。内容は後から追加できます。";
    }
    if (els.storyContentTitle) {
      els.storyContentTitle.textContent = STORY_TUTORIAL.title;
    }
    if (els.storyContentDescription) {
      els.storyContentDescription.textContent = STORY_TUTORIAL.summary;
    }
    if (els.storyChapterList) {
      els.storyChapterList.classList.add("hidden");
      els.storyChapterList.innerHTML = "";
    }
    if (els.storyStartTutorialBtn) {
      els.storyStartTutorialBtn.classList.remove("hidden");
    }
    if (els.storySelectChapterBtn) {
      els.storySelectChapterBtn.classList.add("hidden");
    }
    renderScriptLines(STORY_TUTORIAL.scriptPreview);
    return;
  }

  if (view === "main") {
    if (els.storyStepSummary) {
      els.storyStepSummary.textContent = "章を選び、チームを編成してストーリー戦へ進みます。";
    }
    if (els.storyContentTitle) {
      els.storyContentTitle.textContent = selectedChapter
        ? `${selectedChapter.title}`
        : "本格ストーリー";
    }
    if (els.storyContentDescription) {
      els.storyContentDescription.textContent = selectedChapter
        ? selectedChapter.summary
        : "章データが未設定です。";
    }
    if (els.storyChapterList) {
      els.storyChapterList.classList.remove("hidden");
      els.storyChapterList.innerHTML = STORY_CHAPTERS.map((chapter) => {
        const selectedClass = chapter.id === state.storySelectedChapterId ? "is-selected" : "";
        return `
          <button type="button" class="story-chapter-item ${selectedClass}" data-story-chapter="${chapter.id}">
            <strong>${chapter.title}</strong>
            <span>${chapter.summary}</span>
          </button>
        `;
      }).join("");
    }
    if (els.storyStartTutorialBtn) {
      els.storyStartTutorialBtn.classList.add("hidden");
    }
    if (els.storySelectChapterBtn) {
      els.storySelectChapterBtn.classList.remove("hidden");
    }
    renderScriptLines(selectedChapter?.scriptPreview ?? []);
    return;
  }

  if (els.storyStepSummary) {
    els.storyStepSummary.textContent = "チュートリアルか本格ストーリーを選択してください。";
  }
  if (els.storyContentTitle) {
    els.storyContentTitle.textContent = "ストーリーを選択してください";
  }
  if (els.storyContentDescription) {
    els.storyContentDescription.textContent =
      "左のメニューから「チュートリアル」または「本格ストーリー」を選ぶと詳細を表示します。";
  }
  if (els.storyChapterList) {
    els.storyChapterList.classList.add("hidden");
    els.storyChapterList.innerHTML = "";
  }
  if (els.storyStartTutorialBtn) {
    els.storyStartTutorialBtn.classList.add("hidden");
  }
  if (els.storySelectChapterBtn) {
    els.storySelectChapterBtn.classList.add("hidden");
  }
  renderScriptLines([
    "ここに小説本文・会話ログ・分岐テキストを追加できます。",
    "戦闘前後イベントは game.js の STORY_TUTORIAL / STORY_CHAPTERS に追記可能です。",
  ]);
}

function getEffectiveChance(baseChance, side) {
  const bonus = getSideChannel(side) === "lucky" ? 0.2 : 0;
  return Math.min(1, Math.max(0, baseChance + bonus));
}

function getChanceSlots() {
  if (Array.isArray(els.chanceSlots) && els.chanceSlots.length) {
    return els.chanceSlots;
  }
  return [document.getElementById("chanceSlot1"), document.getElementById("chanceSlot2"), document.getElementById("chanceSlot3")].filter(
    Boolean,
  );
}

function resetChanceSlotDisplay() {
  const slots = getChanceSlots();
  slots.forEach((slot) => {
    slot.classList.remove("spinning", "hit", "miss");
    slot.textContent = "?";
  });
}

function randomChanceSlotSymbol() {
  return Math.random() < 0.52 ? "当" : "外";
}

function getChanceSlotResultSymbols(success) {
  if (success) {
    return ["当", "当", "当"];
  }
  const symbols = ["当", "当", "当"];
  const missCount = Math.random() < 0.45 ? 2 : 1;
  const missIndexes = shuffled([0, 1, 2]).slice(0, missCount);
  missIndexes.forEach((index) => {
    symbols[index] = "外";
  });
  return symbols;
}

function clearChanceTimers() {
  if (chanceOverlayTimer) {
    window.clearTimeout(chanceOverlayTimer);
    chanceOverlayTimer = null;
  }
  if (chanceOverlayResultTimer) {
    window.clearTimeout(chanceOverlayResultTimer);
    chanceOverlayResultTimer = null;
  }
  if (chanceSpinAutoTimer) {
    window.clearTimeout(chanceSpinAutoTimer);
    chanceSpinAutoTimer = null;
  }
  if (chanceSpinCountdownTimer) {
    window.clearInterval(chanceSpinCountdownTimer);
    chanceSpinCountdownTimer = null;
  }
  chanceSlotIntervals.forEach((timerId) => {
    window.clearInterval(timerId);
  });
  chanceSlotIntervals = [];
  chanceSlotStopTimers.forEach((timerId) => {
    window.clearTimeout(timerId);
  });
  chanceSlotStopTimers = [];
}

function hideChanceOverlay() {
  clearChanceTimers();
  chanceSpinStartHandler = null;
  resetChanceSlotDisplay();
  if (!els.chanceOverlay) return;
  els.chanceOverlay.classList.remove("show", "rolling", "success", "fail", "waiting");
  els.chanceOverlay.classList.add("hidden");
}

function triggerChanceSpin() {
  if (!chanceSpinStartHandler) return;
  const starter = chanceSpinStartHandler;
  chanceSpinStartHandler = null;
  starter();
}

async function rollChance(baseChance, side, title = "確率判定") {
  const success = Math.random() < getEffectiveChance(baseChance, side);
  await showChanceResult(title, baseChance, side, success);
  return success;
}

function showChanceResult(title, baseChance, side, success) {
  if (!els.chanceOverlay || !els.chanceTitle || !els.chanceRate || !els.chanceResult) return Promise.resolve();
  const rate = Math.round(getEffectiveChance(baseChance, side) * 100);
  const isManualSide = side === "player";
  clearChanceTimers();
  chanceSpinStartHandler = null;
  resetChanceSlotDisplay();

  els.chanceTitle.textContent = title;
  els.chanceRate.textContent = `成功率 ${rate}%（当たり3つで成功）`;
  els.chanceResult.textContent = "-";
  if (els.chanceSpinBtn) {
    els.chanceSpinBtn.classList.toggle("hidden", !isManualSide);
    els.chanceSpinBtn.disabled = false;
  }
  if (els.chanceCountdown) {
    els.chanceCountdown.classList.toggle("hidden", !isManualSide);
    els.chanceCountdown.textContent = isManualSide ? "5秒後に自動でスロット開始" : "";
  }

  els.chanceOverlay.classList.remove("hidden", "show", "success", "fail", "rolling", "waiting");
  void els.chanceOverlay.offsetWidth;
  els.chanceOverlay.classList.add("show");

  if (isManualSide) {
    els.chanceOverlay.classList.add("waiting");
  }

  return new Promise((resolve) => {
    const finish = () => {
      hideChanceOverlay();
      resolve();
    };

    const startSpin = () => {
      clearChanceTimers();
      if (els.chanceSpinBtn) {
        els.chanceSpinBtn.disabled = true;
      }
      if (els.chanceCountdown) {
        els.chanceCountdown.textContent = "スロット判定中…";
      }
      els.chanceOverlay?.classList.remove("waiting");
      els.chanceOverlay?.classList.remove("success", "fail");
      els.chanceOverlay?.classList.add("rolling");

      const slots = getChanceSlots();
      const resultSymbols = getChanceSlotResultSymbols(success);
      slots.forEach((slot, index) => {
        slot.classList.remove("hit", "miss");
        slot.classList.add("spinning");
        slot.textContent = randomChanceSlotSymbol();
        const intervalId = window.setInterval(() => {
          slot.textContent = randomChanceSlotSymbol();
        }, 92 + index * 16);
        chanceSlotIntervals.push(intervalId);
        const stopTimer = window.setTimeout(() => {
          window.clearInterval(intervalId);
          chanceSlotIntervals = chanceSlotIntervals.filter((timerId) => timerId !== intervalId);
          const symbol = resultSymbols[index] ?? "外";
          slot.textContent = symbol;
          slot.classList.remove("spinning");
          slot.classList.add(symbol === "当" ? "hit" : "miss");
        }, 780 + index * 360);
        chanceSlotStopTimers.push(stopTimer);
      });

      const resultDelay = slots.length ? 1960 : 1200;
      chanceOverlayResultTimer = window.setTimeout(() => {
        els.chanceOverlay?.classList.remove("rolling");
        els.chanceOverlay?.classList.add(success ? "success" : "fail");
        if (els.chanceResult) {
          els.chanceResult.textContent = success ? "SUCCESS" : "FAIL";
        }
      }, resultDelay);

      chanceOverlayTimer = window.setTimeout(() => {
        finish();
      }, resultDelay + 1700);
    };

    chanceSpinStartHandler = startSpin;

    if (isManualSide) {
      let remain = 5;
      chanceSpinCountdownTimer = window.setInterval(() => {
        remain -= 1;
        if (remain <= 0) {
          if (chanceSpinCountdownTimer) {
            window.clearInterval(chanceSpinCountdownTimer);
            chanceSpinCountdownTimer = null;
          }
          if (els.chanceCountdown) {
            els.chanceCountdown.textContent = "自動でスロットを開始します…";
          }
          return;
        }
        if (els.chanceCountdown) {
          els.chanceCountdown.textContent = `${remain}秒後に自動でスロット開始`;
        }
      }, 1000);

      chanceSpinAutoTimer = window.setTimeout(() => {
        triggerChanceSpin();
      }, 5000);
      return;
    }

    if (els.chanceSpinBtn) {
      els.chanceSpinBtn.disabled = true;
    }
    chanceSpinAutoTimer = window.setTimeout(() => {
      triggerChanceSpin();
    }, 520);
  });
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

function resolveHpSpendDialog(result) {
  if (!hpSpendResolver) return;
  const resolver = hpSpendResolver;
  hpSpendResolver = null;
  els.hpSpendDialog?.close();
  resolver(result);
}

function syncHpSpendInputValue(rawValue) {
  const min = Number(els.hpSpendRange?.min ?? 1);
  const max = Number(els.hpSpendRange?.max ?? 1);
  const parsed = Number(rawValue);
  const safe = Math.max(min, Math.min(max, Number.isFinite(parsed) ? Math.floor(parsed) : min));
  if (els.hpSpendRange) {
    els.hpSpendRange.value = String(safe);
  }
  if (els.hpSpendNumber) {
    els.hpSpendNumber.value = String(safe);
  }
  if (els.hpSpendValue) {
    els.hpSpendValue.textContent = String(safe);
  }
  return safe;
}

function chooseHpSpendValue(sourceName, maxValue, initialValue = 1) {
  const max = Math.max(1, Math.floor(maxValue));
  const initial = Math.max(1, Math.min(max, Math.floor(initialValue)));
  if (!els.hpSpendDialog) {
    return Promise.resolve(initial);
  }
  if (hpSpendResolver) {
    return Promise.resolve(null);
  }

  if (els.hpSpendPrompt) {
    els.hpSpendPrompt.textContent = `${sourceName} のHPをどれだけ消費しますか？（1〜${max}）`;
  }
  if (els.hpSpendRange) {
    els.hpSpendRange.min = "1";
    els.hpSpendRange.max = String(max);
    els.hpSpendRange.value = String(initial);
  }
  if (els.hpSpendNumber) {
    els.hpSpendNumber.min = "1";
    els.hpSpendNumber.max = String(max);
    els.hpSpendNumber.value = String(initial);
  }
  if (els.hpSpendValue) {
    els.hpSpendValue.textContent = String(initial);
  }

  els.hpSpendDialog.showModal();
  return new Promise((resolve) => {
    hpSpendResolver = resolve;
  });
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
  if (els.attackBtn) {
    els.attackBtn.textContent = "通常攻撃";
  }
  if (els.skillBtn) {
    if (zone === "field") {
      els.skillBtn.innerHTML = `スキル<br><small>${character.skill}</small>`;
    } else {
      els.skillBtn.innerHTML = "スキル<br><small>戦闘中のみ使用可能</small>";
    }
  }
  if (els.swapBtn) {
    const canDeployNow = zone === "bench" && state.player.field.length < state.fieldLimit.player;
    els.swapBtn.textContent = canDeployNow ? "出撃" : "交代";
  }
  if (!els.characterActionDialog.open) {
    els.characterActionDialog.showModal();
  }
}

function closePrepRoleDialog() {
  if (!els.prepRoleDialog?.open) return;
  els.prepRoleDialog.close();
}

function openPrepRoleDialog(id) {
  const base = BASE_CHARACTERS[id];
  if (!base || !els.prepRoleDialog) return;

  const role = getPreparationRole(id);
  const total = state.preparation.field.length + state.preparation.bench.length;
  const canSetField = role === "field" || (state.preparation.field.length < 3 && (role !== "none" || total < 6));
  const canSetBench = role === "bench" || role !== "none" || total < 6;

  state.prepRoleTargetId = id;
  if (els.prepRoleTitle) {
    const current = role === "field" ? "戦闘" : role === "bench" ? "控え" : "未選択";
    els.prepRoleTitle.textContent = `${base.name}（現在: ${current}） / ${base.skill}`;
  }
  if (els.prepToFieldBtn) els.prepToFieldBtn.disabled = !canSetField;
  if (els.prepToBenchBtn) els.prepToBenchBtn.disabled = !canSetBench;
  if (els.prepToNoneBtn) els.prepToNoneBtn.disabled = role === "none";

  if (!els.prepRoleDialog.open) {
    els.prepRoleDialog.showModal();
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

function getBgmElement(track) {
  if (track === "title") return els.bgmTitle;
  if (track === "menu") return els.bgmMenu;
  if (track === "battle") return els.bgmBattle;
  return null;
}

function clampBgmVolume(rawValue) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return 70;
  return Math.max(0, Math.min(100, Math.floor(parsed)));
}

function getEffectiveBgmVolume(track) {
  const base = BGM_VOLUME[track] ?? 0.42;
  const scale = clampBgmVolume(state.settings.bgmVolume) / 100;
  return Math.max(0, Math.min(1, base * scale));
}

function applyBgmAudioSettings() {
  BGM_TRACKS.forEach((track) => {
    const audio = getBgmElement(track);
    if (!audio) return;
    audio.muted = Boolean(state.settings.bgmMuted);
    audio.volume = getEffectiveBgmVolume(track);
  });
}

function clampSfxVolume(rawValue) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return 80;
  return Math.max(0, Math.min(100, Math.floor(parsed)));
}

function getEffectiveSfxVolume(key) {
  const base = SFX_BASE_VOLUME[key] ?? 0.86;
  const scale = clampSfxVolume(state.settings.sfxVolume) / 100;
  return Math.max(0, Math.min(1, base * scale));
}

function getSfxPrototype(key) {
  if (!SFX_KEYS.includes(key)) return null;
  if (state.audio.sfx[key]) return state.audio.sfx[key];
  const src = SFX_SOURCES[key];
  if (!src) return null;
  const audio = new Audio(src);
  audio.preload = "auto";
  state.audio.sfx[key] = audio;
  return audio;
}

function preloadSfx() {
  SFX_KEYS.forEach((key) => {
    const audio = getSfxPrototype(key);
    if (!audio) return;
    try {
      audio.load();
    } catch (_error) {
      // ignore preload errors
    }
  });
}

function applySfxAudioSettings() {
  SFX_KEYS.forEach((key) => {
    const audio = getSfxPrototype(key);
    if (!audio) return;
    audio.muted = Boolean(state.settings.sfxMuted);
    audio.volume = getEffectiveSfxVolume(key);
  });
}

function playSfx(key, options = {}) {
  if (!SFX_KEYS.includes(key)) return;
  const delayMs = Number.isFinite(Number(options.delayMs)) ? Math.max(0, Number(options.delayMs)) : 0;
  if (delayMs > 0) {
    window.setTimeout(() => {
      playSfx(key, { ...options, delayMs: 0 });
    }, delayMs);
    return;
  }
  if (state.settings.sfxMuted) return;
  const volume = getEffectiveSfxVolume(key);
  if (volume <= 0) return;

  const now = Date.now();
  const cooldownMs = Number.isFinite(Number(options.cooldownMs)) ? Math.max(0, Number(options.cooldownMs)) : 120;
  const lastAt = state.audio.lastSfxAt[key] ?? 0;
  if (now - lastAt < cooldownMs) return;
  state.audio.lastSfxAt[key] = now;

  const base = getSfxPrototype(key);
  if (!base) return;

  try {
    const instance = base.cloneNode(true);
    instance.volume = volume;
    instance.muted = Boolean(state.settings.sfxMuted);
    void instance.play().catch(() => {});
  } catch (_error) {
    base.currentTime = 0;
    base.volume = volume;
    base.muted = Boolean(state.settings.sfxMuted);
    void base.play().catch(() => {});
  }
}

function resolveDesiredBgmTrack() {
  if (state.screen === "battle") return "battle";
  if (state.screen === "top") {
    return state.topStep === "title" ? "title" : "menu";
  }
  return null;
}

async function syncBgmForView(forceRestart = false) {
  const desired = resolveDesiredBgmTrack();
  const current = state.audio.track;
  const desiredEl = desired ? getBgmElement(desired) : null;

  if (!forceRestart && desired && current === desired && desiredEl && !desiredEl.paused) {
    return;
  }

  BGM_TRACKS.forEach((track) => {
    if (track === desired) return;
    const audio = getBgmElement(track);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });

  if (!desired || !desiredEl) {
    state.audio.track = null;
    return;
  }

  applyBgmAudioSettings();
  desiredEl.loop = true;
  if (forceRestart || current !== desired) {
    desiredEl.currentTime = 0;
  }

  try {
    await desiredEl.play();
  } catch (_error) {
    // Browser autoplay policy can block play() until user interaction.
  }
  state.audio.track = desired;
}

function resumeBgmOnInteraction() {
  void syncBgmForView();
}

function pickRandomTopHeroImage(exclude = null) {
  const candidates = TOP_HERO_IMAGES.filter((file) => file !== exclude);
  if (!candidates.length) return TOP_HERO_IMAGES[0] ?? null;
  return randomOf(candidates) ?? TOP_HERO_IMAGES[0] ?? null;
}

function refreshTopHeroBackground(forceShuffle = false) {
  if (!els.topScreen) return;
  const shouldShowHero = state.screen === "top" && (state.topStep === "title" || state.topStep === "mode");
  if (!shouldShowHero) {
    els.topScreen.classList.remove("show-hero");
    return;
  }

  if (forceShuffle || !state.topHeroImage) {
    state.topHeroImage = pickRandomTopHeroImage(state.topHeroImage);
  }
  if (!state.topHeroImage) return;

  const imagePath = encodeURI(resolveIllustrationPath(state.topHeroImage).replace(/\\/g, "/"));
  els.topScreen.style.setProperty("--top-hero-image", `url("${imagePath}")`);
  els.topScreen.classList.add("show-hero");
}

function closeTopMenu() {
  if (!els.topMenuPanel) return;
  els.topMenuPanel.classList.add("hidden");
}

function toggleTopMenu(forceOpen = null) {
  if (!els.topMenuPanel) return;
  const shouldOpen = forceOpen === null ? els.topMenuPanel.classList.contains("hidden") : Boolean(forceOpen);
  if (shouldOpen) {
    syncSettingsUI();
  }
  els.topMenuPanel.classList.toggle("hidden", !shouldOpen);
}

function setCpuNotice(message) {
  state.cpuNotice = message;
  if (state.screen === "battle") {
    render();
  }
}

function showTurnBanner(message, tone = "neutral", durationMs = 2000) {
  if (!els.turnBanner) return Promise.resolve();
  els.turnBanner.innerHTML = "";
  const banner = document.createElement("div");
  banner.className = "turn-banner-item";
  if (tone) {
    banner.classList.add(tone);
  }
  banner.textContent = message;
  els.turnBanner.appendChild(banner);
  void banner.offsetWidth;
  banner.classList.add("show");

  const displayMs = Math.max(500, durationMs);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      banner.classList.remove("show");
    }, displayMs);
    window.setTimeout(() => {
      banner.remove();
      resolve();
    }, displayMs + 240);
  });
}

async function transitionToNextTurn(fromSide, toSide) {
  if (state.gameOver || state.screen !== "battle") {
    render();
    return false;
  }
  if (state.turnTransitioning) {
    return false;
  }
  state.turnTransitioning = true;
  const endText = fromSide === "player" ? "ターン終了" : "相手ターン終了";
  const nextText = toSide === "enemy" ? "相手ターン開始" : "自分ターン開始";
  const nextTone = toSide === "enemy" ? "enemy" : "player";
  try {
    await showTurnBanner(endText, "end", 2000);
    resolveTurnEnd(fromSide);
    if (state.gameOver) {
      render();
      return false;
    }
    await showTurnBanner(nextText, nextTone, 2000);
    await startTurn(toSide, { showBanner: false });
    return true;
  } finally {
    state.turnTransitioning = false;
  }
}

async function transitionToPracticePlayerTurnAfterSkip() {
  if (state.gameOver || state.screen !== "battle" || state.turnTransitioning) {
    render();
    return false;
  }
  state.turnTransitioning = true;
  try {
    await showTurnBanner("ターン終了", "end", 2000);
    resolveTurnEnd("player");
    if (state.gameOver) {
      render();
      return false;
    }
    setCpuNotice("練習モード: 相手ターンをスキップして自分ターンへ戻ります。");
    resolveTurnEnd("enemy");
    if (state.gameOver) {
      render();
      return false;
    }
    await showTurnBanner("自分ターン開始", "player", 2000);
    await startTurn("player", { showBanner: false });
    return true;
  } finally {
    state.turnTransitioning = false;
  }
}

function showTopScreen() {
  state.screen = "top";
  closeTopMenu();
  if (els.turnBanner) {
    els.turnBanner.innerHTML = "";
  }
  hideChanceOverlay();
  els.topScreen.classList.remove("hidden");
  els.battleApp.classList.add("hidden");
  refreshTopHeroBackground(false);
  void syncBgmForView();
}

function showTopStep(step) {
  const previousStep = state.topStep;
  state.topStep = step;
  if (step !== "team") {
    closePrepRoleDialog();
  }
  if (els.topIntro) {
    els.topIntro.classList.toggle("hidden", step !== "title");
  }
  if (els.topScreen) {
    els.topScreen.classList.toggle("is-title-mode", step === "title");
  }
  if (document.body) {
    document.body.classList.toggle("title-mode", step === "title");
  }
  if (els.titleStepPanel) {
    els.titleStepPanel.classList.toggle("hidden", step !== "title");
  }
  if (els.modeStepPanel) {
    els.modeStepPanel.classList.toggle("hidden", step !== "mode");
  }
  if (els.storyStepPanel) {
    els.storyStepPanel.classList.toggle("hidden", step !== "story");
  }
  if (els.practiceStepPanel) {
    els.practiceStepPanel.classList.toggle("hidden", step !== "practice");
  }
  if (els.galleryStepPanel) {
    els.galleryStepPanel.classList.toggle("hidden", step !== "gallery");
  }
  if (els.modeRulesStepPanel) {
    els.modeRulesStepPanel.classList.toggle("hidden", step !== "rules");
  }
  if (els.teamStepPanel) {
    els.teamStepPanel.classList.toggle("hidden", step !== "team");
  }
  if (els.channelStepPanel) {
    els.channelStepPanel.classList.toggle("hidden", step !== "channel");
  }
  if (step === "story") {
    renderStoryStep();
  }
  if (step === "practice") {
    renderPracticeSetup();
  }
  if (step === "gallery") {
    renderGalleryStep();
  }
  if (step === "rules") {
    renderModeRulesStep();
  }
  const enteringHeroStep = step === "title" || step === "mode";
  const forceShuffle = enteringHeroStep && previousStep !== step;
  refreshTopHeroBackground(forceShuffle);
  void syncBgmForView();
}

function showBattleScreen() {
  state.screen = "battle";
  closeTopMenu();
  els.topScreen.classList.add("hidden");
  els.battleApp.classList.remove("hidden");
  refreshTopHeroBackground(false);
  void syncBgmForView();
}

function syncSettingsUI() {
  if (els.confirmActionsToggle) {
    els.confirmActionsToggle.checked = state.settings.confirmActions;
  }
  if (els.menuConfirmActionsToggle) {
    els.menuConfirmActionsToggle.checked = state.settings.confirmActions;
  }
  if (els.fastEnemyToggle) {
    els.fastEnemyToggle.checked = state.settings.fastEnemy;
  }
  if (els.menuFastEnemyToggle) {
    els.menuFastEnemyToggle.checked = state.settings.fastEnemy;
  }
  const bgmVolume = clampBgmVolume(state.settings.bgmVolume);
  if (els.bgmVolumeSlider) {
    els.bgmVolumeSlider.value = String(bgmVolume);
  }
  if (els.menuBgmVolumeSlider) {
    els.menuBgmVolumeSlider.value = String(bgmVolume);
  }
  if (els.bgmVolumeValue) {
    els.bgmVolumeValue.textContent = `${bgmVolume}%`;
  }
  if (els.menuBgmVolumeValue) {
    els.menuBgmVolumeValue.textContent = `${bgmVolume}%`;
  }
  if (els.bgmMuteToggleBtn) {
    els.bgmMuteToggleBtn.textContent = state.settings.bgmMuted ? "BGM ON" : "BGM OFF";
  }
  if (els.menuBgmMuteToggleBtn) {
    els.menuBgmMuteToggleBtn.textContent = state.settings.bgmMuted ? "BGM ON" : "BGM OFF";
  }
  const sfxVolume = clampSfxVolume(state.settings.sfxVolume);
  if (els.sfxVolumeSlider) {
    els.sfxVolumeSlider.value = String(sfxVolume);
  }
  if (els.menuSfxVolumeSlider) {
    els.menuSfxVolumeSlider.value = String(sfxVolume);
  }
  if (els.sfxVolumeValue) {
    els.sfxVolumeValue.textContent = `${sfxVolume}%`;
  }
  if (els.menuSfxVolumeValue) {
    els.menuSfxVolumeValue.textContent = `${sfxVolume}%`;
  }
  if (els.sfxMuteToggleBtn) {
    els.sfxMuteToggleBtn.textContent = state.settings.sfxMuted ? "SE ON" : "SE OFF";
  }
  if (els.menuSfxMuteToggleBtn) {
    els.menuSfxMuteToggleBtn.textContent = state.settings.sfxMuted ? "SE ON" : "SE OFF";
  }
  applyBgmAudioSettings();
  applySfxAudioSettings();
}

function isPreparationReady() {
  const total = state.preparation.field.length + state.preparation.bench.length;
  return total === 6 && state.preparation.field.length >= 1 && state.preparation.field.length <= 3;
}

function invalidateChannelSelection() {
  state.channels.player = null;
  state.channels.enemy = null;
  if (!isPreparationReady()) {
    state.prepAutoChannelPrompted = false;
  }
  setupChannelSelectionUI();
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
    void maybePromptReadyToChannel();
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
  void maybePromptReadyToChannel();
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
  if (els.prepSynergyGuide) {
    els.prepSynergyGuide.innerHTML = getPreparationSynergyGuideMarkup(state.preparation.field);
  }
  renderRecommendedTeamList();
  if (!isPreparationReady()) {
    state.prepAutoChannelPrompted = false;
  }

  const emptyChip = `<span class="prep-chip">未選択</span>`;
  const renderMemberChip = (id) => {
    const base = BASE_CHARACTERS[id];
    if (!base) return "";
    const portrait = getCharacterPortrait(id);
    const hasPortrait = Boolean(portrait);
    return `
      <span class="prep-member-chip">
        <span class="prep-member-avatar-wrap">
          <img
            class="prep-member-avatar ${hasPortrait ? "" : "hidden"}"
            src="${hasPortrait ? portrait : ""}"
            alt="${base.name} アイコン"
            onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';"
          />
          <span class="prep-member-avatar-fallback" style="${hasPortrait ? "display:none;" : ""}">${base.name}</span>
        </span>
        <span class="prep-member-name">${base.name}</span>
      </span>
    `;
  };

  els.prepFieldList.innerHTML = state.preparation.field.length
    ? state.preparation.field.map((id) => renderMemberChip(id)).join("")
    : emptyChip;

  els.prepBenchList.innerHTML = state.preparation.bench.length
    ? state.preparation.bench.map((id) => renderMemberChip(id)).join("")
    : emptyChip;

  els.prepRoster.innerHTML = ids
    .map((id) => {
      const base = BASE_CHARACTERS[id];
      const role = getPreparationRole(id);
      const roleClass = role === "field" ? "is-field" : role === "bench" ? "is-bench" : "";
      const roleLabel = role === "field" ? "戦闘" : role === "bench" ? "控え" : "未選択";
      const roleBannerClass = role === "field" ? "field" : role === "bench" ? "bench" : "none";
      const roleBannerLabel = role === "field" ? "戦闘メンバー" : role === "bench" ? "控えメンバー" : "未選択";
      const portrait = getCharacterPortrait(id);
      const hasPortrait = Boolean(portrait);
      const tags = getCharacterTagLabels(id);

      return `
        <article class="prep-card ${roleClass}" data-char-id="${id}">
          <div class="prep-header">
            <div class="prep-name">${base.name}</div>
            <span class="prep-role-badge">${base.role}</span>
          </div>
          <div class="prep-subtype">${tags[0] ?? "所属未設定"} / ${base.role} / ${base.gender}</div>
          <figure class="prep-thumb-wrap">
            <span class="prep-thumb-status ${roleBannerClass}">${roleBannerLabel}</span>
            <img
              class="prep-thumb ${hasPortrait ? "" : "hidden"}"
              src="${hasPortrait ? portrait : ""}"
              alt="${base.name} portrait"
              onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';"
            />
            <figcaption class="prep-thumb-fallback" style="${hasPortrait ? "display:none;" : ""}">画像なし</figcaption>
          </figure>
          <div class="prep-stats">ATK / ${base.baseAtk}　HP / ${base.baseHp}</div>
          <div class="prep-meta">配置: ${roleLabel}</div>
          <div class="prep-meta">${tags.join(" / ")}</div>
          <div class="prep-skill">${base.skill}</div>
        </article>
      `;
    })
    .join("");

  if (els.toChannelStepBtn) {
    els.toChannelStepBtn.disabled = !isPreparationReady();
  }
  renderTeamPresetList();
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
  state.lastAction = { player: null, enemy: null };
  state.turnActionBonus = { player: 0, enemy: 0 };
  state.momentum = { player: 0, enemy: 0 };
  state.signal = {
    lastResolvedRound: 0,
    boostTurns: { player: 0, enemy: 0 },
    holder: null,
    message: "シグナル争奪準備中",
  };
  state.turnPerks = { player: {}, enemy: {} };
  state.matchStats = {
    playerDamage: 0,
    enemyDamage: 0,
    playerKOs: 0,
    enemyKOs: 0,
    playerTacticalCalls: 0,
    enemyTacticalCalls: 0,
    signalWins: { player: 0, enemy: 0 },
    roleCombos: { player: 0, enemy: 0 },
  };
  state.selectedId = null;
  state.selectedSide = null;
  state.selectedZone = null;
  state.fieldLimit = { player: 3, enemy: 3 };
  state.pendingAction = null;
  state.gameOver = false;
  state.winner = null;
  state.reviveUsed = { player: false, enemy: false };
  state.animations = {};
  state.cpuNotice = "相手待機中";
  state.autoEndingTurn = false;
  state.turnTransitioning = false;
  state.enemyTurnRunning = false;
  state.prepRoleTargetId = null;

  const setup = state.matchSetup
    ? createMatchSetup(state.matchSetup.source ?? "cpu", state.matchSetup)
    : createMatchSetup("cpu", {
        playerTeam: INITIAL_TEAMS.player,
        enemyTeam: INITIAL_TEAMS.enemy,
        channels: { player: null, enemy: null },
      });
  state.matchSetup = setup;
  state.channels = cloneChannelConfig(setup.channels);

  state.player.field = [...setup.playerTeam.field];
  state.player.bench = [...setup.playerTeam.bench];
  state.player.grave = [];
  state.enemy.field = [...setup.enemyTeam.field];
  state.enemy.bench = [...setup.enemyTeam.bench];
  state.enemy.grave = [];
  separateSharedCharactersBetweenTeams();

  if (setup.channels.player) {
    applyChannelEffects("player", setup.channels.player);
  }
  if (setup.channels.enemy) {
    applyChannelEffects("enemy", setup.channels.enemy);
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
  if (character.paralyzeTurns > 0) labels.push(`痺れ: あと${character.paralyzeTurns}ターン`);
  if (character.shieldHits > 0) labels.push(`シールド:${character.shieldHits}/${SHIELD_MAX}`);
  if (character.poison) labels.push("継続ダメージ(毒)");
  if (character.dots.length) {
    const totalDotDamage = character.dots.reduce((sum, dot) => sum + dot.damage, 0);
    labels.push(totalDotDamage > 0 ? `継続ダメージ:${totalDotDamage}` : "継続ダメージ");
  }
  if (character.atkZeroTurns > 0) labels.push(`Attack0 あと${character.atkZeroTurns}ターン`);
  if (character.atkMultiplierTurns > 0) labels.push(`ATKx2:${character.atkMultiplierTurns}`);
  if (character.skillMultiplierTurns > 0) labels.push(`スキルx2:${character.skillMultiplierTurns}`);

  if (zone === "bench") {
    const remain = getBenchLockRemain(character, side);
    if (remain > 0) labels.push(`出撃不可:あと${remain}ターン`);
  }
  return labels;
}

function getAtkBuffSummary(character) {
  const total = character.atkBuffs.reduce((sum, buff) => sum + buff.amount, 0);
  const maxTurns = character.atkBuffs.reduce((max, buff) => Math.max(max, buff.turns), 0);
  return { total, maxTurns };
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

function getTargetIndicator(side, zone, id) {
  if (!isTargetable(side, zone, id)) return null;
  const action = state.pendingAction;
  if (!action) return null;

  if (action.type === "attack") {
    return { className: "target-attack", label: "攻撃対象" };
  }
  if (action.type === "revive") {
    return { className: "target-revive", label: "蘇生対象" };
  }
  if (action.type === "swap") {
    return { className: "target-swap", label: "交代候補" };
  }
  if (action.type === "skill") {
    const allyTarget = side === "player";
    return { className: allyTarget ? "target-ally" : "target-enemy", label: allyTarget ? "味方対象" : "敵対象" };
  }
  return { className: "targetable", label: "選択可" };
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
    if (isField && state.fieldLimit[owner] === 6) {
      card.classList.add("compact-six");
    }
    const actedThisTurn = isField && owner === state.turn && hasActed(id);
    if (actedThisTurn) {
      card.classList.add("acted");
    }

    if (state.selectedId === id && state.selectedSide === owner && state.selectedZone === zone) {
      card.classList.add("selected");
    }
    const targetInfo = getTargetIndicator(owner, zone, id);
    if (targetInfo) {
      card.classList.add("targetable", targetInfo.className);
      card.dataset.targetLabel = targetInfo.label;
    } else {
      delete card.dataset.targetLabel;
      if (state.pendingAction && state.turn === "player") {
        card.classList.add("non-target");
      }
    }
    if (zone === "bench" && getBenchLockRemain(character, owner) > 0) card.classList.add("locked");

    const hpPercent = Math.max(0, Math.round((character.hp / character.maxHp) * 100));
    const atk = getCurrentAtk(character);
    const atkBuff = getAtkBuffSummary(character);
    const statusLabels = getStatusLabels(character, owner, zone);
    const statusSummary = statusLabels.length ? statusLabels.join(" / ") : "正常";
    const cooldown = zone === "bench" ? getBenchLockRemain(character, owner) : 0;
    const atkBonusText =
      atkBuff.total !== 0 ? `${atkBuff.total > 0 ? "+" : ""}${atkBuff.total}${atkBuff.maxTurns > 0 ? ` (${atkBuff.maxTurns}T)` : ""}` : "";

    if (!isField) {
      const hasBenchPortrait = Boolean(character.portrait);
      const canDirectDeploy = getTeam(owner).field.length < state.fieldLimit[owner];
      card.innerHTML = `
        ${targetInfo ? `<div class="target-mark">${targetInfo.label}</div>` : ""}
        <div class="bench-main">
          <div class="bench-avatar-wrap">
            <img class="bench-avatar ${hasBenchPortrait ? "" : "hidden"}" src="${hasBenchPortrait ? character.portrait : ""}" alt="${character.name}アイコン"
              onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';" />
            <div class="bench-avatar-fallback" style="${hasBenchPortrait ? "display:none;" : ""}">${character.name}</div>
          </div>
          <div class="bench-info">
            <div class="bench-name">${character.name}</div>
            <div class="bench-meta">${character.team} / HP ${character.hp}/${character.maxHp} / ATK ${atk}</div>
            <div class="bench-meta">${statusLabels.length ? statusLabels.join(" / ") : "待機中"}</div>
          </div>
        </div>
        <div class="bench-lock">${cooldown > 0 ? `出撃不可: あと${cooldown}ターン` : canDirectDeploy ? "出撃可能" : "交代可能"}</div>
      `;
      card.addEventListener("click", () => {
        void handleCardClick(id, owner, zone);
      });
      container.appendChild(card);
      return;
    }

    const hasPortrait = Boolean(character.portrait);
    const hasCardArt = Boolean(character.cardArt);

    card.innerHTML = `
      ${targetInfo ? `<div class="target-mark">${targetInfo.label}</div>` : ""}
      ${actedThisTurn ? `<div class="acted-mark">行動終了</div>` : ""}
      <div class="duel-card-header">
        <div class="character-name">${character.name}</div>
        <div class="duel-card-cost ${statusLabels.length ? "has-status" : ""}" title="${statusSummary}">${statusSummary}</div>
      </div>
      <div class="duel-card-type-row">
        <span>${character.team} / ${character.role} / ${character.gender}</span>
      </div>
      <div class="portrait-frame" data-char="${character.baseId ?? character.id}">
        <img class="portrait-img ${hasPortrait ? "" : "hidden"}" src="${hasPortrait ? character.portrait : ""}" alt="${character.name}立ち絵"
          onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';" />
        <div class="portrait-placeholder" style="${hasPortrait ? "display:none;" : ""}">
          画像準備中
        </div>
      </div>
      <div class="duel-effect-box">
        <div class="skill-text">${character.skill}</div>
      </div>
      <div class="stats-row duel-stats">
        <span class="atk-line">ATK / ${atk}${atkBonusText ? ` <em class="atk-bonus">${atkBonusText}</em>` : ""}</span>
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

function renderBenchZone(container, owner) {
  if (!container) return;
  container.innerHTML = "";
  const team = getTeam(owner);
  if (!team) return;

  const members = [
    ...team.bench.map((id) => ({ id, zone: "bench" })),
    ...team.grave.map((id) => ({ id, zone: "grave" })),
  ];

  members.forEach(({ id, zone }) => {
    const character = getCharacter(id);
    if (!character) return;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "bench-card";
    if (zone === "grave") {
      card.classList.add("knocked");
    }
    if (state.selectedId === id && state.selectedSide === owner && state.selectedZone === zone) {
      card.classList.add("selected");
    }

    const targetInfo = getTargetIndicator(owner, zone, id);
    if (targetInfo) {
      card.classList.add("targetable", targetInfo.className);
      card.dataset.targetLabel = targetInfo.label;
    } else {
      delete card.dataset.targetLabel;
      if (state.pendingAction && state.turn === "player") {
        card.classList.add("non-target");
      }
    }

    const hasPortrait = Boolean(character.portrait);
    const atk = getCurrentAtk(character);
    const statusLabels = getStatusLabels(character, owner, zone);
    const cooldown = zone === "bench" ? getBenchLockRemain(character, owner) : 0;
    if (zone === "bench" && cooldown > 0) {
      card.classList.add("locked");
    }

    const metaText = zone === "grave" ? "HP 0 / 戦闘不能" : `HP ${character.hp}/${character.maxHp} / ATK ${atk}`;
    const stateText = zone === "grave" ? "気絶中（蘇生待機）" : statusLabels.length ? statusLabels.join(" / ") : "待機中";
    const canDirectDeploy = team.field.length < state.fieldLimit[owner];
    const footerText =
      zone === "grave"
        ? "蘇生対象"
        : cooldown > 0
          ? `出撃不可: あと${cooldown}ターン`
          : canDirectDeploy
            ? "出撃可能"
            : "交代可能";

    card.innerHTML = `
      ${targetInfo ? `<div class="target-mark">${targetInfo.label}</div>` : ""}
      ${zone === "grave" ? `<div class="bench-ko-badge">気絶</div>` : ""}
      <div class="bench-main">
        <div class="bench-avatar-wrap">
          <img class="bench-avatar ${hasPortrait ? "" : "hidden"}" src="${hasPortrait ? character.portrait : ""}" alt="${character.name}アイコン"
            onerror="this.classList.add('hidden'); this.nextElementSibling.style.display='grid';" />
          <div class="bench-avatar-fallback" style="${hasPortrait ? "display:none;" : ""}">${character.name}</div>
        </div>
        <div class="bench-info">
          <div class="bench-name">${character.name}</div>
          <div class="bench-meta">${metaText}</div>
          <div class="bench-meta">${stateText}</div>
        </div>
      </div>
      <div class="bench-lock">${footerText}</div>
    `;

    card.addEventListener("click", () => {
      void handleCardClick(id, owner, zone);
    });
    container.appendChild(card);
  });

  const maxSlots = 6;
  for (let i = members.length; i < maxSlots; i += 1) {
    const slot = document.createElement("div");
    slot.className = "empty-slot";
    slot.textContent = "空き控え枠";
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
    const targetInfo = getTargetIndicator(owner, "grave", id);
    if (targetInfo) {
      button.classList.add("targetable", targetInfo.className);
      button.innerHTML = `<span class="target-mark">${targetInfo.label}</span><strong>${character.name}</strong><br><small>HP 0</small>`;
    } else {
      if (state.pendingAction && state.turn === "player") {
        button.classList.add("non-target");
      }
      button.innerHTML = `<strong>${character.name}</strong><br><small>HP 0</small>`;
    }
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
    els.targetHint.textContent = `${state.pendingAction.prompt}（選択可能な枠は色付き表示）`;
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
  if (state.actionsUsed >= getActionLimit(side)) return false;
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

function canPlayerUseReviveNow() {
  return getSideChannel("player") === "revive" && !state.reviveUsed.player && state.player.grave.length > 0;
}

async function tryDirectReviveByGraveClick(id, side, zone) {
  if (state.gameOver || state.screen !== "battle") return false;
  if (state.pendingAction) return false;
  if (side !== "player" || zone !== "grave") return false;
  if (!canPlayerUseReviveNow()) return false;
  if (state.turn !== "player") return false;

  const target = getCharacter(id);
  if (!target) return false;
  if (!(await confirmAction(`${target.name} に死者蘇生を使いますか？`))) {
    return false;
  }

  const revived = useRevive("player", id);
  if (!revived) {
    log("死者蘇生を実行できませんでした。");
    return true;
  }

  clearPendingAction();
  clearSelection();
  checkWinCondition();
  render();
  return true;
}

function canPlayerTakeAnyAction() {
  if (state.turn !== "player" || state.gameOver || state.screen !== "battle" || state.turnTransitioning) return false;
  if (state.pendingAction) return true;
  const hasTacticalWindow =
    state.player.field.some((id) => {
      const character = getCharacter(id);
      return Boolean(character && character.hp > 0);
    }) && (state.momentum.player ?? 0) >= TACTICAL_CALLS.cover.cost;
  if (state.actionsUsed >= getActionLimit("player")) return hasTacticalWindow;

  const hasFieldActor = state.player.field.some((id) => canAct(id, "player"));
  if (hasFieldActor) return true;

  const canBenchEnter = state.player.bench.some((id) => {
    const character = getCharacter(id);
    if (!character) return false;
    if (hasActed(id)) return false;
    if (getBenchLockRemain(character, "player") > 0) return false;
    if (state.player.field.length < state.fieldLimit.player) return true;
    return state.player.field.length > 0;
  });
  if (canBenchEnter) return true;

  if (hasTacticalWindow) return true;
  if (canPlayerUseReviveNow()) return true;
  return false;
}

function forceEndPlayerTurnNoAction() {
  if (state.gameOver || state.turn !== "player" || state.screen !== "battle") return;
  if (state.turnTransitioning) return;
  if (state.pendingAction) return;
  setCpuNotice("行動可能なキャラがいないため自動でターン終了。");
  void transitionToNextTurn("player", "enemy");
}

function maybeAutoEndPlayerTurn() {
  if (state.autoEndingTurn) return;
  if (state.turnTransitioning) return;
  if (state.turn !== "player" || state.gameOver || state.screen !== "battle") return;
  if (state.pendingAction) return;
  if (canPlayerTakeAnyAction()) return;
  state.autoEndingTurn = true;
  closeCharacterActionDialog();
  window.setTimeout(() => {
    state.autoEndingTurn = false;
    forceEndPlayerTurnNoAction();
  }, 120);
}

function getTacticalTargetId() {
  if (state.selectedSide !== "player" || state.selectedZone !== "field") return null;
  if (!state.player.field.includes(state.selectedId)) return null;
  const character = getCharacter(state.selectedId);
  return character && character.hp > 0 ? state.selectedId : null;
}

function canUseTacticalCall(type) {
  const call = TACTICAL_CALLS[type];
  if (!call) return false;
  if (state.turn !== "player" || state.gameOver || state.screen !== "battle" || state.turnTransitioning) return false;
  if (state.pendingAction) return false;
  if ((state.momentum.player ?? 0) < call.cost) return false;
  if (type === "tempo") return true;
  const targetId = getTacticalTargetId();
  if (!targetId) return false;
  if (type === "cover") {
    return (getCharacter(targetId)?.shieldHits ?? 0) < SHIELD_MAX;
  }
  return true;
}

function updateTacticalButtons(playerTurn, pending) {
  const buttonMap = {
    focus: [els.focusCallBtn, els.focusCallDialogBtn],
    recover: [els.recoverCallBtn, els.recoverCallDialogBtn],
    cover: [els.coverCallBtn, els.coverCallDialogBtn],
    tempo: [els.tempoCallBtn, els.tempoCallDialogBtn],
  };
  Object.entries(buttonMap).forEach(([type, buttons]) => {
    const call = TACTICAL_CALLS[type];
    buttons.forEach((button) => {
      if (!button) return;
      button.textContent = `${call.name.replace("コール", "")} ${call.cost}`;
      button.disabled = !(playerTurn && !pending && canUseTacticalCall(type));
      button.title = `${call.name}: ${call.description} / コスト${call.cost}`;
    });
  });
  if (els.tacticalHint) {
    const selectedTarget = getTacticalTargetId();
    els.tacticalHint.textContent = selectedTarget
      ? `${getCharacter(selectedTarget).name} を対象にコール可能。数字は必要モメンタムです。`
      : "フォーカス/リカバー/カバーは味方フィールドを選択して使います。数字は必要モメンタムです。";
  }
}

function isPracticeBattle() {
  return state.matchSetup?.source === "practice";
}

function renderPracticeCpuControl() {
  if (!els.practiceCpuControl) return;
  const visible = isPracticeBattle();
  els.practiceCpuControl.classList.toggle("hidden", !visible);
  if (!visible) return;
  syncPracticeCpuModeButtons(els.practiceCpuControl);
}

function setPracticeCpuBehavior(mode, announce = true) {
  if (mode !== "normal" && mode !== "skip") return;
  state.practice.cpuBehavior = mode;
  if (announce) {
    const label = mode === "skip" ? "相手ターンスキップ" : "通常";
    log(`練習CPU動作を「${label}」に変更しました。`);
    setCpuNotice(`練習CPU動作: ${label}`);
  }
  syncPracticeCpuModeButtons(els.practiceSetupCpuControl);
  renderPracticeCpuControl();
  if (mode === "skip" && isPracticeBattle() && state.turn === "enemy" && !state.enemyTurnRunning) {
    window.setTimeout(() => {
      void skipPracticeEnemyTurnIfNeeded();
    }, 0);
  }
}

async function skipPracticeEnemyTurnIfNeeded() {
  if (!isPracticeBattle()) return false;
  if (state.practice.cpuBehavior !== "skip") return false;
  if (state.gameOver || state.turn !== "enemy" || state.screen !== "battle" || state.turnTransitioning) return false;
  setCpuNotice("練習モード: 相手ターンをスキップします。");
  await transitionToNextTurn("enemy", "player");
  return true;
}

function renderUpdateSystems() {
  const playerMomentum = state.momentum.player ?? 0;
  const enemyMomentum = state.momentum.enemy ?? 0;
  const playerRate = `${(playerMomentum / MOMENTUM_MAX) * 100}%`;
  const enemyRate = `${(enemyMomentum / MOMENTUM_MAX) * 100}%`;

  if (els.playerMomentumFill) els.playerMomentumFill.style.width = playerRate;
  if (els.enemyMomentumFill) els.enemyMomentumFill.style.width = enemyRate;
  if (els.playerMomentumValue) els.playerMomentumValue.textContent = `${playerMomentum} / ${MOMENTUM_MAX}`;
  if (els.enemyMomentumValue) els.enemyMomentumValue.textContent = `${enemyMomentum} / ${MOMENTUM_MAX}`;

  const round = getSignalRoundNumber();
  const nextSignal = round % SIGNAL_INTERVAL === 0 ? round : round + (SIGNAL_INTERVAL - (round % SIGNAL_INTERVAL));
  if (els.signalRoundLabel) {
    els.signalRoundLabel.textContent =
      state.signal.holder && state.signal.boostTurns[state.signal.holder] > 0
      ? `優勢: ${getSideLabel(state.signal.holder)} 残り${state.signal.boostTurns[state.signal.holder]}T`
      : `シグナル: 次は第${nextSignal}R`;
  }
  if (els.signalStatus) {
    const playerScore = calculateSignalScore("player").toFixed(1);
    const enemyScore = calculateSignalScore("enemy").toFixed(1);
    els.signalStatus.textContent = `評価 自分${playerScore} / 相手${enemyScore}`;
  }
  if (els.playerTopSynergyStatus) {
    els.playerTopSynergyStatus.innerHTML = getSideSynergyCompactMarkup("player");
  }
  if (els.enemyTopSynergyStatus) {
    els.enemyTopSynergyStatus.innerHTML = getSideSynergyCompactMarkup("enemy");
  }
  if (els.playerFieldSynergyPanel) {
    els.playerFieldSynergyPanel.innerHTML = getFieldSynergyMarkup("player");
  }
}

async function useTacticalCall(type, side = "player") {
  const call = TACTICAL_CALLS[type];
  if (!call) return false;
  if (side === "player" && !canUseTacticalCall(type)) {
    log("タクティカルコールの条件を満たしていません。");
    return false;
  }
  if (!spendMomentum(side, call.cost)) return false;

  const targetId = side === "player" ? getTacticalTargetId() : pickEnemyTacticalTarget(type);
  const target = targetId ? getCharacter(targetId) : null;

  if (type !== "tempo" && !target) {
    awardMomentum(side, call.cost, "コール対象不在の払い戻し");
    return false;
  }

  state.matchStats[side === "player" ? "playerTacticalCalls" : "enemyTacticalCalls"] += 1;
  log(`${getSideLabel(side)} ${call.name} 発動。`);

  if (type === "focus") {
    addAtkBuff(target, 2, 1);
    log(`${target.name} にフォーカス。ATK+2（1ターン）。`);
  }
  if (type === "recover") {
    heal(side, targetId, 4, { tactical: true });
  }
  if (type === "cover") {
    const added = addShield(target, 1, "カバーシールド");
    if (added > 0) {
      log(`${target.name} にカバーシールド+${added}。`);
    }
  }
  if (type === "tempo") {
    state.turnActionBonus[side] += 1;
    log(`${getSideLabel(side)} の行動上限がこのターン+1。`);
  }

  cast(`${getSideLabel(side)}が${call.name}で流れを動かす。`);
  render();
  return true;
}

function updateButtons() {
  const playerFieldSelected = state.selectedSide === "player" && state.selectedZone === "field";
  const playerBenchSelected = state.selectedSide === "player" && state.selectedZone === "bench";
  const playerTurn = state.turn === "player" && !state.gameOver && state.screen === "battle" && !state.turnTransitioning;
  const pending = Boolean(state.pendingAction);

  const fieldActionReady = playerFieldSelected && canAct(state.selectedId, "player");
  const benchActionReady =
    playerBenchSelected &&
    playerTurn &&
    !hasActed(state.selectedId) &&
    state.actionsUsed < getActionLimit("player") &&
    getBenchLockRemain(getCharacter(state.selectedId), "player") <= 0 &&
    (canDeployFromBench(state.selectedId, "player") || state.player.field.length > 0);

  if (els.attackBtn) {
    els.attackBtn.disabled = !(playerTurn && !pending && fieldActionReady);
  }
  if (els.skillBtn) {
    els.skillBtn.disabled = !(playerTurn && !pending && fieldActionReady && state.skillsUsed < getSkillLimit());
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

  const playerCanRevive = playerTurn && !pending && canPlayerUseReviveNow();
  if (els.reviveBtn) {
    els.reviveBtn.disabled = !playerCanRevive;
  }
  updateTacticalButtons(playerTurn, pending);
}

function render() {
  renderZone(els.enemyField, state.enemy.field, "enemy", "field");
  renderBenchZone(els.enemyBench, "enemy");

  renderZone(els.playerField, state.player.field, "player", "field");
  renderBenchZone(els.playerBench, "player");

  els.turnLabel.textContent = state.turn === "player" ? "プレイヤー" : "相手";
  els.actionsUsed.textContent = String(state.actionsUsed);
  if (els.actionLimit) els.actionLimit.textContent = String(getActionLimit(state.turn));
  els.skillsUsed.textContent = String(state.skillsUsed);
  if (els.skillLimit) els.skillLimit.textContent = String(getSkillLimit());
  els.victoryLabel.textContent = getVictoryText();

  renderBattleChannels();
  renderUpdateSystems();
  renderPracticeCpuControl();
  if (els.battleApp) {
    els.battleApp.classList.toggle("player-unity", state.fieldLimit.player === 6);
    els.battleApp.classList.toggle("enemy-unity", state.fieldLimit.enemy === 6);
  }
  els.playerFieldNote.textContent = `${state.player.field.length} / ${state.fieldLimit.player}`;
  els.enemyFieldNote.textContent = `${state.enemy.field.length} / ${state.fieldLimit.enemy}`;
  if (els.cpuActionNotice) {
    els.cpuActionNotice.textContent = state.cpuNotice || "相手待機中";
    els.cpuActionNotice.classList.toggle("enemy-active", state.turn === "enemy" && !state.gameOver);
  }

  updateSelectedInfo();
  updateTargetHint();
  updateButtons();
  syncCharacterActionDialog();
  maybeAutoEndPlayerTurn();
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
  if (els.battleChannelList) {
    els.battleChannelList.innerHTML = markup;
  }
  if (els.channelInfoList) {
    els.channelInfoList.innerHTML = markup;
  }
}

function setupChannelSelectionUI() {
  if (els.channelChoiceList) {
    els.channelChoiceList.innerHTML = CHANNELS.map((channel) => {
      const selectedClass = state.channels.player === channel.id ? "is-selected" : "";
      return `
        <article class="channel-choice-item ${selectedClass}">
          <div>
            <strong>${channel.name}</strong>
            <p>${channel.description}</p>
          </div>
          <button type="button" class="secondary-btn small" data-channel-pick="${channel.id}">これにする</button>
        </article>
      `;
    }).join("");
  }
  renderChannelReferencePanels();
  updateChannelStepSummary();
}

function pickEnemyChannelId() {
  const ids = CHANNELS.map((channel) => channel.id);
  return randomOf(ids) ?? CHANNELS[0].id;
}

function areChannelsReady() {
  return Boolean(state.channels.player && state.channels.enemy);
}

function updateChannelStepSummary() {
  const cpuChannel = getChannelById(state.channels.enemy);
  if (els.cpuChannelName) {
    els.cpuChannelName.textContent = cpuChannel ? cpuChannel.name : "未決定";
  }
  if (els.cpuChannelDescription) {
    els.cpuChannelDescription.textContent = cpuChannel
      ? cpuChannel.description
      : "プレイヤーがチャンネル確定後に相手が選択します。";
  }
}

function renderBattleChannels() {
  const playerChannel = getChannelById(state.channels.player);
  const enemyChannel = getChannelById(state.channels.enemy);
  const playerChannelName = playerChannel ? playerChannel.name : "未選択";
  const enemyChannelName = enemyChannel ? enemyChannel.name : "未選択";

  if (els.playerChannelLabel) {
    els.playerChannelLabel.textContent = playerChannelName;
  }
  if (els.playerChannelDesc) {
    els.playerChannelDesc.textContent = playerChannel ? playerChannel.description : "チャンネル未設定";
  }
  if (els.enemyChannelLabel) {
    els.enemyChannelLabel.textContent = enemyChannelName;
  }
  if (els.enemyChannelDesc) {
    els.enemyChannelDesc.textContent = enemyChannel ? enemyChannel.description : "チャンネル未設定";
  }
  if (els.playerFieldChannelBadge) {
    els.playerFieldChannelBadge.textContent = playerChannel
      ? `プレイヤーチャンネル: ${playerChannelName} / ${playerChannel.description}`
      : `プレイヤーチャンネル: ${playerChannelName}`;
  }
  if (els.enemyFieldChannelBadge) {
    els.enemyFieldChannelBadge.textContent = enemyChannel
      ? `相手チャンネル: ${enemyChannelName} / ${enemyChannel.description}`
      : `相手チャンネル: ${enemyChannelName}`;
  }
}

function confirmChannelsForBattle(playerChannelId) {
  if (!playerChannelId) return false;
  if (!isPreparationReady()) return false;
  state.channels.player = playerChannelId;
  state.channels.enemy = pickEnemyChannelId();
  updateChannelStepSummary();
  setupChannelSelectionUI();
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
  if (hpSpendResolver) {
    resolveHpSpendDialog(null);
  }
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
  playSfx("knockout", { cooldownMs: 80 });
  checkWinCondition();
}

function applyDamage(targetSide, targetId, damage, context = {}) {
  if (damage <= 0) return 0;
  const target = getCharacter(targetId);
  if (!target || target.hp <= 0) return 0;

  const reason = context.reason || "ダメージ";
  const sourceSide = context.sourceSide ?? null;
  const actorId = context.actorId ?? null;
  const modifier = getDamageModifier(sourceSide, actorId, targetSide, targetId, context);
  let finalDamage = Math.max(0, damage + modifier);
  if (!context.ignoreShield && target.shieldHits > 0) {
    target.shieldHits -= 1;
    log(`${target.name} のシールドが攻撃を無効化した。`);
    if (sourceSide && sourceSide !== targetSide) {
      awardMomentum(targetSide, 1, "シールド防御成功");
    }
    return 0;
  }

  if (sourceSide && sourceSide !== targetSide && hasTeamEffect(targetSide, "Riot")) {
    const perks = state.turnPerks[targetSide] ?? (state.turnPerks[targetSide] = {});
    if (!perks.riotGuardUsed && finalDamage > 0) {
      finalDamage = Math.max(0, finalDamage - 1);
      perks.riotGuardUsed = true;
      log(`${getSideLabel(targetSide)} ${UPDATE_TEAM_EFFECTS.Riot.name}: ダメージ-1`);
    }
  }

  const before = target.hp;
  target.hp = Math.max(0, target.hp - finalDamage);
  const dealt = before - target.hp;
  log(`${target.name} に${dealt}ダメージ（${reason}）。`);
  triggerCharacterAnimation(targetSide, targetId, "hit", 420);

  if (sourceSide === "player") state.matchStats.playerDamage += dealt;
  if (sourceSide === "enemy") state.matchStats.enemyDamage += dealt;
  if (sourceSide && sourceSide !== targetSide && dealt >= 6) {
    awardMomentum(sourceSide, 1, "ビッグヒット");
  }
  if (sourceSide && sourceSide !== targetSide && target.hp > 0 && target.hp <= Math.max(1, Math.floor(target.maxHp * 0.25))) {
    if (!target.clutchMomentTriggered) {
      target.clutchMomentTriggered = true;
      awardMomentum(targetSide, 1, `${target.name} クラッチ耐え`);
      cast(`${target.name} が瀬戸際で耐えた。勝負強さが光る！`);
    }
  }

  if (target.hp <= 0) {
    if (sourceSide === "player") state.matchStats.playerKOs += 1;
    if (sourceSide === "enemy") state.matchStats.enemyKOs += 1;
    if (sourceSide && sourceSide !== targetSide) {
      awardMomentum(sourceSide, 2, "KO獲得");
    }
    knockout(targetSide, targetId);
  }
  return dealt;
}

function heal(side, targetId, amount, context = {}) {
  if (amount <= 0) return 0;
  const target = getCharacter(targetId);
  if (!target || target.hp <= 0) return 0;

  const finalAmount = amount + getHealBonus(side, targetId, context);
  const before = target.hp;
  target.hp = Math.min(target.maxHp, target.hp + finalAmount);
  const recovered = target.hp - before;
  if (recovered > 0) {
    log(`${target.name} が${recovered}回復。`);
    if (recovered >= 4) {
      awardMomentum(side, 1, "大きな回復");
    }
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

function registerAction(actorId, usedSkill, side = state.turn) {
  if (!hasActed(actorId)) {
    state.actedIds.push(actorId);
    state.actionsUsed += 1;
  }
  if (usedSkill) state.skillsUsed += 1;
  const actor = getCharacter(actorId);
  if (actor && ["player", "enemy"].includes(side)) {
    state.lastAction[side] = {
      actorId,
      role: actor.role,
      usedSkill: Boolean(usedSkill),
    };
  }
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
  log(
    `試合結果: プレイヤー与ダメ${state.matchStats.playerDamage} / 相手与ダメ${state.matchStats.enemyDamage} / プレイヤーKO${state.matchStats.playerKOs} / 相手KO${state.matchStats.enemyKOs}`,
  );
  log(
    `追加結果: コール プレイヤー${state.matchStats.playerTacticalCalls}:相手${state.matchStats.enemyTacticalCalls} / シグナル プレイヤー${state.matchStats.signalWins.player}:相手${state.matchStats.signalWins.enemy} / 連携 プレイヤー${state.matchStats.roleCombos.player}:相手${state.matchStats.roleCombos.enemy}`,
  );
  state.cpuNotice = `試合終了：${resultText}`;
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
        const dealt = applyDamage(side, id, poisonDamage, { reason: "毒" });
        if (dealt > 0) {
          playSfx("poison", { cooldownMs: 120 });
        }
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
  decaySignalBoost(activeSide);
}

async function startTurn(side, options = {}) {
  if (state.gameOver || state.screen !== "battle") return;
  const showBanner = options.showBanner !== false;
  state.autoEndingTurn = false;
  state.turnTransitioning = false;
  if (side !== "enemy") {
    state.enemyTurnRunning = false;
  }
  state.turn = side;
  state.turnIndex[side] += 1;
  state.turnActionBonus[side] = 0;
  state.actionsUsed = 0;
  state.skillsUsed = 0;
  state.actedIds = [];
  state.lastAction[side] = null;
  resetTurnPerks(side);
  if (side === "player") {
    maybeResolveSignalRound();
  }
  clearPendingAction();
  clearSelection();
  const isPlayerTurn = side === "player";
  setCpuNotice(isPlayerTurn ? "あなたのターンです。キャラを押して行動を選択してください。" : "相手ターン開始。行動を選択中…");
  if (showBanner) {
    await showTurnBanner(isPlayerTurn ? "自分ターン開始" : "相手ターン開始", isPlayerTurn ? "player" : "enemy", 2000);
  }
  render();

  if (side === "enemy" && isPracticeBattle() && state.practice.cpuBehavior === "skip" && state.screen === "battle") {
    setCpuNotice("練習モード: 相手ターンをスキップします。");
    window.setTimeout(() => {
      void skipPracticeEnemyTurnIfNeeded();
    }, 320);
    return;
  }

  if (side === "enemy" && state.screen === "battle") {
    window.setTimeout(() => {
      if (!state.enemyTurnRunning) {
        void runEnemyTurn();
      }
    }, getEnemyTurnDelay());
  }
}

function executeAttack(side, actorId, targetId) {
  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0) return;
  const targetSide = opposite(side);
  const roleCombo = activateRoleCombo(side, actorId, "attack");
  const damage = getCurrentAtk(actor);
  log(`${actor.name} が通常攻撃。`);
  playSfx("attack", { cooldownMs: 60 });
  triggerCharacterAnimation(side, actorId, "attack", 460);
  applyDamage(targetSide, targetId, damage, { reason: "通常攻撃", sourceSide: side, actorId, roleCombo });
}

async function executeSkill(side, actorId, targets = {}) {
  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0) return;
  const actorBaseId = actor.baseId ?? actorId;
  const enemySide = opposite(side);
  const allyTeam = getTeam(side);
  const enemyTeam = getTeam(enemySide);
  const roleCombo = activateRoleCombo(side, actorId, "skill");
  playSfx("skill", { cooldownMs: 80 });
  const followupDelayMs = SKILL_FOLLOWUP_SFX_DELAY;
  triggerCharacterAnimation(side, actorId, "skill", 620);

  switch (actorBaseId) {
    case "ao": {
      const targetId = targets.allyId;
      const healValue = scaleHealValue(actor, 2, side);
      const buffValue = scaleSkillValue(actor, 2);
      const buffTurn = scaleSkillTurn(actor, 2);
      const recovered = heal(side, targetId, healValue, { actorId, roleCombo });
      addAtkBuff(getCharacter(targetId), buffValue, buffTurn);
      if (recovered > 0) {
        playSfx("heal", { delayMs: followupDelayMs });
      }
      log(`${actor.name} の支援で ${getCharacter(targetId).name} のATKが上昇。`);
      break;
    }
    case "akatsuki": {
      const targetId = targets.enemyId;
      const success = await rollChance(0.1, side, `${actor.name} 勝負勘`);
      if (success) {
        const damage = getCurrentAtk(actor) * 2;
        log(`${actor.name} の勝負勘が発動。ATK2倍！`);
        awardMomentum(side, 1, "確率スキル成功");
        applyDamage(enemySide, targetId, damage, { reason: "暁スキル", sourceSide: side, actorId, roleCombo });
      } else {
        log(`${actor.name} のスキルは不発。ATK0扱い。`);
      }
      break;
    }
    case "ako": {
      const dotDamage = scaleSkillValue(actor, 2);
      const dotTurns = scaleSkillTurn(actor, 2);
      const success = await rollChance(0.1, side, `${actor.name} 全体化判定`);
      if (success) {
        log(`${actor.name} の継続ダメージが全体化した。`);
        awardMomentum(side, 1, "継続ダメージ全体化");
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
      awardMomentum(side, 1, "麻痺付与");
      playSfx("paralyze", { delayMs: followupDelayMs });
      break;
    }
    case "shiho": {
      const success = await rollChance(0.1, side, `${actor.name} 回復強化`);
      const healBase = success ? 4 : 2;
      const healValue = scaleHealValue(actor, healBase, side);
      let totalRecovered = 0;
      allyTeam.field.forEach((allyId) => {
        totalRecovered += heal(side, allyId, healValue, { actorId, roleCombo });
      });
      if (totalRecovered > 0) {
        playSfx("heal", { delayMs: followupDelayMs });
      }
      log(`${actor.name} が味方全体を回復。`);
      break;
    }
    case "takumi": {
      const healValue = scaleHealValue(actor, 5, side);
      const recovered = heal(side, targets.allyId, healValue, { actorId, roleCombo });
      if (recovered > 0) {
        playSfx("heal", { delayMs: followupDelayMs });
      }
      break;
    }
    case "chiduru": {
      const enemyTarget = getCharacter(targets.enemyId);
      const allyTarget = getCharacter(targets.allyId);
      if (!enemyTarget || !allyTarget) break;
      const turn = scaleSkillTurn(actor, 2);
      const beforeEnemyAtk = getCurrentAtk(enemyTarget);
      const beforeAllyAtk = getCurrentAtk(allyTarget);
      enemyTarget.atkZeroTurns = Math.max(enemyTarget.atkZeroTurns, turn);
      const afterEnemyAtk = getCurrentAtk(enemyTarget);
      const transfer = Math.max(0, beforeEnemyAtk - afterEnemyAtk);
      if (transfer > 0) {
        addAtkBuff(allyTarget, transfer, turn);
      }
      const afterAllyAtk = getCurrentAtk(allyTarget);
      log(
        `${enemyTarget.name} ATK ${beforeEnemyAtk}→${afterEnemyAtk}、${allyTarget.name} ATK ${beforeAllyAtk}→${afterAllyAtk}（${turn}ターン）。`,
      );
      break;
    }
    case "go": {
      const allyTarget = getCharacter(targets.allyId);
      const success = await rollChance(0.1, side, `${actor.name} 増幅判定`);
      if (success) {
        const turn = scaleSkillTurn(actor, 2);
        allyTarget.atkMultiplierTurns = Math.max(allyTarget.atkMultiplierTurns, turn);
        allyTarget.skillMultiplierTurns = Math.max(allyTarget.skillMultiplierTurns, turn);
        log(`${allyTarget.name} のATKとスキル数値が2倍化。`);
        awardMomentum(side, 1, "増幅成功");
      } else {
        log(`${actor.name} の増幅は失敗した。`);
      }
      break;
    }
    case "mai": {
      const source = getCharacter(targets.sourceId);
      const targetId = targets.enemyId;
      if (!source || !targetId) break;
      const maxSpend = Math.max(0, source.hp);
      if (maxSpend <= 0) {
        log("HP消費元のHPが不足しているため、舞依スキルは発動できない。");
        break;
      }
      const requested = Number.isFinite(Number(targets.hpSpend)) ? Math.floor(Number(targets.hpSpend)) : maxSpend;
      const hpCost = Math.max(1, Math.min(requested, maxSpend));
      const baseAtk = getCurrentAtk(actor);
      source.hp = Math.max(0, source.hp - hpCost);
      log(`${source.name} のHPを${hpCost}消費（残りHP ${source.hp}）。`);
      if (source.hp <= 0) {
        knockout(side, source.id);
      }
      const damage = baseAtk + hpCost;
      applyDamage(enemySide, targetId, damage, { reason: "舞依スキル", sourceSide: side, actorId, roleCombo });
      break;
    }
    case "yuzuki": {
      const damage = scaleSkillValue(actor, 2);
      const healValue = scaleHealValue(actor, 2, side);
      applyDamage(enemySide, targets.enemyId, damage, { reason: "結月スキル", sourceSide: side, actorId, roleCombo });
      const recovered = heal(side, actorId, healValue, { actorId, roleCombo });
      if (recovered > 0) {
        playSfx("heal", { delayMs: followupDelayMs });
      }
      break;
    }
    case "ryuta": {
      const shieldValue = Math.max(1, scaleSkillValue(actor, 1) + getShieldBonus(side, { actorId, roleCombo }));
      let totalAdded = 0;
      allyTeam.field.forEach((allyId) => {
        const ally = getCharacter(allyId);
        totalAdded += addShield(ally, shieldValue, "シールド");
      });
      log(`${actor.name} が味方全体にシールド付与（最大${SHIELD_MAX}）。`);
      if (totalAdded > 0) {
        awardMomentum(side, 1, "全体シールド");
      }
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
        awardMomentum(side, 1, "毒付与");
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

  if (await tryDirectReviveByGraveClick(id, side, zone)) {
    return;
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
  if (state.skillsUsed >= getSkillLimit()) {
    log(`このターンのスキル使用上限（${getSkillLimit()}回）です。`);
    return;
  }

  const actorId = state.selectedId;
  const actor = getCharacter(actorId);
  const actorBaseId = actor?.baseId ?? actorId;

  if (["shiho", "ryuta"].includes(actorBaseId)) {
    if (!(await confirmAction(`${actor.name} のスキルを使用しますか？`))) {
      return;
    }
    log(`${actor.name} がスキルを使用。`);
    await executeSkill("player", actorId, {});
    registerAction(actorId, true);
    closeCharacterActionDialog();
    render();
    return;
  }

  if (["ao", "takumi", "go"].includes(actorBaseId)) {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorBaseId,
      step: "ally",
      data: {},
      prompt: `${actor.name} の対象となる味方フィールドを選択してください。`,
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (["akatsuki", "itsuki", "ako", "yuzuki", "nana"].includes(actorBaseId)) {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorBaseId,
      step: "enemy",
      data: {},
      prompt: `${actor.name} の対象となる敵フィールドを選択してください。`,
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (actorBaseId === "chiduru") {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorBaseId,
      step: "enemy",
      data: {},
      prompt: "ATKを封じる敵フィールドを選択してください。",
    };
    closeCharacterActionDialog();
    render();
    return;
  }

  if (actorBaseId === "mai") {
    state.pendingAction = {
      type: "skill",
      actorId,
      skillId: actorBaseId,
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
      log("蘇生対象はプレイヤー控え欄の「気絶」表示から選んでください。");
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
    await executeSkill("player", action.actorId, { allyId: id });
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
    await executeSkill("player", action.actorId, { enemyId: id });
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
    await executeSkill("player", action.actorId, { enemyId: action.data.enemyId, allyId: id });
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
      const source = getCharacter(id);
      if (!source || source.hp <= 0) {
        log("HPを削る対象のHPが不足しています。");
        return true;
      }
      const hpSpend = await chooseHpSpendValue(source.name, source.hp, action.data.hpSpend ?? 1);
      if (!Number.isFinite(hpSpend) || hpSpend < 1) {
        log("HP消費量の選択をキャンセルしました。");
        return true;
      }
      action.data.sourceId = id;
      action.data.hpSpend = hpSpend;
      action.step = "enemy";
      action.prompt = `${source.name} のHPを${hpSpend}消費。攻撃対象となる敵フィールドを選択してください。`;
      return true;
    }
    if (side !== "enemy" || zone !== "field") {
      log("攻撃対象は敵フィールドから選択してください。");
      return true;
    }
    const source = getCharacter(action.data.sourceId);
    const target = getCharacter(id);
    const hpSpend = Number.isFinite(Number(action.data.hpSpend)) ? Math.floor(Number(action.data.hpSpend)) : 1;
    if (
      !(await confirmAction(
        `${actor.name} のスキルを実行しますか？（${source?.name ?? "味方"} HP-${Math.max(1, hpSpend)} → ${target?.name ?? "敵"}）`,
      ))
    ) {
      return true;
    }
    await executeSkill("player", action.actorId, { sourceId: action.data.sourceId, enemyId: id, hpSpend });
    registerAction(action.actorId, true);
    clearPendingAction();
    checkWinCondition();
    return true;
  }

  return false;
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
    log(`${character.name} を控えに戻した（2ターン出撃不可）。`);
  } else if (state.selectedZone === "bench") {
    if (state.actionsUsed >= getActionLimit("player") || hasActed(state.selectedId)) {
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
    prompt: "蘇生するキャラをプレイヤー控え欄の「気絶」表示から選択してください。",
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
  if (state.skillsUsed >= getSkillLimit()) return false;

  const actor = getCharacter(actorId);
  if (!actor || actor.hp <= 0 || actor.paralyzeTurns > 0) return false;
  const actorBaseId = actor.baseId ?? actorId;

  const allyField = [...state.enemy.field];
  const enemyField = [...state.player.field];

  switch (actorBaseId) {
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
      return allyField.some((memberId) => getCharacter(memberId).hp > 0) && enemyField.length > 0;
    default:
      return false;
  }
}

function pickEnemySkillTargets(actorId) {
  const actor = getCharacter(actorId);
  if (!actor) return null;
  const actorBaseId = actor.baseId ?? actorId;
  const allyField = [...state.enemy.field];
  const enemyField = [...state.player.field];

  switch (actorBaseId) {
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
      const sources = allyField.filter((memberId) => getCharacter(memberId).hp > 0);
      if (!sources.length || !enemyField.length) return null;
      const sourceId = randomOf(sources);
      const source = getCharacter(sourceId);
      const maxSpend = Math.max(1, source?.hp ?? 1);
      const hpSpend = Math.floor(Math.random() * maxSpend) + 1;
      return { sourceId, enemyId: randomOf(enemyField), hpSpend };
    }
    default:
      return null;
  }
}

function pickEnemyTacticalTarget(type) {
  const field = [...state.enemy.field].filter((id) => {
    const character = getCharacter(id);
    return Boolean(character && character.hp > 0);
  });
  if (!field.length) return null;

  if (type === "recover") {
    return field
      .slice()
      .sort((a, b) => getCharacter(a).hp / getCharacter(a).maxHp - getCharacter(b).hp / getCharacter(b).maxHp)[0];
  }
  if (type === "cover") {
    return field
      .filter((id) => (getCharacter(id)?.shieldHits ?? 0) < SHIELD_MAX)
      .slice()
      .sort((a, b) => (getCharacter(a).shieldHits ?? 0) - (getCharacter(b).shieldHits ?? 0))[0];
  }
  if (type === "focus") {
    return field.slice().sort((a, b) => getCurrentAtk(getCharacter(b)) - getCurrentAtk(getCharacter(a)))[0];
  }
  return randomOf(field);
}

async function maybeEnemyUseTacticalCall() {
  if (state.turn !== "enemy" || state.gameOver || state.screen !== "battle") return false;
  const momentum = state.momentum.enemy ?? 0;
  if (momentum < 2) return false;

  const damagedAlly = state.enemy.field.some((id) => {
    const character = getCharacter(id);
    return character && character.hp > 0 && character.hp / character.maxHp <= 0.45;
  });
  const unshieldedAlly = state.enemy.field.some((id) => {
    const character = getCharacter(id);
    return character && character.hp > 0 && (character.shieldHits ?? 0) < SHIELD_MAX;
  });

  if (momentum >= TACTICAL_CALLS.recover.cost && damagedAlly) {
    return useTacticalCall("recover", "enemy");
  }
  if (momentum >= TACTICAL_CALLS.cover.cost && unshieldedAlly && state.player.field.length >= 2) {
    return useTacticalCall("cover", "enemy");
  }
  if (momentum >= TACTICAL_CALLS.tempo.cost && state.enemy.field.length >= 3 && state.actionsUsed <= 1) {
    return useTacticalCall("tempo", "enemy");
  }
  if (momentum >= TACTICAL_CALLS.focus.cost && Math.random() < 0.42) {
    return useTacticalCall("focus", "enemy");
  }
  return false;
}

function shouldEnemyUseSkill(actorId) {
  if (!enemyCanUseSkill(actorId)) return false;
  const actor = getCharacter(actorId);
  const actorBaseId = actor?.baseId ?? actorId;
  const allyField = [...state.enemy.field];
  const enemyField = [...state.player.field];
  const lowestAllyRate = allyField.reduce((min, id) => {
    const character = getCharacter(id);
    if (!character || character.maxHp <= 0) return min;
    return Math.min(min, character.hp / character.maxHp);
  }, 1);
  const hasUnshieldedAlly = allyField.some((id) => (getCharacter(id)?.shieldHits ?? 0) < SHIELD_MAX);

  if (actorBaseId === "shiho" && lowestAllyRate <= 0.82) return true;
  if (actorBaseId === "takumi" && lowestAllyRate <= 0.66) return true;
  if (actorBaseId === "ao" && lowestAllyRate <= 0.78) return true;
  if (actorBaseId === "ryuta" && hasUnshieldedAlly && enemyField.length >= 2) return true;
  if (["itsuki", "chiduru", "nana", "ako"].includes(actorBaseId)) return Math.random() < 0.72;
  if (["akatsuki", "mai", "yuzuki", "go"].includes(actorBaseId)) return Math.random() < 0.58;
  return Math.random() < 0.35;
}

function getEnemyDeployableBenchCandidates() {
  return state.enemy.bench.filter((id) => {
    const character = getCharacter(id);
    return Boolean(character) && character.hp > 0 && getBenchLockRemain(character, "enemy") <= 0;
  });
}

function deployEnemyBenchMember(reasonText = "") {
  const deployableIds = getEnemyDeployableBenchCandidates();
  const pickedId = deployableIds[0];
  if (!pickedId) return false;
  const team = state.enemy;
  const pickedCharacter = getCharacter(pickedId);
  if (!pickedCharacter) return false;
  team.bench = removeFromArray(team.bench, pickedId);
  team.field.push(pickedId);
  log(`相手補充: ${pickedCharacter.name} が控えから出撃。`);
  setCpuNotice(`相手: ${pickedCharacter.name} を出撃。${reasonText}`.trim());
  return true;
}

function fillEnemyOpenFieldSlots(reasonText = "") {
  const team = state.enemy;
  let deployed = 0;
  while (team.field.length < state.fieldLimit.enemy) {
    if (!deployEnemyBenchMember(reasonText)) break;
    deployed += 1;
  }
  if (deployed > 0) {
    render();
  }
  return deployed;
}

async function maybeEnemyUseRevive() {
  if (getSideChannel("enemy") !== "revive") return;
  if (state.reviveUsed.enemy) return;
  if (!state.enemy.grave.length) return;
  const success = await rollChance(0.45, "enemy", "相手 死者蘇生判定");
  if (!success) return;
  const targetId = randomOf(state.enemy.grave);
  if (targetId) useRevive("enemy", targetId);
}

async function runEnemyTurn() {
  if (state.enemyTurnRunning) return;
  if (state.gameOver || state.turn !== "enemy" || state.screen !== "battle" || state.turnTransitioning) return;

  state.enemyTurnRunning = true;
  try {
    setCpuNotice("相手が行動準備中…");
    await sleep(getEnemyTurnDelay());
    if (await skipPracticeEnemyTurnIfNeeded()) return;

    await maybeEnemyUseRevive();
    if (await skipPracticeEnemyTurnIfNeeded()) return;
    fillEnemyOpenFieldSlots("気絶した枠を補充。");
    await maybeEnemyUseTacticalCall();
    if (await skipPracticeEnemyTurnIfNeeded()) return;
    await sleep(getEnemyActionDelay());
    if (await skipPracticeEnemyTurnIfNeeded()) return;

    if (!state.enemy.field.length) {
      setCpuNotice("相手は出場可能なキャラがいないためターン終了。");
      await transitionToNextTurn("enemy", "player");
      return;
    }

    const order = [...state.enemy.field];
    for (const actorId of order) {
      if (await skipPracticeEnemyTurnIfNeeded()) return;
      if (state.gameOver || state.actionsUsed >= getActionLimit("enemy") || state.turn !== "enemy") break;
      if (!state.enemy.field.includes(actorId)) continue;

      const actor = getCharacter(actorId);
      if (!actor || actor.hp <= 0) continue;

      if (actor.paralyzeTurns > 0) {
        log(`${actor.name} は痺れで行動不能。`);
        setCpuNotice(`相手: ${actor.name} は痺れで行動不能。`);
        await sleep(getEnemyActionDelay());
        continue;
      }

      const targetId = state.player.field.find((id) => {
        const target = getCharacter(id);
        return Boolean(target && target.hp > 0);
      });
      if (!targetId) break;

      if (shouldEnemyUseSkill(actorId)) {
        const skillTargets = pickEnemySkillTargets(actorId);
        if (skillTargets) {
          setCpuNotice(`相手行動: ${actor.name} がスキルを選択。`);
          log(`相手: ${actor.name} がスキルを使用。`);
          await executeSkill("enemy", actorId, skillTargets);
          registerAction(actorId, true);
        } else {
          setCpuNotice(`相手行動: ${actor.name} が通常攻撃。`);
          executeAttack("enemy", actorId, targetId);
          registerAction(actorId, false);
        }
      } else {
        setCpuNotice(`相手行動: ${actor.name} が通常攻撃。`);
        executeAttack("enemy", actorId, targetId);
        registerAction(actorId, false);
      }

      await maybeEnemyUseTacticalCall();
      if (await skipPracticeEnemyTurnIfNeeded()) return;
      fillEnemyOpenFieldSlots("気絶した枠を補充。");
      render();
      await sleep(getEnemyActionDelay());
      if (await skipPracticeEnemyTurnIfNeeded()) return;
      if (checkWinCondition()) break;
    }

    if (state.gameOver) {
      render();
      return;
    }
    setCpuNotice("相手ターン終了。");
    await transitionToNextTurn("enemy", "player");
  } finally {
    state.enemyTurnRunning = false;
  }
}

async function endPlayerTurn() {
  if (state.gameOver || state.turn !== "player" || state.screen !== "battle") return;
  if (state.pendingAction) {
    log("対象選択をキャンセルしてからターン終了してください。");
    return;
  }
  if (!(await confirmAction("ターンを終了しますか？"))) return;
  if (isPracticeBattle() && state.practice.cpuBehavior === "skip") {
    setCpuNotice("練習モード: 相手ターンをスキップして自分ターンへ戻ります…");
    await transitionToPracticePlayerTurnAfterSkip();
    return;
  }
  setCpuNotice("ターン終了。相手ターンへ移行します…");
  await transitionToNextTurn("player", "enemy");
}

function openSettingsDialog() {
  closeTopMenu();
  syncSettingsUI();
  els.settingsDialog.showModal();
}

function closeSettingsDialog() {
  state.settings.confirmActions = Boolean(
    els.confirmActionsToggle?.checked ?? els.menuConfirmActionsToggle?.checked ?? state.settings.confirmActions,
  );
  state.settings.fastEnemy = Boolean(els.fastEnemyToggle?.checked ?? els.menuFastEnemyToggle?.checked ?? state.settings.fastEnemy);
  state.settings.bgmVolume = clampBgmVolume(
    els.bgmVolumeSlider?.value ?? els.menuBgmVolumeSlider?.value ?? state.settings.bgmVolume,
  );
  state.settings.sfxVolume = clampSfxVolume(
    els.sfxVolumeSlider?.value ?? els.menuSfxVolumeSlider?.value ?? state.settings.sfxVolume,
  );
  applyBgmAudioSettings();
  applySfxAudioSettings();
  syncSettingsUI();
  els.settingsDialog?.close();
}

function openChannelInfoDialog() {
  renderChannelReferencePanels();
  els.channelInfoDialog?.showModal();
}

function closeChannelInfoDialog() {
  els.channelInfoDialog?.close();
}

function loadPreparationFromTeam(team) {
  const normalized = cloneTeamConfig(team, INITIAL_TEAMS.player);
  state.preparation.field = [...normalized.field];
  state.preparation.bench = [...normalized.bench];
  state.prepAutoChannelPrompted = false;
  invalidateChannelSelection();
  renderPreparation();
}

async function launchConfiguredBattle(setup, options = {}) {
  const skipConfirm = Boolean(options.skipConfirm);
  const confirmMessage = options.confirmMessage ?? "対戦を開始しますか？";
  const startLog = options.startLog ?? "対戦を開始します。";

  if (!skipConfirm && !(await confirmAction(confirmMessage))) {
    return false;
  }

  els.logArea.innerHTML = "";
  closePrepRoleDialog();
  setMatchSetup(setup);
  resetMatchState();
  showBattleScreen();
  log(startLog);
  state.matchSetup.introLogs.forEach((line) => {
    log(line);
  });
  void startTurn("player");
  return true;
}

async function startStoryTutorial(skipConfirm = false) {
  await launchConfiguredBattle(
    {
      source: "story-tutorial",
      storyChapterId: STORY_TUTORIAL.id,
      storyLabel: STORY_TUTORIAL.title,
      playerTeam: STORY_TUTORIAL.playerTeam,
      enemyTeam: STORY_TUTORIAL.enemyTeam,
      channels: STORY_TUTORIAL.channels,
      introLogs: STORY_TUTORIAL.introLogs,
    },
    {
      skipConfirm,
      confirmMessage: "チュートリアルを開始しますか？",
      startLog: `ストーリーモード開始: ${STORY_TUTORIAL.title}`,
    },
  );
}

async function startStoryMainBattle(skipConfirm = false) {
  const chapter = getStoryChapterById(state.storySelectedChapterId);
  if (!chapter) {
    log("ストーリー章データが見つかりません。");
    showTopScreen();
    showTopStep("story");
    renderStoryStep();
    return;
  }

  if (!isPreparationReady()) {
    log("ストーリー戦開始前に6人編成（戦闘1〜3人、合計6人）を完了してください。");
    showTopScreen();
    setPreparationStepContext("story-main");
    showTopStep("team");
    renderPreparation();
    return;
  }

  const playerTeam = getPreparedPlayerTeam();
  await launchConfiguredBattle(
    {
      source: "story-main",
      storyChapterId: chapter.id,
      storyLabel: chapter.title,
      playerTeam,
      enemyTeam: chapter.enemyTeam,
      channels: chapter.channels,
      introLogs: chapter.introLogs,
    },
    {
      skipConfirm,
      confirmMessage: `「${chapter.title}」のストーリー戦を開始しますか？`,
      startLog: `ストーリーバトル開始: ${chapter.title}`,
    },
  );
}

async function startBattle(skipConfirm = false) {
  if (!isPreparationReady()) {
    log("編成を完了してから対戦を開始してください。");
    showTopScreen();
    setPreparationStepContext("cpu");
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
  const playerTeam = getPreparedPlayerTeam();
  await launchConfiguredBattle(
    {
      source: "cpu",
      playerTeam,
      enemyTeam: INITIAL_TEAMS.enemy,
      channels: {
        player: state.channels.player,
        enemy: state.channels.enemy,
      },
      introLogs: [],
    },
    {
      skipConfirm,
      confirmMessage: "対戦を開始しますか？",
      startLog: "対戦を開始します。",
    },
  );
}

async function startPracticeBattle(skipConfirm = false) {
  if (!isPreparationReady()) {
    log("練習開始前に6人編成（戦闘1〜3人、合計6人）を完了してください。");
    showTopScreen();
    setPreparationStepContext("practice");
    showTopStep("team");
    renderPreparation();
    return;
  }

  const enemyPreset = getPracticeEnemyTeamPreset();
  const playerChannel = getChannelById(state.practice.playerChannelId);
  const enemyChannel = getChannelById(state.practice.enemyChannelId);
  if (!enemyPreset || !playerChannel || !enemyChannel) {
    log("練習モードの相手チームとチャンネルを選択してください。");
    showTopScreen();
    showTopStep("practice");
    renderPracticeSetup();
    return;
  }

  const playerTeam = getPreparedPlayerTeam();
  await launchConfiguredBattle(
    {
      source: "practice",
      playerTeam,
      enemyTeam: getPracticeEnemyTeam(),
      channels: {
        player: playerChannel.id,
        enemy: enemyChannel.id,
      },
      introLogs: [
        `練習相手: ${enemyPreset.name}`,
        `練習CPU動作: ${state.practice.cpuBehavior === "skip" ? "相手ターンスキップ" : "通常"}`,
      ],
    },
    {
      skipConfirm,
      confirmMessage: "練習試合を開始しますか？",
      startLog: "練習モードを開始します。",
    },
  );
}

async function resetGame() {
  closeTopMenu();
  if (!(await confirmAction("対戦をリセットして最初からやり直しますか？"))) return;
  els.logArea.innerHTML = "";
  resetMatchState();
  showBattleScreen();
  log("対戦をリセットしました。");
  void startTurn("player");
}

async function backToTop() {
  closeTopMenu();
  const hasPending = Boolean(state.pendingAction);
  const message = hasPending
    ? "対象選択を中断してトップ画面に戻りますか？"
    : "トップ画面に戻りますか？対戦は一時停止します。";
  if (!(await confirmAction(message))) return;
  clearPendingAction();
  clearSelection();
  state.selectedMode = null;
  state.storyView = "menu";
  setPreparationStepContext("cpu");
  showTopScreen();
  showTopStep("title");
  setupChannelSelectionUI();
  updateChannelStepSummary();
  closePrepRoleDialog();
  renderStoryStep();
  renderPreparation();
}

function setupEvents() {
  els.beginPreparationBtn.addEventListener("click", () => {
    showTopStep("mode");
  });
  if (els.topScreenSettingsBtn) {
    els.topScreenSettingsBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      openSettingsDialog();
    });
  }

  if (els.backToTitleFromModeBtn) {
    els.backToTitleFromModeBtn.addEventListener("click", () => {
      showTopStep("title");
    });
  }

  if (els.chooseCpuModeBtn) {
    els.chooseCpuModeBtn.addEventListener("click", () => {
      state.selectedMode = "cpu";
      state.storyView = "menu";
      setPreparationStepContext("cpu");
      showTopStep("team");
      renderPreparation();
    });
  }

  if (els.choosePracticeModeBtn) {
    els.choosePracticeModeBtn.addEventListener("click", () => {
      state.selectedMode = "practice";
      state.storyView = "menu";
      setPreparationStepContext("practice");
      showTopStep("team");
      renderPreparation();
    });
  }

  if (els.openGalleryModeBtn) {
    els.openGalleryModeBtn.addEventListener("click", () => {
      renderGalleryStep();
      showTopStep("gallery");
    });
  }

  if (els.openModeRulesBtn) {
    els.openModeRulesBtn.addEventListener("click", () => {
      renderModeRulesStep();
      showTopStep("rules");
    });
  }

  if (els.chooseStoryModeBtn) {
    els.chooseStoryModeBtn.addEventListener("click", () => {
      state.selectedMode = "story";
      state.storyView = "menu";
      renderStoryStep();
      showTopStep("story");
    });
  }

  if (els.storyTutorialEntryBtn) {
    els.storyTutorialEntryBtn.addEventListener("click", () => {
      state.storyView = "tutorial";
      renderStoryStep();
    });
  }

  if (els.storyMainEntryBtn) {
    els.storyMainEntryBtn.addEventListener("click", () => {
      state.storyView = "main";
      if (!getStoryChapterById(state.storySelectedChapterId)) {
        state.storySelectedChapterId = STORY_CHAPTERS[0]?.id ?? null;
      }
      renderStoryStep();
    });
  }

  if (els.storyChapterList) {
    els.storyChapterList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("[data-story-chapter]");
      if (!(button instanceof HTMLElement)) return;
      const chapterId = button.dataset.storyChapter;
      if (!chapterId || !getStoryChapterById(chapterId)) return;
      state.storySelectedChapterId = chapterId;
      renderStoryStep();
    });
  }

  if (els.storyStartTutorialBtn) {
    els.storyStartTutorialBtn.addEventListener("click", () => {
      void startStoryTutorial();
    });
  }

  if (els.storySelectChapterBtn) {
    els.storySelectChapterBtn.addEventListener("click", () => {
      const chapter = getStoryChapterById(state.storySelectedChapterId);
      if (!chapter) {
        log("章を選択してください。");
        return;
      }
      state.selectedMode = "story";
      state.storyView = "main";
      setPreparationStepContext("story-main");
      loadPreparationFromTeam(chapter.recommendedTeam ?? INITIAL_TEAMS.player);
      showTopStep("team");
      renderPreparation();
    });
  }

  if (els.backToModeFromStoryBtn) {
    els.backToModeFromStoryBtn.addEventListener("click", () => {
      showTopStep("mode");
    });
  }

  if (els.backToTeamFromPracticeBtn) {
    els.backToTeamFromPracticeBtn.addEventListener("click", () => {
      state.selectedMode = "practice";
      setPreparationStepContext("practice");
      showTopStep("team");
      renderPreparation();
    });
  }

  if (els.backToModeFromPracticeBtn) {
    els.backToModeFromPracticeBtn.addEventListener("click", () => {
      showTopStep("mode");
    });
  }

  if (els.backToModeFromGalleryBtn) {
    els.backToModeFromGalleryBtn.addEventListener("click", () => {
      showTopStep("mode");
    });
  }

  if (els.backToModeFromRulesBtn) {
    els.backToModeFromRulesBtn.addEventListener("click", () => {
      showTopStep("mode");
    });
  }

  if (els.openSettingsFromStoryStepBtn) {
    els.openSettingsFromStoryStepBtn.addEventListener("click", openSettingsDialog);
  }

  if (els.backFromTeamStepBtn) {
    els.backFromTeamStepBtn.addEventListener("click", () => {
      if (state.prepContext === "story-main") {
        showTopStep("story");
        renderStoryStep();
        return;
      }
      showTopStep("mode");
    });
  }

  els.toChannelStepBtn.addEventListener("click", () => {
    if (!isPreparationReady()) {
      log("まず6人編成（戦闘1〜3人、合計6人）を完了してください。");
      renderPreparation();
      return;
    }

    if (state.prepContext === "story-main") {
      void startStoryMainBattle();
      return;
    }

    if (state.prepContext === "practice") {
      renderPracticeSetup();
      showTopStep("practice");
      return;
    }

    setPreparationStepContext("cpu");
    setupChannelSelectionUI();
    updateChannelStepSummary();
    showTopStep("channel");
  });

  els.backToTeamStepBtn.addEventListener("click", () => {
    setPreparationStepContext("cpu");
    state.selectedMode = "cpu";
    showTopStep("team");
    renderPreparation();
  });

  els.channelChoiceList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const pickButton = target.closest("[data-channel-pick]");
    if (!(pickButton instanceof HTMLElement)) return;
    const channelId = pickButton.dataset.channelPick;
    if (!channelId) return;

    void (async () => {
      if (!isPreparationReady()) {
        setPreparationStepContext("cpu");
        showTopStep("team");
        log("編成を完了してからチャンネルを選択してください。");
        return;
      }
      const channel = getChannelById(channelId);
      if (!channel) return;
      if (!(await confirmAction(`プレイヤーチャンネルを「${channel.name}」にしますか？`))) return;
      confirmChannelsForBattle(channelId);
      renderBattleChannels();
      log(`チャンネル確定: プレイヤー「${channel.name}」 / 相手「${getChannelById(state.channels.enemy)?.name ?? "未選択"}」`);
      await startBattle(true);
    })();
  });

  const bindPracticePicker = (container, selector, applyValue) => {
    if (!container) return;
    container.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest(selector);
      if (!(button instanceof HTMLElement)) return;
      applyValue(button);
      renderPracticeSetup();
    });
  };

  bindPracticePicker(els.practiceEnemyTeamList, "[data-practice-enemy-team]", (button) => {
    const presetId = button.dataset.practiceEnemyTeam;
    if (presetId && PRACTICE_ENEMY_TEAM_PRESETS.some((preset) => preset.id === presetId)) {
      state.practice.enemyTeamPresetId = presetId;
    }
  });
  bindPracticePicker(els.practicePlayerChannelList, "[data-practice-player-channel]", (button) => {
    const channelId = button.dataset.practicePlayerChannel;
    if (getChannelById(channelId)) {
      state.practice.playerChannelId = channelId;
    }
  });
  bindPracticePicker(els.practiceEnemyChannelList, "[data-practice-enemy-channel]", (button) => {
    const channelId = button.dataset.practiceEnemyChannel;
    if (getChannelById(channelId)) {
      state.practice.enemyChannelId = channelId;
    }
  });

  if (els.practiceStartBtn) {
    els.practiceStartBtn.addEventListener("click", () => {
      void startPracticeBattle();
    });
  }

  const bindPracticeCpuControl = (container, shouldRenderBattle = false) => {
    if (!container) return;
    container.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("[data-practice-cpu-mode]");
      if (!(button instanceof HTMLElement)) return;
      const mode = button.dataset.practiceCpuMode;
      setPracticeCpuBehavior(mode, state.screen === "battle");
      renderPracticeSetup();
      if (shouldRenderBattle) {
        render();
      }
    });
  };
  bindPracticeCpuControl(els.practiceSetupCpuControl, false);
  bindPracticeCpuControl(els.practiceCpuControl, true);

  if (els.openTopMenuBtn) {
    els.openTopMenuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleTopMenu();
    });
  }
  if (els.topMenuPanel) {
    els.topMenuPanel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
  document.addEventListener("click", () => {
    closeTopMenu();
  });
  document.addEventListener("pointerdown", resumeBgmOnInteraction);
  document.addEventListener("keydown", resumeBgmOnInteraction);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTopMenu();
    }
  });

  if (els.openSettingsFromTopBtn) {
    els.openSettingsFromTopBtn.addEventListener("click", openSettingsDialog);
  }
  if (els.openSettingsFromChannelStepBtn) {
    els.openSettingsFromChannelStepBtn.addEventListener("click", openSettingsDialog);
  }
  if (els.openChannelInfoFromTopBtn) {
    els.openChannelInfoFromTopBtn.addEventListener("click", openChannelInfoDialog);
  }
  if (els.openChannelInfoBtn) {
    els.openChannelInfoBtn.addEventListener("click", openChannelInfoDialog);
  }
  if (els.closeChannelInfoBtn) {
    els.closeChannelInfoBtn.addEventListener("click", closeChannelInfoDialog);
  }
  if (els.closeSettingsBtn) {
    els.closeSettingsBtn.addEventListener("click", closeSettingsDialog);
  }

  const bindConfirmActionsToggle = (toggleEl) => {
    if (!toggleEl) return;
    toggleEl.addEventListener("change", () => {
      state.settings.confirmActions = Boolean(toggleEl.checked);
      syncSettingsUI();
    });
  };
  bindConfirmActionsToggle(els.confirmActionsToggle);
  bindConfirmActionsToggle(els.menuConfirmActionsToggle);

  const bindFastEnemyToggle = (toggleEl) => {
    if (!toggleEl) return;
    toggleEl.addEventListener("change", () => {
      state.settings.fastEnemy = Boolean(toggleEl.checked);
      syncSettingsUI();
    });
  };
  bindFastEnemyToggle(els.fastEnemyToggle);
  bindFastEnemyToggle(els.menuFastEnemyToggle);

  const bindBgmSlider = (sliderEl, valueEl) => {
    if (!sliderEl) return;
    sliderEl.addEventListener("input", () => {
      state.settings.bgmVolume = clampBgmVolume(sliderEl.value);
      if (valueEl) {
        valueEl.textContent = `${state.settings.bgmVolume}%`;
      }
      syncSettingsUI();
      void syncBgmForView();
    });
  };
  bindBgmSlider(els.bgmVolumeSlider, els.bgmVolumeValue);
  bindBgmSlider(els.menuBgmVolumeSlider, els.menuBgmVolumeValue);

  const bindBgmMuteButton = (muteBtn) => {
    if (!muteBtn) return;
    muteBtn.addEventListener("click", () => {
      state.settings.bgmMuted = !state.settings.bgmMuted;
      syncSettingsUI();
      void syncBgmForView();
    });
  };
  bindBgmMuteButton(els.bgmMuteToggleBtn);
  bindBgmMuteButton(els.menuBgmMuteToggleBtn);

  const bindSfxSlider = (sliderEl, valueEl) => {
    if (!sliderEl) return;
    sliderEl.addEventListener("input", () => {
      state.settings.sfxVolume = clampSfxVolume(sliderEl.value);
      if (valueEl) {
        valueEl.textContent = `${state.settings.sfxVolume}%`;
      }
      syncSettingsUI();
    });
  };
  bindSfxSlider(els.sfxVolumeSlider, els.sfxVolumeValue);
  bindSfxSlider(els.menuSfxVolumeSlider, els.menuSfxVolumeValue);

  const bindSfxMuteButton = (muteBtn) => {
    if (!muteBtn) return;
    muteBtn.addEventListener("click", () => {
      state.settings.sfxMuted = !state.settings.sfxMuted;
      syncSettingsUI();
    });
  };
  bindSfxMuteButton(els.sfxMuteToggleBtn);
  bindSfxMuteButton(els.menuSfxMuteToggleBtn);

  if (els.chanceSpinBtn) {
    els.chanceSpinBtn.addEventListener("click", () => {
      triggerChanceSpin();
    });
  }

  els.resetGameBtn.addEventListener("click", () => {
    void resetGame();
  });
  els.backToTopBtn.addEventListener("click", () => {
    void backToTop();
  });

  if (els.teamPresetSlotSelect) {
    els.teamPresetSlotSelect.addEventListener("change", () => {
      state.selectedPresetSlot = getPresetSlotIndex(els.teamPresetSlotSelect?.value);
      syncPresetEditor(false);
      renderTeamPresetList();
    });
  }
  if (els.teamPresetNameInput) {
    els.teamPresetNameInput.addEventListener("input", () => {
      if (!els.teamPresetNameInput) return;
      if (els.teamPresetNameInput.value.length > TEAM_PRESET_NAME_MAX) {
        els.teamPresetNameInput.value = els.teamPresetNameInput.value.slice(0, TEAM_PRESET_NAME_MAX);
      }
    });
  }
  if (els.teamPresetList) {
    els.teamPresetList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("[data-preset-slot]");
      if (!(button instanceof HTMLElement)) return;
      const slot = button.dataset.presetSlot;
      state.selectedPresetSlot = getPresetSlotIndex(slot);
      syncPresetEditor(false);
      renderTeamPresetList();
    });
  }
  if (els.recommendedTeamList) {
    els.recommendedTeamList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("[data-recommended-team]");
      if (!(button instanceof HTMLElement)) return;
      const presetId = button.dataset.recommendedTeam;
      if (!presetId) return;
      applyRecommendedTeamPreset(presetId);
    });
  }
  if (els.saveTeamPresetBtn) {
    els.saveTeamPresetBtn.addEventListener("click", saveCurrentTeamPreset);
  }
  if (els.loadTeamPresetBtn) {
    els.loadTeamPresetBtn.addEventListener("click", loadCurrentTeamPreset);
  }
  if (els.deleteTeamPresetBtn) {
    els.deleteTeamPresetBtn.addEventListener("click", () => {
      void deleteCurrentTeamPreset();
    });
  }

  els.prepRoster.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest("[data-char-id]");
    if (!(card instanceof HTMLElement)) return;
    const id = card.dataset.charId;
    if (!id) return;
    if (!Object.prototype.hasOwnProperty.call(BASE_CHARACTERS, id)) return;
    openPrepRoleDialog(id);
  });
  els.prepToFieldBtn.addEventListener("click", () => {
    if (!state.prepRoleTargetId) return;
    setPreparationRole(state.prepRoleTargetId, "field");
    closePrepRoleDialog();
  });
  els.prepToBenchBtn.addEventListener("click", () => {
    if (!state.prepRoleTargetId) return;
    setPreparationRole(state.prepRoleTargetId, "bench");
    closePrepRoleDialog();
  });
  els.prepToNoneBtn.addEventListener("click", () => {
    if (!state.prepRoleTargetId) return;
    setPreparationRole(state.prepRoleTargetId, "none");
    closePrepRoleDialog();
  });
  els.closePrepRoleBtn.addEventListener("click", closePrepRoleDialog);

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
  if (els.focusCallBtn) {
    els.focusCallBtn.addEventListener("click", () => {
      void useTacticalCall("focus", "player");
    });
  }
  if (els.recoverCallBtn) {
    els.recoverCallBtn.addEventListener("click", () => {
      void useTacticalCall("recover", "player");
    });
  }
  if (els.coverCallBtn) {
    els.coverCallBtn.addEventListener("click", () => {
      void useTacticalCall("cover", "player");
    });
  }
  if (els.tempoCallBtn) {
    els.tempoCallBtn.addEventListener("click", () => {
      void useTacticalCall("tempo", "player");
    });
  }
  if (els.focusCallDialogBtn) {
    els.focusCallDialogBtn.addEventListener("click", () => {
      void useTacticalCall("focus", "player");
    });
  }
  if (els.recoverCallDialogBtn) {
    els.recoverCallDialogBtn.addEventListener("click", () => {
      void useTacticalCall("recover", "player");
    });
  }
  if (els.coverCallDialogBtn) {
    els.coverCallDialogBtn.addEventListener("click", () => {
      void useTacticalCall("cover", "player");
    });
  }
  if (els.tempoCallDialogBtn) {
    els.tempoCallDialogBtn.addEventListener("click", () => {
      void useTacticalCall("tempo", "player");
    });
  }

  els.clearLogBtn.addEventListener("click", () => {
    els.logArea.innerHTML = "";
  });

  els.openRulesBtn.addEventListener("click", () => {
    closeTopMenu();
    els.rulesDialog.showModal();
  });
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
  if (els.hpSpendRange) {
    els.hpSpendRange.addEventListener("input", () => {
      syncHpSpendInputValue(els.hpSpendRange.value);
    });
  }
  if (els.hpSpendNumber) {
    els.hpSpendNumber.addEventListener("input", () => {
      syncHpSpendInputValue(els.hpSpendNumber.value);
    });
  }
  if (els.hpSpendOkBtn) {
    els.hpSpendOkBtn.addEventListener("click", () => {
      const value = syncHpSpendInputValue(els.hpSpendNumber?.value ?? els.hpSpendRange?.value ?? 1);
      resolveHpSpendDialog(value);
    });
  }
  if (els.hpSpendCancelBtn) {
    els.hpSpendCancelBtn.addEventListener("click", () => resolveHpSpendDialog(null));
  }
  if (els.hpSpendDialog) {
    els.hpSpendDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      resolveHpSpendDialog(null);
    });
  }
  els.closeCharacterActionBtn.addEventListener("click", closeCharacterActionDialog);
  els.characterActionDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeCharacterActionDialog();
  });
  els.prepRoleDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closePrepRoleDialog();
  });
  els.channelInfoDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeChannelInfoDialog();
  });
}

function init() {
  state.teamPresets = loadTeamPresetsFromStorage();
  state.selectedPresetSlot = 0;
  if (els.beginPreparationBtn) {
    els.beginPreparationBtn.textContent = "物語を始める";
  }
  setPreparationStepContext("cpu");
  resetMatchState();
  setupEvents();
  preloadSfx();
  syncSettingsUI();
  setupChannelSelectionUI();
  updateChannelStepSummary();
  renderStoryStep();
  showTopScreen();
  showTopStep("title");
  renderPreparation();
  log("タイトル画面からモードを選んで開始してください。");
  render();
}

init();

