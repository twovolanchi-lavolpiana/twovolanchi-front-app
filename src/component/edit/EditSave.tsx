import { CloseOutlined, IosShare } from "@mui/icons-material"
import { Box, IconButton, Modal, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useEffect, useState } from "react";
import { EditProps } from "./EditBoard";
import { useTranslation } from "react-i18next";

export const EditSave: React.FC<EditProps> = ({ editKey }) => {
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
            const response = await fetch(`${baseUrl}/api/v1/edit/${editKey}`, {
                method: 'PUT',
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

    return <>
        <Box display="flex" alignItems="center" onClick={handleShare} sx={{ cursor: 'pointer', mr: 2 }}>
            <IosShare sx={{ color: 'white' }} />
            <Typography variant="body1" ml={1} style={{ color: "white" }}>Save</Typography>
        </Box>

        <Modal
            open={isModalOpen}
            onClose={handleClose}
            sx={{
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정 배경
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%))', // 그라데이션 배경
                    color: 'var(--light)',
                    borderRadius: '.8rem',
                    boxShadow: 'var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1)',
                    border: '2px solid rgba(63, 81, 181, 0.7)', // 외곽선 설정
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // 요소 간의 간격
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white'
                    }}
                >
                    <CloseOutlined />
                </IconButton>

                <Typography
                    variant="body2"
                    gutterBottom
                    color={'white'}
                >
                    {t('Edit Message')}
                </Typography>

                <Typography
                    variant="body2"
                    color={'white'}>
                    {t('Share URL')}</Typography>
                <TextField
                    value={generatedShareUrl}
                    sx={{
                        mb: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.1)', // 배경색 추가
                        borderRadius: 1, // 테두리 둥글게
                        '& .MuiInputBase-input': {
                            color: 'white', // 텍스트 색상
                        },
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
                    onClick={() => handleCopyUrl(generatedShareUrl)}
                />
            </Box>
        </Modal>
    </>
}