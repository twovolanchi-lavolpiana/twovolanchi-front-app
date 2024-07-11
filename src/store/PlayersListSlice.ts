import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface PlayersListState {
    players: PlayerPosition[];
}

const initialState: PlayersListState = {
    players: [],
  };
  
  const playersListSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
      setPlayer: (state, action: PayloadAction<PlayerPosition>) => {
        const existingPlayerIndex = state.players.findIndex((p) => p.id == action.payload.id)

        if (existingPlayerIndex) {
            state.players[existingPlayerIndex] = action.payload
        } else {
            state.players.push(action.payload)
        }
      },
    },
  });
  
  export const { setPlayer } = playersListSlice.actions;
  export default playersListSlice.reducer;