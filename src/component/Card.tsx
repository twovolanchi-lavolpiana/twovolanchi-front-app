import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';

type LeftAlignedChipProps = {
    icon: React.ReactElement;
    label: string;
    [key: string]: any; // 다른 모든 추가 props를 받기 위해 사용
};


const LeftAlignedChip: React.FC<LeftAlignedChipProps> = ({ icon, label, ...props }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Chip
                icon={icon}
                label={label}
                sx={{
                    justifyContent: 'flex-start',
                    width: '100%',
                }}
                {...props}
            />
        </Box>
    );
};

export const Card = () => {
    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    <Chip variant="outlined" color="primary" icon={<SkipNextOutlinedIcon />} label="Simulation" />
                    <Chip variant="outlined" color="primary" icon={<NavigateNextOutlinedIcon />} label="Next Sequence" />
                    {/* <LeftAlignedChip variant="outlined" color="primary" icon={<SportsSoccerOutlinedIcon />} label="Pass" />
                    <LeftAlignedChip variant="outlined" color="primary" icon={<SkipNextOutlinedIcon />} label="Simulation" />
                    <LeftAlignedChip variant="outlined" color="primary" icon={<NavigateNextOutlinedIcon />} label="Next Sequence" /> */}
                </Stack>
            </div>
        </div>
    )
}