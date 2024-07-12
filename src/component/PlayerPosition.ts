import { PlayerPositionEnum } from "./PlayerPositionEnum";

export type PlayerPosition = {
  id: number;
  backNumber: number;
  position: PlayerPositionEnum,
  team: 'home' | 'away';
  left: number;
  top: number;
};