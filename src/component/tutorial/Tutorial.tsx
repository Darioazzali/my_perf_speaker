import "./Tutorial.css";
import {
  FaShareSquare,
  FaPlay,
  FaForward,
  FaBackward,
  FaPause,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Wave from "./wave/Wave";

interface PropsInterface {
  title: string;
  audios: any;
  className: string;
}

function Tutorial(props: PropsInterface) {
  const [currentAudio, setCurrentAudio] = useState(0);
  const [audioState, setaudioState] = useState<String>("blank");
  const { audios, title } = props;

  const handleShare = () => {};

  const myPlay = (audio: HTMLAudioElement) => {
    return new Promise((res) => {
      audio.play();
      audio.onended = res;
    });
  };

  const myPause = (audio: HTMLAudioElement) => {
    const isPaused = audio.paused;
    console.log(isPaused);
    
    switch (isPaused) {
      case false:
        audio.pause();
        break;
      default:
        break;
    }
  };

  const maxAudio = audios.length;

  const playingAudio = useRef(new Audio(audios[currentAudio].url));

    const changeAudio = (sign: string) => {
    if (audioState === "blank" || audioState === "paused") {
      const operation = sign === "+" ? 1 : -1;
      if (
        (operation == -1 && currentAudio === 0) ||
        (operation === 1 && currentAudio === maxAudio - 1)
      ) {
        return null;
      } else {
        setCurrentAudio(currentAudio + operation);
        playingAudio.current = new Audio(audios[currentAudio].url);
      }
    } else {
      return null;
    }
  };
  

  const handlePlay = async () => {
    switch (audioState) {
      case "blank":
        setaudioState("playing");
        await myPlay(playingAudio.current);
        setaudioState("blank");

        break;
      case "paused":
        setaudioState("playing");
        await myPlay(playingAudio.current);
        setaudioState("blank");
        break;
      case "playing":
        setaudioState("paused");
        myPause(playingAudio.current);
        break;
    }
  };

  

  useEffect(() => {
    setaudioState("blank");
  }, [currentAudio]);

  useEffect(()=>{
  console.log(audioState);
},[audioState])

  return (
    <div className="my-card">
      <div className="card-container">
        <div className="up-bar">
          <div className="my-title">{title}</div>
          <FaShareSquare className="share-icon" onClick={() => handleShare} />
        </div>
        <Wave
          audios={audios}
          currentAudio={currentAudio}
          duration={playingAudio.current.duration}
          audioState={audioState}
        />
        <div className="bottom-card">
          <div className="bottom-left">
            {audios[currentAudio].speaker.code.toUpperCase()}
            {`(${currentAudio + 1}/${maxAudio})`}{" "}
          </div>
          {audioState === "blank" || audioState === "paused" ? (
            <FaPlay className="play" onClick={() => handlePlay()} />
          ) : (
            <FaPause className="play" onClick={() => handlePlay()} />
          )}
          <div className="bottom-right">
            <FaBackward
              className="arrow-icon"
              onClick={() => {
                changeAudio("-");
              }}
            />
            {audios[currentAudio].speaker.code}
            <FaForward
              className="arrow-icon"
              onClick={() => {
                changeAudio("+");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
