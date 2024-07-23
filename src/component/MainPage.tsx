import Navbar from "./Navbar"
import { Board } from "./Board"
import { useDispatch } from "react-redux";
import { clearMultiSelectedPlayers, clearSelectedPlayer } from "../store/PlayerSlice";
import { clearPlayers } from "../store/PlayersListSlice";
import { clearPlayerViewState } from "../store/PlayerViewSlice";
import { clearPossiblePlayerMoveState } from "../store/PossiblePlayerMoveSlice";
import { clearBallSequences, clearPlayerMovingSequence } from "../store/SequenceSlice";
import { clearSimulationOn, endSimulation } from "../store/SimulationOnSlice";
import { clearPlayerId } from "../store/PlayerIdSlice";
import { clearBall } from "../store/BallSlice";
import { clearPossibleBallMoveState } from "../store/PossibleBallMoveSlice";
import { useEffect } from "react";
import background from '../image/board.webp';
import '../App.css'

interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const MainPage = (props: MainComponentProps) => {
    const dispatch = useDispatch()

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

    return (
        <div className="App">
            <div className="App-container">
                <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
                <div className="second" style={{overflow: 'hidden'}}>
                    <img src={background} style={{
                        // objectFit: 'cover',
                        overflow: 'hidden'
                    }}/>
                </div>
                <div className="third"><Board /></div>
            </div>
        </div>
    )
}

export default MainPage;