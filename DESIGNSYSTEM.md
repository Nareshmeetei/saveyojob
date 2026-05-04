# GetsSkilled.ai — Design System

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

**Outfit** — the only typeface used across the entire product.

No display/body/mono split. No personality collisions between font families. Outfit handles every context through weight and size contrast alone, which forces the hierarchy to be real rather than cosmetic.

```
https://fonts.google.com/specimen/Outfit
Weights loaded: 300, 400, 500, 600, 700, 800
```

**Why Outfit:**
- Geometric but not cold — the rounded terminals give it warmth
- 800 weight holds at headline sizes without looking like a logotype
- 300 weight reads cleanly at 12px labels
- Not Inter. Not DM Sans. Not Syne. Distinctive without being eccentric.

---

### Type Scale

| Role | Size | Weight | Tracking | Color |
|------|------|--------|----------|-------|
| Display / H1 | `clamp(44px, 8vw, 78px)` | 800 | `-0.04em` | `--paper` |
| Section H2 | `30px` | 700 | `-0.03em` | `--paper` |
| Card title | `17–20px` | 700 | `-0.02em` | `--paper` |
| Body | `15px` | 400 | `0` | `--paper-2` |
| Body emphasis | `15px` | 600 | `0` | `--paper` |
| Label / eyebrow | `11px` | 600–700 | `+0.14–0.18em` | `--acid` or `--paper-3` |
| Small / meta | `12px` | 400–500 | `+0.02em` | `--paper-3` |
| Data number | `28–72px` | 800 | `-0.04–0.06em` | varies |

**Line heights:**
- Headlines: `0.95` — tight, editorial, takes up less vertical space
- Body: `1.65` — generous for readability at small sizes
- Labels: `1.35` — compressed, uppercase context

**Labels are always uppercase + tracked.** `font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em`. They serve as structural dividers, not decorative accents.

---

## Color System

### The Rule: One Dominant, One Sharp Accent

The background is nearly #EDEDED. The text is dark. The accent is acid green and it appears rarely — so when it does, it means something.

```css
/* Backgrounds — a deliberate darkening sequence */
--ink:        #EDEDED;   /* page background — near white, slightly gray */
--ink-1:      #0C0F18;   /* cards, primary surfaces */
--ink-2:      #111521;   /* elevated surfaces, form fields, card headers */
--ink-3:      #172030;   /* most elevated, hover states, dropdowns */

/* Borders — two levels, used contextually */
--wire:       #1C2438;   /* default border — subtle */
--wire-2:     #263050;   /* hover/active border — still subtle, slightly lighter */
--wire-3:     #344068;   /* decorative — large background numbers */

/* Text — three levels, no more */
--paper:      #EFF0F6;   /* primary text — near white */
--paper-2:    #7E8AA4;   /* secondary text, body copy, descriptions */
--paper-3:    #404E68;   /* tertiary — labels, placeholders, faint metadata */

/* The ONE accent — used sparingly */
--acid:       #61D4FB;   /* electric lime — the only warm color in the system */
--acid-dim:   rgba(186,255,41,0.06);   /* acid as a subtle bg tint */
--acid-edge:  rgba(186,255,41,0.20);   /* acid as a border */

/* Risk colors — functional only, not decorative */
--blood:      #FF3333;   /* high risk */
--blood-dim:  rgba(255,51,51,0.08);
--rust:       #FF7A28;   /* medium risk — orange, not amber, clearly distinct */
--rust-dim:   rgba(255,122,40,0.08);
/* Low risk uses --acid — it serves double duty */
```

### Where Acid Appears (and Where It Doesn't)

**Use `--acid` on:**
- Logo prefix "Gets"
- Primary CTA button (background)
- Selected chip border + left-border accent
- Section eyebrows / labels in results
- Loading step dots and checkmarks
- Timeline dots
- Quick Win box border and label
- Risk gauge color (low risk only)
- H1 italic emphasis word

**Never use `--acid` on:**
- Decorative backgrounds
- Body text
- Generic UI chrome
- More than 2 elements in the same visual area

The acid color is precious. Scattering it everywhere turns it into noise. Every appearance should register as intentional.

---

### What We Don't Use

| Forbidden | Why |
|-----------|-----|
| Purple or purple gradients | Clichéd "AI product" signifier |
| Blue-on-dark gradients | Every SaaS header from 2019–2024 |
| Glassmorphism cards | Overused, adds visual noise |
| Rainbow / multi-color accents | Dilutes brand recognition |
| White backgrounds | Wrong tone for this product |
| `#FFFFFF` as primary bg | Too clinical, too generic |
| Warm neutrals (cream, sand) | Wrong emotional register |

---

## Spacing

Base unit: `4px`. All spacing is multiples of 4.

