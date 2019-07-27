import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    hasError: false
	  };
	}

	static getDerivedStateFromError(error) {
	 return {
	  hasError: true
	 }
	}

  render() {
  	const { hasError } = this.state
		if (hasError) {     
    	return (
	      <h2>Could not display this section.</h2>
	    );
	  }
	  return this.props.children;
	}
}

export default ErrorBoundary;
