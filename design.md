# ValidMVPs — Design System Reference

> **Version**: 1.0  
> **Last Updated**: 2026-04-25  
> **Stack**: Astro + Tailwind CSS + Vanilla CSS Custom Properties  
> **Smooth Scroll**: Lenis  
> **Interaction Layer**: ClickSpark (React, `client:idle`)

---

## 🎨 Color Palette

| Token | Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Deep Forest** | `--color-spring-green-8` | `#0D1B15` | Primary text, dark backgrounds, CTA backgrounds |
| **Mid Grey** | `--color-grey-36` | `#595E5C` | Secondary text, captions, metadata |
| **Acid Green** | `--color-chartreuse-green-72` | `#D1FC71` | Primary accent, buttons, hover fills, active states |
| **Light Grey** | `--color-grey-78` | `#C9CBC5` | Body text on dark backgrounds |
| **Page BG** | — | `#F6F7FF` | Blog page and inner page background |
| **White** | — | `#FFFFFF` | Cards, navbar, modal surfaces |

### Usage Rules
- Never use generic `black` or `white` directly — always use `#0D1B15` or `#F6F7FF`.
- The Acid Green (`#D1FC71`) is the **only** accent color. Do not introduce secondary accents.
- Dark sections (e.g. Contact, Footer) use `#0D1B15` background with `#C9CBC5` body text.

---

## 🔤 Typography

### Font Families

| Font | Variable | Purpose |
| :--- | :--- | :--- |
| **Bricolage Grotesque** | `font-['Bricolage_Grotesque']` | All headings (H1–H4), display text, hero titles |
| **Inter** | `font-['Inter']` / `font-inter` | All body copy, UI labels, navigation, buttons |
| **Jost** | `font-['Jost']` | Eyebrow labels, category tags, small utility text |
| **Gilda Display** | `font-['Gilda_Display']` | Decorative / editorial accent (use sparingly) |

### Type Scale (Desktop)

| Tag | Size | Weight | Tracking | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| H1 | Variable (clamp) | 500–700 | `-0.04em` | `1.05` |
| H2 | `48px` | 500 | `-3px` | `1.1` |
| H3 | `32px` | 500 | `-1px` | `1.2` |
| Body Large | `22px` | 400 | — | `1.6em` |
| Body | `17px` | 400 | — | `1.6` |
| Caption / Label | `14px` | 400–500 | — | `1.2` |

### Type Scale (Mobile, max-width: 768px)
- H1: `28px`, line-height `1.1`, tracking `-0.05em`
- H2: `24px`, line-height `1.1`, tracking `-0.04em`
- H3: `20px`, line-height `1.2`
- Body: `14px`, line-height `1.4`

### Rules
- All headings must use `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased` (applied globally).
- Blog post H2s use the class pattern: `font-['Bricolage_Grotesque'] font-medium text-3xl md:text-[48px] tracking-[-1px] md:tracking-[-3px] leading-[1.2]`

---

## 📐 Spacing & Layout

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Section padding (desktop)** | `py-[120px]` | Standard section vertical spacing |
| **Section padding (mobile)** | `py-12` | Standard section vertical spacing mobile |
| **Container max-width** | `max-w-[1440px]` | Standard content container |
| **Wide container** | `max-w-[1540px]` | Blog grid and wider sections |
| **Horizontal padding (desktop)** | `px-[50px]` | Inner page padding |
| **Horizontal padding (mobile)** | `px-6` | Mobile padding |
| **Card gap (desktop)** | `gap-[15px]` | Blog grid card spacing |
| **Card gap (mobile)** | `gap-6` | Mobile card spacing |

---

## 🧱 Border Radius

> **Note**: `* { border-radius: var(--border-radius-xs) !important; }` is set globally with `4px` as minimum, but components override this with larger values.

| Component | Radius |
| :--- | :--- |
| Global minimum | `4px` |
| Cards / Blog Cards | `rounded-[20px]` (20px) |
| Buttons (pill) | `rounded-full` |
| Buttons (card) | `rounded-[60px]` |
| Navbar pill | `rounded-2xl` (16px) |
| Mega menu | `rounded-[24px]` |
| Image containers | `rounded-[16px]` |
| Tags / Badges | `rounded-full` |

---

## 🌑 Shadows

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 2px 4px rgba(13,27,21,0.05)` | Subtle card lift |
| `--shadow-md` | `0 10px 30px rgba(13,27,21,0.08), 0 4px 12px rgba(13,27,21,0.03)` | Navbar, modals |
| `--shadow-lg` | `0 40px 100px rgba(13,27,21,0.12), 0 12px 32px rgba(13,27,21,0.04)` | Hover lift state |

---

## ⚡ Animation & Motion

### Easing Curves

| Token | Value | Feel |
| :--- | :--- | :--- |
| `--ease-out` | `cubic-bezier(0.19, 1, 0.22, 1)` | Snappy deceleration — primary easing |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Smooth transition in and out |
| `--ease-spring` | `cubic-bezier(0.43, 0.13, 0.23, 0.96)` | Spring-like, organic feel |

### Duration Tokens

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--dur-fast` | `160ms` | Hover states, micro-interactions |
| `--dur-normal` | `280ms` | Most transitions (button fills, nav) |
| `--dur-slow` | `450ms` | Page element reveals |
| `--dur-reveal` | `800ms` | Scroll-triggered section reveals |

