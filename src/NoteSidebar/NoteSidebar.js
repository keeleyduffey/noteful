import React, { Component } from 'react';

class NoteSidebar extends Component {

  render() {
    return (
      <div className="Sidebars">
        <button className='action-button'
          onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default NoteSidebar;
