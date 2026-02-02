import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
}

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 0.9,
  parallax = false,
  parallaxSpeed = 50
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxSpeed, -parallaxSpeed]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 80, x: 0 };
      case 'down': return { y: -80, x: 0 };
      case 'left': return { x: 80, y: 0 };
      case 'right': return { x: -80, y: 0 };
      case 'none': return { x: 0, y: 0 };
    }
  };

  const initial = getInitialPosition();

  if (parallax) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ y }}
        initial={{ 
          opacity: 0, 
          ...initial,
          filter: 'blur(12px)',
          scale: 0.95
        }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0, 
          y: 0,
          filter: 'blur(0px)',
          scale: 1
        } : {
          opacity: 0,
          ...initial,
          filter: 'blur(12px)',
          scale: 0.95
        }}
        transition={{ 
          duration,
          delay: isInView ? delay : 0,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...initial,
        filter: 'blur(12px)',
        scale: 0.95
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
        scale: 1
      } : {
        opacity: 0,
        ...initial,
        filter: 'blur(12px)',
        scale: 0.95
      }}
      transition={{ 
        duration,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
