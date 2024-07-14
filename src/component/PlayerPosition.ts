import { PlayerPositionEnum } from "./PlayerPositionEnum";

export type PlayerPosition = {
  id: number;
  backNumber: number;
  name: string;
  position: PlayerPositionEnum,
  team: 'home' | 'away';
  left: number;
  top: number;
};