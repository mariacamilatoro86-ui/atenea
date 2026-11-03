---
name: Atenea Nocturna
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#373940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#191b21'
  surface-container: '#1d1f26'
  surface-container-high: '#282a30'
  surface-container-highest: '#33353b'
  on-surface: '#e2e2ea'
  on-surface-variant: '#dcc1b7'
  inverse-surface: '#e2e2ea'
  inverse-on-surface: '#2e3037'
  outline: '#a38c83'
  outline-variant: '#55433c'
  surface-tint: '#ffb598'
  primary: '#ffb598'
  on-primary: '#591c00'
  primary-container: '#e07a4f'
  on-primary-container: '#561b00'
  inverse-primary: '#9a451e'
  secondary: '#fcb887'
  on-secondary: '#4e2601'
  secondary-container: '#6c3d17'
  on-secondary-container: '#ecaa7a'
  tertiary: '#dec2a7'
  on-tertiary: '#3e2d1a'
  tertiary-container: '#aa9179'
  on-tertiary-container: '#3c2b18'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb598'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7c2e08'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#fcb887'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#693b15'
  tertiary-fixed: '#fbddc2'
  tertiary-fixed-dim: '#dec2a7'
  on-tertiary-fixed: '#271908'
  on-tertiary-fixed-variant: '#56432f'
  background: '#111319'
  on-background: '#e2e2ea'
  surface-variant: '#33353b'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: 0em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: 0em
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 21px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0em
  body-lg:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts a private, candlelit sanctuary for deep reading, archival curation, and scholarly contemplation during nocturnal hours. Drawing inspiration from classical private libraries, bespoke editorial binding, and modern digital readers, the interface eliminates harsh light emission while maintaining uncompromising typographic authority.

The aesthetic fuses **Editorial Minimalism** with **Warm Tonal Layering**:
- **Atmosphere:** An intimate room lined with aged vellum, dark walnut shelves, and amber reading lamps. Surfaces are deep charcoal and midnight slate rather than sterile pure blacks.
- **Tone:** Scholarly, contemplative, tranquil, and tactile.
- **Visual Tenets:** High legibility without optic fatigue, subtle warm luminescences instead of harsh projected lights, disciplined hairline dividers, and deliberate literary hierarchy led by classical serif titles and disciplined sans-serif metadata.

## Colors

The nocturnal palette is built around low-glare charcoal foundations, warm parchment inks, and smoldering terracotta and amber highlights.

### Palette Architecture
- **Surface Dark Ground (`#121316`):** The primary canvas ground; absorbs backlighting and calms the eye during pitch-black ambient viewing.
- **Surface Elevation 1 (`#1a1c22`):** Midnight slate surface for cards, shelves, and reading containers.
- **Surface Elevation 2 (`#23262f`):** Raised floating panels, contextual popovers, active drawer slates.
- **Primary Ink / High Contrast Parchment (`#e6e1d6`):** Soft, non-glare off-white text tone providing radiant contrast against charcoal without triggering photophobia.
- **Secondary Ink / Muted Vellum (`#c5bfb2`):** Supporting editorial text, metadata, footnotes, and secondary labels.
- **Muted Archival Slate (`#75726b`):** De-emphasized timestamps, inactive indicators, and book metadata keys.
- **Primary Accent (`#e07a4f`):** Terracotta ember used for primary interactive states, bookmark callouts, selection highlights, and prominent reading progress indicators.
- **Secondary Accent (`#d49567`):** Warm burnished gold/amber used for secondary badges, annotations, quotes, and star ratings.
- **Luminous Rim Stroke (`rgba(224, 122, 79, 0.18)` / `rgba(230, 225, 214, 0.08)`): Delicate perimeter strokes providing structural definition against deep backdrops.

## Typography

The typographic system creates an interplay between long-form literary immersion and rigorous catalog clarity.

- **EB Garamond:** Deployed for all literary headings, book titles, drop caps, long-form passage reading (`body-lg`), and pull-quotes. Its classical proportions evoke centuries of fine printing. Generous line height (1.6x on body passages) prevents eye strain during extended reading in low-light environments.
- **Inter:** Serves as the functional counterweight. Applied to library controls, search inputs, chapter indices, reading telemetry, navigation, and badges. Its neutral clarity grounds the expressive historic serif, ensuring immediate legibility at compact dimensions.

## Layout & Spacing

The layout balances spacious margins for focus with structured grid arrays for book collections and archival catalogs.

- **Desktop (12-column fixed-max):** Content maxes out at `1280px` for catalog views and `760px` for reading streams. Gutter is `1.5rem` (`24px`), section outer margins are `3rem` (`48px`).
- **Tablet (8-column fluid):** Gutter is `1.5rem` (`24px`), margins scale to `2rem` (`32px`).
- **Mobile (4-column fluid):** Gutter tightens to `1rem` (`16px`), canvas edge margins to `1.25rem` (`20px`).

