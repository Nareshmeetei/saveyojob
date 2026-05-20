# Saveyojob.com — Design System

---

## Design Philosophy

This product serves people who are anxious about their economic future. The design should feel like a trusted expert — direct, substantive, calm under pressure. Not a startup marketing page. Not a corporate dashboard. Not a generic AI tool.

**Three non-negotiables:**
1. Every design choice must feel *deliberate*, not default
2. The content IS the product — the design gets out of its way
3. It should feel expensive and authoritative; the fact it's free is the surprise

---

## Typography

### The Rule: One Font, Used Decisively

**Work Sans** — the only typeface used across the entire product.

No display/body/mono split. No personality collisions between font families. Work Sans handles every context through weight and size contrast alone, which forces the hierarchy to be real rather than cosmetic.

```
https://fonts.google.com/specimen/Work+Sans
Weights loaded: 300, 400, 500, 600, 700, 800
```

**Why Work Sans:**
- Optimised for on-screen readability — designed specifically for digital interfaces
- Clean geometric structure with just enough warmth to avoid feeling clinical
- 800 weight holds at headline sizes with authority
- 300 weight reads cleanly at 12px labels
- Neutral and professional without being generic

---

### Type Scale

| Role | Size | Weight | Tracking | Color |
|------|------|--------|----------|-------|
| Display / H1 | `clamp(46px, 8.5vw, 80px)` | 800 | `-0.04em` | `--color-ink` |
| Section H2 | `28–32px` | 700 | `-0.03em` | `--color-ink` |
| Card title | `15–20px` | 700 | `-0.02em` | `--color-ink` |
| Body | `15px` | 400 | `0` | `--color-ink-2` |
| Body emphasis | `15px` | 600 | `0` | `--color-ink` |
| Label / eyebrow | `11px` | 700 | `+0.14–0.18em` | `--color-fire` or `--color-ink-3` |
| Small / meta | `12–13px` | 400–500 | `+0.02em` | `--color-ink-3` |
| Data number | `28–72px` | 800 | `-0.04–0.06em` | varies by risk level |

**Line heights:**
- Headlines: `0.92–0.95` — tight, editorial
- Body: `1.6` — generous for readability at small sizes
- Labels: `1.35` — compressed, uppercase context

**Labels are always uppercase + tracked.** `font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em`. They serve as structural dividers, not decorative accents.

---

## Color System

### Brand Palette

Six colors, extracted from the saveyojob.com logo and core identity. The logo itself uses two of these: `#61D4FB` as the circle background and `#123648` as the figure and wordmark.

| Name | Hex | WCAG on `#EDEDED` | Role |
|------|-----|-------------------|------|
| **Primary** | `#0C526D` | 6.9:1 ✓ | Buttons, links, eyebrows, interactive |
| **Accent** | `#61D4FB` | 1.4:1 ✗ | Graphic/logo fills only — never text |
| **Secondary** | `#123648` | 10.9:1 ✓ | Primary text, headings, logo wordmark |
| **Supporting** | `#485A6A` | 5.6:1 ✓ | Secondary text, body, metadata |
| **Muted** | `#B6DFEC` | 1.3:1 ✗ | Decorative tints — never text |
| **Warm** | `#F7998D` | 1.8:1 ✗ | Graphic highlights only — never text |

**Critical rule:** `#61D4FB`, `#B6DFEC`, and `#F7998D` are too light to use as text on any surface in this product. They are graphics-only colors. Every text element, badge, border, and interactive state must use Primary, Secondary, or Supporting.

---

### CSS Variables

