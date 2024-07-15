import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";
interface PlayerState {
    selectedPlayer: PlayerPosition | null;
    multiSelectedPlayers: PlayerPosition[] | null;
}

const initialState: PlayerState = {
    selectedPlayer: null,
    multiSelectedPlayers: null,
  };
  
  const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
      selectPlayer: (state, action: PayloadAction<PlayerPosition>) => {
        state.selectedPlayer = action.payload;
        state.multiSelectedPlayers = null;
      },
      clearSelectedPlayer: (state) => {
        state.selectedPlayer = null;
      },
      setInitMultiSelectedPlayers: (state) => {
        state.multiSelectedPlayers = [];
      },
      addMultiSelectedPlayer: (state, action: PayloadAction<PlayerPosition>) => {
        if (!state.multiSelectedPlayers) state.multiSelectedPlayers = []

        const isExisting = state.multiSelectedPlayers.find((s) => s.id === action.payload.id)
        
        if (isExisting) return;

        if (state.selectedPlayer) {
          if (state.selectedPlayer.id === action.payload.id) return;
        }

        state.multiSelectedPlayers.push(action.payload)
      },
      clearMultiSelectedPlayers: (state) => {
        state.multiSelectedPlayers = null;
      },
    },
  });
  
  export const { selectPlayer, clearSelectedPlayer, setInitMultiSelectedPlayers, addMultiSelectedPlayer, clearMultiSelectedPlayers } = playerSlice.actions;
  export default playerSlice.reducer;