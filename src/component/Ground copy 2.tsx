// import { Box } from '@mui/material';
// import { PlayerPosition } from './PlayerPosition';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from './ItemTypes';
// import { DraggablePlayer } from './DraggablePlayer';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMultiSelectedPlayer, selectPlayer } from '../store/PlayerSlice';
// import { RootState } from '../store/Store';
// import { clearBallSequences, setBallSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
// import { useScreenSize } from '../provider/ScreenSizeProvider';
// import SoccerField from './SoccerField';
// import { movePlayer } from '../store/PlayersListSlice';
// import { setBall } from '../store/BallSlice';
// import { DraggableBall } from './DraggableBall';
// import { clearPossibleBallMoveState } from '../store/PossibleBallMoveSlice';
// import { clearPossiblePlayerMoveState } from '../store/PossiblePlayerMoveSlice';
// import { clearSimulationOn } from '../store/SimulationOnSlice';
// import { animatePlayers } from './animate/AnimateTactics';

// interface GroundProps {
//     players: PlayerPosition[];
// }


// export const Ground: React.FC<GroundProps> = ({ players }) => {
//     const dispatch = useDispatch()
//     const imgRef = useRef<HTMLDivElement>(null);
//     const playersState = useSelector((state: RootState) => state.players.players);
//     const isPossiblePlayerMoveState = useSelector((state: RootState) => state.possiblePlayerMove.isPossible)
//     const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
//     const sequences = useSelector((state: RootState) => state.sequences)
//     const isSimulationOnState = useSelector((state: RootState) => state.simulationOn.isSimulationOn)
//     const isSimulationStartState = useSelector((state: RootState) => state.simulationOn.isSimulationStart)
//     const multiSelectedPlayers = useSelector((state: RootState) => state.player.multiSelectedPlayers);
//     const ball = useSelector((state: RootState) => state.ball.ball);
//     const isPossibleBallMove = useSelector((state: RootState) => state.possibleBallMove.isPossible);
//     const { updateScreenSize } = useScreenSize();

//     const [animatedPositions, setAnimatedPositions] = useState<{ [key: number]: { leftPercent: number, topPercent: number, frame: number } }>({});
//     const [animatedBallPosition, setAnimatedBallPosition] = useState<{ leftPercent: number, topPercent: number, frame: number } | null>(null);

//     const [initialLoad, setInitialLoad] = useState(true);

//     useEffect(() => {
//         updateScreenSize();
//     }, [updateScreenSize]);

//     useEffect(() => {
//         if (isSimulationOnState) {
//             startSimulation();
//             dispatch(clearSimulationOn());
//         }
//     }, [isSimulationOnState]);

//     const startSimulation = () => {
//         animatePlayers();
//     };

//     const animatePlayers = (callback?: () => void) => {
//         const startTime = performance.now();
//         const currentSequence = sequences.sequences[sequences.currentSequenceNumber];
//         const animationDuration = 5000; // Total animation duration in ms

//         const animate = (time: number) => {
//             const elapsed = time - startTime;
//             const progress = Math.min(elapsed / animationDuration, 1);

//             setAnimatedPositions(prevPositions => {
//                 const newPositions = { ...prevPositions };

//                 currentSequence.players.forEach(move => {
//                     const { id, positions } = move;
//                     const totalFrames = positions.length;
//                     const frameDuration = animationDuration / totalFrames;
//                     const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

//                     if (currentFrame < positions.length) {
//                         const nextIndex = Math.min(currentFrame + 1, positions.length - 1);
//                         const pointProgress = (elapsed % frameDuration) / frameDuration;

//                         const currentPoint = positions[currentFrame] || { left: 0, top: 0 };
//                         const nextPoint = positions[nextIndex] || { left: 0, top: 0 };

//                         const leftPercent = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
//                         const topPercent = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

//                         newPositions[id] = { leftPercent, topPercent, frame: currentFrame };
//                     }
//                 });
//                 return newPositions;
//             });

//             if (ball && currentSequence.balls.length > 0) {
//                 setAnimatedBallPosition(prevBallPosition => {
//                     const totalFrames = currentSequence.balls.length;
//                     const frameDuration = animationDuration / totalFrames;
//                     const currentFrame = Math.min(Math.floor(elapsed / frameDuration), totalFrames - 1);

