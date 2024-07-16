import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SimulationOnState {
    isSimulationOn: boolean;
    isSimulationStart: boolean;
}

const initialState: SimulationOnState = {
    isSimulationOn: false,
    isSimulationStart: false,
};

type SimualtionOnProps = {
    isSimulationOn: boolean
    isSimulationStart: boolean,
}

const playerViewSlice = createSlice({
    name: 'playerView',
    initialState,
    reducers: {
        setSimulationOn: (state) => {
            state.isSimulationOn = true
        },
        clearSimulationOn: (state) => {
            state.isSimulationOn = false
        },
        startSimulation: (state) => {
            state.isSimulationStart = true
        },
        endSimulation: (state) => {
            state.isSimulationStart = false
        }
    },
});

export const { setSimulationOn, clearSimulationOn, startSimulation, endSimulation } = playerViewSlice.actions;
export default playerViewSlice.reducer;