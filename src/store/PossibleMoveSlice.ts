import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PossibleMoveState {
    isPossible: boolean, 
}

type PossibleMoveProp = {
  isPossible: boolean,
}

const initialState: PossibleMoveState = {
    isPossible: false
  };
  
  const possibleMoveSlice = createSlice({
    name: 'possibleMove',
    initialState,
    reducers: {
      setPossibleMoveState: (state, action: PayloadAction<PossibleMoveProp>) => {
        state.isPossible = action.payload.isPossible
      },
      clearSelection: (state) => {
        state.isPossible = false
      },
    },
  });
  
  export const { setPossibleMoveState, clearSelection } = possibleMoveSlice.actions;
  export default possibleMoveSlice.reducer;