import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/Store"
import { useEffect, useState } from "react";
import { PlayerPosition } from "./PlayerPosition";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { PlayerPositionEnum } from "./PlayerPositionEnum";
import { setPlayer } from "../store/PlayersListSlice";
import { selectPlayer } from "../store/PlayerSlice";

export interface PlayerListProps {
    width: number;
}

export const PlayerList: React.FC<PlayerListProps> = ({ width }) => {
    const dispatch = useDispatch();
    const players = useSelector((state: RootState) => state.players.players);
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);

    const [positionState, setPosition] = useState<PlayerPositionEnum>(PlayerPositionEnum.CM);
    const [backNumberState, setBackNumber] = useState<number>(0);
    const [nameState, setName] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const setColorByPosition = (position: PlayerPositionEnum) => {
        switch (position) {
            case 'ST':
            case 'CF':
            case 'LF':
            case 'RF':
                return 'red';
            case 'AM':
            case 'LM':
            case 'RM':
            case 'CM':
                return 'green';
            case 'CB':
            case 'LB':
            case 'RB':
                return 'blue';
            case 'GK':
                return '#f192bd';
            default:
                return '#3BB24A';
        }
    }

    const handleEditClick = (id: number, player: any) => {
        dispatch(selectPlayer(player))
        setBackNumber(player.backNumber)
        setName(player.name)
        setPosition(player.position)
        setIsModalOpen(true);
    };

    const handleBackNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // 숫자와 빈 문자열만 허용
        if (/^\d*$/.test(value)) {
            setBackNumber(value === '' ? 0 : Number(value));
        }
    };

    const handlePlayerProfileUpdate = () => {
        if (!selectedPlayer) return;

        const updatedPlayer = {
            id: selectedPlayer.id,
            backNumber: backNumberState,
            name: nameState,
            team: selectedPlayer.team,
            left: selectedPlayer.left,
            top: selectedPlayer.top,
            position: positionState,
        }

        dispatch(selectPlayer(updatedPlayer));
        dispatch(setPlayer(updatedPlayer));
        setIsModalOpen(false); // 모달 닫기
    };


    const renderSaveButtonInfo = () => {
        if (!selectedPlayer) return '#3BB24A'
        switch (selectedPlayer.team) {
            case 'HOME':
                return '#3B6FB2';
            case 'AWAY':
                return '#B23B7F';
            default:
                return '#3BB24A';
        }
    }

    useEffect(() => {
    }, [selectedPlayer])

    useEffect(() => {
    }, [players])

    useEffect(() => {
    }, [isModalOpen])

    const sortedPlayers = players.slice().sort((a, b) => {
        if (a.team === b.team) {
            return a.backNumber - b.backNumber; // 같은 팀일 경우 backNumber로 정렬
        }
        return a.team === 'HOME' ? -1 : 1; // 'home' 팀이 먼저 오도록 정렬
    });

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{
                maxHeight: 700,
                width: width,
                overflowY: 'auto',
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Position</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">No</Typography></TableCell>
                            {/* <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Team</Typography></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPlayers.map((player: PlayerPosition) => (
                            <TableRow key={player.id} onDoubleClick={() => handleEditClick(player.id, player)} >
                                <TableCell align="center">
                                    <Avatar
                                        sx={{
                                            bgcolor: setColorByPosition(player.position),
                                            width: 26,
                                            height: 26,
                                            margin: 'auto',
                                            boxShadow: player.team === 'HOME' ? '0 0 10px 5px #3B6FB2' : '0 0 10px 5px #B23B7F',
                                            borderRadius: '50%', // 원형 외곽선
                                        }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'auto' }}>
                                            {player.position}
                                        </Typography>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.name} </Typography></TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.backNumber}</Typography></TableCell>
                                {/* <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.team}</Typography></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 요소 간의 간격
                    }}
                >
                    <h3 id="modal-title" style={{ marginTop: 0, marginBottom: 10 }}>Edit Player</h3>
                    <FormControl fullWidth>
                        <TextField
                            id="name-label"
                            label="Name"
                            variant="outlined"
                            value={nameState}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="back-number-label"
                            label="Back Number"
                            variant="outlined"
                            value={backNumberState}
                            onChange={handleBackNumberChange}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="position-label">Position</InputLabel>
                        <Select
                            labelId="position-label"
                            id="position-select"
                            value={positionState}
                            label="position"
                            onChange={(e) => setPosition(e.target.value as PlayerPositionEnum)}
                        >
                            <MenuItem value={PlayerPositionEnum.ST}>ST</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CF}>CF</MenuItem>
                            <MenuItem value={PlayerPositionEnum.LF}>LF</MenuItem>
                            <MenuItem value={PlayerPositionEnum.RF}>RF</MenuItem>
                            <MenuItem value={PlayerPositionEnum.AM}>AM</MenuItem>
                            <MenuItem value={PlayerPositionEnum.LM}>LM</MenuItem>
                            <MenuItem value={PlayerPositionEnum.RM}>RM</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CM}>CM</MenuItem>
                            <MenuItem value={PlayerPositionEnum.DM}>DM</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CB}>CB</MenuItem>
                            <MenuItem value={PlayerPositionEnum.LB}>LB</MenuItem>
                            <MenuItem value={PlayerPositionEnum.RB}>RB</MenuItem>
                            <MenuItem value={PlayerPositionEnum.GK}>GK</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                            marginTop: 2, // 버튼과 다른 요소들 간의 간격
                            color: 'white', // 텍스트 색상
                            backgroundColor: renderSaveButtonInfo(), // 배경 색상
                            '&:hover': {
                                backgroundColor: 'darken(renderSaveButtonInfo(), 0.2)', // 호버 시 배경 색상
                            },
                        }}
                        variant="contained"
                        onClick={handlePlayerProfileUpdate}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div >
    );
}