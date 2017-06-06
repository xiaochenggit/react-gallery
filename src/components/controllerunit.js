import React , { Component } from 'react';

class ControllerUnit extends Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	render(){
		return(
			<span className="controller-unit" onClick={this.handleClick}></span>
		);
	}
}

export default ControllerUnit;