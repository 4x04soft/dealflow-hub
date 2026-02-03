import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
}

const AnimatedIcon = ({ children, className = '' }: AnimatedIconProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -10, 10, 0],
        transition: { 
          rotate: { duration: 0.4 },
          scale: { duration: 0.2 }
        }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative"
        whileHover={{
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4)'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedIcon;
