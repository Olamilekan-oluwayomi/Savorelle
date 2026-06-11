# Savorelle — Where Taste Meets Elegance

A fully responsive restaurant landing page built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just clean, hand-crafted front-end code.

![Savorelle Preview](assets/hero%20image.png)

---

## Live Demo

🔗 [View Live Site]

---

## Features

- **Responsive layout** — mobile-first design, fully adapted for all screen sizes
- **Hamburger navigation** — slide-in drawer with overlay and keyboard (`Escape`) support
- **Scroll-aware navbar** — subtle style change on scroll
- **Active link highlighting** — nav links update automatically as you scroll through sections
- **Card sliders** — reusable slider factory powers both the Menu and Chefs sections (arrows, dots, responsive page count)
- **Scroll reveal animations** — elements fade and slide up as they enter the viewport using `IntersectionObserver`
- **Reservation form** — location, cuisine, date, time, and guest count fields
- **Wishlist toggle** — heart button on menu cards
- **Dynamic footer year** — always shows the current year

---

## Sections

| Section            | Description                                           |
| ------------------ | ----------------------------------------------------- |
| Hero               | Full-width intro with CTA and feature highlights      |
| Menu               | 6-card food slider with prices, ratings, and wishlist |
| Serving You Better | Feature list with icons and chef image                |
| Luxury Dining      | Two-image layout with booking CTA                     |
| Crafted by Experts | 6-card chef slider                                    |
| Testimonials       | 3-card patron review grid                             |
| Reservation        | Full booking form with background image               |
| Flavor CTA         | Full-width banner with overlay                        |
| Footer             | Links, contact info, and social icons                 |

---

## Project Structure

```
savorelle/
├── assets/                  # Images and icons
├── css/
│   ├── reset.css            # CSS reset
│   ├── variables.css        # Custom properties (colours, spacing, typography)
│   ├── base.css             # Global styles and scroll reveal utility
│   ├── navbar.css
│   ├── hero.css
│   ├── menu.css
│   ├── serving-section.css
│   ├── luxury.css
│   ├── crafted.css
│   ├── testimonials.css
│   ├── reservation.css
│   ├── flavor.css
│   └── footer.css
├── js/
│   └── main.js              # All JavaScript — navbar, sliders, scroll reveal
└── index.html
```

---

## JavaScript Architecture

All JS lives in a single `main.js` file, organised into clearly separated blocks:

- **Navbar scroll state** — toggles `.scrolled` class at 40px
- **Hamburger menu** — open/close with overlay, body scroll lock, and Escape key
- **Active link highlighting** — `IntersectionObserver` with a tight rootMargin to track the current section
- **`initSlider()` factory** — one reusable function that accepts config options and powers any slider on the page; currently used for the menu and chefs sliders
- **Scroll reveal** — `IntersectionObserver` adds `.visible` to `.reveal` elements as they enter the viewport; fires once per element then stops observing

---

## CSS Architecture

Styles follow a **per-component file split** with a shared token layer:

- `variables.css` holds all design tokens — colours, font sizes, spacing scale, border radii
- `base.css` holds global resets, typography defaults, utility classes (including scroll reveal)
- Each section gets its own CSS file — no cross-file dependencies

---

## Getting Started

No build tools or installs required.

```bash
# Clone the repo
git clone https://github.com/Olamilekan-oluwayomi/savorelle.git

# Open in your editor
cd savorelle
code .
```

Then open `index.html` directly in your browser, or use the Live Server extension in VS Code.

---

## Deployment

Deployed via **Vercel** — connected to this GitHub repo for automatic deploys on every push to `main`.

---

## Built With

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com/) — Playfair Display & Inter
- [Vercel](https://vercel.com/) — deployment

---

## Author

**Olamilekan Oluwayomi**
GitHub — [@Olamilekan-oluwayomi](https://github.com/Olamilekan-oluwayomi)
