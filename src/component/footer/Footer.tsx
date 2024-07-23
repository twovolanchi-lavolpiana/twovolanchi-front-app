import { GitHub } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';

export default function Footer() {

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <Box component="footer" sx={{ bgcolor: 'transparent', py: 6 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="white"
                    component="p"
                >
                    Lavolpiana
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="white"
                    component="p"
                >
                    <a
                        href="https://kr.freepik.com/free-vector/gradient-dynamic-purple-lines-background_15151444.htm#query=%EB%B3%B4%EB%9D%BC%EC%83%89%20%EB%B0%B0%EA%B2%BD&position=1&from_view=keyword&track=ais_user&uuid=dba32f1f-0cc2-400c-a417-755e8718de1f"
                        referrerPolicy="no-referrer"
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        Image From Freepik
                    </a>
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