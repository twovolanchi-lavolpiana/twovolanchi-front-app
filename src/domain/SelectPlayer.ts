import Player from "./Player";
import Team from "./Team";

export default class SelectPlayer {
    points: { x: number, y: number }[] = [];
    savedLines: { [key: string]: { x: number, y: number }[] } = {};
    selectedPlayer: Player | null = null;
    selectedTeam: Team | null = null;

    constructor(player: Player | null, team: Team | null) {
        this.selectedPlayer = player;
        this.selectedTeam = team;
    }

    setPoint(x: number, y: number) {
        this.points.push({ x, y });
    }

    savePlayerLine() {
        if (this.selectedPlayer !== null && this.selectedTeam !== null && this.points.length > 0) {
            this.savedLines[`${this.selectedTeam.teamColor}-${this.selectedPlayer.number}`] = [...this.points];
            this.points = [];
        }
    }

    resetCurrentPlayerLine() {
        if (this.selectedPlayer !== null) {
            this.points = [];
        }
    }

    reset() {
        this.points = [];
        this.savedLines = {};
        this.selectedPlayer = null;
        this.selectedTeam = null;
    }
}