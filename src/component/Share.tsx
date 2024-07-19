import { CloseOutlined, IosShare } from "@mui/icons-material"
import { Box, IconButton, Modal, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Share = () => {
    const { t } = useTranslation();
    const players = useSelector((state: RootState) => state.players)
    const ball = useSelector((state: RootState) => state.ball.ball);
    const tacticsDescription = useSelector((state: RootState) => state.tacticsDescription)
    const sequencesState = useSelector((state: RootState) => state.sequences);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedShareUrl, setGeneratedShareUrl] = useState("");
    const [generatedEditUrl, setGeneratedEditUrl] = useState("");

    const handleClose = () => setIsModalOpen(false);

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

    useEffect(() => {
    }, [players])

    useEffect(() => {
    }, [ball])

    useEffect(() => {
    }, [sequencesState])

    const handleShare = async () => {
        const requestBody = {
            title: tacticsDescription.title,
            description: tacticsDescription.description,
            players: players.players.map(player => ({
                id: player.id,
                backNumber: player.backNumber,
                name: player.name,
                position: player.position,
                team: player.team,
                leftPercent: player.leftPercent,
                topPercent: player.topPercent
            })),
            tactics: {
                currentSequenceNumber: sequencesState.currentSequenceNumber,
                sequences: sequencesState.sequences.map(sequence => ({
                    sequenceNumber: sequence.sequenceNumber,
                    players: sequence.players.map(move => ({
                        id: move.id,
                        positions: move.positions.map(position => ({
                            leftPercent: position.leftPercent,
                            topPercent: position.topPercent,
                            team: position.team
                        }))
                    })),
                    balls: sequence.balls.map(ball => ({
                        leftPercent: ball.leftPercent,
                        topPercent: ball.topPercent
                    }))
                }))
            }
        };

        try {
            const response = await fetch(`${baseUrl}/api/v1/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                mode: 'cors' // 명시적으로 CORS 요청임을 설정
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            // 응답에서 shortKey 추출 및 URL 생성
            const shortEditKey = responseData.body.shortEditKey;
            const shortShareKey = responseData.body.shortShareKey;
            const currentUrl = "https://www.lavolpiana.com"
            const generatedEditUrl = `${currentUrl}/edit/${shortEditKey}`;
            const generatedShareUrl = `${currentUrl}/${shortShareKey}`;


            setGeneratedEditUrl(generatedEditUrl);
            setGeneratedShareUrl(generatedShareUrl)
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("URL copied to clipboard");
    };

    const isPossible = sequencesState.sequences[sequencesState.currentSequenceNumber] &&
        (sequencesState.sequences[sequencesState.currentSequenceNumber].players.length > 0 ||
            sequencesState.sequences[sequencesState.currentSequenceNumber].balls.length > 0
        )

    return <>
        <Box
            display="flex"
            alignItems="center"
            onClick={isPossible ? handleShare : () => { }}
            sx={{
                cursor: isPossible ? 'pointer' : 'not-allowed',
                opacity: isPossible ? 1 : 0.5,
                mr: 2
            }}
        >
            <IosShare sx={{ color: 'purple' }} />
            <Typography
                variant="body1"
                ml={1}
                color={isPossible ? 'auto' : 'gray'}
            >{t('Share')}</Typography>
        </Box>

        <Modal open={isModalOpen} onClose={handleClose}>
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
                    gap: 2,
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <CloseOutlined />
                </IconButton>

                <Typography variant="body2" gutterBottom>
                    {t('Share Message')}
                </Typography>

                <Typography variant="body2">{t('Edit URL')}</Typography>
                <TextField
                    value={generatedEditUrl}
                    InputProps={{
                        readOnly: true,
                    }}
                    onClick={() => handleCopyUrl(generatedEditUrl)}
                />

                <Typography variant="body2">{t('Share URL')}</Typography>
                <TextField
                    value={generatedShareUrl}
                    InputProps={{
                        readOnly: true,
                    }}
                    onClick={() => handleCopyUrl(generatedShareUrl)}
                />
            </Box>
        </Modal>
    </>
}