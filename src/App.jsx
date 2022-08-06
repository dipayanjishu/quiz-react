import React, { useEffect, useMemo, useState } from "react";
import "./app.css";
import { BiRupee } from "react-icons/bi";
import Trivia from "./components/Trivia";
import Face from "./assets/bagha face.png";
import Start from "./components/Start";

// import Timer from "./components/Timer";

const App = () => {
  //FOR USER
  const [username, setUsername] = useState(null);
  // FOR DECIDE ACTIVE CLASS OF PYRAMID DATA
  const [questionNumber, setQuestionNumber] = useState(1);
  // FOR TIMER
  const [stop, setStop] = useState(false);
  // FOR MONEY RESULT
  const [earned, setEarned] = useState("0");

  // const [click, setClick] = useState(false);

  // FOR DATA
  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
    {
      id: 5,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  // PYRAMID DATA
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "100" },
        { id: 2, amount: "200" },
        { id: 3, amount: "300" },
        { id: 4, amount: "400" },
        { id: 5, amount: "500" },
      ].reverse(),
    []
  );

  // FOR UPDATE MONEY RESULT
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          {/* MAIN  */}
          <div className="main">
            {stop ? (
              <>
                <h1 className="result">
                  <img src={Face} alt="" className="imagee" />
                  <div className="message">
                    {username} earned: <BiRupee />
                    {earned}
                  </div>
                </h1>
              </>
            ) : (
              <>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    // setClick={setClick}
                  />
                </div>
              </>
            )}
          </div>

          {/* PYRAMID MONEY */}
          <div className="pyramid">
            <ul className="moneyList">
              {/* ARRAY MAPING */}
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <BiRupee />
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;
