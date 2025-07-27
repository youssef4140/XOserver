import Game from "../services/Game";

interface Tile {
    symbol: 'X' | 'O' | null,
    turns:number
}
interface RoomInterface  {
    players: Record<string, 'X' | 'O'>;
    ready:boolean;
    playerCount: number;
    id:string;
    game?: Game;
}
interface Tile{
    symbol: 'X'|'O'|null,
    turns:number
}
interface GameInterface {
    players: Record<string, 'X' | 'O'>;
    turn: 'X' | 'O';
    tiles:Tile[];
    winner: 'X' | 'O' | null;
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
export {RoomInterface,GameInterface, Result,Board,Tile};