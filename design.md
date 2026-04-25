---
name: ValidMVPs
colors:
  # --- Primary Surfaces ---
  background: "#F6F7FF"
  surface: "#FFFFFF"
  surface-dark: "#0D1B15"
  surface-dark-dim: "#0A1410"

  # --- Primary Brand ---
  primary: "#0D1B15"
  on-primary: "#FFFFFF"
  primary-container: "#D1FC71"
  on-primary-container: "#0D1B15"

  # --- Accent ---
  accent: "#D1FC71"
  on-accent: "#0D1B15"
  accent-hover-fill: "#000000"
  on-accent-hover: "#FFFFFF"

  # --- Text ---
  on-surface: "#0D1B15"
  on-surface-variant: "#595E5C"
  on-surface-dim: "#C9CBC5"
  on-surface-muted: "#AAAAAA"

  # --- Borders & Outlines ---
  outline: "rgba(13, 27, 21, 0.08)"
  outline-variant: "rgba(13, 27, 21, 0.05)"

  # --- Semantic ---
  error: "#D32F2F"
  on-error: "#FFFFFF"

typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: "600"
    lineHeight: 1.05
    letterSpacing: -0.05em

  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: "500"
    lineHeight: 1.1
    letterSpacing: -0.04em

  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: "500"
    lineHeight: 1.2
    letterSpacing: -0.03em

  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 1.2
    letterSpacing: -0.02em

  body-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: "400"
    lineHeight: 1.6

  body-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 1.6

  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.4

  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 1.2

  eyebrow:
    fontFamily: Jost
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.2
    letterSpacing: 0.08em

  code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5

rounded:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 20px
  xl: 24px
  pill: 9999px

spacing:
  unit: 8px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 80px
  xxl: 120px
  container-max: 1440px
  container-wide: 1540px
  container-padding-desktop: 50px
  container-padding-mobile: 24px
  card-gap-desktop: 15px
  card-gap-mobile: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 48px

elevation:
  none: "none"
  sm: "0 2px 4px rgba(13, 27, 21, 0.05)"
  md: "0 10px 30px rgba(13, 27, 21, 0.08), 0 4px 12px rgba(13, 27, 21, 0.03)"
  lg: "0 40px 100px rgba(13, 27, 21, 0.12), 0 12px 32px rgba(13, 27, 21, 0.04)"
  navbar: "0 4px 20px rgba(13, 27, 21, 0.04)"
  card-hover: "0 15px 40px rgba(13, 27, 21, 0.05)"

motion:
  easing-out: "cubic-bezier(0.19, 1, 0.22, 1)"
  easing-in-out: "cubic-bezier(0.77, 0, 0.175, 1)"
  easing-spring: "cubic-bezier(0.43, 0.13, 0.23, 0.96)"
  duration-fast: 160ms
  duration-normal: 280ms
  duration-slow: 450ms
  duration-reveal: 800ms

components:
  navbar:
    backgroundColor: "#FFFFFF"
    borderColor: "rgba(255, 255, 255, 0.2)"
    shadow: "0 4px 20px rgba(13, 27, 21, 0.04)"
    rounded: 9999px
    padding: "12px 40px"
    position: fixed

  nav-link-active:
    backgroundColor: "#D1FC71"
    textColor: "#0D1B15"
    rounded: 9999px
    padding: "8px 16px"

  nav-link-default:
    backgroundColor: transparent
    textColor: "#595E5C"
    rounded: 9999px
    padding: "8px 16px"

  button-primary:
    backgroundColor: "#D1FC71"
    textColor: "#0D1B15"
    typography: "{typography.label}"
    rounded: 9999px
    height: 44px
    padding: "0 24px"

  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "#FFFFFF"
    transition: "organic liquid fill 650ms cubic-bezier(0.19, 1, 0.22, 1)"

  button-dark:
    backgroundColor: "#0D1B15"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: 9999px
    height: 44px
    padding: "0 24px"

  button-ghost:
    backgroundColor: transparent
    borderColor: "rgba(209, 252, 113, 0.3)"
    textColor: "#0D1B15"
    rounded: 9999px
    height: 44px
    padding: "0 32px"

  blog-card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.on-surface}"
    rounded: 20px
    padding: 20px
    gap: 20px
    shadow: "{elevation.none}"
    shadow-hover: "{elevation.card-hover}"

  blog-card-cta:
    backgroundColor: "#D1FC71"
    textColor: "#0A0F1E"
    rounded: 9999px
    padding: "10px 30px"
    typography: "{typography.label}"

  blog-card-cta-hover:
    backgroundColor: "#000000"
    textColor: "#FFFFFF"

  contact-section:
    backgroundColor: "#0D1B15"
    textColor: "#FFFFFF"
    rounded: 24px
    padding: "48px"

  faq-item:
    backgroundColor: "#FFFFFF"
    borderColor: "rgba(13, 27, 21, 0.05)"
    rounded: 16px
    padding: 24px

  faq-item-open:
    borderColor: "rgba(13, 27, 21, 0.1)"
    shadow: "0 15px 40px rgba(13, 27, 21, 0.05)"

  faq-icon:
    backgroundColor: "#D1FC71"
    iconColor: "#0D1B15"
    size: 40px
    rounded: 9999px

  pagination-next:
    backgroundColor: "#D1FC71"
    textColor: "#0D1B15"
    rounded: 9999px
    padding: "12px 32px"

  pagination-prev:
    backgroundColor: "#FFFFFF"
    textColor: "#0D1B15"
    borderColor: "rgba(209, 252, 113, 0.3)"
    rounded: 9999px
    padding: "12px 32px"
