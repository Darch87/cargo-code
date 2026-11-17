/* cargo-code loader. Cargo's site HTML holds only this one line:
     <script src="https://darch87.github.io/cargo-code/site.js"></script>
   This file then loads the real site code, fresh at most a minute old. */
(function () {
  var s = document.createElement('script');
  s.src = 'https://darch87.github.io/cargo-code/site-code.js?v=' + Math.floor(Date.now() / 60000);
  (document.head || document.documentElement).appendChild(s);
})();
