import { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = '' }: TiltCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Stronger rotation for more pronounced bend effect
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -40 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 40 : 0;
  
  // Dynamic gradient position for "bend" illusion
  const gradientX = mousePosition.x * 100;
  const gradientY = mousePosition.y * 100;
  
  // Larger shadow offset based on tilt
  const shadowX = (mousePosition.x - 0.5) * 50;
  const shadowY = (mousePosition.y - 0.5) * 50;

  return (
    <div 
      ref={cardRef}
      className="relative"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={className}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          boxShadow: isHovered 
            ? `${-shadowX * 0.5}px ${-shadowY * 0.5}px 40px hsl(var(--foreground) / 0.2), 
               ${-shadowX}px ${-shadowY}px 80px hsl(var(--foreground) / 0.15),
               inset ${shadowX * 0.1}px ${shadowY * 0.1}px 20px hsl(var(--primary) / 0.05)`
            : '0 10px 40px hsl(var(--foreground) / 0.1)',
          transition: 'box-shadow 0.3s ease-out',
        }}
      >
        {/* Inner content with stronger depth */}
        <div 
          className="relative z-10"
          style={{ 
            transform: isHovered ? 'translateZ(60px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {children}
        </div>
        
        {/* Dynamic lighting overlay - creates bend illusion */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          style={{
            background: `
              radial-gradient(
                ellipse 100% 100% at ${gradientX}% ${gradientY}%,
                hsl(var(--primary) / 0.25) 0%,
                transparent 40%
              ),
              linear-gradient(
                ${135 + (mousePosition.x - 0.5) * 50}deg,
                hsl(255 100% 100% / 0.1) 0%,
                transparent ${30 + (mousePosition.y - 0.5) * 30}%,
                hsl(var(--foreground) / 0.05) 100%
              )
            `,
          }}
        />
        
        {/* Stronger highlight edge based on tilt direction */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            opacity: isHovered ? 0.8 : 0,
          }}
          style={{
            background: `linear-gradient(
              ${Math.atan2(mousePosition.y - 0.5, mousePosition.x - 0.5) * (180 / Math.PI) + 90}deg,
              transparent 0%,
              hsl(var(--primary) / 0.2) 40%,
              hsl(var(--primary) / 0.3) 50%,
              hsl(var(--primary) / 0.2) 60%,
              transparent 100%
            )`,
            filter: 'blur(30px)',
          }}
        />
        
        {/* Surface reflection */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
        >
          <div 
            className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
            style={{
              background: `conic-gradient(
                from ${(mousePosition.x - 0.5) * 180}deg at ${gradientX}% ${gradientY}%,
                transparent 0deg,
                hsl(var(--background) / 0.3) 60deg,
                transparent 120deg,
                hsl(var(--background) / 0.2) 180deg,
                transparent 240deg,
                hsl(var(--background) / 0.3) 300deg,
                transparent 360deg
              )`,
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Main dynamic shadow */}
      <motion.div
        className="absolute inset-4 rounded-3xl -z-10"
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          x: shadowX,
          y: shadowY,
          scale: isHovered ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          background: 'hsl(var(--foreground) / 0.3)',
          filter: 'blur(30px)',
        }}
      />
      
      {/* Secondary softer shadow */}
      <motion.div
        className="absolute inset-0 rounded-3xl -z-20"
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          x: shadowX * 1.5,
          y: shadowY * 1.5,
          scale: isHovered ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          background: 'hsl(var(--foreground) / 0.2)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
};

export default TiltCard;
