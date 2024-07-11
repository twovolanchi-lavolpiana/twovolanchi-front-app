import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

export const PlayerCard = () => {
    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    <Chip variant="outlined" color="error" icon={<FaceIcon />} label="Red Team Player"/>
                    <Chip variant="outlined" color="primary" icon={<FaceIcon />} label="Blue Team Player"/>
                </Stack>
            </div>
        </div>
    )
}