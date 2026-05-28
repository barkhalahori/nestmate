import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';

function NewListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: '', rent: '', totalBeds: '', availableBeds: '',
    vegetarian: false, preferredGender: 'ANY',
    acAvailable: false, electricityIncluded: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId || 5; // fallback
      await createListing({ ...form, userId, rent: parseFloat(form.rent), totalBeds: parseInt(form.totalBeds), availableBeds: parseInt(form.availableBeds) });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create listing. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.logo} onClick={() => navigate('/dashboard')}>🏠 NestMate</h2>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Post a New Listing</h1>
        <p style={styles.sub}>Fill in details about your place</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Location</label>
              <input style={styles.input} name="location" placeholder="Ahmedabad, Gujarat"
                value={form.location} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Monthly Rent (₹)</label>
              <input style={styles.input} name="rent" type="number" placeholder="8000"
                value={form.rent} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Total Beds</label>
              <input style={styles.input} name="totalBeds" type="number" placeholder="3"
                value={form.totalBeds} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Available Beds</label>
              <input style={styles.input} name="availableBeds" type="number" placeholder="1"
                value={form.availableBeds} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Preferred Gender</label>
            <select style={styles.input} name="preferredGender" value={form.preferredGender} onChange={handleChange}>
              <option value="ANY">Any</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div style={styles.checkRow}>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="vegetarian" checked={form.vegetarian} onChange={handleChange} />
              &nbsp; Vegetarian preferred
            </label>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="acAvailable" checked={form.acAvailable} onChange={handleChange} />
              &nbsp; AC Available
            </label>
            <label style={styles.checkLabel}>
              <input type="checkbox" name="electricityIncluded" checked={form.electricityIncluded} onChange={handleChange} />
              &nbsp; Electricity Included
            </label>
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, sans-serif' },
  nav: { padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF', cursor: 'pointer' },
  content: { maxWidth: '700px', margin: '0 auto', padding: '60px 24px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  sub: { color: '#888', marginBottom: '40px' },
  form: { background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  row: { display: 'flex', gap: '20px', marginBottom: '0' },
  field: { flex: 1, marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#444' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' },
  checkRow: { display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' },
  checkLabel: { fontSize: '14px', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btn: { width: '100%', padding: '13px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  error: { background: '#ffe3e3', color: '#c92a2a', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }
};

export default NewListing;