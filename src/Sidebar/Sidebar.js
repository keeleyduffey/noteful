import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Sidebar.css'

class Sidebar extends Component {
 static contextType = NotefulContext;

  render() {
    const { folders } = this.context;
    return (
      <div className="Sidebars">
        <ul className='Folder__list' aria-live='polite'>
          {folders.map(folder =>
          <li className='Folders' key={folder.id}>
            <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
          </li>
          )}
        </ul>
        <Link to={`/add-folder`} className="add-button folder">+ Add folder</Link>
      </div>
    );
  }
}

export default Sidebar;
