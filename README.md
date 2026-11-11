# Bride invitation card — Yogita & Garvit

Separate bride-side card on `bride-invitation-card`, based on the saved **Groom (Garvit) invitation card** at commit `0d381b8` / branch `groom-garvit-invitation-card`.

The original groom checkout and live GitHub Pages invitation are preserved. This branch's workflow only validates; it does not deploy over the groom site.

## Bride schedule (IST)

| Date | Function | Time |
| --- | --- | --- |
| 3 December 2026 | Phulo ki Bahar (Haldi) | 11:00 AM |
| 4 December 2026 | Welcome of Baarat | 12:30 PM |
| 4 December 2026 | Lunch | 1:15 PM |
| 4 December 2026 | Phere | 3:15 PM |
| 4 December 2026 | Reception | 7:15 PM |

Chaak-Bhaat is omitted. Welcome of Baarat replaces Departure of Baarat. The welcome illustration shows Yogita's Papa, Mom, brother and sister receiving Garvit and the arriving procession. The other wedding-day details, Crimson visual theme, approved Haldi animation and Ranjha flute music remain.

Original family photographs are excluded from public assets. The two supplied sister photos depict one person.

## Independent local preview

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4174
```

The groom preview uses port4173; do not replace its files or server.

```sh
npm run test:invitation
npm run build
```

Production output: `dist/client`. Save or deploy this branch independently only; do not merge it into the groom main branch without a new request.
