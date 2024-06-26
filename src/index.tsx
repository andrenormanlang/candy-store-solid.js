/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';
import { Router } from '@solidjs/router';
import { CartProvider } from './context/CartContext';

const root = document.getElementById('root');


if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}



render(() => (
  <Router>
    <CartProvider>
      <App />
     </CartProvider>
  </Router>
), root!);
