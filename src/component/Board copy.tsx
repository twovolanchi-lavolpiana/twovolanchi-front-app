import '../App.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useEffect, useState } from 'react'
import { PlayerPosition } from './PlayerPosition';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { PlayerPositionEnum } from './PlayerPositionEnum';
import { Card, CardContent, Grid, Stack } from '@mui/material';
import { ScreenSizeProvider } from '../provider/ScreenSizeProvider';
import SoccerField from './SoccerField';
import { setPlayer } from '../store/PlayersListSlice';

// export const Board = () => {
//     const dispatch = useDispatch();
//     const [players, setPlayers] = useState<PlayerPosition[]>([]);
//     const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
//     const playerLists = useSelector((state: RootState) => state.players);
//     const [playerId, setPlayerId] = useState(0);

//     const handleAddPlayer = (team: 'home' | 'away', left: number, top: number, position: PlayerPositionEnum) => {
//         const newPlayer = {
//             id: playerId,
//             backNumber: playerId,
//             position: position,
//             team: team,
//             left: left,
//             top: top,
//         };
//         setPlayers([...players, newPlayer]);
//         dispatch(setPlayer(newPlayer))
//         setPlayerId(playerId + 1);
//     };

//     const movePlayer = (id: number, left: number, top: number) => {
//         setPlayers((prevPlayers) =>
//             prevPlayers.map((player) =>
//                 player.id === id ? { ...player, left: left, top: top } : player
//             )
//         );
//     };

//     useEffect(() => {
//         console.log(players)
//     }, [players]);

//     useEffect(() => {
//         console.log(selectedPlayer)
//     }, [selectedPlayer]);

//     useEffect(() => {
//         console.log(playerLists)
//     }, [playerLists])

    
//     return (
//         <DndProvider backend={HTML5Backend}>
//             <div className='board-parent'>
//                 <Card>
//                     <CardContent>
//                         <Stack direction="column" spacing={2}>
//                             <PlayerPlus onAddPlayer={handleAddPlayer} />
//                             <Menu />
//                         </Stack>
//                     </CardContent>
//                 </Card>
//                 <Card className="board-container">
//                     <ScreenSizeProvider>
//                         <Ground players={players} movePlayer={movePlayer} />
//                     </ScreenSizeProvider>
//                 </Card>
//                 <Card>
//                     <CardContent>
//                         <Stack direction="column" spacing={2}>
//                             <Menu />
//                         </Stack>
//                     </CardContent>
//                 </Card>
//             </div>
//             <div className='simulation-card' >
//                 <SoccerField></SoccerField>
//             </div>
//         </DndProvider>
//     );
// }


export default {};