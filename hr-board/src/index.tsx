import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Providers } from 'Providers';
import { router } from 'router/router';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Expected root element with id "root"`);
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
