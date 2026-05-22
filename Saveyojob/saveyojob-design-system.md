# Saveyojob Design System
### v1.1 — 3-Color · Sans-Serif · No Gradients

---

## Philosophy

Saveyojob is a design system born from two references: the quiet authority of a smart-home control panel and the restrained elegance of precision hardware. The aesthetic sits at the intersection of **utilitarian clarity** and **editorial confidence** — every element feels intentional, every component earns its place.

**Core values:**
- Precision over decoration
- Density without clutter
- Confidence in whitespace
- Tactile, physical metaphors
- **Pixel perfect** — every implementation must be exact. Small details matter: alignment, spacing, text sizing, border radius, color values. Nothing ships unless it matches the spec precisely.

---

## Color

Only three brand colors. All neutrals are derived as tints of the primary.

| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` | `#0C526D` | Brand anchor · actions · dark surfaces |
| `--color-secondary` | `#61D4FB` | Live data · selected states · highlights |
| `--color-accent` | `#F7998D` | Alerts · warnings · below-goal states |

### Derived Neutrals

| Token | Value | Use |
|-------|-------|-----|
| `--color-ink` | `#081E28` | Primary text |
| `--color-mid` | `#4A7A8A` | Secondary text · labels · borders |
| `--color-subtle` | `#C5DDE4` | Tracks · dividers · hover fills |
| `--color-surface` | `#EDEDED` | App background |
| `--color-white` | `#F2F2F2` | Card surfaces |

### Usage Rules

- **Primary** is the gravitational center — nav, filled buttons, dark surfaces, progress fills.
- **Secondary** is electric — reserve it for live data, ring indicators, selected states, active badges.
- **Accent** is the alarm bell — one warning per screen, below-goal states, destructive actions.
- Never combine two brand colors in a single fill (no gradients).
- Badges and chips use 10–18% opacity fills of their respective brand color.
- **Never use pure `#FFFFFF` or `#000000`** — use `#F2F2F2` instead of white and `#081E28` instead of black.

---

## Typography

All type is sans-serif. No serif fonts.

### Fonts

| Role | Font | Notes |
|------|------|-------|
| Display / Headline / UI | `DM Sans` | Weights 300–800 |
| Data / Monospace | `JetBrains Mono` | Weights 400–600 |

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Display | clamp(40–56px) | 800 | Hero headlines, brand statements |
| Headline | clamp(22–30px) | 700 | Section titles, panel headers |
| Title | 20px | 600 | Card titles |
| Body | 15px | 400 | Descriptive text, paragraphs |
| Caption | 12px | 600 (labels) / 400 (meta) | ALL CAPS labels, timestamps |
| Mono | varies | 500–600 | Live data values, clocks, code |

### Rules

- Display headlines use `letter-spacing: -2px`; body is default
- ALL CAPS labels always use `letter-spacing: 0.08–0.12em`
- Data readouts (KWH, %, timestamps) always use `JetBrains Mono` at `--color-primary` or `--color-secondary`
- Line height: 1.05 (display) · 1.2 (headline) · 1.5 (body) · 1.0 (mono data)

---

## Spacing

Base unit: **4px**

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 4px | Icon padding, micro gaps |
| `--space-sm` | 8px | Inner tag gaps, tight stacks |
| `--space-md` | 16px | Default component padding |
| `--space-lg` | 24px | Card padding, section gaps |
| `--space-xl` | 40px | Major section breaks |
| `--space-2xl` | 64px | Hero padding, display areas |

### Grid

- **Desktop:** 12-column, 24px gutters, max-width 1100px
- **Tablet:** 8-column, 16px gutters
- **Mobile:** 4-column, 16px gutters, 20px outer margin

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Badges, spacing blocks |
| `--radius-md` | 12px | Cards, inputs, toasts |
| `--radius-lg` | 20px | Panels, modals, large cards |
| `--radius-pill` | 9999px | Progress bars, stat pills, buttons |

---

## Shadows

| Level | Value | Use |
|-------|-------|-----|
| Low | `0 1px 4px rgba(8,30,40,0.08)` | Cards, pills |
| Mid | `0 4px 16px rgba(8,30,40,0.10)` | Modals, dropdowns, control panels |
| High | `0 12px 40px rgba(8,30,40,0.16)` | Toasts, floating panels |

---

## Components

### Stat Pill
Pill-shaped container with a label and circular ring progress indicator. Core motif.

- Background: `--color-white`
- Border: `1.5px solid --color-subtle`; on hover: `--color-secondary`
- Label: DM Sans 600, ALL CAPS, `0.06em` tracked, `--color-ink`
- Ring track: `--color-subtle`; fill: primary / secondary / accent depending on context
- Value: JetBrains Mono 600, 11px, centered in ring

