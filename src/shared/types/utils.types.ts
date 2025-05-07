interface IHandleInputChangeProps<T> {
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;
  setInputValue: React.Dispatch<React.SetStateAction<T>>;
}
export type { IHandleInputChangeProps };
