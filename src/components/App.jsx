import React from "react";
import "./app.css";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import Trivia from "./trivia/Trivia";
import { useEffect } from "react";
import { useMemo } from "react";
const App = () => {
  const [questionNumber, setquestionNumber] = useState(1);

  const [stop, setstop] = useState(false);

  const [earned, setearned] = useState("0");

  const data = [
    {
      id: 1,
      question: "Mainak",
      answers: [
        {
          text: "khanki",
          correct: true,
        },
        {
          text: "babu",
          correct: false,
        },
        {
          text: "boka",
          correct: false,
        },
        {
          text: "laura",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "bagha",
      answers: [
        {
          text: "khanki",
          correct: false,
        },
        {
          text: "babu",
          correct: true,
        },
        {
          text: "boka",
          correct: false,
        },
        {
          text: "laura",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "100" },
        { id: 2, amount: "200" },
        { id: 3, amount: "300" },
        { id: 4, amount: "500" },
        { id: 5, amount: "1000" },
        { id: 6, amount: "2000" },
        { id: 7, amount: "4000" },
        { id: 8, amount: "8000" },
        { id: 9, amount: "16000" },
        { id: 10, amount: "32000" },
        { id: 11, amount: "64000" },
        { id: 12, amount: "125000" },
        { id: 13, amount: "250000" },
        { id: 14, amount: "500000" },
        { id: 15, amount: "1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setearned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endtext">You Earned: {earned}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">30</div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setstop={setstop}
                questionNumber={questionNumber}
                setquestionNumber={setquestionNumber}
              />
            </div>
          </>
        )}
      </div>

      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyNumber">{m.id}</span>
              <FaDollarSign />
              <span className="moneyAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
