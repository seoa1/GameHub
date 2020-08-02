import React from 'react';
import ChessSquare from './ChessSquare';

const ChessGrid = ({grid}) => {
    let i=0;
    return (
        <div className="grid">
            {
                grid.board.flat(1).map(piece => 
                    <ChessSquare key={i++} val={i - 1} piece={piece}/>
                )
            }
        </div>
    )
}

export default ChessGrid;