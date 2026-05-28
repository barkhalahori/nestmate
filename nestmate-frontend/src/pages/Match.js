import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatches } from '../services/api';

function Match() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    getMatches(userId)
      .then(res => { setMatches(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load matches. Make sure matching-service is running.'); setLoading(false); });
  }, [navigate]);

  const getScoreColor = (score) => {
    if (score >= 0.8) return '#2f9e44';
    if (score >= 0.6) return '#f08c00';
    return '#e03131';
  };

  const getScoreLabel = (score) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Average Match';
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.logo} onClick={() => navigate('/dashboard')}>🏠 NestMate</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Your Matches 🤖</h1>
        <p style={styles.sub}>AI-ranked listings based on your lifestyle preferences</p>

        {loading && <div style={styles.loading}>Finding your best matches...</div>}
        {error && <div style={styles.error}>{error}</div>}

        {!loading && !error && matches.length === 0 && (
          <div style={styles.empty}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏠</div>
            <h3>No matches found</h3>
            <p>Try updating your profile preferences or check back later.</p>
          </div>
        )}

        <div style={styles.cardGrid}>
          {matches.map((listing, index) => (
            <div key={listing.id} style={styles.card}>
              {/* Score Badge */}
              <div style={styles.cardHeader}>
                <span style={styles.rank}>#{index + 1}</span>
                <span style={{ ...styles.scoreBadge, background: getScoreColor(listing.score) }}>
                  {getScoreLabel(listing.score)}
                </span>
              </div>

              {/* Score Bar */}
              <div style={styles.scoreBarContainer}>
                <div style={styles.scoreBarLabel}>
                  <span>Compatibility</span>
                  <span style={{ color: getScoreColor(listing.score), fontWeight: '700' }}>
                    {Math.round(listing.score * 100)}%
                  </span>
                </div>
                <div style={styles.scoreBarBg}>
                  <div style={{
                    ...styles.scoreBarFill,
                    width: `${listing.score * 100}%`,
                    background: getScoreColor(listing.score)
                  }} />
                </div>
              </div>

              {/* Listing Details */}
              <h3 style={styles.location}>📍 {listing.location}</h3>
              <div style={styles.detailRow}>
                <span style={styles.detail}>💰 ₹{listing.rent}/month</span>
                <span style={styles.detail}>🛏 {listing.availableBeds} bed available</span>
              </div>
              <div style={styles.tagRow}>
                {listing.vegetarian && <span style={styles.tag}>🥗 Vegetarian</span>}
                {listing.acAvailable && <span style={styles.tag}>❄️ AC</span>}
                {listing.electricityIncluded && <span style={styles.tag}>⚡ Electricity included</span>}
                <span style={styles.tag}>👤 {listing.preferredGender}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF', cursor: 'pointer' },
  backBtn: { padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontSize: '14px' },
  content: { maxWidth: '900px', margin: '0 auto', padding: '60px 24px' },
  title: { fontSize: '36px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  sub: { color: '#888', marginBottom: '40px' },
  loading: { textAlign: 'center', padding: '60px', color: '#6C63FF', fontSize: '18px' },
  error: { background: '#ffe3e3', color: '#c92a2a', padding: '16px', borderRadius: '8px', marginBottom: '20px' },
  empty: { textAlign: 'center', padding: '80px', color: '#888' },
  cardGrid: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { background: '#fff', borderRadius: '16px', padding: '28px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  rank: { fontSize: '24px', fontWeight: '800', color: '#6C63FF' },
  scoreBadge: { color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' },
  scoreBarContainer: { marginBottom: '20px' },
  scoreBarLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '6px' },
  scoreBarBg: { background: '#f0f0f0', borderRadius: '99px', height: '8px' },
  scoreBarFill: { height: '8px', borderRadius: '99px', transition: 'width 0.5s ease' },
  location: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 12px' },
  detailRow: { display: 'flex', gap: '20px', marginBottom: '16px' },
  detail: { fontSize: '14px', color: '#555' },
  tagRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tag: { background: '#f0efff', color: '#6C63FF', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }
};

export default Match;