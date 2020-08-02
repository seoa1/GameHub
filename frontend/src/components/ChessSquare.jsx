import React from 'react';
import ChessPiece from './ChessPiece';

export default class ChessSquare extends React.Component {
    constructor(props) {
        super(props);

        this.handle_click = this.handle_click.bind(this);
    }

    handle_click() {
        this.props.display(this.props.piece);
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
            <div className={"square" + background} onClick={this.handle_click}>
                <ChessPiece piece={this.props.piece}/>
                { this.props.piece.move_disp ? <div className="move_dot"></div> : null }
            </div>
        )
    }
}