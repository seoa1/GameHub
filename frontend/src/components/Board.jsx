import React from 'react';
import Grid from '../chess/grid';
import ChessGrid from './ChessGrid';
import {NullPiece} from '../chess/pieces';

export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            grid: new Grid(),
            selected: null
        }
        this.display_moves = this.display_moves.bind(this);
        this.clear_display_moves = this.clear_display_moves.bind(this);
        this.move_sel = this.move_sel.bind(this);
    }

    move_sel(new_pos) {
        this.state.grid.move_piece(this.state.selected.pos, new_pos);
        this.clear_display_moves();
        this.setState({ grid: this.state.grid, selected: null });
    }

    display_moves(piece) {
        this.clear_display_moves();
        if(piece instanceof NullPiece ) {
            this.setState({ selected: null });
            return;
        }
        let moves = piece.get_test_moves();
        if(moves.length > 0) {
            moves.forEach(move => {
                this.state.grid.board[move[0]][move[1]].move_disp = true;
            });
            this.setState({ grid: this.state.grid, selected: piece });
        }

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
                <ChessGrid move_sel={this.move_sel} grid={this.state.grid} display={this.display_moves}/>
            </div>
        )
    }
}