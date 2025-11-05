
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
export default function App(){
  return (
    <div style={{maxWidth:900, margin:'0 auto', padding:20}}>
      <header style={{display:'flex', gap:12}}>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/clients'>Clients</Link>
      </header>
      <main style={{marginTop:20}}><Outlet/></main>
    </div>
  );
}
