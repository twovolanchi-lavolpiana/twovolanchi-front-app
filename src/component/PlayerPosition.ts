import { PlayerPositionEnum } from "./PlayerPositionEnum";

export type PlayerPosition = {
  id: number;
  backNumber: number;
  position: PlayerPositionEnum,
  team: 'red' | 'blue';
  left: number;
  top: number;
};