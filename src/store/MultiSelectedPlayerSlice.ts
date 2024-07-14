import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface MultiPlayerState {
    multiSelectedPlayers: PlayerPosition[];
    isMultiSelected: boolean,
}

const initialState: MultiPlayerState = {
  multiSelectedPlayers: [],
  isMultiSelected: false,
  };
  
  const multiSelectedPlayers = createSlice({
    name: 'multiPlayers',
    initialState,
    reducers: {
      addMultiSelectedPlayer: (state, action: PayloadAction<PlayerPosition>) => {
        const isExisting = state.multiSelectedPlayers.find((s) => s.id === action.payload.id)
        
        if (isExisting) return;

        state.multiSelectedPlayers.push(action.payload)
      },
      clearMultiSelectedPlayers: (state) => {
        state.multiSelectedPlayers = [];
      },
    },
  });
  
  export const { addMultiSelectedPlayer, clearMultiSelectedPlayers } = multiSelectedPlayers.actions;
  export default multiSelectedPlayers.reducer;