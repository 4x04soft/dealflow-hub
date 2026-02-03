import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const FloatingElements = ({ count = 5, className = '' }: FloatingElementsProps) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
        style={{ left: '10%', top: '20%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-2xl"
        style={{ right: '15%', bottom: '30%' }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default FloatingElements;
