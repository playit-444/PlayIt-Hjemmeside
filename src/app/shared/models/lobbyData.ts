import {PlayerData} from './playerData';

export interface LobbyData {
  Players?: PlayerData[];
  GameType: number;
  RoomID: string;
  Name: string;
  MaxUsers: number;
  CurrentUsers: number;
  PrivateRoom: boolean;
}
