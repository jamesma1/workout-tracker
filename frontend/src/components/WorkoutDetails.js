import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { title, load, reps, type, _id } = workout;
  const [edit, setEdit] = useState(false);
  const [newLoad, setNewLoad] = useState(load);
  const [newReps, setNewReps] = useState(reps);

  const handleDelete = async () => {
    const res = await fetch(`/api/workouts/${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };

  const saveEdit = async () => {
    const workout = { load: newLoad, reps: newReps };

    const res = await fetch(`/api/workouts/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setEdit(false);
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  if (edit) {
    return (
      <div className="edit-workout-details">
        <h4>{title}</h4>
        <p>
          <strong>Load (kg): </strong>
          <input
            type="number"
            value={newLoad}
            onChange={(e) => setNewLoad(e.target.value)}
          />
        </p>
        <p>
          <strong>Reps: </strong>
          <input
            type="number"
            value={newReps}
            onChange={(e) => setNewReps(e.target.value)}
          />
        </p>
        <p>
          <strong>Type: </strong>
          {type}
        </p>
        <button onClick={cancelEdit}>Cancel</button>
        <button onClick={saveEdit}>Save</button>
      </div>
    );
  }

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>
        <strong>Type: </strong>
        {type}
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default WorkoutDetails;
