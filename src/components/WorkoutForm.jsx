import { useState } from "react";
import { useFitness, DEFAULT_PROFILE } from "../context/FitnessContext";
import { WORKOUT_TYPES, INTENSITY, calcCalories } from "../utils/calories";
import { todayKey } from "../utils/dates";

export default function WorkoutForm() {
  const { profile, dispatch } = useFitness();
  const [type, setType] = useState("Running");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("Medium");
  const [date, setDate] = useState(todayKey());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mins = Number(duration);
    if (!Number.isFinite(mins) || mins <= 0 || mins > 600) {
      setError("Enter a duration between 1 and 600 minutes.");
      return;
    }
    const kg = profile.weight > 0 ? profile.weight : DEFAULT_PROFILE.weight;
    dispatch({
      type: "ADD_WORKOUT",
      payload: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type,
        category: WORKOUT_TYPES[type].category,
        duration: mins,
        intensity,
        date,
        calories: calcCalories(type, mins, kg, intensity),
      },
    });
    setDuration("");
    setError("");
  };

  return (
    <section className="card">
      <h2>Log a workout</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Exercise
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(WORKOUT_TYPES).map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>
          Duration (min)
          <input
            type="number"
            placeholder="e.g. 30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          Intensity
          <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
            {Object.keys(INTENSITY).map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        <label>
          Date
          <input type="date" value={date} max={todayKey()} onChange={(e) => setDate(e.target.value || todayKey())} />
        </label>
        <button className="btn primary" type="submit">+ Log workout</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
