import { useEffect, useState } from "react";

export default function Timer({ setStop, questionNumber, click, setClick }) {
  const [timer, setTimer] = useState(240);

  useEffect(() => {
    if (timer === 0) return setStop(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (click) return clearInterval(interval);
    return () => clearInterval(interval);
  }, [setStop, timer, click]);

  useEffect(() => {
    setTimer(240);
    setClick(false);
  }, [questionNumber, setClick]);

  return timer;
}
