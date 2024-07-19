import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./PlayerSlice";
import sequencesReducer from "./SequenceSlice";
import possiblePlayerMoveReducer from './PossiblePlayerMoveSlice';
import playersListReducer from './PlayersListSlice'
import playerViewReducer from './PlayerViewSlice';
import simulationOnReducer from './SimulationOnSlice';
import playerIdReducer from './PlayerIdSlice';
import ballReducer from './BallSlice';
import possibleBallMoveReducer from './PossibleBallMoveSlice'
import tacticsDescriptionReducer from './TacticsDescriptionSlice'
import shareSimulationReducer from './ShareSimulationOnSlice'
import translationReducer from './TranslationSlice'

export const store = configureStore({
    reducer: {
        player: playerReducer,
        playerId: playerIdReducer,
        ball: ballReducer,
        sequences: sequencesReducer,
        possiblePlayerMove: possiblePlayerMoveReducer,
        possibleBallMove: possibleBallMoveReducer,
        players: playersListReducer,
        playerView: playerViewReducer,
        simulationOn: simulationOnReducer,
        tacticsDescription: tacticsDescriptionReducer,
        shareSimulation: shareSimulationReducer,
        translation: translationReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;