---

## Brand & Style

ValidMVPs is a fast-execution technical studio for startup founders. The design language communicates speed, precision, and credibility — qualities a founder needs to feel from a development partner before committing to a build sprint. The visual identity deliberately avoids the "polished agency" clichés (gradients, glows, abstract blobs) in favour of a restrained, editorial system that signals engineering seriousness.

The personality can be described as **"high-velocity minimalism"**: confident negative space, a single aggressive accent color, and typographic hierarchy that does the heavy lifting. It is reminiscent of Y Combinator's matter-of-fact tone combined with the typographic quality of Vercel's design system.

## Colors

The palette is built on two anchors and a single accent:

- **Deep Forest (`#0D1B15`)** — The primary dark. Used for all text on light backgrounds, the hero section, the Contact section background, and the footer. It reads as almost-black but carries a warm, organic undertone that prevents harshness. This color signals trust and depth.
- **Page Wash (`#F6F7FF`)** — A near-white with the faintest blue-lavender cast. Used as the background for all inner pages (blog, pricing, services). It is light enough to read as white but creates a distinct, cooler-temperature contrast against pure white cards, giving the grid depth without borders.
- **Acid Green (`#D1FC71`)** — The *only* accent color in the entire system. It is a high-chroma, high-luminosity chartreuse that creates instant visual stops on a dark or light background. It is used exclusively for: primary CTA buttons, active navigation states, FAQ accordion icons, and the "Read More" pill on blog cards. No other accent color should ever be introduced.
- **Card White (`#FFFFFF`)** — Blog cards, the navbar pill, and modal surfaces sit on pure white, floating above the `#F6F7FF` wash with a subtle elevation shadow.

The contrast between the deep forest and acid green is the brand's signature. It signals energy and technical confidence simultaneously.

## Typography

The system uses three fonts with distinct, non-overlapping roles:

**Bricolage Grotesque** is the display and heading font. It is a variable-axis grotesque with wide optical size range, giving titles a strong editorial quality at large sizes and remaining crisp at smaller weights. All H1–H4 headings use this family. Letter-spacing is aggressively negative (`-0.04em` to `-0.05em` at display sizes) to compress headlines into dense, high-impact blocks. This tight tracking is a key brand signal — copy that feels like code or a technical specification.

**Inter** handles all body copy, UI labels, navigation text, and button text. Its geometric neutrality provides maximum legibility and contrast against the expressive heading font. Body paragraphs in blog posts are set at 22px / 1.6 line-height on desktop, giving long-form technical content breathing room without requiring readers to re-locate their place on the line.

**Jost** is used for eyebrow labels and category tags — small, spaced-out all-caps identifiers that precede section headings. Its slightly wider tracking (0.08em) differentiates it from body copy at a glance.

Typography is rendered with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` globally, ensuring all text appears at its sharpest.

## Layout & Spacing

The layout system is built on an 8px unit. All padding, margins, and gap values are multiples of 8px. The maximum content container width is 1440px (standard) or 1540px (blog grid), always horizontally centered. Desktop horizontal padding is 50px; mobile collapses to 24px.

The blog grid uses a 3-column CSS grid on desktop (`lg:grid-cols-3`), 2-column on tablet, and single column on mobile. Column gaps are intentionally tight at 15px desktop — tighter than most systems — creating a dense, publication-style grid.

Section vertical rhythm is generous: 120px top/bottom padding on desktop, collapsing to 48px on mobile. This negative space is intentional — it lets each section "breathe" and prevents the page from feeling cluttered despite the density of the typography.

## Elevation & Depth

The elevation system is minimal and naturalistic. There are no vivid colored shadows or dramatic drop shadows. All shadows use the deep forest color (`rgba(13, 27, 21, ...)`) at very low opacity:

- **Cards at rest:** No shadow. Cards sit directly on the `#F6F7FF` wash and are distinguished by their white background alone.
- **Cards on hover:** A soft `0 15px 40px rgba(13, 27, 21, 0.05)` appears, creating a gentle lift. Combined with the `.hover-lift` transform (`translateY(-8px) scale(1.02)`), this produces a physical "picking up" sensation.
- **Navbar:** The floating pill has `0 4px 20px rgba(13, 27, 21, 0.04)` — barely perceptible, just enough to separate it from the hero behind it.
- **Contact section:** Uses `#0D1B15` as its surface color. Against the `#F6F7FF` page background, this creates the highest-contrast section on the page, acting as a visual anchor before the footer.

