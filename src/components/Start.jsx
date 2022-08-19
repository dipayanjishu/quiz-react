import { useRef } from "react";
import { Howl } from "howler";
import But from "../assets/hover.mp3";
import logo from "../assets/squeeze.png";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  let Buts = new Howl({
    src: But,
    html5: true,
  });
  Buts.volume(0.5);

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <img src={logo} alt="" className="logoo" />
      <h1 className="titleSquezze">s"QUIZ"ee</h1>
      <input
        placeholder="Enter ur name"
        className="startInput"
        ref={inputRef}
      />
      <button
        className="startButton"
        onClick={handleClick}
        onMouseEnter={() => {
          Buts.play();
        }}
      >
        Start
      </button>
    </div>
  );
}
