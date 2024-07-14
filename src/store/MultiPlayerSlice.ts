import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface MultiPlayerState {
    selectedPlayers: PlayerPosition[];
}

const initialState: MultiPlayerState = {
  selectedPlayers: [],
  };
  
  const multiPlayers = createSlice({
    name: 'multiPlayers',
    initialState,
    reducers: {
      addSelectedPlayers: (state, action: PayloadAction<PlayerPosition>) => {
        const isExisting = state.selectedPlayers.find((s) => s.id === action.payload.id)
        
        if (isExisting) return;

        state.selectedPlayers.push(action.payload)
      },
      clearSelectedPlayers: (state) => {
        state.selectedPlayers = [];
      },
    },
  });
  
  export const { addSelectedPlayers, clearSelectedPlayers } = multiPlayers.actions;
  export default multiPlayers.reducer;