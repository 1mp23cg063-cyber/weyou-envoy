# enVoy — What we adopted

Decisions made and changes shipped during the **2026-05-11** elegance + SEO/GEO refinement session.
Read this alongside [`BRIEF.md`](./BRIEF.md) for the *why* behind each change.

---

## 1. Design — elegance with restraint

### Hero
- **Reduced `enVoy` H1 size** from `clamp(72px, 12vw, 180px)` → `clamp(56px, 9vw, 128px)`. Logo no longer overpowers the page.
- Reduced **header logo** from `30px` → `26px` and shrank `by weYou X` byline from `10.5px` → `10px`. Header height: `84px` → `78px`.
- Refined hero supporting copy — tighter, more confident, no marketing puffery.
- Hero stays **left-aligned** (only section with directional energy — CTA + narrative push).

### Pillars — the previously dull section
- **Roman numerals (I / II / III)** as chapter marks instead of plain "01/02/03". Editorial feel, not stock-SaaS.
- **Persistent accent rail** at the top of each card (was hover-only) — restraint that rewards attention.
- **Centered heading area** (number, title, lede, divider) — list items stay **left-aligned** for readability.
- Title font weight dropped from `500` → `300` with the accent word at `500` — more typographic hierarchy.
- Added a `pillar-divider` hairline between the lede and the list — cleaner rhythm.
- Lede max-width capped at `280px` to force tight, punchy single-sentence statements.
- Hover state: accent rail **grows from 48px → 88px wide** and brightens.

### Centering rule (everything except hero)
- Verticals (Industries) — head/lede now **centered**.
- Pillars — head centered, cards centered.
- Slug, Proof, FAQ, Terms, Contact — already centered.

---

## 2. SEO — classical foundations

### Title & meta
- Title sharpened: `"enVoy — The Complete WhatsApp Sales & Communication System | weYou X"`.
- Meta description expanded with multilingual + industry coverage.
- `news_keywords` meta added for AI/news ingestion.
- `application-name`, `apple-mobile-web-app-title` for PWA hints.

### Keyword expansion (Semrush-style topical coverage)
Comprehensive `<meta name="keywords">` covering:
- **Brand variants**: enVoy, weYou, weYou X, weyouenvoy (and typo variants).
- **Entities**: WhatsApp AI, AI agent, AI chatbot, conversational AI, AI receptionist, AI sales agent, AI assistant.
- **Modifiers**: WhatsApp Business API, multilingual, vernacular, Hindi/English/Kannada.
- **Verticals**: clinics, hospitals, real estate, schools, hotels, spas — each with "WhatsApp AI for X".
- **Long-tail intents**: missed lead recovery, 24×7 customer support AI, channel partner pipeline AI, AI for missed calls.
- **Competitive terms**: AI agent vs chatbot, ChatGPT for WhatsApp.

### Heading hierarchy
- One `<h1>` (enVoy hero) — correct.
- Section `<h2>` for each major block (pillars, industries, proof, faq, terms, contact).
- Card titles `<h3>`. FAQ items `<h3>`.

### HTML standards
- Fixed **nested `<a>` bug** in header logo and footer logo (anchor inside anchor — invalid HTML).
- Added `aria-label` to nav, slug form, hamburger.
- Added `visually-hidden` utility for accessible form labels.
- `rel="noopener"` on external links.

---

## 3. GEO — AI search engine optimization

### `llms.txt`
Plain-text summary of what enVoy is, who it's for, pricing, languages, links — written for LLM crawlers (the emerging convention parallel to `robots.txt`). Lives at `/llms.txt`.

### `robots.txt` — explicit AI crawler allowances
Welcomes **GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Meta-ExternalAgent, Applebot-Extended, YouBot, CCBot, MistralAI-User, cohere-ai**. Disallows tracking-parameter URLs.

### `sitemap.xml`
All current + planned per-industry pages with hreflang.

### Visible FAQ section (#faq)
Mirrors the JSON-LD `FAQPage` schema with eight Q&As covering:
- AI agent vs chatbot
- vs ChatGPT / generic AI
- Pricing (revenue share)
- Time to live (7 days)
- Industries
- Multilingual
- CRM/inventory integration
- Who builds it (weYou X)

