export function LabDivider({
  index,
  name,
  note,
}: {
  index: string;
  name: string;
  note: string;
}) {
  return (
    <div className="relative z-20 border-y border-brand-line bg-brand-ink">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-baseline gap-x-6 gap-y-2 px-6 py-5 md:px-10">
        <span className="font-mono text-xs tracking-[0.4em] text-brand-flame">{index}</span>
        <span className="font-display text-lg uppercase tracking-[0.18em] text-brand-chalk md:text-2xl">
          {name}
        </span>
        <span className="ml-auto max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-brand-dim md:text-[11px]">
          {note}
        </span>
      </div>
    </div>
  );
}
