import { useEffect, useState } from "react";
import { Howl } from "howler";
import warning from "../assets/Mario_warning.wav";

export default function Timer({ setStop, questionNumber, click, setClick }) {
  const [timer, setTimer] = useState(30);

  let warningS = new Howl({
    src: warning,
    html5: true,
  });
  warningS.volume(0.5);
  if (timer === 10) {
    warningS.play();
  }

  useEffect(() => {
    if (timer === 0) return setStop(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (click) return clearInterval(interval);
    return () => clearInterval(interval);
  }, [setStop, timer, click]);

  useEffect(() => {
    setTimer(30);
    setClick(false);
  }, [questionNumber, setClick]);

  return timer;
}
