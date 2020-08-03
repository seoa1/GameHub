import { Pawn, Knight, King, Bishop, Queen, Rook, NullPiece } from './pieces';

export default class Grid {
    constructor() {
        this._board = [];
        this.build_board();
        this.w_king = this.piece_at([7,4]);
        this.b_king = this.piece_at([0,4]);
    }
    get board() { return this._board; }
    set board(board) { this._board = board; }

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

    piece_at(pos) {
        return this._board[pos[0]][pos[1]];
    }

    get_opp_pieces(color) {
        let pieces = [];
        this._board.flat(1).forEach( piece => {
            if(!(piece instanceof NullPiece) && piece.color !== color) {
                pieces.push(piece);
            }
        });
        return pieces;
    }

    move_piece(start_pos, end_pos) {
        let piece = this.piece_at(start_pos)
        this._board[end_pos[0]][end_pos[1]] = piece;
        this._board[start_pos[0]][start_pos[1]] = new NullPiece(start_pos);
        piece.pos = end_pos;

    }

    find_king(color) {
        if(color === "W") {
            return this.w_king.pos;
        }
        return this.b_king.pos;
    }

    in_check(color) {
        let curr_king_pos = this.find_king(color);
        let opp_pieces = this.get_opp_pieces(color);
        let result = false;
        opp_pieces.forEach(piece => {
            let moves = piece.get_poss_moves();
            moves.forEach(move => {
                if(move[0] === curr_king_pos[0] && move[1] === curr_king_pos[1]) {
                    result = true;
                    return;
                }
            })
        });
        return result;
    }

    duplicate() {
        let grid_copy = new Grid();
        let board_copy = [];
        for(let i=0; i<8; i++) {
            board_copy.push([]);
            for(let j=0; j<8; j++) {
                let piece = this._board[i][j];
                if(piece instanceof NullPiece) {
                    board_copy[i].push(new NullPiece([i, j]));
                }
                else {
                    let new_piece;
                    if(piece instanceof Knight) new_piece = new Knight(piece.color, [i,j], grid_copy);
                    else if(piece instanceof Rook) new_piece = new Rook(piece.color, [i,j], grid_copy);
                    else if(piece instanceof Pawn) new_piece = new Pawn(piece.color, [i,j], grid_copy);
                    else if(piece instanceof Queen) new_piece = new Queen(piece.color, [i,j], grid_copy);
                    else if(piece instanceof Bishop) new_piece = new Bishop(piece.color, [i,j], grid_copy);
                    else if(piece instanceof King) new_piece = new King(piece.color, [i,j], grid_copy);
                    board_copy[i].push(new_piece);
                }
            }
        }
        grid_copy.board = board_copy;
        return grid_copy;
    }
}