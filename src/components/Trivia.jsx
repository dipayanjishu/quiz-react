/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import Timer from "./Timer";
import Celebration from "./Celebration";
import { Howl, Howler } from "howler";

import useSound from "use-sound";
import correct from "../assets/mainak khanki.mp3";
import wrong from "../assets/babu mere chole galo.wav";
// import play from "../assets/tudung tudung.mp3";

import hoverBut from "../assets/hover.mp3";
import buzzer from "../assets/buzzer.mp3";
import clock from "../assets/ticktock.mp3";
import back from "../assets/backgroundjuzz.mp3";
import nextSound from "../assets/nextSound.wav";

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
  const [bgsound, setbgsound] = useState(false);
  //soundeffects

  var background = new Howl({
    src: back,
    html5: true,
  });
  background.volume(0.1);

  let buzzerLock = new Howl({
    src: buzzer,
    html5: true,
  });
  buzzerLock.volume(0.3);

  // const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  const [playBut] = useSound(hoverBut);
  // const [buzzerLock] = useSound(buzzer);
  const [nextS] = useSound(nextSound);
  const [playClock, { stop }] = useSound(clock);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);

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
    if (questionNumber < 11) {
      nextS();
    }

    stop();
    setQuestionNumber((prev) => prev + 1);
    setSelectedAnswer(null);
    setNext(false);
  };

  const handleClick = (a) => {
    stop();

    buzzerLock.play();
    setClick(true);
    setSelectedAnswer(a);
    setClassName("answer active");

    delay(1000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    if (a.correct) {
      setTimeout(() => {
        correctAnswer();
      }, 2800);
      setTimeout(() => {
        setNext(true);
      }, 3000);
    } else {
      setTimeout(() => {
        setStop(true);
        wrongAnswer();
      }, 3500);
    }
  };
  ///SOUND BACKGROUND
  const handleSound = () => {
    console.log(bgsound);

    if (bgsound === false) {
      var a1 = background.play();
      setbgsound(true);
    }
    if (bgsound === true) {
      background.pause(a1);
      setbgsound(false);
    }
  };

  return (
    <div className="celeb">
      {questionNumber === 10 ? (
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
            <button type="button" className="m" onClick={handleSound}>
              <AiFillSound />
            </button>

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
              <button
                type="button"
                className={selectedAnswer === a ? className : "answer"}
                onClick={() => handleClick(a)}
                onMouseEnter={() => {
                  playBut();
                }}
                disabled={selectedAnswer === null ? false : true}
              >
                {a.text}
              </button>
            ))}
          </div>
          <button
            className={next === false ? "next" : "next active"}
            onClick={handleNext}
            disabled={next ? false : true}
            id="nextButton"
            onMouseEnter={() => {
              playBut();
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Trivia;
