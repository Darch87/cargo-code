/* PAGE BLOCKS: a Cargo page holding <div data-code="NAME"></div> shows blocks/NAME.html from this repo.
   - Most blocks draw inside the placeholder's own shadow layer, so Cargo's editor never saves them into the page.
   - LIGHT blocks (the homepage projects) go into the page itself, because the homepage scripts read them there.
     They are skipped inside Cargo's editor, so the editor never saves a copy. */
(function () {
  'use strict';
  if (window.__cargoBlocks) return; window.__cargoBlocks = true;
  var BASE = 'https://darch87.github.io/cargo-code/blocks/';
  var LIGHT = { homepage: true };
  var inEditor = window.self !== window.top;
  var done = typeof WeakSet === 'function' ? new WeakSet() : null, cache = {};
  function get(name) {
    if (!cache[name]) cache[name] = fetch(BASE + encodeURIComponent(name) + '.html?v=' + Math.floor(Date.now() / 60000))
      .then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; });
    return cache[name];
  }
  function fill() {
    [].forEach.call(document.querySelectorAll('[data-code]'), function (ph) {
      if (!done || done.has(ph)) return;
      var name = (ph.getAttribute('data-code') || '').trim().toLowerCase();
      if (!name) return;
      if (LIGHT[name]) {
        if (inEditor || ph.querySelector('.project')) return;
        done.add(ph);
        get(name).then(function (html) { if (html) ph.innerHTML = html; });
      } else {
        if (!ph.attachShadow || ph.shadowRoot) return;
        done.add(ph);
        var root = ph.attachShadow({ mode: 'open' });
        get(name).then(function (html) { root.innerHTML = html; });
      }
    });
  }
  var t = null;
  new MutationObserver(function () { if (!t) t = setTimeout(function () { t = null; fill(); }, 50); })
    .observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();
