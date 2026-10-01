(function () {
  // Solid nav background once the hero has scrolled past (same pattern as the
  // reference template: transparent over the hero, solid once you scroll on).
  var nav = document.getElementById('topnav');
  var hero = document.querySelector('.hero');
  function onScroll() {
    var threshold = hero ? hero.offsetHeight * 0.7 : 200;
    nav.classList.toggle('solid', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function () {
  // Copy-to-clipboard for the BibTeX block.
  var btn = document.getElementById('citecopy');
  var text = document.getElementById('citetext');
  if (!btn || !text) return;
  btn.addEventListener('click', function () {
    var done = function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.textContent).then(done, function () {
        var r = document.createRange();
        r.selectNodeContents(text);
        var s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
      });
    } else {
      var r = document.createRange();
      r.selectNodeContents(text);
      var s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
  });
})();


// Respect "reduce motion": the header videos stay on their first frame.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  }
})();
