import React, { useCallback, useEffect, useState } from 'react';
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CircleIcon from '@mui/icons-material/Circle';

import { PlayerPosition } from './PlayerPosition';
import { Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossiblePlayerMoveState } from '../store/PossiblePlayerMoveSlice';
import { PlayerPositionEnum } from './PlayerPositionEnum';

export type PlayerProps = {
    id: number,
    backNumber: number,
    name: string,
    team: 'home' | 'away',
    left: number,
    top: number,
    imgRef: React.RefObject<HTMLDivElement>,
    position: PlayerPositionEnum,
    onClick: (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => void;
}

export const DraggablePlayer: React.FC<PlayerProps> = ({ id, team, backNumber, name, left, top, imgRef, position, onClick }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const multiSelectedPlayers = useSelector((state: RootState) => state.player.multiSelectedPlayers)
    const playersState = useSelector((state: RootState) => state.players.players);
    const isPossibleMoveState = useSelector((state: RootState) => state.possiblePlayerMove.isPossible);
    const playerViewState = useSelector((state: RootState) => state.playerView.playerView);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !isPossibleMoveState) return;
        dispatch(setPossiblePlayerMoveState({ playerId: null, isPossible: false }))
    }

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: () => {
            handlePlayerMoveNotPossible()
            return { id, backNumber, name, left, top, team, position, type: ItemTypes.PLAYER };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, backNumber, name, left, top, team, position]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible()
        onClick(event, { id, team, backNumber, name, left, top, position });
    };

    const renderPlayerInfo = () => {
        switch (playerViewState) {
            case 'backNumber':
                return backNumber;
            case 'position':
                return position;
            case 'name':
                return name;
            case 'backNumber&position':
                return `${backNumber} - ${position}`;
            case 'all':
                return `${name} - ${backNumber} - ${position}`;
            default:
                return backNumber;
        }
    }

    const getPlayerStyle = useCallback((leftPercent: number, topPercent: number) => {
        if (!imgRef.current) return { left: 0, top: 0 };
        const rect = imgRef.current.getBoundingClientRect();
        const left = (leftPercent / 100) * rect.width;
        const top = (topPercent / 100) * rect.height;

        const defaultLeft = rect.x + window.scrollX;
        const defaultTop = rect.y + window.scrollY;

        return {
            left: `${defaultLeft + left}px`,
            top: `${defaultTop + top}px`
        };
    }, [imgRef]);


    useEffect(() => {
    }, [isPossibleMoveState]);

    useEffect(() => {
    }, [playersState])

    useEffect(() => {
    }, [selectedPlayer])

    useEffect(() => {
    }, [multiSelectedPlayers])

    const playerStyle = getPlayerStyle(left, top);

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
        > <div
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
                        flexDirection: 'column', // 수직 정렬
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {selectedPlayer && id === selectedPlayer.id ? (
                            <CircleIcon
                                className="draggable-icon"
                                sx={{
                                    color: team === 'home' ? '#3B6FB2' : '#B23B7F',
                                    fontSize: '2.3rem',
                                    boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.8)', // 외곽선 빛나게 하기
                                    borderRadius: '50%', // 원형 외곽선
                                }}
                            />
                        ) : (
                            <CircleIcon
                                className="draggable-icon"
                                sx={{
                                    color: team === 'home' ? '#3B6FB2' : '#B23B7F',
                                    fontSize: '2.3rem',
                                }}
                            />
                        )}
                        <span
                            style={{
                                position: 'absolute',
                                color: 'white', // 텍스트 색상
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {renderPlayerInfo()}
                        </span>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '0.1rem', // 아이콘과 이름 사이의 간격
                            color: 'black', // 이름 텍스트 색상
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {name}
                    </Box>
                </Box>

            </div>

            {multiSelectedPlayers && multiSelectedPlayers.map((element) => {
                const { left: elementLeft, top: elementTop } = getPlayerStyle(element.left, element.top)
                return <div
                    key={element.id}
                    style={{
                        position: 'absolute',
                        left: `${elementLeft}`,
                        top: `${elementTop}`,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'move',
                        opacity: isDragging ? 0.5 : 1,
                        zIndex: 100,
                    }}
                >
                    <Box
                        key={element.id}
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
                                color: element.team === 'home' ? '#3B6FB2' : '#B23B7F',
                                fontSize: '2.3rem',
                                boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.8)', // 외곽선 빛나게 하기
                                borderRadius: '50%', // 원형 외곽선
                            }}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                color: 'white', // 텍스트 색상
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {renderPlayerInfo()}
                        </span>
                    </Box>
                </div>
            })}
        </div>
    );
}