import "./Wave.css";
import { Stage, Line, Layer, Circle } from "react-konva";
import { useEffect, useRef}  from "react";
import { animated, useSpring } from "react-spring";

function Wave(props: any) {
  const { audios, currentAudio, duration, audioState } = props;
  const id = audios.id;
  const wasPaused = useRef(false);

  const buildPoint = () => {
    let pointArray = [];
    for (
      let i = 0;
      i < audios[currentAudio].analysis.data.samples.length;
      i++
    ) {
      if (audios[currentAudio].analysis.data.samples[i] !== null) {
        const newPoint = {
          x: (i * 900) / audios[currentAudio].analysis.data.max_x,
          y:
            (-audios[currentAudio].analysis.data.samples[i - 1] /
              audios[currentAudio].analysis.data.max_y) *
            250,
        };
        pointArray.push(newPoint);
      }
    }
    return pointArray;
  };

  const arrayPoints = () => {
    let newArray: number[] = [];
    buildPoint().map((punto) => {
      const tempArray = Object.values(punto);
      tempArray.forEach((coordinate) => {
        newArray.push(coordinate);
      });
    });
    return newArray;
  };

  //Declaration of the Animated Circle for React Spring
  const AnimatedCircle = animated(Circle);

  const [{ x, y }, api] = useSpring(() => ({
    from: { x: buildPoint()[0].x, y: buildPoint()[0].y },
  }));

  const playCallback = () => {
    if (!wasPaused.current) {
      api.start({
        to: async (next: any, cancel: any) => {
          for (let i = 0; i < buildPoint().length; i++) {
            await next({ x: buildPoint()[i].x, y: buildPoint()[i].y });
          }
          await next({ x: buildPoint()[0].x, y: buildPoint()[0].y });
          cancel();
        },
        config: {
          duration: (duration * 1000) / buildPoint().length,
        },
        reset: true,
      });
    } else {
      api.resume();
      wasPaused.current = false;
    }
  };

  const pauseCallback = () => {
    if (wasPaused.current === false){
    api.pause();
    wasPaused.current = true;}
    else {
      blankCallback();
    }
  };

  const blankCallback = () => {
    api.set({ x: buildPoint()[0].x, y: buildPoint()[0].y })
    api.stop();
    api.resume();
    wasPaused.current = false;
  };

  useEffect(() => {
    switch (audioState) {
      case "playing":
        playCallback();
        break;
      case "paused":
        pauseCallback();
        break;
      case "blank":
        blankCallback();
        break;
    }
  }, [audioState, currentAudio]);

   return (
    <div className="wave" id={id}>
      <Stage container={id} width={900} height={300}>
        <Layer offsetY={-280} offsetX={0}>
          {buildPoint().map((myPoint) => {
            return (
              <Circle x={myPoint.x} y={myPoint.y} radius={1.5} fill="white" />
            );
          })}
          <Line
            points={arrayPoints()}
            stroke="#676767"
            strokeWidth={1}
            tension={0.5}
          />
          <AnimatedCircle x={x} y={y} fill="white" radius={2.5} />
        </Layer>
      </Stage>
    </div>
  );
}

export default Wave;
