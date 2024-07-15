import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerIdState {
    id: number;
}

const initialState: PlayerIdState = {
    id: 0
  };
  
  const playerIdSlice = createSlice({
    name: 'playerId',
    initialState,
    reducers: {
      plusPlayerId: (state) => {
        state.id = state.id + 1
      },
      plusPlayerIdWithNumber: (state, action: PayloadAction<number>) => {
        state.id = state.id + action.payload
      },
      clearPlayerId: (state) => {
        state.id = 0
      },
    },
  });
  
  export const { plusPlayerId, plusPlayerIdWithNumber, clearPlayerId } = playerIdSlice.actions;
  export default playerIdSlice.reducer;