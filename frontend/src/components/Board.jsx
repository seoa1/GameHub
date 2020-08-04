import React from 'react';
import Grid from '../chess/grid';
import ChessGrid from './ChessGrid';
import {NullPiece} from '../chess/pieces';
import Chat from './message_box/Chat';
import queryString from 'query-string';
import io from 'socket.io-client';
import WaitingRoom from './WaitingRoom';

export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            grid: new Grid(),
            selected: null,
            name: "",
            room: "",
            messages: [],
            message: "",
            num_users: 0
        }
        this.display_moves = this.display_moves.bind(this);
        this.clear_display_moves = this.clear_display_moves.bind(this);
        this.move_sel = this.move_sel.bind(this);
        this.send_message = this.send_message.bind(this);
        const ENDPOINT = 'http://localhost:5000';
        this.socket = io(ENDPOINT);
        this.set_message = this.set_message.bind(this);
        this.ext_move = this.ext_move.bind(this);
    }

    componentDidMount() {
        const {name, room} = queryString.parse(this.props.location.search);
        console.log(name, room);
        this.setState({ name, room });
        this.socket.emit('join', { name, room }, () => {});

        this.socket.on('message', message => {
            this.setState({ messages: [...this.state.messages, message ]});
        });

        this.socket.on('roomData', room_data => {
            this.setState({ num_users: room_data.users.length });
        });

        this.socket.on('move', move => {
            console.log(move);
            this.ext_move(move.start, move.end);
        })
        return () => {
            this.socket.emit('disconnect');
            this.socket.off();
        }
    }


    set_message(event, message) {
        event.preventDefault();
        this.setState({message});
    }

    send_message(event) {
        event.preventDefault();
        if(this.state.message) {
            this.socket.emit('sendMessage', this.state.message, () => this.setState({ message: "" }));
        }
    }

    move_sel(new_pos) {
        let start = this.state.selected.pos;
        let end = new_pos;
        this.state.grid.move_piece(start, end);
        this.clear_display_moves();
        this.setState({ grid: this.state.grid, selected: null });
        this.socket.emit('move', { start, end });
    }

    ext_move(start, end) {
        this.state.grid.move_piece(start, end);
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
                {this.state.num_users >= 2 ? 
                <div>
                <ChessGrid move_sel={this.move_sel} grid={this.state.grid} display={this.display_moves}/>
                <Chat location={this.props.location} 
                name={this.state.name} 
                room={this.state.room}
                message={this.state.message}
                messages={this.state.messages}
                send_message={this.send_message}
                set_message={this.set_message}/>
                </div> : 
                <WaitingRoom/>}
            </div>
        )
    }
}
