import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/Store"
import { useEffect, useState } from "react";
import { PlayerPosition } from "./PlayerPosition";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Modal, Pagination, PaginationItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { PlayerPositionEnum } from "./PlayerPositionEnum";
import { setPlayer } from "../store/PlayersListSlice";
import { selectPlayer } from "../store/PlayerSlice";
import { useTranslation } from "react-i18next";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";


type PlayerListProps = {
    filteredPlayers: PlayerPosition[]
}

export const PlayerList: React.FC<PlayerListProps> = ({ filteredPlayers }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

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
            leftPercent: selectedPlayer.leftPercent,
            topPercent: selectedPlayer.topPercent,
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
    }, [isModalOpen])

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedPlayers = filteredPlayers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPageCount = Math.ceil(filteredPlayers.length / itemsPerPage);

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{
                maxHeight: 700,
                overflowY: 'auto',
                background: 'transparent'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ border: 0 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color={'white'}>
                                    {t('Position')}
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 0 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color={'white'}>
                                    {t('Name')}
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 0 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color={'white'}>
                                    {t('No')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPlayers.map((player) => (
                            <TableRow key={player.id} onDoubleClick={() => handleEditClick(player.id, player)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" sx={{ border: 0 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: setColorByPosition(player.position),
                                            width: 26,
                                            height: 26,
                                            margin: 'auto',
                                            boxShadow: player.team === 'HOME' ? '0 0 10px 5px #3B6FB2' : '0 0 10px 5px #B23B7F',
                                            borderRadius: '50%', // 원형 외곽선
                                        }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
                                            {player.position}
                                        </Typography>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center" sx={{ border: 0 }}>
                                    <Typography variant="body2" fontWeight="bold" color={'white'}>
                                        {player.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ border: 0 }}>
                                    <Typography variant="body2" fontWeight="bold" color={'white'}>
                                        {player.backNumber}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPageCount > 1 && (
                <Stack spacing={2} sx={{ marginTop: 2, color: 'white', alignItems: 'center' }}>
                    <Pagination
                        count={totalPageCount}
                        page={page}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIosNew, next: ArrowForwardIos }}
                                sx={{ color: 'white' }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            )}

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정 배경
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%))', // 그라데이션 배경
                        color: 'var(--light)',
                        borderRadius: '.8rem',
                        boxShadow: 'var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1)',
                        border: '2px solid rgba(63, 81, 181, 0.7)', // 외곽선 설정
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 요소 간의 간격
                    }}
                >
                    <h3 id="modal-title" style={{ marginTop: 0, marginBottom: 10, color: 'white' }}>{t('Edit Player')}</h3>
                    <FormControl fullWidth>
                        <TextField
                            id="name-label"
                            label={t('Name')}
                            variant="outlined"
                            value={nameState}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, color: 'white' }}
                            InputLabelProps={{ style: { color: 'var(--light)' } }}
                            InputProps={{ style: { color: 'var(--light)' } }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="back-number-label"
                            label={t('Back Number')}
                            variant="outlined"
                            value={backNumberState}
                            onChange={handleBackNumberChange}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, color: 'white' }}
                            InputLabelProps={{ style: { color: 'var(--light)' } }}
                            InputProps={{ style: { color: 'var(--light)' } }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="position-label" style={{ color: 'white' }}>{t('Position')}</InputLabel>
                        <Select
                            labelId="position-label"
                            id="position-select"
                            value={positionState}
                            label={t('Position')}
                            onChange={(e) => setPosition(e.target.value as PlayerPositionEnum)}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, color: 'white' }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: 'rgba(33, 33, 33, 0.9)', // 메뉴 배경색 설정
                                        color: 'white', // 메뉴 텍스트 색상 설정
                                    },
                                },
                            }}
                        >
                            {Object.values(PlayerPositionEnum).map((position) => (
                                <MenuItem key={position} value={position}>
                                    {position}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                            marginTop: 2, // 버튼과 다른 요소들 간의 간격
                            color: 'white', // 텍스트 색상
                            backgroundColor: renderSaveButtonInfo(), // 배경 색상
                            '&:hover': {
                                backgroundColor: renderSaveButtonInfo(), // 호버 시 배경 색상을 기본 상태와 동일하게 설정
                                borderColor: 'var(--border-color)', // 호버 시 테두리 색상을 기본 상태와 동일하게 설정
                                transform: 'translateY(-.2rem)',
                            },
                            border: '1px solid var(--border-color)',
                            borderRadius: '100rem',
                        }}
                        variant="contained"
                        onClick={handlePlayerProfileUpdate}
                    >
                        {t('Save')}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}