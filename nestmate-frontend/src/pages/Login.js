import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🏠 NestMate</h2>
        <h3 style={styles.title}>Welcome back</h3>
        <p style={styles.sub}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="rahul@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' },
  card: { background: '#fff', borderRadius: '16px', padding: '48px 40px', width: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' },
  logo: { textAlign: 'center', color: '#6C63FF', margin: '0 0 24px' },
  title: { margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: '#1a1a2e' },
  sub: { margin: '0 0 32px', color: '#888', fontSize: '14px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#444' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', outline: 'none' },
  btn: { width: '100%', padding: '13px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  error: { background: '#ffe3e3', color: '#c92a2a', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' },
  link: { color: '#6C63FF', cursor: 'pointer', fontWeight: '600' }
};

export default Login;