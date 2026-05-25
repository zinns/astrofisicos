export function OrbitGraphic() {
  return (
    <div className="pointer-events-none absolute -right-20 top-8 hidden size-72 rounded-full border border-orbit-500/20 lg:block">
      <div className="absolute inset-8 rounded-full border border-orbit-500/20" />
      <div className="absolute inset-16 rounded-full border border-solar-400/25" />
      <div className="absolute left-10 top-16 size-4 rounded-full bg-solar-400 shadow-[var(--shadow-solar)]" />
      <div className="absolute bottom-14 right-12 size-3 rounded-full bg-orbit-500 shadow-[var(--shadow-cosmic)]" />
    </div>
  );
}

