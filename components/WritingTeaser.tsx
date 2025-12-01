const placeholders = [
  {
    title: "Product, AI, and velocity",
    status: "Essay in progress",
  },
  {
    title: "Enterprise UX for GenAI workflows",
    status: "Notes",
  },
  {
    title: "Building fast with small teams",
    status: "Outline",
  },
];

export default function WritingTeaser() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
          Thinking
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal">
          Writing
        </h2>
        <p className="max-w-2xl text-sm text-charcoal/75">
          Essays and breakdowns on product, AI, and creativity are on the way.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {placeholders.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-dashed border-charcoal/10 bg-white/70 p-4 text-sm text-charcoal/70 ring-1 ring-white/80"
          >
            <p className="font-heading text-base font-semibold text-charcoal">
              {item.title}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-charcoal/50">
              {item.status}
            </p>
            <p className="mt-3 text-xs text-charcoal/60">
              Subscribe or check back soon.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
