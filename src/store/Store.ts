import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import sequencesReducer from "./SequenceSlice";
import possiblePlayerMoveReducer from './PossiblePlayerMoveSlice';
import playersListReducer from './PlayersListSlice'
import playerViewReducer from './PlayerViewSlice';
import simulationOnReducer from './SimulationOnSlice';
import playerIdReducer from './PlayerIdSlice';
import ballReducer from './BallSlice';
import possibleBallMoveReducer from './PossibleBallMoveSlice'

export const store = configureStore({
    reducer: {
        player: playerReducer,
        playerId: playerIdReducer,
        ball: ballReducer,
        sequences: sequencesReducer,
        possiblePlayerMove: possiblePlayerMoveReducer,
        possibleBallMove: possibleBallMoveReducer,
        players: playersListReducer,
        playerView: playerViewReducer,
        simulationOn: simulationOnReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;