import {
  useState,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';

type InputHook = [
  string,
  (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<string>>
];

export default (initialValue: string): InputHook => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );
  return [value, handler, setValue];
};
