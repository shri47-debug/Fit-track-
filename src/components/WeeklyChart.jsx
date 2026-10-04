import { useMemo } from "react";
import { useFitness } from "../context/FitnessContext";
import { last7Days } from "../utils/dates";

export default function WeeklyChart() {
  const { workouts } = useFitness();

  const data = useMemo(
    () =>
      last7Days().map((d) => ({
        day: d.label,
        kcal: workouts.filter((w) => w.date === d.key).reduce((s, w) => s + w.calories, 0),
      })),
    [workouts]
  );

  const W = 420, H = 220, pad = { l: 40, r: 10, t: 18, b: 30 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b, bw = iw / data.length;
  const top = Math.max(100, Math.ceil(Math.max(...data.map((d) => d.kcal)) / 100) * 100);
  const y = (v) => pad.t + ih - (v / top) * ih;

  return (
    <section className="card">
      <h2>Weekly calories</h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Calories burned per day, last 7 days">
        {[0, top / 2, top].map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="grid" />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" className="axis">{t}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.l + i * bw + bw * 0.18;
          const h = (d.kcal / top) * ih;
          return (
            <g key={i}>
              <rect x={x} y={y(d.kcal)} width={bw * 0.64} height={h} rx="5"
                className={i === data.length - 1 ? "bar-today" : "bar-day"}>
                <title>{`${d.day}: ${d.kcal} kcal`}</title>
              </rect>
              {d.kcal > 0 && <text x={x + bw * 0.32} y={y(d.kcal) - 5} textAnchor="middle" className="axis">{d.kcal}</text>}
              <text x={x + bw * 0.32} y={H - 10} textAnchor="middle" className="axis">{d.day}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
