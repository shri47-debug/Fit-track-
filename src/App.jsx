import useLocalStorage from "./hooks/useLocalStorage";
import { FitnessProvider } from "./context/FitnessContext";
import ThemeToggle from "./components/ThemeToggle";
import StatsCards from "./components/StatsCards";
import GoalProgress from "./components/GoalProgress";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import WeeklyChart from "./components/WeeklyChart";
import BMICalculator from "./components/BMICalculator";
import ExerciseTip from "./components/ExerciseTip";

export default function App() {
  const [theme, setTheme] = useLocalStorage("ft_theme", "light");

  return (
    <FitnessProvider>
      <div className={`app ${theme}`}>
        <header className="topbar">
          <h1>FitTrack</h1>
          <span className="tagline">Fitness management dashboard</span>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>
        <main className="layout">
          <div className="col">
            <StatsCards />
            <GoalProgress />
            <WorkoutForm />
            <WorkoutList />
          </div>
          <div className="col">
            <WeeklyChart />
            <BMICalculator />
            <ExerciseTip />
          </div>
        </main>
      </div>
    </FitnessProvider>
  );
}
