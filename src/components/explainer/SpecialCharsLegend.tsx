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
    <p className="mt-3 text-xs text-text-muted leading-relaxed">
      <span className="text-text-dim">Special characters:</span>{" "}
      {ITEMS.map((it, i) => (
        <span key={it.sym}>
          <code className="font-mono text-text">{it.sym}</code> = {it.desc}
          {i < ITEMS.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}
