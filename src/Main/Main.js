import React, { Component } from 'react';
import Note from '../Note/Note';
import './Main.css'

class Main extends Component {
  static defaultProps = {
    notes: []
  };

  render() {
    const { notes } = this.props
    return (
      <section className='Main'>
        <ul className='Note__list' aria-live='polite'>
          {notes.map(note =>
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
