import { useState, useEffect, useCallback } from "react";

export const usePressedKey = (): [string, number] => {
  const [key, setKey] = useState<string | null>(null);
  const [repeatCounter, setRepeatCounter] = useState<number>(1);

  const handleRepeat = (inputKey: string, key: string) => {
    if (inputKey === key) {
      setRepeatCounter((prev) => prev + 1);
    } else {
      setRepeatCounter(1);
    }
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setKey((i) => e.code);
        handleRepeat(e.code, key);
      } else {
        setKey((f) => e.key);
        handleRepeat(e.key, key);
      }
    },
    [key]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return [key, repeatCounter];
};
