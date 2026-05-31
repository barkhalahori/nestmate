import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProfile, getProfile } from '../services/api';

function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    preferredLocation: '', maxBudget: '', preferredGender: 'ANY',
    vegetarian: false, acRequired: false,
    electricityIncluded: false, lookingFor: 'ROOM'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUserId(payload.userId);

    // load existing profile
    setLoading(true);
    getProfile(payload.userId)
      .then(res => {
        setForm({
          preferredLocation: res.data.preferredLocation || '',
          maxBudget: res.data.maxBudget || '',
          preferredGender: res.data.preferredGender || 'ANY',
          vegetarian: res.data.vegetarian || false,
          acRequired: res.data.acRequired || false,
          electricityIncluded: res.data.electricityIncluded || false,
          lookingFor: res.data.lookingFor || 'ROOM'
        });
      })
      .catch(() => {}) // no profile yet, use defaults
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveProfile({ ...form, userId, maxBudget: parseFloat(form.maxBudget) });
      setMessage('Profile saved successfully!');
    } catch (err) {
      setMessage('Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.logo} onClick={() => navigate('/dashboard')}>🏠 NestMate</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>My Preferences ⚙️</h1>
        <p style={styles.sub}>These preferences are used to find your best matches</p>

        {message && (
          <div style={{ ...styles.msg, background: message.includes('success') ? '#d3f9d8' : '#ffe3e3',
            color: message.includes('success') ? '#2f9e44' : '#c92a2a' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Preferred Location</label>
              <input style={styles.input} name="preferredLocation"
                placeholder="Ahmedabad, Gujarat"
                value={form.preferredLocation} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Max Budget (₹/month)</label>
              <input style={styles.input} name="maxBudget" type="number"
                placeholder="10000" value={form.maxBudget}
                onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Preferred Gender of Flatmate</label>
              <select style={styles.input} name="preferredGender"
                value={form.preferredGender} onChange={handleChange}>
                <option value="ANY">Any</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Looking For</label>
              <select style={styles.input} name="lookingFor"
                value={form.lookingFor} onChange={handleChange}>
                <option value="ROOM">A Room</option>
                <option value="FLATMATE">A Flatmate</option>
              </select>
            </div>
          </div>

          <div style={styles.checkRow}>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="vegetarian"
                checked={form.vegetarian} onChange={handleChange} />
              &nbsp; 🥗 Vegetarian preferred
            </label>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="acRequired"
                checked={form.acRequired} onChange={handleChange} />
              &nbsp; ❄️ AC Required
            </label>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="electricityIncluded"
                checked={form.electricityIncluded} onChange={handleChange} />
              &nbsp; ⚡ Electricity Included
            </label>
          </div>

          <button style={styles.btn} type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF', cursor: 'pointer' },
  backBtn: { padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontSize: '14px' },
  content: { maxWidth: '700px', margin: '0 auto', padding: '60px 24px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  sub: { color: '#888', marginBottom: '40px' },
  msg: { padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' },
  form: { background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  row: { display: 'flex', gap: '20px' },
  field: { flex: 1, marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#444' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' },
  checkRow: { display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' },
  checkLabel: { fontSize: '14px', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btn: { width: '100%', padding: '13px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }
};

export default Profile;