import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddNote.css';


class AddNote extends Component {
  static defaultProps ={
    handleSubmit: () => {},
  }

  static contextType = NotefulContext;


  handleSubmit(e) {
    try {
      e.preventDefault();
      
      const noteName = e.target['note-name'].value;
      this.validationErrMsg = this.validateName(noteName);
      if (this.validationErrMsg) return alert(this.validationErrMsg);

      const note = {
        name: noteName,
        content: e.target['note-content'].value,
        folderId: e.target['note-folder'].value,
        modified: new Date(),
      }

      fetch(`${config.API_ENDPOINT_NOTES}`, {
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
        .then(() => {
          this.context.addNote(note);
          this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
          console.error({ error })
        })
      } catch(err) {
        console.log(err);
        this.error = err;
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
    const validationErrMsg = this && this.validationErrMsg;
    return (
      <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add New Note</h2>  
        <div className="form-group">
          <label htmlFor="note-name">Name </label>
          <input type="text"
           name="note-name" id="note-name" />
          {validationErrMsg && (
            <div>{validationErrMsg}</div>
          )}
          
        </div>
         <div>{validationErrMsg}</div>
        <div className="form-group">
          <label htmlFor="note-content">Content </label>
          <textarea type="text"
            name="note-content" id="note-content" />
        </div>
        <div className="form-group">
          <label htmlFor="note-folder">Folder </label>
          <select name="note-folder" id="note-folder">
            {this.context.folders.map(folder => 
              <option value={folder.id} key={folder.id}>{folder.name}</option>
            )}
          </select>

        </div>

        <div className="button_wrapper">
          <button type="submit" className="action-button">
            Save
          </button>
        </div>

        {this.error && (
          <div>{this.error}</div>
        )}

      </form>
    )
  }
}

export default AddNote;
