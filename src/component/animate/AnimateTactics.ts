import { Sequence } from "../../store/Tactics";

export const animatePlayers = (
  currentSequenceNumber: number,
  sequences: Sequence[],
  onUpdatePlayerPositions: (positions: { [key: number]: { leftPercent: number, topPercent: number, frame: number } }) => void,
  onUpdateBallPosition: (position: { leftPercent: number, topPercent: number, frame: number } | null) => void,
  onAnimationComplete?: () => void
) => {

  const balls = sequences[currentSequenceNumber].balls
  const startTime = performance.now();
  const currentSequence = sequences[currentSequenceNumber];
  const newPositions: { [key: number]: { leftPercent: number, topPercent: number, frame: number } } = {};

  const animate = (time: number) => {
    const elapsed = time - startTime;
    const duration = 5000;
    const progress = Math.min(elapsed / duration, 1);

    currentSequence.players.forEach(move => {
      const { id, positions } = move;
      const totalFrames = positions.length;
      const frameDuration = duration / totalFrames;
      const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

      if (currentFrame < positions.length) {
        const nextIndex = Math.min(currentFrame + 1, positions.length - 1);
        const pointProgress = (elapsed % frameDuration) / frameDuration;

        const currentPoint = positions[currentFrame] || { leftPercent: 0, topPercent: 0 };
        const nextPoint = positions[nextIndex] || { leftPercent: 0, topPercent: 0 };

        const leftPercent = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
        const topPercent = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

        newPositions[id] = { leftPercent, topPercent, frame: currentFrame };
      }
    });

    onUpdatePlayerPositions(newPositions);

    if (balls && currentSequence.balls.length > 0) {
      const totalFrames = currentSequence.balls.length;
      const frameDuration = duration / totalFrames;
      const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

      const nextIndex = Math.min(currentFrame + 1, currentSequence.balls.length - 1);
      const pointProgress = (elapsed % frameDuration) / frameDuration;

      const currentPoint = currentSequence.balls[currentFrame] || { leftPercent: 0, topPercent: 0 };
      const nextPoint = currentSequence.balls[nextIndex] || { leftPercent: 0, topPercent: 0 };

      const leftPercent = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
      const topPercent = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

      onUpdateBallPosition({ leftPercent, topPercent, frame: currentFrame });
    } else {
      onUpdateBallPosition(null);
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  requestAnimationFrame(animate);
}