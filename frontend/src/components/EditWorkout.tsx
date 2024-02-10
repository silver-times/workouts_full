import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import apiconfig from "../config/api";

type EditWorkoutProps = {
  id: number;
  title: string;
  reps: number;
  load: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditWorkout = ({
  id,
  title,
  reps,
  load,
  setIsEditing,
}: EditWorkoutProps) => {
  const { dispatch } = useWorkoutContext();
  const { token } = useAuthContext();

  const [newTitle, setNewTitle] = useState(title);
  const [newReps, setNewReps] = useState(reps);
  const [newLoad, setNewLoad] = useState(load);

  const handleUpdate = async () => {
    const workout = {
      id,
      title: newTitle,
      reps: newReps,
      load: newLoad,
    };

    const response = await fetch(`${apiconfig.workouts}/${id}`, {
      method: "PUT",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const updatedWorkout = await response.json();
      dispatch({ type: "UPDATE_WORKOUT", payload: updatedWorkout });
    }
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="block w-1/3 px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />
      <input
        type="number"
        value={newReps}
        onChange={(e) => setNewReps(parseInt(e.target.value))}
        className="block w-1/3 px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />
      <input
        type="number"
        value={newLoad}
        onChange={(e) => setNewLoad(parseInt(e.target.value))}
        className="block w-1/3 px-4 py-4 bg-white bg-opacity-80 p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md border-2  rounded-lg text-xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="my-4 block w-1/6 px-4 py-4 bg-green hover:bg-black border-2 rounded-lg font-bold text-2xl text-black hover:text-white"
        >
          Update
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="my-4 block w-1/6 px-4 py-4 bg-green hover:bg-black border-2 rounded-lg font-bold text-2xl text-black hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditWorkout;
