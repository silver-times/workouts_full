import { createContext, Dispatch, Reducer, useReducer } from "react";

type Workout = {
  id: number;
  title: string;
  reps: number;
  load: number;
};

type WorkoutState = {
  workouts: Workout[];
};

type WorkoutAction = {
  type: string;
  payload?: any;
};

const initialState: WorkoutState = {
  workouts: [],
};

type WorkoutContextType = {
  state: WorkoutState;
  dispatch: Dispatch<WorkoutAction>;
};

export const WorkoutContext = createContext<WorkoutContextType>({
  state: initialState,
  dispatch: () => null,
});

const workoutReducer: Reducer<WorkoutState, WorkoutAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((workout) =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

interface ChildrenProps {
  children: React.ReactNode;
}
export const WorkoutContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
