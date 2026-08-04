import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ['0px', '-60px']);

  // Trigger text animation ~0.8s after video starts playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setVideoReady(true);
      setTimeout(() => setTextVisible(true), 600);
    };

    // If video already playing (e.g. cached)
    if (!video.paused) {
      handlePlay();
    } else {
      video.addEventListener('playing', handlePlay, { once: true });
    }

    // Fallback: show text after 1.5s regardless
    const fallback = setTimeout(() => setTextVisible(true), 1500);

    return () => {
      video.removeEventListener('playing', handlePlay);
      clearTimeout(fallback);
    };
  }, []);

  // Stagger variants for left-side text
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0,
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0C0A09',
      }}
    >
      {/* ── Video Background ── */}
      <motion.div
        style={{ position: 'absolute', inset: 0, y: bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <video
          ref={videoRef}
          src="/assets/Home/Transform.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Left-side scrim only — keeps video crystal-clear on the right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(12,10,9,0.82) 0%, rgba(12,10,9,0.55) 38%, rgba(12,10,9,0.12) 58%, rgba(12,10,9,0.0) 75%)',
          }}
        />
        {/* Subtle bottom vignette */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            background: 'linear-gradient(to top, rgba(12,10,9,0.55) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Fallback dark bg while video loads */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, #1A1612 0%, #2A2219 30%, #1A1612 60%, #0C0A09 100%)',
          zIndex: videoReady ? -1 : 0,
        }}
        animate={{ opacity: videoReady ? 0 : 1 }}
        transition={{ duration: 1 }}
      />

      {/* Warm gold accent glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 15% 60%, rgba(212,175,55,0.07) 0%, transparent 55%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Left Panel Content ── */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 3,
          width: 'clamp(320px, 42vw, 560px)',
          padding: '0 clamp(24px, 4vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          {textVisible && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: '100%' }}
            >
              {/* Overline */}
              <motion.div
                variants={slideLeft}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,55,0.92)',
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: 'rgba(212,175,55,0.55)',
                    display: 'inline-block',
                  }}
                />
                Premium Office Furniture
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: 'rgba(212,175,55,0.55)',
                    display: 'inline-block',
                  }}
                />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={slideUp}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 4rem)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  marginBottom: 24,
                }}
              >
                Transforming
                <br />
                Workspaces.
                <br />
                <span style={{ fontWeight: 700 }}>Inspiring</span>
                <br />
                <span style={{ fontWeight: 700 }}>Productivity.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={slideUp}
                style={{
                  fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.85,
                  marginBottom: 40,
                }}
              >
                Premium office furniture solutions designed to elevate modern businesses through
                comfort, functionality, and timeless design.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={slideUp}
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                  marginBottom: 56,
                }}
              >
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '15px 34px',
                      background: '#FFFFFF',
                      color: '#0C0A09',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(255,255,255,0.18)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Explore Collections <ArrowRight size={15} />
                  </span>
                </Link>

                <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '15px 34px',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.82)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.42)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Launch Workspace Designer
                  </span>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={slideUp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="rgba(212,175,55,0.95)" color="rgba(212,175,55,0.95)" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    4.9 Google Rating
                  </span>
                </div>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)' }}>
                  17+ Verified Reviews
                </span>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)' }}>
                  Premium Office Specialists
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          section { min-height: 100svh !important; }
        }
      `}</style>
    </section>
  );
}
