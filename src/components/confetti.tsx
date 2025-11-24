"use client";
import React, { useEffect, useRef, useMemo, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  angle: number;
  spin: number;
};

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: 150 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 7 + 3,
      speed: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 20,
    }));
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const currentParticles: Particle[] = JSON.parse(JSON.stringify(particles));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 20) * 0.5;
        p.angle += p.spin;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isClient, particles]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Confetti;
