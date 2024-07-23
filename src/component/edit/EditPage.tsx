import { Box, CircularProgress, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { ResponseData } from "../../store/Tactics";
import NotFoundPage from "../error/NotFound";
import { EditBoard } from "./EditBoard";
import { useDispatch } from "react-redux";
import { clearMultiSelectedPlayers, clearSelectedPlayer } from "../../store/PlayerSlice";
import { clearPlayers, editPlayers } from "../../store/PlayersListSlice";
import { clearPlayerViewState } from "../../store/PlayerViewSlice";
import { clearPossiblePlayerMoveState } from "../../store/PossiblePlayerMoveSlice";
import { clearBallSequences, clearPlayerMovingSequence, editSequences } from "../../store/SequenceSlice";
import { clearSimulationOn, endSimulation } from "../../store/SimulationOnSlice";
import { clearPlayerId, plusPlayerIdWithNumber } from "../../store/PlayerIdSlice";
import { clearBall } from "../../store/BallSlice";
import { clearPossibleBallMoveState } from "../../store/PossibleBallMoveSlice";
import { setTacticsDescription } from "../../store/TacticsDescriptionSlice";
import background from '../../image/board.webp';

interface EditComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

interface EditKeyParams {
    editKey: string
}

const EditPage = (props: EditComponentProps) => {
    const { editKey } = useParams<keyof EditKeyParams>() as EditKeyParams;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ResponseData | null>(null);

    const dispatch = useDispatch()

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

    const handleReset = () => {
        dispatch(clearSelectedPlayer());
        dispatch(clearMultiSelectedPlayers());
        dispatch(clearPlayers());
        dispatch(clearPlayerViewState());
        dispatch(clearPossiblePlayerMoveState());
        dispatch(clearPlayerMovingSequence());
        dispatch(clearSimulationOn());
        dispatch(clearPlayerId());
        dispatch(clearBall());
        dispatch(clearBallSequences());
        dispatch(clearPossibleBallMoveState());
        dispatch(endSimulation())
    }

    useEffect(() => {
        handleReset();
    }, []);  // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함


    useEffect(() => {
        const handleShare = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/edit/${editKey}`, {
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
    }, [editKey]);

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

    const players = data.body.players
    const sequences = data.body.tactics.sequences
    const currentSequenceNumber = data.body.tactics.currentSequenceNumber
    const playerWithLargestId = players.reduce((max, player) => {
        return player.id > max.id ? player : max;
    }, players[0]);
    const title = data.body.title
    const description = data.body.description

    dispatch(editPlayers(players))
    dispatch(plusPlayerIdWithNumber(playerWithLargestId.id + 10))
    dispatch(editSequences({ sequences, currentSequenceNumber }))
    dispatch(setTacticsDescription({ title, description }))

    return <div className="App">
        <div className="App-container">
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            <div className="second" style={{ overflow: 'hidden' }}>
                <img src={background} style={{
                    overflow: 'hidden'
                }} />
            </div>
            <div className="third"><EditBoard editKey={editKey} /></div>
        </div>
    </div>
};

export default EditPage;