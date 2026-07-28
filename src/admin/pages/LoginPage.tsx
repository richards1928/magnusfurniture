import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/admin');
    else setError('Invalid email or password.');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1A1612 0%, #2A2219 100%)',
    }}>
      <div style={{
        width: 400, padding: 48, background: '#fff', borderRadius: 20,
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#3E2723', color: '#D4AF37',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-heading)',
            marginBottom: 16,
          }}>M</div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
            color: '#1A1A1A', marginBottom: 4,
          }}>Magnus Admin</h1>
          <p style={{ fontSize: 14, color: '#888' }}>Sign in to manage your business</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', marginBottom: 6, display: 'block' }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              required placeholder="admin@magnus.com"
              style={{
                width: '100%', padding: '14px 16px', fontSize: 14,
                border: '1px solid #E5E5E5', borderRadius: 10,
                background: '#FAFAFA', outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', marginBottom: 6, display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                required placeholder="Enter password"
                style={{
                  width: '100%', padding: '14px 44px 14px 16px', fontSize: 14,
                  border: '1px solid #E5E5E5', borderRadius: 10,
                  background: '#FAFAFA', outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#AAA', padding: 4,
              }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: 'rgba(192,57,43,0.08)', color: '#C0392B',
              fontSize: 13, fontWeight: 500,
            }}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={{
            padding: '14px 24px', background: '#1A1612', color: '#fff',
            borderRadius: 10, fontSize: 14, fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer', border: 'none',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
            fontFamily: 'var(--font-body)',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
