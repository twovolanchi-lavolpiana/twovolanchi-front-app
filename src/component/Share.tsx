import { CloseOutlined, IosShare } from "@mui/icons-material"
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { useEffect, useState } from "react";

export const Share = () => {
    const players = useSelector((state: RootState) => state.players)
    const ball = useSelector((state: RootState) => state.ball.ball);
    const sequencesState = useSelector((state: RootState) => state.sequences);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedShareUrl, setGeneratedShareUrl] = useState("");
    const [generatedEditUrl, setGeneratedEditUrl] = useState("");

    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
    }, [players])

    useEffect(() => {
    }, [ball])

    useEffect(() => {
    }, [sequencesState])

    const handleShare = async () => {
        const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

        const requestBody = {
            players: players.players.map(player => ({
                id: player.id,
                backNumber: player.backNumber,
                name: player.name,
                position: player.position,
                team: player.team,
                leftPercent: player.left.toString(),
                topPercent: player.top.toString()
            })),
            tactics: {
                currentSequenceNumber: sequencesState.currentSequenceNumber,
                sequences: sequencesState.sequences.map(sequence => ({
                    sequenceNumber: sequence.sequenceNumber,
                    players: sequence.moves.map(move => ({
                        id: move.id,
                        positions: move.sequence.map(position => ({
                            leftPercent: position.left.toString(),
                            topPercent: position.top.toString(),
                            team: position.team
                        }))
                    })),
                    ball: sequence.balls.map(ball => ({
                        leftPercent: ball.left.toString(),
                        topPercent: ball.top.toString()
                    }))
                }))
            }
        };

        try {
            const response = await fetch(`http://localhost:8080/api/v1/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                mode: 'cors' // 명시적으로 CORS 요청임을 설정
            });

            if (!response.ok) {
                console.log("response = ", response);
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Response Data:', responseData);

            // 응답에서 shortKey 추출 및 URL 생성
            const shortEditKey = responseData.body.shortEditKey;
            const shortShareKey = responseData.body.shortShareKey;
            const currentUrl = window.location.origin;
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
        <IosShare sx={{ color: 'purple' }} />
        <Typography variant="body1" ml={1}>Share</Typography>
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
                we don't provide login for accessibility.😭 <br />
                Please use the links below <br />
                to edit or share your data! 😄
            </Typography>

            <Typography variant="body2">Edit URL</Typography>
            <TextField
                value={generatedEditUrl}
                InputProps={{
                    readOnly: true,
                }}
                onClick={() => handleCopyUrl(generatedEditUrl)}
            />

            <Typography variant="body2">Share URL</Typography>
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