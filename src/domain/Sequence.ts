import PlayerSequenceLine from "./PlayerSequenceLine";
import BallSequenceLine from "./BallSequenceLine";

export default class Sequence {
    number: number;
    ballSequenceLine: BallSequenceLine;
    playerSequenceLines: PlayerSequenceLine[];

    constructor(number: number, ballSequenceLine: BallSequenceLine, playerSequenceLines: PlayerSequenceLine[]) {
        this.number = number;
        this.ballSequenceLine = ballSequenceLine;
        this.playerSequenceLines = playerSequenceLines;
    }
}