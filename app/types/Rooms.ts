interface Room  {
    players: Record<string, 'X' | 'O'>;
    ready:boolean;
    playerCount: number;
    id:string;
    // game?: GameManager;
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