## Shapes & Border Radius

The shape language is **softly rounded but not bubbly**. The global minimum radius is 4px (applied via a CSS universal selector override). Individual components layer larger values on top:

- **Navbar pill / CTA buttons:** `border-radius: 9999px` (fully pill-shaped) — these are the most "friendly" shapes in the system, signalling approachability on interactive elements.
- **Blog cards / modals:** `20px` — noticeably rounded but still rectangular, reinforcing the "card" metaphor.
- **Contact section container:** `24px` — slightly softer than cards, making the dark CTA block feel like a contained, elevated panel within the page.
- **Image containers within cards:** `16px` — slightly tighter than the card itself, sitting inset.

## Motion & Animation

Motion in this system is physics-based and directional. The primary easing function — `cubic-bezier(0.19, 1, 0.22, 1)` — is an aggressive ease-out that starts fast and decelerates to a near stop. This mirrors the behavior of a physical object released under gravity, creating a sense of weight and intentionality.

**Scroll Reveal:** Every major section uses an `IntersectionObserver`-driven reveal animation. Elements start at `translateY(30px) scale(0.98)` with `opacity: 0`, then transition to natural position over 800ms. Sibling elements stagger at 80ms intervals using utility classes (`.stagger-1` through `.stagger-4`).

**Button Morph:** The signature interaction is the "organic liquid fill" on primary buttons. On hover, a pseudo-element starts at `scale(0) rotate(15deg)` and expands to `scale(1.3) rotate(0deg)` with an organic border-radius (`40% 60% 70% 30% / 40% 50% 60% 50%`). The fill color for Acid Green buttons is black; for dark buttons, it is Acid Green. This creates a visceral, premium tactile feeling that is disproportionately impactful for its implementation cost.

**Hover Lift:** Interactive cards and CTAs with `.hover-lift` translate up by 8px and scale to 1.02 on hover, paired with the large shadow. This is only applied on true pointer devices (`@media (hover: hover) and (pointer: fine)`) to avoid accidental trigger on touch screens.

**ClickSpark:** A React component (hydrated at browser idle via `client:idle`) emits 10 acid-green sparks from every cursor click position. The sparks travel at randomised vectors from a 20px radius and fade over 500ms. This micro-interaction reinforces the Acid Green brand color and adds delight without impacting performance.

**Smooth Scroll:** Lenis is used site-wide for inertial smooth scrolling (`duration: 1.0`, `lerp: 0.12`). All `scroll-behavior: auto` overrides are applied to prevent Lenis conflicting with native browser scroll APIs.

## Surfaces & Materials

The system has two primary material expressions:

**Light Surface:** White cards (`#FFFFFF`) on a blue-washed page background (`#F6F7FF`). Used for all content-focused layouts (blog grid, pricing tables, FAQ).

**Dark Surface:** Deep forest panels (`#0D1B15`) used for the home page hero, the Contact booking section, and the footer. On these surfaces, body text is `#C9CBC5` (a warm light grey), and the Acid Green accent pops with maximum contrast.

**Noise Texture:** A class `.premium-noise` applies a faint SVG fractal noise texture at 3% opacity as a pseudo-element over dark surfaces. This gives dark panels a subtle material quality — similar to matte paper — preventing them from reading as flat.

**Glass Panel:** A `.glass-panel` utility (`backdrop-filter: blur(12px)`) is available for overlays. It is used in the Solutions mega menu and the mobile navigation overlay.

## Accessibility

- All interactive elements have visible focus styles using the Acid Green accent as an `outline`.
- A "Skip to Content" link is positioned off-screen and becomes visible on focus, navigating directly to the `#main-content` anchor.
- Scroll reveal animations are wrapped in `@media (prefers-reduced-motion: no-preference)`, so users who have reduced motion enabled see static content.
- Navigation active states are communicated with both color change and a visible dot indicator — not color alone.
- The mobile navigation overlay traps focus within its card when open, and `aria-expanded` is toggled on all accordion and dropdown triggers.
