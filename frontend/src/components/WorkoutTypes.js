import { Link } from "react-router-dom";

const WorkoutTypes = ({ type, id }) => {
  return (
    <Link to={`/workouts/${type}`} id={id} className="workout-type">
      <div className="image-container">
        <img src="/muscle.png" alt="" height="100" width="100" />
      </div>
      <div>
        <h3>{type}</h3>
      </div>
    </Link>
  );
};

export default WorkoutTypes;
