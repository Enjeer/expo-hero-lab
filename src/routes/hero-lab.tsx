import { createFileRoute } from "@tanstack/react-router";
import { LabDivider } from "@/components/hero-lab/LabDivider";
import { Hero01Cinematic } from "@/components/hero-lab/Hero01Cinematic";
import { Hero02Spatial } from "@/components/hero-lab/Hero02Spatial";
import { Hero03Kinetic } from "@/components/hero-lab/Hero03Kinetic";
import { Hero04Digital } from "@/components/hero-lab/Hero04Digital";
import { Hero05Portal } from "@/components/hero-lab/Hero05Portal";

const TITLE = "EXPO — Experimental Hero Lab: 5 концепций первого экрана";
const DESC =
  "Лаборатория Hero-концепций EXPO: пять радикально разных первых экранов для выставок, форумов и event-пространств.";

export const Route = createFileRoute("/hero-lab")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeroLab,
});

function HeroLab() {
  return (
    <main className="bg-brand-ink text-foreground">
      <header className="relative z-20 border-b border-brand-line bg-brand-ink">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4 px-6 py-10 md:px-10 md:py-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-flame">
              internal / not a live page
            </p>
            <h1 className="mt-4 font-display text-[9vw] uppercase leading-[0.85] tracking-[-0.04em] md:text-[4.5vw]">
              Experimental Hero Lab
            </h1>
          </div>
          <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-brand-dim">
            5 концепций первого экрана EXPO. Скроллить, водить курсором, тянуть. Выбрать
            направление.
          </p>
        </div>
      </header>

      <LabDivider index="01" name="Cinematic Space" note="scroll = движение камеры внутрь зала" />
      <Hero01Cinematic />

      <LabDivider index="02" name="Spatial Object" note="mouse = наклон рига / scroll = приближение и раскрытие" />
      <Hero02Spatial />

      <LabDivider index="03" name="Kinetic Type" note="буквы EXPO как стены, которые разъезжаются" />
      <Hero03Kinetic />

      <LabDivider index="04" name="Digital / Distortion" note="canvas: изображение собирается по мере скролла, курсор искажает" />
      <Hero04Digital />

      <LabDivider index="05" name="Unexpected — The Crate" note="перетащи ручку: кейс распаковывает событие" />
      <Hero05Portal />

      <footer className="border-t border-brand-line px-6 py-12 font-mono text-[10px] uppercase tracking-[0.35em] text-brand-dim md:px-10">
        end of lab — 5 / 5 концепций
      </footer>
    </main>
  );
}
