import { useEffect, useState } from "react";

const API_URL = "https://wger.de/api/v2/exerciseinfo/?language=2&limit=20";

const FALLBACK_TIPS = [
  { name: "Bodyweight Squats", category: "Legs" },
  { name: "Push-ups", category: "Chest" },
  { name: "Plank", category: "Abs" },
  { name: "Jumping Jacks", category: "Cardio" },
  { name: "Walking Lunges", category: "Legs" },
  { name: "Burpees", category: "Cardio" },
];

export default function ExerciseTip() {
  const [tip, setTip] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTip = async () => {
    setLoading(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    try {
      const res = await fetch(API_URL, { signal: ctrl.signal });
      if (!res.ok) throw new Error("Bad response");
      const data = await res.json();
      const usable = data.results.filter((r) =>
        r.translations?.some((t) => t.language === 2 && t.name)
      );
      if (usable.length === 0) throw new Error("No usable data");
      const pick = usable[Math.floor(Math.random() * usable.length)];
      const en = pick.translations.find((t) => t.language === 2 && t.name);
      setTip({ name: en.name, category: pick.category?.name ?? "General" });
      setSource("Live · wger API");
    } catch (err) {
      setTip(FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)]); // offline-safe fallback
      setSource("Offline tip");
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTip();
  }, []);

  return (
    <section className="card">
      <div className="row between">
        <h2>Exercise of the day</h2>
        <button className="btn ghost" onClick={loadTip} disabled={loading}>↻ New</button>
      </div>
      {loading ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <p className="tip-name" data-testid="tip-name">{tip.name}</p>
          <p className="muted">
            <span className="badge">{tip.category}</span> <span className="source">{source}</span>
          </p>
        </>
      )}
    </section>
  );
}
