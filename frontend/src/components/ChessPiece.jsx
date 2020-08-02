import React from 'react';
import {Pawn, Rook, Queen, Bishop, Knight, King} from '../chess/pieces';

const ChessPiece = ({piece}) => {
    let piece_type = "";
    if(piece === null) {
        piece_type = "blank";
    }
    else if(piece instanceof Pawn) {
        if(piece.color === "B") piece_type = "b_pawn";
        else piece_type = "w_pawn";
    }
    else if(piece instanceof Rook) {
        if(piece.color === "B") piece_type = "b_rook";
        else piece_type = "w_rook";
    }
    else if(piece instanceof Queen) {
        if(piece.color === "B") piece_type = "b_queen";
        else piece_type = "w_queen";
    }
    else if(piece instanceof Bishop) {
        if(piece.color === "B") piece_type = "b_bishop";
        else piece_type = "w_bishop";
    }
    else if(piece instanceof Knight) {
        if(piece.color === "B") piece_type = "b_knight";
        else piece_type = "w_knight";
    }
    else if(piece instanceof King) {
        if(piece.color === "B") piece_type = "b_king";
        else piece_type = "w_king";
    }

    return (
        <div>
            {piece_type === "w_pawn" ? <img className="piece_img" src="/images/Chess_plt60.png" alt="pawn"/> : null}
            {piece_type === "b_pawn" ? <img className="piece_img" src="/images/Chess_pdt60.png" alt="pawn"/> : null}
            {piece_type === "w_bishop" ? <img className="piece_img" src="/images/Chess_blt60.png" alt="bishop"/> : null}
            {piece_type === "b_bishop" ? <img className="piece_img" src="/images/Chess_bdt60.png" alt="bishop"/> : null}
            {piece_type === "w_rook" ? <img className="piece_img" src="/images/Chess_rlt60.png" alt="rook"/> : null}
            {piece_type === "b_rook" ? <img className="piece_img" src="/images/Chess_rdt60.png" alt="rook"/> : null}
            {piece_type === "w_knight" ? <img className="piece_img" src="/images/Chess_nlt60.png" alt="knight"/> : null}
            {piece_type === "b_knight" ? <img className="piece_img" src="/images/Chess_ndt60.png" alt="knight"/> : null}
            {piece_type === "w_king" ? <img className="piece_img" src="/images/Chess_klt60.png" alt="king"/> : null}
            {piece_type === "b_king" ? <img className="piece_img" src="/images/Chess_kdt60.png" alt="king"/> : null}
            {piece_type === "w_queen" ? <img className="piece_img" src="/images/Chess_qlt60.png" alt="queen"/> : null}
            {piece_type === "b_queen" ? <img className="piece_img" src="/images/Chess_qdt60.png" alt="queen"/> : null}
        </div>
    )
}

export default ChessPiece;