Each `<article>` carries microdata (`itemscope`, `itemprop`) so AI engines can extract answers even without the JSON-LD.

### Related Terms section (#terms)
A `<dl>` (definition list) glossary covering: WhatsApp AI agent, chatbot vs AI agent, conversational AI, AI receptionist, WhatsApp Business API, multilingual AI, inventory-aware chatbot, weYou X. Semantic HTML AI engines extract cleanly.

### Speakable spec expanded
Added `.pillar-card h3`, `.pillar-line`, `.faq-item h3`, `.faq-item p` so voice search assistants can read more of the page.

---

## 4. Schema — clean, hierarchical, parent-aware

### Adopted from the parent weYou X schema
- Use the **canonical `@id: "https://weyoux.com/#org"`** to reference the parent (not a redeclared inline org node).
- `parentOrganization: {"@id": "https://weyoux.com/#org"}` so Google's knowledge graph wires enVoy as a sibling of LegalIndia.ai and weYou World.
- `ProfessionalService` schema with `GeoCoordinates` (Bangalore) and `hasOfferCatalog` listing each industry as a `Service` offer.
- `priceRange: "Revenue share"`.
- Comprehensive `alternateName` arrays — including **Indian typo and Hinglish variants** (envoi, envoye, enway, en voy, plus Devanagari `एनवॉय` and Kannada `ಎನ್‌ವಾಯ್`).
- `sameAs` cross-linking to weYou X, LegalIndia.ai, weYou World.
- `contactPoint` with `availableLanguage: [English, Hindi, Kannada]`.

### Removed conflicts
- Dropped duplicate `Product` schema (we already have `SoftwareApplication`).
- Removed the **redeclared inline `weYou X` Organization** — now references the canonical `@id`.

### Graph entities (clean, no duplicates)
1. `Organization` — weYou X (referenced via canonical `@id`)
2. `Organization` — enVoy by weYou X (`parentOrganization` → weYou X)
3. `WebSite` — weyouenvoy.com
4. `WebPage` — homepage
5. `SoftwareApplication` — the enVoy product
6. `FAQPage` — 12 questions (mirrors visible FAQ)
7. `BreadcrumbList` — weYou X → enVoy
8. `Service` — enVoy WhatsApp AI service
9. `HowTo` — 7-day onboarding (5 steps)
10. `ProfessionalService` — Bangalore business with offer catalog

---

## 5. Reality-over-show-off principle

Saved as durable feedback memory for all weYou properties going forward:

- **Defensible claims only.** No "best", "leading", "world-class" without specifics. "7 days to live" beats "industry-leading onboarding".
- **Customer search language**, not internal marketing jargon.
- **Long-tail Q&A** mirrors how customers actually type into search and AI engines.
- **Indian search reality** — plausible typos and Hinglish covered (sparingly — 12 variants max in schema, more in body content).

---

## 6. Modularity for future per-industry pages

Per `BRIEF.md` §4, the page is being built as a **template** for:
- `medical.html` — clinics, hospitals, diagnostics
- `schools.html` — K-12, colleges, coaching
- `spas.html` — salons, spas, aesthetic
- `realestate.html` — developers, brokerages, channel partners
- `hotels.html` — resorts, boutique, homestays
- `others.html` — D2C, services, inbound

Decisions that protect modularity:
- CSS uses **CSS variables** (`--gold-500`, `--indigo-deep`, etc.) — lift to a shared stylesheet later.
- Section blocks (`.hero`, `.pillars`, `.verticals`, `.proof`, `.faq`, `.terms`, `.contact-section`) are **self-contained** — each child page reuses what it needs.
- JSON-LD `Service` for each industry already exists in `hasOfferCatalog` — child pages add their own deeper schema without overlap.
- Sitemap pre-lists all child page URLs.

---

## 7. Git — best-practice setup

