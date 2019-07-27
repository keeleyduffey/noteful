import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';

class AddFolder extends Component {
  static defaultProps = {
    handleSubmit: () => {},
  }

  static contextType = NotefulContext;

  handleSubmit(e) {
    e.preventDefault();
    const folder = {
      name: e.target['folder-name'].value
    }

    fetch(`${config.API_ENDPOINT_FOLDERS}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
    .then((res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      }))
      .then(() => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }

  render () {
   return (
     <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
       <h2>Add New Folder</h2>  
        <div className="form-group">
          <label htmlFor="folder-name">Name</label>
          <input type="text"
            name="folder-name" id="folder-name" />
       </div>

       <div className="button_wrapper">
        <button type="submit" className="action-button">
          Save
        </button>
       </div>
     </form>
   )
  }
}

export default AddFolder;
