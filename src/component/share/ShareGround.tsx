import { Box } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ShareMovePlayer } from './ShareMovePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useScreenSize } from '../../provider/ScreenSizeProvider';
import SoccerField from '../SoccerField';
import { ShareMoveBall } from './ShareMoveBall';
import { Tactics } from '../../store/Tactics';
import { clearShareSimulationOn } from '../../store/ShareSimulationOnSlice';
import { PlayerPosition } from '../PlayerPosition';
import { animatePlayers } from '../animate/AnimateTactics';

interface GroundProps {
    players: PlayerPosition[];
    tactics: Tactics
}


export const ShareGround: React.FC<GroundProps> = ({ players, tactics }) => {
    const dispatch = useDispatch()
    const imgRef = useRef<HTMLDivElement>(null);

    const ballMoves = tactics.sequences[tactics.currentSequenceNumber].balls
    const playerMoves = tactics.sequences[tactics.currentSequenceNumber].players

    const isSimulationOnState = useSelector((state: RootState) => state.shareSimulation.isSimulationOn)
    const isSimulationStartState = useSelector((state: RootState) => state.shareSimulation.isSimulationStart)

    const { updateScreenSize } = useScreenSize();

    const [animatedPositions, setAnimatedPositions] = useState<{ [key: number]: { leftPercent: number, topPercent: number, frame: number } }>({});
    const [animatedBallPosition, setAnimatedBallPosition] = useState<{ leftPercent: number, topPercent: number, frame: number } | null>(null);

    useEffect(() => {
        if (isSimulationOnState) {
            startSimulation();
            dispatch(clearShareSimulationOn());
        }
    }, [isSimulationOnState]);

    const startSimulation = () => {
        animatePlayers(
            tactics.currentSequenceNumber,
            tactics.sequences,
            setAnimatedPositions,
            setAnimatedBallPosition,
        );
    };

    const notIncludePlayers = useMemo(() => {
        if (playerMoves === undefined) return;
        const ids = playerMoves.map((s) => s.id);
        return players.filter((p) => !ids.includes(p.id));
    }, [players, playerMoves]);

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

                        {playerMoves.map(moves => (
                            moves.positions.map((move, index) => {
                                if (index === 0) return null;
                                const { x: x1, y: y1 } = getLeftLocation(moves.positions[index - 1].leftPercent, moves.positions[index - 1].topPercent);
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

                        {ballMoves && ballMoves.map((ballMove, index) => {
                            if (index === 0) return null;
                            const { x: x1, y: y1 } = getLeftLocation(ballMoves[index - 1].leftPercent, ballMoves[index - 1].topPercent);
                            const { x: x2, y: y2 } = getLeftLocation(ballMove.leftPercent, ballMove.topPercent);
                            return <line
                                key={`${ballMove.leftPercent}-${ballMove.topPercent}-${index}`}
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

            {ballMoves && ballMoves.length > 0 && !isSimulationStartState && <ShareMoveBall
                left={ballMoves[0].leftPercent}
                top={ballMoves[0].topPercent}
                imgRef={imgRef}
            ></ShareMoveBall>
            }

            {ballMoves && ballMoves.length > 0 && isSimulationStartState && animatedBallPosition && <ShareMoveBall
                left={animatedBallPosition.leftPercent}
                top={animatedBallPosition.topPercent}
                imgRef={imgRef}
            ></ShareMoveBall>
            }

            {isSimulationStartState && notIncludePlayers && notIncludePlayers.map(player => {
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
                const position = animatedPositions[player.id]
                if (!position) return;

                return (
                    <ShareMovePlayer
                        key={player.id}
                        id={player.id}
                        backNumber={player.backNumber}
                        team={player.team}
                        name={player.name}
                        left={position?.leftPercent}
                        top={position?.topPercent}
                        imgRef={imgRef}
                    />
                );
            })}
        </Box>
    );
};