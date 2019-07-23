import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import './Sidebar.css'

class NoteSidebar extends Component {
  static defaultProps = {
    folders: []
  };

  render() {
    return (
      <button className='NoteSidebar'
        onClick={() => this.props.history.goBack()}>
        Back
      </button>
    );
  }
}

export default NoteSidebar;
