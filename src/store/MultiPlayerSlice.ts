import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface MultiPlayerState {
    multiPlayers: PlayerPosition[];
}

const initialState: MultiPlayerState = {
  multiPlayers: [],
  };
  
  const multiPlayers = createSlice({
    name: 'multiPlayers',
    initialState,
    reducers: {
      addSelectedPlayers: (state, action: PayloadAction<PlayerPosition>) => {
        const isExisting = state.multiPlayers.find((s) => s.id === action.payload.id)
        
        if (isExisting) return;

        state.multiPlayers.push(action.payload)
      },
      clearSelectedPlayers: (state) => {
        state.multiPlayers = [];
      },
    },
  });
  
  export const { addSelectedPlayers, clearSelectedPlayers } = multiPlayers.actions;
  export default multiPlayers.reducer;