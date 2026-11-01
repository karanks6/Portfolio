import { useState, useEffect, useCallback, Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Works } from './components/Works';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Loader } from './components/Loader';
import { StickerOverlay } from './components/StickerOverlay';
import { Scene } from './three/Scene';
import { STICKERS, StickerDefinition } from './data/stickers';
import { HotspotScreenData } from './three/StickerHotspots';

function LoadingManagerComponent({ onLoaded }: { onLoaded: () => void }) {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(onLoaded, 300);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onLoaded]);

  return <Loader progress={progress} />;
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Scrubbed Scroll Progress calculation: progress = scrollY / (docHeight - winHeight)
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const currentScroll = window.scrollY || window.pageYOffset;
      const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToElement = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  return (
    <div className="portfolio-app">
      {/* Background grain texture */}
      <div className="grain-overlay" />

      {/* Loading Screen */}
      {!isLoaded && <LoadingManagerComponent onLoaded={() => setIsLoaded(true)} />}

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

      {/* Fixed Header */}
      <Header onScrollToTop={() => scrollToElement('hero')} />

      {/* Scrollable HTML Content */}
      <main className="content-scroller">
        <Hero onScrollCue={() => scrollToElement('about')} />
        <About />
        <Timeline />
        <Works onSelectTool={(toolId) => scrollToElement(toolId)} />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
