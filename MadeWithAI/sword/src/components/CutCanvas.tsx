import React, { useRef, useEffect, useCallback } from 'react';
import { Point } from '../hooks/useCutController';

interface CutCanvasProps {
  isCutting: boolean;
  cutPath: Point[];
}

export const CutCanvas: React.FC<CutCanvasProps> = ({ isCutting, cutPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<Point[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const drawTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 2) return;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currPoint = points[i];
      
      const distance = Math.sqrt(
        Math.pow(currPoint.x - prevPoint.x, 2) + 
        Math.pow(currPoint.y - prevPoint.y, 2)
      );
      
      const opacity = Math.max(0.1, 0.8 - (i / points.length) * 0.7);
      const width = Math.max(2, 8 - (i / points.length) * 6);

      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(currPoint.x, currPoint.y);
      
      const gradient = ctx.createLinearGradient(
        prevPoint.x, prevPoint.y,
        currPoint.x, currPoint.y
      );
      gradient.addColorStop(0, `rgba(192, 192, 192, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(220, 220, 220, ${opacity * 1.2})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.8})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.shadowColor = 'rgba(192, 192, 192, 0.8)';
      ctx.shadowBlur = distance * 0.5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, []);

  const drawCutLine = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    const gradient = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[points.length - 1].x, points[points.length - 1].y
    );
    gradient.addColorStop(0, '#e8e8e8');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, '#c0c0c0');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.stroke();

    ctx.shadowBlur = 25;
    ctx.shadowColor = 'rgba(192, 192, 192, 0.6)';
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.5;
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCutting && cutPath.length > 0) {
        trailRef.current.push(cutPath[cutPath.length - 1]);
        
        if (trailRef.current.length > 20) {
          trailRef.current.shift();
        }

        drawTrail(ctx, trailRef.current);
        drawCutLine(ctx, cutPath);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailRef.current = [];
    };
  }, [isCutting, cutPath, drawTrail, drawCutLine]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ touchAction: 'none' }}
    />
  );
};