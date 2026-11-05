// Turns <link data-async-css media="print"> stylesheets on once loaded (no inline JS needed, so the CSP stays strict).
// The Material Icons link also sets <html class="icons-ready"> so icon names stay hidden until the icon font CSS is in.
document.querySelectorAll('link[data-async-css]').forEach(function (l) {
  var on = function () {
    l.media = 'all';
    if (l.hasAttribute('data-icons')) document.documentElement.classList.add('icons-ready');
  };
  if (l.sheet) on(); else l.addEventListener('load', on);
});
