import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface PlayersListState {
  players: PlayerPosition[];
}

const initialState: PlayersListState = {
  players: [],
};

const playersListSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerPosition>) => {
      const existingPlayerIndex = state.players.findIndex((p) => p.id == action.payload.id)

      if (existingPlayerIndex !== -1) {
        state.players[existingPlayerIndex] = action.payload
      } else {
        state.players.push(action.payload)
      }
    },
    movePlayer: (state, action: PayloadAction<{ id: number, left: number, top: number }>) => {
      const { id, left, top } = action.payload;
      const player = state.players.find((p) => p.id === id);

      if (player) {
        player.left = left;
        player.top = top;
      }
    },
    clearPlayers: (state) => {
      state.players = []
    }
  },
});

export const { setPlayer, movePlayer, clearPlayers } = playersListSlice.actions;
export default playersListSlice.reducer;