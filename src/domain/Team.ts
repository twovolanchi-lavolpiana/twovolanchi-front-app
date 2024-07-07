import Player from "./Player";
import TeamColor from "./TeamColor";

export default class Team {
    players: Array<Player> = [];
    teamColor: TeamColor;

    constructor(teamColor: TeamColor, ...players: Player[]) {
        this.teamColor = teamColor;
        this.players = players;
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }
}