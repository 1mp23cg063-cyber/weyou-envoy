import re, json

with open('/Users/karthik/envoyw/index.html', 'r') as f:
    content = f.read()

# Find the template script
m = re.search(r'<script type="__bundler/template">(.*?)</script>', content, re.S)
if not m:
    print("ERROR: template not found")
    exit(1)

t = json.loads(m.group(1).strip())

# 1. Replace per-letter COMMUNICATION SYSTEM tagline
idx = t.find('goldWave 8s ease-in-out -8.00s')
# Find the parent span opening
start = t.rfind('font-size:clamp(18px,3.5vw,34px)', 0, idx)
# Find the closing </span></div> of the tagline
end = t.find('</span></div>', idx) + 14
old_tag = t[start:end]
new_tag = 'font-size:clamp(18px,3.5vw,34px);font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.6);animation:goldWave 8s ease-in-out 0s infinite">COMMUNICATION SYSTEM</span>'
t = t.replace(old_tag, new_tag, 1)
print(f"Tagline: {len(old_tag)} -> {len(new_tag)}")

# 2. Replace per-word hero paragraph
# Find first wordGold after the tagline we just fixed
idx2 = t.find('wordGold', t.find('COMMUNICATION'))
# Find the <p> tag that contains it
para_p_start = t.rfind('<p ', idx2 - 500, idx2)
# Find the end of the paragraph
para_end = t.find('give.</span>', para_p_start) + 14
old_para = t[para_p_start:para_end]
new_para = 'p style="font-size:clamp(21px,1.7vw,25px);line-height:1.6;font-weight:400;max-width:760px;margin:0 auto;letter-spacing:0.01em;color:rgba(255,255,255,0.8);text-shadow:0 1px 4px rgba(0,0,0,0.45);opacity:0;animation:heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 1.0s forwards,heroGoldFlow 9s ease-in-out 3s infinite">Every customer who messages your business gets a response like your best person would give.</p>'
t = t.replace(old_para, new_para, 1)
print(f"Paragraph: {len(old_para)} -> {len(new_para)}")

# Re-encode and write back
new_json = json.dumps(t)
old_json = m.group(1).strip()
content = content.replace(old_json, new_json, 1)

with open('/Users/karthik/envoyw/index.html', 'w') as f:
    f.write(content)

print("DONE")