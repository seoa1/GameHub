import React from 'react';
import Grid from '../chess/grid';
import ChessGrid from './ChessGrid';
import {NullPiece} from '../chess/pieces';

export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            grid: new Grid()
        }
        this.display_moves = this.display_moves.bind(this);
        this.clear_display_moves = this.clear_display_moves.bind(this);
    }

    display_moves(piece) {
        this.clear_display_moves();
        if(piece instanceof NullPiece) {
            return;
        }
        let moves = piece.get_poss_moves();
        console.log(moves);
        moves.forEach(move => {
            this.state.grid.board[move[0]][move[1]].move_disp = true;
        });
        this.setState({ grid: this.state.grid });
    }

    clear_display_moves() {
        this.state.grid.board.flat(1).forEach(piece => {
            piece.move_disp = false;
        })
        this.setState({ grid: this.state.grid });
    }

    render() {
        return (
            <div className="board">
                <ChessGrid grid={this.state.grid} display={this.display_moves}/>
            </div>
        )
    }
}