### Progress Bar

- Height: 10px
- Track: `--color-subtle`
- Fill: flat `--color-primary` (default), `--color-secondary` (active), `--color-accent` (warning)
- Radius: `--radius-pill`
- Animate width on mount: 800ms `cubic-bezier(0.22, 1, 0.36, 1)`

### Metric Card

- Surface: `--color-white`; border: `1px solid --color-subtle`
- Label: 11px, ALL CAPS, 0.1em tracked, `--color-mid`
- Live dot: 8px circle, `--color-secondary` (or `--color-accent` for warning), pulsing ring animation
- Value: JetBrains Mono 600, 36px, `--color-primary`
- Change indicator: 12px, `--color-secondary` (up) / `--color-accent` (down)
- Hover: `translateY(-2px)` + elevated shadow

### Toast Notification

- Background: `--color-primary`
- Text: `rgba(255,255,255,0.92)`
- Border-left: `3px solid --color-secondary` (info) or `--color-accent` (warning)
- Timestamp: JetBrains Mono 11px, `--color-secondary` or `--color-accent`
- Dismiss: `×` button, `rgba(255,255,255,0.35)` → white on hover
- Entrance: slide down + fade in, 400ms

### Dial / Clock

- Tick marks: major (`--color-primary`, 2px) / minor (`--color-subtle`, 1px), staggered fade-in
- Center dot: `--color-primary` outer, white inner
- Time: JetBrains Mono 600, 42px, `--color-ink`, `letter-spacing: -1px`
- Label: Mono 10px, ALL CAPS, 0.14em tracked, `--color-mid`

### Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `--color-primary` | white | — |
| Secondary | transparent | `--color-primary` | `1.5px solid --color-primary` |
| Accent | `--color-accent` | white | — |
| Ghost | transparent | `--color-mid` | — |

All buttons: `--radius-pill`, DM Sans 600, 13px, `letter-spacing: 0.04em`, `padding: 10px 22px`
Hover: Primary darkens to `--color-ink`; all lift `translateY(-1px)`

### Badges / Chips

Padding: `4px 10px` · Radius: `--radius-pill` · Font: DM Sans 600, 11px, ALL CAPS, `0.06em` tracked

| Variant | Background | Text |
|---------|-----------|------|
| Primary | `rgba(12,82,109,0.10)` | `--color-primary` |
| Secondary | `rgba(97,212,251,0.18)` | `#097BA0` |
| Accent | `rgba(247,153,141,0.18)` | `#C45347` |
| Neutral | `--color-subtle` | `--color-mid` |

### Inputs

- Background: `--color-white`; border: `1.5px solid --color-subtle`; radius: `--radius-md`
- Focus: border `--color-primary` + `box-shadow: 0 0 0 3px rgba(12,82,109,0.10)`
- Label: DM Sans 600, 12px, ALL CAPS, `0.06em` tracked, `--color-mid`

---

## Motion & Animation

- **Default easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — smooth mechanical deceleration
- **Durations:** 150ms (micro) · 300ms (default) · 500ms (emphasis) · 800ms (progress/ring fills)
- **Ring fills:** stroke-dashoffset animation, 800ms
- **Dial ticks:** staggered fade-in, 18ms delay per tick
- **Toast:** slide-in from top, 400ms
- **Cards:** `translateY(-2px)` on hover, 250ms

**Principles:**
- Motion feels physical and mechanical — not bouncy
- Only animate `transform` and `opacity` (GPU-composited)
- Always respect `prefers-reduced-motion`

---

## Dark Surface

Use `--color-primary` as the dark background. Override tokens:

| Property | Value |
|----------|-------|
| Card background | `rgba(255,255,255,0.06)` |
| Card border | `rgba(97,212,251,0.15)` → `rgba(97,212,251,0.35)` on hover |
| Label text | `rgba(97,212,251,0.70)` |
| Value text | `--color-secondary` |
| Body / sub text | `rgba(255,255,255,0.40–0.45)` |

---

## Iconography

- Line weight: 1.5px
- Style: rounded caps, geometric forms
- Sizes: 16px (inline) · 20px (UI actions) · 24px (nav)
- Color: always `currentColor`
- Recommended set: **Lucide Icons**

---

## Voice & Tone

Informative, warm, direct. Inspired by the Daylight Savings notification pattern.

- Lead with the action or change: *"We adjusted settings…"* not *"Regarding your settings…"*
- End with the human benefit: *"Good stuff — you'll get an extra hour of sleep!"*
- Use contractions. Avoid jargon.
- Numbers are precise: `190KWH`, not `approximately 190 kilowatt hours`

---

*Saveyojob Design System — v1.1*
