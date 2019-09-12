import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import config from '../config';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
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
       const folder = {
         folder_name: e.target['folder-name'].value
       }
       fetch(`${config.API_ENDPOINT}/folders`, {
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
         .then(folder => {
           this.context.addFolder(folder);
           this.props.history.push(`/folder/${folder.id}`)
         })
         .catch(error => {
           console.error({ error })
         })
      } catch (err) {
        console.log(err);
        this.setState({ error: err });
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


        {this.state.error && (
          <div>{this.state.error.toString()}</div>
        )}

     </form>
   )
  }
}

AddFolder.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  })
};

export default AddFolder;
