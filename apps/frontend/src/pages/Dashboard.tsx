
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Dashboard(){
  const [clients, setClients] = useState<any[]>([]);
  useEffect(()=>{ fetch(); },[]);
  async function fetch(){ const res = await axios.get(import.meta.env.VITE_API_URL + '/clients', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }); setClients(res.data); }
  return <div>
    <h2>Dashboard</h2>
    <div>Total clients: {clients.length}</div>
    <h3>Last clients</h3>
    <ul>{clients.slice(0,5).map(c=> <li key={c.id}>{c.name} - {new Date(c.createdAt).toLocaleString()}</li>)}</ul>
  </div>;
}
