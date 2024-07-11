import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import FaceIcon from '@mui/icons-material/Face';
import { Box, Typography } from '@mui/material';

export const PlayerProfile = () => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    return (
        <Box className="cards"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                border: '1px solid green',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '200px',
            }}
        >
            <FaceIcon sx={{ fontSize: '2rem', color: 'green' }} />
            <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="h6" component="h3" sx={{ color: 'green', margin: 0 }}>
                    Profile
                </Typography>
                <Typography sx={{ color: 'green', margin: '5px 0' }}>
                    Team: {selectedPlayer ? selectedPlayer.team : ''}
                </Typography>
                <Typography sx={{ color: 'green', margin: '5px 0' }}>
                    BackNumber: {selectedPlayer?.backNumber}
                </Typography>
            </Box>
        </Box>
    );
}