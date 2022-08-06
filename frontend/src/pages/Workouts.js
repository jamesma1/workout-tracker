import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { IconContext } from "react-icons";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Workouts = () => {
  const { state, dispatch } = useWorkoutsContext();
  const { workouts } = state;
  const { type } = useParams();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch(`/api/workouts/${type}`);
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    fetchWorkouts();
  }, [dispatch, type]);

  if (!workouts) {
    return <h2>Loading...</h2>;
  }

  return (
    <IconContext.Provider value={{ style: { width: "20px", height: "20px" } }}>
      <div className="workouts-by-type">
        <h3>{type} Workouts</h3>
        <div className="workouts">
          {workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        </div>
        <WorkoutForm pageType={type} />
      </div>
    </IconContext.Provider>
  );
};

export default Workouts;
