
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function authHeader(){ return { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }; }
export default function Clients(){
  const [clients, setClients] = useState<any[]>([]);
  const [name,setName]=useState(''); const [email,setEmail]=useState('');
  useEffect(()=>{ fetch(); },[]);
  async function fetch(){ const res = await axios.get(import.meta.env.VITE_API_URL + '/clients', authHeader()); setClients(res.data); }
  async function create(){ await axios.post(import.meta.env.VITE_API_URL + '/clients', { name, email }, authHeader()); setName(''); setEmail(''); fetch(); }
  async function remove(id:string){ await axios.delete(import.meta.env.VITE_API_URL + '/clients/' + id, authHeader()); fetch(); }
  return <div>
    <h2>Clients</h2>
    <div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder='name' />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
      <button onClick={create}>Create</button>
    </div>
    <ul>{clients.map(c=> <li key={c.id}>{c.name} ({c.email}) <button onClick={()=>remove(c.id)}>Delete</button></li>)}</ul>
  </div>;
}
