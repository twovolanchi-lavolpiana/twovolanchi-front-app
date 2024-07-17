import { Box } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ShareMovePlayer } from './ShareMovePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useScreenSize } from '../../provider/ScreenSizeProvider';
import SoccerField from '../SoccerField';
import { ShareMoveBall } from './ShareMoveBall';
import { Player, Tactics } from './ShareComponent';
import { clearShareSimulationOn } from '../../store/ShareSimulationOnSlice';

interface GroundProps {
    players: Player[];
    tactics: Tactics
}


export const ShareGround: React.FC<GroundProps> = ({ players, tactics }) => {
    const dispatch = useDispatch()
    const imgRef = useRef<HTMLDivElement>(null);

    const ball = tactics.sequences[tactics.currentSequenceNumber].ball
    const sequences = tactics.sequences[tactics.currentSequenceNumber].players

    const isSimulationOnState = useSelector((state: RootState) => state.shareSimulation.isSimulationOn)
    const isSimulationStartState = useSelector((state: RootState) => state.shareSimulation.isSimulationStart)

    const [initialLoad, setInitialLoad] = useState(true);
    const { updateScreenSize } = useScreenSize();

    const [animatedPositions, setAnimatedPositions] = useState<{ [key: number]: { left: number, top: number, frame: number } }>({});
    const [animatedBallPosition, setAnimatedBallPosition] = useState<{ left: number, top: number, frame: number } | null>(null);

    useEffect(() => {
        if (isSimulationOnState) {
            startSimulation();
            dispatch(clearShareSimulationOn());
        }
    }, [isSimulationOnState]);

    const startSimulation = () => {
        animatePlayers();
    };

    const notIncludePlayers = useMemo(() => {
        const ids = sequences.map((s) => s.id);
        return players.filter((p) => !ids.includes(p.id));
    }, [players, sequences]);


    const animatePlayers = (callback?: () => void) => {
        const startTime = performance.now();
        const animationDuration = 5000; // Total animation duration in ms

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            setAnimatedPositions(prevPositions => {
                const newPositions = { ...prevPositions };

                sequences.forEach(move => {
                    const { id, positions } = move;
                    const totalFrames = positions.length;
                    const frameDuration = animationDuration / totalFrames;
                    const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

                    if (currentFrame === 0 && positions.length === 1) {
                        const initialPoint = players[id];
                        console.log("test!!!")
                        newPositions[id] = { left: initialPoint.leftPercent, top: initialPoint.topPercent, frame: currentFrame };
                    }

                    if (currentFrame < positions.length) {
                        const nextIndex = Math.min(currentFrame + 1, positions.length - 1);
                        const pointProgress = (elapsed % frameDuration) / frameDuration;

                        const currentPoint = positions[currentFrame] || { left: 0, top: 0 };
                        const nextPoint = positions[nextIndex] || { left: 0, top: 0 };

                        const left = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
                        const top = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

                        newPositions[id] = { left, top, frame: currentFrame };
                    }
                });
                return newPositions;
            });

            if (ball && ball.length > 0) {
                setAnimatedBallPosition(prevBallPosition => {
                    const totalFrames = ball.length;
                    const frameDuration = animationDuration / totalFrames;
                    const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

                    const nextIndex = Math.min(currentFrame + 1, ball.length - 1);
                    const pointProgress = (elapsed % frameDuration) / frameDuration;

                    const currentPoint = ball[currentFrame] || { left: 0, top: 0 };
                    const nextPoint = ball[nextIndex] || { left: 0, top: 0 };

                    const left = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
                    const top = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

                    return { left, top, frame: currentFrame };
                });
            }

            if (elapsed < animationDuration) {
                requestAnimationFrame(animate);
            } else if (callback) {
                callback();
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (initialLoad && imgRef.current) {
            setInitialLoad(false);
            const rect = imgRef.current.getBoundingClientRect();
            setAnimatedPositions(players.reduce((acc, player) => {
                acc[player.id] = {
                    left: (player.leftPercent / 100) * rect.width + rect.x + window.screenX,
                    top: (player.topPercent / 100) * rect.height + rect.y + window.screenY,
                    frame: 0,
                };
                return acc;
            }, {} as { [key: number]: { left: number, top: number, frame: number } }));

            if (tactics.sequences[tactics.currentSequenceNumber].ball.length > 0) {
                const ball = tactics.sequences[tactics.currentSequenceNumber].ball[0]
                setAnimatedBallPosition({
                    left: (ball.leftPercent / 100) * rect.width + rect.x + window.screenX,
                    top: (ball.topPercent / 100) * rect.height + rect.y + window.screenY,
                    frame: 0,
                });
            }
        }
    }, [initialLoad, imgRef.current]);


    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
        }
    }, [imgRef]);

    useEffect(() => {
    }, [isSimulationOnState])

    useEffect(() => {
        updateScreenSize();
    }, [updateScreenSize]);

    useEffect(() => {
    }, [isSimulationStartState])


    const getLeftLocation = (left: number, top: number) => {
        if (!imgRef.current) return { x: 0, y: 0 }
        const rect = imgRef.current.getBoundingClientRect();
        const realLeft = (left / 100) * rect.width;
        const realTop = (top / 100) * rect.height;

        const defaultLeft = rect.x + window.scrollX;
        const defaultTop = rect.y + window.scrollY;

        return {
            x: defaultLeft + realLeft,
            y: defaultTop + realTop,
        }
    }

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}
        >
            <div style={{ width: '70%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                <SoccerField ref={imgRef} />

                {
                    !isSimulationOnState && !isSimulationStartState && <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 30 }}>
                        <defs>
                            <marker
                                id="arrow-home"
                                viewBox="0 0 10 10"
                                refX="5"
                                refY="5"
                                markerWidth="3"
                                markerHeight="3"
                                opacity={0.7}
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill='#3B6FB2' />
                            </marker>
                        </defs>
                        <defs>
                            <marker
                                id="arrow-away"
                                viewBox="0 0 10 10"
                                refX="5"
                                refY="5"
                                markerWidth="3"
                                markerHeight="3"
                                opacity={0.7}
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill='#B23B7F' />
                            </marker>
                        </defs>
                        <defs>
                            <marker
                                id="arrow-ball"
                                viewBox="0 0 10 10"
                                refX="5"
                                refY="5"
                                markerWidth="3"
                                markerHeight="3"
                                opacity={0.7}
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill='black' />
                            </marker>
                        </defs>

                        {sequences.map(sequence => (
                            sequence.positions.map((move, index) => {
                                if (index === 0) return null;
                                const { x: x1, y: y1 } = getLeftLocation(sequence.positions[index - 1].leftPercent, sequence.positions[index - 1].topPercent);
                                const { x: x2, y: y2 } = getLeftLocation(move.leftPercent, move.topPercent);
                                return <line
                                    key={`${move.leftPercent}-${index}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={move.team === 'HOME' ? '#3B6FB2' : '#B23B7F'}
                                    strokeWidth="3"
                                    strokeOpacity={0.7}
                                    markerEnd={move.team === 'HOME' ? 'url(#arrow-home)' : 'url(#arrow-away)'}
                                />
                            })
                        ))}

                        {ball && ball.map((sequence, index) => {
                            if (index === 0) return null;
                            const { x: x1, y: y1 } = getLeftLocation(ball[index - 1].leftPercent, ball[index - 1].topPercent);
                            const { x: x2, y: y2 } = getLeftLocation(sequence.leftPercent, sequence.topPercent);
                            return <line
                                key={`${sequence.leftPercent}-${sequence.topPercent}-${index}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={'black'}
                                strokeWidth="3"
                                strokeOpacity={0.7}
                                markerEnd={'url(#arrow-ball)'}
                            />
                        })}
                    </svg>
                }
            </div>

            {!isSimulationStartState && players.map((player) => {
                return <ShareMovePlayer
                    key={player.id}
                    id={player.id}
                    backNumber={player.backNumber}
                    team={player.team}
                    name={player.name}
                    left={player.leftPercent}
                    top={player.topPercent}
                    imgRef={imgRef} />
            })}

            {ball && ball.length > 0 && !isSimulationStartState && <ShareMoveBall
                left={ball[0].leftPercent}
                top={ball[0].topPercent}
                imgRef={imgRef}
            ></ShareMoveBall>
            }

            {ball && ball.length > 0 && isSimulationStartState && animatedBallPosition && <ShareMoveBall
                left={animatedBallPosition.left}
                top={animatedBallPosition.top}
                imgRef={imgRef}
            ></ShareMoveBall>
            }

            {isSimulationStartState && notIncludePlayers.map(player => {
                return (
                    <ShareMovePlayer
                        key={player.id}
                        id={player.id}
                        backNumber={player.backNumber}
                        team={player.team}
                        name={player.name}
                        left={player.leftPercent}
                        top={player.topPercent}
                        imgRef={imgRef}
                    />
                );
            })}

            {isSimulationStartState && players.map(player => {
                const percent = getLeftLocation(player.leftPercent, player.topPercent)

                return (
                    <ShareMovePlayer
                        key={player.id}
                        id={player.id}
                        backNumber={player.backNumber}
                        team={player.team}
                        name={player.name}
                        left={animatedPositions[player.id]?.left ?? percent.x}
                        top={animatedPositions[player.id]?.top ?? percent.y}
                        imgRef={imgRef}
                    />
                );
            })}
        </Box>
    );
};