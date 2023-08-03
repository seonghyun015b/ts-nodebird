import { useState, useCallback, ChangeEvent } from 'react';

type InputHook = [string, (e: ChangeEvent<HTMLInputElement>) => void];

export default (initialValue: string): InputHook => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
