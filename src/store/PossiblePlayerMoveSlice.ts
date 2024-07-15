import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PossiblePlayerMoveState {
    playerId: number | null,
    isPossible: boolean, 
}

type PossiblePlayerMoveProp = {
  playerId: number | null,
  isPossible: boolean,
}

const initialState: PossiblePlayerMoveState = {
    playerId: null,
    isPossible: false
  };
  
  const possiblePlayerMoveSlice = createSlice({
    name: 'possibleMove',
    initialState,
    reducers: {
      setPossiblePlayerMoveState: (state, action: PayloadAction<PossiblePlayerMoveProp>) => {
        state.playerId = action.payload.playerId
        state.isPossible = action.payload.isPossible
      },
      clearPossiblePlayerMoveState: (state) => {
        state.isPossible = false
      },
    },
  });
  
  export const { setPossiblePlayerMoveState, clearPossiblePlayerMoveState } = possiblePlayerMoveSlice.actions;
  export default possiblePlayerMoveSlice.reducer;