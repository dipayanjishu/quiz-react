import React, { useEffect, useMemo, useState } from "react";
import "./app.css";
import { BiRupee } from "react-icons/bi";
import Trivia from "./components/Trivia";
// import Face from "./assets/bagha face.png";
import Start from "./components/Start";
import { Data } from "./components/Data.js";

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
  const data = Data;

  // PYRAMID DATA
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "1" },
        { id: 2, amount: "10,000" },
        { id: 3, amount: "50,000" },
        { id: 4, amount: "1,00,000" },
        { id: 5, amount: "5,00,000" },
        { id: 6, amount: "10,00,000" },
        { id: 7, amount: "25,00,000" },
        { id: 8, amount: "50,00,000" },
        { id: 9, amount: "75,00,000" },
        { id: 10, amount: "1,00,00,000" },
      ].reverse(),
    []
  );

  // FOR UPDATE MONEY RESULT
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  //FOR PLAY AGAIN
  const handleClick = () => {
    setUsername(null);
    setStop(false);
    setQuestionNumber(1);
    setEarned(0);
  };

  return (
    <div className="app">
      {username ? (
        <>
          {/* MAIN  */}
          <div className="main">
            {stop ? (
              <div className="bye">
                <h1 className="resultbye">
                  <div className="messagebye">
                    {username.toUpperCase()} earned: <BiRupee />
                    {earned}
                  </div>
                </h1>
                <div
                  className="resetGame"
                  onClick={handleClick}
                  // onMouseEnter={() => {
                  //   playBut();
                  // }}
                >
                  PLAY AGAIN
                </div>
              </div>
            ) : (
              <>
                <div className="bottom">
                  <Trivia
                    username={username}
                    setUsername={setUsername}
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
