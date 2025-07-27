import { GameInterface, Tile } from "../types/Types";

export default class Game implements GameInterface {

    players: Record<string, 'X' | 'O'>;
    turn: 'X' | 'O';
    tiles: Tile[];
    winner: null | 'X' | 'O';


    constructor(players: Record<string, 'X' | 'O'>) {
        this.tiles = new Array(9).fill(null).map(() => ({
            symbol: null,
            turns: 0
        }))
        this.turn = 'X';
        this.players = players;
        this.winner = null;
    }

    private flipTurn() {
        this.turn === 'X' ? this.turn = 'O' : this.turn = 'X';
    }

    tik(playerId: string, index: number) {
        if(this.winner) return this;
        let playerSymbol = this.players[playerId];
        if (playerSymbol !== this.turn) return this;
        let tile = this.tiles[index];
        if (tile.symbol != null) return this;
        this.updateTurns(playerSymbol)


        tile.symbol = playerSymbol;
        tile.turns = 3;
        this.checkWin()
        this.flipTurn();
        return this;


    }

    private updateTurns(symbol: 'X' | 'O') {
        this.tiles.forEach((t) => {
            if (t.symbol === symbol) {
                t.turns--;
                if (t.turns <= 0) {
                    t.turns = 0;
                    t.symbol = null;
                }
            }
        })
    }
    private checkWin() {
        const winConditions = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6]  // anti-diagonal
        ];
        for (const [a, b, c] of winConditions) {
            if (this.tiles[a].symbol && this.tiles[a].symbol === this.tiles[b].symbol && this.tiles[a].symbol === this.tiles[c].symbol) {
                this.winner = this.tiles[a].symbol;
            }
        }

    }
}