require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ImgFigure from './imgFigure';

// 图片数据 json

let imageDatas = require('json!../data/imageData.json');
// let yeomanImage = require('../images/yeoman.png');

/**
 * [添加图片引用]
 * @param  {[Array]} imageDataArr 图片json数据
 * @return {[Array]} [保存图片引用之后的数据]
 */
imageDatas = (function(imageDataArr) {

	for ( var i = 0, length = imageDataArr.length; i < length; i ++ ) {
		var singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}

	return imageDataArr;
})(imageDatas)

class AppComponent extends React.Component {
  componentDidMount() {
  	console.log(imageDatas);
  }
  render() {
    return (
      <div className="index">
        <section className="stage">
        	<section className="img-sec">
        		{
        			imageDatas.map((item, index) => <ImgFigure data={item} key={index}></ImgFigure>)
        		}
        	</section>
        	<section className="controller-nav">
        	</section>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
