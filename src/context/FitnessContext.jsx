import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FitnessContext = createContext(null);

export const DEFAULT_PROFILE = { weight: 65, height: 170, goal: 600 };

export function fitReducer(state, action) {
  switch (action.type) {
    case "ADD_WORKOUT":
      return { ...state, workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return { ...state, workouts: state.workouts.filter((w) => w.id !== action.id) };
    case "SET_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.payload } };
    default:
      return state;
  }
}

export function FitnessProvider({ children }) {
  const [saved, setSaved] = useLocalStorage("ft_data", {
    workouts: [],
    profile: DEFAULT_PROFILE,
  });
  const [state, dispatch] = useReducer(fitReducer, saved);

  // mirror reducer state into localStorage
  useEffect(() => {
    setSaved(state);
  }, [state, setSaved]);

  return (
    <FitnessContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FitnessContext.Provider>
  );
}

export const useFitness = () => useContext(FitnessContext);
