import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import sequencesReducer from "./SequenceSlice";
import possibleMoveReducer from './PossibleMoveSlice';
import playersListReducer from './PlayersListSlice'
import playerViewReducer from './PlayerViewSlice';
import simulationOnReducer from './SimulationOnSlice';
import playerIdReducer from './PlayerIdSlice';
import ballReducer from './BallSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        playerId: playerIdReducer,
        ball: ballReducer,
        sequences: sequencesReducer,
        possibleMove: possibleMoveReducer,
        players: playersListReducer,
        playerView: playerViewReducer,
        simulationOn: simulationOnReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;