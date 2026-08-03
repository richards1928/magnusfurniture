import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Compass,
  Sliders,
  Factory,
  Truck,
  Building2,
  Wrench,
  ShieldCheck,
  MessageSquare,
  MapPin,
  PenTool,
  Palette,
  FileCheck,
  Cog,
  CheckCircle2,
  Headphones,
  Building,
  Laptop,
  GraduationCap,
  Stethoscope,
  Hotel,
  Landmark,
  ShoppingBag,
  Shield,
  Users,
  Sparkles,
  Monitor,
  Award,
  Clock,
  Tag,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  PhoneCall
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import '../styles/ServicesPage.css';

// ── Data Definitions ──

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  tag: string;
  bullets: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'space-planning',
    title: 'Office Space Planning',
    description: 'Optimize office layouts for maximum productivity, smooth traffic flow, and efficient use of space.',
    icon: LayoutGrid,
    tag: 'Architectural Layouts',
    bullets: ['Ergonomic density optimization', '2D/3D layout rendering', 'Acoustic & lighting alignment']
  },
  {
    id: 'interior-design',
    title: 'Interior Design Consultation',
    description: 'Professional guidance for workspace aesthetics, planning, material palettes, and brand color selection.',
    icon: Compass,
    tag: 'Aesthetic Strategy',
    bullets: ['Color & material moodboards', 'Executive suite themes', 'Corporate identity integration']
  },
  {
    id: 'custom-furniture',
    title: 'Custom Furniture Solutions',
    description: 'Furniture designed according to client requirements, office dimensions, and corporate branding.',
    icon: Sliders,
    tag: 'Bespoke Craftsmanship',
    bullets: ['Custom dimension scaling', 'Brand color accents', 'Modular wire management']
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Production',
    description: 'High-quality manufacturing using premium materials, German CNC machinery, and strict quality standards.',
    icon: Factory,
    tag: 'Precision Crafting',
    bullets: ['Eco-friendly wood laminates', 'Heavy-duty steel frameworks', 'Strict ISO quality testing']
  },
  {
    id: 'delivery-installation',
    title: 'Delivery & Installation',
    description: 'Professional transportation, assembly, white-glove installation, and complete workspace setup.',
    icon: Truck,
    tag: 'Turnkey Execution',
    bullets: ['Climate-controlled transport', 'On-site assembly team', 'Debris cleanup & leveling']
  },
  {
    id: 'bulk-projects',
    title: 'Bulk Corporate Projects',
    description: 'Furniture solutions for Corporate Offices, Startups, Schools, Colleges, Hospitals, Hotels, and Government.',
    icon: Building2,
    tag: 'Enterprise Scale',
    bullets: ['Volume pricing tiers', 'Phased delivery schedules', 'Dedicated project manager']
  },
  {
    id: 'maintenance-repairs',
    title: 'Furniture Maintenance & Repairs',
    description: 'Repair, refurbishment, polishing, servicing, upholstery replacement, and preventative maintenance.',
    icon: Wrench,
    tag: 'Lifecycle Care',
    bullets: ['On-site refurbishment', 'Premium upholstery fixes', 'Mechanism & castor care']
  },
  {
    id: 'after-sales-support',
    title: 'Warranty & After-Sales Support',
    description: 'Warranty assistance, periodic inspections, responsive customer support, and long-term service contracts.',
    icon: ShieldCheck,
    tag: 'Long-term Support',
    bullets: ['Multi-year warranty coverage', '48-hour response guarantee', 'Annual care inspections']
  }
];

const processSteps = [
  { num: '01', title: 'Consultation', desc: 'Initial requirement gathering and understanding workspace vision.', icon: MessageSquare },
  { num: '02', title: 'Site Visit', desc: 'Detailed site measurement and architectural assessment.', icon: MapPin },
  { num: '03', title: 'Space Planning', desc: 'Drafting 2D floor plans & 3D ergonomic layout models.', icon: PenTool },
  { num: '04', title: 'Design Proposal', desc: 'Presenting material samples, finishes, and furniture themes.', icon: Palette },
  { num: '05', title: 'Approval & Quotation', desc: 'Transparent itemized estimate with production timeline.', icon: FileCheck },
  { num: '06', title: 'Manufacturing', desc: 'Precision production with strict quality control checks.', icon: Cog },
  { num: '07', title: 'Delivery', desc: 'Safe climate-controlled transit of packaged furniture components.', icon: Truck },
  { num: '08', title: 'Installation', desc: 'Professional assembly, levelling, and workspace setup.', icon: CheckCircle2 },
  { num: '09', title: 'After-Sales Support', desc: 'Warranty assistance, maintenance checks, and long-term care.', icon: Headphones }
];

