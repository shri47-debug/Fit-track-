export const WORKOUT_TYPES = {
  Walking:  { met: 3.5, category: "Cardio" },
  Running:  { met: 9.8, category: "Cardio" },
  Cycling:  { met: 7.5, category: "Cardio" },
  HIIT:     { met: 8.0, category: "Cardio" },
  Strength: { met: 6.0, category: "Strength" },
  Yoga:     { met: 2.5, category: "Flexibility" },
};

export const INTENSITY = { Low: 0.85, Medium: 1.0, High: 1.2 };

// kcal = MET x intensity factor x body weight (kg) x hours
export const calcCalories = (type, mins, kg, level) =>
  Math.round(WORKOUT_TYPES[type].met * INTENSITY[level] * kg * (mins / 60));
