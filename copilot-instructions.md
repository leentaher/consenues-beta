# New Consensus — Cursor Rules
# These rules apply to every file in this project.

## Design System
- Always import and use variables from `tokens.css` (or equivalent tokens file).
- NEVER hardcode color values. Use CSS variables: var(--accent), var(--bg-base), var(--text-body), etc.
- The accent color (var(--accent)) rotates on refresh — always reference the variable, never a hex value like #7c6fff.

## Typography
- Font family is monospace everywhere: var(--font-base) = 'Courier New', Courier, monospace.
- No sans-serif or serif fonts unless explicitly requested.
- Three-level text hierarchy must be preserved in every section:
    1. Eyebrow: 11px / uppercase / letter-spacing 0.12em / color: var(--text-accent)
    2. Heading: var(--text-h1-size or --text-h2-size) / white / bold
    3. Body: var(--text-body-size) / color: var(--text-body) = rgba(255,255,255,0.65)
- Bold callouts inside body text: font-weight 700, color: var(--text-primary).

## Colors
- Background: var(--bg-base) = #0f0f0f
- Card background: var(--bg-card) = rgba(255,255,255,0.02)
- Card border: var(--border-card) = 1px solid rgba(255,255,255,0.08)
- CTA links: color: var(--accent), display: inline-block, margin-top: var(--space-body-to-cta)
- CTA buttons: background: var(--accent), color: #0f0f0f, no border-radius

## Spacing
- Eyebrow → Heading gap: margin-bottom: var(--space-eyebrow-to-heading) = 12px
- Heading → Body gap: margin-bottom: var(--space-heading-to-body) = 20px
- Body → CTA gap: margin-top: var(--space-body-to-cta) = 28px
- Section headline → grid: margin-bottom: var(--space-section-headline-to-grid) = 40px
- Grid column gap: var(--space-grid-gap) = 40px
- Card stack gap: var(--space-card-gap) = 24px
- Card padding: var(--space-card-padding) = 28px on all sides
- Featured block: padding top/bottom 48px, right 48px, left 28px

## Components
- Featured/primary card: left accent rail only (border-left: var(--border-accent-rail)), NO full border box
- Secondary cards: bg: var(--bg-card), border: var(--border-card)
- Grid layout for featured + cards: grid-template-columns: var(--grid-featured) = 1.2fr 1fr
- Border radius: 0 everywhere — hard edges, no rounding
- No gradients, no drop shadows, no blur effects

## Rules
- If you see a hardcoded hex color in a component, replace it with the appropriate CSS variable.
- If you see border-radius > 0, remove it unless explicitly asked to add rounding.
- If you see a sans-serif font, replace it with var(--font-base).
- Every new section must use the three-level typography hierarchy.
- Every new CTA link must use var(--accent) and display: inline-block.
