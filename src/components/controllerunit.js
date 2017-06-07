import React , { Component } from 'react';

class ControllerUnit extends Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		// 如果选中状态就反转 反之就居中
		if (this.props.range.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}
		event.stopPropagation();
		event.preventDefault();
	}

	render(){
		var controllerClassName = 'controller-unit';
		// 判断元素是否是选中 或者旋转状态
		if (this.props.range) {
			if (this.props.range.isCenter) {
				controllerClassName += ' is-center';
			}
			if (this.props.range.isInverse) {
				controllerClassName += ' is-inverse'
			}
		}
		return(
			<span className={controllerClassName} onClick={this.handleClick}></span>
		);
	}
}

export default ControllerUnit;