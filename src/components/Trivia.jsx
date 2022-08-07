/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import Celebration from "./Celebration";
import { Howl, Howler } from "howler";

import useSound from "use-sound";
import correct from "../assets/mainak khanki.mp3";
import wrong from "../assets/babu mere chole galo.mp3";
import play from "../assets/tudung tudung.mp3";

import hoverBut from "../assets/hover.mp3";
import buzzer from "../assets/buzzer.mp3";
import clock from "../assets/ticktock.mp3";
import back from "../assets/background.mp3";

const Trivia = ({
  username,
  setUsername,
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
  //soundeffects

  var background = new Howl({
    src: back,
    html5: true,
  });
  background.volume(0.1);

  // background.play();

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  const [playBut] = useSound(hoverBut);
  const [buzzerLock] = useSound(buzzer);
  const [playClock, { stop }] = useSound(clock);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    playClock();
  }, [questionNumber, playClock]);

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
    stop();
    buzzerLock();
    setClick(true);
    setSelectedAnswer(a);
    setClassName("answer active");

    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    if (a.correct) {
      setTimeout(() => {
        correctAnswer();
      }, 5000);
      setTimeout(() => {
        setNext(true);
      }, 7000);
    } else {
      setTimeout(() => {
        setStop(true);
        wrongAnswer();
      }, 6000);
    }
  };

  return (
    <div className="celeb">
      {questionNumber === 2 ? (
        <Celebration
          username={username}
          setUsername={setUsername}
          setQuestionNumber={setQuestionNumber}
          stop={stop}
          playBut={playBut}
        />
      ) : (
        <div className="trivia">
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
                onMouseEnter={() => {
                  playBut();
                }}
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
        </div>
      )}
    </div>
  );
};

export default Trivia;
