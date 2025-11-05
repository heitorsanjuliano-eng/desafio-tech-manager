
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Login/>} />
          <Route path='clients' element={<Clients/>} />
          <Route path='dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
