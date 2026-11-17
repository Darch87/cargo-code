# cargo-code

The code behind Danny Wills' Cargo site, so it can be updated without pasting into Cargo.

- Cargo site HTML holds one line: `<script src="https://darch87.github.io/cargo-code/site.js"></script>`
- `site.js` loads `site-code.js` (rebuilt from `src/` by `python3 tools/build.py`).
- A Cargo page holding `<div data-code="NAME"></div>` shows `blocks/NAME.html`.
- No keys or passcodes go in this repo.
