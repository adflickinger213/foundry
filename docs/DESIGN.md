# The Foundry HQ — Design System

## Palette (light cottagecore)

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#FAF7F2` | Primary background |
| `cream` | `#F5EFE6` | Secondary surface, tag pills |
| `beige` | `#EDE0D0` | Tertiary, borders |
| `card` | `#FDFBF7` | Card backgrounds |
| `ink` | `#4A3F3A` | Body text |
| `soft` | `#857668` | Secondary text, icons |
| `line` | `#E7DCCB` | Borders, dividers |
| `terracotta` | `#C4785A` | Primary accent, CTAs |
| `sage` | `#8FAF8A` | Success states, explored |
| `rose` | `#D4A5A5` | Soft accent |
| `gold` | `#C9A84C` | Progress ring, sparkles |
| `lavender` | `#C5B8D4` | Active tag pills |
| `mushroom` | `#9E8E7E` | Muted labels |

Chapter accent colors rotate through: terracotta → sage → rose → gold → lavender → mushroom.

## Typography
- **Display (h1, h2, chapter numbers):** Cormorant Garamond, 500/600 weight
- **Body:** Inter, 400/500/600
- Self-hosted via `@font-face` in `globals.css`; no CDN dependency

## Spacing & shape
- Rounded corners: `rounded-2xl` minimum on cards, `rounded-full` on buttons/inputs
- Shadow: `shadow-soft` (cards in lists), `shadow-card` (primary focus card)
- Padding: generous — `p-5` or `p-6` inside cards

## Motion (Framer Motion)
- Page/view transitions: fade + 6px upward shift, 220ms
- Chapter row entrance: staggered 40ms per row
- NoteCard expand: height animation, 200ms
- Toast: fade + 10px rise, 200ms
- All motion wrapped in `prefers-reduced-motion` checks in `globals.css`

## ADHD-first UX rules (from cognitive-design skill)
- Default view is never blank — always shows the resume card
- One primary action visible at a time (save note, mark explored, open chapter)
- Completions register visually (sage background, checkmark, toast)
- Resume-in-5-seconds: last chapter persisted, opens directly on ResumeCard
- No guilt nudges, no mandatory fields, no confirmation dialogs on low-stakes actions
- Max 3 decisions visible at once
