# FitTrack — Fitness Management Web App

A React single-page app to log workouts, estimate calories burned, track a daily goal,
view weekly progress, calculate BMI and get an "Exercise of the day" from the public wger API.
Data is saved in the browser (localStorage). No backend, no deployment needed.

## Run it locally

Requires Node.js 18 or newer (https://nodejs.org).

```bash
npm install
npm run dev
```

Open the address printed in the terminal (normally http://localhost:5173).

## Project structure

```
src/
  main.jsx                  entry point
  App.jsx                   root layout + theme
  App.css                   styles + light/dark theme tokens
  context/FitnessContext.jsx  useReducer global state (workouts, profile)
  hooks/useLocalStorage.js  generic persistence hook
  utils/calories.js         MET-based calorie formula
  utils/dates.js            date helpers (last 7 days, streak)
  components/               StatsCards, GoalProgress, WorkoutForm, WorkoutList,
                            WorkoutItem, WeeklyChart, BMICalculator, ExerciseTip, ThemeToggle
```

## Reset saved data
Open the browser DevTools console and run `localStorage.clear()`, then refresh.