const industriesData = [
  { title: 'Corporate Offices', icon: Building, desc: 'Sleek executive suites & ergonomic workstations' },
  { title: 'IT Companies', icon: Laptop, desc: 'High-density modular desks with wire management' },
  { title: 'Schools & Colleges', icon: GraduationCap, desc: 'Durable classroom desks & library furniture' },
  { title: 'Hospitals', icon: Stethoscope, desc: 'Hygienic, easy-clean reception & waiting seating' },
  { title: 'Hotels', icon: Hotel, desc: 'Luxury lobby sofas & executive guest furniture' },
  { title: 'Banks', icon: Landmark, desc: 'Secure manager cabins & teller counter systems' },
  { title: 'Retail Stores', icon: ShoppingBag, desc: 'Bespoke display units & customer lounge chairs' },
  { title: 'Government Offices', icon: Shield, desc: 'Heavy-duty conference tables & file cabinets' },
  { title: 'Co-working Spaces', icon: Users, desc: 'Flexible hot-desking & collaborative pods' },
  { title: 'Commercial Buildings', icon: Building2, desc: 'Public atrium seating & reception desks' }
];

const whyChooseData = [
  { title: 'Premium Quality Materials', desc: 'Engineered hardwood, commercial-grade fabric, and heavy gauge steel.', icon: Sparkles },
  { title: 'Modern Workspace Solutions', desc: 'Designs built to promote posture, team collaboration, and focus.', icon: Monitor },
  { title: 'Complete Customization', desc: 'Custom dimensions, custom finishes, and brand color match.', icon: Sliders },
  { title: 'Experienced Team', desc: 'Over 15+ years of office layout mastery and corporate execution.', icon: Award },
  { title: 'Timely Delivery', desc: 'Strict milestone tracking ensures on-schedule office completion.', icon: Clock },
  { title: 'Professional Installation', desc: 'In-house certified installers handle setup with zero disruption.', icon: Wrench },
  { title: 'Competitive Pricing', desc: 'Factory-direct pricing offering maximum B2B corporate value.', icon: Tag },
  { title: 'Reliable Warranty Support', desc: 'Comprehensive multi-year warranty with prompt local service.', icon: ShieldCheck }
];

const faqData = [
  {
    q: 'Do you manufacture custom furniture?',
    a: 'Yes, we specialize in fully customized office furniture tailored to your exact floor plan, corporate brand colors, dimensions, and material preferences.'
  },
  {
    q: 'Do you provide installation services?',
    a: 'Yes, we offer complete white-glove delivery and installation. Our professional technicians manage transport, unloading, assembly, leveling, cable routing, and site cleanup.'
  },
  {
    q: 'Can you handle large corporate projects?',
    a: 'Absolutely. Magnus regularly executes bulk corporate contracts ranging from 20-seater startups to 1000+ seat enterprise headquarters, educational campuses, and medical facilities.'
  },
  {
    q: 'What warranty do you offer?',
    a: 'We provide a comprehensive multi-year warranty covering manufacturing defects, structural frame integrity, and hardware components across all product lines.'
  },
  {
    q: 'How long does a project usually take?',
    a: 'Standard corporate projects typically take 2 to 4 weeks depending on the order scale and level of customization. Rapid deployment is available for standard models.'
  },
  {
    q: 'Do you redesign existing office spaces?',
    a: 'Yes, we offer complete workspace redesign and retrofitting services to upgrade existing office layouts for better density, ergonomics, and aesthetic appeal.'
  }
];

