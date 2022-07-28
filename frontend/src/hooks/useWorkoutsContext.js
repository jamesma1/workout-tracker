import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

/* 
can just use useContext, but in case we have multiple contexts,
creating a custom hook for each context can simplify things
*/
export const useWorkoutsContext = () => {
  // gives us the value property on the context object
  const context = useContext(WorkoutsContext);

  // if function is invoked outside of context provider, context will be null
  if (!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutsContext Provider');
  }
  
  return context;
}