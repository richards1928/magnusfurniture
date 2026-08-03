import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wand2,
  ArrowRight,
  Sliders,
  Ruler,
  Palette,
  Zap,
  CheckCircle,
  PenTool,
  Monitor,
  Box,
  X,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import '../styles/CustomFurniturePage.css';

// Import real catalog images for finish showcase
import deskWalnut from '../assets/products/mdTables/vb-alaska.webp';
import deskTeak from '../assets/products/mdTables/vb-prestige.webp';
import deskCharcoal from '../assets/products/mdTables/vb-regal-desk.webp';
import deskWhite from '../assets/products/managerTables/bold.webp';

interface FinishOption {
  id: string;
  name: string;
  type: string;
  colorHex: string;
  image: string;
  description: string;
  accent: string;
}

const finishOptions: FinishOption[] = [
  {
    id: 'walnut',
    name: 'Walnut Charcoal Veneer',
    type: 'Natural Hardwood Finish',
    colorHex: '#3E2723',
    image: deskWalnut,
    description: 'Deep, rich walnut grain with matte protective lacquer for executive cabins.',
    accent: 'Champagne Brass Trim'
  },
  {
    id: 'teak',
    name: 'Royal Teak & Gold',
    type: 'Premium Architectural Wood',
    colorHex: '#5D4037',
    image: deskTeak,
    description: 'Warm golden teak tones pairing naturally with modern open-plan spaces.',
    accent: 'Brushed Gold Framing'
  },
  {
    id: 'charcoal',
    name: 'Matte Charcoal & Steel',
    type: 'Industrial Modern Finish',
    colorHex: '#1A1A1A',
    image: deskCharcoal,
    description: 'Ultra-durable anti-fingerprint matte surface with heavy steel legs.',
    accent: 'Anodized Black Metal'
  },
  {
    id: 'white',
    name: 'Nordic Oak & High-Gloss',
    type: 'Minimalist Bright Finish',
    colorHex: '#F5F5F0',
    image: deskWhite,
    description: 'Light reflective surfaces paired with Scandinavian oak accents.',
    accent: 'Satin Silver Trims'
  }
];

