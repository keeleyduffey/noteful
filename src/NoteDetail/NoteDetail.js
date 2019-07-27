import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NoteDetail extends Component {
  static defaultProps = {
    content: ''
  };

  render() {
    const { content } = this.props
    return (
      <section className='NoteDetail'>
        <p>{content}</p> 
      </section>
    );
  }
}

NoteDetail.propTypes = {
  content: PropTypes.string.isRequired,
};

export default NoteDetail;
