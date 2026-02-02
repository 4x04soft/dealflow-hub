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
  type: 'blob' | 'vapor';
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
    'hsla(175, 90%, 55%, ',   // Bright teal
    'hsla(195, 75%, 60%, ',   // Light blue
  ];

  const createParticle = useCallback((x: number, y: number, isVapor = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = isVapor ? Math.random() * 1 + 0.3 : Math.random() * 3 + 1;
    const size = isVapor ? Math.random() * 20 + 8 : Math.random() * 50 + 20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: isVapor ? -Math.random() * 1.5 - 0.5 : Math.sin(angle) * speed,
      size,
      color,
      alpha: isVapor ? Math.random() * 0.08 + 0.02 : Math.random() * 0.2 + 0.08,
      life: 0,
      maxLife: isVapor ? Math.random() * 80 + 40 : Math.random() * 180 + 120,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      type: isVapor ? 'vapor' : 'blob',
    };
  }, []);

  const drawGlow = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    alpha: number
  ) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, `${color}${alpha * 0.5})`);
    gradient.addColorStop(0.3, `${color}${alpha * 0.2})`);
    gradient.addColorStop(1, `${color}0)`);
    
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  const drawWatercolorBlob = useCallback((
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    const lifeRatio = particle.life / particle.maxLife;
    const fadeAlpha = particle.alpha * (1 - lifeRatio);
    
    // Draw glow first
    drawGlow(ctx, particle.x, particle.y, particle.size, particle.color, fadeAlpha);
    
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    
    // Multiple layered gradients for watercolor effect
    const layers = 4;
    for (let i = 0; i < layers; i++) {
      const layerSize = particle.size * (1 - i * 0.12);
      const layerAlpha = fadeAlpha * (1 - i * 0.15);
      
      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, layerSize
      );
      
      gradient.addColorStop(0, `${particle.color}${layerAlpha})`);
      gradient.addColorStop(0.25, `${particle.color}${layerAlpha * 0.8})`);
      gradient.addColorStop(0.5, `${particle.color}${layerAlpha * 0.4})`);
      gradient.addColorStop(0.75, `${particle.color}${layerAlpha * 0.15})`);
      gradient.addColorStop(1, `${particle.color}0)`);
      
      ctx.beginPath();
      
      // Organic blob shape with more variance
      const points = 10;
      const variance = 0.35;
      
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const noise = Math.sin(angle * 4 + particle.rotation * 2) * variance;
        const radius = layerSize * (1 + noise);
        
        if (j === 0) {
          ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        } else {
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
      }
      
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.restore();
  }, [drawGlow]);

  const drawVapor = useCallback((
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    const lifeRatio = particle.life / particle.maxLife;
    const fadeAlpha = particle.alpha * (1 - lifeRatio * lifeRatio);
    const expandedSize = particle.size * (1 + lifeRatio * 2);
    
    // Vapor glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, expandedSize
    );
    
    gradient.addColorStop(0, `${particle.color}${fadeAlpha})`);
    gradient.addColorStop(0.4, `${particle.color}${fadeAlpha * 0.5})`);
    gradient.addColorStop(1, `${particle.color}0)`);
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, expandedSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Fade effect for trail
    ctx.fillStyle = 'rgba(245, 244, 250, 0.025)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Spawn new particles on mouse movement
    if (mouseRef.current.isMoving) {
      const dx = mouseRef.current.x - lastMousePos.current.x;
      const dy = mouseRef.current.y - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // More particles based on speed
      const particlesToCreate = Math.min(Math.floor(distance / 5) + 1, 4);
      
      for (let i = 0; i < particlesToCreate; i++) {
        const t = i / particlesToCreate;
        const px = lastMousePos.current.x + dx * t + (Math.random() - 0.5) * 40;
        const py = lastMousePos.current.y + dy * t + (Math.random() - 0.5) * 40;
        particlesRef.current.push(createParticle(px, py, false));
        
        // Add vapor particles (less often)
        if (Math.random() > 0.7) {
          particlesRef.current.push(createParticle(px, py, true));
        }
      }
      
      // Add extra splash particles (less often)
      if (distance > 20 && Math.random() > 0.5) {
        const splashX = mouseRef.current.x + (Math.random() - 0.5) * 60;
        const splashY = mouseRef.current.y + (Math.random() - 0.5) * 60;
        particlesRef.current.push(createParticle(splashX, splashY, false));
      }
      
      lastMousePos.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      mouseRef.current.isMoving = false;
    }
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.97;
      particle.vy *= particle.type === 'vapor' ? 0.99 : 0.97;
      particle.rotation += particle.rotationSpeed;
      
      if (particle.type === 'blob') {
        particle.size += 0.4;
        
        // Spawn vapor from blobs
        if (particle.life > 20 && Math.random() > 0.92) {
          particlesRef.current.push(createParticle(particle.x, particle.y - 5, true));
        }
      } else {
        particle.size += 0.6;
      }
      
      if (particle.life < particle.maxLife) {
        if (particle.type === 'vapor') {
          drawVapor(ctx, particle);
        } else {
          drawWatercolorBlob(ctx, particle);
        }
        return true;
      }
      return false;
    });
    
    // Limit particles
    if (particlesRef.current.length > 100) {
      particlesRef.current = particlesRef.current.slice(-100);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle, drawWatercolorBlob, drawVapor]);

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
