import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log privately for debugging during development without exposing technical internals to users
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-warm-white, #FFFDF8)',
            padding: '24px 16px',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: '100%',
              textAlign: 'center',
              background: 'var(--color-white, #ffffff)',
              border: '1px solid var(--color-gray-200, #E5E5E5)',
              borderRadius: 'var(--radius-xl, 20px)',
              padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 36px)',
              boxShadow: 'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.06))',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.12)',
                color: 'var(--color-accent, #D4AF37)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)',
                fontWeight: 700,
                color: 'var(--color-dark, #1A1A1A)',
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                fontSize: 'var(--fs-body, 1rem)',
                color: 'var(--color-gray-600, #666666)',
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              We encountered an unexpected display issue. Please try refreshing the page or return to the home page.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  fontSize: 'var(--fs-body, 1rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'var(--color-primary, #5A321C)',
                  border: 'none',
                  borderRadius: 'var(--radius-md, 8px)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <RefreshCw size={16} /> Try Again
              </button>

              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  fontSize: 'var(--fs-body, 1rem)',
                  fontWeight: 500,
                  color: 'var(--color-primary, #5A321C)',
                  background: 'transparent',
                  border: '1.5px solid var(--color-primary, #5A321C)',
                  borderRadius: 'var(--radius-md, 8px)',
                  textDecoration: 'none',
                }}
              >
                <Home size={16} /> Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
