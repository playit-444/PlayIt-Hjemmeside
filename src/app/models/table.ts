export interface Table {
  roomID: string,
  name: string,
  maxUsers: number,
  minUsers: number,
  currentUsers: number,
  private: boolean
}
