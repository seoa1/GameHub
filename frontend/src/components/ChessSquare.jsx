import React from 'react';
import ChessPiece from './ChessPiece';

export default class ChessSquare extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let background;
        if((this.props.val / 8 | 0) % 2 === 0) {
            background = " even_tile";
            if(this.props.val % 2 === 0) background = " odd_tile";
        }
        else {
            background = " odd_tile";
            if(this.props.val % 2 === 0) background = " even_tile";
        }
        return(
            <div className={"square" + background}>
                <ChessPiece piece={this.props.piece}/>
            </div>
        )
    }
}