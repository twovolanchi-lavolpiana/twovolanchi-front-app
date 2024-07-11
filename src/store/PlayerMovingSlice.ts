import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

type PlayerMovingSequence = {
  id: number,
  sequence: {
    left: number,
    top: number,
  }[]
}

interface PlayerMovingState {
  playerMovingSequences: PlayerMovingSequence[];
}

const initialState: PlayerMovingState = {
  playerMovingSequences: [],
};

const playerMovingSequenceSlice = createSlice({
  name: 'playerMovingSequences',
  initialState,
  reducers: {
    setPlayerMovingSequences: (state, action: PayloadAction<PlayerPosition>) => {
      const { id, left, top } = action.payload;
      const existingPlayer = state.playerMovingSequences.find((player) => player.id === id);

      if (existingPlayer) {
        existingPlayer.sequence.push({ left, top });
      } else {
        state.playerMovingSequences.push({
          id,
          sequence: [{ left, top }],
        });
      }
    },
    removeBackPlayerMovingSequences: (state, action: PayloadAction<number>) => {
      const playerId = action.payload;
      const player = state.playerMovingSequences.find((p) => p.id === playerId);

      if (player && player.sequence.length > 0) {
        player.sequence.pop();
      }
    },
  },
});

export const { setPlayerMovingSequences, removeBackPlayerMovingSequences } = playerMovingSequenceSlice.actions;
export default playerMovingSequenceSlice.reducer;