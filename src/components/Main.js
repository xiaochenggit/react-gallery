require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ImgFigure from './imgFigure';
import ControllerUnit from './controllerunit';

// 图片数据 json

// let imageDatas = require('json!../data/imageData.json');
let imageDatas  = [
  {
    fileName: '1.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '2.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '3.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '4.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '5.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '6.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '7.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '8.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '9.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '10.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '11.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '12.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '13.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '14.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '15.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  },
  {
    fileName: '16.jpg',
    title: 'Happy time',
    desc: 'This is a worderful scenery photograph.'
  }
]
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

  constructor() {
    super();
    this.state = {
      Constant: {
        // 中心图片的位置
        centerPos: {
          left: 0,
          top: 0
        },
        // 水平方向的取值范围
        hPosRange: {
          leftSecX: [0, 0],
          rightSecX: [0, 0],
          y: [0, 0]
        },
        // 垂直方向的取值范围
        vPosRange: {
          x: [0, 0],
          topY: [0, 0]
        }
      },
      imgsArrangeArr: [
      // 位置信息
      // {
      //   pos: {
      //     left : 0,
      //     right: 0
      //   },
      //   rotate: 0, // 旋转角度
      //   isInverse: false // 是否正反面
      //   isCenter: false // 是否居中
      // }
      ]
    }
    this.reArrAange = this.reArrAange.bind(this);
    this.getRangeRandom = this.getRangeRandom.bind(this);
  }

  componentDidMount() {
  	// 拿到舞台的大小

    let stage = document.getElementById('stage');
    let stageW = stage.scrollWidth;
    let stageH = stage.scrollHeight;
    let halfStageW = Math.ceil(stageW / 2);
    let halfStageH = Math.ceil(stageH / 2);
    // 拿到 imgFigure
    
    let imgFigureDom = document.getElementById('imgFigure0');
    let imgW = imgFigureDom.scrollWidth;
    let imgH = imgFigureDom.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);
    const Constant = {
        // 获得中心图片的位置
        centerPos: {
          left:  halfStageW - halfImgW,
          top: halfStageH - halfImgH
        },
        // 左右侧位置范围
        hPosRange: {
          leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
          rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
          y: [-halfImgH, stageH - halfImgH]
        },
        // 图片正上方区域
        vPosRange: {
          topY: [-halfImgH, halfStageH - halfImgH * 3],
          x: [halfStageW - imgW, halfStageW]
        }
      }
    // 默认中心图片为第一个
    var imgsArrangeArr = this.state.imgsArrangeArr;
    imageDatas.forEach((element, index) => {
      if (!imgsArrangeArr[index]) {
        imgsArrangeArr[index] = {
          pos:{
            left: 0,
            top: 0
          },
          rotate: 0,
          isCenter: false
        }
      }
    });
    this.setState({ imgsArrangeArr });
    this.setState({Constant}, () => {
        this.reArrAange(0)
    })
  }

  /**
   * [reArrAange 设置中心图片]
   * @param  {[Number]} centerIndex [中心图片的 index]
   * @return {[type]}             [description]
   */
  reArrAange(centerIndex) {
    var self = this;
    var imgsArrangeArr = this.state.imgsArrangeArr,
    Constant = this.state.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,


    // 上侧区域 取1个或者不取
    imgArrangeTopArr = [],
    topImgNum = Math.floor(Math.random() * 2),
    topImgSpliceIndex = 0,
    // 中心图片
    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    imgsArrangeCenterArr[0]= {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };
    // 上侧区域图片状态
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    // 布局上侧区域图片
    imgArrangeTopArr.forEach(function (value, index) {
      imgArrangeTopArr[index] = {
        pos: {
          top: self.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: self.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: self.get30Rotate(),
        isCenter: false
      }
    });
    // 左右两侧的图片
   
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;
      // 前半部分布局在左侧, 后半部分布局在右侧
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          left: self.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: self.getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: self.get30Rotate(),
        isCenter: false
      }
    }
    /** 与上边拉出数组对应再把数组扔进去 */
    // 上部分扔进去
    if (imgArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
    }
    // center 扔进去
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({ imgsArrangeArr });
  }

  /**
   * [getRangeRandom 区间随机数]
   * @param  {[Number]} low  [小值]
   * @param  {[Number]} high [大值]
   * @return {[Number]}      [返回数值]
   */
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
  }
  /**
   * [get30Rotate 随机正负 -30 - 30 之间的数]
   * @return {[Number]} [返回数值]
   */
  get30Rotate() {
    return (Math.random() > 0.5 ? '' : '-') + Math.round(Math.random() * 30)
  }
  /**
   * [inverse 图片翻转]
   * @param  {[Number]} index [翻转图片的 index ]
   * @return {[Func]}       [description]
   */
  inverse(index) {
    return function() {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({ imgsArrangeArr });
    }.bind(this)
  }
  /**
   * [center 图片居中]
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  center(index) {
    return function() {
      this.reArrAange(index);
    }.bind(this);
  }
  render() {
    return (
      <div className="index">
        <section className="stage" ref={(stage) => this.stage = stage } id="stage">
        	<section className="img-sec">
        		{
        			imageDatas.map((item, index) => <ImgFigure data={item} key={index} id={'imgFigure' + index} range={this.state.imgsArrangeArr[index]} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)}></ImgFigure>)
        		}
        	</section>
        	<section className="controller-nav">
            {
              imageDatas.map((item, index) => <ControllerUnit key={index} range={this.state.imgsArrangeArr[index]} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)} />)
            }
        	</section>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
