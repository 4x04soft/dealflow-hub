import React from 'react';

interface GoldEdgeGlowProps {
  children: React.ReactNode;
  className?: string;
}

const GoldEdgeGlow: React.FC<GoldEdgeGlowProps> = ({ children, className = '' }) => {
  return (
    <span className={`gold-edge-glow-wrapper ${className}`}>
      <span className="gold-edge-glow-border" />
      <span className="gold-edge-glow-content">{children}</span>
    </span>
  );
};

export default GoldEdgeGlow;