//                     const nextIndex = Math.min(currentFrame + 1, currentSequence.balls.length - 1);
//                     const pointProgress = (elapsed % frameDuration) / frameDuration;

//                     const currentPoint = currentSequence.balls[currentFrame] || { left: 0, top: 0 };
//                     const nextPoint = currentSequence.balls[nextIndex] || { left: 0, top: 0 };

//                     const leftPercent = currentPoint.leftPercent + (nextPoint.leftPercent - currentPoint.leftPercent) * pointProgress;
//                     const topPercent = currentPoint.topPercent + (nextPoint.topPercent - currentPoint.topPercent) * pointProgress;

//                     return { leftPercent, topPercent, frame: currentFrame };
//                 });
//             }

//             if (elapsed < animationDuration) {
//                 requestAnimationFrame(animate);
//             } else if (callback) {
//                 callback();
//             }
//         };

//         requestAnimationFrame(animate);
//     };


//     useEffect(() => {
//         if (initialLoad && imgRef.current) {
//             setInitialLoad(false);
//             const rect = imgRef.current.getBoundingClientRect();
//         }
//     }, [initialLoad, imgRef.current]);


//     const [, drop] = useDrop({
//         accept: [ItemTypes.PLAYER, ItemTypes.BALL],
//         drop: (item: any, monitor) => {
//             if (!imgRef.current) return;

//             const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
//             const rect = imgRef.current.getBoundingClientRect();

//             const realLeft = (item.leftPercent / 100) * rect.width;
//             const realTop = (item.topPercent / 100) * rect.height;

//             const leftPercent = Math.round(((realLeft + delta.x) / rect.width) * 100);
//             const topPercent = Math.round(((realTop + delta.y) / rect.height) * 100);

//             if (leftPercent < 0 || leftPercent > 100 || topPercent < 0 || topPercent > 100) return;

//             if (item.type === ItemTypes.PLAYER) {
//                 if (multiSelectedPlayers) {
//                     for (let i = 0; i < multiSelectedPlayers.length; i++) {
//                         const m = multiSelectedPlayers[i];
//                         const realLeft = (m.leftPercent / 100) * rect.width;
//                         const realTop = (m.topPercent / 100) * rect.height;

//                         const left = Math.round(((realLeft + delta.x) / rect.width) * 100);
//                         const top = Math.round(((realTop + delta.y) / rect.height) * 100);

//                         if (left < 0 || left > 100 || top < 0 || top > 100) {
//                             return;  // 하나라도 범위를 벗어나면 전체 드롭 무효화
//                         }
//                     }
//                 }

//                 if (multiSelectedPlayers) {
//                     multiSelectedPlayers.forEach((m) => {
//                         const realLeft = (m.leftPercent / 100) * rect.width;
//                         const realTop = (m.topPercent / 100) * rect.height;

//                         const multiLeftPercent = Math.round(((realLeft + delta.x) / rect.width) * 100);
//                         const multiTopPercent = Math.round(((realTop + delta.y) / rect.height) * 100);

//                         dispatch(movePlayer({ id: m.id, leftPercent: multiLeftPercent, topPercent: multiTopPercent }));
//                         dispatch(setPlayerMovingSequences({ id: m.id, leftPercent: multiLeftPercent, topPercent: multiTopPercent, team: m.team, isFirst: true }));
//                     });
//                 }

//                 dispatch(movePlayer({ id: item.id, leftPercent: leftPercent, topPercent: topPercent }));
//                 dispatch(selectPlayer({ id: item.id, backNumber: item.backNumber, team: item.team, name: item.name, leftPercent, topPercent, position: item.position }));
//                 dispatch(setPlayerMovingSequences({ id: item.id, leftPercent, topPercent, team: item.team, isFirst: true }));
//             } else if (item.type === ItemTypes.BALL) {
//                 dispatch(clearBallSequences())
//                 dispatch(setBall({ leftPercent: leftPercent, topPercent: topPercent }));
//             }
//         },
//     });

//     const notIncludePlayers = useMemo(() => {
//         const current = sequences.sequences[sequences.currentSequenceNumber]
//         if (!current) return;
//         const ids = current.players.map((s) => s.id);
//         return players.filter((p) => !ids.includes(p.id));
//     }, [players, sequences]);


