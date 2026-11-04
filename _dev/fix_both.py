import re, json

def fix_index_html():
    with open('/Users/karthik/envoyw/index.html', 'r') as f:
        content = f.read()

    # ── Fix 1: Thumbnail SVG ──
    old_thumb = '<div id="__bundler_thumbnail"><svg xmlns="http://www.w3.org/2000/svg" sc-camel-view-box="0 0 100 100"><rect width="100" height="100" fill="#0a1931"></rect><text x="50" y="62" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="300" fill="#e8d078" text-anchor="middle">eV</text></svg></div>'
    new_thumb = '<div id="__bundler_thumbnail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#040c16"></rect><text x="50" y="36" font-family="Inter,Helvetica,Arial,sans-serif" font-size="4.8" font-weight="500" fill="#4a5568" text-anchor="middle" letter-spacing="2">weYou</text><text x="37" y="60" font-family="Inter,Helvetica,Arial,sans-serif" font-size="17" font-weight="300" fill="#ffffff" text-anchor="end">en</text><text x="50" y="60" font-family="Inter,Helvetica,Arial,sans-serif" font-size="17" font-weight="500" fill="#c9a227" text-anchor="middle">V</text><text x="63" y="60" font-family="Inter,Helvetica,Arial,sans-serif" font-size="17" font-weight="300" fill="#ffffff" text-anchor="start">oy</text><text x="72" y="48" font-family="Inter,Helvetica,Arial,sans-serif" font-size="5" font-weight="400" fill="rgba(255,255,255,0.45)" text-anchor="start">™</text></svg></div>'
    if old_thumb in content:
        content = content.replace(old_thumb, new_thumb, 1)
        print("Fix 1: Thumbnail SVG replaced")
    else:
        print("Fix 1: Thumbnail SVG NOT FOUND — may already be fixed")

    # ── Fix 2: Hero animations in template ──
    m = re.search(r'<script type="__bundler/template">(.*?)</script>', content, re.S)
    if not m:
        print("Fix 2: Template script not found!")
        return

    raw_json = m.group(1).strip()
    t = json.loads(raw_json)
    print(f"Fix 2: Template decoded, len={len(t)}")

    # 2a. Replace per-letter COMMUNICATION SYSTEM tagline
    idx = t.find('goldWave 8s ease-in-out -8.00s')
    if idx >= 0:
        start = t.rfind('font-size:clamp(18px,3.5vw,34px)', 0, idx)
        end = t.find('</span></div>', idx) + 14
        old_tag = t[start:end]
        new_tag = 'font-size:clamp(18px,3.5vw,34px);font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.6);animation:goldWave 8s ease-in-out 0s infinite">COMMUNICATION SYSTEM</span>'
        t = t.replace(old_tag, new_tag, 1)
        print(f"Fix 2a: Tagline replaced ({len(old_tag)} -> {len(new_tag)})")
    else:
        print("Fix 2a: Tagline per-letter spans NOT FOUND")

    # 2b. Replace per-word hero paragraph
    idx2 = t.find('wordGold', t.find('COMMUNICATION'))
    if idx2 >= 0:
        # Find the <p> tag that contains wordGold spans
        para_p_start = t.rfind('<p ', idx2 - 500, idx2)
        para_end = t.find('give.</span>', para_p_start) + 14
        old_para = t[para_p_start:para_end]
        new_para = 'p style="font-size:clamp(21px,1.7vw,25px);line-height:1.6;font-weight:400;max-width:760px;margin:0 auto;letter-spacing:0.01em;color:rgba(255,255,255,0.8);text-shadow:0 1px 4px rgba(0,0,0,0.45);opacity:0;animation:heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 1.0s forwards,heroGoldFlow 9s ease-in-out 3s infinite">Every customer who messages your business gets a response like your best person would give.</p>'
        t = t.replace(old_para, new_para, 1)
        print(f"Fix 2b: Paragraph replaced ({len(old_para)} -> {len(new_para)})")
    else:
        print("Fix 2b: Per-word paragraph NOT FOUND")

    # Re-encode to JSON, being careful about \u002F escaping
    new_json = json.dumps(t, ensure_ascii=False)
    # Replace </ with <\u002F to prevent script tag termination
    new_json = new_json.replace('</', '<\\u002F')
    print(f"Fix 2: Re-encoded JSON, len={len(new_json)}")

    # Replace in content
    old_json = m.group(1).strip()
    content = content.replace(old_json, new_json, 1)
    print(f"Fix 2: Template replaced in content")

    with open('/Users/karthik/envoyw/index.html', 'w') as f:
        f.write(content)

    print("DONE")

fix_index_html()