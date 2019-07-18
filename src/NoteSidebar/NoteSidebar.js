import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import './Sidebar.css'

class Sidebar extends Component {
  static defaultProps = {
    folders: []
  };

  render() {
    console.log(this.props);
    return (
      <button className='NoteSidebar'
        onClick={() => this.props.history.goBack()}>
        Back
      </button>
    );
  }
}

export default Sidebar;
