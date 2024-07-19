import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BallPosition } from "../component/BallPosition";
interface TranslationState {
    lng: "en" | "ko";
}

const initialState: TranslationState = {
    lng: "en",
};

type LngProps = {
    lng: "en" | "ko"
}

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        changeLng: (state, action: PayloadAction<LngProps>) => {
            state.lng = action.payload.lng
        }
    },
});

export const { changeLng } = translationSlice.actions;
export default translationSlice.reducer;