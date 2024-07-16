import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography } from "@mui/material";
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { RootState } from '../store/Store';
import { useEffect, useState } from 'react';
import { clearBallSequences, removeBackPlayerMovingSequences, removePlayerSequence, setBallSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossiblePlayerMoveState } from '../store/PossiblePlayerMoveSlice';
import StopIcon from '@mui/icons-material/Stop';
import { setSimulationOn } from '../store/SimulationOnSlice';
import { Formation } from "./Formation";
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { clearMultiSelectedPlayers, setInitMultiSelectedPlayers, clearSelectedPlayer, selectPlayer } from "../store/PlayerSlice";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { clearPlayers, removePlayer, setPlayer } from "../store/PlayersListSlice";
import { clearPlayerViewState } from "../store/PlayerViewSlice";
import { clearPossiblePlayerMoveState } from "../store/PossiblePlayerMoveSlice";
import { clearPlayerMovingSequence } from "../store/SequenceSlice";
import { clearSimulationOn } from "../store/SimulationOnSlice";
import { clearPlayerId, plusPlayerId, plusPlayerIdWithNumber } from "../store/PlayerIdSlice";
import { PlayerPositionEnum } from "./PlayerPositionEnum";
import RemoveIcon from '@mui/icons-material/Remove';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import { clearBall } from "../store/BallSlice";
import { clearPossibleBallMoveState, setPossibleBallMoveState } from "../store/PossibleBallMoveSlice";
import { TeamCountry, TeamMapper } from "./TeamMapper";


