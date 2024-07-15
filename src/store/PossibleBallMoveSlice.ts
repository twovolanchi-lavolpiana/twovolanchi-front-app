import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PossibleBallMoveState {
  isPossible: boolean,
}

type PossibleMoveProp = {
  isPossible: boolean,
}

const initialState: PossibleBallMoveState = {
  isPossible: false
};

const possibleBallMoveSlice = createSlice({
  name: 'possibleBallMove',
  initialState,
  reducers: {
    setPossibleBallMoveState: (state, action: PayloadAction<PossibleMoveProp>) => {
      state.isPossible = action.payload.isPossible
    },
    clearPossibleBallMoveState: (state) => {
      state.isPossible = false
    },
  },
});

export const { setPossibleBallMoveState, clearPossibleBallMoveState } = possibleBallMoveSlice.actions;
export default possibleBallMoveSlice.reducer;