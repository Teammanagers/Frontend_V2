import { IHandleInputChangeProps } from '@/shared/types';

const inputChangeHandler = <T>({
  e,
  setInputValue,
}: IHandleInputChangeProps<T>) => {
  const { name, value } = e.target;
  setInputValue((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export { inputChangeHandler };
