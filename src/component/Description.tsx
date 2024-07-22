import { Button, Card, CardActionArea, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material"
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
                    style={{ flexGrow: 1, wordWrap: 'break-word', wordBreak: 'break-word', color: "white" }}>
                    {title}
                </Typography>
                <IconButton onClick={handleClickOpen}>
                    <SettingsIcon />
                </IconButton>
            </div>
            <Typography
                variant="body2"
                color="text.secondary"
                style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', color: "white" }}
            >
                {description}
            </Typography>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('Edit Details')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t('Title')}
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t('Description')}
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('Cancel')}</Button>
                    <Button onClick={handleSave}>{t('Save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}