- **`.gitignore`** — macOS, editors (VS Code, JetBrains, Cursor, Zed), Node, build output, env files, logs, coverage.
- **`README.md`** — project overview.
- **`BRIEF.md`** + **`ADOPTED.md`** — captured intent and decisions (this pair of files).
- Initial commit with **conventional-commit style** message.
- **Co-Authored-By: Claude Opus 4.7 (1M context)** trailer.

---

## Files created or modified

```
/Users/karthik/envoyw/
├── .gitignore              [new]
├── README.md               [new]
├── BRIEF.md                [project intent — kept up to date]
├── ADOPTED.md              [decisions log — this file]
├── llms.txt                [new — AI crawler summary]
├── robots.txt              [new — explicit AI bot allowances]
├── sitemap.xml             [new]
├── index1.html             [refined — design + SEO + GEO + schema]
└── index2.html             [solution-narrative rewrite + "envoy layer" positioning]
```

Originally mirrored to `/Users/karthik/Downloads/index_61.html`. After several iterations the Downloads file became macOS-permission-locked (Chrome was holding it open). Working file is now `index2.html` — open `file:///Users/karthik/envoyw/index2.html` directly in Chrome.

---

# Round 2 — design refinements + voice + positioning (2026-05-12 → 13)

## 8. UI refinements

### Header logo — single mark
- Combined into one logo: `weYou X · enVoy` — weYou X small uppercase (links to weyoux.com), enVoy as the brand. No "by" prefix, no hairline separator.
- Parent-first hierarchy positions enVoy as a product *of* weYou X.

### Hero — centered, smaller
- Hero h1 `enVoy` size reduced: `clamp(72px,12vw,180px)` → `clamp(56px,9vw,128px)`.
- Hero supporting text: 16px → 14.5px, opacity dialed back.
- Centered: eyebrow gets flanking lines on both sides for symmetry; h2, hero-text, CTAs all axially aligned.
- "See what it does" secondary link removed from the actions row and turned into a **scroll indicator at the hero bottom** — small uppercase label with an animated circular `↓`.

### Gold wave shine — visual family with weYou X
- Added the `@keyframes shine` animation (200% bg, 8s loop, gold→cream→gold) to the hero h1 `.V` and the hero h2 `.amp`.
- Softer variant (gold-500 → gold-300 → gold-500, 10s) on em words in cream sections — pillars, slug, proof, FAQ, terms.
- Same animation pattern weYou X parent site uses on its hero. Family continuity across properties.

### Pillars — visual aesthetics (Round 1 fix)
- Removed the Roman-numeral chapter marks (— I — / — II — / — III —) — they read as broken HTML, not editorial.
- Replaced with a **persistent 72px × 2px colored top accent bar** per card (indigo / teal / violet), widening to 112px on hover.
- Section background now carries soft radial color washes (gold + indigo at ~3-4% opacity) for depth.
- A 56px gold gradient ornament with a centered glowing dot sits between the pillars head h2 and the lede.

### Slug section — strip-down (match weYou X tone)
- Removed: filler lede paragraph, "Try it now" badge, helper sentences.
- Kept: eyebrow + h2 + form + one micro hint ("No signup · 30 seconds").
- Output panel now has two actions:
  - **Open demo →** (primary gold, opens the generated URL in a new tab)
  - **Copy link** (outline secondary)
- JS wires the new Open button `href` live as the user types.
- Tone matches weYou X's enVoy section: *"Try it now — no signup needed"* / *"Get my chatbot"*.

### Standards (formerly Proof) — confident, not defensive
- Renamed throughout: nav, footer, section id (`#proof` → `#standards`), eyebrow ("What enVoy delivers" → "How enVoy operates"), h2 ("Numbers that move with availability" → "The same standards. Every customer.").
- "Proof" reads defensive ("we are not proving anyone"). "Standards" reads confident — these are just how we operate.

---

## 9. Voice & narrative — the "envoy layer" positioning

The biggest shift of the session: **enVoy is no longer positioned as a "WhatsApp AI agent"**. It is positioned as the **layer between a business and every customer who messages it** — a literal envoy that makes sure every customer meets the same prepared, informed, responsible company.

