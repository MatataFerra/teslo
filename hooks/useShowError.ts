import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const useShowError = (
  initialState: boolean
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [showError, setShowError] = useState(initialState);

  useEffect(() => {
    console.log("entrando al efecto");
    const timer = setTimeout(() => {
      setShowError(!initialState);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [initialState]);

  return [showError, setShowError];
};
