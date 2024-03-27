import * as React from "react";

export const useDebounce = <T>(value: T, debounceTime: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);
    return () => clearTimeout(timeout);
  }, [debounceTime, value]);

  return debouncedValue;
};
