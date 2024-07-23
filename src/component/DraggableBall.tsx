import React, { useCallback, useEffect, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import { Box } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';

export type BallProps = {
    leftPercent: number,
    topPercent: number,
    imgRef: React.RefObject<HTMLDivElement>
}

export const DraggableBall: React.FC<BallProps> = ({ leftPercent, topPercent, imgRef }) => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const isPossiblePlayerMove = useSelector((state: RootState) => state.possiblePlayerMove.isPossible);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.BALL,
        item: () => {
            return { leftPercent, topPercent, type: ItemTypes.BALL };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [leftPercent, topPercent]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => { };

    const getBallStyle = useCallback((leftPercent: number, topPercent: number) => {
        if (!imgRef.current) return { left: 0, top: 0 };
        const rect = imgRef.current.getBoundingClientRect();
        const left = (leftPercent / 100) * rect.width;
        const top = (topPercent / 100) * rect.height;

        const defaultLeft = rect.left + window.scrollX;
        const defaultTop = rect.top + window.scrollY;

        return {
            left: `${defaultLeft + left}px`,
            top: `${defaultTop + top}px`
        };
    }, [imgRef]);


    useEffect(() => {
    }, [isPossiblePlayerMove]);

    useEffect(() => {
    }, [selectedPlayer])

    const ballStyle = getBallStyle(leftPercent, topPercent);

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
        > <div
            style={{
                position: 'absolute',
                left: `${ballStyle.left}`,
                top: `${ballStyle.top}`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
                zIndex: 100,
                pointerEvents: 'none'
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
                    <SportsSoccerIcon
                        className="draggable-icon"
                        sx={{
                            color: 'white',
                            fontSize: '1.5rem',
                            boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.8)', // 외곽선 빛나게 하기
                            borderRadius: '50%', // 원형 외곽선
                            pointerEvents: 'auto'
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
                    </span>
                </Box>
            </div>
        </div>
    );
}