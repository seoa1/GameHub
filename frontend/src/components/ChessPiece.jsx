import React from 'react';
import {Pawn, Rook, Queen, Bishop, Knight, King} from '../chess/pieces';

const ChessPiece = ({piece}) => {
    let piece_type = "";
    if(piece === null) {
        piece_type = "blank";
    }
    else if(piece instanceof Pawn) {
        piece_type = "pawn";
    }
    else if(piece instanceof Rook) {
        piece_type = "rook";
    }
    else if(piece instanceof Queen) {
        piece_type = "queen";
    }
    else if(piece instanceof Bishop) {
        piece_type = "bishop";
    }
    else if(piece instanceof Knight) {
        piece_type = "knight";
    }
    else if(piece instanceof King) {
        piece_type = "king";
    }

    return (
        <div>

        </div>
    )
}

export default ChessPiece;