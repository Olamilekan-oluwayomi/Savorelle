"use strict";

/* ═══════════════════════════════════════════════════
   NAVBAR — scroll state
════════════════════════════════════════════════════ */
const navbar = document.getElementById("navbar");

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

/* ═══════════════════════════════════════════════════
   NAVBAR — hamburger menu (mobile only)
════════════════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const navDrawer = document.getElementById("navDrawer");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
  navDrawer.classList.add("open");
  navOverlay.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  navDrawer.classList.remove("open");
  navOverlay.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  const isOpen = navDrawer.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
});

navOverlay.addEventListener("click", closeMenu);

navDrawer.querySelectorAll(".navbar__link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

/* ═══════════════════════════════════════════════════
   NAVBAR — active link highlighting
════════════════════════════════════════════════════ */
const navLinks = document.querySelectorAll(".navbar__link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    root: null,
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0,
  },
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

/* ═══════════════════════════════════════════════════
   SLIDER — reusable factory function
 
   Usage:
     initSlider({
       trackId:   'menuSlider',   // id on the .menu__slider-track element
       prevId:    'menuPrev',     // id on the previous arrow button
       nextId:    'menuNext',     // id on the next arrow button
       dotsId:    'menuDots',     // id on the dots container
       cardClass: 'menu__card',   // class used to find cards inside the track
       dotClass:  'menu__dot',    // class to apply to each dot button
       gap:       15,             // must match gap in CSS (1.5rem = 15px default)
       breakpoint: 768,           // px — below this shows 1 card, above shows 3
     });
════════════════════════════════════════════════════ */
function initSlider({
  trackId,
  prevId,
  nextId,
  dotsId,
  cardClass = "menu__card",
  dotClass = "menu__dot",
  gap = 15,
  breakpoint = 768,
}) {
  // Grab elements
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const dotsContainer = document.getElementById(dotsId);

  // Bail early if any element is missing — won't crash the rest of the page
  if (!track || !prev || !next || !dotsContainer) {
    console.warn(`initSlider: one or more elements not found for "${trackId}"`);
    return;
  }

  // Find all cards inside this specific track
  const cards = Array.from(track.querySelectorAll(`.${cardClass}`));
  if (!cards.length) return;

  let currentPage = 0;

  /* --- Wishlist toggle (menu cards only — safe to run on chef cards too, just won't find any) --- */
  cards.forEach((card) => {
    const wishlistBtn = card.querySelector(".menu__card-wishlist");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", () => {
        wishlistBtn.classList.toggle("active");
      });
    }
  });

  /* --- How many cards visible per page --- */
  function getCardsPerPage() {
    return window.innerWidth >= breakpoint ? 3 : 1;
  }

  /* --- Total number of pages --- */
  function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerPage());
  }

  /* --- Build dot indicators --- */
  function buildDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < getTotalPages(); i++) {
      const dot = document.createElement("button");
      dot.className = dotClass;
      dot.setAttribute("aria-label", `Go to page ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  /* --- Slide to a specific page --- */
  function goToPage(page) {
    const total = getTotalPages();
    page = Math.max(0, Math.min(total - 1, page));
    currentPage = page;

    const firstCardOnPage = page * getCardsPerPage();
    const cardWidth = cards[0].offsetWidth;
    const slideDistance = firstCardOnPage * (cardWidth + gap);

    track.style.transform = `translateX(-${slideDistance}px)`;

    prev.disabled = page === 0;
    next.disabled = page === total - 1;

    const allDots = dotsContainer.querySelectorAll(`.${dotClass}`);
    allDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === page);
    });
  }

  /* --- Arrow buttons --- */
  prev.addEventListener("click", () => goToPage(currentPage - 1));
  next.addEventListener("click", () => goToPage(currentPage + 1));

  /* --- Resize handler --- */
  let previousCardsPerPage = getCardsPerPage();

  window.addEventListener("resize", () => {
    const current = getCardsPerPage();
    if (current !== previousCardsPerPage) {
      previousCardsPerPage = current;
      currentPage = 0;
      buildDots();
    }
    goToPage(currentPage);
  });

  /* --- Init --- */
  buildDots();
  goToPage(0);
}

/* ═══════════════════════════════════════════════════
   SLIDER INSTANCES
════════════════════════════════════════════════════ */

// Menu — food cards
initSlider({
  trackId: "menuSlider",
  prevId: "menuPrev",
  nextId: "menuNext",
  dotsId: "menuDots",
  cardClass: "menu__card",
  dotClass: "menu__dot",
});

// Crafted by Experts — chef cards
initSlider({
  trackId: "chefSlider",
  prevId: "chefPrev",
  nextId: "chefNext",
  dotsId: "chefDots",
  cardClass: "crafted__card",
  dotClass: "menu__dot",
});

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
   Adds .visible to .reveal elements when they enter
   the viewport — triggers the CSS transition
════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

// ── Footer year — always current ──
document.getElementById("footerYear").textContent = new Date().getFullYear();
