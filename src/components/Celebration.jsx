import useSound from "use-sound";
import celeb_tone from "../assets/ghungru badha.wav";
// import ghungru from "../assets/ghungru.gif";
import { BiRupee } from "react-icons/bi";

const Celebration = ({
  username,
  setUsername,
  stop,
  setQuestionNumber,
  playBut,
}) => {
  const [celeb] = useSound(celeb_tone);
  celeb();
  stop();
  const handleclick = () => {
    setQuestionNumber(1);
    setUsername(null);
  };
  return (
    <div className="celeb">
      <h1 className="result">
        <div className="message">
          {username.toUpperCase()} earned: <BiRupee />
          1,00,00,000
        </div>
      </h1>
      <div
        className="resetGame"
        onClick={handleclick}
        onMouseEnter={() => {
          playBut();
        }}
      >
        PLAY AGAIN
      </div>
    </div>
  );
};

export default Celebration;
