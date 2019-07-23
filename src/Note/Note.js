import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './Note.css';



class Note extends Component {
  static defaultProps ={
    deleteNoteRequest: () => {},
  }
  static contextType = NotefulContext;

  deleteNoteRequest = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT_NOTES}/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then((res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      }))
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, modified, id } = this.props
    return (
      <div className='Note'>
        <h2>
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <p>Last Modified: {modified}</p>
        <button onClick={this.deleteNoteRequest} 
        >
          Delete Note
        </button>
      </div>
    )
  }
  
}

Note.defaultProps = {
  onClickDelete: () => {},
}

export default Note;
