import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
import { designerStore, selectFurniture } from '../../store/designerStore';
import { furnitureTypes } from '../../data/furniture-types';
import { ArrowLeft, ArrowRight, Compass, Cpu, Layers, ShieldCheck } from 'lucide-react';

// Archetype Metadata for official architectural presentation
const ARCHETYPE_METADATA: Record<string, {
  title: string;
  description: string;
  code: string;
  categoryTag: string;
  categoryGroup: 'workplace' | 'conference';
  dimensionLabel: string;
  features: string[];
  specs: string;
  image: string;
}> = {
  'study-table': {
    title: 'Workstation Desk',
    description: 'Design a personalized ergonomic workstation desk with drawers, dividers, and integrated cable routing.',
    code: 'ARCH-01 // WORKSPACE',
    categoryTag: 'COMMERCIAL WORKSTATION',
    categoryGroup: 'workplace',
    dimensionLabel: '120 × 75 × 60 cm',
    features: ['Modular Drawers', 'Oak / Steel Columns', 'Cable Routing'],
    specs: 'Commercial Workstation Desk',
    image: '/assets/gallery/056e666f-cd55-4bbe-84fe-c65cd5b77944.jpg',
  },
  'office-table': {
    title: 'Executive Office Desk',
    description: 'Build a premium executive cabin desk with solid walnut accents, steel frame, and credenza storage.',
    code: 'ARCH-02 // EXEC',
    categoryTag: 'EXECUTIVE SERIES',
    categoryGroup: 'workplace',
    dimensionLabel: '150 × 75 × 70 cm',
    features: ['Solid Walnut Core', 'O-Loop Steel Frame', 'Acoustic Panel Ready'],
    specs: 'Executive Workstation',
    image: '/assets/products/mdTables/vb-regal-desk.webp',
  },
  'dining-table': {
    title: 'Conference Table',
    description: 'Create the perfect boardroom and conference table engineered for team collaboration and executive meetings.',
    code: 'ARCH-03 // CONF',
    categoryTag: 'CONFERENCE & BOARDROOM',
    categoryGroup: 'conference',
    dimensionLabel: '240 × 76 × 120 cm',
    features: ['Solid Hardwood Surface', 'Heavy-Duty Steel Base', '8–12 Seater Capacity'],
    specs: 'Executive Conference Table',
    image: '/assets/gallery/500701ec-09f9-446a-922a-852806efe644.jpg',
  },
  'coffee-table': {
    title: 'Lounge Coffee Table',
    description: 'Design a stylish coffee table for executive cabins, reception waiting areas, and breakout zones.',
    code: 'ARCH-04 // LOUNGE',
    categoryTag: 'OFFICE LOUNGE & RECEPTION',
    categoryGroup: 'conference',
    dimensionLabel: '100 × 45 × 60 cm',
    features: ['Tempered Safety Glass', 'Geometric Hairpin Frame', 'Dual-Tier Storage'],
    specs: 'Reception & Lounge Table',
    image: '/assets/gallery/70606cd9-cc97-4d21-8720-302497b8bbd3.jpg',
  },
  'tv-unit': {
    title: 'Office Media Credenza',
    description: 'Build a modern presentation media console and credenza with integrated cable management for conference rooms.',
    code: 'ARCH-05 // MEDIA',
    categoryTag: 'AV & PRESENTATION',
    categoryGroup: 'conference',
    dimensionLabel: '180 × 55 × 45 cm',
    features: ['Fluted Slatted Front', 'Concealed Cable Channel', 'Lowline Stance'],
    specs: 'Conference Media Credenza',
    image: '/assets/gallery/10593491-4b51-4019-af21-376b0ea833cc.jpg',
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export function SelectionScreen() {
  useSnapshot(designerStore);
  const [activeFilter, setActiveFilter] = useState<'all' | 'workplace' | 'conference'>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredFurniture = furnitureTypes.filter(ft => {
    if (activeFilter === 'all') return true;
    const meta = ARCHETYPE_METADATA[ft.id];
    return meta?.categoryGroup === activeFilter;
  });

  return (
    <div className="selection-screen-container">
      
      {/* ── Studio Top Header Bar ── */}
      <header className="selection-header">
        {/* Left: Brand & Return link */}
        <div className="selection-header-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ x: -3, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: '8px',
                background: 'rgba(15, 20, 30, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
            >
              <ArrowLeft size={14} color="#D4AF37" />
              <span>RETURN TO CATALOG</span>
            </motion.button>
          </Link>

          <div style={{ width: '1px', height: '22px', background: 'rgba(255, 255, 255, 0.12)' }} />

          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/logomagnus.png"
              alt="Magnus Office Furniture Logo"
              style={{
                height: 44,
                width: 'auto',
                objectFit: 'contain',
                borderRadius: 8,
                filter: 'drop-shadow(0 2px 12px rgba(212, 175, 55, 0.4))',
              }}
            />
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#ffffff',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                MAGNUS
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9.5px',
                letterSpacing: '0.2em',
                color: '#D4AF37',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginTop: '4px',
                fontWeight: 600,
              }}>
                OFFICE FURNITURE • 3D STUDIO
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Engine Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#34d399',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block',
            }} />
            ENGINE READY // WEBGL 3D
          </div>

          <div style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            color: '#64748b',
            display: 'none',
          }}>
            TOLERANCE ±1MM
          </div>
        </div>
      </header>

      {/* ── Hero Presentation Section ── */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '780px' }}
      >
        {/* Official Brand Logo & Eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '18px' }}>
          <img
            src="/logomagnus.png"
            alt="Magnus Office Furniture"
            style={{
              height: '52px',
              width: 'auto',
              objectFit: 'contain',
              marginBottom: '14px',
              filter: 'drop-shadow(0 6px 20px rgba(212, 175, 55, 0.35))',
            }}
          />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.28)',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.08)',
          }}>
            <Compass size={13} color="#D4AF37" />
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#D4AF37',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}>
              MAGNUS ARCHITECTURAL CAD SUITE
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '14px',
          lineHeight: 1.15,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #D4AF37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Select Furniture Archetype
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '1.05rem',
          color: '#94a3b8',
          lineHeight: 1.6,
          fontWeight: 400,
          margin: '0 auto',
        }}>
          Choose a certified engineering baseline to customize structural dimensions, joinery profiles,
          commercial-grade veneers, and integrated cable routing in real-time 3D CAD.
        </p>

        {/* ── Category Filter Tabs Bar ── */}
        <div className="selection-filter-bar">
          {[
            { key: 'all', label: 'All Archetypes (5)' },
            { key: 'workplace', label: 'Workplace & Desks (2)' },
            { key: 'conference', label: 'Conference & Lounge (3)' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className="selection-filter-btn"
              style={{
                background: activeFilter === tab.key ? 'rgba(212, 175, 55, 0.16)' : 'transparent',
                color: activeFilter === tab.key ? '#F3E5AB' : '#94a3b8',
                boxShadow: activeFilter === tab.key ? 'inset 0 0 0 1px rgba(212, 175, 55, 0.4)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Archetype Cards Grid ── */}
      <motion.div 
        layout
        className="selection-cards-grid"
      >
        <AnimatePresence>
          {filteredFurniture.map((ft, i) => {
            const meta = ARCHETYPE_METADATA[ft.id] || {
              title: ft.name,
              description: ft.description,
              code: `ARCH-0${i + 1}`,
              categoryTag: 'ARCHITECTURAL SERIES',
              categoryGroup: 'workplace',
              dimensionLabel: `${ft.defaultDimensions.width} × ${ft.defaultDimensions.height} × ${ft.defaultDimensions.depth} cm`,
              features: ['Customizable Dimensions', 'Modular Components'],
              specs: 'Bespoke Model',
            };
            const isHovered = hoveredCard === ft.id;

            return (
              <motion.div
                layout
                key={ft.id}
                className="selection-card-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                onMouseEnter={() => setHoveredCard(ft.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => selectFurniture(ft.id)}
                style={{
                  background: isHovered
                    ? 'linear-gradient(180deg, rgba(24, 30, 46, 0.85) 0%, rgba(13, 17, 26, 0.95) 100%)'
                    : 'linear-gradient(180deg, rgba(17, 21, 33, 0.7) 0%, rgba(10, 13, 20, 0.85) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: isHovered
                    ? '1px solid rgba(212, 175, 55, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: isHovered
                    ? '1px solid rgba(212, 175, 55, 0.7)'
                    : '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isHovered
                    ? '0 24px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.12)'
                    : '0 12px 30px -8px rgba(0, 0, 0, 0.4)',
                  transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Subtle top spotlight on hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Card Header: Archetype ID & Category */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#D4AF37',
                  }}>
                    <img
                      src="/logomagnus.png"
                      alt="Magnus Logo"
                      style={{
                        height: '16px',
                        width: 'auto',
                        objectFit: 'contain',
                        borderRadius: '3px',
                      }}
                    />
                    <span>{meta.code}</span>
                  </div>

                  <div style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}>
                    {meta.categoryTag}
                  </div>
                </div>

                {/* Real Furniture Product Image Frame */}
                <div style={{
                  width: '100%',
                  height: '185px',
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#121520',
                  border: isHovered
                    ? '1px solid rgba(212, 175, 55, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '18px',
                  boxShadow: isHovered
                    ? '0 10px 28px -6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15)'
                    : '0 4px 14px rgba(0, 0, 0, 0.35)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <img
                    src={meta.image}
                    alt={ft.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      filter: isHovered ? 'brightness(1.02) contrast(1.04)' : 'brightness(0.9) contrast(1)',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/products/mdTables/vb-regal-desk.webp';
                    }}
                  />

                  {/* Gradient Overlay for luxury tone */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(10, 12, 18, 0.15) 0%, rgba(10, 12, 18, 0.7) 100%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Top-left baseline badge */}
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(10, 12, 18, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#f1f5f9',
                    letterSpacing: '0.04em',
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 6px #10b981',
                      display: 'inline-block',
                    }} />
                    <span>3D BASELINE</span>
                  </div>

                  {/* Top-right brand stamp */}
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: '4px 9px',
                    borderRadius: '6px',
                    background: 'rgba(10, 12, 18, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#D4AF37',
                    fontFamily: 'monospace',
                    letterSpacing: '0.08em',
                  }}>
                    MAGNUS® SPEC
                  </div>

                  {/* Bottom specs overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 12,
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#ffffff',
                    textShadow: '0 2px 6px rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span style={{ color: '#D4AF37' }}>●</span>
                    <span>{meta.specs}</span>
                  </div>
                </div>

                {/* Model Title & Description */}
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.28rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    letterSpacing: '-0.01em',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span>{meta.title || ft.name}</span>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      fontWeight: 500,
                      color: '#D4AF37',
                    }}>
                      {meta.dimensionLabel}
                    </span>
                  </h2>

                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    marginBottom: '14px',
                  }}>
                    {meta.description || ft.description}
                  </p>

                  {/* Architectural Feature Pills */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '18px',
                  }}>
                    {meta.features.map((feat, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10.5px',
                          color: '#cbd5e1',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span style={{ color: '#D4AF37', fontSize: '10px' }}>•</span>
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  marginTop: 'auto',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#64748b',
                    fontFamily: 'monospace',
                  }}>
                    <Layers size={12} color="#94a3b8" />
                    <span>PARAMETRIC 3D</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: isHovered ? '#F3E5AB' : '#e2e8f0',
                    transition: 'color 0.2s ease',
                  }}>
                    <span>OPEN STUDIO</span>
                    <motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'inline-flex' }}
                    >
                      <ArrowRight size={14} color="#D4AF37" />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Official Engineering Standards Bottom Ribbon ── */}
      <footer className="selection-footer-ribbon">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#D4AF37" />
          <span>MAGNUS INDUSTRIAL QUALITY</span>
        </div>
        <span className="ribbon-divider" style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={14} color="#D4AF37" />
          <span>REAL-TIME PHOTOMETRIC RENDERING</span>
        </div>
        <span className="ribbon-divider" style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Compass size={14} color="#D4AF37" />
          <span>BESPOKE MANUFACTURING IN HYDERABAD</span>
        </div>
      </footer>
    </div>
  );
}

