import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import config from '../config';
import './AddNote.css';


class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      validationErr: ''
    };
  }

  static defaultProps = {
    handleSubmit: () => {},
    history: {
      push: () => {}
    },
  }

  static contextType = NotefulContext;

  handleSubmit(e) {
    try {
      e.preventDefault();
      
      const noteName = e.target['note-name'].value;
      const validationErrMsg = this.validateName(noteName);
      if (validationErrMsg) return this.setState({ validationErr: validationErrMsg });

      const note = {
        name: noteName,
        content: e.target['note-content'].value,
        folder_id: e.target['note-folder'].value,
        date_modified: new Date(),
      }

      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(note),
      })
      .then((res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e));
          return res.json();
        }))
        .then(note => {
          this.context.addNote(note);
          this.props.history.push(`/folder/${note.folder_id}`)
        })
        .catch(error => {
          console.error({ error })
        })
      } catch(err) {
        console.log(err);
        this.setState({ error: err });
      }
    

  }

  validateName(name) {
    if (name.length === 0) {
      return 'Note name is required';
    } else if (name.length < 2) {
      return 'Note name must be at least 2 characters long';
    }
  }

  render () {

    return (
      <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add New Note</h2>  
        <div className="form-group">
          <label htmlFor="note-name">Name </label>
          <input type="text"
           name="note-name" id="note-name" />
          {this.state.validationErr && (
            <div>{this.state.validationErr}</div>
          )}  
        </div>

        <div className="form-group">
          <label htmlFor="note-content">Content </label>
          <textarea type="text"
            name="note-content" id="note-content" />
        </div>
        <div className="form-group">
          <label htmlFor="note-folder">Folder </label>
          <select name="note-folder" id="note-folder">
            {this.context.folders.map(folder => 
              <option value={folder.id} key={folder.id}>{folder.folder_name}</option>
            )}
          </select>

        </div>

        <div className="button_wrapper">
          <button type="submit" className="action-button">
            Save
          </button>
        </div>

        {this.state.error &&  (
          <div>{this.state.error.toString()}</div>
        )}

      </form>
    )
  }
}

AddNote.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  })
};

export default AddNote;
