import React, { useCallback, useEffect, useState } from 'react';
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CircleIcon from '@mui/icons-material/Circle';

import { PlayerPosition } from './PlayerPosition';
import { Box, Modal, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { selectPlayer } from '../store/PlayerSlice';
import { PlayerPositionEnum } from './PlayerPositionEnum';


type PlayerProps = {
    id: number,
    backNumber: number,
    team: 'home' | 'away',
    left: number,
    top: number,
    imgRef: React.RefObject<HTMLImageElement>,
    position: PlayerPositionEnum,
    onClick: (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => void;
}

export const DraggablePlayer: React.FC<PlayerProps> = ({ id, team, backNumber, left, top, imgRef, position, onClick }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [positionState, setPosition] = useState<PlayerPositionEnum>(PlayerPositionEnum.CM);
    const [backNumberState, setBackNumber] = useState<number>(0);
    const playerViewState = useSelector((state: RootState) => state.playerView.playerView);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: () => {
            handlePlayerMoveNotPossible()
            return { id, backNumber, left, top, team, position };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, backNumber, left, top, team, position]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible()
        onClick(event, { id, team, backNumber, left, top, position });
    };

    const handleDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible();
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
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
        dispatch(selectPlayer({
            id: selectedPlayer.id,
            backNumber: backNumberState,
            team: selectedPlayer.team,
            left: selectedPlayer.left,
            top: selectedPlayer.top,
            position: positionState,
        }));
        setIsModalOpen(false); // 모달 닫기
    };

    const renderPlayerInfo = () => {
        switch (playerViewState) {
            case 'backNumber':
                return backNumberState;
            case 'position':
                return positionState;
            case 'name':
                return backNumberState || '';
            case 'backNumber&position':
                return `${backNumberState} - ${positionState}`;
            case 'all':
                return `${''} - ${backNumberState} - ${positionState}`;
            default:
                return backNumberState;
        }
    }

    const renderSaveButtonInfo = () => {
        if (!selectPlayer) return '#3BB24A'
        switch (selectedPlayer?.team) {
            case 'home':
                return '#3B6FB2';
            case 'away':
                return '#B23B7F';
            default:
                return '#3BB24A';
        }
    }

    const getPlayerStyle = useCallback((leftPercent: number, topPercent: number) => {
        if (!imgRef.current) return { left: 0, top: 0 };
        const rect = imgRef.current.getBoundingClientRect();
        const left = (leftPercent / 100) * rect.width;
        const top = (topPercent / 100) * rect.height;

        const defaultLeft = rect.x;
        const defaultTop = rect.y;

        console.log("실제 퍼센트 left: ", leftPercent)
        console.log("실제 퍼센트 top: ", topPercent)
        console.log("실제 위치 left: ", defaultLeft + left)
        console.log("실제 위치 top: ", defaultTop + top)

        return {
            left: `${defaultLeft + left}px`,
            top: `${defaultTop + top}px`
        };
    }, [imgRef]);


    useEffect(() => {
    }, [possibleMoveState]);

    const playerStyle = getPlayerStyle(left, top);

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={{
                position: 'absolute',
                left: `${playerStyle.left}`,
                top: `${playerStyle.top}`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
                zIndex: 100,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircleIcon
                    className="draggable-icon"
                    sx={{
                        color: team === 'home' ? '#3B6FB2' : '#B23B7F',
                        fontSize: '2.5rem',
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        color: 'white', // 텍스트 색상
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {renderPlayerInfo()}
                </span>
            </Box>

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
                            <MenuItem value={PlayerPositionEnum.ST}>ST(FW)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CF}>CF(FW)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.LW}>LW(FW)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.RW}>RW(FW)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.AM}>AM(MF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.LM}>LM(MF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.RM}>RM(MF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CM}>CM(MF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.DM}>DM(MF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.CB}>CB(DF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.WLB}>WLB(DF)</MenuItem>
                            <MenuItem value={PlayerPositionEnum.WRB}>WRB(DF)</MenuItem>
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