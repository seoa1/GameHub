import React from 'react';
import Grid from '../chess/grid';
import ChessGrid from './ChessGrid';

export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            grid: new Grid()
        }
    }

    render() {
        return (
            <div className="board">
                <ChessGrid grid={this.state.grid}/>
            </div>
        )
    }
}