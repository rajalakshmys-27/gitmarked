import { useState, useEffect, useRef } from "react";

// Custom hook for debouncing a value
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef();

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler.current);
  }, [value, delay]);

  return debouncedValue;
}
