import { Box, Button, Card, CardActionArea, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { setTacticsDescription } from "../store/TacticsDescriptionSlice";
import { useTranslation } from "react-i18next";

export const Description = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("My Tactics");
    const [description, setDescription] = useState("My Tactics Description. Please Edit Tactics");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        dispatch(setTacticsDescription({ title, description }))
        handleClose();
    };

    return (
        <div>
            <div style={{ width: '100%', margin: 'auto', overflow: 'hidden', display: 'flex' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ flexGrow: 1, wordWrap: 'break-word', wordBreak: 'break-word', color: 'white' }}>
                    {title}
                </Typography>
                <IconButton onClick={handleClickOpen}>
                    <SettingsIcon sx={{ color: 'white' }} />
                </IconButton>
            </div>
            <Typography
                variant="body2"
                color="text.secondary"
                style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', color: 'white' }}
            >
                {description}
            </Typography>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    backdropFilter: 'blur(5px)', // 배경 흐림 효과
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정 배경
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%))', // 그라데이션 배경
                        color: 'var(--light)',
                        borderRadius: '.8rem',
                        boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.5)', // 그림자 효과 추가
                        border: '2px solid rgba(63, 81, 181, 0.7)', // 외곽선 설정
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 요소 간의 간격
                    }}
                >
                    <Typography
                        variant="h6"
                        id="modal-title"
                        sx={{
                            mb: 2,
                            color: 'white',
                        }}>
                        {t('Edit Details')}
                    </Typography>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={t('Title')}
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="dense"
                            label={t('Description')}
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                marginTop: 2, // 버튼과 다른 요소들 간의 간격
                                color: 'white', // 텍스트 색상
                                backgroundColor: '#B23B7F', // 배경 색상
                                '&:hover': {
                                    backgroundColor: '#B23B7F', // 호버 시 배경 색상을 기본 상태와 동일하게 설정
                                    borderColor: 'var(--border-color)', // 호버 시 테두리 색상을 기본 상태와 동일하게 설정
                                    transform: 'translateY(-.2rem)',
                                },
                                border: '1px solid var(--border-color)',
                                borderRadius: '100rem',
                            }}
                            variant="contained"
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            onClick={handleSave}
                            sx={{
                                marginTop: 2, // 버튼과 다른 요소들 간의 간격
                                color: 'white', // 텍스트 색상
                                backgroundColor: '#3B6FB2', // 배경 색상
                                '&:hover': {
                                    backgroundColor: '#3B6FB2', // 호버 시 배경 색상을 기본 상태와 동일하게 설정
                                    borderColor: 'var(--border-color)', // 호버 시 테두리 색상을 기본 상태와 동일하게 설정
                                    transform: 'translateY(-.2rem)',
                                },
                                border: '1px solid var(--border-color)',
                                borderRadius: '100rem',
                            }}
                            variant="contained"
                        >
                            {t('Save')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}