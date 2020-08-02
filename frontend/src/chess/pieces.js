export class NullPiece {
    constructor(pos) {
        this._pos = pos;
        this._move_disp = false;
    }
    get pos() { return this._pos; }
    get move_disp() { return this._move_disp; }
    set pos(pos) { this._pos = pos; }
    set move_disp(move_disp) { this._move_disp = move_disp; }
}


class Piece {
    constructor(color, pos, grid) {
        this._color = color;
        this._pos = pos;
        this._grid = grid;
        this._board = grid.board;
        this._move_disp = false;
    }
    get color() { return this._color; }
    get pos() { return this._pos; }
    get board() { return this._board; }
    get move_disp() { return this._move_disp; }
    set color(color) { this._color = color; }
    set pos(pos) { this._pos = pos; }
    set move_disp(move_disp) { this._move_disp = move_disp; }

    valid_move(pos) {
        return (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8);
    }

    is_piece(pos) {
        return (!this._board[pos[0]][pos[1]] instanceof NullPiece);
    }

    opp_color_at(pos) {
        return (this._board[pos[0][pos[1]]].color !== this._color);
    }

    extend_moves(DIRS) {
        let moves = [];
        DIRS.forEach( dir => {
            let extendable = true;
            let new_pos = this._pos;
            while(extendable) {
                extendable = false;
                new_pos = [new_pos[0] + dir[0], new_pos[1] + dir[1]];
                if(this.valid_move(new_pos)) {
                    if(!this.is_piece(new_pos)) {
                        extendable = true;
                        moves.push(new_pos);
                    }
                    else if(this.opp_color_at(new_pos)) {
                        moves.push(new_pos);
                    }
                }
            }
        });
        return moves;
    }
}


export class Pawn extends Piece{
    get_poss_moves() {
        let moves = [];
        const pos_row = this._pos[0];
        const pos_col = this._pos[1];
        let dir;
        if(this._color === "W") {
            dir = -1;
        }
        else {
            dir = 1;
        }
        let poss_moves = [[pos_row + dir, pos_col]];
        // 2 square push
        if((dir < 0 && pos_row === 6) || (dir > 0 && pos_row === 1)) {
            poss_moves.push([pos_row + dir * 2, pos_col]);
        }
        // sideways take
        let side_left = [pos_row + dir, pos_col - 1];
        let side_right = [pos_row + dir, pos_col + 1];
        if(this.is_piece(side_left)) {
            poss_moves.push(side_left);
        }
        if(this.is_piece(side_right)) {
            poss_moves.push(side_right);
        }
        poss_moves.forEach( move => {
            if(this.valid_move(move)) {
                moves.push(move);
            }
        });
        return moves;
    }
}

export class Bishop extends Piece{
    get_poss_moves() {
        const DIRS = [[1,1],[1,-1],[-1,-1],[-1,1]];
        return this.extend_moves(DIRS);
    }
}

export class Knight extends Piece{
    get_poss_moves() {
        const DIRS = [[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,-1],[-2,1]];
        let moves = [];
        DIRS.forEach(dir => {
            let new_pos = [this._pos[0] + dir[0], this._pos[1] + dir[1]];
            if(this.valid_move(new_pos) && (!this.is_piece(new_pos) || this.opp_color_at(new_pos))) {
                moves.push(new_pos);
            }
        });
        return moves;
    }
}

export class Queen extends Piece{

    get_poss_moves() {
        const DIRS = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[1,0],[0,-1],[-1,0]];
        return this.extend_moves(DIRS);
    }
}

export class King extends Piece{
    get_poss_moves() {
        const DIRS = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[1,0],[0,-1],[-1,0]];
        let moves = [];
        DIRS.forEach(dir => {
            let new_pos = [this._pos[0] + dir[0], this._pos[1] + dir[1]];
            if(this.valid_move(new_pos) && (!this.is_piece(new_pos) || this.opp_color_at(new_pos))) {
                moves.push(new_pos);
            }
        });
        return moves;
    }
}

export class Rook extends Piece{
    get_poss_moves() {
        const DIRS = [[0,1],[1,0],[0,-1],[-1,0]];
        return this.extend_moves(DIRS);
    }
}