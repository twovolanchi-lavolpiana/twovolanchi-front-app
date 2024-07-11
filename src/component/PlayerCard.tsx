import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const PlayerCard = () => {

    const handleRedTeamClick = () => {
        console.log("Red 플레이어 추가")
    };

    const handleBlueTeamClick = () => {
        console.log("Blue 플레이어 추가")
    };


    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    <Chip
                        variant="outlined"
                        color="error"
                        icon={<AddCircleOutlineOutlinedIcon />}
                        label="Red Team Player"
                        onClick={handleRedTeamClick}
                    />
                    <Chip
                        variant="outlined"
                        color="primary"
                        icon={<AddCircleOutlineOutlinedIcon />}
                        label="Blue Team Player"
                        onClick={handleBlueTeamClick}
                    />
                </Stack>
            </div>
        </div>
    )
}