import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface PlayerCardProps {
    onAddPlayer: (team: 'red' | 'blue', x: number, y: number) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ onAddPlayer }) => {
    const handleAddPlayer = (team: 'red' | 'blue') => {
        const x = 205; // 임의의 x 좌표
        const y = 298; // 임의의 y 좌표
        onAddPlayer(team, x, y);
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
                        onClick={() => handleAddPlayer('red')}
                    />
                    <Chip
                        variant="outlined"
                        color="primary"
                        icon={<AddCircleOutlineOutlinedIcon />}
                        label="Blue Team Player"
                        onClick={() => handleAddPlayer('blue')}
                    />
                </Stack>
            </div>
        </div>
    )
}