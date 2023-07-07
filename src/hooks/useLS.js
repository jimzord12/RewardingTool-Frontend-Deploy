import { useState } from "react";

export function useLS(key, initialValue) {
  // Only called once when component is rendered for the first time
  const getFromLS = () => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getFromLS);

  const saveToLS = (_key, value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(_key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLS = (_key) => {
    try {
      window.localStorage.removeItem(_key);
      setStoredValue(null);
    } catch (error) {
      console.log(error);
    }
  };

  return [saveToLS, getFromLS, removeFromLS];
}
