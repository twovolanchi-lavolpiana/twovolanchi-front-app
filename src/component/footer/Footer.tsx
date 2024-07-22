import { GitHub } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'transparent', py: 6 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="white"
                    component="p"
                >
                    Create By Twovolanchi
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="white"
                    component="p"
                >
                    Image From Freepik
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton
                        component="a"
                        href="https://github.com/gosekose"
                        target="_blank"
                        sx={{ color: 'inherit' }}
                    >
                        <GitHub />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://gose-kose.tistory.com"
                        target="_blank"
                        sx={{ color: 'inherit' }}
                    >
                        <ShareIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
}