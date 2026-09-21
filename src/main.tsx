// Guard against environments where window.fetch has only a getter without a setter
try {
  if (typeof window !== 'undefined') {
    const orig = window.fetch ? window.fetch.bind(window) : null;
    let custom: typeof fetch | null = null;
    Object.defineProperty(window, 'fetch', {
      get() {
        return custom || orig;
      },
      set(fn) {
        custom = fn;
      },
      configurable: true,
      enumerable: true,
    });
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
