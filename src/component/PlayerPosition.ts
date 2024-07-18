import { PlayerPositionEnum } from "./PlayerPositionEnum";

export interface PlayerPosition {
  id: number;
  backNumber: number;
  name: string;
  position: PlayerPositionEnum,
  team: 'HOME' | 'AWAY';
  leftPercent: number;
  topPercent: number;
};