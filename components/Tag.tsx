export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
      {label}
    </span>
  );
}
