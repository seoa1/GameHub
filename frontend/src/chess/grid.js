import { Pawn, Knight, King, Bishop, Queen, Rook, NullPiece } from './pieces';

export default class Grid {
    constructor() {
        this._board = [];
        this.build_board();
    }
    get board() { return this._board; }

    build_board() {
        for(let row=0; row<8; row++) {
            this._board.push([]);
            for(let col=0; col<8; col++) {
                let curr_pos = [row, col];
                if(row === 0 || row === 7) {
                    let color = "W";
                    if(row === 0) color = "B";

                    if(col === 0 || col === 7) this._board[row].push(new Rook(color, curr_pos, this));
                    else if(col === 1 || col === 6) this._board[row].push(new Knight(color, curr_pos, this));
                    else if(col === 2 || col === 5) this._board[row].push(new Bishop(color, curr_pos, this));
                    else if(col === 3) this._board[row].push(new Queen(color, curr_pos, this));
                    else if(col === 4) this._board[row].push(new King(color, curr_pos, this));
                }
                else if(row === 1) this._board[row].push(new Pawn("B", curr_pos, this));
                else if(row === 6) this._board[row].push(new Pawn("W", curr_pos, this));
                else this._board[row].push(new NullPiece(curr_pos));
            }
        }
    }
}