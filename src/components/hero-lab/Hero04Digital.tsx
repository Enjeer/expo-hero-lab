import { useEffect, useRef } from "react";
import lightImg from "@/assets/hero-light.jpg";
import { useSectionProgress } from "./use-scroll";

/**
 * 04 — DIGITAL / DISTORTION
 * Canvas slices the light installation into horizontal bands. Scroll controls
 * how badly the image is "shattered" (it reassembles as you go), and the cursor
 * drags a lens of displacement + chromatic glow across the bands.
 */
export function Hero04Digital() {
  const [sectionRef, p] = useSectionProgress<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  progressRef.current = p;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = lightImg;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.016;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0708";
      ctx.fillRect(0, 0, w, h);
      if (!img.complete || !img.naturalWidth) return;

      // cover-fit source rect
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      const chaos = 1 - Math.min(1, progressRef.current * 1.35); // reassembles on scroll
      const bands = 46;
      const bandH = h / bands;
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;

      for (let i = 0; i < bands; i++) {
        const y = i * bandH;
        const centerY = y + bandH / 2;
        const lens = Math.exp(-Math.pow((centerY - py) / (h * 0.13), 2));
        const wobble = Math.sin(t * 1.6 + i * 0.7) * 0.5 + Math.sin(i * 2.3) * 0.5;
        const offset =
          wobble * chaos * w * 0.12 + lens * (px / w - 0.5) * 160 * (0.35 + chaos * 0.9);
        const sy = (y / h) * dh;
        const sh = (bandH / h) * dh + 1;

        // chromatic ghosts near the cursor lens
        if (lens > 0.06) {
          ctx.globalAlpha = lens * 0.5;
          ctx.globalCompositeOperation = "screen";
          ctx.drawImage(img, 0, sy / scale, img.naturalWidth, sh / scale, dx + offset + 10 * lens, y, dw, bandH + 1);
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.globalAlpha = 1;
        ctx.drawImage(
          img,
          0,
          sy / scale,
          img.naturalWidth,
          sh / scale,
          dx + offset,
          y,
          dw,
          bandH + 1,
        );

        // scanline
        ctx.globalAlpha = 0.16 + lens * 0.25;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, y + bandH - 1, w, 1);
        ctx.globalAlpha = 1;
      }

      // glow around cursor
      const g = ctx.createRadialGradient(px, py, 0, px, py, h * 0.28);
      g.addColorStop(0, "rgba(255,92,26,0.28)");
      g.addColorStop(1, "rgba(255,92,26,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };
    draw();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
        active: 1,
      };
    };
    canvas.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-[#0a0708]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-hud-grid opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0708] via-transparent to-[#0a0708]/70" />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-brand-flame">
            signal / reassembling {Math.round(Math.min(1, p * 1.35) * 100)}%
          </span>
          <h2 className="mt-4 max-w-4xl font-display text-[10vw] uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-[6.5vw]">
            Событие как
            <br />
            <span className="text-glitch">инженерия</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            EXPO собирает выставки, форумы и конференции из света, конструкции и сценария.
          </p>
          <span className="mt-10 font-mono text-[10px] uppercase tracking-[0.35em] text-brand-dim">
            ↖ двигай курсор — искажай пространство
          </span>
        </div>
      </div>
    </section>
  );
}
