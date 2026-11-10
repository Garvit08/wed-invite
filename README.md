# Garvit & Yogita — Wedding invitation

## Current version: Crimson Heirloom

The couple selected **Crimson**. The guest page now shows the burgundy/gold invitation directly, without the draft selector. Celebrations span **3–4 December 2026**. Haldi and Chaak-Bhaat (Mayra) are grouped on 3 December; the four wedding-day events remain on 4 December. The map identifies the 4 December wedding venue only; pre-wedding locations have not been supplied.

All six events are immersive illustrated sections: each background blends into Crimson behind the event title, time, and calendar link. Haldi uses the approved five-second personalized animation (~1.1 MB), silently playing in view with a discreet pause/play button and a static poster for reduced-motion visitors. The other five use personalized WebP illustrations while their videos are pending. Chaak-Bhaat features Garvit receiving tilak from Bade Mama, with Chote Mama seated on his other side. Baarat features Garvit dancing with Papa, Mom, Tauji and Taiji; Mom and Taiji wear coordinated lehengas. `src/event-films.js` defines the media and casting; `src/EventFilm.jsx` manages background playback. Original reference photos are excluded from public assets.

Background music is the couple-selected [Ranjha flute cover by Divyansh Shrivastava](https://www.youtube.com/watch?v=N9OOJjfTjM8), optimized as a local AAC file with silent padding removed and gentle fades. It starts on the seal gesture, loops, and can be paused from the header.

See [VIDEO-ILLUSTRATIONS.md](VIDEO-ILLUSTRATIONS.md) for the free-tool shortlist, scene briefs, casting rules, and production workflow.

## Archived exploration: three interactive first drafts

The initial exploration included these directions; their artwork is retained for reference, while guest URLs now resolve to Crimson:

- `?draft=1`: **Crimson Heirloom**, burgundy embossed envelope and a gold wax seal. The two image-backed panels open outward.
- `?draft=2`: **Royal Vows**, palace arch, calligraphy, floral lake and swans, with a cinematic zoom reveal.
- `?draft=3`: **Ivory Blossom**, floral illustrated doors, Ganesha emblem, and a tasselled medallion with hinged-door reveal.

Use **Replay** to restart the Crimson opening. All artwork/fonts are local. Reduced-motion users receive an immediate reveal. The combined calendar now contains all six events, with six individual event calendars.

The draft toolbar has been removed. The archived source images are `design/drafts/option-1.png` through `option-3.png`. Original reel screenshots are in `design/inspiration/`. The palace/mandap images are illustrative, not photographs of the actual venue.

The invitation also includes a gentle rose-petal/jasmine drift and a short flower shower during opening. The pause button hides and pauses the flower effects; reduced-motion users receive no particle animation. Particles use local raster artwork and cannot intercept clicks.

An English, responsive wedding invitation for **4 December 2026**, at **Infinity Resorts & Farms, Alwar, Rajasthan**. Built with React and Vite; no server, credentials, or paid services required at runtime.

## Included

- Floral ivory, forest green, and gold invitation with Rajasthan-inspired artwork.
- Animated envelope reveal, live countdown, and responsive celebration schedule.
- Six individual calendar downloads, plus a combined celebration calendar. All start times preserve IST.
- Venue search in Google Maps, invitation-link copying with a manual-copy fallback, keyboard focus states, and reduced-motion support.
- Local fonts and optimized WebP illustrations; no external font or image requests.

## Schedule

| Event | Date and time (IST) |
| --- | --- |
| Phulo ki Bahar (Haldi) | 3 December 2026 · 11:00 AM |
| Chaak-Bhaat (Mayra) | 3 December 2026 · 3:15 PM |
| Departure of Baarat | 4 December 2026 · 11:15 AM |
| Lunch | 4 December 2026 · 1:15 PM |
| Phere | 4 December 2026 · 3:15 PM |
| Reception | 4 December 2026 · 7:15 PM |

No end times or Baarat departure point were provided, so calendar entries do not invent them. The map action searches the supplied venue name; it does not assert a verified pin. The courtyard is illustrative artwork, not a photograph of the venue. Countdown targets midnight at the start of the wedding day in IST.

## Local preview

```sh
npm ci
npm run dev
```

## Publish on GitHub Pages

1. Create a GitHub repository and put the **contents of this folder** at its root, including `.github/workflows/deploy.yml`, `package.json`, and `package-lock.json`. Do not upload `node_modules` or `dist`.
2. Push to `main`.
3. In the repository, select **Settings → Pages → Source → GitHub Actions**.
4. The included workflow builds and publishes `dist/client`. Open its deployment URL after the action succeeds. If the first workflow ran before Pages was enabled, rerun it from Actions.

`base: './'` keeps assets relative so the site can work under a repository path as well as a custom domain. This workflow follows [Vite's GitHub Pages deployment guidance](https://vite.dev/guide/static-deploy#github-pages), with this project's static output directory substituted.

No repository has been created or published by the local build. To use an existing repository with this project in a subfolder, update the workflow's working directory, lockfile cache path, and artifact path accordingly.

## Edit details

- `src/wedding.js`: date, schedule, venue, and map destination.
- `src/App.jsx`: invitation wording and cover names/date.
- `index.html`: browser title and link-preview descriptions.
- `src/styles.css`: colors, layout, typography, and motion.
- `design/reference.png`: selected visual reference.

If you change the wedding date, update both the cover/metadata and the event timestamps. No RSVP form or backend is configured. Add a real form destination before collecting responses.

## Validation and build

```sh
npm run test:invitation
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The tests verify timezone conversion, all six event times across both days, calendar IDs, escaping, UTF-8 line folding, date grouping, and family event casting. The production website is in `dist/client`. Extra Worker output from the bundled starter is unused by GitHub Pages.
