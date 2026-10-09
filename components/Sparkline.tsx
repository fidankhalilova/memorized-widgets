// css-only sparkline

interface Props {
  values: number[];
}

export default function Sparkline({ values }: Props) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  return (
    <div className="flex h-12 items-end gap-px">
      {values.map((v, i) => (
        <div
          key={i}
          style={{ height: `${10 + ((v - min) / span) * 90}%` }}
          className="flex-1 rounded-t-sm bg-blue-500"
        />
      ))}
    </div>
  );
}