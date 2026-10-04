import { useMemo, useState } from "react";
import { useFitness } from "../context/FitnessContext";
import WorkoutItem from "./WorkoutItem";

const FILTERS = ["All", "Cardio", "Strength", "Flexibility"];

export default function WorkoutList() {
  const { workouts, dispatch } = useFitness();
  const [filter, setFilter] = useState("All");

  const visibleWorkouts = useMemo(() => {
    const sorted = [...workouts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return filter === "All" ? sorted : sorted.filter((w) => w.category === filter);
  }, [workouts, filter]);

  return (
    <section className="card">
      <div className="row between">
        <h2>Workout history</h2>
        <span className="muted">{visibleWorkouts.length} shown</span>
      </div>
      <div className="tabs" role="tablist">
        {FILTERS.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f}
            className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      {visibleWorkouts.length === 0 ? (
        <p className="empty">No workouts here yet. Log your first one above!</p>
      ) : (
        <ul className="workout-list">
          {visibleWorkouts.map((w) => (
            <WorkoutItem key={w.id} workout={w} onDelete={(id) => dispatch({ type: "DELETE_WORKOUT", id })} />
          ))}
        </ul>
      )}
    </section>
  );
}
