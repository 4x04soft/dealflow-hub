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

  // Calculate transforms based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -25 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 25 : 0;
  
  // Dynamic gradient position for "bend" illusion
  const gradientX = mousePosition.x * 100;
  const gradientY = mousePosition.y * 100;
  
  // Shadow offset based on tilt
  const shadowX = (mousePosition.x - 0.5) * 30;
  const shadowY = (mousePosition.y - 0.5) * 30;

  return (
    <div 
      ref={cardRef}
      className="relative"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={className}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* Inner content with depth */}
        <div 
          className="relative z-10"
          style={{ 
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
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
                ellipse 80% 80% at ${gradientX}% ${gradientY}%,
                hsl(var(--primary) / 0.2) 0%,
                transparent 50%
              ),
              linear-gradient(
                ${135 + (mousePosition.x - 0.5) * 30}deg,
                transparent 0%,
                hsl(var(--background) / 0.1) ${40 + (mousePosition.y - 0.5) * 20}%,
                transparent 60%
              )
            `,
          }}
        />
        
        {/* Highlight edge based on tilt direction */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          style={{
            background: `linear-gradient(
              ${Math.atan2(mousePosition.y - 0.5, mousePosition.x - 0.5) * (180 / Math.PI) + 90}deg,
              transparent 0%,
              hsl(var(--primary) / 0.15) 50%,
              transparent 100%
            )`,
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
      
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 rounded-3xl -z-10"
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          x: shadowX,
          y: shadowY,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          background: 'hsl(var(--foreground) / 0.15)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};

export default TiltCard;
