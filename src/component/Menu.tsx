import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { RootState } from '../store/Store';
import { useEffect, useState } from 'react';
import { removeBackPlayerMovingSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { setPlayerViewState } from '../store/PlayerViewSlice';
import StopIcon from '@mui/icons-material/Stop';
import { setSimulationOn } from '../store/SimulationOnSlice';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Formation } from "./Formation";

export const Menu = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const sequencesState = useSelector((state: RootState) => state.sequences);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formationState, setFormation] = useState<Formation>(Formation.THFITW);

    const handlePlayerMovePossible = () => {
        if (!selectedPlayer) return;
        const { id, left, top, team } = selectedPlayer;
        dispatch(setPossibleMoveState({ playerId: id, isPossible: true }))
        dispatch(setPlayerMovingSequences({ id, left, top, team, isFirst: true }));
    }

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handlePlayerRemoveBack = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(removeBackPlayerMovingSequences(selectedPlayer.id))
    }

    const handleSimulation = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
        dispatch(setSimulationOn({ isSimulationOn: true }))
    }

    const handlePlayerViewState = () => {
        dispatch(setPlayerViewState({ playerView: 'position' }))
    }

    const handleRecommendFormationModalOpen = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible();
        setIsModalOpen(true); // 모달 열기
    };

    const handleRecommendFormationModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleFormationUpdate = () => {
        // if (!selectedPlayer) return;
        // dispatch(selectPlayer({
        //     id: selectedPlayer.id,
        //     backNumber: backNumberState,
        //     team: selectedPlayer.team,
        //     left: selectedPlayer.left,
        //     top: selectedPlayer.top,
        //     position: positionState,
        // }));
        setIsModalOpen(false); // 모달 닫기
    };

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    return (
        <>
            {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id && (
                <Box display="flex" alignItems="center" onClick={handlePlayerMovePossible} sx={{ cursor: 'pointer' }}>
                    <DirectionsRunIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Move</Typography>
                </Box>
            )}
            {selectedPlayer && possibleMoveState && (
                <Box display="flex" alignItems="center" onClick={handlePlayerRemoveBack} sx={{ cursor: 'pointer' }}>
                    <ArrowBackIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Move Back</Typography>
                </Box>
            )}
            {selectedPlayer && possibleMoveState && possibleMoveState.isPossible && (
                <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                    <StopIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Stop</Typography>
                </Box>
            )}
            <Box display="flex" alignItems="center" onClick={handleSimulation} sx={{ cursor: 'pointer' }}>
                <PlayArrowOutlinedIcon color="warning" />
                <Typography variant="body1" color="warning" ml={1}>Simulation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                <RestartAltIcon color="warning" />
                <Typography variant="body1" color="warning" ml={1}>Reset</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handleRecommendFormationModalOpen} sx={{ cursor: 'pointer' }}>
                <ThumbUpOffAltOutlinedIcon color="success" />
                <Typography variant="body1" color="success" ml={1}>Recommend Formation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerViewState} sx={{ cursor: 'pointer' }}>
                <SettingsIcon color="success" />
                <Typography variant="body1" color="success" ml={1}>Player Profile</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                <StartOutlinedIcon color="success" />
                <Typography variant="body1" color="success" ml={1}>Next Slice</Typography>
            </Box>

            <Modal
                open={isModalOpen}
                onClose={handleRecommendFormationModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 200,
                        bgcolor: 'background.paper',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 요소 간의 간격
                    }}
                >
                    <h3 id="modal-title" style={{ marginTop: 0, marginBottom: 10 }}>Edit Player</h3>
                    <FormControl fullWidth>
                        <InputLabel id="home-formation-label">Home Team Formation</InputLabel>
                        <Select
                            labelId="home-formation-label"
                            id="home-formation-select"
                            value={formationState}
                            label="Home Team Formation"
                            onChange={(e) => setFormation(e.target.value as Formation)}
                        >
                            <MenuItem value={Formation.FOFOTW}>4-4-2</MenuItem>
                            <MenuItem value={Formation.FOTRTR}>4-3-3</MenuItem>
                            <MenuItem value={Formation.FOTWTRON}>4-2-3-1</MenuItem>
                            <MenuItem value={Formation.THFITW}>3-5-2</MenuItem>                            
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="away-formation-label">Away Team Formation</InputLabel>
                        <Select
                            labelId="away-formation-label"
                            id="away-formation-select"
                            value={formationState}
                            label="Away Team Formation"
                            onChange={(e) => setFormation(e.target.value as Formation)}
                        >
                            <MenuItem value={Formation.FOFOTW}>4-4-2</MenuItem>
                            <MenuItem value={Formation.FOTRTR}>4-3-3</MenuItem>
                            <MenuItem value={Formation.FOTWTRON}>4-2-3-1</MenuItem>
                            <MenuItem value={Formation.THFITW}>3-5-2</MenuItem>                            
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                            marginTop: 2, // 버튼과 다른 요소들 간의 간격
                            color: 'white', // 텍스트 색상
                            '&:hover': {
                                backgroundColor: 'darken(renderSaveButtonInfo(), 0.2)', // 호버 시 배경 색상
                            },
                        }}
                        variant="contained"
                        onClick={handleFormationUpdate}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    )
}