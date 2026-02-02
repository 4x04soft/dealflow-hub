import { useEffect, useRef, useState } from 'react';

interface Splash {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
}

export const WatercolorEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const idRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const colors = [
    'hsla(175, 70%, 50%, 0.15)',
    'hsla(200, 80%, 55%, 0.12)',
    'hsla(260, 60%, 60%, 0.10)',
    'hsla(220, 70%, 50%, 0.12)',
    'hsla(180, 60%, 45%, 0.14)',
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create splash if mouse moved enough distance
      const distance = Math.sqrt(
        Math.pow(x - lastPosRef.current.x, 2) + 
        Math.pow(y - lastPosRef.current.y, 2)
      );

      if (distance > 30) {
        lastPosRef.current = { x, y };
        
        const newSplash: Splash = {
          id: idRef.current++,
          x,
          y,
          size: Math.random() * 100 + 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          rotation: Math.random() * 360,
        };

        setSplashes(prev => [...prev.slice(-15), newSplash]);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fade out splashes over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSplashes(prev => 
        prev
          .map(splash => ({ ...splash, opacity: splash.opacity - 0.02 }))
          .filter(splash => splash.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      {/* Background gradient base */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      
      {splashes.map(splash => (
        <div
          key={splash.id}
          className="absolute pointer-events-none"
          style={{
            left: splash.x,
            top: splash.y,
            transform: `translate(-50%, -50%) rotate(${splash.rotation}deg)`,
            opacity: splash.opacity,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          {/* Main watercolor blob */}
          <svg
            width={splash.size}
            height={splash.size}
            viewBox="0 0 100 100"
            className="absolute"
          >
            <defs>
              <filter id={`blur-${splash.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>
              <filter id={`watercolor-${splash.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="30"
              fill={splash.color}
              filter={`url(#watercolor-${splash.id})`}
            />
            <ellipse
              cx="55"
              cy="45"
              rx="25"
              ry="20"
              fill={splash.color}
              filter={`url(#blur-${splash.id})`}
              opacity="0.6"
            />
          </svg>
          
          {/* Secondary smaller splash */}
          <svg
            width={splash.size * 0.6}
            height={splash.size * 0.6}
            viewBox="0 0 100 100"
            className="absolute"
            style={{
              left: splash.size * 0.3,
              top: -splash.size * 0.2,
              transform: `rotate(${splash.rotation + 45}deg)`,
            }}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="30"
              ry="25"
              fill={splash.color}
              filter={`url(#blur-${splash.id})`}
              opacity="0.4"
            />
          </svg>
        </div>
      ))}
      
      {/* Permanent subtle watercolor stains */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-radial from-accent/5 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </div>
  );
};
