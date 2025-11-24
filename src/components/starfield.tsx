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

const Starfield = () => {
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
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: `hsl(${280 + Math.random() * 80}, 100%, ${70 + Math.random() * 20}%)`,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 4,
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

    const drawStar = (p: Particle) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * p.size, -Math.sin((18 + i * 72) / 180 * Math.PI) * p.size);
            ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * (p.size / 2), -Math.sin((54 + i * 72) / 180 * Math.PI) * (p.size / 2));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 40) * 0.2;
        p.angle += p.spin / 10;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        
        drawStar(p);
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

export default Starfield;
