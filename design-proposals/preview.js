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
