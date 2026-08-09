import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { MagnusMonogram } from '../components/ui/MagnusLogo';
import '../styles/GalleryPage.css';

const RAW_FILENAMES: string[] = [
  '013faaab-b224-4934-a391-f9cdc6553b81.jpg',
  '056e666f-cd55-4bbe-84fe-c65cd5b77944.jpg',
  '10593491-4b51-4019-af21-376b0ea833cc.jpg',
  '1edcd077-89f0-4fb8-81f1-265c2b7d4305.jpg',
  '21b63ecf-7dc9-4dc5-a15a-99e244c22921.jpg',
  '2270bca3-ddc5-41da-8d8c-ab2a2a8d9ed0.jpg',
  '2be1101f-4218-49b4-b74d-fec4654c90c0.jpg',
  '3017a4dd-839d-4f0b-acbf-25c0ebedf314.jpg',
  '34ac4af2-8020-42bd-9c51-06afe569e50b.jpg',
  '3632bf7c-4189-4d1f-a6ca-188c82ac025a.jpg',
  '3e1a02f6-09a6-41c3-bb18-99810b81374b.jpg',
  '4717a7c2-ef75-4e42-8a3c-a92dc849ddfe.jpg',
  '47e8cd11-c784-423d-adf9-0124fe101224.jpg',
  '4de03b12-a14c-480f-af9c-5cba75dcc19e.jpg',
  '500701ec-09f9-446a-922a-852806efe644.jpg',
  '5585e56c-b9dd-42ce-88c0-57443665a8fe.jpg',
  '6abfc0f0-e42d-4367-acb1-140912a2cc35.jpg',
  '70606cd9-cc97-4d21-8720-302497b8bbd3.jpg',
  '822140a0-289d-45fd-b7b4-e82606885de8.jpg',
  '8b747085-c788-4400-baa0-539bd5997d40.jpg',
  'a8a1ff03-bfc3-4391-b156-aec9ac3c946c.jpg',
  'a9cecd7f-1b7e-45f1-9e17-d5307d8d462d.jpg',
  'adad6868-c07d-4403-9f05-f98bda41f150.jpg',
  'bcfb0e45-07ac-440b-a228-c0b86deec9a1.jpg',
  'bd54e558-3a33-478d-829d-0fdc74e8d80d.jpg',
  'c6bba7b2-266b-42e1-af03-058844584b25.jpg',
  'd458acde-565f-4806-a181-7809a8be7c90.jpg',
  'da87d0c0-dbbf-49ec-8abe-357305aec76f.jpg',
  'e38085c7-29d1-4bec-8d03-8f6d55094090.jpg',
  'efb767aa-708d-46c9-82cb-f8c178087879.jpg',
  'f4bbf303-12e4-4035-880c-ba633d2529b1.jpg',
  'fe1df852-bd79-43db-a178-7ac80683e4ae.jpg',
];

interface GalleryImage { src: string; index: number; }

const IMAGES: GalleryImage[] = RAW_FILENAMES.map((f, i) => ({
  src: `/assets/gallery/${f}`,
  index: i,
}));

function Lightbox({ images, current, onClose, onPrev, onNext }: {
  images: GalleryImage[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[current];
  const total = images.length;
  return (
    <div className="glb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image lightbox">
      <motion.div
        className="glb-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.93, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="glb-close" onClick={onClose} aria-label="Close lightbox">
          <X size={20} strokeWidth={2} />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="glb-img-wrap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={img.src} alt={`Magnus workspace ${current + 1}`} className="glb-img" />
          </motion.div>
        </AnimatePresence>
        <div className="glb-nav">
          <button className="glb-nav-btn" onClick={onPrev} aria-label="Previous image" disabled={current === 0}>
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <span className="glb-counter">
            {current + 1}<span className="glb-counter-sep">/</span>{total}
          </span>
          <button className="glb-nav-btn" onClick={onNext} aria-label="Next image" disabled={current === total - 1}>
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((n) => (n !== null && n > 0 ? n - 1 : n)), []);
  const goNext = useCallback(() => setLightboxIndex((n) => (n !== null && n < IMAGES.length - 1 ? n + 1 : n)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <div className="glry-page">
      <section className="glry-hero">
        <div className="glry-hero-grid" aria-hidden="true" />
        <div className="glry-hero-glow" aria-hidden="true" />
        <div className="glry-hero-watermark" aria-hidden="true">
          <MagnusMonogram size={340} style={{ opacity: 0.022 }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div className="glry-badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Sparkles size={13} strokeWidth={2} />
            Portfolio &amp; Installations
          </motion.div>
          <motion.h1 className="glry-h1" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
            Spaces Designed for<br />
            <span className="glry-h1-accent">Better Work</span>
          </motion.h1>
          <motion.p className="glry-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            Explore our office furniture installations, executive environments,
            modular workstations, and completed workspace projects across Hyderabad.
          </motion.p>
          <motion.div className="glry-count-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.26 }}>
            {IMAGES.length} spaces
          </motion.div>
        </div>
      </section>

      <section className="glry-grid-section">
        <div className="container">
          <div className="glry-grid">
            {IMAGES.map((img, i) => (
              <motion.button
                key={img.src}
                className="glry-card"
                onClick={() => openLightbox(i)}
                aria-label={`View workspace image ${i + 1} of ${IMAGES.length}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.065, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glry-img-frame">
                  <img
                    src={img.src}
                    alt={`Magnus Office Furniture workspace installation ${i + 1}`}
                    className="glry-img"
                    loading={i < 9 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="glry-hover-overlay" aria-hidden="true">
                    <div className="glry-view-label">
                      <ArrowRight size={14} strokeWidth={2.5} />
                      View
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={IMAGES} current={lightboxIndex} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} />
        )}
      </AnimatePresence>
    </div>
  );
}
