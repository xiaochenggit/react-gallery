import React , { Component } from 'react';

class ImgFigure extends Component {
	constructor(){
		super();
		this.state = {
			style: {

			}
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event) {
		if (this.props.range.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}
		event.stopPropagation();
		event.preventDefault();
	}
	render() {
		var imgFigureClassName = 'img-figure';
		if (this.props.range) {
			this.state.style = this.props.range.pos;
			if (!this.props.range.isInverse) {
				this.state.style['transform'] = 'rotate(' + this.props.range.rotate + 'deg)';
			} else {
				this.state.style['transform'] = 'translateX(100%) rotateY(180deg)';

			}
			if (this.props.range.isCenter) {
				this.state.style.zIndex = 103;
			}
			imgFigureClassName += this.props.range.isInverse ? '  is-inverse' : '';
		}
		
		return (
			<figure className={imgFigureClassName} id ={this.props.id} style={this.state.style} onClick={this.handleClick}>
				<img src={this.props.data.imageURL}
					 alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className = 'img-back' onClick={this.handleClick} >
			          <p>
			            {this.props.data.desc}
			          </p>
			        </div>
				</figcaption>
			</figure>
		)
	}
}

export default ImgFigure;