export const Menu = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const multiSelectedPlayer = useSelector((state: RootState) => state.player.multiSelectedPlayers);
    const sequencesState = useSelector((state: RootState) => state.sequences);
    const possibleMoveState = useSelector((state: RootState) => state.possiblePlayerMove);
    const playerId = useSelector((state: RootState) => state.playerId.id);
    const players = useSelector((state: RootState) => state.players)
    const ball = useSelector((state: RootState) => state.ball.ball);
    const isPossibleBallMove = useSelector((state: RootState) => state.possibleBallMove.isPossible);
    const isSimulationOn = useSelector((state: RootState) => state.simulationOn.isSimulationOn);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [homeFormationState, setHomeFormation] = useState<Formation>(Formation.THFITW);
    const [awayFormationState, setAwayFormation] = useState<Formation>(Formation.THFITW);
    const [homeCountryState, setHomeCountry] = useState<TeamCountry>(TeamCountry.SPAIN);
    const [awayCountryState, setAwayCountry] = useState<TeamCountry>(TeamCountry.ENGLAND);

    const handlePlayerMovePossible = () => {
        if (!selectedPlayer) return;
        const { id, left, top, team } = selectedPlayer;
        dispatch(clearPossibleBallMoveState())
        dispatch(setPossiblePlayerMoveState({ playerId: id, isPossible: true }))
        dispatch(setPlayerMovingSequences({ id, left, top, team, isFirst: true }));
    }

    const handleBallMovePossible = () => {
        if (!ball) return;
        dispatch(clearPossiblePlayerMoveState())
        dispatch(setPossibleBallMoveState({
            isPossible: true
        }))
        dispatch(setBallSequences({ left: ball.left, top: ball.top }));
    }

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState.isPossible) return;
        dispatch(setPossiblePlayerMoveState({ playerId: null, isPossible: false }))
    }

    const handleBallMoveNotPossible = () => {
        if (!ball) return;
        dispatch(clearPossibleBallMoveState())
    }

    const handlePlayerRemoveBack = () => {
        if (!selectedPlayer || !possibleMoveState.isPossible) return;
        dispatch(removeBackPlayerMovingSequences(selectedPlayer.id))
    }

    const handleSimulation = () => {
        dispatch(setPossiblePlayerMoveState({ playerId: null, isPossible: false }))
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

    const handleRecommendFormationModalOpen = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible();
        setIsModalOpen(true); // 모달 열기
    };

    const handleRecommendFormationModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleFormationUpdate = () => {
        handleReset()

        let addPlayers: { left: number, top: number, backNumber: number, position: PlayerPositionEnum, team: 'home' | 'away' }[] = [];

        switch (homeFormationState) {
            case Formation.FOFOTW:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'home' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'home' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'home' },
                    { left: 26, top: 16, backNumber: 7, position: PlayerPositionEnum.LM, team: 'home' },
                    { left: 26, top: 38, backNumber: 8, position: PlayerPositionEnum.CM, team: 'home' },
                    { left: 26, top: 62, backNumber: 6, position: PlayerPositionEnum.CM, team: 'home' },
                    { left: 26, top: 84, backNumber: 11, position: PlayerPositionEnum.RM, team: 'home' },
                    { left: 37, top: 38, backNumber: 9, position: PlayerPositionEnum.ST, team: 'home' },
                    { left: 37, top: 62, backNumber: 10, position: PlayerPositionEnum.CF, team: 'home' },
                ]
                break;
            case Formation.FOTWTRON:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'home' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'home' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'home' },
                    { left: 26, top: 38, backNumber: 6, position: PlayerPositionEnum.DM, team: 'home' },
                    { left: 26, top: 62, backNumber: 8, position: PlayerPositionEnum.DM, team: 'home' },
                    { left: 37, top: 16, backNumber: 7, position: PlayerPositionEnum.LM, team: 'home' },
                    { left: 37, top: 84, backNumber: 11, position: PlayerPositionEnum.RM, team: 'home' },
                    { left: 37, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'home' },
                    { left: 45, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'home' },
                ]
                break;

            case Formation.FOTRTR:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'home' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'home' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'home' },
                    { left: 30, top: 20, backNumber: 6, position: PlayerPositionEnum.LM, team: 'home' },
                    { left: 30, top: 50, backNumber: 8, position: PlayerPositionEnum.CM, team: 'home' },
                    { left: 30, top: 80, backNumber: 10, position: PlayerPositionEnum.RM, team: 'home' },
                    { left: 45, top: 20, backNumber: 7, position: PlayerPositionEnum.LF, team: 'home' },
                    { left: 45, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'home' },
                    { left: 45, top: 80, backNumber: 11, position: PlayerPositionEnum.RF, team: 'home' },
                ]
                break;

            case Formation.THFITW:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'home' },
                    { left: 15, top: 20, backNumber: 3, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 50, backNumber: 4, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 15, top: 80, backNumber: 5, position: PlayerPositionEnum.CB, team: 'home' },
                    { left: 30, top: 10, backNumber: 7, position: PlayerPositionEnum.LB, team: 'home' },
                    { left: 30, top: 30, backNumber: 8, position: PlayerPositionEnum.CM, team: 'home' },
                    { left: 30, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'home' },
                    { left: 30, top: 70, backNumber: 6, position: PlayerPositionEnum.CM, team: 'home' },
                    { left: 30, top: 90, backNumber: 2, position: PlayerPositionEnum.RB, team: 'home' },
                    { left: 45, top: 30, backNumber: 9, position: PlayerPositionEnum.ST, team: 'home' },
                    { left: 45, top: 70, backNumber: 11, position: PlayerPositionEnum.ST, team: 'home' },
                ]
                break;
        }

        const homeTeamResult = TeamMapper(
            {
                players: addPlayers,
                country: homeCountryState
            }
        )

        homeTeamResult.forEach((a, index) => {
            handleAddPlayer(
                playerId + index,
                a.left,
                a.top,
                a.name,
                a.backNumber,
                a.position,
                a.team
            );
        });


        addPlayers = []

        switch (awayFormationState) {
            case Formation.FOFOTW:
                addPlayers = [
                    { left: 93, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'away' },
                    { left: 83, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'away' },
                    { left: 83, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'away' },
                    { left: 72, top: 16, backNumber: 11, position: PlayerPositionEnum.RM, team: 'away' },
                    { left: 72, top: 38, backNumber: 8, position: PlayerPositionEnum.CM, team: 'away' },
                    { left: 72, top: 62, backNumber: 6, position: PlayerPositionEnum.CM, team: 'away' },
                    { left: 72, top: 84, backNumber: 7, position: PlayerPositionEnum.LM, team: 'away' },
                    { left: 61, top: 38, backNumber: 9, position: PlayerPositionEnum.ST, team: 'away' },
                    { left: 61, top: 62, backNumber: 10, position: PlayerPositionEnum.CF, team: 'away' },
                ]
                break;
            case Formation.FOTWTRON:
                addPlayers = [
                    { left: 93, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'away' },
                    { left: 83, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'away' },
                    { left: 83, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'away' },
                    { left: 72, top: 38, backNumber: 6, position: PlayerPositionEnum.DM, team: 'away' },
                    { left: 72, top: 62, backNumber: 8, position: PlayerPositionEnum.DM, team: 'away' },
                    { left: 61, top: 16, backNumber: 11, position: PlayerPositionEnum.RM, team: 'away' },
                    { left: 61, top: 84, backNumber: 7, position: PlayerPositionEnum.LM, team: 'away' },
                    { left: 61, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'away' },
                    { left: 53, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'away' },
                ]
                break;

            case Formation.FOTRTR:
                addPlayers = [
                    { left: 93, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'away' },
                    { left: 83, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'away' },
                    { left: 83, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'away' },
                    { left: 68, top: 20, backNumber: 6, position: PlayerPositionEnum.RM, team: 'away' },
                    { left: 68, top: 50, backNumber: 8, position: PlayerPositionEnum.CM, team: 'away' },
                    { left: 68, top: 80, backNumber: 10, position: PlayerPositionEnum.LM, team: 'away' },
                    { left: 53, top: 20, backNumber: 11, position: PlayerPositionEnum.RF, team: 'away' },
                    { left: 53, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'away' },
                    { left: 53, top: 80, backNumber: 7, position: PlayerPositionEnum.LF, team: 'away' },
                ]
                break;

            case Formation.THFITW:
                addPlayers = [
                    { left: 93, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'away' },
                    { left: 83, top: 20, backNumber: 3, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 50, backNumber: 4, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 83, top: 80, backNumber: 5, position: PlayerPositionEnum.CB, team: 'away' },
                    { left: 68, top: 10, backNumber: 2, position: PlayerPositionEnum.RB, team: 'away' },
                    { left: 68, top: 30, backNumber: 6, position: PlayerPositionEnum.CM, team: 'away' },
                    { left: 68, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'away' },
                    { left: 68, top: 70, backNumber: 8, position: PlayerPositionEnum.CM, team: 'away' },
                    { left: 68, top: 90, backNumber: 11, position: PlayerPositionEnum.LB, team: 'away' },
                    { left: 53, top: 30, backNumber: 9, position: PlayerPositionEnum.ST, team: 'away' },
                    { left: 53, top: 70, backNumber: 7, position: PlayerPositionEnum.ST, team: 'away' },
                ]
                break;
        }

        const awayTeamResult = TeamMapper(
            {
                players: addPlayers,
                country: awayCountryState
            }
        )

        awayTeamResult.forEach((a, index) => {
            handleAddPlayer(
                playerId + 12 + index,
                a.left,
                a.top,
                a.name,
                a.backNumber,
                a.position,
                a.team
            );
        });

        dispatch(plusPlayerIdWithNumber(23));
        handleRecommendFormationModalClose();

        console.log(playerId)
    };

    const handleAddPlayer = (id: number, left: number, top: number, name: string, backNumber: number, position: PlayerPositionEnum, team: 'home' | 'away') => {
        const newPlayer = {
            id: id,
            backNumber: backNumber,
            name: name,
            position: position,
            team: team,
            left: left,
            top: top,
        };
        dispatch(setPlayer(newPlayer));
    }

    const handleReset = () => {
        dispatch(clearSelectedPlayer());
        dispatch(clearMultiSelectedPlayers());
        dispatch(clearPlayers());
        dispatch(clearPlayerViewState());
        dispatch(clearPossiblePlayerMoveState());
        dispatch(clearPlayerMovingSequence());
        dispatch(clearSimulationOn());
        dispatch(clearPlayerId());
        dispatch(clearBall());
        dispatch(clearPossibleBallMoveState());
    }

    const handleBallRemove = () => {
        dispatch(clearBall());
        dispatch(clearPossibleBallMoveState());
        dispatch(clearBallSequences());
    }

    const handlePlayerRemove = () => {
        if (!selectedPlayer) return;
        dispatch(removePlayerSequence(selectedPlayer.id))
        dispatch(removePlayer({ id: selectedPlayer.id }))
        dispatch(clearSelectedPlayer())
    }

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    useEffect(() => {
    }, [multiSelectedPlayer]);

    useEffect(() => {
    }, [selectedPlayer]);

    useEffect(() => {
    }, [homeFormationState]);

    useEffect(() => {
    }, [awayFormationState]);

    useEffect(() => {
    }, [playerId])

    useEffect(() => {
    }, [players])

    useEffect(() => {
    }, [isPossibleBallMove])

    useEffect(() => {
    }, [isSimulationOn])

    const isMovable = selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id;
    const isMovalbleBallClick = ball && !isPossibleBallMove
    const isMoveBackable = selectedPlayer && possibleMoveState.isPossible;
    const isPlayerMoveStopable = selectedPlayer && possibleMoveState.isPossible;
    const isBallMoveStopable = ball && isPossibleBallMove
    const isSimulationPossible = sequencesState.sequences.find((s) => s.sequenceNumber === sequencesState.currentSequenceNumber)
    return (
        <>
            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />
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
                    Player Multi Select
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
                <MoveUpIcon sx={{ color: 'orange' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMovable ? 'black' : 'gray'}
                >Player Move</Typography>
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
                >Player Move Back</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isPlayerMoveStopable ? handlePlayerMoveNotPossible : () => { }}
                sx={{
                    cursor: isPlayerMoveStopable ? 'pointer' : 'not-allowed',
                    opacity: isPlayerMoveStopable ? 1 : 0.5
                }}>
                <StopIcon sx={{ color: 'red' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isPlayerMoveStopable ? 'black' : 'gray'}
                >Player Stop</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={selectedPlayer ? handlePlayerRemove : () => { }}
                sx={{
                    cursor: selectedPlayer ? 'pointer' : 'not-allowed',
                    opacity: selectedPlayer ? 1 : 0.5
                }}>
                <RemoveIcon sx={{ color: '	#89E9D3' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={selectedPlayer ? 'black' : 'gray'}
                >Player Remove</Typography>
            </Box>

            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />
            <Box
                display="flex"
                alignItems="center"
                onClick={isMovalbleBallClick ? handleBallMovePossible : () => { }}
                sx={{
                    cursor: isMovalbleBallClick ? 'pointer' : 'not-allowed',
                    opacity: isMovalbleBallClick ? 1 : 0.5
                }}>
                <MoveUpIcon sx={{ color: 'orange' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMovalbleBallClick ? 'black' : 'gray'}
                >Ball Move</Typography>
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
                >Ball Move Back</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isBallMoveStopable ? handleBallMoveNotPossible : () => { }}
                sx={{
                    cursor: isBallMoveStopable ? 'pointer' : 'not-allowed',
                    opacity: isBallMoveStopable ? 1 : 0.5
                }}>
                <StopIcon sx={{ color: 'red' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isBallMoveStopable ? 'black' : 'gray'}
                >Ball Stop</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={ball ? handleBallRemove : () => { }}
                sx={{
                    cursor: ball ? 'pointer' : 'not-allowed',
                    opacity: ball ? 1 : 0.5
                }}>
                <RemoveIcon sx={{ color: '	#89E9D3' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={ball ? 'black' : 'gray'}
                >Ball Remove</Typography>
            </Box>

            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />
            <Box
                display="flex"
                alignItems="center"
                onClick={isSimulationPossible ? handleSimulation : () => { }}
                sx={{
                    cursor: isSimulationPossible ? 'pointer' : 'not-allowed',
                    opacity: isSimulationPossible ? 1 : 0.5
                }}>
                <PlayArrowOutlinedIcon sx={{ color: '#89B2E9' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isSimulationPossible ? 'black' : 'gray'}
                >Simulation</Typography>
            </Box>

            <Box display="flex" alignItems="center" onClick={handleReset} sx={{ cursor: 'pointer' }}>
                <RestartAltIcon sx={{ color: '#D389E9' }} />
                <Typography variant="body1" ml={1}>Reset</Typography>
            </Box>

            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />

            <Box display="flex" alignItems="center" onClick={handleRecommendFormationModalOpen} sx={{ cursor: 'pointer' }}>
                <StarBorderOutlinedIcon sx={{ color: '#FFD400' }} />
                <Typography variant="body1" ml={1}>Recommend Formation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={() => { }} sx={{ cursor: 'pointer' }}>
                <MultipleStopOutlinedIcon sx={{ color: 'purple' }} />
                <Typography variant="body1" ml={1}>Ground Change</Typography>
            </Box>
            {/* <Box display="flex" alignItems="center" onClick={handlePlayerViewState} sx={{ cursor: 'pointer' }}>
                <SettingsIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1}>Icon View</Typography>
            </Box> */}
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
                            value={homeFormationState}
                            label="Home Team Formation"
                            onChange={(e) => setHomeFormation(e.target.value as Formation)}
                        >
                            <MenuItem value={Formation.FOFOTW}>4-4-2</MenuItem>
                            <MenuItem value={Formation.FOTRTR}>4-3-3</MenuItem>
                            <MenuItem value={Formation.FOTWTRON}>4-2-3-1</MenuItem>
                            <MenuItem value={Formation.THFITW}>3-5-2</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="home-country-label">Home Team Formation</InputLabel>
                        <Select
                            labelId="home-country-label"
                            id="home-country-select"
                            value={homeCountryState}
                            label="Home Team Country"
                            onChange={(e) => setHomeCountry(e.target.value as TeamCountry)}
                        >
                            <MenuItem value={TeamCountry.SPAIN}>Spain</MenuItem>
                            <MenuItem value={TeamCountry.ENGLAND}>England</MenuItem>
                            <MenuItem value={TeamCountry.GERMANY}>Germany</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="away-formation-label">Away Team Formation</InputLabel>
                        <Select
                            labelId="away-formation-label"
                            id="away-formation-select"
                            value={awayFormationState}
                            label="Away Team Formation"
                            onChange={(e) => setAwayFormation(e.target.value as Formation)}
                        >
                            <MenuItem value={Formation.FOFOTW}>4-4-2</MenuItem>
                            <MenuItem value={Formation.FOTRTR}>4-3-3</MenuItem>
                            <MenuItem value={Formation.FOTWTRON}>4-2-3-1</MenuItem>
                            <MenuItem value={Formation.THFITW}>3-5-2</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="away-country-label">Home Team Formation</InputLabel>
                        <Select
                            labelId="away-country-label"
                            id="away-country-select"
                            value={awayCountryState}
                            label="Away Team Country"
                            onChange={(e) => setAwayCountry(e.target.value as TeamCountry)}
                        >
                            <MenuItem value={TeamCountry.SPAIN}>Spain</MenuItem>
                            <MenuItem value={TeamCountry.ENGLAND}>England</MenuItem>
                            <MenuItem value={TeamCountry.GERMANY}>Germany</MenuItem>
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