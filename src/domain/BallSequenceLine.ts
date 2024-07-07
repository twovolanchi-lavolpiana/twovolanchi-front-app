import Ball from "./Ball";
import Line from "./Line";

export default class BallSequenceLine {
    ball: Ball;
    lines: Line[] = [];

    constructor(ball: Ball) {
        this.ball = ball;
    }

    addLine(line: Line): void {
        this.lines.push(line)
    }
}
