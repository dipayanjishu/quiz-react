import useSound from "use-sound";
import celeb_tone from "../assets/ghungru badha.mp3";
import ghungru from "../assets/ghungru.gif";
import { BiRupee } from "react-icons/bi";

const Celebration = ({
  username,
  setUsername,
  stop,
  setQuestionNumber,
  playBut,
  background,
}) => {
  const [celeb] = useSound(celeb_tone);
  celeb();
  stop();
  const handleclick = () => {
    setQuestionNumber(1);
    setUsername(null);
    background.pause();
  };
  return (
    <div className="celeb">
      <img src={ghungru} alt="" className="imagee" />
      <h1 className="result">
        <div className="message">
          {username} earned: <BiRupee />
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
