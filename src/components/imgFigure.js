import React , { Component } from 'react';

class ImgFigure extends Component {
	constructor(){
		super();
		this.state = {
			style: {

			}
		}
	}
	render() {
		if (this.props.range) {
			this.state.style = this.props.range.pos;
			['-moz-','-ms-','-webkit',''].forEach((value) => {
				this.state.style[value + 'transform'] = 'rotate(' + this.props.range.rotate + 'deg)';
			});
		}
		return (
			<figure className="img-figure" id ={this.props.id} style={this.state.style}>
				<img src={this.props.data.imageURL}
					 alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
}

export default ImgFigure;