```css
/* Page background */
--color-bg:        #EDEDED;   /* page background — light neutral */

/* Surfaces — a lightening sequence */
--color-surface:   #F2F2F2;   /* cards, primary surfaces */
--color-surface-2: #F4F6F8;   /* alternate section backgrounds */
--color-surface-3: #E8EDF2;   /* elevated surfaces, hover states */

/* Borders */
--color-line:      #D1D5DB;   /* default border */
--color-line-2:    #9CA3AF;   /* hover/active border */

/* Text — three levels */
--color-ink:       #123648;   /* primary text — brand Secondary */
--color-ink-2:     #485A6A;   /* secondary text — brand Supporting */
--color-ink-3:     #6B7280;   /* muted — labels, placeholders, metadata */

/* Brand interactive */
--color-fire:      #0C526D;   /* brand Primary teal */

/* Risk semantic — functional, not decorative */
--color-critical:  #DC2626;   /* high risk */
--color-warn:      #B45309;   /* medium risk */
--color-safe:      #0369A1;   /* low risk */
```

---

### Where `--color-fire` (`#0C526D`) Appears

The brand primary is precious. It appears in roughly a dozen places across the full product — no more. Its appearance must always feel intentional.

**Use on:**
- Logo "save" prefix (`text-fire`)
- H1 italic emphasis word
- Section eyebrow labels (uppercase, tracked)
- Primary CTA button background (`bg-fire`), with `--color-bg` text
- Selected chip/filter borders and background tint
- Link text and hover states
- Loading step checkmarks and animated indicators
- Timeline dots

**Never use on:**
- Decorative backgrounds or large fills
- Body copy or data numbers
- More than two prominent elements in the same visual zone

---

### Where `#61D4FB` (Accent) Appears

The accent color exists as a graphic identity element — it is the logo circle background and nothing else in the UI.

**Use on:**
- Logo circle background (SVG fill)
- Standalone icon or illustration fills where graphic contrast is needed

**Never use as:**
- Text at any size (1.4:1 on white — fails every WCAG level)
- Button or chip background
- Border or interactive state indicator
- Progress bar fill

---

### Risk Colors — Functional Only

These are not brand colors. They carry semantic meaning and must not be used decoratively.

| Level | Color | Contrast on white | Used when |
|-------|-------|-------------------|-----------|
| High | `#DC2626` | 5.1:1 ✓ | Score ≥70, "High Risk" labels |
| Medium | `#B45309` | 5.2:1 ✓ | Score 40–69, "Medium Risk" labels |
| Low | `#0369A1` | 5.6:1 ✓ | Score <40, "Lower Risk" labels |

Progress bar task automation levels:
- `>70%` → `#DC2626`
- `>40%` → `#B45309`
- `≤40%` → `#0369A1`

Bar track: `height: 3px; background: var(--color-line); border-radius: 2px`

---

### What We Don't Use

| Forbidden | Why |
|-----------|-----|
| `#61D4FB` as text or UI chrome | 1.4:1 contrast — illegible at any size |
| `#F7998D` as text or UI | 1.8:1 contrast — illegible |
| `#B6DFEC` as text | 1.3:1 contrast — illegible |
| Dark backgrounds | Product is light mode — `#EDEDED` is the minimum |
| `#000000` / pure black | Use `#123648` — brand-aligned, warmer |
| `#FFFFFF` / `#F2F2F2` as page background | Use `#EDEDED` — distinctive, not clinical |
| Purple or teal gradients | Clichéd AI product trope |
| Rainbow / multi-color accents | Dilutes the meaning of brand Primary |
| Glassmorphism | Visual noise, accessibility issues |
| Box shadows on cards | Use background color contrast instead |
| `border-radius > 12px` on cards | Feels mobile/toy, not an intelligence product |
| Three or more type families | Creates competing personalities |

---

## Spacing

Base unit: `4px`. All spacing is multiples of 4.

```
4px   — tight internal padding (badge padding, icon gaps)
8px   — gap between chips, small component gaps
12px  — label margins, small internal padding
16px  — standard card padding, chip padding
20px  — card inner padding (mobile)
24px  — footer padding, section divider
28px  — primary card padding (desktop)
36px  — section header margin-bottom
52px  — header height
72–80px — hero top padding, section padding
```

Sections inside the card are separated by `1px solid var(--color-line)` borders — no margin, no padding gap. The border IS the separator.

---

## Components

### Card

The container for all interactive content. One style only — no card variants with shadows, gradients, or glow effects.

