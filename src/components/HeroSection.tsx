import React, { useEffect, useRef, useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenOrderModal: (title?: string) => void;
  onExploreMenu: () => void;
}

// Simple IndexedDB store for client-persisted exact video
const DB_NAME = 'CoffeeHeroDB';
const STORE_NAME = 'videos';
const VIDEO_KEY = 'exact_hero_video';

function getStoredVideo(): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(STORE_NAME);
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get(VIDEO_KEY);
        getReq.onsuccess = () => resolve(getReq.result || null);
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch (_) {
      resolve(null);
    }
  });
}

function storeVideo(blob: Blob): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(STORE_NAME);
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(blob, VIDEO_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      };
      request.onerror = () => resolve(false);
    } catch (_) {
      resolve(false);
    }
  });
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenOrderModal, onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoSrc, setVideoSrc] = useState<string>('/coffee_hero_scroll_web.mp4');
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video duration (defaults to 10.0s for the attached video)
  const durationRef = useRef<number>(10.0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  // Check for stored custom video on mount
  useEffect(() => {
    getStoredVideo().then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      }
    });
  }, []);

  const handleVideoFile = async (file: File) => {
    if (!file.type.startsWith('video/') && !file.name.endsWith('.mp4')) {
      alert('Please upload an MP4 video file.');
      return;
    }

    // 1. Immediately create object URL for zero-lag instant preview
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
    setToastMessage(`Exact video loaded: "${file.name}"`);
    setTimeout(() => setToastMessage(null), 4000);

    // 2. Persist locally to IndexedDB so page reload preserves it
    await storeVideo(file);

    // 3. Upload to server to persist as public/coffee_hero_scroll_web.mp4
    try {
      await fetch('/api/upload-hero-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: file,
      });
    } catch (_) {
      // client-side objectUrl + IndexedDB already active
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  // Set up scroll listener and requestAnimationFrame smoothing loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The video must NOT autoplay, loop, or play continuously; it must remain paused at all times
    try {
      video.pause();
    } catch (_) {}

    // Scroll listener updates ONLY target progress/time (never touches video.currentTime directly)
    const updateTargetFromScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = rect.height - viewportHeight;

      if (scrollDistance <= 0) {
        targetTimeRef.current = 0;
        return;
      }

      // -rect.top represents how many pixels the hero container has scrolled past the viewport top
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollDistance));
      targetTimeRef.current = progress * durationRef.current;
    };

    // requestAnimationFrame smoothing loop: updates video.currentTime smoothly
    let rafId: number;
    const tick = () => {
      const diff = targetTimeRef.current - currentTimeRef.current;
      
      // Interpolate towards target (0.22 smoothing factor for responsive, near-instant tracking with no lag)
      if (Math.abs(diff) > 0.005) {
        currentTimeRef.current += diff * 0.22;
      } else {
        currentTimeRef.current = targetTimeRef.current;
      }

      const desiredTime = Math.min(Math.max(currentTimeRef.current, 0), durationRef.current);

      if (video && Math.abs(video.currentTime - desiredTime) > 0.015) {
        try {
          video.currentTime = desiredTime;
        } catch (_) {}
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onScroll = () => {
      updateTargetFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial position evaluation
    updateTargetFromScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [videoSrc]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {}
    }
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full bg-stone-950 h-[250vh]"
    >
      {/* Hidden file input for uploading the exact video file */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/*"
        aria-label="Upload exact video file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleVideoFile(e.target.files[0]);
          }
        }}
      />

      {/* Drag & Drop Visual Indicator */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none border-4 border-dashed border-[#c67d3c] m-4 rounded-3xl">
          <Upload className="w-16 h-16 text-[#c67d3c] animate-bounce mb-4" />
          <p className="text-xl font-bold text-white tracking-wide">
            Drop your exact <span className="text-[#c67d3c]">coffee_hero_scroll_web.mp4</span> here!
          </p>
          <p className="text-sm text-stone-300 mt-2">
            Will instantly sync and load into the scroll-controlled hero animation
          </p>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900/95 text-white border border-stone-700 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Pinned Viewport Container: Fixed/Sticky 100vh during the 250vh scroll progression */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Layer 1: Background Video (ONLY ONE visual source, no images) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Layer 2: Subtle Dark Overlay for Optimal Contrast and Typography Readability */}
          <div className="absolute inset-0 bg-stone-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-transparent pointer-events-none lg:w-3/5" />
        </div>

        {/* Layer 3: Hero Content Container (Preserved exactly as requested) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-xl text-white space-y-6">
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-md"
            >
              Savor the Perfect <br />
              <span className="text-[#f3ede4]">Brew!</span>
            </h1>

            <p 
              id="hero-description"
              className="text-base sm:text-lg text-stone-200/90 leading-relaxed font-normal max-w-lg drop-shadow"
            >
              From rich espresso to silky velvety lattes, we craft every cup with ethically sourced, freshly roasted specialty beans.
            </p>

            {/* Action Buttons matching the design (White pill + Caramel Amber pill) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-order-now-btn"
                onClick={() => onOpenOrderModal('Savor the Perfect Brew')}
                className="px-7 py-3 rounded-full bg-white text-[#2b170e] font-bold text-sm sm:text-base shadow-lg hover:bg-stone-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Order Now
              </button>

              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="px-7 py-3 rounded-full bg-[#c67d3c] hover:bg-[#b56f30] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
