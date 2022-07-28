import WorkoutTypes from "../components/WorkoutTypes";

const Home = () => {
  return (
    <div className="home">
      <WorkoutTypes type="Push" id="push-workouts" />
      <WorkoutTypes type="Pull" id="pull-workouts" />
      <WorkoutTypes type="Leg" id="leg-workouts" />
      <WorkoutTypes type="All" id="all-workouts" />
    </div>
  );
};

export default Home;
