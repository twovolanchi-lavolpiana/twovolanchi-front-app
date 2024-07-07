import Ball from "./Ball";
import Player from "./Player";

export default class BollHolder {
    player: Player;
    ball: Ball;

    constructor(player: Player, ball: Ball) {
        this.player = player;
        this.ball = ball;
    }

}