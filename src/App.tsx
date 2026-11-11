import { useState, useEffect, useCallback, Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import { ChromeFrame } from './components/ChromeFrame';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Works } from './components/Works';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Loader } from './components/Loader';
import { Scene } from './three/Scene';
import { StickerOverlay } from './components/StickerOverlay';
import { STICKERS, StickerDefinition } from './data/stickers';
import { HotspotScreenData } from './three/StickerHotspots';
import { HeroBackdrop } from './components/HeroBackdrop';
import { Analytics } from '@vercel/analytics/react';

function LoadingManagerComponent({ onLoaded }: { onLoaded: () => void }) {
  const { progress, active, total } = useProgress();

  useEffect(() => {
    if (!active && (progress >= 100 || total === 0)) {
      const timer = setTimeout(onLoaded, 300);
      return () => clearTimeout(timer);
    }
  }, [active, progress, total, onLoaded]);

  // Safety fallback timeout for instant/cached loads
  useEffect(() => {
    const fallback = setTimeout(() => {
      onLoaded();
    }, 1800);
    return () => clearTimeout(fallback);
  }, [onLoaded]);

  return <Loader progress={progress} />;
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [hotspots, setHotspots] = useState<HotspotScreenData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlAvailable(false);
    } catch {
      setWebGlAvailable(false);
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(motionQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      motionQuery.addEventListener('change', listener);
      return () => motionQuery.removeEventListener('change', listener);
    }
  }, []);

  // Track scroll progress & active section
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const currentScroll = window.scrollY || window.pageYOffset;
      const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setScrollProgress(progress);

      // Determine active section for vertical indicator dots
      const sections = ['hero', 'resume', 'skills', 'works', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= winHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToElement = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Handle sticker click (two-way binding)
  const handleStickerClick = useCallback((sticker: StickerDefinition) => {
    if (sticker.destinationType === 'scroll') {
      scrollToElement(sticker.destination);
    } else if (sticker.destinationType === 'link') {
      window.open(sticker.destination, '_blank', 'noopener,noreferrer');
    } else if (sticker.destinationType === 'mailto') {
      window.location.href = sticker.destination;
    } else if (sticker.destinationType === 'resume') {
      window.open(sticker.destination, '_blank', 'noopener,noreferrer');
    }
  }, [scrollToElement]);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Loading Screen */}
      {!isLoaded && <LoadingManagerComponent onLoaded={handleLoaded} />}

      {/* Fixed Backdrop Graphics (Waves + Sun Halo) */}
      <HeroBackdrop scrollProgress={scrollProgress} />

      {/* Fixed 3D WebGL Canvas */}
      {webGlAvailable && (
        <Suspense fallback={null}>
          <Scene
            progress={scrollProgress}
            isReducedMotion={isReducedMotion}
            onHotspotsUpdate={setHotspots}
            onStickerClick={handleStickerClick}
          />
        </Suspense>
      )}

      {/* 2D Projected Hotspot Buttons */}
      {webGlAvailable && isLoaded && (
        <StickerOverlay
          hotspots={hotspots}
          onStickerClick={handleStickerClick}
          stickers={STICKERS}
        />
      )}

      {/* Fixed Chrome Frame & Viewport Metadata + Navigation */}
      <ChromeFrame
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onNavigate={scrollToElement}
      />

      {/* Scrollable Content */}
      <main className="content-scroller">
        <Hero onScrollCue={() => scrollToElement('resume')} />
        <Timeline />
        <Skills />
        <Works onSelectTool={(toolId) => scrollToElement(toolId)} />
        <Contact />
      </main>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
