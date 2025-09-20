import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import 'swiper/css';
import 'swiper/css/navigation';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

(async function bootstrap() {
  try {
    // dynamic import so we can catch module evaluation/runtime errors
    const AOSModule = await import('aos');
    await import('aos/dist/aos.css');
    const AOS = AOSModule.default || AOSModule;
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

    const AppModule = await import('@/App');
    const App = AppModule.default || AppModule;

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    // Log to console and show an overlay so the user sees the error instead of a blank page
    // eslint-disable-next-line no-console
    console.error('Application bootstrap error:', err);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;color:#111;background:#fff;">
          <h2 style="margin:0 0 12px 0;color:#b91c1c;">Application error</h2>
          <p style="margin:0 0 12px 0;color:#374151;">An error occurred while starting the app. See details below.</p>
          <pre style="white-space:pre-wrap;background:#111;color:#fff;padding:12px;border-radius:6px;max-height:60vh;overflow:auto;">${escapeHtml(err && (err.stack || err.message || String(err)))}</pre>
        </div>
      `;
    }
  }
})();