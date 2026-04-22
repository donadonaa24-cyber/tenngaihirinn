const CHARACTERS = [
  { id: "ao", name: "碧", role: "サポーター", gender: "男", atk: 3, hp: 27, skill: "味方1体を2回復＆ATK+2（2ターン）", image: "碧.png" },
  { id: "akatsuki", name: "暁", role: "アタッカー", gender: "男", atk: 7, hp: 22, skill: "1割でATK×2攻撃。失敗でATK0扱い", image: "暁.png" },
  { id: "ako", name: "亜湖", role: "アタッカー", gender: "女", atk: 5, hp: 22, skill: "継続ダメージ2を2ターン付与。1割で全体化", image: "亜湖.png" },
  { id: "itsuki", name: "樹", role: "デバッファー", gender: "男", atk: 0, hp: 22, skill: "敵1体を2ターン麻痺", image: "樹.png" },
  { id: "shiho", name: "志保", role: "ヒーラー", gender: "女", atk: 2, hp: 27, skill: "味方全体を2回復、1割で4回復", image: "志保.png" },
  { id: "takumi", name: "拓海", role: "ヒーラー", gender: "男", atk: 3, hp: 27, skill: "味方1体を5回復", image: "拓海.png" },
  { id: "chiduru", name: "千鶴", role: "バッファー", gender: "女", atk: 3, hp: 22, skill: "敵1体ATKを0化し、その値を味方1体へ2ターン上乗せ", image: "千鶴.png" },
  { id: "go", name: "剛", role: "サポーター", gender: "男", atk: 4, hp: 22, skill: "1割で味方1体のATK/スキル数値を2倍（2ターン）", image: "剛.png" },
  { id: "mai", name: "舞依", role: "アタッカー", gender: "女", atk: 5, hp: 22, skill: "味方HPを削った分をATK加算して攻撃", image: "舞依.png" },
  { id: "yuzuki", name: "結月", role: "サブアタ", gender: "女", atk: 3, hp: 22, skill: "敵に2ダメージ＆自身2回復", image: "結月.png" },
  { id: "ryuta", name: "龍太", role: "シールダー", gender: "男", atk: 3, hp: 22, skill: "味方全体に1回攻撃無効シールド", image: "龍太.png" },
  { id: "nana", name: "栞那", role: "デバッファー", gender: "女", atk: 4, hp: 22, skill: "毒付与（重ねがけ不可）", image: "栞那.png" },
];

const HERO_IMAGE_FILES = ["RIOT.png", "CREST.png", "ASTER.png"];
const HERO_LOGO_FILES = ["RIOT.png", "CREST.png", "ASTER.png"];
const ILLUSTRATION_DIR = "assets/イラスト";

function toAssetPath(fileName) {
  if (!fileName) return "";
  const normalized = fileName.replace(/\\/g, "/");
  if (/^(?:https?:|data:|blob:)/.test(normalized)) return normalized;
  if (normalized.startsWith("/") || normalized.startsWith("assets/")) return encodeURI(normalized);
  return encodeURI(`${ILLUSTRATION_DIR}/${normalized}`);
}

function buildHeroVisual() {
  const slot = document.querySelector(".hero-placeholder");
  if (!slot) return;

  const slides = HERO_IMAGE_FILES.map(
    (file, index) =>
      `<img class="hero-char ${index === 0 ? "is-active" : ""}" src="${toAssetPath(file)}" alt="Hero visual ${index + 1}" data-hero-slide="${index}" />`,
  ).join("");

  const logos = HERO_LOGO_FILES.map(
    (file) => `<img class="hero-logo" src="${toAssetPath(file)}" alt="${file.replace(".png", "")}" />`,
  ).join("");

  slot.innerHTML = `
    <div class="hero-stage">
      ${slides}
      <div class="hero-stage-gradient"></div>
      <div class="hero-caption">
        <strong>TENGAI HIRIN</strong>
        <span>LAST SIGNAL YOUTH STORY</span>
      </div>
      <div class="hero-logo-row">
        ${logos}
      </div>
    </div>
  `;
}

function startHeroRotation() {
  const slides = Array.from(document.querySelectorAll("[data-hero-slide]"));
  if (slides.length <= 1) return;

  let current = 0;
  window.setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 3600);
}

function buildRosterCards() {
  const rosterGrid = document.getElementById("rosterGrid");
  if (!rosterGrid) return;

  rosterGrid.innerHTML = CHARACTERS.map(
    (character) => `
      <article class="roster-card" data-char-id="${character.id}">
        <header class="roster-card-header">
          <h3>${character.name}</h3>
          <span class="roster-role">${character.role}</span>
        </header>
        <div class="roster-type">${character.role} / ${character.gender}</div>
        <figure class="roster-art-frame">
          <img class="roster-art-image" src="${toAssetPath(character.image)}" alt="${character.name} イラスト" />
          <figcaption class="roster-art-placeholder">IMAGE SLOT</figcaption>
        </figure>
        <div class="roster-effect">
          <p>${character.skill}</p>
        </div>
        <div class="roster-stats">
          <span>ATK / ${character.atk}</span>
          <span>HP / ${character.hp}</span>
        </div>
      </article>
    `,
  ).join("");
}

function bindImageFallbacks() {
  const images = document.querySelectorAll(".roster-art-image, .hero-char");
  images.forEach((image) => {
    if (!(image instanceof HTMLImageElement)) return;
    const frame = image.closest(".roster-art-frame");

    if (image.classList.contains("roster-art-image") && image.complete && image.naturalWidth > 0) {
      frame?.classList.add("has-image");
      image.classList.remove("is-hidden");
    }

    image.addEventListener("error", () => {
      if (image.classList.contains("roster-art-image")) {
        image.classList.add("is-hidden");
        frame?.classList.remove("has-image");
      } else {
        image.style.display = "none";
      }
    });

    image.addEventListener("load", () => {
      if (image.classList.contains("roster-art-image")) {
        image.classList.remove("is-hidden");
        frame?.classList.add("has-image");
      }
    });
  });
}

function initHome() {
  buildHeroVisual();
  buildRosterCards();
  bindImageFallbacks();
  startHeroRotation();
}

initHome();
