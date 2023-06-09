import { useHistory } from "react-router-dom";
import { useState } from "react";

export const useNavigation = () => {
  const [state, setState] = useState(null); // Here you're declaring your state variable
  const history = useHistory();

  const navigate = (path, state) => {
    setState(state); // Setting state
    history.push(path, state); // You can pass state here
  };

  return { navigate, state }; // Expose the state
};
