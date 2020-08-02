import { Pawn, Knight, King, Bishop, Queen, Rook } from './pieces';

export class Grid {
    constructor() {
        this._board = [];
        this.build_board();
    }
    get board() { return this._board; }

    build_board() {
        for(let row=0; i<8; i++) {
            this._board.push([]);
            for(let col=0; j<8; j++) {
                let curr_pos = [row, col];
                if(row === 0 || row === 7) {
                    let color = "W";
                    if(row === 0) color = "B";

                    if(col === 0 || col === 7) this._board[i].push(new Rook(color, curr_pos, this));
                    else if(col === 1 || col === 6) this._board[i].push(new Knight(color, curr_pos, this));
                    else if(col === 2 || col === 5) this._board[i].push(new Bishop(color, curr_pos, this));
                    else if(col === 3) this._board[i].push(new Queen(color, curr_color, this));
                    else if(col === 4) this._board[i].push(new King(color, curr_pos, this));
                }
                else if(row === 1) this._board[i].push(new Pawn("B", curr_pos, this));
                else if(row === 6) this._board[i].push(new Pawn("W", curr_pos, this));
                else this._board[i].push(null);
            }
        }
    }
}