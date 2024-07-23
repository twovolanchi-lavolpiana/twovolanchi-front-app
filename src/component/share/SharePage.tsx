import { Box, CircularProgress, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { ShareBoard } from "./ShareBoard";
import NotFoundPage from "../error/NotFound";
import { ResponseData } from "../../store/Tactics";
import background from '../../image/board.webp';
import '../../App.css'

export interface ShareComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

interface ShareKeyParams {
    shareKey: string
}

const SharePage = (props: ShareComponentProps) => {
    const { shareKey } = useParams<keyof ShareKeyParams>() as ShareKeyParams;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ResponseData | null>(null);
    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

    useEffect(() => {
        const handleShare = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/${shareKey}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData: ResponseData = await response.json();

                setData(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        handleShare();
    }, [shareKey]);

    useEffect(() => {
    }, [isLoading])

    if (isLoading) {
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }

    if (!data) {
        return (
            <NotFoundPage
                darkMode={props.darkMode}
                onThemeChange={props.onThemeChange}
            />
        );
    }

    return <>
        <div className="App">
            <div className="App-container">
                <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
                <div className="second" style={{ overflow: 'hidden' }}>
                    <img src={background} style={{
                        overflow: 'hidden'
                    }} />
                </div>
                <div className="third">
                    <ShareBoard
                        title={data.body.title}
                        description={data.body.description}
                        players={data.body.players}
                        tactics={data.body.tactics}
                    />
                </div>
            </div>
        </div>
    </>
};

export default SharePage;