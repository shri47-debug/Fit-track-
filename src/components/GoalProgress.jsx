import { useMemo } from "react";
import { useFitness } from "../context/FitnessContext";
import { todayKey } from "../utils/dates";

export default function GoalProgress() {
  const { workouts, profile, dispatch } = useFitness();

  const todayKcal = useMemo(
    () => workouts.filter((w) => w.date === todayKey()).reduce((s, w) => s + w.calories, 0),
    [workouts]
  );
  const goal = profile.goal > 0 ? profile.goal : 0;
  const pct = goal ? Math.round((todayKcal / goal) * 100) : 0;

  return (
    <section className="card">
      <div className="row between">
        <h2>Daily goal</h2>
        <label className="inline">
          Goal (kcal)
          <input
            type="number"
            min="1"
            value={profile.goal || ""}
            onChange={(e) => dispatch({ type: "SET_PROFILE", payload: { goal: Number(e.target.value) } })}
          />
        </label>
      </div>
      <p className="muted">
        {todayKcal} / {goal || "—"} kcal today ({pct}%)
        {pct >= 100 && " · Goal reached!"}
      </p>
      <div className="bar" role="progressbar" aria-valuenow={Math.min(pct, 100)} aria-valuemin="0" aria-valuemax="100">
        <div className="bar-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </section>
  );
}
