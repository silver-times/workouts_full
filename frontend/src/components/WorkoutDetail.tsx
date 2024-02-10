import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import EditWorkout from "./EditWorkout";
import { useAuthContext } from "../hooks/useAuthContext";
import apiconfig from "../config/api";

type WorkoutDetailProps = {
  id: number;
  title: string;
  reps: number;
  load: number;
};

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({
  id,
  title,
  reps,
  load,
}) => {
  const { dispatch } = useWorkoutContext();
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(`${apiconfig.workouts}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log("Workout deleted");
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    } else {
      console.log("Workout not deleted");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-8 my-5 shadow-lg backdrop-filter backdrop-blur-md">
      {isEditing ? (
        <EditWorkout
          setIsEditing={setIsEditing}
          id={id}
          title={title}
          reps={reps}
          load={load}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="my-2 uppercase text-white font-bold text-5xl">
              {title}
            </h1>
            <div className="flex gap-2">
              <span
                onClick={handleEdit}
                className="material-symbols-outlined bg-green rounded-full p-1 text-black hover:text-white hover:bg-black  cursor-pointer"
              >
                edit
              </span>
              <span
                onClick={handleDelete}
                className="material-symbols-outlined bg-warning rounded-full p-1 text-black hover:text-white hover:bg-black  cursor-pointer"
              >
                delete
              </span>
            </div>
          </div>
          <p className="text-xl font-light text-white">
            <strong>Load (kg):</strong> {load}
          </p>
          <p className="text-xl font-light text-white">
            <strong>Reps:</strong> {reps}
          </p>
        </>
      )}
    </div>
  );
};

export default WorkoutDetail;
