import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css';



class Note extends Component {
  static defaultProps = {
    name: '',
    id: '',
    date_modified: '',
    deleteNoteRequest: () => {},
  }
  static contextType = NotefulContext;

  deleteNoteRequest = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
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
        this.props.deleteNoteRequest(noteId);
        // this.props.history.push(`/`);
        // console.log(this.context);
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, date_modified, id } = this.props
    return (
      <div className='Note'>
        { name &&
          <div>
            <h2>
              <Link to={`/note/${id}`} className="Note_Name">{name}</Link>
            </h2>
            <p>Last Modified: {new Date(date_modified).toUTCString()}</p>
              <button onClick={this.deleteNoteRequest} className="action-button">
                Delete Note
              </button>
          </div>
        }
        {!name &&
         <div>No note found</div>
        }
      </div>
        
    )
  }
  
}

Note.propTypes = {
  // id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date_modified: PropTypes.string.isRequired,
};


export default Note;
