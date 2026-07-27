/* Mobile navigation */
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function getNavFocusables() {
  if (!navToggle || !nav) return [];
  return [navToggle, ...nav.querySelectorAll("a")];
}

function setNavOpen(open) {
  if (!header || !navToggle || !nav) return;

  const wasOpen = header.classList.contains("is-nav-open");
  header.classList.toggle("is-nav-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  document.body.classList.toggle("is-nav-lock", open);

  if (open) {
    const firstLink = nav.querySelector("a");
    if (firstLink) firstLink.focus();
  } else if (wasOpen) {
    navToggle.focus();
  }
}

if (navToggle && header && nav) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!header.classList.contains("is-nav-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("is-nav-open")) return;
    if (header.contains(event.target)) return;
    setNavOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!header.classList.contains("is-nav-open")) return;

    if (event.key === "Escape") {
      setNavOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = getNavFocusables();
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 721px)").matches) {
      setNavOpen(false);
    }
  });
}
