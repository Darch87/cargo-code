"""Build site-code.js from src/site-html.html (the code that used to sit in Cargo's site HTML)
plus src/blocks-loader.js. Run: python3 tools/build.py"""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / 'src/site-html.html').read_text()
html = re.sub(r'<!--.*?-->', '', html, flags=re.S)
parts = ['/* site-code.js: built by tools/build.py from src/. Edit src/, then rebuild. */',
         "function __cxStyle(css){var s=document.createElement('style');s.textContent=css;(document.head||document.documentElement).appendChild(s);}"]
for m in re.finditer(r'<(script|style)[^>]*>(.*?)</\1>', html, flags=re.S):
    kind, body = m.group(1), m.group(2)
    if kind == 'style':
        parts.append('__cxStyle(' + json.dumps(body.strip()) + ');')
    else:
        parts.append(';' + body.strip() + '\n;')
parts.append((root / 'src/blocks-loader.js').read_text())
(root / 'site-code.js').write_text('\n'.join(parts) + '\n')
print('site-code.js', (root / 'site-code.js').stat().st_size, 'bytes')
