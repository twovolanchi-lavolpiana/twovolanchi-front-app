import { PlayerPositionEnum } from "./PlayerPositionEnum";

export type PlayerPosition = {
  id: number;
  backNumber: number;
  name: string;
  position: PlayerPositionEnum,
  team: 'HOME' | 'AWAY';
  left: number;
  top: number;
};