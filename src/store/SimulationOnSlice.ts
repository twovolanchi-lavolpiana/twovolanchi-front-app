import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SimulationOnState {
    isSimulationOn: boolean;
}

const initialState: SimulationOnState = {
    isSimulationOn: false,
};

type SimualtionOnProps = {
    isSimulationOn: boolean
}

const playerViewSlice = createSlice({
    name: 'playerView',
    initialState,
    reducers: {
        setSimulationOn: (state, action: PayloadAction<SimualtionOnProps>) => {
            state.isSimulationOn = action.payload.isSimulationOn;
        }
    },
});

export const { setSimulationOn } = playerViewSlice.actions;
export default playerViewSlice.reducer;