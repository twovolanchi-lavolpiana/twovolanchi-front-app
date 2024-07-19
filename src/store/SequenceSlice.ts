import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BallPosition } from "../component/BallPosition";
import { Sequence } from "./Tactics";


interface SequenceState {
    currentSequenceNumber: number;
    sequences: Sequence[];
}

const initialState: SequenceState = {
    currentSequenceNumber: 0,
    sequences: [],
};

type EditSequenceProps = {
    currentSequenceNumber: number;
    sequences: Sequence[];
}

type SelectSequenceProp = {
    findSequenceNumber: number;
}

type PlayerMovingProps = {
    id: number,
    leftPercent: number,
    topPercent: number,
    team: 'HOME' | 'AWAY',
    isFirst: boolean,
}

type BallMovingProps = {
    leftPercent: number,
    topPercent: number,
    isFirst: boolean,
}

const sequenceSlice = createSlice({
    name: 'sequences',
    initialState,
    reducers: {
        selectSequence: (state, action: PayloadAction<SelectSequenceProp>) => {
            state.sequences.find((s) => s.sequenceNumber == action.payload.findSequenceNumber)
        },

        setPlayerMovingSequences: (state, action: PayloadAction<PlayerMovingProps>) => {
            const { id, leftPercent, topPercent, team, isFirst } = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                const existingPlayer = currentSequence.players.find((m) => m.id === id);

                if (existingPlayer) {
                    if (!isFirst) {
                        existingPlayer.positions.push({ leftPercent, topPercent, team });
                    } else {
                        existingPlayer.positions = [];
                        existingPlayer.positions.push({ leftPercent, topPercent, team });
                    }
                } else {
                    currentSequence.players.push({
                        id,
                        positions: [{ leftPercent, topPercent, team }],
                    });
                }
            } else {
                state.sequences.push({
                    sequenceNumber: state.currentSequenceNumber,
                    players: [
                        {
                            id,
                            positions: [{ leftPercent, topPercent, team }],
                        },
                    ],
                    balls: []
                });
            }
        },
        setBallSequences: (state, action: PayloadAction<BallMovingProps>) => {
            const { leftPercent, topPercent, isFirst } = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                if (isFirst) {
                    currentSequence.balls = [];
                }

                currentSequence.balls.push({
                    leftPercent: leftPercent,
                    topPercent: topPercent,
                })
            } else {
                state.sequences.push({
                    sequenceNumber: state.currentSequenceNumber,
                    players: [],
                    balls: [{
                        leftPercent: leftPercent,
                        topPercent: topPercent,
                    }]
                });
            }
        },
        clearBallSequences: (state) => {
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);
            if (currentSequence) {
                currentSequence.balls = []
            }
        },
        removeBackPlayerMovingSequences: (state, action: PayloadAction<number>) => {
            const playerId = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                const player = currentSequence.players.find((m) => m.id === playerId);

                if (player && player.positions.length > 1) {
                    player.positions.pop();
                }
            }
        },
        removeBackBallMovingSequences: (state) => {
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                if (currentSequence.balls.length > 0) {
                    currentSequence.balls.pop();
                }
            }
        },
        clearPlayerMovingSequence: (state) => {
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                currentSequence.players = [];
            }
        },
        removePlayerSequence: (state, action: PayloadAction<number>) => {
            const playerId = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                currentSequence.players = currentSequence.players.filter((m) => m.id !== playerId);
            }
        },
        editSequences: (state, action: PayloadAction<EditSequenceProps>) => {
            state.currentSequenceNumber = action.payload.currentSequenceNumber
            state.sequences = action.payload.sequences
        },
    },
});

export const { selectSequence, setPlayerMovingSequences, setBallSequences, removeBackPlayerMovingSequences, clearPlayerMovingSequence, clearBallSequences, removePlayerSequence, editSequences, removeBackBallMovingSequences } = sequenceSlice.actions;
export default sequenceSlice.reducer;