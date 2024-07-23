import React, { useCallback } from 'react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import { Box } from '@mui/material';

export type ShareBallProps = {
    left: number,
    top: number,
    imgRef: React.RefObject<HTMLDivElement>
}

export const ShareMoveBall: React.FC<ShareBallProps> = ({ left, top, imgRef }) => {

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

    const ballStyle = getBallStyle(left, top);

    return (
        <div> <div
            style={{
                position: 'absolute',
                left: `${ballStyle.left}`,
                top: `${ballStyle.top}`,
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
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SportsSoccerIcon
                        sx={{
                            color: 'black',
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