import React, { useCallback } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/material';
import { PlayerPositionEnum } from '../PlayerPositionEnum';

export type SharePlayerProps = {
    id: number,
    backNumber: number,
    name: string,
    position: PlayerPositionEnum,
    team: 'HOME' | 'AWAY',
    left: number,
    top: number,
    imgRef: React.RefObject<HTMLDivElement>,
}

export const ShareMovePlayer: React.FC<SharePlayerProps> = ({ id, team, backNumber, name, position, left, top, imgRef }) => {
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

    const playerStyle = getPlayerStyle(left, top);

    return (
        <div> <div
            style={{
                position: 'absolute',
                left: `${playerStyle.left}`,
                top: `${playerStyle.top}`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                zIndex: 100,
                pointerEvents: 'none'
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
                        <CircleIcon
                                sx={{
                                    color: team === 'HOME' ? '#3B6FB2' : '#B23B7F',
                                    fontSize: ['1.5rem', '2.3rem'],
                                    pointerEvents: 'auto'
                                }}
                            />
                        <span
                            style={{
                                position: 'absolute',
                                color: 'white', // 텍스트 색상
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                pointerEvents: 'none'
                            }}
                        >
                            {position}
                        </span>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '0.1rem', // 아이콘과 이름 사이의 간격
                            color: 'white', // 이름 텍스트 색상
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {name}
                    </Box>
                </Box>
            </div>
        </div>
    );
}