# Prototype Instructions

## Wedding invitation decisions

- Current selection: **Crimson Heirloom** is the final direction. Remove the comparison switcher from guest UI; old query parameters also resolve to Crimson. Other draft assets remain archived. Primary visual target: `design/drafts/option-1.png`.
- New events on 3 December 2026 (IST): Phulo ki Bahar (Haldi) 11:00 AM and DJ Night 7:00 PM. Keep the four 4 December events unchanged. Group schedule by date; pre-wedding venues have not been provided.
- Event sections must show details first, then their approved personalized video illustration. Haldi and DJ Night feature the couple with family; Baarat features Garvit only. Store media/casting in `src/event-films.js`; render no fake/empty player before real clips exist. Couple photos remain pending.
- The user found the first version too basic. Inspirations were directly viewed from Instagram reels `DdG8v5Yt_cG` (Webgency: embossed burgundy seal opening, ornate arch, swans, calligraphy) and `DdMF_C_Jozg` (MemoriaLink: ivory Indian florals, gold Ganesha, ceremonial content panels). Captured references are in `design/inspiration/`.
- Build full opening interactions: image-backed split envelope panels for Crimson, cinematic palace zoom for Royal, image-backed hinged doors for Ivory; share identical accurate wedding data but theme the revealed content. Respect reduced motion and use generated raster art instead of CSS artwork.
- The comparison toolbar was removed after Crimson was chosen; the header now shows the couple and celebration dates with Replay and flower pause controls.
- User requested flower sprinkles and personalized bride-and-groom animation. Add generated rose-petal/jasmine particle overlays with a pause control and reduced-motion support. Personalized couple animation is pending user-provided photos; do not fabricate their appearance or claim that a video has been created.

- Responsive English wedding website for GitHub Pages; use the web runtime, not a device-framed app.
- Selected visual: `design/reference.png`, floral ivory/forest-green/gold with Rajasthan courtyard storytelling and a wax-sealed envelope interaction.
- Garvit Khandelwal and Yogita Khandelwal. Wedding: 4 December 2026. Venue: Infinity Resorts & Farms, Alwar, Rajasthan.
- Schedule (IST): Departure of Baarat 11:15 AM, Lunch 1:15 PM, Phere 3:15 PM, Reception 7:15 PM. End times and Baarat departure location have not been supplied; do not invent them.
- No backend or RSVP submission requested. Keep guest-facing copy free of implementation notes.
- User refinement: shorten the cover, reduce top padding and empty lower courtyard, and position the envelope a little lower. Cover now uses 853:1575 instead of 853:1844, with desktop sizing constrained to viewport height.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
- Music requested: match Instagram reel DdMF_C_Jozg (previously attributed to Parvati by Sadhu Tiwari). Exact audio file is pending; src/InvitationMusic.jsx contains inactive playback wiring. Enable after supplying recording; starts on seal click, loops, has pause/resume control, pauses in background. Do not claim music is audible before adding the asset.
- Music asset now added: public/audio/parvati-reel.m4a, downloaded directly from the selected reel audio stream (Sadhu Tiwari — Parvati), 333113 bytes. It is enabled in InvitationMusic.jsx; the prior pending-audio note is superseded.