```css
background: var(--color-surface);
border: 1px solid var(--color-line);
border-radius: 12px;
overflow: hidden;
```

Card header (slightly differentiated from card body):
```css
background: var(--color-surface-2);
border-bottom: 1px solid var(--color-line);
padding: 22px 28px 18px;
```

**No box shadows.** Elevation is communicated through background color contrast alone (`--color-bg` → `--color-surface` → `--color-surface-2` → `--color-surface-3`), not shadows.

---

### Chips (Selection Controls)

Chips replace radio buttons. Selection state is communicated by a left-border accent — more editorial, less SaaS-dashboard.

```css
/* Default */
padding: 9px 16px;
border: 1.5px solid var(--color-line);
border-left: 3px solid var(--color-line);
border-radius: 6px;
background: var(--color-surface-2);
color: var(--color-ink-2);
font-size: 13px; font-weight: 500;

/* Selected */
border-color: var(--color-fire);
border-left-color: var(--color-fire);
background: rgba(12, 82, 109, 0.06);
color: var(--color-ink);

/* Hover */
border-color: var(--color-line-2);
border-left-color: var(--color-line-2);
color: var(--color-ink);
```

**Not pill-shaped.** `border-radius: 6px` — slightly rounded corners only. Pills feel like tags. Chips should feel like controls.

---

### Input Fields

```css
background: var(--color-surface);
border: 1.5px solid var(--color-line);
border-radius: 8px;
padding: 13px 18px;
color: var(--color-ink);
font-family: 'Bricolage Grotesque', sans-serif;
font-size: 15px;

/* Focus */
border-color: var(--color-fire);
outline: none;
```

Placeholder text: `--color-ink-3`. The border color change on focus is sufficient — no glow ring.

---

### Primary CTA Button

One button style. Brand Primary background, page-background text. Used once per view.

```css
background: var(--color-fire);   /* #0C526D */
color: var(--color-bg);          /* #EDEDED */
border: none;
border-radius: 8px;
padding: 17px 24px;
font-size: 16px; font-weight: 700;
width: 100%;

/* Hover */
filter: brightness(1.08);
transform: translateY(-1px);
```

Contrast: `#EDEDED` on `#0C526D` = 6.9:1 — exceeds WCAG AA for all text sizes.

---

### Ghost Button

Secondary action. Minimal — blends into the surface.

```css
background: transparent;
border: 1px solid var(--color-line);
border-radius: 8px;
color: var(--color-ink-2);
padding: 11px 18px;
font-size: 13px; font-weight: 500;
```

---

### Risk Score Display

Large editorial number — not a circular gauge.

```
  68          ← 72px, 800 weight, risk color, animated count-up
 / 100        ← 14px, --color-ink-3
 ████░░       ← 120px wide bar, 4px height
```

The number counts up from 0 on load (1.4s cubic-bezier ease).
The bar fills from 0% to the score value simultaneously.

**No circular SVG gauge.** That's a dashboard pattern. This is an intelligence report.

---

### Section Dividers (Inside Results)

Each result section uses a consistent header treatment:

```html
<div class="sec-head">
  <span class="sec-label">Section title</span>
  <span class="sec-rule"></span>   <!-- flex: 1; height: 1px; background: var(--color-line) -->
</div>
```

The horizontal rule extends to fill available width. Replaces traditional `<h3>` headings — reads as a data report, not a blog post.

---

### Loading State

Not a spinner. A named step list with checkmarks.

Each step:
- Before: `--color-ink-3` text, empty circle border in `--color-line`
- Active: `--color-ink-2` text, border transitions to `--color-fire`
- Done: `--color-fire` text, filled circle with `✓`

Steps are specific to the user's job title, not generic ("Scanning automation data for Financial Analyst…").

---

### Course Cards

```
[platform icon]  Course Name                      Enroll →
                 Platform · Duration
                 [Category tag]
                 ████░  Impact score
```

Hover: border lifts from `--color-line` to `--color-line-2`, title text transitions to `--color-fire`. The whole card is the link — no button inside.

---

### Edge Box (left-border accent)

Information box, not an alert.

