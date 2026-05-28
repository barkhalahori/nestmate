import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>🏠 NestMate</h2>
        <div>
          <button style={styles.navBtn} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.primaryBtn} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Perfect Flatmate</h1>
        <p style={styles.heroSub}>
          AI-powered matching connects you with compatible flatmates based on lifestyle, budget, and preferences.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button style={styles.primaryBtn} onClick={() => navigate('/register')}>
            Find a Flatmate
          </button>
          <button style={styles.outlineBtn} onClick={() => navigate('/register')}>
            List Your Place
          </button>
        </div>
      </div>

      {/* How it works */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.cardRow}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>📝</div>
            <h3>Create Profile</h3>
            <p>Tell us your lifestyle preferences, budget, and location.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🤖</div>
            <h3>AI Matching</h3>
            <p>Our algorithm scores compatibility across 6 parameters.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🤝</div>
            <h3>Connect</h3>
            <p>Get verified and connect with your best matches.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 NestMate. Built with Spring Boot + React + AI.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f8f9fa' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF' },
  navBtn: { padding: '8px 20px', marginRight: '12px', border: '1px solid #6C63FF', borderRadius: '8px', background: 'transparent', color: '#6C63FF', cursor: 'pointer', fontSize: '14px' },
  primaryBtn: { padding: '10px 24px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' },
  outlineBtn: { padding: '10px 24px', background: 'transparent', color: '#6C63FF', border: '2px solid #6C63FF', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' },
  hero: { textAlign: 'center', padding: '100px 24px 80px', background: 'linear-gradient(135deg, #6C63FF 0%, #3b5bdb 100%)', color: '#fff' },
  heroTitle: { fontSize: '52px', fontWeight: '800', margin: '0 0 20px' },
  heroSub: { fontSize: '20px', marginBottom: '40px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' },
  section: { padding: '80px 48px', textAlign: 'center' },
  sectionTitle: { fontSize: '32px', fontWeight: '700', marginBottom: '48px', color: '#1a1a2e' },
  cardRow: { display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' },
  card: { background: '#fff', borderRadius: '16px', padding: '40px 32px', width: '260px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  cardIcon: { fontSize: '48px', marginBottom: '16px' },
  footer: { textAlign: 'center', padding: '32px', background: '#1a1a2e', color: '#aaa' }
};

export default Landing;