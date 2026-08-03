import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Maximize2,
  X,
  ArrowRight,
  PhoneCall,
  CheckCircle,
  Box,
  LayoutGrid
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import '../styles/GalleryPage.css';

// ── Import Catalog Images directly from src/assets/products ──
import executiveAlaska from '../assets/products/mdTables/vb-alaska.webp';
import executivePrestige from '../assets/products/mdTables/vb-prestige.webp';
import executiveRegal from '../assets/products/mdTables/vb-regal-desk.webp';
import managerBold from '../assets/products/managerTables/bold.webp';

import chairAura from '../assets/products/executiveChairs/aura-ultra-black-hb.webp';
import chairArmani from '../assets/products/executiveChairs/armani-office-chair.webp';
import chairBoston from '../assets/products/executiveChairs/boston-hb.webp';
import chairGlanza from '../assets/products/executiveChairs/glanza-hb.webp';
import chairYaris from '../assets/products/executiveChairs/yaris-hb.webp';

import workstationLDesk from '../assets/products/workstations/vb-l-desk-back-to-back.webp';
import workstationSpark from '../assets/products/workstations/vb-spark-series-linear.webp';
import workstationXDesk from '../assets/products/workstations/vb-x-desk.webp';
import workstationApl from '../assets/products/workstations/vb-apl-leg-desk-linear.webp';

import conferenceBoat from '../assets/products/conferenceTables/vb-boat.webp';
import conferenceDiamond from '../assets/products/conferenceTables/vb-diamond.webp';
import conferenceEdge from '../assets/products/conferenceTables/vb-edge.webp';
import conferenceShadow from '../assets/products/conferenceTables/vb-shadow.webp';

import reception1 from '../assets/products/receptionTables/reception-1.webp';
import reception2 from '../assets/products/receptionTables/reception-2.webp';
import reception4 from '../assets/products/receptionTables/reception-4.webp';
import reception7 from '../assets/products/receptionTables/reception-7.webp';

import storageUnit from '../assets/products/storage/storage.webp';
import storageDrawer from '../assets/products/storage/1-draw-1-door.webp';
import storageCushion from '../assets/products/storage/cushion-with-2-draws.webp';

// ── Gallery Item Data ──

interface GalleryItem {
  id: string;
  title: string;
  category: string; // matches filter id
  categoryName: string;
  image: string;
  spanClass: string; // masonry layout span (span-4, span-6, span-8, span-12)
  aspectClass?: string; // 'tall' | 'wide'
  dimensions: string;
  material: string;
  features: string[];
}

const filterCategories = [
  { id: 'all', label: 'All Collections' },
  { id: 'executive', label: 'Executive Desks' },
  { id: 'chairs', label: 'Office Chairs' },
  { id: 'workstations', label: 'Workstations' },
  { id: 'conference', label: 'Conference Tables' },
  { id: 'reception', label: 'Reception Desks' },
  { id: 'storage', label: 'Storage Cabinets' },
];