### Vertical Rhythm & Reading Columns
Long-form reader views enforce an optimal reading width of 60–75 characters per line (`body-lg`), centered within the dark slate canvas to simulate an open manuscript held under warm ambient light.

## Elevation & Depth

To avoid harsh contrast breaks, this design system completely eschews intense black drop shadows. Depth is established through **tonal canvas stepping**, **luminous ambient embers**, and **hairline edge rings**:

1. **Ground Tier (Canvas):** `#121316` — Absorptive base canvas with zero elevation.
2. **First Tier (Cards & Folios):** `#1a1c22` bordered with a 1px border of `rgba(230, 225, 214, 0.07)`. Subtle ambient shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.45)`.
3. **Second Tier (Active Popovers & Modals):** `#23262f` bordered with a warm luminous ring: `1px solid rgba(224, 122, 79, 0.22)`. Ambient glow: `0 16px 36px -6px rgba(0, 0, 0, 0.65), 0 0 16px 0 rgba(224, 122, 79, 0.06)`.
4. **Accent Glow (Focus & Selection):** Active reading highlights, selected chapters, and focused inputs receive a delicate terracotta perimeter aura (`box-shadow: 0 0 0 1px #e07a4f, 0 0 12px rgba(224, 122, 79, 0.25)`).

## Shapes

The shape hierarchy is intentionally restrained to reflect bound book covers, bookplates, and card catalog drawers.

- **Base Corner Radius (`roundedness: 1`):** `0.25rem` (`4px`) on badges, chips, and small inputs.
- **Medium / Container Radius (`rounded-lg`):** `0.5rem` (`8px`) on book cover thumbnails, reading panels, and catalog cards.
- **Large Radius (`rounded-xl`):** `0.75rem` (`12px`) reserved for modal dialogs and overlay sheets.

Sharp geometry evokes the crisp edges of trimmed vellum and hardbound spines, avoiding overly rounded, bubbly forms that detract from a scholarly atmosphere.

## Components

### Buttons
- **Primary:** Filled with Terracotta Ember (`#e07a4f`), typography in dark slate (`#121316`, `Inter`, `600`), subtle border `1px solid #d49567`. On hover, color transitions to `#d49567` with a soft terracotta rim glow.
- **Secondary / Ghost:** Surface `#1a1c22`, 1px border `rgba(230, 225, 214, 0.12)`, text `#e6e1d6`. On hover, border shifts to `rgba(224, 122, 79, 0.4)` and background brightens to `#23262f`.
- **Text Button:** Minimal, muted parchment (`#c5bfb2`) with underline animation accented in `#e07a4f`.

### Cards & Book Displays
- **Book Folio Cards:** Midnight slate background (`#1a1c22`), framed by a soft luminous border (`1px solid rgba(230, 225, 214, 0.06)`). Hover introduces a subtle warm elevation: border shifts to `rgba(224, 122, 79, 0.25)` with a faint candlelit aura (`0 8px 24px rgba(224, 122, 79, 0.08)`).
- **Metadata Layout:** Serif titles in `headline-sm` (`#e6e1d6`), author and metadata in `body-sm` (`#c5bfb2`).

### Chips & Badges
- Compact `0.25rem` radius. Background `rgba(35, 38, 47, 0.8)`, border `1px solid rgba(212, 149, 103, 0.2)`. Label typography in `label-sm` with text rendered in `#d49567`.

### Inputs & Search
- Inputs feature background `#14161a` inset with `1px solid rgba(230, 225, 214, 0.1)`. Placeholder in `#75726b`. On focus, shifts to border `#e07a4f` with a soft terracotta ember glow (`0 0 0 1px #e07a4f, 0 0 8px rgba(224, 122, 79, 0.2)`).

### Selection Controls (Checkboxes & Radios)
- Base box `#1a1c22` with border `1px solid rgba(230, 225, 214, 0.2)`. When checked, background fills with `#e07a4f`, check icon renders in dark ground (`#121316`).

### Lists & Chapter Indexes
- Clean, horizontal dividers using `1px solid rgba(230, 225, 214, 0.06)`. Left accent notch (3px solid `#e07a4f`) marks the actively read chapter. Chapter numbers set in tabular Inter sans-serif; chapter titles set in `EB Garamond`.

### Reader Progress Bar & Bookmarks
- Track line rendered in `rgba(230, 225, 214, 0.08)`, active progress rendered in a solid gradient from `#e07a4f` to `#d49567`. Bookmark flags use the terracotta primary accent with an organic ribbon-inspired trim.