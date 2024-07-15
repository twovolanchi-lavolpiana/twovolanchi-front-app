import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BallPosition } from "../component/BallPosition";
interface BallState {
  ball: BallPosition | null;
}

const initialState: BallState = {
  ball: null,
};

const ballSlice = createSlice({
  name: 'ball',
  initialState,
  reducers: {
    setBall: (state, action: PayloadAction<BallPosition>) => {
      state.ball = action.payload;
    },
    clearBall: (state) => {
      state.ball = null;
    },
  },
});

export const { setBall, clearBall } = ballSlice.actions;
export default ballSlice.reducer;