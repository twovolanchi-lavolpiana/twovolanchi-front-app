import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerPosition } from "../component/PlayerPosition";

interface PlayerMove {
    id: number;
    sequence: { left: number; top: number }[];
}

interface Sequence {
    sequenceNumber: number;
    moves: PlayerMove[];
}

interface SequenceState {
    currentSequenceNumber: number;
    sequences: Sequence[];
}

const initialState: SequenceState = {
    currentSequenceNumber: 1,
    sequences: [],
};

type SelectSequenceProp = {
    findSequenceNumber: number;
}

type PlayerMovingProps = {
    id: number,
    left: number,
    top: number,
}

const sequenceSlice = createSlice({
    name: 'sequences',
    initialState,
    reducers: {
        selectSequence: (state, action: PayloadAction<SelectSequenceProp>) => {
            state.sequences.find((s) => s.sequenceNumber == action.payload.findSequenceNumber)
        },

        setPlayerMovingSequences: (state, action: PayloadAction<PlayerMovingProps>) => {
            const { id, left, top } = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                const existingPlayer = currentSequence.moves.find((m) => m.id === id);

                if (existingPlayer) {
                    existingPlayer.sequence.push({ left, top });
                } else {
                    currentSequence.moves.push({
                        id,
                        sequence: [{ left, top }],
                    });
                }
            } else {
                state.sequences.push({
                    sequenceNumber: state.currentSequenceNumber,
                    moves: [
                        {
                            id,
                            sequence: [{ left, top }],
                        },
                    ],
                });
            }
        },
        removeBackPlayerMovingSequences: (state, action: PayloadAction<number>) => {
            const playerId = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                const player = currentSequence.moves.find((m) => m.id === playerId);

                if (player && player.sequence.length > 0) {
                    player.sequence.pop();
                }
            }
        },
    },
});

export const { selectSequence, setPlayerMovingSequences, removeBackPlayerMovingSequences } = sequenceSlice.actions;
export default sequenceSlice.reducer;