```
4px   — tight internal padding (badge padding, icon gaps)
8px   — gap between chips, small component gaps
10px  — chip gap, result section gaps
12px  — label margins, small internal padding
14px  — loading step padding, result pill spacing
16px  — standard card padding, chip padding
18px  — form field padding, body section padding
20px  — card inner padding (mobile)
22px  — card header padding
24px  — footer padding, section divider
28px  — primary card padding (desktop), form-body padding
36px  — section header margin-bottom
44px  — hero sub-section margin
52px  — header height
56–60px — hero-to-generator gap
72–80px — hero top padding, section padding
```

Sections inside the card are separated by `1px solid var(--wire)` borders — no margin, no padding gap. The border IS the separator.

---

## Components

### Card

The container for all interactive content. One style only — no card variants with shadows, gradients, or glow effects.

```css
background: var(--ink-1);
border: 1px solid var(--wire);
border-radius: 12px;
overflow: hidden;
```

Card header (darker than card body):
```css
background: var(--ink-2);
border-bottom: 1px solid var(--wire);
padding: 22px 28px 18px;
```

**No box shadows.** Elevation is communicated through background color contrast alone (`--ink` → `--ink-1` → `--ink-2` → `--ink-3`), not shadows.

---

### Chips (Selection Controls)

Chips replace radio buttons. The selection state is communicated by a left-border accent — more editorial, less SaaS-dashboard.

```css
/* Default */
padding: 9px 16px;
border: 1.5px solid var(--wire);
border-left: 3px solid var(--wire);   /* thicker left border — ready to activate */
border-radius: 6px;
background: var(--ink-2);
color: var(--paper-2);
font-size: 13px; font-weight: 500;

/* Selected */
border-color: var(--acid);
border-left-color: var(--acid);
background: var(--acid-dim);
color: var(--paper);

/* Hover */
border-color: var(--wire-2);
border-left-color: var(--wire-2);
color: var(--paper);
```

**Not pill-shaped.** `border-radius: 6px` — slightly rounded corners only. Pills feel like tags. Chips should feel like controls.

---

### Input Fields

```css
background: var(--ink-2);
border: 1.5px solid var(--wire);
border-radius: 8px;
padding: 13px 18px;
color: var(--paper);
font-family: 'Outfit', sans-serif;
font-size: 15px;

/* Focus */
border-color: var(--acid);
background: var(--ink-3);
/* No box-shadow glow ring — the border color change is sufficient */
```

Placeholder text: `--paper-3`. Never dimmer than this — it must be readable.

---

### Primary CTA Button

One button style. Acid background, near-black text. Used once per view.

```css
background: var(--acid);
color: #07090E;
border: none;
border-radius: 8px;
padding: 17px 24px;
font-size: 16px; font-weight: 700;
width: 100%;

/* Hover */
filter: brightness(1.07);
transform: translateY(-1px);
box-shadow: 0 12px 36px rgba(186,255,41,0.16);
```

The hover shadow uses the acid color itself — it glows, but subtly.

---

### Ghost Button

Secondary action (e.g., "Start over"). Minimal — blends into the surface.

```css
background: transparent;
border: 1px solid var(--wire);
border-radius: 8px;
color: var(--paper-2);
padding: 11px 18px;
font-size: 13px; font-weight: 500;
```

---

### Autocomplete Dropdown

```css
background: var(--ink-2);
border: 1px solid var(--wire-2);
border-radius: 8px;
max-height: 230px;
overflow-y: auto;

/* Item hover */
background: var(--ink-3);
color: var(--paper);
```

Items are separated by `1px solid var(--wire)` borders, not padding gaps.
Match text is bolded in `--paper` weight 600.

---

### Section Dividers (Inside Results)

Each result section uses a consistent header treatment:

```html
<div class="sec-head">
  <span class="sec-label">Section title</span>
  <span class="sec-rule"></span>   <!-- flex: 1; height: 1px; background: var(--wire) -->
</div>
```

The horizontal rule extends to fill available width. This replaces traditional `<h3>` headings — it reads as a data report, not a blog post.

---

### Task Bars

Task automation levels are shown as horizontal progress bars with a percentage, not colored pill badges.

```
Task Name                              87%
████████████████████░░░░░░░░░░░░   ← bar fills to %
Automated by [specific AI tool]      ← reason below
```

Bar colors map to risk level:
- `>70%` → `--blood`
- `>40%` → `--rust`
- `≤40%` → `--acid`

Bar track: `height: 3px; background: var(--wire); border-radius: 2px`
Bar fill animates in on load: `transition: width 1s ease 0.3s`

---

### Edge Box (Experience Advantage)

Left-border accent, no fill — information box, not an alert.

```css
border: 1px solid var(--wire);
border-left: 3px solid var(--acid);
border-radius: 8px;
padding: 18px 20px;
background: var(--ink-2);
```

Label: `11px, 700 weight, uppercase, --acid`
Body: `14px, 400 weight, --paper-2`

---

### Quick Win Box

Same left-border pattern, but with an acid fill tint — the ONE place acid is used as a background.

