import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import sequencesReducer from "./SequenceSlice";
import possibleMoveReducer from './PossibleMoveSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        sequences: sequencesReducer,
        possibleMove: possibleMoveReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;