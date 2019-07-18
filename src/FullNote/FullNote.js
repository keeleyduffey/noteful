import React, { Component } from 'react';
import Note from '../Note/Note';
import NoteDetail from '../NoteDetail/NoteDetail';
// import './MainFolders.css'

class FullNote extends Component {


  render() {
    const { note } = this.props
    console.log(this.props);
    return (
      <section className='Main'>
        <Note {...note} />
        <NoteDetail {...note} />
      </section>
    );
  }
}

export default FullNote;