### Pillar cards — solution narrative, not feature dumps
Each card now follows a five-element structure:

1. **Capability theme chip** (calm, single word): `Prepares` / `Responsible` / `Learns`
2. **h3** (the brand promise): `It understands` / `It delivers` / `It improves`
3. **Italic solution headline** (the outcome): "Reads before it replies." / "Answers with the right thing." / "Learns from you."
4. **Hairline ornament**
5. **Scenario in prose** — enVoy in motion at a specific real moment (a customer messaging at 11pm, a Kannada floor-plan request, a Tuesday price correction).
6. **Capability tags** — small pill chips, plain language (no "intent/mood/source/CRM-tagged")
7. **"The outcome" strip** at the card bottom

Bulleted feature lists are gone.

### Brand-anchor vocabulary (threaded through every section)

- **Prepared** — Card 1's theme + appears in hero, pillars head, contact, footer
- **Prepares before** — Card 1 solution headline
- **Responsible** — Card 2 theme
- **Doesn't react / Learns** — Card 3 theme
- **The layer** between business and customer — hero + footer
- **Every customer meets the same company** — hero + slug + pillars + contact + footer (anchor points only, not every line)

### Plain language pass — jargon stripped
Removed: intent / mood / source / buy signal / live inventory / rich media / EMI quote (now "pricing") / calendar booking (now "bookings") / CRM-tagged (now "team handover") / gap flags / lead data / reply learning / channel partner pipelines / OTA commissions / "pre- and post-arrival sequences" / "qualifies leads" / "follow-up sequences".

Words cut roughly in half across hero, pillars, verticals, contact, footer.

### "Tell less, deliver more" + "quiet hype, not loud hype"
- Each line carries weight. Single weighted sentences over loaded paragraphs.
- Quiet confidence — atmosphere, not exclamation. Like luxury brand restraint.
- Dialed back absolute claims (every time / exactly / permanently / sharper every day) where they piled up.
- "Every customer / everyone meets" idea kept at the strong anchor points (hero, pillars, contact, footer) only — not on every line.

### SEO keywords kept in visible body
- `WhatsApp` retained in hero ("Every customer who WhatsApps your business...") and contact lede.
- `Chatbot` brought back as contrast in the pillars head: "Not a chatbot. The whole prepared company."
- `Multilingual` covered by "in their language" + card 2 capability "3 languages".
- `AI agent`, `WhatsApp Business API`, `conversational AI` retained in schema and meta keywords.

### Page narrative at the latest commit

| Section | What it says |
|---|---|
| Hero | "Every customer who WhatsApps your business meets the same prepared company — in their language, at any hour." |
| Try it yourself | "See how every customer would meet your prepared business." Form + "No signup · 30 seconds". |
| Pillars head | "Not a chatbot. The whole prepared company." — "Three things enVoy does — so every conversation runs prepared." |
| Card 1 (Prepares · It understands) | "Reads before it replies." → outcome: "A business that already knows the customer." |
| Card 2 (Responsible · It delivers) | "Answers with the right thing." → outcome: "They get what they came for." |
| Card 3 (Learns · It improves) | "Learns from you." → outcome: "A business that gets sharper at itself." |
| Industries | "The same prepared company — in six fluent dialects." |
| Standards | "The same standards. Every customer." |
| Contact | "Make sure every customer meets the same prepared company." |
| Footer | "enVoy answers every customer who messages your business — so everyone meets the same prepared company." |

---

## 10. Schema refinement — ecosystem signals (sensible adoptions only)

A GPT recommendation came in suggesting five ecosystem moves. After evaluation against the reality-over-show-off principle, **only two were adopted**:

- ✅ **llms.txt — `weYou X ecosystem` section** describing enVoy / LegalIndia.ai / weYou World as siblings under weYou X. Truthful framing only; no aspirational integrations claimed.
- ✅ **`isRelatedTo` schema link** — enVoy's `SoftwareApplication` now points to LegalIndia.ai and weYou World. Pure factual graph linking — Google can now wire all three weYou X products as siblings in the knowledge graph.

