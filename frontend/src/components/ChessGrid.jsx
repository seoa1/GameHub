import React from 'react';
import ChessSquare from './ChessSquare';

const ChessGrid = ({grid, display, move_sel, color}) => {
    let i=0;
    return (
        <div className="grid">
            {
                color === "W" ?
                grid.board.flat(1).map(piece => 
                    <ChessSquare move_sel={move_sel} key={i++} val={i - 1} piece={piece} display={display}/>
                )
                :
                grid.board.flat(1).reverse().map(piece => 
                    <ChessSquare move_sel={move_sel} key={i++} val={i - 1} piece={piece} display={display}/>
                )
            }
        </div>
    )
}

export default ChessGrid;