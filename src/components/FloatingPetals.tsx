import React, { useEffect, useRef, useState } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setMotionOk(!e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!motionOk) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let petals: Petal[] = [];
    const maxPetals = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create a petal matching Electric Peony and Pale Pink color schemes
    const createPetal = (isOnStart = false): Petal => {
      const size = Math.random() * 8 + 6;
      return {
        x: Math.random() * window.innerWidth,
        y: isOnStart ? Math.random() * window.innerHeight : -20,
        size,
        speedY: Math.random() * 0.8 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 2 - 1) * 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        swing: Math.random() * 10,
        swingSpeed: Math.random() * 0.02 + 0.005,
      };
    };

    // Pre-populate screen
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    const drawPetalPath = (ctx: CanvasRenderingContext2D, size: number) => {
      // Draw organic curved peony/cherry blossom petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal, index) => {
        // Update petal metrics
        petal.y += petal.speedY;
        petal.swing += petal.swingSpeed;
        petal.x += petal.speedX + Math.sin(petal.swing) * 0.35;
        petal.rotation += petal.rotationSpeed;

        // Reset petal if off-screen
        if (petal.y > canvas.height + 20 || petal.x < -20 || petal.x > canvas.width + 20) {
          petals[index] = createPetal(false);
          return;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);

        // Gradient for premium aesthetic: Peony pink (#FF1493) to deep currant rose (#7A586B)
        const gradient = ctx.createLinearGradient(0, 0, 0, petal.size);
        gradient.addColorStop(0, `rgba(255, 20, 147, ${petal.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 105, 180, ${petal.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(122, 88, 107, ${petal.opacity * 0.5})`);

        ctx.fillStyle = gradient;
        
        // Shadow for premium soft floating look
        ctx.shadowBlur = petal.size * 0.5;
        ctx.shadowColor = "rgba(255, 20, 147, 0.2)";
        
        drawPetalPath(ctx, petal.size);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [motionOk]);

  if (!motionOk) return null; // Fully respecting reduced motion choice

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 block"
      style={{ opacity: 0.85 }}
      id="petals-canvas"
    />
  );
}
