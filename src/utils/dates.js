export const toKey = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const todayKey = () => toKey(new Date());

export const last7Days = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { key: toKey(d), label: d.toLocaleDateString("en-US", { weekday: "short" }) };
  });

// consecutive days with at least one workout, counted back from today
export const calcStreak = (workouts) => {
  const days = new Set(workouts.map((w) => w.date));
  const d = new Date();
  if (!days.has(toKey(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(toKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};