export function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Office Space Planning');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenQuoteModal = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2200);
  };

  return (
    <div className="services-page">
      {/* ============================================================
          1. HERO SECTION
         ============================================================ */}
      <section className="services-hero">
        <div className="services-hero-grid-bg" />
        <div className="services-hero-glow-1" />
        <div className="services-hero-glow-2" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Overline Badge */}
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
            <Sparkles size={14} /> End-to-End Corporate Execution
          </motion.div>

          {/* Main Heading */}
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
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Our Corporate <span style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-light)' }}>Services</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 'var(--lh-relaxed)',
              maxWidth: 760,
              margin: '0 auto var(--space-8)'
            }}
          >
            From workspace planning to complete office execution, Magnus provides end-to-end office furniture solutions that combine functionality, aesthetics, quality, and long-term support.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleOpenQuoteModal()}
              style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8932b 100%)',
                color: 'var(--color-dark)',
                fontWeight: 'var(--fw-bold)',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)'
              }}
            >
              Get a Free Quote <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF'
              }}
            >
              Explore All Services
            </Button>
          </motion.div>

          {/* Trust Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-stats-row"
          >
            <div className="hero-stat-item">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Offices<br />Executed</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Custom<br />Tailoring</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number">10-Yr</div>
              <div className="hero-stat-label">Warranty<br />Coverage</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number">Pan-IN</div>
              <div className="hero-stat-label">Delivery &<br />Installation</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. SERVICES SECTION (RESPONSIVE GRID 4 | 2 | 1)
         ============================================================ */}
      <section id="services-grid" className="section">
        <div className="container">
          <SectionHeading
            subtitle="What We Offer"
            title="Comprehensive Workspace Services"
            description="Our specialized corporate capabilities empower businesses to plan, design, manufacture, and maintain world-class office environments."
          />

          <div className="services-grid-container">
            {servicesData.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="spatial-service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => handleOpenQuoteModal(item.title)}
                >
                  <div className="service-card-icon-box">
                    <IconComp size={26} />
                  </div>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 'var(--fw-bold)',
                    letterSpacing: 'var(--ls-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    marginBottom: 4
                  }}>
                    {item.tag}
                  </div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.description}</p>

                  <div style={{ marginTop: 'auto' }}>
                    <div className="service-card-action">
                      Request Consultation <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. OUR PROCESS (TIMELINE)
         ============================================================ */}
      <section className="section timeline-section-wrapper">
        <div className="container">
          <SectionHeading
            subtitle="Step-by-Step Excellence"
            title="Our Turnkey Project Process"
            description="A seamless, structured roadmap from initial consultation to long-term post-installation support."
          />

          {/* Desktop Horizontal Timeline */}
          <div className="timeline-desktop">
            <div className="timeline-track-line">
              <div
                className="timeline-track-progress"
                style={{ width: `${(activeTimelineStep / (processSteps.length - 1)) * 100}%` }}
              />
            </div>

            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx <= activeTimelineStep;
              return (
                <motion.div
                  key={step.num}
                  className={`timeline-step-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveTimelineStep(idx)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <div className="timeline-node">
                    <StepIcon size={20} />
                  </div>
                  <div className="timeline-step-num">{step.num}</div>
                  <div className="timeline-step-title">{step.title}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Details Banner (Desktop) */}
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6) var(--space-8)',
            border: '1px solid var(--color-gray-200)',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: 680,
            margin: 'var(--space-8) auto 0',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              fontSize: 'var(--fs-xs)',
              fontWeight: 'var(--fw-bold)',
              letterSpacing: 'var(--ls-wider)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 4
            }}>
              Step {processSteps[activeTimelineStep].num} of 09
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: 'var(--color-dark)', marginBottom: 8 }}>
              {processSteps[activeTimelineStep].title}
            </h4>
            <p style={{ fontSize: 'var(--fs-body)', color: 'var(--color-gray-600)' }}>
              {processSteps[activeTimelineStep].desc}
            </p>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="timeline-mobile">
            <div className="timeline-mobile-line" />
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="timeline-mobile-item">
                  <div className="timeline-mobile-node">
                    <StepIcon size={16} />
                  </div>
                  <div className="timeline-mobile-card">
                    <div style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 'bold' }}>STEP {step.num}</div>
                    <h4 style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-dark)', margin: '4px 0' }}>{step.title}</h4>
                    <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)' }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. INDUSTRIES WE SERVE
         ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Tailored Sector Expertise"
            title="Industries We Serve"
            description="We deliver customized furniture and workspace planning for diverse commercial, institutional, and hospitality sectors."
          />

          <div className="industries-grid">
            {industriesData.map((ind, i) => {
              const IndIcon = ind.icon;
              return (
                <motion.div
                  key={ind.title}
                  className="industry-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => handleOpenQuoteModal(`Bulk Furniture for ${ind.title}`)}
                >
                  <div className="industry-icon-wrapper">
                    <IndIcon size={24} />
                  </div>
                  <h4 className="industry-title">{ind.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', marginTop: 4 }}>{ind.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. WHY CHOOSE MAGNUS
         ============================================================ */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <SectionHeading
            subtitle="The Magnus Advantage"
            title="Why Choose Magnus"
            description="Built on uncompromised craftsmanship, local manufacturing mastery, and dedicated enterprise support."
          />

          <div className="why-grid">
            {whyChooseData.map((item, idx) => {
              const WhyIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="why-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="why-icon-box">
                    <WhyIcon size={22} />
                  </div>
                  <h4 className="why-card-title">{item.title}</h4>
                  <p className="why-card-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. FEATURED SERVICE HIGHLIGHTS (USING EXISTING IMAGES ONLY)
         ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Showcase Capabilities"
            title="Featured Service Highlights"
            description="Real project executions demonstrating our scale, custom tailoring, and turnkey workspace capability."
          />

          {/* Highlight 1 */}
          <motion.div
            className="highlight-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="highlight-image-wrapper">
              <img
                src="/assets/services/workspace_solutions.png"
                alt="End-to-End Workspace Solutions"
                loading="lazy"
              />
              <div className="highlight-image-overlay" />
            </div>
            <div className="highlight-content">
              <div className="highlight-tag">Turnkey Execution</div>
              <h3 className="highlight-title">End-to-End Workspace Solutions</h3>
              <p className="highlight-desc">
                From initial space planning and 3D architectural rendering to final white-glove installation, we handle every stage of your office transformation with precision and craftsmanship.
              </p>
              <Button
                variant="primary"
                onClick={() => handleOpenQuoteModal('End-to-End Workspace Solutions')}
              >
                Plan Your Workspace <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          {/* Highlight 2 */}
          <motion.div
            className="highlight-block reverse"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="highlight-image-wrapper">
              <img
                src="/assets/services/custom_furniture.jpeg"
                alt="Custom Furniture Expertise"
                loading="lazy"
              />
              <div className="highlight-image-overlay" />
            </div>
            <div className="highlight-content">
              <div className="highlight-tag">Bespoke Design</div>
              <h3 className="highlight-title">Custom Furniture Expertise</h3>
              <p className="highlight-desc">
                Tailor-made office desks, modular workstations, executive conference tables, and reception counters crafted specifically for your workspace footprint and corporate identity.
              </p>
              <Button
                variant="primary"
                onClick={() => handleOpenQuoteModal('Custom Furniture Expertise')}
              >
                Request Custom Design <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          {/* Highlight 3 */}
          <motion.div
            className="highlight-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="highlight-image-wrapper">
              <img
                src="/assets/services/corporate_projects.jpeg"
                alt="Corporate Project Specialists"
                loading="lazy"
              />
              <div className="highlight-image-overlay" />
            </div>
            <div className="highlight-content">
              <div className="highlight-tag">Enterprise Scale</div>
              <h3 className="highlight-title">Corporate Project Specialists</h3>
              <p className="highlight-desc">
                Successfully executing large-scale bulk furniture contracts for tech enterprises, educational campuses, hospitals, and commercial developments with strict quality assurance.
              </p>
              <Button
                variant="primary"
                onClick={() => handleOpenQuoteModal('Corporate Bulk Project Proposal')}
              >
                Request Bulk Proposal <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          7. FAQ SECTION (ACCORDION)
         ============================================================ */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <SectionHeading
            subtitle="Got Questions?"
            title="Frequently Asked Questions"
            description="Find clear answers to common questions about our corporate furniture, bulk ordering, customization, and warranties."
          />

          <div className="faq-container">
            {faqData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="faq-header"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <span className="faq-icon-toggle">
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="faq-answer">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CALL TO ACTION (FULL-WIDTH)
         ============================================================ */}
      <section className="cta-section-full">
        <div className="cta-glow-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 'var(--fw-semibold)',
              marginBottom: 'var(--space-4)',
              color: '#FFFFFF'
            }}
          >
            Ready to Transform Your Workspace?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'var(--fs-body-lg)',
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: 640,
              margin: '0 auto var(--space-8)',
              lineHeight: 'var(--lh-relaxed)'
            }}
          >
            Let's create a workspace that combines comfort, functionality, and premium design tailored to your corporate vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleOpenQuoteModal()}
              style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8932b 100%)',
                color: 'var(--color-dark)',
                fontWeight: 'var(--fw-bold)'
              }}
            >
              Get a Free Quote <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="tel:+919090626209"
              style={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#FFFFFF'
              }}
            >
              <PhoneCall size={18} /> Call Sales (+91 90906 26209)
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9. INTERACTIVE CONSULTATION / QUOTE MODAL
         ============================================================ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="quote-modal-overlay" onClick={() => setModalOpen(false)}>
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
                    Magnus Corporate Services
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: '#FFF' }}>
                    Request Service Consultation
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
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
                      <Check size={36} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: 'var(--color-dark)', marginBottom: 8 }}>
                      Consultation Request Sent!
                    </h3>
                    <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--fs-body)' }}>
                      Thank you! Our corporate workspace specialist will review your requirement for <strong>{selectedService}</strong> and contact you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label className="form-label">Service of Interest</label>
                      <select
                        className="form-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="General Corporate Consultation">General Corporate Consultation</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" required placeholder="e.g. Rajesh Kumar" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name *</label>
                        <input type="text" required placeholder="e.g. TechCorp Systems" className="form-input" />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" required placeholder="name@company.com" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input type="tel" required placeholder="+91 98765 43210" className="form-input" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Details / Estimated Seating</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your floor space, seating count, timeline, or special customization needs..."
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
                      Submit Consultation Request <ArrowRight size={18} />
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
