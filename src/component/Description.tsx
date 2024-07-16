import { Button, Card, CardActionArea, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";

export const Description = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('2-3 BuildUp');
    const [description, setDescription] = useState('Robin Le Normand and Laporte form a pair, while Cucurella, Rodrigo, and Carvajal form a trio.');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Title and description will be saved when the dialog is closed
        handleClose();
    };

    return (
        <Card sx={{
            maxWidth: 345,
        }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={handleClickOpen}>
                        <SettingsIcon />
                    </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}