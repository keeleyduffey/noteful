import React, { Component } from 'react';
import Note from '../Note/Note';
import NoteDetail from '../NoteDetail/NoteDetail';
import NotefulContext from '../NotefulContext';
import MainSectionError from '../ValidationError/ValidationError';
import {getNote} from '../helper-functions';

class FullNote extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context
    const {noteId} = this.props.match.params;
    const note = getNote(notes, noteId);

    return (
      <MainSectionError>
        <div>
          <Note {...note} />
          <NoteDetail {...note} />
        </div>
      </MainSectionError>
    );
  }
}

export default FullNote;
