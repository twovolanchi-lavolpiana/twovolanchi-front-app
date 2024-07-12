import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerMove {
    id: number;
    sequence: { left: number; top: number, team: 'home' | 'away' }[];
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
    team: 'home' | 'away',
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
            const { id, left, top, team, isFirst } = action.payload;
            const currentSequence = state.sequences.find((s) => s.sequenceNumber === state.currentSequenceNumber);

            if (currentSequence) {
                const existingPlayer = currentSequence.moves.find((m) => m.id === id);

                if (existingPlayer) {
                    if (!isFirst) {
                        existingPlayer.sequence.push({ left, top, team });
                    } else {
                        existingPlayer.sequence = [];
                        existingPlayer.sequence.push({ left, top, team });
                    }
                } else {
                    currentSequence.moves.push({
                        id,
                        sequence: [{ left, top, team }],
                    });
                }
            } else {
                state.sequences.push({
                    sequenceNumber: state.currentSequenceNumber,
                    moves: [
                        {
                            id,
                            sequence: [{ left, top, team }],
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

                if (player && player.sequence.length > 1) {
                    player.sequence.pop();
                }
            }
        },
    },
});

export const { selectSequence, setPlayerMovingSequences, removeBackPlayerMovingSequences } = sequenceSlice.actions;
export default sequenceSlice.reducer;