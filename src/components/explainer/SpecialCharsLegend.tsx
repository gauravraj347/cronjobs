const ITEMS = [
  { sym: "*", desc: "every" },
  { sym: "*/n", desc: "every n" },
  { sym: "a-b", desc: "range" },
  { sym: "a,b", desc: "list" },
  { sym: "L", desc: "last" },
  { sym: "W", desc: "weekday" },
];

export function SpecialCharsLegend() {
  return (
    <p className="mt-4 text-xs text-text-muted leading-relaxed">
      <span className="text-text-dim">Special characters:</span>{" "}
      {ITEMS.map((it, i) => (
        <span key={it.sym}>
          <code className="font-mono font-bold text-accent">{it.sym}</code>
          <span className="text-text-muted"> = {it.desc}</span>
          {i < ITEMS.length - 1 ? <span className="text-text-dim">, </span> : null}
        </span>
      ))}
    </p>
  );
}