//     const handlePlayerClick = (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => {
//         if (multiSelectedPlayers) {
//             dispatch(addMultiSelectedPlayer(player))
//         } else {
//             dispatch(selectPlayer(player));
//         }
//     };

//     const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//         if (!imgRef.current) return;

//         const rect = imgRef.current.getBoundingClientRect();
//         const clickedLeft = ((event.clientX - rect.x) / rect.width) * 100;
//         const clickedTop = ((event.clientY - rect.y) / rect.height) * 100;

//         if (clickedLeft < 0 || clickedLeft > 100 || clickedTop < 0 || clickedTop > 100) {
//             updateScreenSize();
//             return;
//         }

//         if (selectedPlayer && isPossiblePlayerMoveState) {
//             dispatch(clearPossibleBallMoveState())
//             const { id, leftPercent, topPercent, team } = selectedPlayer;
//             dispatch(setPlayerMovingSequences({ id, leftPercent: clickedLeft, topPercent: clickedTop, team: team, isFirst: false }));
//             return;
//         }

//         if (isPossibleBallMove) {
//             dispatch(setBallSequences({ leftPercent: clickedLeft, topPercent: clickedTop, isFirst: false }));
//             return;
//         }
//     }

//     useEffect(() => {
//         if (imgRef.current) {
//             const rect = imgRef.current.getBoundingClientRect();
//         }
//     }, [imgRef]);

//     useEffect(() => {
//     }, [sequences]);

//     useEffect(() => {
//     }, [isPossiblePlayerMoveState]);


//     useEffect(() => {
//     }, [isPossibleBallMove]);


//     useEffect(() => {
//     }, [selectedPlayer]);

//     useEffect(() => {
//     }, [isSimulationOnState])

//     useEffect(() => {
//     }, [playersState])

//     useEffect(() => {
//     }, [multiSelectedPlayers])

//     useEffect(() => {
//     }, [ball])

//     useEffect(() => {
//     }, [isSimulationStartState])


//     const getLeftLocation = (left: number, top: number) => {
//         if (!imgRef.current) return { x: 0, y: 0 }
//         const rect = imgRef.current.getBoundingClientRect();
//         const realLeft = (left / 100) * rect.width;
//         const realTop = (top / 100) * rect.height;

//         const defaultLeft = rect.x + window.scrollX;
//         const defaultTop = rect.y + window.scrollY;

//         return {
//             x: defaultLeft + realLeft,
//             y: defaultTop + realTop,
//         }
//     }

//     return (
//         <Box
//             sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}
//         >
//             <div style={{
//                 width: '100%',
//                 minWidth: '100%',

//                 height: '60%',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//             }}
//                 ref={drop}
//                 onClick={handleClick}
//             >
//                 <SoccerField ref={imgRef} />
//                     {
//                         !isSimulationOnState && !isSimulationStartState &&
//                         <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 30 }}>
//                             <defs>
//                                 <marker
//                                     id="arrow-home"
//                                     viewBox="0 0 10 10"
//                                     refX="5"
//                                     refY="5"
//                                     markerWidth="3"
//                                     markerHeight="3"
//                                     opacity={0.7}
//                                     orient="auto-start-reverse">
//                                     <path d="M 0 0 L 10 5 L 0 10 z" fill='#3B6FB2' />
//                                 </marker>
//                             </defs>
//                             <defs>
//                                 <marker
//                                     id="arrow-away"
//                                     viewBox="0 0 10 10"
//                                     refX="5"
//                                     refY="5"
//                                     markerWidth="3"
//                                     markerHeight="3"
//                                     opacity={0.7}
//                                     orient="auto-start-reverse">
//                                     <path d="M 0 0 L 10 5 L 0 10 z" fill='#B23B7F' />
//                                 </marker>
//                             </defs>
//                             <defs>
//                                 <marker
//                                     id="arrow-ball"
//                                     viewBox="0 0 10 10"
//                                     refX="5"
//                                     refY="5"
//                                     markerWidth="3"
//                                     markerHeight="3"
//                                     opacity={0.7}
//                                     orient="auto-start-reverse">
//                                     <path d="M 0 0 L 10 5 L 0 10 z" fill='black' />
//                                 </marker>
//                             </defs>

