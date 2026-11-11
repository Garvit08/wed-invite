# Bride invitation card

This checkout is the separate bride-side invitation on branch `bride-invitation-card`.

## Preserve the groom card

The groom card is preserved in the sibling `wedding-invitation` checkout at local commit `0d381b8`, and named branch `groom-garvit-invitation-card`. Do not edit that checkout, merge this branch into its main branch, or deploy this branch over the live groom GitHub Pages invitation.

The managed worktree helper could not use the nested repository, so this is a separate Git checkout. Use this checkout explicitly for all bride-side edits. Groom preview: port4173. Bride preview: port4174.

## Bride content

- Bride-first names: Yogita Khandelwal and Garvit Khandelwal. Preserve Crimson design, Ranjha flute background music and the approved Haldi animation.
- 3 December2026 IST: Phulo ki Bahar (Haldi),11AM only. No Chaak-Bhaat.
- 4 December2026 IST: Welcome of Baarat12:30PM; Lunch1:15PM; Phere3:15PM; Reception7:15PM. Welcome replaces groom-side Departure of Baarat11:15AM.
- Wedding-day venue: Infinity Resorts & Farms, Alwar, Rajasthan. Pre-wedding venue and end times are unspecified; do not invent them.
- Five events, six calendar downloads including combined. Bride calendars use the `yogita-garvit` prefix.
- Welcome illustration includes Yogita's Papa, Mom, brother and ONE sister (last two supplied photos depict the same sister), welcoming Garvit and a visible arriving procession with dhol players. No duplicate sister. Match personalized faces and existing painterly style. Original reference photos stay outside public assets and GitHub.
- Latest welcome master: `design/event-illustrations/welcome-baarat-bride-v2.png`; public asset: `public/assets/events/welcome-baarat-bride.webp`. Built-in image generation was used; exact edit prompt is saved beside the master. Design masters are ignored locally; optimized public asset is committed.
- Keep event details blended into artwork with accessible text, viewport-aware muted video, pause control and reduced-motion support. No fake video players for stills.
- Opened-cover button uses normal layout flow beneath names to avoid overlapping them.

## Validation and publication

Run `npm run test:invitation` and `npm run build` for schedule/source changes. Browser-check the independent preview. The `.github/workflows/deploy.yml` on THIS branch only validates on pushes to `bride-invitation-card`; it has no Pages deployment permissions or deploy steps. Preserve that separation. Do not publish to a separate public hosting destination unless requested.

Source files live in `src/`. Preserve `.openai/hosting.json`, Worker helpers and Sites compatibility files. No RSVP backend is configured.