**Skipped:**
- ❌ Legal vertical page — product decision, not a design tweak (still open for a future sprint).
- ❌ "Multi-Agent Orchestrator" narrative — vaporware until built.
- ❌ Internal tech stack name-drop (Celery / FastAPI / Postgres) — not customer search language.

---

## Decision principles (cumulative, for any future weYou property)

1. **Reality over show-off.** Defensible specifics, not marketing superlatives.
2. **Customer search language**, not internal jargon.
3. **No bluffs.** No unsubstantiated claims. No "highest-converting", "best", "leading".
4. **No cheap sales narrations.** No hollow hooks like "Inbound, finally working as it should."
5. **No negative framing of the customer's team or business.**
6. **Tell less, deliver more.** Single weighted sentences over loaded paragraphs.
7. **Quiet hype, not loud hype.** Atmosphere, not exclamation.
8. **The brand idea baked throughout the system**, not just in one section — at strong anchor points, not on every line (avoids fatigue).
9. **SEO keywords in visible body**, not only in schema/meta. AI search engines extract from visible content.
10. **Plain language a non-technical owner reads in one pass.** Strip jargon.
11. **Avoid duplicate / conflicting schema entities.** One identity per `@id`. Reference the canonical parent (`https://weyoux.com/#org`), don't redeclare.

---

## Commit history (round 2)

```
91ed51c copy(index2): strip jargon, cut words — plain language throughout
0717833 copy(index2): strip slug section to bone — match weYou X self-check tone
1a078d5 copy(index2): rewrite as enVoy itself — meaningful, understanding
e09d75d copy(index2): autonomous positioning — "understands and delivers on its own"
95a4448 feat(index2): solution-narrative rewrite, envoy positioning, gold wave
4dac8ae style: center hero, restructure header logo, rename Proof → Standards
a554240 feat: weYou X ecosystem signals + remove ugly Roman-numeral marks
e98a08b feat: initial enVoy site — elegance refinement, SEO/GEO, schema graph
```
|(Plus subsequent copy refinements not yet committed at time of this doc update.)

---

# Round 3 — medical page rewrite: 5 sections, best version (2026-06-28)

## Why we rewrote medical.html

The original page was written for the hospital's **operations** — patient engagement software, metrics, features. The 12-section version was too repetitive (same pattern × 12).

**Final structure: 5 sections, one clear arc.**

| # | Section | Pattern | Role |
|---|---|---|---|
| 1 | Hero | `.subhero.dark-section` | Big promise |
| 2 | Journey | `.sub-section.cream` | Universal connectivity — patient + internal nodes |
| 3 | Touchpoints | `.connect` | 4×2 grid — all 8 touchpoints in one glance |
| 4 | All connected | `.connect.dark-section` | Engine wheel visual — every node wired |
| 5 | CTA | `.sub-section.cream` | Warm close — "Your hospital. One AI. 7 days." |

## Key decisions

- **12 sections → 5.** 8 touchpoints grouped into a single 4×2 grid instead of 8 separate sections. Removes repetition.
- **Section 3 uses `.connect-node` cards** — existing dark-section card pattern. Each touchpoint is one card with a two-word headline and one-line feeling.
- **Engine wheel kept as section 4** — purely visual. Minimal copy. The wheel does the work.
- **CTA simplified** — "Your hospital. One AI. 7 days." + revenue share. No trust pills, no integration list.
- **Everything else unchanged** — header, footer, schema, meta, CSS classes, dark/cream rhythm.
- **Negative/problem language eliminated** — every line is positive, outcome-focused. Matches ServiceNow's tone ("AI doesn't just think. It acts.").

## How it maps to ServiceNow's frame

| ServiceNow | enVoy (this page) |
|---|---|
| "Every person in your organisation" | "The whole hospital moves with the patient journey" |
| "AI doesn't just think. It acts." | Section 3's 8 touchpoints showing action at every desk |
| "You ask. Work gets done." | "A patient messages. enVoy notifies every desk at once." |
| "The platform that already runs your business" | "Works with your existing systems" (CTA) |

### Section 2 evolution: negative → positive → universal