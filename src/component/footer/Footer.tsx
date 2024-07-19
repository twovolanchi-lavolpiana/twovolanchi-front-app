import { GitHub } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Lavolpiana
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Created By Koseyun
                </Typography>
                <Copyright />
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