import { useFitness } from "../context/FitnessContext";

export default function BMICalculator() {
  const { profile, dispatch } = useFitness();
  const valid = profile.weight > 0 && profile.height > 0;
  const bmi = valid ? profile.weight / (profile.height / 100) ** 2 : null;
  const category =
    bmi === null ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";

  const set = (key) => (e) => dispatch({ type: "SET_PROFILE", payload: { [key]: Number(e.target.value) } });

  return (
    <section className="card">
      <h2>BMI calculator</h2>
      <div className="form-grid two">
        <label>
          Weight (kg)
          <input type="number" min="1" value={profile.weight || ""} onChange={set("weight")} />
        </label>
        <label>
          Height (cm)
          <input type="number" min="1" value={profile.height || ""} onChange={set("height")} />
        </label>
      </div>
      <p className="bmi-result">
        {bmi === null ? (
          <span className="muted">Enter weight and height to see your BMI.</span>
        ) : (
          <>
            <strong className="bmi-value">{bmi.toFixed(1)}</strong>
            <span className={`pill ${category.toLowerCase()}`}>{category}</span>
          </>
        )}
      </p>
      <p className="muted small">Weight is also used to estimate calories burned.</p>
    </section>
  );
}
