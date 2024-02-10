import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import apiconfig from "../config/api";
import Navbar from "../components/Navbar";

const Home = () => {
  const { state, dispatch } = useWorkoutContext();
  const { user, token } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(apiconfig.workouts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          console.log("Error in fetching workouts");
          return;
        }
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkouts();
  }, [dispatch, user, token]);

  return (
    <div className="pb-32">
      <Navbar />
      <div className="container mx-auto gap-8 flex flex-col-reverse md:flex-row-reverse">
        <div className="p-16 sm:order-2 md:w-3/4 md:p-0">
          {state.workouts &&
            state.workouts.map((workout) => (
              <span key={workout.title} className="mb-32">
                <WorkoutDetail {...workout} />
              </span>
            ))}
        </div>
        <div className="p-16 sm:order-1 md:w-1/4 md:p-0">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
