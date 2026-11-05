import './index.css';

// Tiny entry point. Prerendered pages already contain real content, so the browser can paint the page and
// its hero image (the Largest Contentful Paint) without any JavaScript. The React app (src/boot.jsx, a
// separate chunk) is then loaded: right after the LCP is seen, on the first tap/click/key press/scroll,
// or after 4 s at the latest, whichever comes first. Pages without prerendered content start at once.
const rootEl = document.getElementById('root');
const boot = () => {
  document.documentElement.classList.add('bg-ready'); // lets html.bg-ready CSS rules load decorative photos
  return import('./boot.jsx').then(m => m.start(rootEl));
};

const prerendered = rootEl.childElementCount > 0 && !window.location.pathname.startsWith('/admin');
if (!prerendered) {
  boot();
} else {
  let started = false;
  const events = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
  const go = () => {
    if (started) return;
    started = true;
    events.forEach(e => window.removeEventListener(e, go));
    boot();
  };
  events.forEach(e => window.addEventListener(e, go, { passive: true, once: true }));
  setTimeout(go, 4000);
  try {
    new PerformanceObserver(() => setTimeout(go, 600)).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch { /* browser without the LCP API: the timers above cover it */ }
}
