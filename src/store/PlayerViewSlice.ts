import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerViewState {
    playerView: 'backNumber' | 'position' | 'name' | 'backNumber&position' | 'all';
}

const initialState: PlayerViewState = {
    playerView: 'position',
  };

  interface PlayerViewStateProps {
    playerView: 'backNumber' | 'position' | 'name' | 'backNumber&position' | 'all';
}  

  const playerViewSlice = createSlice({
    name: 'playerView',
    initialState,
    reducers: {
      setPlayerViewState: (state, action: PayloadAction<PlayerViewStateProps>) => {
        state.playerView = action.payload.playerView;
      },
    },
  });
  
  export const { setPlayerViewState } = playerViewSlice.actions;
  export default playerViewSlice.reducer;