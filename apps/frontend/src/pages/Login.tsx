
import React, { useState } from 'react';
import axios from 'axios';
export default function Login(){
  const [email, setEmail] = useState('admin@teddy.com');
  const [password, setPassword] = useState('password');
  const [msg, setMsg] = useState('');
  const login = async () => {
    try{
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      setMsg('Logged in!');
      window.location.href = '/dashboard';
    }catch(e){ setMsg('Login failed'); }
  };
  return <div>
    <h2>Login</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' /><br/>
    <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' /><br/>
    <button onClick={login}>Login</button>
    <div>{msg}</div>
  </div>;
}
