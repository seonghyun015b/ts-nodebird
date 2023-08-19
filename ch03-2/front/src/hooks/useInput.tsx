import { useState, useCallback, ChangeEvent } from 'react';

type InputHook = [
  string,
  (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
];

const useInput = (initialValue: string): InputHook => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );
  return [value, handler];
};

export default useInput;
