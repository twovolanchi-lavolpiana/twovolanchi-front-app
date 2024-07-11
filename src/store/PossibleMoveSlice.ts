import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PossibleMoveState {
    playerId: number | null,
    isPossible: boolean, 
}

type PossibleMoveProp = {
  playerId: number | null,
  isPossible: boolean,
}

const initialState: PossibleMoveState = {
    playerId: null,
    isPossible: false
  };
  
  const possibleMoveSlice = createSlice({
    name: 'possibleMove',
    initialState,
    reducers: {
      setPossibleMoveState: (state, action: PayloadAction<PossibleMoveProp>) => {
        state.playerId = action.payload.playerId
        state.isPossible = action.payload.isPossible
      },
      clearSelection: (state) => {
        state.isPossible = false
      },
    },
  });
  
  export const { setPossibleMoveState, clearSelection } = possibleMoveSlice.actions;
  export default possibleMoveSlice.reducer;