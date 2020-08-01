class Piece {
    constructor(color, pos) {
        this._color = color;
        this._pos = pos;
    }
    get color() { return this._color; }
    get pos() { return this._pos; }
    set color(color) { this._color = color; }
    set pos(pos) { this._pos = pos; }
}

function valid_move(pos) {
    return (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8);
}

class Pawn extends Piece{
    constructor() {

    }
    
    get_poss_moves() {
        let moves;
        if(this._color === "W") {
            let poss_moves = [[]]
        }
    }

}