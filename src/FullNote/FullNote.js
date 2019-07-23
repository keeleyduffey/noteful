import React, { Component } from 'react';
import Note from '../Note/Note';
import NoteDetail from '../NoteDetail/NoteDetail';
import NotefulContext from '../NotefulContext';
import {getNote} from '../helper-functions';

class FullNote extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context
    const {noteId} = this.props.match.params;
    const note = getNote(notes, noteId);
    return (
      <section className='Main'>
        <Note {...note} />
        <NoteDetail {...note} />
      </section>
    );
  }
}

export default FullNote;
