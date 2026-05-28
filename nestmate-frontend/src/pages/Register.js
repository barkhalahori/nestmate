import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'SEEKER' });
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
      await register(form);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🏠 NestMate</h2>
        <h3 style={styles.title}>Create account</h3>
        <p style={styles.sub}>Join thousands finding their perfect flatmate</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} type="text" name="name"
              placeholder="Rahul Sharma" value={form.name}
              onChange={handleChange} required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" name="email"
              placeholder="rahul@gmail.com" value={form.email}
              onChange={handleChange} required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password"
              placeholder="••••••••" value={form.password}
              onChange={handleChange} required />
          </div>

          {/* Role Selection */}
          <div style={styles.field}>
            <label style={styles.label}>I am a...</label>
            <div style={styles.roleRow}>
              <div
                style={{ ...styles.roleCard, ...(form.role === 'SEEKER' ? styles.roleSelected : {}) }}
                onClick={() => setForm({ ...form, role: 'SEEKER' })}>
                <div style={styles.roleIcon}>🔍</div>
                <div style={styles.roleName}>Seeker</div>
                <div style={styles.roleDesc}>Looking for a flatmate or room</div>
              </div>
              <div
                style={{ ...styles.roleCard, ...(form.role === 'LANDLORD' ? styles.roleSelected : {}) }}
                onClick={() => setForm({ ...form, role: 'LANDLORD' })}>
                <div style={styles.roleIcon}>🏡</div>
                <div style={styles.roleName}>Landlord</div>
                <div style={styles.roleDesc}>Have a room or flat to share</div>
              </div>
            </div>
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' },
  card: { background: '#fff', borderRadius: '16px', padding: '48px 40px', width: '440px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' },
  logo: { textAlign: 'center', color: '#6C63FF', margin: '0 0 24px' },
  title: { margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: '#1a1a2e' },
  sub: { margin: '0 0 32px', color: '#888', fontSize: '14px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#444' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' },
  roleRow: { display: 'flex', gap: '16px' },
  roleCard: { flex: 1, padding: '16px', borderRadius: '12px', border: '2px solid #eee', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' },
  roleSelected: { border: '2px solid #6C63FF', background: '#f0efff' },
  roleIcon: { fontSize: '28px', marginBottom: '8px' },
  roleName: { fontWeight: '700', color: '#1a1a2e', fontSize: '15px' },
  roleDesc: { fontSize: '12px', color: '#888', marginTop: '4px' },
  btn: { width: '100%', padding: '13px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  error: { background: '#ffe3e3', color: '#c92a2a', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' },
  link: { color: '#6C63FF', cursor: 'pointer', fontWeight: '600' }
};

export default Register;