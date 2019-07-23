import React, { Component } from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import {getNotesForFolder} from '../helper-functions';
import './Main.css'

class Main extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className='Main'>
        <ul className='Note__list' aria-live='polite'>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                {...note}
              />
            </li>
          )}
        </ul>
        <button>Add note</button>
      </section>
    );
  }
}

export default Main;
