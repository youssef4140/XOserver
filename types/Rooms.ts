import GameManager from "../src/services/GameManager";

interface Room  {
    players: string[];
    ready:boolean;
    game?: GameManager;
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