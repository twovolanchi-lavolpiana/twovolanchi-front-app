import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import playerMovingSequenceSlice from "./PlayerMovingSlice";

export const store = configureStore({
    reducer: {
        player: playerReducer,
        playerMovingSequences: playerMovingSequenceSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;