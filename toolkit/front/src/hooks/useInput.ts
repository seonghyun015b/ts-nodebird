import {
  useState,
  useCallback,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react';

type InputHook = [
  string,
  (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<string>>
];

const useInput = (initialVAlue: string): InputHook => {
  const [value, setValue] = useState(initialVAlue);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, handler, setValue];
};

export default useInput;
