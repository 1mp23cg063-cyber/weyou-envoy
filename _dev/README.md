# enVoy by weYou X

> The complete WhatsApp AI communication system for inbound businesses.
> Captures every enquiry, understands the customer in the first message, replies in your voice, books, negotiates, follows up, retains — 24×7, in Hindi, English & Kannada.

**Live**: [weyouenvoy.com](https://weyouenvoy.com)
**Parent**: [weYou X](https://weyoux.com)
**Sibling products**: [LegalIndia.ai](https://legalindia.ai), [weYou World](https://weyouworld.com)

---

## What this repo contains

A static landing site for enVoy — single-file HTML with inline CSS/JS, plus GEO/SEO infrastructure files.

| File | Purpose |
|---|---|
| `index1.html` | Home page (the working file — design, copy, schema all inline) |
| `llms.txt` | Plain-text summary for LLM crawlers (ChatGPT, Claude, Perplexity, etc.) |
| `robots.txt` | Crawler rules — explicitly allows all major AI search bots |
| `sitemap.xml` | Page index for search engines |
| `BRIEF.md` | Captured user intent / project brief |
| `ADOPTED.md` | Decisions shipped, with reasoning |

Per-industry pages will be added: `medical.html`, `schools.html`, `spas.html`, `realestate.html`, `hotels.html`, `others.html`.

---

## Design principles

1. **Reality over show-off.** Defensible specifics, not marketing superlatives. Google rewards reality.
2. **Customer search intent.** Copy mirrors what real prospects type into Google and AI search.
3. **Elegance with restraint.** Light type weights, persistent thin accents, generous whitespace.
4. **Centered everywhere except hero.** Hero is the only directional section (CTA + narrative); the rest is informational and centered.

---

## Local preview

This is a single static file. Open it directly:

```bash
open index1.html
```

Or serve it for accurate base-path testing:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/index1.html
```

---

## Conventions

- Conventional commit messages: `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `refactor:`.
- Keep CSS variables (`--gold-500`, `--indigo-deep`, etc.) — they make the design portable to child pages.
- Schema lives in a single `<script type="application/ld+json">` graph at the top of `<head>` — one identity, no duplicates. See `ADOPTED.md` §4 for the graph structure.

---

## License

© 2026 weYou X. All rights reserved.