export function CustomFurniturePage() {
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(finishOptions[0]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setQuoteModalOpen(false);
    }, 2200);
  };

  return (
    <div className="custom-furniture-page">
      {/* ============================================================
          1. HERO SECTION
         ============================================================ */}
      <section className="custom-hero">
        <div className="custom-hero-grid" />
        <div className="custom-hero-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--color-accent)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--ls-wider)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-6)'
            }}
          >
            <Wand2 size={14} /> Tailor-Made Corporate Furniture
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 'var(--fw-semibold)',
              color: '#FFFFFF',
              lineHeight: 'var(--lh-tight)',
              marginBottom: 'var(--space-6)',
              maxWidth: 920,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Custom Furniture Engineering & <span style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-light)' }}>3D Design</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 'var(--lh-relaxed)',
              maxWidth: 780,
              margin: '0 auto var(--space-8)'
            }}
          >
            Bring your corporate vision to life. Work with our spatial architects or configure custom desks, executive suites, and conference tables engineered to your exact floor plan, team sizes, and brand aesthetic.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <Link to="/designer" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8932b 100%)',
                  color: 'var(--color-dark)',
                  fontWeight: 'var(--fw-bold)',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)'
                }}
              >
                Launch 3D Workspace Designer <ArrowRight size={18} />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setQuoteModalOpen(true)}
              style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF' }}
            >
              Request Custom CAD Proposal
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. CUSTOMIZATION PILLARS
         ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Engineered For Your Space"
            title="Customization Capabilities"
            description="We build bespoke furniture tailored precisely to your floor plan dimensions, ergonomic requirements, and brand identity."
          />

          <div className="pillars-grid">
            {[
              {
                icon: Ruler,
                title: 'Millimeter-Perfect Fit',
                desc: 'Tailored dimensions to fit non-standard room footprints, corner angles, and column cutouts with zero wasted space.'
              },
              {
                icon: Palette,
                title: '50+ Swatch Finishes',
                desc: 'Select from natural wood veneers, high-pressure laminates, premium leatherettes, and custom brand color matching.'
              },
              {
                icon: Zap,
                title: 'Smart Wire-Management',
                desc: 'Concealed power raceways, flip-up pop-up boxes, wireless charging modules, and integrated cable snakes.'
              },
              {
                icon: Sliders,
                title: 'Ergonomic Options',
                desc: 'Dual-motor electric sit-stand height adjustment, acoustic privacy screens, and customized modesty panels.'
              }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="pillar-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="pillar-icon-box">
                  <pillar.icon size={26} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body-lg)', color: 'var(--color-dark)', marginBottom: 8 }}>
                  {pillar.title}
                </h4>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)', lineHeight: 'var(--lh-relaxed)' }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. INTERACTIVE MATERIAL & FINISH PREVIEWER
         ============================================================ */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <SectionHeading
            subtitle="Interactive Palette Configurator"
            title="Choose Your Custom Finish Palette"
            description="Preview how different hardwood veneers, metal trims, and accent materials transform the aesthetic of our custom executive desks."
          />

          <div className="finishes-preview-container">
            {/* Left: Swatch Selector List */}
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', color: 'var(--color-primary)', fontWeight: 'var(--fw-bold)', marginBottom: 12 }}>
                Select Surface Finish
              </div>
              {finishOptions.map((opt) => {
                const isActive = selectedFinish.id === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`finish-option-card ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedFinish(opt)}
                  >
                    <div className="finish-swatch" style={{ backgroundColor: opt.colorHex }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>
                        {opt.name}
                      </div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)' }}>
                        {opt.type} • {opt.accent}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Live Render Display */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: '#0D0A09',
                aspectRatio: '16/10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedFinish.id}
                    src={selectedFinish.image}
                    alt={selectedFinish.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AnimatePresence>
              </div>

              {/* Active Swatch Detail Overlay Badge */}
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.1em' }}>
                  ACTIVE FINISH CONFIGURATION
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body-lg)', fontWeight: 'bold', color: 'var(--color-dark)' }}>
                  {selectedFinish.name}
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}>
                  {selectedFinish.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. CRAFTSMANSHIP WORKFLOW
         ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Precision Execution"
            title="How Custom Furniture Engineering Works"
            description="Our structured 4-step manufacturing process ensures perfect fit, high structural integrity, and timely delivery."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-6)'
          }}>
            {[
              { step: '01', icon: PenTool, title: 'Requirement Analysis', desc: 'Detailed site measurements, seating layout study, and functional specs.' },
              { step: '02', icon: Monitor, title: '3D CAD Rendering', desc: 'Drafting 2D floor plans & photorealistic 3D models for instant approval.' },
              { step: '03', icon: Box, title: 'CNC Workshop Crafting', desc: 'Precision edge-banding, German CNC woodcutting, and strict ISO testing.' },
              { step: '04', icon: CheckCircle, title: 'White-Glove Setup', desc: 'On-site assembly, levelling, cable routing, and final room signoff.' }
            ].map((st, i) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  border: '1px solid var(--color-gray-200)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: 'var(--radius-full)',
                  background: 'var(--color-cream)', border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)', margin: '0 auto var(--space-4)'
                }}>
                  <st.icon size={26} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>STEP {st.step}</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body-lg)', color: 'var(--color-dark)', margin: '6px 0' }}>{st.title}</h4>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)' }}>{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. GALLERY TEASER BANNER
         ============================================================ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            background: 'radial-gradient(circle at 50% 50%, #2A1D1A 0%, #150E0C 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12)',
            color: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <Sparkles size={32} style={{ color: 'var(--color-accent)', marginBottom: 16 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', marginBottom: 'var(--space-4)', color: '#FFF' }}>
              Explore Customer-Built Workspaces
            </h2>
            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto var(--space-8)' }}>
              From custom boardroom tables to high-density 100-seater modular workstations, browse our completed project gallery.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link to="/gallery" style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{ background: 'var(--color-accent)', color: 'var(--color-dark)', fontWeight: 'bold' }}>
                  Browse Project Gallery <ArrowRight size={16} />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setQuoteModalOpen(true)}
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFF' }}
              >
                Request Custom CAD Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. INTERACTIVE CAD QUOTE MODAL
         ============================================================ */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="quote-modal-overlay" onClick={() => setQuoteModalOpen(false)}>
            <motion.div
              className="quote-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="quote-modal-header">
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)' }}>
                    Bespoke Custom Furniture
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: '#FFF' }}>
                    Request Custom CAD & Estimate
                  </h3>
                </div>
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: 4 }}
                >
                  <X size={22} />
                </button>
              </div>

              <div className="quote-modal-body">
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 'var(--radius-full)',
                      background: 'rgba(45, 212, 191, 0.1)', color: 'var(--color-success)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto var(--space-4)'
                    }}>
                      <CheckCircle size={36} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: 'var(--color-dark)', marginBottom: 8 }}>
                      CAD Estimate Request Sent!
                    </h3>
                    <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--fs-body)' }}>
                      Our custom furniture engineer will prepare your 2D/3D proposal and contact you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label className="form-label">Custom Furniture Category</label>
                      <select className="form-select">
                        <option value="Executive Desks">Executive / MD Cabins</option>
                        <option value="Modular Workstations">Modular Team Workstations</option>
                        <option value="Boardroom Tables">Conference / Boardroom Tables</option>
                        <option value="Reception Desks">Custom Reception Desks</option>
                        <option value="Storage Credenza">Storage & File Credenzas</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" required placeholder="e.g. Anand Sharma" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name *</label>
                        <input type="text" required placeholder="e.g. Horizon Labs" className="form-input" />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input type="email" required placeholder="name@company.com" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone *</label>
                        <input type="tel" required placeholder="+91 90906 26209" className="form-input" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Custom Dimensions & Special Features</label>
                      <textarea
                        rows={3}
                        placeholder="Mention required desk dimensions, wood finish preferences, power grommet needs, or room layout notes..."
                        className="form-textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        marginTop: 'var(--space-4)',
                        padding: '14px',
                        fontSize: 'var(--fs-body-lg)'
                      }}
                    >
                      Get Instant CAD Estimate <ArrowRight size={18} />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
