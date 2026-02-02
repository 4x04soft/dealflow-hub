import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

const WatercolorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const animationRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  const colors = [
    'hsla(174, 72%, 45%, ',   // Teal primary
    'hsla(190, 70%, 50%, ',   // Lighter teal
    'hsla(200, 65%, 55%, ',   // Blue-teal
    'hsla(160, 60%, 45%, ',   // Green-teal
    'hsla(180, 50%, 60%, ',   // Cyan
    'hsla(210, 45%, 55%, ',   // Soft blue
    'hsla(170, 80%, 40%, ',   // Deep teal
    'hsla(185, 55%, 50%, ',   // Medium cyan
  ];

  const createParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    const size = Math.random() * 40 + 15;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color,
      alpha: Math.random() * 0.15 + 0.05,
      life: 0,
      maxLife: Math.random() * 150 + 100,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    };
  }, []);

  const drawWatercolorBlob = useCallback((
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    
    // Multiple layered gradients for watercolor effect
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      const layerSize = particle.size * (1 - i * 0.15);
      const layerAlpha = particle.alpha * (1 - particle.life / particle.maxLife) * (1 - i * 0.2);
      
      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, layerSize
      );
      
      gradient.addColorStop(0, `${particle.color}${layerAlpha})`);
      gradient.addColorStop(0.3, `${particle.color}${layerAlpha * 0.7})`);
      gradient.addColorStop(0.6, `${particle.color}${layerAlpha * 0.3})`);
      gradient.addColorStop(1, `${particle.color}0)`);
      
      ctx.beginPath();
      
      // Organic blob shape
      const points = 8;
      const variance = 0.3;
      ctx.moveTo(layerSize * (1 + Math.sin(particle.rotation) * variance), 0);
      
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const radius = layerSize * (1 + Math.sin(angle * 3 + particle.rotation) * variance);
        ctx.lineTo(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius
        );
      }
      
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Fade effect for trail
    ctx.fillStyle = 'rgba(245, 244, 250, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Spawn new particles on mouse movement
    if (mouseRef.current.isMoving) {
      const dx = mouseRef.current.x - lastMousePos.current.x;
      const dy = mouseRef.current.y - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const particlesToCreate = Math.min(Math.floor(distance / 3) + 1, 5);
      
      for (let i = 0; i < particlesToCreate; i++) {
        const t = i / particlesToCreate;
        const px = lastMousePos.current.x + dx * t + (Math.random() - 0.5) * 30;
        const py = lastMousePos.current.y + dy * t + (Math.random() - 0.5) * 30;
        particlesRef.current.push(createParticle(px, py));
      }
      
      lastMousePos.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      mouseRef.current.isMoving = false;
    }
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.rotation += particle.rotationSpeed;
      particle.size += 0.3;
      
      if (particle.life < particle.maxLife) {
        drawWatercolorBlob(ctx, particle);
        return true;
      }
      return false;
    });
    
    // Limit particles
    if (particlesRef.current.length > 150) {
      particlesRef.current = particlesRef.current.slice(-150);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle, drawWatercolorBlob]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isMoving: true,
      };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        isMoving: true,
      };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default WatercolorParticles;