```css
border: 1px solid var(--acid-edge);
border-left: 3px solid var(--acid);
border-radius: 8px;
padding: 18px 20px;
background: var(--acid-dim);
```

This is the most visually prominent single element in the results. It should feel like the most actionable thing on the page.

---

### Risk Score Display

Large editorial number — not a circular gauge.

```
  68          ← 72px, 800 weight, risk color, animated count-up
 / 100        ← 14px, --paper-3
 ████░░       ← 80px wide bar, 4px height
```

The number counts up from 0 on load (1.4s cubic-bezier ease).
The bar fills from 0% to the score value simultaneously.

**No circular SVG gauge.** That's a dashboard pattern. This is an intelligence report.

---

### Loading State

Not a spinner. A named step list with checkmarks.

Each step:
- Before: `--paper-3` text, empty circle border
- Active: `--paper-2` text, lit circle border
- Done: `--acid` text, filled circle with `✓`

Steps are specific to the user's job title (e.g., "Scanning automation data for Financial Analyst…"), not generic.

---

### Course Cards

```
[icon]  Course Name                             VIEW →
        Platform · Skill · Level · Duration
```

Hover: border lifts from `--wire` to `--wire-2`, arrow becomes `--acid`.
No button inside — the whole card is the link.

---

### Alternative Career Chips

Not a simple tag. Each alt career is a small card:

```
UX Researcher
$65K–$95K · Your research skills transfer directly
```

Full-width, stacked vertically. Not wrapping tags — that format loses the salary and transition context that makes them valuable.

---

## Layout

### Max Widths

| Context | Max width |
|---------|-----------|
| Hero section | `760px` |
| Generator card | `720px` |
| How It Works | `720px` |
| Card inner padding | `28px` each side |

All sections are centered with `margin: 0 auto`.

### Header

`height: 52px`. Sticky. Blur backdrop. `border-bottom: 1px solid var(--wire)`.
Logo left. Badge right. Nothing else.

### Hero

Centered text block. Eyebrow → H1 → subhead → stats bar → generator.

Stats bar: `max-width: 500px`, 3-column grid, border separates columns internally.

### Generator Card

Single card. Four views toggled in JS: form → loading → error → result.
No page navigation. Everything happens in-place.

### Results

Eight sections separated by `1px solid var(--wire)` borders:
1. Risk block (score + summary + pills) — no section header
2. Task breakdown
3. Experience advantage
4. Skills to build
5. Quick win
6. Learning roadmap
7. Recommended courses
8. Career pivots

---

## Motion

Minimal. Only where it adds information, not decoration.

| Element | Animation |
|---------|-----------|
| Page sections on load | `opacity 0→1, translateY 14px→0, 0.5s ease` — staggered |
| Risk number | Count-up from 0, 1.4s, cubic-bezier(0.23, 1, 0.32, 1) |
| Risk bar fill | Width 0→score%, 1.4s, same easing |
| Task bars | Width 0→%, 1s ease, 0.3s delay |
| Loading dots | Scale pulse, 1.4s loop, offset delays |
| Loading steps | Fade + color transition as each step completes |
| CTA button hover | `translateY(-1px)`, 0.15s — subtle lift |

No parallax. No scroll-triggered animations. No entrance effects on content that's already visible.

---

## Icons

SVG inline only. No icon font. No external icon library.

Used sparingly:
- CTA button: lightning bolt (functional — implies speed/power)
- No decorative icons in body content

Emojis are used in course cards and alternative career sections as visual anchors — they scan faster than custom icons for mixed content lists.

---

## What This Design System Rejects

| Pattern | Rejection reason |
|---------|-----------------|
| Inter / Roboto / DM Sans | Default fonts — signal zero design investment |
| Purple accent on dark bg | Every AI tool from 2023–2025 |
| Gradient hero backgrounds | Obscures content hierarchy |
| Card shadows | Use background color contrast instead |
| Rounded pill badges | Generic SaaS — use left-border accent chips instead |
| Circular gauges | Dashboard pattern — use editorial number display instead |
| Three font families | Creates competing personalities — use one confidently |
| Evenly distributed color use | Dilutes accent meaning — the acid color must be rare |
| Generic loading spinner | Impersonal — use named steps that reflect the user's job |
| `border-radius > 12px` on cards | Feels like a mobile app, not an intelligence product |
| Glassmorphism | Visual noise, accessibility issues |
| Purple/teal/pink gradients | Clichéd AI aesthetics |

---

## Tone in Copy (Inseparable from Design)

The visual system only works if the copy matches it.

- **Direct, not hedged.** "Your tasks that AI is automating" not "Tasks that may potentially be impacted by automation."
- **Specific, not generic.** "Sign up for IBM Data Analyst Certificate on Coursera" not "Consider taking an online course."
- **Honest, not reassuring.** State the risk plainly. The roadmap is the reassurance, not the softened risk framing.
- **No filler.** Labels are 2–3 words. Descriptions are 1–2 sentences. Nothing runs longer than it needs to.

---

*Last updated: April 2026*