const galleryItems: GalleryItem[] = [
  {
    id: 'item-1',
    title: 'Alaska Executive Suite',
    category: 'executive',
    categoryName: 'Executive Desks',
    image: executiveAlaska,
    spanClass: 'span-8',
    aspectClass: 'wide',
    dimensions: 'W 240 × D 110 × H 75 cm',
    material: 'Natural Walnut Veneer, Brushed Steel Base',
    features: ['Integrated Credenza', 'Hidden Cable Race', 'Leather Inlay Top']
  },
  {
    id: 'item-2',
    title: 'Aura Ultra Ergonomic Chair',
    category: 'chairs',
    categoryName: 'Office Chairs',
    image: chairAura,
    spanClass: 'span-4',
    aspectClass: 'tall',
    dimensions: 'W 68 × D 66 × H 118-128 cm',
    material: 'Breathable German Mesh, Aluminum Alloy Base',
    features: ['4D Armrest Adjustment', 'Dynamic Lumbar Support', 'Synchro-Tilt']
  },
  {
    id: 'item-3',
    title: 'Linear Modular Workstation',
    category: 'workstations',
    categoryName: 'Workstations',
    image: workstationSpark,
    spanClass: 'span-6',
    dimensions: 'W 280 × D 120 × H 75 cm',
    material: 'High-Density Pre-Laminated Board, Powder Coated Steel Frame',
    features: ['Acoustic Privacy Dividers', 'Power & Data Trays', 'Modular Scale']
  },
  {
    id: 'item-4',
    title: 'Boat-Shaped Conference Table',
    category: 'conference',
    categoryName: 'Conference Tables',
    image: conferenceBoat,
    spanClass: 'span-6',
    dimensions: 'W 320 × D 130 × H 75 cm',
    material: 'Architectural Veneer Top, Heavy Steel Base',
    features: ['Flip-up Cable Modules', 'Seats 10-12 People', 'Anti-Scratch Surface']
  },
  {
    id: 'item-5',
    title: 'Halo Curved Reception Desk',
    category: 'reception',
    categoryName: 'Reception Desks',
    image: reception1,
    spanClass: 'span-4',
    dimensions: 'W 220 × D 85 × H 105 cm',
    material: 'High-Gloss MDF, Tempered Glass Transaction Counter',
    features: ['Integrated LED Ambient Lighting', 'Lockable Drawers', 'Wire Grommets']
  },
  {
    id: 'item-6',
    title: 'Prestige MD Executive Desk',
    category: 'executive',
    categoryName: 'Executive Desks',
    image: executivePrestige,
    spanClass: 'span-8',
    aspectClass: 'wide',
    dimensions: 'W 260 × D 120 × H 75 cm',
    material: 'Rich Teak Finish, Matt Black Legs',
    features: ['Side Return Cabinet', 'Built-in Wireless Charger', 'Modesty Panel']
  },
  {
    id: 'item-7',
    title: 'Armani Leather Executive Chair',
    category: 'chairs',
    categoryName: 'Office Chairs',
    image: chairArmani,
    spanClass: 'span-4',
    aspectClass: 'tall',
    dimensions: 'W 70 × D 70 × H 120-130 cm',
    material: 'Top-Grain Leather, Heavy Duty Chrome Base',
    features: ['Padded Cushion Headrest', 'Multi-Position Tilt Lock', 'Pneumatic Height']
  },
  {
    id: 'item-8',
    title: 'Back-to-Back 4-Seater Workstation',
    category: 'workstations',
    categoryName: 'Workstations',
    image: workstationLDesk,
    spanClass: 'span-8',
    dimensions: 'W 240 × D 120 × H 75 cm',
    material: 'Engineered Wood, Steel Leg System',
    features: ['Central Cable Raceway', 'Includes Mobile Pedestals', 'Privacy Panels']
  },
  {
    id: 'item-9',
    title: 'Diamond Series Conference Table',
    category: 'conference',
    categoryName: 'Conference Tables',
    image: conferenceDiamond,
    spanClass: 'span-4',
    dimensions: 'W 280 × D 120 × H 75 cm',
    material: 'Melamine Faced Chipboard, Angular Steel Frame',
    features: ['Integrated AV Connectivity', 'Seats 8-10', 'Beveled Edges']
  },
  {
    id: 'item-10',
    title: 'Modern Front Reception Counter',
    category: 'reception',
    categoryName: 'Reception Desks',
    image: reception2,
    spanClass: 'span-6',
    dimensions: 'W 240 × D 90 × H 110 cm',
    material: 'High-Pressure Laminate, Solid Oak Accents',
    features: ['Visitor Parcel Shelf', 'Dual Monitor Space', 'Concealed Wiring']
  },
  {
    id: 'item-11',
    title: 'Vault Executive Storage Credenza',
    category: 'storage',
    categoryName: 'Storage Cabinets',
    image: storageUnit,
    spanClass: 'span-6',
    dimensions: 'W 180 × D 45 × H 80 cm',
    material: 'Pre-laminated Wood, Soft-close Hinges',
    features: ['Central Key Lock', 'Adjustable Internal Shelving', 'Anti-Tilt Mechanism']
  },
  {
    id: 'item-12',
    title: 'Glanza Mesh Task Chair',
    category: 'chairs',
    categoryName: 'Office Chairs',
    image: chairGlanza,
    spanClass: 'span-4',
    dimensions: 'W 64 × D 62 × H 100-110 cm',
    material: 'Breathable Nylon Mesh, Reinforced Polymer Base',
    features: ['2D Lumbar Support', 'BIFMA Certified Gas Lift', 'Smooth Nylon Castors']
  },
  {
    id: 'item-13',
    title: 'Bold Manager Desk',
    category: 'executive',
    categoryName: 'Executive Desks',
    image: managerBold,
    spanClass: 'span-8',
    aspectClass: 'wide',
    dimensions: 'W 200 × D 90 × H 75 cm',
    material: 'Oak Wood Finish, Heavy Steel Legs',
    features: ['Integrated Power Outlet', 'Side Drawer Pedestal', 'Clean Minimal Line']
  },
  {
    id: 'item-14',
    title: 'Edge Conference Room Table',
    category: 'conference',
    categoryName: 'Conference Tables',
    image: conferenceEdge,
    spanClass: 'span-6',
    dimensions: 'W 360 × D 140 × H 75 cm',
    material: 'Veneer Finish, Polished Metal Base',
    features: ['Dual Power & HDMI Grommets', 'Seats 14', 'Heavy-Duty Construction']
  },
  {
    id: 'item-15',
    title: 'Pedestal Mobile Storage',
    category: 'storage',
    categoryName: 'Storage Cabinets',
    image: storageDrawer,
    spanClass: 'span-6',
    dimensions: 'W 42 × D 50 × H 62 cm',
    material: 'Powder Coated Steel Sheet',
    features: ['3 Drawer Interlocking Lock', 'Fifth Anti-Tilt Wheel', 'Stationery Tray']
  },
  {
    id: 'item-16',
    title: 'Regal MD Executive Suite',
    category: 'executive',
    categoryName: 'Executive Desks',
    image: executiveRegal,
    spanClass: 'span-6',
    dimensions: 'W 240 × D 110 × H 75 cm',
    material: 'Walnut & Matte Black Finish',
    features: ['Executive Credenza', 'Concealed Cable Duct', 'Leatherette Inlay']
  },
  {
    id: 'item-17',
    title: 'Boston Executive High-Back Chair',
    category: 'chairs',
    categoryName: 'Office Chairs',
    image: chairBoston,
    spanClass: 'span-6',
    dimensions: 'W 66 × D 64 × H 115-125 cm',
    material: 'Premium Mesh, Chrome Base',
    features: ['Synchronized Recline', 'Adjustable Armrests', 'Ergonomic Support']
  },
  {
    id: 'item-18',
    title: 'Yaris Executive Mesh Chair',
    category: 'chairs',
    categoryName: 'Office Chairs',
    image: chairYaris,
    spanClass: 'span-4',
    dimensions: 'W 65 × D 63 × H 112-122 cm',
    material: 'High-Density Mesh, Nylon Base',
    features: ['Lumbar Cushion', 'Pneumatic Lift', 'Smooth Swivel']
  },
  {
    id: 'item-19',
    title: 'Cross-Leg Collaborative Workstation',
    category: 'workstations',
    categoryName: 'Workstations',
    image: workstationXDesk,
    spanClass: 'span-8',
    aspectClass: 'wide',
    dimensions: 'W 240 × D 120 × H 75 cm',
    material: 'X-Steel Frame, Melamine Top',
    features: ['Integrated Cable Trays', 'Acoustic Screen Option', 'Modular Joinery']
  },
  {
    id: 'item-20',
    title: 'APL Series Linear Desk',
    category: 'workstations',
    categoryName: 'Workstations',
    image: workstationApl,
    spanClass: 'span-4',
    dimensions: 'W 140 × D 70 × H 75 cm',
    material: 'Engineered Wood, Angled Metal Legs',
    features: ['Compact Layout', 'Grommet Port', 'Sturdy Frame']
  },
  {
    id: 'item-21',
    title: 'Shadow Boardroom Table',
    category: 'conference',
    categoryName: 'Conference Tables',
    image: conferenceShadow,
    spanClass: 'span-8',
    aspectClass: 'wide',
    dimensions: 'W 300 × D 120 × H 75 cm',
    material: 'Deep Walnut Veneer, Dark Steel Base',
    features: ['Dual Connectivity Access', 'Seats 10-12', 'Sleek Profile']
  },
  {
    id: 'item-22',
    title: 'Modern Reception Desk Series 4',
    category: 'reception',
    categoryName: 'Reception Desks',
    image: reception4,
    spanClass: 'span-4',
    dimensions: 'W 200 × D 80 × H 105 cm',
    material: 'High-Gloss White MDF, Wood Trim',
    features: ['Counter Shelf', 'Internal Pedestal Space', 'Wire Management']
  },
  {
    id: 'item-23',
    title: 'Modern Reception Counter 7',
    category: 'reception',
    categoryName: 'Reception Desks',
    image: reception7,
    spanClass: 'span-6',
    dimensions: 'W 220 × D 85 × H 110 cm',
    material: 'Laminate Finish, Glass Counter',
    features: ['LED Backlight', 'Spacious Work Area', 'Clean Lines']
  },
  {
    id: 'item-24',
    title: 'Cushioned Mobile Pedestal',
    category: 'storage',
    categoryName: 'Storage Cabinets',
    image: storageCushion,
    spanClass: 'span-6',
    dimensions: 'W 40 × D 50 × H 55 cm',
    material: 'Steel Body, Padded Fabric Top',
    features: ['Dual Purpose Seating', 'Lockable Drawers', 'Caster Mobility']
  }
];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setQuoteRequested(false);
  };

  return (
    <div className="gallery-page">
      {/* ============================================================
          1. HERO SECTION
         ============================================================ */}
      <section className="gallery-hero">
        <div className="gallery-hero-grid" />
        <div className="gallery-hero-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
            <Sparkles size={14} /> Catalog Showcase & Portfolio
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
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Furniture <span style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-light)' }}>Gallery</span>
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
              maxWidth: 720,
              margin: '0 auto var(--space-8)'
            }}
          >
            Explore our curated catalog portfolio showcasing executive suites, ergonomic seating, modular workstations, and boardroom designs engineered for modern enterprises.
          </motion.p>
        </div>
      </section>

      {/* ============================================================
          2. FILTER NAVIGATION BAR
         ============================================================ */}
      <section className="section" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="container">
          <div className="gallery-filter-bar">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`gallery-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      className="gallery-filter-active-pill"
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ============================================================
              3. ASYMMETRICAL MASONRY GRID WITH FRAMER MOTION
             ============================================================ */}
          <motion.div className="gallery-masonry-grid" layout>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  className={`gallery-card ${item.spanClass} ${item.aspectClass || ''}`}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleOpenLightbox(item)}
                >
                  <div className="gallery-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-tag-badge">
                        <Box size={12} /> {item.categoryName}
                      </div>
                      <h3 className="gallery-card-title">{item.title}</h3>
                      <div className="gallery-card-sub">
                        <span>{item.material.split(',')[0]}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--color-accent)' }}>
                          Inspect <Maximize2 size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ============================================================
              4. STATS COUNTER BAR
             ============================================================ */}
          <div className="gallery-stats-counter">
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)' }}>100+</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)' }}>Catalog Models</div>
            </div>
            <div style={{ width: 1, background: 'var(--color-gray-300)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)' }}>15+</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)' }}>Years Craftsmanship</div>
            </div>
            <div style={{ width: 1, background: 'var(--color-gray-300)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)' }}>100%</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)' }}>Commercial Grade</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. CALL TO ACTION SECTION
         ============================================================ */}
      <section className="section" style={{ background: 'var(--color-dark)', color: '#FFF', textAlign: 'center' }}>
        <div className="container">
          <SectionHeading
            subtitle="Custom Workspace Engineering"
            title="Looking for a Customized Catalog Model?"
            description="Our master craftsmen and CAD architects can tailor any model in our gallery to match your floor plan and corporate colors."
            light
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="lg"
              href="tel:+919090626209"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8932b 100%)',
                color: 'var(--color-dark)',
                fontWeight: 'var(--fw-bold)'
              }}
            >
              <PhoneCall size={18} /> Talk to a Design Specialist
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/custom-furniture"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFF' }}
            >
              Launch 3D Workspace Designer
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. LIGHTBOX DETAIL MODAL
         ============================================================ */}
      <AnimatePresence>
        {selectedItem && (
          <div className="gallery-lightbox-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div
              className="gallery-lightbox-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFF',
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div className="gallery-lightbox-img-box">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>

              <div className="gallery-lightbox-info">
                <div>
                  <div className="gallery-tag-badge" style={{ background: 'var(--color-cream)', color: 'var(--color-primary)', borderColor: 'rgba(212, 175, 55, 0.4)' }}>
                    <LayoutGrid size={12} /> {selectedItem.categoryName}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', color: 'var(--color-dark)', marginBottom: 'var(--space-3)' }}>
                    {selectedItem.title}
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', background: 'var(--color-cream)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)' }}>Dimensions</div>
                      <div style={{ fontSize: 'var(--fs-small)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>{selectedItem.dimensions}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)' }}>Material</div>
                      <div style={{ fontSize: 'var(--fs-small)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>{selectedItem.material}</div>
                    </div>
                  </div>

                  <h4 style={{ fontSize: 'var(--fs-small)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                    Key Specifications
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 'var(--space-6)' }}>
                    {selectedItem.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}>
                        <CheckCircle size={16} color="var(--color-success)" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {quoteRequested ? (
                    <div style={{ background: 'rgba(45, 212, 191, 0.1)', color: 'var(--color-success)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 'var(--fw-semibold)' }}>
                      Inquiry received! Our catalog specialist will reach out shortly.
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => setQuoteRequested(true)}
                      style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                    >
                      Inquire About {selectedItem.title} <ArrowRight size={18} />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
