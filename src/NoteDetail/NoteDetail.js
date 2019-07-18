import React, { Component } from 'react';
// import Folder from '../Folder/Folder';
// import './MainFolders.css'

class NoteDetail extends Component {
  // static defaultProps = {
  //   folders: []
  // };

  render() {
    const { content } = this.props
    console.log(this.props);
    return (
      <section className='NoteDetail'>
        <p>{content}</p> 
      </section>
    );
  }
}

export default NoteDetail;
