import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./trivia.css";

const Trivia = ({ data, setTimeOut, questionNumber, setquestionNumber }) => {
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {question?.answers.map((a) => (
          <div className="answer">{a.text}</div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
