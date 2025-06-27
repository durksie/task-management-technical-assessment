import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegistering ? { name, email, password } : { email, password };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      if (!isRegistering) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        alert('Registered successfully! Now login.');
        setIsRegistering(false);
      }
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        )}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default LoginRegister;
