import { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m NestMate AI 🤖 Ask me anything about finding flatmates!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8086/chat', {
        message: input
      });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Make sure chatbot-service is running!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div>
      {/* Floating Button */}
      <button style={styles.fab} onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={styles.window}>
          <div style={styles.header}>
            <span>🤖 NestMate AI</span>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Ask me anything!</span>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                ...styles.message,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#6C63FF' : '#f0f0f0',
                color: msg.role === 'user' ? '#fff' : '#1a1a2e'
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.message, background: '#f0f0f0', color: '#888' }}>
                Thinking...
              </div>
            )}
          </div>

          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
            />
            <button style={styles.sendBtn} onClick={sendMessage}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  fab: { position: 'fixed', bottom: '32px', right: '32px', width: '56px', height: '56px', borderRadius: '50%', background: '#6C63FF', color: '#fff', border: 'none', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(108,99,255,0.4)', zIndex: 1000 },
  window: { position: 'fixed', bottom: '100px', right: '32px', width: '340px', height: '480px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', zIndex: 1000, overflow: 'hidden' },
  header: { background: '#6C63FF', color: '#fff', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '2px' },
  messages: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  message: { padding: '10px 14px', borderRadius: '12px', fontSize: '14px', maxWidth: '80%', lineHeight: '1.5', wordBreak: 'break-word' },
  inputRow: { display: 'flex', padding: '12px', borderTop: '1px solid #eee', gap: '8px' },
  input: { flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
  sendBtn: { padding: '10px 16px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }
};

export default Chatbot;