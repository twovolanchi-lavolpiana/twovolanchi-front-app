import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';

type SettingBoxProps = {
    text: string,
    onClick: React.ReactEventHandler
}


export default function SettingBox({ text, onClick }: SettingBoxProps) {
    return (
        <ThemeProvider
            theme={{
                palette: {
                    primary: {
                        main: '#007FFF',
                        dark: '#0066CC',
                    },
                },
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
                onClick={onClick}
            >
                {text}
            </Box>
        </ThemeProvider>
    );
}