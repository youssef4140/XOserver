import { Board } from "../../types/Rooms";

export default class GameManager {

    players: { [key: string]: 'X' | 'O' };
    currentPlayer: string;
    board: (Board | null)[];
    winner: string | null;
    isGameOver: boolean;

    constructor(players: string[]) {
        this.players = this.shufflePlayers(players);
        this.currentPlayer = players[0];
        this.board = Array(9).fill(null).map(() => ({
            value: null,

        }));
        this.winner = null;
        this.isGameOver = false;
    }


    shufflePlayers(players: string[]): { [key: string]: 'X' | 'O' } {
        const shuffledPlayers = Math.random() > 0.5 ? [players[1], players[0]] : [...players];

        return {
            [shuffledPlayers[0]]: 'X',
            [shuffledPlayers[1]]: 'O'
        };
    }

    move(playerId: string,index: number) {
        if(this.currentPlayer !== playerId) return;

        if (this.board[index]) {
            this.board[index].value = this.players[playerId];
        }

        this.currentPlayer = Object.keys(this.players).find(id => id !== playerId) as string;

        return this.board;

    }


}