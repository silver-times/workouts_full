import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import apiconfig from "../config/api";

type Workout = {
  title: string;
  reps: number;
  load: number;
};

const WorkoutForm: React.FC = () => {
  const { dispatch } = useWorkoutContext();
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    reps: 0,
    load: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWorkout((prevData) => ({
      ...prevData,
      [name]: name === "reps" || name === "load" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(apiconfig.workouts, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      return;
    }

    setWorkout({ title: "", reps: 0, load: 0 });
    setError(null);
    dispatch({ type: "CREATE_WORKOUT", payload: json });
  };

  return (
    <form onSubmit={handleSubmit} className="sticky top-0 py-2">
      <h3 className="font-bold uppercas text-4xl text-white text-center mt-5">
        Add new workout
      </h3>

      <input
        type="text"
        placeholder="Title"
        name="title"
        value={workout.title}
        onChange={handleChange}
        className="block w-full px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <input
        type="text"
        placeholder="Load (in kg)"
        name="load"
        value={workout.load}
        onChange={handleChange}
        className="block w-full px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <input
        type="text"
        placeholder="Reps"
        name="reps"
        value={workout.reps}
        onChange={handleChange}
        className="block w-full px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <button
        type="submit"
        className="my-4 block w-full px-4 py-4 bg-green hover:bg-black hover:text-white border-2  rounded-lg text-2xl text-black font-bold"
      >
        Submit
      </button>
      {error && <p className="text-warning">{error}</p>}
    </form>
  );
};

export default WorkoutForm;
