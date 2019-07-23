import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Sidebar.css'

class Sidebar extends Component {
 static contextType = NotefulContext;

  render() {
    const { folders } = this.context;

    return (
      <section className='Sidebar'>
        <ul className='Folder__list' aria-live='polite'>
          {folders.map(folder =>
          <li className='Folders' key={folder.id}>
            <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
          </li>
          )}
        </ul>
        <button>Add folder</button>
      </section>
    );
  }
}

export default Sidebar;
