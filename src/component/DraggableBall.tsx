import React, { useCallback, useEffect, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import { Box } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';

export type BallProps = {
    left: number,
    top: number,
    imgRef: React.RefObject<HTMLDivElement>
}

export const DraggableBall: React.FC<BallProps> = ({ left, top, imgRef }) => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const isPossiblePlayerMove = useSelector((state: RootState) => state.possiblePlayerMove.isPossible);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.BALL,
        item: () => {
            return { left, top, type: ItemTypes.BALL };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [left, top]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => { };

    const getBallStyle = useCallback((leftPercent: number, topPercent: number) => {
        if (!imgRef.current) return { left: 0, top: 0 };
        const rect = imgRef.current.getBoundingClientRect();
        const left = (leftPercent / 100) * rect.width;
        const top = (topPercent / 100) * rect.height;

        const defaultLeft = rect.left;
        const defaultTop = rect.top;

        return {
            left: `${defaultLeft + left}px`,
            top: `${defaultTop + top}px`
        };
    }, [imgRef]);


    useEffect(() => {
    }, [isPossiblePlayerMove]);

    useEffect(() => {
    }, [selectedPlayer])

    const ballStyle = getBallStyle(left, top);

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
                            color: 'black',
                            fontSize: '1.5rem',
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
                    </span>
                </Box>
            </div>
        </div>
    );
}