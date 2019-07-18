import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

class Note extends Component {

  render() {
    const { name, modified, id } = this.props
    return (
      <div className='Note'>
        <h2>
          <Link to={`note/${id}`}>{name}</Link>
        </h2>
        <p>Last Modified: {modified}</p>
        <button>Delete Note</button>
      </div>
    )
  }
  
}

Note.defaultProps = {
  onClickDelete: () => {},
}

export default Note;
