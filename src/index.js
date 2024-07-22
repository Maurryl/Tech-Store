import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './components/CartContext';
// import { CartContext } from './components/CartContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <CartContext>
//       <App />
//     </CartContext>
//   </React.StrictMode>
// );