### Scroll Reveal
Use the `.reveal-on-scroll` class. It is initialized by the global `IntersectionObserver` in `Layout.astro`.  
Stagger siblings with `.stagger-1` through `.stagger-4` (80ms increments).

```html
<div class="reveal-on-scroll">First element</div>
<div class="reveal-on-scroll stagger-1">Second element (+80ms)</div>
<div class="reveal-on-scroll stagger-2">Third element (+160ms)</div>
```

---

## 🔘 Button System

### Variants

| Variant | Class | Background | Text | Hover |
| :--- | :--- | :--- | :--- | :--- |
| **Primary (Acid Green)** | `bg-[#D1FC71] rounded-full` | `#D1FC71` | `#0D1B15` | Organic liquid fill → black bg, white text |
| **Dark CTA** | `bg-[#0D1B15] rounded-full` | `#0D1B15` | white | Acid green liquid fill → black text |
| **Ghost / Outline** | `border border-[#D1FC71]/30` | transparent | `#0D1B15` | `bg-[#D1FC71]` |

### Premium Morph Interaction
The global `btn-premium-morph` class applies an organic liquid fill animation on hover. It is auto-applied by the button observer in `Layout.astro`.

- Green background buttons: fill becomes **black** (text goes white)
- Dark/outline buttons: fill becomes **Acid Green** (text stays black)

### Hover Lift
Add `hover-lift` class to CTAs and cards that should lift on hover:
```html
<a href="/contact/" class="hover-lift px-6 py-3 bg-[#D1FC71] rounded-full">
  Get Started
</a>
```

---

## 🧩 Core Components

| Component | File | Description |
| :--- | :--- | :--- |
| `Navbar` | `Navbar.astro` | Fixed floating pill with desktop mega menu + mobile overlay |
| `BlogGrid` | `BlogGrid.astro` | 3-column responsive grid with pagination |
| `BlogDetailsHero` | `BlogDetailsHero.astro` | Post header with title, author, date, featured image |
| `BlogProse` | `BlogProse.astro` | Scoped prose container for blog post body |
| `RelatedPosts` | `RelatedPosts.astro` | Auto-populated related articles |
| `Contact` | `Contact.astro` | Cal.com inline booking embed (lazy-loaded via IntersectionObserver) |
| `FAQ` | `FAQ.astro` | Accessible accordion with CSS grid-rows animation |
| `Footer` | `Footer.astro` | Full-width footer with links, socials |

---

## 🏗️ Page Structure

### Blog Listing (`/blog/`)
```
Navbar → BlogHero → BlogGrid (paginated, 6 per page) → Contact → FAQ → Footer
```

### Blog Post (`/blog/[slug]/`)
```
Navbar → BlogDetailsHero → BlogProse → RelatedPosts → Contact → FAQ → Footer
```

### Layout Wrapper (`Layout.astro`)
Injects: SEO meta, OG tags, JSON-LD schema, Google Fonts (non-blocking), ClickSpark (client:idle), Lenis smooth scroll, global IntersectionObserver for scroll reveal + button morphing.

---

## 🚀 Performance Rules

| Rule | Implementation |
| :--- | :--- |
| Google Fonts | Non-blocking via `media="print"` + `onload` swap |
| ClickSpark (React) | `client:idle` — hydrates only after browser idle |
| Cal.com embed | Lazy-loaded via `IntersectionObserver` (rootMargin: 200px) |
| Blog card images | Astro `<Image>` with WebP format, `eager` for first 3, `lazy` for rest |
| Button observer | Scoped to `.btn-premium-morph`, `.btn-primary`, `.hover-lift` only |

---

## 📁 File Structure

```
src/
├── components/        # All reusable UI components (.astro)
├── data/
│   ├── posts.ts       # Blog post registry (id, title, excerpt, date, image)
│   └── blog-strategy-lovable-claude.md  # Content strategy reference
├── layouts/
│   └── Layout.astro   # Global HTML shell, SEO, scripts
├── pages/
│   ├── blog/          # Blog post pages (.astro) + pagination ([...page].astro)
│   └── index.astro    # Home page
└── styles/
    └── global.css     # Design tokens, animation system, utility classes
```

---

## ✅ Design Dos & Don'ts

| ✅ Do | ❌ Don't |
| :--- | :--- |
| Use `#0D1B15` for dark text | Use raw `black` |
| Use `#D1FC71` as the only accent | Introduce secondary accent colors |
| Use Bricolage Grotesque for all headings | Mix heading fonts |
| Add `reveal-on-scroll` to major sections | Add scroll animations to inline text |
| Lazy-load below-the-fold images | Use `loading="eager"` past the 3rd card |
| Use `rounded-full` for pill buttons | Use small radius on CTAs |
| Add `hover-lift` to primary CTAs | Apply hover-lift to text links |
