import Player from "./Player";
import Line from "./Line";

export default class PlayerSequenceLine {
    player: Player;
    lines: Line[] = [];

    constructor(player: Player) {
        this.player = player;
    }
    
    addLine(line: Line): void {
        this.lines.push(line)
    }
}