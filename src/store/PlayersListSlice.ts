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
    movePlayer: (state, action: PayloadAction<{ id: number, leftPercent: number, topPercent: number }>) => {
      const { id, leftPercent, topPercent } = action.payload;
      const player = state.players.find((p) => p.id === id);

      if (player) {
        player.leftPercent = leftPercent;
        player.topPercent = topPercent;
      }
    },
    removePlayer: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.players = state.players.filter((p) => p.id !== id);
    },
    clearPlayers: (state) => {
      state.players = []
    },
    editPlayers: (state, action: PayloadAction<PlayerPosition[]>) => {
      state.players = action.payload
    },
  },
});

export const { setPlayer, movePlayer, clearPlayers, removePlayer, editPlayers } = playersListSlice.actions;
export default playersListSlice.reducer;