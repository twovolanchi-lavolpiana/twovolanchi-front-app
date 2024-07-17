import { createSlice } from "@reduxjs/toolkit";

interface SimulationOnState {
    isSimulationOn: boolean;
    isSimulationStart: boolean;
}

const initialState: SimulationOnState = {
    isSimulationOn: false,
    isSimulationStart: false,
};

const ShareSimulationSlice = createSlice({
    name: 'playerView',
    initialState,
    reducers: {
        setShareSimulationOn: (state) => {
            state.isSimulationOn = true
        },
        clearShareSimulationOn: (state) => {
            state.isSimulationOn = false
        },
        startShareSimulation: (state) => {
            state.isSimulationStart = true
        },
        endShareSimulation: (state) => {
            state.isSimulationStart = false
        }
    },
});

export const { setShareSimulationOn, clearShareSimulationOn, startShareSimulation, endShareSimulation } = ShareSimulationSlice.actions;
export default ShareSimulationSlice.reducer;