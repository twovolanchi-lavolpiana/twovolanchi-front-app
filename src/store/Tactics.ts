import { PlayerPositionEnum } from "../component/PlayerPositionEnum";

export interface Player {
    id: number;
    backNumber: number;
    name: string;
    position: PlayerPositionEnum;
    team: 'HOME' | 'AWAY';
    leftPercent: number;
    topPercent: number;
}

export interface PlayerMove {
    id: number;
    positions: { leftPercent: number; topPercent: number, team: 'HOME' | 'AWAY' }[];
}

export interface BallMove {
    leftPercent: number,
    topPercent: number,
}

export interface Sequence {
    sequenceNumber: number;
    players: PlayerMove[];
    balls: BallMove[],
}

export interface Tactics {
    currentSequenceNumber: number;
    sequences: Sequence[];
}

export interface ResponseData {
    body: {
        title: string;
        description: string;
        players: Player[];
        tactics: Tactics;
    };
    type: string;
    timestampUtc: number;
}