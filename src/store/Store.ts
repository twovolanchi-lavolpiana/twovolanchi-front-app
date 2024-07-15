import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import sequencesReducer from "./SequenceSlice";
import possibleMoveReducer from './PossibleMoveSlice';
import playersListReducer from './PlayersListSlice'
import playerViewReducer from './PlayerViewSlice';
import simulationOnReducer from './SimulationOnSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        sequences: sequencesReducer,
        possibleMove: possibleMoveReducer,
        players: playersListReducer,
        playerView: playerViewReducer,
        simulationOn: simulationOnReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;