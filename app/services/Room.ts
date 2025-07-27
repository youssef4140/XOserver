import type { RoomInterface } from "../types/Types";
import Game from "./Game";
export class Room implements RoomInterface {
    id: string;
    players: Record<string, 'X' | 'O'> = {};
    ready: boolean = false;
    playerCount: number = 0;
    game: Game | undefined;
    constructor() {
        this.id = this.generateId()
    }



    join(playerId: string) {
        if (this.playerCount > 2) {
            throw new Error(`Room ${this.id} already has 2 players.`);
        }
        if (Object.keys(this.players).includes(playerId)) return this;

        let sign: 'X' | 'O' = this.useSign();

        this.players[playerId] = sign;
        this.playerCount++;
        this.ready = this.checkReady()
        if (this.ready) {
            this.game = new Game(this.players);
        }
        return this;

    }

    leave(playerId: string) {
        delete this.players[playerId];
        this.playerCount--;
        return this;
    }
    newGame() {
        console.log('play again from room')
        let playerIds = Object.keys(this.players);
        playerIds.forEach((p) => {
            this.players[p] = this.flipSign(this.players[p])
        })
        this.game = new Game(this.players);
        return { game: this.game, players: this.players };
    }


    private flipSign(Sign: 'X' | 'O'): 'X' | 'O' {
        return Sign === 'X' ? 'O' : 'X';
    }

    private useSign(): 'X' | 'O' {
        let signs = Object.values(this.players);
        if (signs.includes('X') && signs.includes('O')) {
            throw new Error(`Room already has 2 players with different signs.`);
        }
        if (signs.includes('X')) {
            return 'O';
        }
        return 'X';
    }
    private generateId(): string {
        return Math.random().toString(36).substring(2, 10);
    }

    private checkReady(): boolean {
        return (this.playerCount === 2)

    }
}