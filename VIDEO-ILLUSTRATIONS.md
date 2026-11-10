# Personalized wedding video illustrations

Crimson Heirloom is selected. Scene planning is ready; actual personalized character assets and videos are awaiting photos. No generic faces are being presented as Garvit or Yogita.

## Event scenes and casting

Event details appear before the scene in each section. Keep character identity, outfits, linework, and warm burgundy/ivory/gold art direction consistent throughout.

| Event | Date / IST | Cast | Proposed 6–8-second action |
| --- | --- | --- | --- |
| Phulo ki Bahar (Haldi) | 3 Dec, 11:00 AM | Garvit + Yogita, family | Couple seated in yellow/ivory festive outfits, family gently applying Haldi and showering flowers; petals drift across the frame. |
| DJ Night | 3 Dec, 7:00 PM | Garvit + Yogita, family | Couple dancing together with family celebrating behind them, warm party lighting, graceful arm and body movement. |
| Departure of Baarat | 4 Dec, 11:15 AM | **Garvit only as the principal character** | Garvit in groom attire celebrating the Baarat departure. Do not include Yogita. Supporting procession guests may be generic background figures if approved. |
| Lunch | 4 Dec, 1:15 PM | Couple + family | A warm celebratory meal, shared laughter and gentle gestures. |
| Phere | 4 Dec, 3:15 PM | Garvit + Yogita | Couple taking sacred steps around the ceremonial fire, cloth/garland motion and a restrained warm glow. |
| Reception | 4 Dec, 7:15 PM | Garvit + Yogita, family | Couple welcoming loved ones, gentle greeting gestures and celebratory flowers. |

The precise physical appearance of identifiable family members requires their photos too. Otherwise use non-identifiable background guests rather than inventing family likenesses. Baraat departure point and pre-wedding venues remain unspecified. End times are unspecified.

## Verified tool shortlist

Researched on 31 October 2026. Costs, credits and model access can change.

| Tool | Useful for | Free status and practical constraint |
| --- | --- | --- |
| [Official Remotion agent skill](https://skills.sh/remotion-dev/skills/remotion-best-practices) + [Remotion](https://www.remotion.dev/docs/ai/skills) | Timing illustrated layers, transitions, particles, captions and final MP4 rendering | Official skill is available publicly; Remotion has a [free individual-use license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md). It is a video composition/rendering engine, not an AI character-performance model. Catalog search reported about 716.9K installs; official skill repository about 5.9K stars. |
| [ComfyUI + Wan2.2](https://docs.comfy.org/tutorials/video/wan/wan2_2) with [official Comfy MCP](https://github.com/Comfy-Org/comfy-mcp) | Image-to-video character motion: applying Haldi, dancing, walking, fabric movement | Open-source local software/model route, subject to their licenses. The ComfyUI 5B guide describes native offloading for 8 GB VRAM. Comfy MCP's local license is AGPL/commercial dual-license. Hardware and any rented/cloud GPU still have a cost. This PC reports Intel Iris Xe integrated graphics, so substantial local video-model downloads are not recommended here. |
| Runway plugin | Cloud reference-image-to-video generation without a local diffusion GPU | Found in the plugin directory, currently unconnected. Its [free plan](https://runway.com/pricing) offers 125 one-time credits for selected tools; this is a trial budget, not unlimited free rendering. Model availability must be checked after connection. |

The plugin search also found Higgsfield, which can animate references; no verified free generation allowance was established, so it is not presented as a free option. Searches are not exhaustive; more connectors may appear in the plugin directory.

Official Remotion skill installation command (listed, **not installed** by this work):

```sh
npx skills add remotion-dev/skills --skill remotion-best-practices
```

## Proposed production workflow

1. Obtain clear front-facing portraits and full-length references for both people, plus outfit/color preferences. For identifiable family cameos, obtain relevant family references.
2. Create one approved illustrated character sheet of each person using the reference photos. Keep face, proportions, jewelry and outfits consistent across scenes.
3. Create and approve an event-specific keyframe with the correct cast. Use an image-to-video model for actual Haldi/dance/walking actions; reference photos alone do not guarantee perfect identity or hand anatomy, so review the generated clips before inclusion.
4. Assemble, color-match, trim, and loop the approved motion with Remotion. Target short 720p H.264 MP4 clips, `yuv420p`, web-optimized metadata, no required soundtrack; retain posters and optional WebM variants. Keep scene text in the webpage so times and names remain editable and accessible.
5. Place approved files under `public/videos/` and posters under `public/assets/events/`. Set the six entries in `src/event-films.js`; the existing player appears below each event's details and plays when sufficiently in view, pauses when leaving, and respects reduced motion.
6. Verify likeness, groom-only Baarat casting, event-specific action, mobile playback, loop seams, layout, and bandwidth before publishing to GitHub Pages.

No AI video service is currently connected, no model weights were downloaded, and no paid generation was started. The website itself remains a static GitHub Pages project.
