import Game from "../services/Game";

interface Tile {
    symbol: 'X' | 'O' | null,
    turns:number
}
interface Room  {
    players: Record<string, 'X' | 'O'>;
    ready:boolean;
    playerCount: number;
    id:string;
    game?: Game;
}

interface Result  {
    success: boolean;
    message?: string;
    roomId?: string;
    ready?: boolean;
}

interface Board  {
    value: string | null;
}
export {Room, Result,Board};