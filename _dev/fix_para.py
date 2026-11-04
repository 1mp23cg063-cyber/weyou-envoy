import re, json

with open('/Users/karthik/envoyw/index.html', 'r') as f:
    content = f.read()

m = re.search(r'<script type="__bundler/template">(.*?)</script>', content, re.S)
raw_json = m.group(1).strip()

# Check the escaping
end_part = raw_json[-60:]
print("Last 60 chars of JSON:", repr(end_part))

# Decode
t = json.loads(raw_json)
print(f"Decoded OK: {len(t)} chars")

# Fix the missing < on the paragraph
idx = t.find('p style="font-size:clamp(21px')
if idx >= 0:
    # The 'p' should be '<p' - find the opening < by going back 1 char
    before = t[idx-3:idx]
    print(f"Before 'p': {repr(before)}")
    # If the char before is not '<', we need to fix
    if t[idx-1] != '<':
        # Find the nearest < before p
        old_para_str = t[idx:idx+500]
        # There might be a newline or space before p
        # Actually let me check what comes before
        pass
    print(f"First 100 chars of para area: {repr(t[idx:idx+100])}")

# Check tagline
idx2 = t.find('COMMUNICATION SYSTEM')
if idx2 >= 0:
    ctx = t[idx2-15:idx2+30]
    print(f"Tagline context: {repr(ctx)}")

# Now fix: the old_para starts at 'p ' and needs '<' prepended
# Actually find the exact old_para match
para_start = t.find('p style="font-size:clamp(21px,1.7vw,25px);')
para_end = t.find('</p>', para_start) + 4
old_para = t[para_start:para_end]
new_para = '<' + old_para
print(f"\nFixing paragraph: {old_para[:50]}...")
t = t.replace(old_para, new_para, 1)

# Re-encode - careful with escaping
new_json = json.dumps(t, ensure_ascii=False)

# Must escape / -> \u002F to prevent </script> in the raw JSON
# In the output file, we need literal \u002F
# json.dumps outputs </ as literal </  (since / doesn't need escaping in JSON)
# But in HTML script tag, </ terminates the script
# So we replace </ with the JSON escape sequence \u002F which produces /
new_json = new_json.replace('</', '<\\u002F')

# Verify the escaping
print(f"New JSON ends with: {repr(new_json[-60:])}")

# Replace in content
content = content.replace(raw_json, new_json, 1)

with open('/Users/karthik/envoyw/index.html', 'w') as f:
    f.write(content)

print("DONE")

# Verify the JSON is valid
with open('/Users/karthik/envoyw/index.html', 'r') as f:
    content2 = f.read()
m2 = re.search(r'<script type="__bundler/template">(.*?)</script>', content2, re.S)
try:
    t2 = json.loads(m2.group(1).strip())
    print(f"Verified: {len(t2)} chars decoded OK")
except Exception as e:
    print(f"VERIFY FAILED: {e}")
    print(f"Raw end: {repr(m2.group(1).strip()[-60:])}")