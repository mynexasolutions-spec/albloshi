import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { preloadRoute } from './lib/lazyPages';

// The whole React app. It lives in its own chunk (loaded by main.jsx) so that, on prerendered pages,
// it is downloaded and run only AFTER the browser has painted the hero image.
export function start(rootEl) {
  // Fetch the current route's chunk first so the prerendered HTML is replaced in one step (no blank flash).
  return preloadRoute(window.location.pathname).finally(() => {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}
