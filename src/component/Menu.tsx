import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { clearMultiSelectedPlayers, setInitMultiSelectedPlayers, clearSelectedPlayer } from "../store/PlayerSlice";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { clearPlayers } from "../store/PlayersListSlice";
import { clearPlayerViewState } from "../store/PlayerViewSlice";
import { clearPossibleMoveState } from "../store/PossibleMoveSlice";
import { clearPlayerMovingSequence } from "../store/SequenceSlice";
import { clearSimulationOn } from "../store/SimulationOnSlice";


export const Menu = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const multiSelectedPlayer = useSelector((state: RootState) => state.player.multiSelectedPlayers);
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

    const handleMultiSelect = () => {
        if (!selectedPlayer || multiSelectedPlayer) {
            dispatch(clearMultiSelectedPlayers())
            return;
        }
        console.log("초기화함")
        dispatch(setInitMultiSelectedPlayers())
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

    const handleReset = () => {
        dispatch(clearSelectedPlayer());
        dispatch(clearMultiSelectedPlayers());
        dispatch(clearPlayers());
        dispatch(clearPlayerViewState());
        dispatch(clearPossibleMoveState());
        dispatch(clearPlayerMovingSequence());
        dispatch(clearSimulationOn());
    }

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    useEffect(() => {
    }, [multiSelectedPlayer]);

    useEffect(() => {
    }, [selectedPlayer]);

    const isMovable = selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id;
    const isMoveBackable = selectedPlayer && possibleMoveState;
    const isStopable = selectedPlayer && possibleMoveState && possibleMoveState.isPossible;

    return (
        <>
            <Box display="flex" alignItems="center" onClick={handleRecommendFormationModalOpen} sx={{ cursor: 'pointer' }}>
                <StarBorderOutlinedIcon sx={{ color: '#FFD400' }} />
                <Typography variant="body1" ml={1}>Recommend Formation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handleSimulation} sx={{ cursor: 'pointer' }}>
                <MultipleStopOutlinedIcon sx={{ color: 'purple' }} />
                <Typography variant="body1" ml={1}>Ground Change</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handleReset} sx={{ cursor: 'pointer' }}>
                <RestartAltIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1}>Reset</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={selectedPlayer ? handleMultiSelect : () => { }}
                sx={{
                    cursor: selectedPlayer ? 'pointer' : 'not-allowed',
                    opacity: selectedPlayer ? 1 : 0.5
                }}
            >
                <DoneAllOutlinedIcon sx={{ color: 'green' }} />
                <Typography variant="body1" ml={1} color={selectedPlayer ? 'black' : 'gray'}>
                    Multi Select
                </Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isMovable ? handlePlayerMovePossible : () => { }}
                sx={{
                    cursor: isMovable ? 'pointer' : 'not-allowed',
                    opacity: isMovable ? 1 : 0.5
                }}>
                <DirectionsRunIcon sx={{ color: 'orange' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMovable ? 'black' : 'gray'}
                >Move</Typography>
            </Box>


            <Box
                display="flex"
                alignItems="center"
                onClick={isMoveBackable ? handlePlayerRemoveBack : () => { }}
                sx={{
                    cursor: isMoveBackable ? 'pointer' : 'not-allowed',
                    opacity: isMoveBackable ? 1 : 0.5
                }}>
                <ArrowBackIcon sx={{ color: 'black' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMoveBackable ? 'black' : 'gray'}
                >Move Back</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isStopable ? handlePlayerMoveNotPossible : () => { }}
                sx={{
                    cursor: isStopable ? 'pointer' : 'not-allowed',
                    opacity: isStopable ? 1 : 0.5
                }}>
                <StopIcon sx={{ color: 'red' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isStopable ? 'black' : 'gray'}
                >Stop</Typography>
            </Box>

            <Box display="flex" alignItems="center" onClick={handleSimulation} sx={{ cursor: 'pointer' }}>
                <PlayArrowOutlinedIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1}>Simulation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerViewState} sx={{ cursor: 'pointer' }}>
                <SettingsIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1}>Icon View</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                <StartOutlinedIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1}>Next Slice</Typography>
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