import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// WORKAROUND: Prevent "Cannot redefine property" errors from wagmi's injected() connector
// and extension content scripts when freezing or redefining window.ethereum properties
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = function (obj: any, prop: string | symbol, descriptor: PropertyDescriptor) {
  if (descriptor && typeof descriptor === 'object') {
    try {
      descriptor.configurable = true;
    } catch (_) {}
  }
  try {
    return originalDefineProperty(obj, prop, descriptor);
  } catch (_e) {
    try {
      if (descriptor && 'value' in descriptor) {
        obj[prop] = descriptor.value;
      }
    } catch (_) {}
    return obj;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
