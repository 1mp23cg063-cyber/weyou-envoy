# enVoy — Project Brief

Captured from the user's requests during the design + SEO/GEO refinement session on **2026-05-11**.
This file is the source of truth for *what the user asked for*. Future sessions should read this first.

---

## 1. Design — elegance pass

> "not happy with the design, want more elegance and also wordings and design, but almost same css, work on this"

- More **elegance** in both visual design and wording.
- Keep **almost the same CSS** — refine, don't rewrite.
- Reduce the **enVoy logo/h1 size** so it doesn't overpower the page aesthetics.
- The pillars section ("It understands / It delivers / It improves") **looks dull** — fix it.

> "want all centred other than hero"

- **Center everything except the hero.** Hero stays left-aligned (it's the only directional section).
- Slug, pillars, industries, proof, FAQ, contact — all centered.

---

## 2. SEO & GEO — reality over show-off

> "check for seo"
> "and check any points from here Surfer SEO platform … any free tools https://mangools.com/ https://surferseo.com/ https://www.frase.io/ https://ahrefs.com/ https://otterly.ai/"

- Apply **SEO insights from the Surfer SEO article** the user shared — content optimization, long-tail keywords, question-based content, topical authority.
- Reference free tools: **Mangools, Surfer, Frase, Ahrefs, Otterly** (Otterly is specifically an AI-search visibility tool).

> "geo too"

- **GEO (Generative Engine Optimization)** — optimize for AI search engines, not just classical SEO.

> "all ai searrch too"

- All AI search engines: **ChatGPT, Claude, Perplexity, Gemini, Grok, Bing Copilot, You.com**.

> "a clean logical structure for seo geo and all, look even semrush and want any related words like chatbot, ai and weyou and find a refined and add here"

- **Clean logical SEO/GEO structure** — no confusion in the schema graph.
- Adopt a **Semrush-style topical authority** approach: cover related terms (chatbot, AI agent, conversational AI, WhatsApp business stack, AI receptionist, etc.) and weYou variants.
- Refined keyword set — meaningful coverage, not stuffing.

> "moving forward, all weyou also understand google award reality i guess than any showoff and also what customer search"

- **Google rewards reality over show-off.** No puffery, no superlatives without backing.
- **Write for what customers actually search**, not aspirational marketing copy.
- This is a guideline for **all weYou properties** — not just enVoy.

---

## 3. Schema — parent/child consistency, typo coverage

> "/Users/karthik/Downloads/smw/weyou web/index.html check any good schema elements in original weyou and this weyou envoy a sub of weyou"

- Read the parent **weYou X site schema** and align enVoy's schema with it.
- enVoy is a **sub-product of weYou X** — the schema graph must reflect parent → child.

> "also indians may search wrong too"

- Account for **Indian search typos and Hinglish**: misspellings of envoy (envoi, envoye, enway, en voy), weyou (we you, weeyou, wyou), WhatsApp (Watsapp), plus Devanagari + Kannada script variants.

> "also keep the schema very logical that no confusions be there and we sit on top of every search"

- **No schema conflicts.** Clean graph — one organization identity, clear parent-child, no duplicate entity types.

> "you can also better adopt scheme here"

- **Adopt more of the parent schema's patterns** here: `ProfessionalService`, `GeoCoordinates`, `hasOfferCatalog` with per-industry `Service` offers, `priceRange`.

---

## 4. Future scope — pages per industry

> "there will be additional pages each for hospitals, spas and we do it in future and keep open to that"

- **Per-industry pages incoming**: `medical.html`, `schools.html`, `spas.html`, `realestate.html`, `hotels.html`, `others.html`.
- Keep the design system **modular** so the home-page CSS and patterns lift directly into child pages.
- Schema should accommodate child pages without conflicts.

---

## 5. Git — best-practice setup

> "go to git do a lot"
> "check git anf find any mistakes you did and rectify"
> "check for git for what the best ever companies did there"

- **Initialize git** in the project directory.
- Follow **best practices the top engineering teams use**: clean `.gitignore`, `README.md`, conventional commit messages, decisions/changelog docs.
- **Review the diff** for mistakes before committing — rectify before history is written.

---

## 6. Documentation — capture intent and decisions

> "and adopting new, want what all i typed in a md file and what all we adopted in a md file for future reference"

- **`BRIEF.md`** — what the user typed / asked for (this file).
- **`ADOPTED.md`** — what we adopted, with the reasoning.
- Both committed to the repo so any future session, designer, or developer has full context.

---

## 7. Second round — narrative, positioning, voice (2026-05-12 → 13)

### Layout & UI

> "is envoy size same" / "what ugly size is this"

- Hero `enVoy` H1 size was reduced (clamp 72→128 max), then the **Roman numerals** I added to the pillar cards were called out as ugly — replaced with a persistent 72px×2px colored top bar per card.

> "weYou small and followed by envoy, not by weyoux" / "its just weYou envoy on thing"

- Header logo restructured: parent first, product second — **single mark** `weYou X · enVoy` (weYou X small uppercase, enVoy main brand). No "by" prefix, no hairline separator.

> "See what it does put somewhere"

- The "See what it does" secondary CTA was removed from the hero actions row and turned into a **scroll indicator at the hero bottom** (animated circular ↓).

> "centred, also weYou small and followed by envoy"

- Hero centered. Eyebrow gets flanking lines on both sides for symmetry.

> "[Get a demo trained for your business] reduce it, a lot content bullshit"

- Slug section stripped to bone: eyebrow + h2 + form + one hint line. Output panel has two actions (Open demo, Copy link). Matches **weYou X's enVoy section pattern** (`Try it now — no signup needed` / `Get my chatbot`).

> "also the gold shade like wave like in weyox.com"

- Added **gold shine wave** (linear gradient gold→cream→gold, 200% bg, 8s shine animation) to: hero h1 `.V`, hero h2 `.amp`. Softer variant on em words in cream sections. Same animation pattern weYou X parent site uses on its hero.

> "this part looks plain and ugly. do some aesthetics" *(pillars head block)*

- Added an **ornament**: 56px gold gradient line with a centered glowing dot, between the h2 and the lede. Subtle background radial color washes added to the pillars section.

> "mention proofs as somethignels, we are not proving anyone"

- **Renamed "Proof" → "Standards"**. Nav, footer, section id, eyebrow, and h2 all updated. From defensive ("Proof") to confident ("Standards"). The h2: "The same standards. Every customer."

### Positioning, voice, copy

> "rather research and descriptive do it as a solution" / "the whole narration a literal solution than research thing"

- The pillar cards were rebuilt from feature-dump bullets into a **solution narrative** structure:
  1. Calm capability theme chip
  2. h3 (It understands / delivers / improves)
  3. Italic solution headline (the outcome)
  4. Hairline ornament
  5. Scenario in prose (enVoy in action at a specific moment)
  6. Capability tags (small pills, not bulleted list)
  7. "The outcome" strip

> "dont be too negative but a solution"

- Removed negative problem framing. No "you're losing leads" / "chatbots forget" / "tyre-kickers" language. Solution-first, not problem-first.

> "no bluffs also"

- Removed unsubstantiated claims: "from first hello to closed deal" (enVoy hands to humans for close — bluff), "highest-converting channel" (unverifiable superlative — replaced with "the channel your business runs on").

> "be on a higher note" / "note" / "also keep what people search"

- Elevated tone without superlatives. Search-intent words baked in naturally (WhatsApp AI agent, WhatsApp Business API, multilingual, customer enquiry).

> "no cheap sales narrations"

- Removed sales hooks like "Inbound, finally working as it should." — let substance speak.

> "this not just whatsapp agent but a entire communication system a envoy between the clients and their customers and delivers for clients"

- Repositioned: enVoy is not a "WhatsApp AI agent" — it's the **complete WhatsApp communication system** that acts as a literal **envoy** between business and customer. Brand-name pun ("your envoy to your customers") reinforces the positioning. Search keywords kept in schema and meta.

> "it understand and delivers independent literally on its own better than anyonne"

- Autonomy framing added: "**understands and delivers on its own**", "**runs end to end**", "**not a scripted chatbot that stops at the first turn**". Demonstrates superiority through capability claims, not through "better than" superlatives.

> "be my envoy and create a great meaningful, understanding content"

- The page was rewritten in enVoy's own voice — opens by naming the reader's reality, then states enVoy's role plainly. Slug section becomes "See enVoy speak for your business". Industries lede becomes "enVoy speaks your industry the way your industry speaks". Contact specific to the reader.

### The core idea (final positioning)

> "Envoy is the layer that makes sure every customer meets the same prepared, informed company, literally add the idea throught the whole system and make more simple"
>
> "Responsible," "prepares before," "doesn't react"
>
> "not only cards but the idea literally throught"
>
> "also things like everyone meets your company mention"

- **The core idea: enVoy is the layer that makes sure every customer meets the same prepared, informed, responsible company.**
- Three brand-anchor verbs: **prepares before** (Card 1), **responsible** (Card 2), **doesn't react / learns** (Card 3).
- The idea is threaded through every section: hero, slug, pillars, industries, standards, contact, footer.

### Editing principles (cumulative)

> "reduce tech jargons but any common can understand, please simplify with less texts"

- Plain language a non-technical business owner reads in one pass. Stripped: intent/mood/source, live inventory, CRM-tagged, rich media, gap flags, channel partner pipelines, OTA commissions. Word count roughly halved.

> "dont mention negative of team"

- No "your team can't cope" / "before your team sees them" subtext. Team mentioned only collaboratively.

> "dont over hype too"

- Dialed back the absolute claims (every time / exactly / permanently / sharper every day) where they piled up. The "every customer / everyone meets" idea kept at strong anchor points (hero, pillars, contact, footer) — not on every line.

> "our idea is tell less deliver more" / "but create the hype and calmness"

- **Tell less, deliver more.** Each line carries weight. Quiet confidence — atmosphere, not exclamation. Single weighted sentences over loaded paragraphs.

> "also keep seo oriented words googl"

- Critical search terms (WhatsApp, AI agent, chatbot as contrast, multilingual, conversational AI) kept in visible body copy — not only in schema/meta.

### Files

- **`index2.html`** — the new working file with all of the above. Original **`index1.html`** preserved for comparison.
