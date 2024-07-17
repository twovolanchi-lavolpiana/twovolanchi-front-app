import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { RootState } from '../store/Store';
import { useEffect, useState } from 'react';
import { clearBallSequences, removeBackPlayerMovingSequences, removePlayerSequence, setBallSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossiblePlayerMoveState } from '../store/PossiblePlayerMoveSlice';
import StopIcon from '@mui/icons-material/Stop';
import { endSimulation, setSimulationOn, startSimulation } from '../store/SimulationOnSlice';
import { Formation } from "./Formation";
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
import { useScreenSize } from "../provider/ScreenSizeProvider";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { setBall } from '../store/BallSlice';


export const Menu = () => {
    const defaultName = "Messi";
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
    const isSimulationStart = useSelector((state: RootState) => state.simulationOn.isSimulationStart);
    const isPossiblePlayerMove = useSelector((state: RootState) => state.possiblePlayerMove.isPossible);


    const handleAddPlusPlayer = (team: 'HOME' | 'AWAY', position: PlayerPositionEnum) => {
        handlePlayerMoveNotPossible()
        const left = 50; // 50%
        const top = 50; // 50%

        const newPlayer = {
            id: playerId,
            backNumber: playerId,
            name: defaultName,
            position: position,
            team: team,
            left: left,
            top: top,
        };
        dispatch(setPlayer(newPlayer));
        dispatch(selectPlayer(newPlayer));
        dispatch(plusPlayerId());
    };


    const handleSetBall = () => {
        handlePlayerMoveNotPossible()
        const left = 50; // 50%
        const top = 50; // 50%

        const ball = {
            left: left,
            top: top,
        };
        dispatch(setBall(ball));
        dispatch(setBallSequences({ left, top }));
    };

    useEffect(() => {
    }, [isPossiblePlayerMove]);

    useEffect(() => {
    }, [players])

    useEffect(() => {
    }, [ball])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [homeFormationState, setHomeFormation] = useState<Formation>(Formation.FOTRTR);
    const [awayFormationState, setAwayFormation] = useState<Formation>(Formation.FOTRTR);
    const [homeCountryState, setHomeCountry] = useState<TeamCountry>(TeamCountry.SPAIN);
    const [awayCountryState, setAwayCountry] = useState<TeamCountry>(TeamCountry.ENGLAND);
    const { vw } = useScreenSize(); // width 값 사용


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
        dispatch(setSimulationOn())
        dispatch(startSimulation())
    }

    const handleMultiSelect = () => {
        if (!selectedPlayer || multiSelectedPlayer) {
            dispatch(clearMultiSelectedPlayers())
            return;
        }
        dispatch(setInitMultiSelectedPlayers())
    }

    const handleRecommendFormationModalOpen = (event: React.MouseEvent<HTMLElement>) => {
        handleReset()
        setIsModalOpen(true); // 모달 열기
    };

    const handleRecommendFormationModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleFormationUpdate = () => {
        handleReset()

        let addPlayers: { left: number, top: number, backNumber: number, position: PlayerPositionEnum, team: 'HOME' | 'AWAY' }[] = [];

        switch (homeFormationState) {
            case Formation.FOFOTW:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'HOME' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'HOME' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'HOME' },
                    { left: 26, top: 16, backNumber: 7, position: PlayerPositionEnum.LM, team: 'HOME' },
                    { left: 26, top: 38, backNumber: 8, position: PlayerPositionEnum.CM, team: 'HOME' },
                    { left: 26, top: 62, backNumber: 6, position: PlayerPositionEnum.CM, team: 'HOME' },
                    { left: 26, top: 84, backNumber: 11, position: PlayerPositionEnum.RM, team: 'HOME' },
                    { left: 37, top: 38, backNumber: 9, position: PlayerPositionEnum.ST, team: 'HOME' },
                    { left: 37, top: 62, backNumber: 10, position: PlayerPositionEnum.CF, team: 'HOME' },
                ]
                break;
            case Formation.FOTWTRON:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'HOME' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'HOME' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'HOME' },
                    { left: 26, top: 38, backNumber: 6, position: PlayerPositionEnum.DM, team: 'HOME' },
                    { left: 26, top: 62, backNumber: 8, position: PlayerPositionEnum.DM, team: 'HOME' },
                    { left: 37, top: 16, backNumber: 7, position: PlayerPositionEnum.LM, team: 'HOME' },
                    { left: 37, top: 84, backNumber: 11, position: PlayerPositionEnum.RM, team: 'HOME' },
                    { left: 37, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'HOME' },
                    { left: 45, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'HOME' },
                ]
                break;

            case Formation.FOTRTR:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'HOME' },
                    { left: 15, top: 16, backNumber: 3, position: PlayerPositionEnum.LB, team: 'HOME' },
                    { left: 15, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 84, backNumber: 2, position: PlayerPositionEnum.RB, team: 'HOME' },
                    { left: 30, top: 20, backNumber: 6, position: PlayerPositionEnum.LM, team: 'HOME' },
                    { left: 30, top: 50, backNumber: 8, position: PlayerPositionEnum.CM, team: 'HOME' },
                    { left: 30, top: 80, backNumber: 10, position: PlayerPositionEnum.RM, team: 'HOME' },
                    { left: 45, top: 20, backNumber: 7, position: PlayerPositionEnum.LF, team: 'HOME' },
                    { left: 45, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'HOME' },
                    { left: 45, top: 80, backNumber: 11, position: PlayerPositionEnum.RF, team: 'HOME' },
                ]
                break;

            case Formation.THFITW:
                addPlayers = [
                    { left: 5, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'HOME' },
                    { left: 15, top: 20, backNumber: 3, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 50, backNumber: 4, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 15, top: 80, backNumber: 5, position: PlayerPositionEnum.CB, team: 'HOME' },
                    { left: 30, top: 10, backNumber: 7, position: PlayerPositionEnum.LB, team: 'HOME' },
                    { left: 30, top: 30, backNumber: 8, position: PlayerPositionEnum.CM, team: 'HOME' },
                    { left: 30, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'HOME' },
                    { left: 30, top: 70, backNumber: 6, position: PlayerPositionEnum.CM, team: 'HOME' },
                    { left: 30, top: 90, backNumber: 2, position: PlayerPositionEnum.RB, team: 'HOME' },
                    { left: 45, top: 30, backNumber: 9, position: PlayerPositionEnum.ST, team: 'HOME' },
                    { left: 45, top: 70, backNumber: 11, position: PlayerPositionEnum.ST, team: 'HOME' },
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
                    { left: 95, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'AWAY' },
                    { left: 85, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'AWAY' },
                    { left: 85, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'AWAY' },
                    { left: 75, top: 16, backNumber: 11, position: PlayerPositionEnum.RM, team: 'AWAY' },
                    { left: 75, top: 38, backNumber: 8, position: PlayerPositionEnum.CM, team: 'AWAY' },
                    { left: 75, top: 62, backNumber: 6, position: PlayerPositionEnum.CM, team: 'AWAY' },
                    { left: 75, top: 84, backNumber: 7, position: PlayerPositionEnum.LM, team: 'AWAY' },
                    { left: 63, top: 38, backNumber: 9, position: PlayerPositionEnum.ST, team: 'AWAY' },
                    { left: 63, top: 62, backNumber: 10, position: PlayerPositionEnum.CF, team: 'AWAY' },
                ]
                break;
            case Formation.FOTWTRON:
                addPlayers = [
                    { left: 95, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'AWAY' },
                    { left: 85, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'AWAY' },
                    { left: 85, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'AWAY' },
                    { left: 75, top: 38, backNumber: 6, position: PlayerPositionEnum.DM, team: 'AWAY' },
                    { left: 75, top: 62, backNumber: 8, position: PlayerPositionEnum.DM, team: 'AWAY' },
                    { left: 65, top: 16, backNumber: 11, position: PlayerPositionEnum.RM, team: 'AWAY' },
                    { left: 65, top: 84, backNumber: 7, position: PlayerPositionEnum.LM, team: 'AWAY' },
                    { left: 65, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'AWAY' },
                    { left: 55, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'AWAY' },
                ]
                break;

            case Formation.FOTRTR:
                addPlayers = [
                    { left: 95, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'AWAY' },
                    { left: 85, top: 16, backNumber: 2, position: PlayerPositionEnum.RB, team: 'AWAY' },
                    { left: 85, top: 38, backNumber: 4, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 62, backNumber: 5, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 84, backNumber: 3, position: PlayerPositionEnum.LB, team: 'AWAY' },
                    { left: 70, top: 20, backNumber: 6, position: PlayerPositionEnum.RM, team: 'AWAY' },
                    { left: 70, top: 50, backNumber: 8, position: PlayerPositionEnum.CM, team: 'AWAY' },
                    { left: 70, top: 80, backNumber: 10, position: PlayerPositionEnum.LM, team: 'AWAY' },
                    { left: 55, top: 20, backNumber: 11, position: PlayerPositionEnum.RF, team: 'AWAY' },
                    { left: 55, top: 50, backNumber: 9, position: PlayerPositionEnum.ST, team: 'AWAY' },
                    { left: 55, top: 80, backNumber: 7, position: PlayerPositionEnum.LF, team: 'AWAY' },
                ]
                break;

            case Formation.THFITW:
                addPlayers = [
                    { left: 95, top: 50, backNumber: 1, position: PlayerPositionEnum.GK, team: 'AWAY' },
                    { left: 85, top: 20, backNumber: 3, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 50, backNumber: 4, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 85, top: 80, backNumber: 5, position: PlayerPositionEnum.CB, team: 'AWAY' },
                    { left: 70, top: 10, backNumber: 2, position: PlayerPositionEnum.RB, team: 'AWAY' },
                    { left: 70, top: 30, backNumber: 6, position: PlayerPositionEnum.CM, team: 'AWAY' },
                    { left: 70, top: 50, backNumber: 10, position: PlayerPositionEnum.AM, team: 'AWAY' },
                    { left: 70, top: 70, backNumber: 8, position: PlayerPositionEnum.CM, team: 'AWAY' },
                    { left: 70, top: 90, backNumber: 11, position: PlayerPositionEnum.LB, team: 'AWAY' },
                    { left: 55, top: 30, backNumber: 9, position: PlayerPositionEnum.ST, team: 'AWAY' },
                    { left: 55, top: 70, backNumber: 7, position: PlayerPositionEnum.ST, team: 'AWAY' },
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

    const handleAddPlayer = (id: number, left: number, top: number, name: string, backNumber: number, position: PlayerPositionEnum, team: 'HOME' | 'AWAY') => {
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
        dispatch(endSimulation())
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

    const handleSimulationEnd = () => {
        dispatch(endSimulation())
    }

    const handleShare = () => {

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

    useEffect(() => {
    }, [isSimulationStart])

    useEffect(() => {
    }, [vw])

    const isMovable = selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id;
    const isMovalbleBallClick = ball && !isPossibleBallMove
    const isMoveBackable = selectedPlayer && possibleMoveState.isPossible;
    const isPlayerMoveStopable = selectedPlayer && possibleMoveState.isPossible;
    const isBallMoveStopable = ball && isPossibleBallMove
    const isSimulationPossible = sequencesState.sequences.find((s) => s.sequenceNumber === sequencesState.currentSequenceNumber)
    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                onClick={() => handleAddPlusPlayer('HOME', PlayerPositionEnum.CM)}
                sx={{ cursor: 'pointer', mr: 2 }}
            >
                <AddOutlinedIcon sx={{ color: '#3B6FB2' }} />
                <Typography
                    variant="body1"
                    ml={1}
                >Home Team Player</Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                onClick={() => handleAddPlusPlayer('AWAY', PlayerPositionEnum.CM)}
                sx={{ cursor: 'pointer', mr: 2 }}
            >
                <AddOutlinedIcon sx={{ color: '#B23B7F' }} />
                <Typography
                    variant="body1"
                    ml={1}
                >Away Team Player</Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                onClick={!ball ? handleSetBall : undefined}
                sx={{
                    cursor: !ball ? 'pointer' : 'not-allowed',
                    opacity: !ball ? 1 : 0.5,
                    mr: 2
                }}>
                <AddOutlinedIcon sx={{ color: '#ff93ac' }} />
                <Typography variant="body1" ml={1} color={!ball ? 'auto' : 'gray'}>Ball</Typography>
            </Box>
            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />
            {/* <Box
                display="flex"
                alignItems="center"
                onClick={selectedPlayer ? handleMultiSelect : () => { }}
                sx={{
                    cursor: selectedPlayer ? 'pointer' : 'not-allowed',
                    opacity: selectedPlayer ? 1 : 0.5,
                    mr: 2
                }}
            >
                <DoneAllOutlinedIcon sx={{ color: 'green' }} />
                <Typography variant="body1" ml={1} color={selectedPlayer ? 'black' : 'gray'}>
                    Player Multi Select
                </Typography>
            </Box> */}

            <Box
                display="flex"
                alignItems="center"
                onClick={isMovable ? handlePlayerMovePossible : () => { }}
                sx={{
                    cursor: isMovable ? 'pointer' : 'not-allowed',
                    opacity: isMovable ? 1 : 0.5,
                    mr: 2
                }}>
                <MoveUpIcon sx={{ color: 'orange' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMovable ? 'auto' : 'gray'}
                >Player Move</Typography>
            </Box>


            <Box
                display="flex"
                alignItems="center"
                onClick={isMoveBackable ? handlePlayerRemoveBack : () => { }}
                sx={{
                    cursor: isMoveBackable ? 'pointer' : 'not-allowed',
                    opacity: isMoveBackable ? 1 : 0.5,
                    mr: 2
                }}>
                <ArrowBackIcon sx={{ color: '#78492a' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMoveBackable ? 'auto' : 'gray'}
                >Player Back</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isPlayerMoveStopable ? handlePlayerMoveNotPossible : () => { }}
                sx={{
                    cursor: isPlayerMoveStopable ? 'pointer' : 'not-allowed',
                    opacity: isPlayerMoveStopable ? 1 : 0.5,
                    mr: 2
                }}>
                <StopIcon sx={{ color: 'red' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isPlayerMoveStopable ? 'auto' : 'gray'}
                >Player Stop</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={selectedPlayer ? handlePlayerRemove : () => { }}
                sx={{
                    cursor: selectedPlayer ? 'pointer' : 'not-allowed',
                    opacity: selectedPlayer ? 1 : 0.5,
                    mr: 2
                }}>
                <RemoveIcon sx={{ color: '	#89E9D3' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={selectedPlayer ? 'auto' : 'gray'}
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
                    opacity: isMovalbleBallClick ? 1 : 0.5,
                    mr: 2
                }}>
                <MoveUpIcon sx={{ color: 'orange' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMovalbleBallClick ? 'auto' : 'gray'}
                >Ball Move</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isMoveBackable ? handlePlayerRemoveBack : () => { }}
                sx={{
                    cursor: isMoveBackable ? 'pointer' : 'not-allowed',
                    opacity: isMoveBackable ? 1 : 0.5,
                    mr: 2
                }}>
                <ArrowBackIcon sx={{ color: '#78492a' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isMoveBackable ? 'auto' : 'gray'}
                >Ball Back</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isBallMoveStopable ? handleBallMoveNotPossible : () => { }}
                sx={{
                    cursor: isBallMoveStopable ? 'pointer' : 'not-allowed',
                    opacity: isBallMoveStopable ? 1 : 0.5,
                    mr: 2
                }}>
                <StopIcon sx={{ color: 'red' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isBallMoveStopable ? 'auto' : 'gray'}
                >Ball Stop</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={ball ? handleBallRemove : () => { }}
                sx={{
                    cursor: ball ? 'pointer' : 'not-allowed',
                    opacity: ball ? 1 : 0.5,
                    mr: 2
                }}>
                <RemoveIcon sx={{ color: '	#89E9D3' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={ball ? 'auto' : 'gray'}
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
                    opacity: isSimulationPossible ? 1 : 0.5,
                    mr: 2
                }}>
                <PlayArrowOutlinedIcon sx={{ color: '#89B2E9' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isSimulationPossible ? 'auto' : 'gray'}
                >Simulation</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isSimulationStart ? handleSimulationEnd : () => { }}
                sx={{
                    cursor: isSimulationStart ? 'pointer' : 'not-allowed',
                    opacity: isSimulationStart ? 1 : 0.5,
                    mr: 2
                }}>
                <PlayArrowOutlinedIcon sx={{ color: '#89B2E9' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isSimulationStart ? 'auto' : 'gray'}
                >Simulation Reset</Typography>
            </Box>

            <Box display="flex" alignItems="center" onClick={handleReset} sx={{ cursor: 'pointer', mr: 2 }}>
                <RestartAltIcon sx={{ color: '#D389E9' }} />
                <Typography variant="body1" ml={1}>Ground Reset</Typography>
            </Box>

            <Box
                width="100%"
                my={2}
                borderBottom="1px solid gray"
                sx={{
                    opacity: 0.5
                }}
            />

            <Box display="flex" alignItems="center" onClick={handleRecommendFormationModalOpen} sx={{ cursor: 'pointer', mr: 2 }}>
                <StarBorderOutlinedIcon sx={{ color: '#FFD400' }} />
                <Typography variant="body1" ml={1}>Recommend Formation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handleShare} sx={{ cursor: 'pointer', mr: 2 }}>
                <IosShareIcon sx={{ color: 'purple' }} />
                <Typography variant="body1" ml={1}>Share</Typography>
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