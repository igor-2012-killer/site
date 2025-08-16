'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './HeartGallery.module.css';
import Lightbox from './Lightbox';

const heartMask = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

export default function NeonHeartGallery({ items }) {
  const canvasRef = useRef(null);
  const galleryRef = useRef(null);
  const [selected, setSelected] = useState(null);
  let mediaIndex = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const positionGallery = () => {
      if (!galleryRef.current) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.5;

      galleryRef.current.style.width = `${size}px`;
      galleryRef.current.style.height = `${size}px`;
      galleryRef.current.style.left = `${centerX - size / 2}px`;
      galleryRef.current.style.top = `${centerY - size / 2}px`;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      positionGallery();
    };

    const generateHeartPoints = () => {
      const heartPoints = [];
      const pointCount = 5555555;
      for (let i = 0; i < pointCount; i++) {
        const t = (i / pointCount) * Math.PI * 2;
        const x = 0.08 * (16 * Math.pow(Math.sin(t), 3));
        const y = 0.08 * -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        heartPoints.push({ x, y });
      }
      return heartPoints;
    };

    const drawNeonLine = (ctx, points, color, width) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      ctx.stroke();
    };

    const addGlow = (ctx, points, color, intensity) => {
      ctx.shadowBlur = 9999999999;
      ctx.shadowColor = `rgba(${color}, ${intensity})`;

      for (let i = 5; i > 0; i--) {
        const glowWidth = i * 3;
        const alpha = i * 0.25 * intensity;
        drawNeonLine(ctx, points, `rgba(${color}, ${alpha})`, glowWidth);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const heartPoints = generateHeartPoints();
    const speed = 1;
    let time = 0;
    let lastTime = 0;
    const fps = 144;
    const interval = 1000 / fps;

    const animate = (currentTime) => {
      if (!lastTime || currentTime - lastTime >= interval) {
        lastTime = currentTime - (currentTime % interval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = Math.min(canvas.width, canvas.height) * 0.25;

        for (let line = 0; line < 2; line++) {
          const offset = line * 3.3;
          const points = [];
          const segmentLength = 30;

          for (let i = 0; i < segmentLength; i++) {
            const progress = i / segmentLength;
            const idx = (time * speed + offset + progress * 0.5) % 1 * heartPoints.length;
            const idx1 = Math.floor(idx) % heartPoints.length;
            const idx2 = (idx1 + 1) % heartPoints.length;
            const frac = idx - idx1;

            const point1 = heartPoints[idx1];
            const point2 = heartPoints[idx2];

            points.push({
              x: centerX + (point1.x + frac * (point2.x - point1.x)) * scale,
              y: centerY + (point1.y + frac * (point2.y - point1.y)) * scale
            });
          }

          if (line === 0) {
            addGlow(ctx, points, '255, 5, 50', 5);
            drawNeonLine(ctx, points, 'rgba(255, 255, 255, 1)', 4);
          } else {
            addGlow(ctx, points, '50, 150, 255', 5);
            drawNeonLine(ctx, points, 'rgba(255, 255, 255, 1)', 4);
          }
        }
      }

      time += 0.005;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />

      <div ref={galleryRef} className={styles.gallery}>
        {heartMask.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell === 1 && mediaIndex < items.length) {
              const media = items[mediaIndex++];
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={styles.cell}
                  onClick={() => setSelected(media)}
                  style={{
                    animationDelay: `${mediaIndex * 0.05}s`,
                    padding: '2px'
                  }}
                >
                  {media.type === 'image' ? (
                    <img src={media.src} alt="" className={styles.media} />
                  ) : (
                    <video src={media.src} muted autoPlay loop className={styles.media} />
                  )}
                </div>
              );
            }
            return <div key={`${rowIndex}-${colIndex}`} className={styles.empty}></div>;
          })
        )}
      </div>

      {selected && (
        <Lightbox
          type={selected.type}
          src={selected.src}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}