import React, { Component } from 'react';
import { connect } from 'react-redux';

import { notes, auth } from "../store/actions";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class PonyNote extends Component {

    componentDidMount() {
        this.resetForm();
        this.props.fetchNotes();
    }

    state = {
        text: "",
        updateNoteId: null,
    }

    resetForm = () => {
        this.setState({ text: "", updateNoteId: null });
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({ text: note.text, updateNoteId: id });
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
        }
    }

    render() {
        return (
            <Container className="p-3">
                <Jumbotron  >
                    <div>
                        <h2>Crude  Simples!</h2>
                        <hr />
                        <h3>Add new note</h3>
                        <form onSubmit={this.submitNote}>
                            <input
                                value={this.state.text}
                                placeholder="Enter note here..."
                                onChange={(e) => this.setState({ text: e.target.value })}
                                required />
                            <button onClick={this.resetForm}>Reset</button>
                            <input type="submit" value="Save Note" />
                        </form>

                        <h3>Notes</h3>
                        <table>
                            <tbody>
                                {this.props.notes.map((note, id) => (
                                    <tr key={`note_${note.id}`}>
                                        <td>{note.text}</td>
                                        <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                                        <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Jumbotron>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);