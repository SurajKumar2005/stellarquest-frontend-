import { useEffect, useState, useRef } from "react";
import CSSPlanet from "./CSSPlanet";

const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="typing-cursor">{displayed}</span>
  );
};

const StatItem = ({ label, value }: { label: string; value: number }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center px-4 py-2">
      <span ref={ref} className="text-xl md:text-2xl font-display font-bold text-primary">
        {count.toLocaleString()}
      </span>
      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative z-10 scanline-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Planet orbit icon */}
            <svg width="36" height="36" viewBox="0 0 36 36" className="text-primary">
              <circle cx="18" cy="18" r="6" fill="currentColor" opacity="0.9" />
              <ellipse cx="18" cy="18" rx="16" ry="7" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" transform="rotate(-20 18 18)" />
              <circle cx="30" cy="13" r="2" fill="hsl(37, 90%, 55%)" />
            </svg>
            <h1 className="text-xl md:text-2xl font-display font-bold tracking-widest text-foreground uppercase">
              STELLAR ANALYTICS
            </h1>
          </div>
          <div className="hidden md:block">
            <CSSPlanet />
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-body text-sm text-muted-foreground tracking-wider uppercase mb-3">
          Kepler Exoplanet Verification Program — KOI Intelligence System
        </p>

        {/* Typewriter */}
        <div className="font-body text-primary text-sm md:text-base mb-8 h-6">
          <TypewriterText text='Separating truth from illusion across 2,600 light-years...' />
        </div>

        {/* Mobile planet */}
        <div className="flex justify-center mb-6 md:hidden">
          <CSSPlanet />
        </div>

        {/* Stats bar */}
        <div className="glass-card rounded-lg flex items-center justify-center py-6">
          <span className="text-lg md:text-xl font-display font-bold text-primary tracking-widest uppercase">
            EV+ — Explore. Analyze. Discover
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
