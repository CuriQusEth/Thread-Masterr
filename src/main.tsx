import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// WORKAROUND: Prevent "Cannot redefine property" errors from wagmi's injected() connector
// when browser extensions or mocks freeze window.ethereum properties
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = function (obj: any, prop: string | symbol, descriptor: PropertyDescriptor) {
  if (prop === 'isZerion' || prop === 'isTrust' || prop === 'isCoinbaseWallet' || prop === 'isMetaMask') {
    try {
      return originalDefineProperty(obj, prop, descriptor);
    } catch (e) {
      return obj;
    }
  }
  return originalDefineProperty(obj, prop, descriptor);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
