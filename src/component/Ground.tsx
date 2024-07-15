import { Box } from '@mui/material';
import { PlayerPosition } from './PlayerPosition';
import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { DraggablePlayer } from './DraggablePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { addMultiSelectedPlayer, selectPlayer } from '../store/PlayerSlice';
import { RootState } from '../store/Store';
import { clearBallSequences, setBallSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { useScreenSize } from '../provider/ScreenSizeProvider';
import SoccerField from './SoccerField';
import { movePlayer } from '../store/PlayersListSlice';
import { setBall } from '../store/BallSlice';
import { DraggableBall } from './DraggableBall';
import { clearPossibleBallMoveState } from '../store/PossibleBallMoveSlice';
import { clearPossiblePlayerMoveState } from '../store/PossiblePlayerMoveSlice';


interface GroundProps {
    players: PlayerPosition[];
}

export const Ground: React.FC<GroundProps> = ({ players }) => {
    const dispatch = useDispatch()
    const imgRef = useRef<HTMLDivElement>(null);
    const playersState = useSelector((state: RootState) => state.players.players);
    const isPossiblePlayerMoveState = useSelector((state: RootState) => state.possiblePlayerMove.isPossible)
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const sequences = useSelector((state: RootState) => state.sequences)
    const simulationOnState = useSelector((state: RootState) => state.simulationOn)
    const multiSelectedPlayers = useSelector((state: RootState) => state.player.multiSelectedPlayers);
    const ball = useSelector((state: RootState) => state.ball.ball);
    const isPossibleBallMove = useSelector((state: RootState) => state.possibleBallMove.isPossible);

    const { updateScreenSize } = useScreenSize();

    const [, drop] = useDrop({
        accept: [ItemTypes.PLAYER, ItemTypes.BALL],
        drop: (item: any, monitor) => {
            if (!imgRef.current) return;

            const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
            const rect = imgRef.current.getBoundingClientRect();

            const realLeft = (item.left / 100) * rect.width;
            const realTop = (item.top / 100) * rect.height;

            const left = Math.round(((realLeft + delta.x) / rect.width) * 100);
            const top = Math.round(((realTop + delta.y) / rect.height) * 100);

            if (left < 0 || left > 100 || top < 0 || top > 100) return;

            if (item.type === ItemTypes.PLAYER) {
                if (multiSelectedPlayers) {
                    for (let i = 0; i < multiSelectedPlayers.length; i++) {
                        const m = multiSelectedPlayers[i];
                        const realLeft = (m.left / 100) * rect.width;
                        const realTop = (m.top / 100) * rect.height;

                        const left = Math.round(((realLeft + delta.x) / rect.width) * 100);
                        const top = Math.round(((realTop + delta.y) / rect.height) * 100);

                        if (left < 0 || left > 100 || top < 0 || top > 100) {
                            return;  // 하나라도 범위를 벗어나면 전체 드롭 무효화
                        }
                    }
                }

                if (multiSelectedPlayers) {
                    multiSelectedPlayers.forEach((m) => {
                        const realLeft = (m.left / 100) * rect.width;
                        const realTop = (m.top / 100) * rect.height;

                        const left = Math.round(((realLeft + delta.x) / rect.width) * 100);
                        const top = Math.round(((realTop + delta.y) / rect.height) * 100);

                        dispatch(movePlayer({ id: m.id, left: left, top: top }));
                        dispatch(setPlayerMovingSequences({ id: m.id, left, top, team: m.team, isFirst: true }));
                    });
                }

                dispatch(movePlayer({ id: item.id, left: left, top: top }));
                dispatch(selectPlayer({ id: item.id, backNumber: item.backNumber, team: item.team, name: item.name, left, top, position: item.position }));
                dispatch(setPlayerMovingSequences({ id: item.id, left, top, team: item.team, isFirst: true }));
            } else if (item.type === ItemTypes.BALL) {
                dispatch(clearBallSequences())
                dispatch(setBall({ left: left, top: top }));
            }
        },
    });

    const handlePlayerClick = (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => {
        if (multiSelectedPlayers) {
            dispatch(addMultiSelectedPlayer(player))
        } else {
            dispatch(selectPlayer(player));
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();

        const clickedLeft = ((event.clientX - rect.left) / rect.width + window.scrollX) * 100;
        const clickedTop = ((event.clientY - rect.top) / rect.height + window.scrollY) * 100;

        if (selectedPlayer && isPossiblePlayerMoveState) {
            dispatch(clearPossibleBallMoveState())
            const { id, left, top, team } = selectedPlayer;
            dispatch(setPlayerMovingSequences({ id, left: clickedLeft, top: clickedTop, team: team, isFirst: false }));
            return;
        }

        if (isPossibleBallMove) {
            dispatch(clearPossiblePlayerMoveState())
            dispatch(setBallSequences({ left: clickedLeft, top: clickedTop }));
            console.log("sequences = ", sequences)
            return;
        }
    }

    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
        }
    }, [imgRef]);

    useEffect(() => {
    }, [sequences]);

    useEffect(() => {
    }, [isPossiblePlayerMoveState]);


    useEffect(() => {
    }, [isPossibleBallMove]);


    useEffect(() => {
    }, [selectedPlayer]);

    useEffect(() => {
    }, [simulationOnState])

    useEffect(() => {
        updateScreenSize();
    }, [updateScreenSize]);

    useEffect(() => {
    }, [playersState])

    useEffect(() => {
    }, [multiSelectedPlayers])

    useEffect(() => {
    }, [ball])


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
            <div style={{ width: '80%', height: '80%', justifyContent: 'center', alignItems: 'center' }}
                ref={drop}
                onClick={handleClick}
            >
                {/* <img ref={imgRef} src={boardImage} alt="board" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
                <SoccerField ref={imgRef} />
                {
                    !simulationOnState.isSimulationOn && <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 30 }}>
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

                        {sequences.sequences.map(sequence => (
                            sequence.moves.map((move) => (
                                move.sequence.map((location, index) => {
                                    if (index === 0) return null;
                                    const { x: x1, y: y1 } = getLeftLocation(move.sequence[index - 1].left, move.sequence[index - 1].top);
                                    const { x: x2, y: y2 } = getLeftLocation(location.left, location.top);
                                    return <line
                                        key={`${move.id}-${index}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={location.team === 'home' ? '#3B6FB2' : '#B23B7F'}
                                        strokeWidth="3"
                                        strokeOpacity={0.7}
                                        markerEnd={location.team === 'home' ? 'url(#arrow-home)' : 'url(#arrow-away)'}
                                    />
                                })
                            ))
                        ))}

                        {sequences.sequences.map(sequence => (
                            sequence.balls.map((ball, index) => {
                                if (index === 0) return null;
                                    const { x: x1, y: y1 } = getLeftLocation(sequence.balls[index - 1].left, sequence.balls[index - 1].top);
                                    const { x: x2, y: y2 } = getLeftLocation(ball.left, ball.top);
                                    return <line
                                        key={`${ball.left}-${ball.top}-${index}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={'black'}
                                        strokeWidth="3"
                                        strokeOpacity={0.7}
                                        markerEnd={'url(#arrow-ball)'}
                                    />
                            })
                        ))}

                    </svg>
                }
            </div>

            {players.map((player) => {
                const multiSelectedPlayer = multiSelectedPlayers?.find((m) => m.id === player.id)
                if (multiSelectedPlayer) return;

                return <DraggablePlayer
                    key={player.id}
                    id={player.id}
                    backNumber={player.backNumber}
                    team={player.team}
                    name={player.name}
                    left={player.left}
                    top={player.top}
                    imgRef={imgRef}
                    position={player.position}
                    onClick={handlePlayerClick} />
            })}

            {ball && <DraggableBall
                left={ball.left}
                top={ball.top}
                imgRef={imgRef}
            ></DraggableBall>

            }
        </Box>
    );
};