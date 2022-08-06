/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import useSound from "use-sound";
import correct from "../assets/mainak khanki.mp3";
import wrong from "../assets/babu mere chole galo.mp3";
import play from "../assets/tudung tudung.mp3";
import back from "../assets/background.mp3";

const Trivia = ({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  // setClick,
}) => {
  const [question, setQuestion] = useState(null);
  const [next, setNext] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [click, setClick] = useState(false);

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [background] = useSound(back);

  useEffect(() => {
    letsPlay();
  }, [letsPlay, questionNumber]);

  useEffect(() => {
    background();
  }, [background]);

  // QUESTION NUMBER INITIALIZER
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleNext = () => {
    setQuestionNumber((prev) => prev + 1);
    setSelectedAnswer(null);
    setNext(false);
  };

  const handleClick = (a) => {
    setClick(true);
    setSelectedAnswer(a);
    setClassName("answer active");

    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    if (a.correct) {
      setTimeout(() => {
        setNext(true);
        correctAnswer();
      }, 5000);
    } else {
      setTimeout(() => {
        setStop(true);
        wrongAnswer();
      }, 6000);
    }
  };

  return (
    <div className="trivia">
      {questionNumber === 6 ? (
        <h1>laura</h1>
      ) : (
        <>
          <div className="top">
            <div className="timer">
              <Timer
                setStop={setStop}
                questionNumber={questionNumber}
                click={click}
                setClick={setClick}
              />
            </div>
          </div>
          <div className="question">{question?.question}</div>
          <div className="answers">
            {question?.answers.map((a) => (
              <div
                className={selectedAnswer === a ? className : "answer"}
                onClick={() => handleClick(a)}
              >
                {a.text}
              </div>
            ))}
          </div>
          <div
            className={next === false ? "next" : "next active"}
            onClick={handleNext}
          >
            Next
          </div>
        </>
      )}
    </div>
  );
};

export default Trivia;
