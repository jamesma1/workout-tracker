import { Link } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Navbar = () => {
  const { dispatch } = useWorkoutsContext();

  function resetWorkouts() {
    dispatch({ type: "SET_WORKOUTS", payload: null });
  }

  return (
    <header>
      <div className="container">
        <Link to="/" onClick={resetWorkouts}>
          <h1>Workout Tracker</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
