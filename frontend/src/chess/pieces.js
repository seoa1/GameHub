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


export class Piece {
    constructor(color, pos, grid) {
        this._color = color;
        this._pos = pos;
        this._grid = grid;
        this._move_disp = false;
    }
    get color() { return this._color; }
    get pos() { return this._pos; }
    get move_disp() { return this._move_disp; }
    set color(color) { this._color = color; }
    set pos(pos) { this._pos = pos; }
    set move_disp(move_disp) { this._move_disp = move_disp; }
    set grid(grid) { 
        this._grid = grid;
        this._board = grid.board;
    }

    valid_move(pos) {
        return (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8);
    }

    is_piece(pos) {
        return this.valid_move(pos) && !(this._grid.board[pos[0]][pos[1]] instanceof NullPiece);
    }

    opp_color_at(pos) {
        return (this._grid.board[pos[0]][pos[1]].color !== this._color);
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

    test_moves_for_check(start_pos, moves, color) {
        let poss_moves = [];
        let test_grid;
        moves.forEach((move) => {
            test_grid = this._grid.duplicate();
            test_grid.move_piece(start_pos, move);
            if(!test_grid.in_check(color)) {
                poss_moves.push(move);
            }
        });
        return poss_moves;
    }

    get_test_moves() {
        let moves = this.get_poss_moves();
        return this.test_moves_for_check(this._pos, moves, this._color);
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
        let poss_moves = [];
        let forward_one = [pos_row + dir, pos_col];
        let pushable = false;
        if(!this.is_piece(forward_one)) {
            pushable = true;
            poss_moves.push(forward_one);
        }
        // 2 square push
        let forward_two = [pos_row + dir * 2, pos_col];
        if(pushable && !this.is_piece(forward_two) && ((dir < 0 && pos_row === 6) || (dir > 0 && pos_row === 1))) {
            poss_moves.push(forward_two);
        }
        // sideways take
        let side_left = [pos_row + dir, pos_col - 1];
        let side_right = [pos_row + dir, pos_col + 1];
        if(this.valid_move(side_left) && this.is_piece(side_left) && this.opp_color_at(side_left)) {
            poss_moves.push(side_left);
        }
        if(this.valid_move(side_right) && this.is_piece(side_right) && this.opp_color_at(side_right)) {
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