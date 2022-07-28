import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({ pageType }) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const { dispatch } = useWorkoutsContext();

  useEffect(() => {
    if (pageType !== "All") {
      setType(pageType);
      document.getElementById("type").setAttribute("disabled", true);
    }
  }, [pageType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps, type };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      if (json.missingFields) {
        setMissingFields(json.missingFields);
      }
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setMissingFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h4>Add new workout</h4>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={missingFields.includes("title") ? "error" : ""}
          />
        </div>
        <div>
          <label htmlFor="load">Load (kg):</label>
          <input
            type="number"
            id="load"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={missingFields.includes("load") ? "error" : ""}
          />
        </div>
        <div>
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            id="reps"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={missingFields.includes("reps") ? "error" : ""}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <div
            className={`select-type ${
              missingFields.includes("type") ? "error" : ""
            }`}
          >
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">-</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Leg">Leg</option>
            </select>
          </div>
        </div>
        <button>Add Workout</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default WorkoutForm;
