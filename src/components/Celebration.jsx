import useSound from "use-sound";
import celeb_tone from "../assets/ghungru badha.mp3";
import ghungru from "../assets/ghungru.gif";
import { BiRupee } from "react-icons/bi";

const Celebration = ({ username }) => {
  const [celeb] = useSound(celeb_tone);
  celeb();
  return (
    <h1 className="result">
      <img src={ghungru} alt="" className="imagee" />
      <div className="message">
        {username} earned: <BiRupee />
        1,00,00,000
      </div>
    </h1>
  );
};

export default Celebration;
