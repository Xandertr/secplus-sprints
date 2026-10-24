# Dev tool (needs the extracted PDF text, which is NOT in the repo).
# Writes tests/heading-sections.json: { pdfPage: { subHeading: "1.2 Zero Trust" } }
import re, json, sys
raw, mapjs, out = sys.argv[1], sys.argv[2], sys.argv[3]
src = open(mapjs, encoding="utf-8").read()
data = json.loads(src[src.index("= {") + 2: src.rindex("};") + 1])
res = {}
cur = None
for p in range(10, 106):
    lines = [l.strip() for l in open(f"{raw}/p{p}.txt", encoding="utf-8") if l.strip()]
    heads = set(data["pageHeadings"].get(str(p), []))
    res[p] = {}
    for l in lines:
        m = re.match(r'^([1-5]\.[0-9]) ?- ?(.*?)\s*$', l)
        if m:
            t = re.sub(r'\s*\(continued\)$', '', m.group(2)).strip()
            if t.startswith('An Overview'): t = 'An Overview of Malware'
            cur = m.group(1) + " " + t
            continue
        if l in heads and l not in res[p]:
            res[p][l] = cur
json.dump(res, open(out, "w"), ensure_ascii=False, indent=0)
