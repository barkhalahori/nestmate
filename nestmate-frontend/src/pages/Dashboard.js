import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // decode token to get email and role
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ email: payload.sub, role: payload.role });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>🏠 NestMate</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={styles.badge}>{user.role}</span>
          <span style={{ color: '#666', fontSize: '14px' }}>{user.email}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.welcome}>Welcome back! 👋</h1>
        <p style={styles.sub}>What would you like to do today?</p>

        <div style={styles.cardRow}>
          {user.role === 'LANDLORD' && (
            <div style={styles.card} onClick={() => navigate('/listings/new')}>
              <div style={styles.cardIcon}>🏡</div>
              <h3 style={styles.cardTitle}>Post a Listing</h3>
              <p style={styles.cardDesc}>List your available room or flat for seekers to find.</p>
              <button style={styles.btn}>Post Now →</button>
            </div>
          )}

          {user.role === 'SEEKER' && (
            <>
            <div style={styles.card} onClick={() => navigate('/match')}>
              <div style={styles.cardIcon}>🤖</div>
              <h3 style={styles.cardTitle}>Find Matches</h3>
              <p style={styles.cardDesc}>See AI-ranked listings compatible with your preferences.</p>
              <button style={styles.btn}>View Matches →</button>
            </div>

            <div style={styles.card} onClick={() => navigate('/payment')}>
              <div style={styles.cardIcon}>✅</div>
              <h3 style={styles.cardTitle}>Get Verified</h3>
              <p style={styles.cardDesc}>Pay ₹99 to get a verified badge and 3x more responses.</p>
              <button style={styles.btn}>Verify Now →</button>
            </div>
            </>
          )}

          <div style={styles.card} onClick={() => navigate('/profile')}>
            <div style={styles.cardIcon}>👤</div>
            <h3 style={styles.cardTitle}>My Profile</h3>
            <p style={styles.cardDesc}>Update your lifestyle preferences for better matching.</p>
            <button style={styles.btn}>Edit Profile →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF' },
  badge: { background: '#6C63FF', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  logoutBtn: { padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontSize: '14px' },
  content: { padding: '60px 48px' },
  welcome: { fontSize: '36px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  sub: { color: '#888', fontSize: '16px', marginBottom: '48px' },
  cardRow: { display: 'flex', gap: '32px', flexWrap: 'wrap' },
  card: { background: '#fff', borderRadius: '16px', padding: '40px 32px', width: '280px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s' },
  cardIcon: { fontSize: '48px', marginBottom: '16px' },
  cardTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 8px' },
  cardDesc: { color: '#888', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' },
  btn: { padding: '10px 20px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }
};

export default Dashboard;