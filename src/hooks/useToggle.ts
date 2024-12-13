import { Dispatch, SetStateAction } from "react";

export function useToggle({
  value,
  setValue,
}: {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}) {
  const toggleFn = () => setValue((prev) => !prev);

  return { toggleFn };
}
