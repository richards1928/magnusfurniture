import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { authService } from '../services/auth.service';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // 1. Inspect URL hash or search params for Supabase error messages
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const params = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : search);

    const errorDesc = params.get('error_description');
    if (errorDesc) {
      setError(decodeURIComponent(errorDesc).replace(/\+/g, ' '));
      setCheckingSession(false);
      return;
    }

    // 2. Check if a session already exists (Supabase auto-parses recovery tokens from hash)
    let isMounted = true;

    async function checkAuthSession() {
      if (!supabase) {
        setError('Supabase client is not configured.');
        setCheckingSession(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        if (data?.session) {
          setHasSession(true);
          setCheckingSession(false);
        } else {
          // If token in hash hasn't resolved yet, listen to auth state changes
          const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (isMounted) {
              if (event === 'PASSWORD_RECOVERY' || session) {
                setHasSession(true);
                setCheckingSession(false);
              }
            }
          });

          // Timeout fallback if no recovery session is present
          setTimeout(() => {
            if (isMounted) {
              setCheckingSession(false);
            }
          }, 2000);

          return () => {
            listener?.subscription.unsubscribe();
          };
        }
      }
    }

    checkAuthSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.updatePassword(password);

      if (!result.success) {
        setError(result.error || 'Failed to update password.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Refresh admin session state and redirect to admin dashboard
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1A1612 0%, #2A2219 100%)',
      padding: '24px',
    }}>
      <div style={{
        width: 420,
        padding: 48,
        background: '#fff',
        borderRadius: 20,
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
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: 4,
          }}>
            Reset Admin Password
          </h1>
          <p style={{ fontSize: 14, color: '#888' }}>
            Set a new secure password for your Magnus Admin account
          </p>
        </div>

        {checkingSession ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#666', fontSize: 14 }}>
            Verifying recovery link...
          </div>
        ) : success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(39, 174, 96, 0.1)',
              color: '#27AE60',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
              Password Updated!
            </h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
              Your administrator password has been successfully updated. Redirecting to admin dashboard...
            </p>
            <Link
              to="/admin"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#1A1612',
                color: '#fff',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to Dashboard
            </Link>
          </div>
        ) : !hasSession && error ? (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '14px 16px',
              borderRadius: 10,
              background: 'rgba(192,57,43,0.08)',
              color: '#C0392B',
              fontSize: 13,
              lineHeight: 1.5,
              marginBottom: 24,
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>{error}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
                The password reset link may have expired or already been used. Please request a new link from the login page.
              </p>
              <Link
                to="/admin/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1A1612',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {error && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: 'rgba(192,57,43,0.08)',
                color: '#C0392B',
                fontSize: 13,
                fontWeight: 500,
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: 6,
                display: 'block',
              }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 16px',
                    fontSize: 14,
                    border: '1px solid #E5E5E5',
                    borderRadius: 10,
                    background: '#FAFAFA',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#AAA',
                    padding: 4,
                  }}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: 6,
                display: 'block',
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 16px',
                    fontSize: 14,
                    border: '1px solid #E5E5E5',
                    borderRadius: 10,
                    background: '#FAFAFA',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#AAA',
                    padding: 4,
                  }}
                  aria-label={showConfirmPw ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 24px',
                background: '#1A1612',
                color: '#fff',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'wait' : 'pointer',
                border: 'none',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s',
                fontFamily: 'var(--font-body)',
                marginTop: 8,
              }}
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Link
                to="/admin/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#666',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