//                             {sequences.sequences.map(sequence => (
//                                 sequence.players.map((move) => (
//                                     move.positions.map((location, index) => {
//                                         if (index === 0) return null;
//                                         const { x: x1, y: y1 } = getLeftLocation(move.positions[index - 1].leftPercent, move.positions[index - 1].topPercent);
//                                         const { x: x2, y: y2 } = getLeftLocation(location.leftPercent, location.topPercent);
//                                         return <line
//                                             key={`${move.id}-${index}`}
//                                             x1={x1}
//                                             y1={y1}
//                                             x2={x2}
//                                             y2={y2}
//                                             stroke={location.team === 'HOME' ? '#3B6FB2' : '#B23B7F'}
//                                             strokeWidth="3"
//                                             strokeOpacity={0.7}
//                                             markerEnd={location.team === 'HOME' ? 'url(#arrow-home)' : 'url(#arrow-away)'}
//                                         />
//                                     })
//                                 ))
//                             ))}

//                             {sequences.sequences.map(sequence => (
//                                 sequence.balls.map((ball, index) => {
//                                     if (index === 0) return null;
//                                     const { x: x1, y: y1 } = getLeftLocation(sequence.balls[index - 1].leftPercent, sequence.balls[index - 1].topPercent);
//                                     const { x: x2, y: y2 } = getLeftLocation(ball.leftPercent, ball.topPercent);
//                                     return <line
//                                         key={`${ball.leftPercent}-${ball.topPercent}-${index}`}
//                                         x1={x1}
//                                         y1={y1}
//                                         x2={x2}
//                                         y2={y2}
//                                         stroke={'black'}
//                                         strokeWidth="3"
//                                         strokeOpacity={0.7}
//                                         markerEnd={'url(#arrow-ball)'}
//                                     />
//                                 })
//                             ))}
//                         </svg>
//                     }
//             </div>

//             {!isSimulationStartState && players.map((player) => {
//                 const multiSelectedPlayer = multiSelectedPlayers?.find((m) => m.id === player.id)
//                 if (multiSelectedPlayer) return;

//                 return <DraggablePlayer
//                     key={player.id}
//                     id={player.id}
//                     backNumber={player.backNumber}
//                     team={player.team}
//                     name={player.name}
//                     leftPercent={player.leftPercent}
//                     topPercent={player.topPercent}
//                     imgRef={imgRef}
//                     position={player.position}
//                     onClick={handlePlayerClick}
//                 />
//             })}

//             {ball && !isSimulationStartState && <DraggableBall
//                 leftPercent={ball.leftPercent}
//                 topPercent={ball.topPercent}
//                 imgRef={imgRef}
//             ></DraggableBall>
//             }

//             {ball && isSimulationStartState && animatedBallPosition && <DraggableBall
//                 leftPercent={animatedBallPosition.leftPercent}
//                 topPercent={animatedBallPosition.topPercent}
//                 imgRef={imgRef}
//             ></DraggableBall>
//             }

//             {isSimulationStartState && notIncludePlayers !== undefined && notIncludePlayers.map(player => {
//                 return (
//                     <DraggablePlayer
//                         key={player.id}
//                         id={player.id}
//                         backNumber={player.backNumber}
//                         team={player.team}
//                         name={player.name}
//                         leftPercent={player.leftPercent}
//                         topPercent={player.topPercent}
//                         imgRef={imgRef}
//                         position={player.position}
//                         onClick={handlePlayerClick}
//                     />
//                 );
//             })}


//             {isSimulationStartState && players.map(player => {
//                 const multiSelectedPlayer = multiSelectedPlayers?.find(m => m.id === player.id);
//                 if (multiSelectedPlayer) return null;

//                 const position = animatedPositions[player.id]
//                 if (!position) return;


//                 return (
//                     <DraggablePlayer
//                         key={player.id}
//                         id={player.id}
//                         backNumber={player.backNumber}
//                         team={player.team}
//                         name={player.name}
//                         leftPercent={position.leftPercent}
//                         topPercent={position.topPercent}
//                         imgRef={imgRef}
//                         position={player.position}
//                         onClick={handlePlayerClick}
//                     />
//                 );
//             })}
//         </Box >
//     );
// };

export default {};