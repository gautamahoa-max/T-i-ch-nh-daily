# Design System: OCB Credit Card Premium Experience

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet warm — conveying financial trust while breaking away from generic banking templates. It relies on crisp typography, generous whitespace, and offset grid structures to create a premium, high-agency feel.

## 2. Color Palette & Roles
- **Canvas White** (#F9FAFB) — Primary background surface for breathing room
- **Pure Surface** (#FFFFFF) — Card and container fill
- **Charcoal Ink** (#18181B) — Primary text, Zinc-950 depth (No pure black)
- **Muted Steel** (#71717A) — Secondary text, descriptions, metadata
- **Whisper Border** (rgba(226,232,240,0.5)) — Card borders, 1px structural lines
- **OCB Forest** (#006633) — Single accent for CTAs, active states, focus rings (Desaturated from the bright OCB green for a more premium, muted tone)

## 3. Typography Rules
- **Display:** `Cabinet Grotesk` (or `Satoshi` via Fontsource) — Track-tight, controlled scale, weight-driven hierarchy. Bold and structural.
- **Body:** `Satoshi` — Relaxed leading, 65ch max-width, neutral secondary color.
- **Banned:** Inter, Roboto, generic system fonts. No serif fonts in this fintech UI.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile scale-down transform on active (spring physics). OCB Forest fill for primary. Sharp corners (rounded-sm) rather than pill-shaped.
* **Cards:** Minimalist. No drop shadows by default, only a 1px whisper border. Subtle Y-axis translation on hover. 
* **Images:** Embedded beautifully in asymmetric grids. No overlapping text on images.

## 5. Layout Principles
Grid-first responsive architecture. Asymmetric splits for Hero sections (text on one side, image offset on the other). Strict single-column collapse below 768px. Max-width containment (1200px). No 3-column or 4-column equal grids for features — use 2-column Zig-Zag or asymmetric masonry.

## 6. Motion & Interaction
Spring physics for all interactive elements (buttons, card hovers). Staggered cascade reveals on load. Transform and opacity animations only.

## 7. Anti-Patterns (Banned)
- No emojis
- No Inter font
- No pure black (#000000)
- No neon glows or heavy drop shadows
- No 3-column equal grids (banned layout cliché)
- No generic AI copywriting ("Elevate", "Seamless", "Next-Gen")
- No overlapping text on images (clean spatial separation always)
