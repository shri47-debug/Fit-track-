import { useState } from "react";

export default function WorkoutItem({ workout, onDelete }) {
  const [leaving, setLeaving] = useState(false);

  const handleDelete = () => {
    setLeaving(true);                              // play exit animation first
    setTimeout(() => onDelete(workout.id), 250);   // then remove from state
  };

  return (
    <li className={`workout-item cat-${workout.category.toLowerCase()} ${leaving ? "leaving" : ""}`}>
      <div className="workout-main">
        <strong>{workout.type}</strong>
        <span className="muted">
          {workout.duration} min · {workout.intensity} · {workout.date}
        </span>
      </div>
      <span className="badge">{workout.category}</span>
      <span className="kcal">{workout.calories} kcal</span>
      <button className="icon-btn" onClick={handleDelete} aria-label={`Delete ${workout.type} workout`}>✕</button>
    </li>
  );
}
