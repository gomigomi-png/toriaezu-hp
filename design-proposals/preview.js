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
