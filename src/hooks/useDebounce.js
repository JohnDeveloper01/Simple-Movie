import { useEffect, useState } from "react";

function useDebounce(initialValue = "", timer = 1000) {
  const [debounValue, setDebounValue] = useState(initialValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounValue(initialValue);
    }, timer);
    return () => {
      clearTimeout(handler);
    };
  }, [initialValue, timer]);
  return debounValue;
}
export default useDebounce;
