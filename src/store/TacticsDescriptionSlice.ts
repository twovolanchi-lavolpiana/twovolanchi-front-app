import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TacTicsDescriptionState {
    title: string;
    description: string;
  }
  
  const initialState: TacTicsDescriptionState = {
    title: 'Spain 2-3 BuildUp',
    description: 'Robin Le Normand and Laporte form a pair, while Cucurella, Rodrigo, and Carvajal form a trio.'
  };
  
  const TacTicsDescriptionSlice = createSlice({
    name: 'ball',
    initialState,
    reducers: {
      setTacticsDescription: (state, action: PayloadAction<TacTicsDescriptionState>) => {
        state.title = action.payload.title;
        state.description = action.payload.description;
      },
    },
  });
  
  export const { setTacticsDescription } = TacTicsDescriptionSlice.actions;
  export default TacTicsDescriptionSlice.reducer;