```css
border: 1px solid var(--color-line);
border-left: 3px solid var(--color-fire);
border-radius: 8px;
padding: 18px 20px;
background: var(--color-surface);
```

Label: `11px, 700 weight, uppercase, --color-fire`
Body: `14px, 400 weight, --color-ink-2`

---

## Layout

### Max Widths

| Context | Max width |
|---------|-----------|
| Hero section | `700px` |
| Generator card | `720px` |
| Course grid | `900px` |
| Risk engine | `680px` |

All sections are centered with `margin: 0 auto`.

### Header

`height: 52px`. Sticky. Blur backdrop. `border-bottom: 1px solid var(--color-line)`. Logo left. CTA button right. Nothing else.

### Hero

Centered text block. Eyebrow → H1 → subhead → upload CTA → social proof → stats bar.

Stats bar: `max-width: 500px`, 3-column grid, `--color-line` borders separate columns.

### Section Alternation

Sections alternate between the page background (`--color-bg: #EDEDED`) and `--color-surface-2: #F4F6F8`. The difference is subtle — enough to pace the scroll without visual noise.

---

## Motion

Minimal. Only where it adds information, not decoration.

| Element | Animation |
|---------|-----------|
| Page sections on scroll | `opacity 0→1, translateY 24px→0, 0.45s ease` — staggered |
| Risk number | Count-up from 0, 1.4s, `cubic-bezier(0.23, 1, 0.32, 1)` |
| Risk bar fill | Width 0→score%, 1.4s, same easing |
| Task bars | Width 0→%, 1s ease, 0.3s delay |
| Loading dots | Scale pulse, 1.2s loop, offset delays |
| Loading steps | Fade + color transition as each step completes |
| CTA button hover | `translateY(-1px)`, 0.15s — subtle lift |
| Card hover | Border color transition, 0.15s |

No parallax. No scroll-triggered animations on already-visible content.

---

## Icons

**Library: [Lucide React](https://lucide.dev)** — the only icon system used across the product. No emoji, no inline SVG one-offs, no icon fonts.

```
"lucide-react": "^1.14.0"
```

### Size Scale

| Context | Size | strokeWidth |
|---------|------|-------------|
| UI / action icons (buttons, inputs) | `18` | `1.5` |
| Card decorative icons | `20–22` | `1.5` |
| Upload / hero icons | `32–36` | `1.5` |

`strokeWidth={1.5}` is universal — it matches the light, refined character of Work Sans at all weights. Never use the default `strokeWidth={2}` (too heavy) or go below `1.5` (too hairline on small sizes).

### Icon Color

Icons inherit color from `className="text-ink-2"` (default decorative) or from inline `style={{ color: riskColor }}` when carrying semantic meaning (e.g., risk score icons). Never hard-code hex values that aren't already in the CSS variable set.

### Icon Usage Rules

- **Always functional, never decorative for its own sake.** Each icon must communicate something — action, category, platform, or state.
- **Platform icons** (course directory): `GraduationCap`, `Briefcase`, `Bot`, `Globe`, `BookOpen`
- **Generator step icons** (selection cards): `Shield`, `TrendingUp`, `Bot`, `Search`, `Leaf`, `Compass`, `Award`, `Clock`, `Zap`, `Flame`
- **Job risk icons** (CriticalSix): `FileText`, `MessageSquare`, `PenLine`, `BookOpen`, `Phone`, `Wrench`
- **Upload / file action**: `FileUp`
- No emoji anywhere in the product.

---

## Tone in Copy (Inseparable from Design)

The visual system only works if the copy matches it.

- **Direct, not hedged.** "Your tasks that AI is automating" not "Tasks that may potentially be impacted by automation."
- **Specific, not generic.** "Sign up for IBM Data Analyst Certificate on Coursera" not "Consider taking an online course."
- **Honest, not reassuring.** State the risk plainly. The roadmap is the reassurance, not softened risk framing.
- **No filler.** Labels are 2–3 words. Descriptions are 1–2 sentences. Nothing runs longer than it needs to.

---

*Last updated: May 2026*
