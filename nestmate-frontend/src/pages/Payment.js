import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '../services/api';

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await createPayment({
        userId: getUserId(),
        amount: 99,
        currency: 'inr'
      });
      setPaymentData(res.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Make sure payment-service is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.logo} onClick={() => navigate('/dashboard')}>🏠 NestMate</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Get Verified ✅</h1>
        <p style={styles.sub}>Verified users get 3x more responses from landlords</p>

        {!success ? (
          <div style={styles.card}>
            <div style={styles.priceTag}>
              <div style={styles.price}>₹99</div>
              <div style={styles.priceLabel}>one-time verification fee</div>
            </div>

            <div style={styles.benefits}>
              <div style={styles.benefit}>✅ Verified badge on your profile</div>
              <div style={styles.benefit}>✅ Priority in search results</div>
              <div style={styles.benefit}>✅ 3x more landlord responses</div>
              <div style={styles.benefit}>✅ Background check completed</div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              style={styles.btn}
              onClick={handlePayment}
              disabled={loading}>
              {loading ? 'Processing...' : '🔒 Pay ₹99 & Get Verified'}
            </button>

            <p style={styles.secure}>
              🔒 Secured by Stripe. Your payment info is never stored.
            </p>
          </div>
        ) : (
          <div style={styles.successCard}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={styles.successTitle}>Payment Initiated!</h2>
            <p style={styles.successSub}>Your verification is being processed.</p>

            <div style={styles.infoBox}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Payment ID</span>
                <span style={styles.infoValue}>{paymentData?.stripePaymentIntentId}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Amount</span>
                <span style={styles.infoValue}>₹{paymentData?.amount}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status</span>
                <span style={{ ...styles.infoValue, color: '#f08c00', fontWeight: '700' }}>
                  {paymentData?.status}
                </span>
              </div>
            </div>

            <button style={styles.btn} onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logo: { margin: 0, color: '#6C63FF', cursor: 'pointer' },
  backBtn: { padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontSize: '14px' },
  content: { maxWidth: '500px', margin: '0 auto', padding: '60px 24px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px', textAlign: 'center' },
  sub: { color: '#888', marginBottom: '40px', textAlign: 'center' },
  card: { background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' },
  priceTag: { marginBottom: '32px' },
  price: { fontSize: '56px', fontWeight: '800', color: '#6C63FF' },
  priceLabel: { color: '#888', fontSize: '14px' },
  benefits: { textAlign: 'left', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' },
  benefit: { fontSize: '15px', color: '#444', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  btn: { width: '100%', padding: '14px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' },
  secure: { fontSize: '12px', color: '#aaa', margin: 0 },
  error: { background: '#ffe3e3', color: '#c92a2a', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
  successCard: { background: '#fff', borderRadius: '16px', padding: '48px 40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' },
  successIcon: { fontSize: '64px', marginBottom: '16px' },
  successTitle: { fontSize: '28px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  successSub: { color: '#888', marginBottom: '32px' },
  infoBox: { background: '#f8f9fa', borderRadius: '12px', padding: '20px', marginBottom: '32px', textAlign: 'left' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
  infoLabel: { color: '#888', fontSize: '14px' },
  infoValue: { color: '#1a1a2e', fontSize: '14px', fontWeight: '500' }
};

export default Payment;