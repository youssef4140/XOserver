export default class Game {

    tiles;
    turn;

    constructor() {
        this.tiles = new Array(9).fill(null).map(() => ({
            symbol: null,
            turns: 0
        }))
        this.turn = 'X';
    }

    flipTurn(){
        this.turn === 'X'? this.turn = 'O': this.turn = 'X';
    }
}