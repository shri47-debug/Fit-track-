import { useMemo } from "react";
import { useFitness } from "../context/FitnessContext";
import { last7Days, calcStreak } from "../utils/dates";

export default function StatsCards() {
  const { workouts } = useFitness();

  const stats = useMemo(() => {
    const week = new Set(last7Days().map((d) => d.key));
    const thisWeek = workouts.filter((w) => week.has(w.date));
    return {
      minutes: thisWeek.reduce((s, w) => s + w.duration, 0),
      kcal: thisWeek.reduce((s, w) => s + w.calories, 0),
      streak: calcStreak(workouts),
    };
  }, [workouts]);

  const cards = [
    { value: stats.minutes.toLocaleString(), label: "min this week" },
    { value: stats.kcal.toLocaleString(), label: "kcal burned" },
    { value: stats.streak, label: "day streak" },
  ];

  return (
    <section className="stats">
      {cards.map((c) => (
        <div className="card stat" key={c.label}>
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
        </div>
      ))}
    </section>
  );
}
