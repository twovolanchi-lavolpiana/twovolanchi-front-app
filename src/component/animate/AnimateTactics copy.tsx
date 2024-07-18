import { useEffect, useState } from "react";
import { Sequence } from "../../store/Tactics";
import NotFoundPage from "../error/NotFound";
import { PlayerPosition } from "../PlayerPosition";

interface AnimateTacticsProps {
  imgRef: React.RefObject<HTMLDivElement>;
  players: PlayerPosition[],
  currentSequenceNumber: number;
  sequences: Sequence[];
  onAnimationComplete?: () => void;
}

// export const AnimateTactics: React.FC<AnimateTacticsProps> = ({ imgRef, players, currentSequenceNumber, sequences, onAnimationComplete }) => {
//   const [animatedPositions, setAnimatedPositions] = useState<{ [key: number]: { left: number, top: number, frame: number } }>({});
//   const [animatedBallPosition, setAnimatedBallPosition] = useState<{ left: number, top: number, frame: number } | null>(null);

//   if (sequences.length < currentSequenceNumber) return <></>

//   const balls = sequences[currentSequenceNumber].balls

//   useEffect(() => {
//     const startTime = performance.now();
//     const currentSequence = sequences[currentSequenceNumber];

//     const animate = (time: number) => {
//       const elapsed = time - startTime;
//       const duration = 5000;
//       const progress = Math.min(elapsed / duration, 1);

//       setAnimatedPositions(prevPositions => {
//         const newPositions = { ...prevPositions };

//         currentSequence.players.forEach(move => {
//           const { id, positions } = move;
//           const totalFrames = positions.length;
//           const frameDuration = duration / totalFrames;
//           const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

//           if (currentFrame < positions.length) {
//             const nextIndex = Math.min(currentFrame + 1, positions.length - 1);
//             const pointProgress = (elapsed % frameDuration) / frameDuration;

//             const currentPoint = positions[currentFrame] || { leftPercent: 0, topPercent: 0 };
//             const nextPoint = positions[nextIndex] || { leftPercent: 0, topPercent: 0 };

//             const left = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
//             const top = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

//             newPositions[id] = { left, top, frame: currentFrame };
//           }
//         });
//         return newPositions;
//       });

//       if (balls && currentSequence.balls.length > 0) {
//         setAnimatedBallPosition(prevBallPosition => {
//           const totalFrames = currentSequence.balls.length;
//           const frameDuration = duration / totalFrames;
//           const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

//           const nextIndex = Math.min(currentFrame + 1, currentSequence.balls.length - 1);
//           const pointProgress = (elapsed % frameDuration) / frameDuration;

//           const currentPoint = currentSequence.balls[currentFrame] || { leftPercent: 0, topPercent: 0 };
//           const nextPoint = currentSequence.balls[nextIndex] || { leftPercent: 0, topPercent: 0 };

//           const left = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
//           const top = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

//           return { left, top, frame: currentFrame };
//         });
//       }

//       if (elapsed < duration) {
//         requestAnimationFrame(animate);
//       } else if (onAnimationComplete) {
//         onAnimationComplete();
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [currentSequenceNumber, sequences, onAnimationComplete]);

  



// }




export default {}