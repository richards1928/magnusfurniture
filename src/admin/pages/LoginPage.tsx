import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

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

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetLoading(true);

    const res = await authService.requestPasswordReset(resetEmail || email);
    setResetLoading(false);

    if (res.success) {
      setResetSuccess(true);
    } else {
      setResetError(res.error || 'Failed to send recovery email.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1A1612 0%, #2A2219 100%)',
      padding: 24,
    }}>
      <div style={{
        width: 400, padding: 48, background: '#fff', borderRadius: 20,
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src="/logomagnus.png"
            alt="Magnus Logo"
            style={{
              width: 56,
              height: 56,
              objectFit: 'contain',
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
            color: '#1A1A1A', marginBottom: 4,
          }}>
            {forgotMode ? 'Recover Password' : 'Magnus Admin'}
          </h1>
          <p style={{ fontSize: 14, color: '#888' }}>
            {forgotMode
              ? 'Enter your registered email to receive a recovery link'
              : 'Sign in to manage your business'}
          </p>
        </div>

        {forgotMode ? (
          resetSuccess ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(39, 174, 96, 0.1)', color: '#27AE60',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
                Recovery Link Sent!
              </h3>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 24 }}>
                Check your inbox at <strong>{resetEmail || email}</strong> for the password reset link.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotMode(false);
                  setResetSuccess(false);
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '12px 20px', background: '#1A1612', color: '#fff',
                  borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none',
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={14} /> Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', marginBottom: 6, display: 'block' }}>
                  Admin Email
                </label>
                <input
                  type="email"
                  value={resetEmail || email}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                  placeholder="admin@company.com"
                  autoComplete="email"
                  style={{
                    width: '100%', padding: '14px 16px', fontSize: 14,
                    border: '1px solid #E5E5E5', borderRadius: 10,
                    background: '#FAFAFA', outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {resetError && (
                <div style={{
                  padding: '10px 14px', borderRadius: 8,
                  background: 'rgba(192,57,43,0.08)', color: '#C0392B',
                  fontSize: 13, fontWeight: 500, lineHeight: 1.4,
                }}>
                  {resetError}
                </div>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                style={{
                  padding: '14px 24px', background: '#1A1612', color: '#fff',
                  borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: resetLoading ? 'wait' : 'pointer', border: 'none',
                  opacity: resetLoading ? 0.7 : 1, transition: 'opacity 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {resetLoading ? 'Sending Reset Link...' : 'Send Recovery Email'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setResetError('');
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#666', fontSize: 13, display: 'inline-flex',
                    alignItems: 'center', gap: 6, fontWeight: 500,
                  }}
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
              </div>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', marginBottom: 6, display: 'block' }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="admin@company.com"
                autoComplete="username"
                style={{
                  width: '100%', padding: '14px 16px', fontSize: 14,
                  border: '1px solid #E5E5E5', borderRadius: 10,
                  background: '#FAFAFA', outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', margin: 0, display: 'block' }}>Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(true);
                    setError('');
                    setResetEmail(email);
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#888', fontSize: 12, padding: 0, textDecoration: 'underline',
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  required placeholder="Enter password"
                  autoComplete="current-password"
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
        )}
      </div>
    </div>
  );
}
