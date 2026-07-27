const notes = {
  aisumi: "藍墨 — 知性と静けさ。紺基調。見出しは各セクション上部に配置。",
  mori: "杜（採用）— 落ち着いた緑。Zen Old Mincho × Noto Sans JP。",
  enpaku: "鉛白 — 現代的なグレーに朱の差し色。Noto Serif JP × Zen Kaku Gothic New。",
};

const tabs = document.querySelectorAll(".chooser__tab");
const note = document.getElementById("theme-note");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const theme = tab.dataset.theme;
    document.body.dataset.theme = theme;

    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (note) note.textContent = notes[theme] || "";
  });
});

/* Mobile navigation */
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNavOpen(open) {
  if (!header || !navToggle) return;
  header.classList.toggle("is-nav-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
}

if (navToggle && header && nav) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!header.classList.contains("is-nav-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 721px)").matches) {
      setNavOpen(false);
    }
  });
}
