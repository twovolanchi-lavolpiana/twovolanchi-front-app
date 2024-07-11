import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface PlayerState {
    selectedPlayer: PlayerPosition | null;
}

const initialState: PlayerState = {
    selectedPlayer: null,
  };
  
  const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
      selectPlayer: (state, action: PayloadAction<PlayerPosition>) => {
        state.selectedPlayer = action.payload;
      },
      clearSelection: (state) => {
        state.selectedPlayer = null;
      },
    },
  });
  
  export const { selectPlayer, clearSelection } = playerSlice.actions;
  export default playerSlice.reducer;