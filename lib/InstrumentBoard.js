/**
 * Project - react-native-instrument-board
 * Author      : ljunb
 * Date        : 2017/11/22 下午8:33
 * Description : 简易的仪表盘组件
 */

import React, {Component} from 'react';
import {
  View,
  Animated,
} from 'react-native';

import Svg, {
  Path,
  Text,
  Defs,
  TextPath,
  G,
} from 'react-native-svg';
import PropType from 'prop-types';
import PCDashArrow from './BoardNeedle';
import PCDashProgress from './BoardProgress';
import paintbrush from './paintbrush';
import PCDashTitle from "./BoardTitle";

const AnimatedDashArrow = Animated.createAnimatedComponent(PCDashArrow);
const AnimatedDashProgress = Animated.createAnimatedComponent(PCDashProgress);
const AnimatedDashTitle = Animated.createAnimatedComponent(PCDashTitle);

export default class InstrumentBoard extends Component {
  static propTypes = {
    // 百分比，0-100
    percentage: PropType.number,
    // 整体半径，指外圈
    radius: PropType.number,
    // 边框宽度
    strokeWidth: PropType.number,
    // 开始的角度，0-360
    startAngle: PropType.number,
    // 区域的边框颜色
    contentStrokeColors: PropType.array,
    // 刻度值文本数组
    degreeTexts: PropType.array,
    // 刻度值半径
    degreeTextRadius: PropType.number,
    // 刻度值文本偏移量数组
    degreeTextStartOffset: PropType.array,
    // 区域内容文本数组
    contentTexts: PropType.array,
    // 区域内容半径
    contentTextRadius: PropType.number,
    // 区域内容文本偏移量数组
    contentTextStartOffset: PropType.array,
    // 进度条半径
    progressRadius: PropType.number,
    // 指示针半径
    needleRadius: PropType.number,
    // 指示箭头角度（决定箭头宽度）
    needleAngle: PropType.number,
    // 指示箭头中心圆点半径
    centerSpotRadius: PropType.number,
  };

  static defaultProps = {
    percentage: 80,
    radius: 150,
    strokeWidth: 8,
    degreeTexts: ['0', '1.0', '2.0', '3.0', '4.0'],
    degreeTextStartOffset: ['4%', '0', '0', '0'],
    contentTexts: ['精打细算', '理性消费', '不差钱', '有的是钱'],
    contentTextStartOffset: ['28%', '28%', '30%', '28%'],
    contentStrokeColors: ['rgb(11, 86, 215)', 'rgb(26, 189, 131)', 'rgb(248, 145, 7)', 'rgb(234, 0, 22)'],
    startAngle: 36,
    progressRadius: 110,
    needleRadius: 80,
    needleAngle: 60,
    centerSpotRadius: 16,
    contentTextRadius: 120,
    degreeTextRadius: 118,
  };

  constructor(props) {
    super(props);
    this.state = {
      percentage: props.percentage,
    };
    this.degreeTextKeys = this.makePathKeys(props.degreeTexts);
    this.contentTextKeys = this.makePathKeys(props.contentTexts);
  }

  degAnimatedValue = new Animated.Value(0);

  componentDidMount() {
    this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    const {percentage} = this.props;
    if (percentage !== nextProps.percentage) {
      this.setState({percentage: nextProps.percentage}, this.startAnimation)
    }
  }

  // 创建TextPath的id引用
  makePathKeys = textArr => textArr.map((item, key) => `TextPath_${item}_${key}`);

  definedDegreeTextPath = ((id, index) => {
    const {radius, startAngle, degreeTextRadius, contentTexts} = this.props;
    // 可旋转的总角度
    const totalAngle = (360 - startAngle * 2);
    // 每个区域的角度大小
    const contentAngle = totalAngle / contentTexts.length;

    const startA = startAngle + contentAngle * index - 4;
    const endA = startAngle + contentAngle * (index + 1);
    return (
      <Path
        key={id}
        id={id}
        d={paintbrush.drawArc(radius, degreeTextRadius, startA, endA, true)}
      />
    )
  });

  definedContentTextPath = ((id, index) => {
    const {radius, startAngle, contentTextRadius, contentTexts} = this.props;
    // 可旋转的总角度
    const totalAngle = (360 - startAngle * 2);
    // 每个区域的角度大小
    const contentAngle = totalAngle / contentTexts.length;

    const startA = startAngle + contentAngle * index;
    const endA = startAngle + contentAngle * (index + 1);
    return (
      <Path
        key={id}
        id={id}
        d={paintbrush.drawArc(radius, contentTextRadius, startA, endA, true)}
      />
    )
  });

  drawContentStrokeItem = ((color, index) => {
    const {radius, strokeWidth, startAngle, contentTexts} = this.props;
    // 可旋转的总角度
    const totalAngle = (360 - startAngle * 2);
    // 每个区域的角度大小
    const contentAngle = totalAngle / contentTexts.length;
    // 除去strokeWidth的内层半径
    const innerRadius = radius - strokeWidth;

    const startA = startAngle + contentAngle * index;
    const endA = startAngle + contentAngle * (index + 1);
    const isLast = this.props.contentStrokeColors.length === index + 1;
    return (
      <G key={`G_${color}`}>
        <Path
          key={color}
          d={paintbrush.drawArc(radius, innerRadius, startA, endA)}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Path
          d={paintbrush.drawArc(radius, innerRadius - strokeWidth, startA, startA + 1)}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {isLast &&
        <Path
          d={paintbrush.drawArc(radius, innerRadius - strokeWidth, endA - 1, endA)}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        }
      </G>
    )
  });

  drawDegreeTextItem = ((key, index) => {
    return (
      <Text key={key} fill="#ccc">
        <TextPath href={`#${key}`} startOffset={this.props.degreeTextStartOffset[index]}>
          {this.props.degreeTexts[index]}
        </TextPath>
      </Text>
    )
  });

  drawContentTextItem = ((key, index) => {
    return (
      <Text key={key} fill="#ccc">
        <TextPath href={`#${key}`} startOffset={this.props.contentTextStartOffset[index]}>
          {this.props.contentTexts[index]}
        </TextPath>
      </Text>
    )
  });

  render() {
    const {centerSpotRadius, needleAngle, radius, startAngle, degreeTexts, contentTexts} = this.props;
    const lastItem = degreeTexts[degreeTexts.length - 1];
    // 可旋转的总角度
    const totalAngle = (360 - startAngle * 2);

    const arrowAnimatedAngle = this.degAnimatedValue.interpolate({
      inputRange: [0, this.state.percentage],
      outputRange: [startAngle, this.state.percentage / 100 * totalAngle + startAngle]
    });

    const progressAnimatedValue = this.degAnimatedValue.interpolate({
      inputRange: [0, this.state.percentage],
      outputRange: [startAngle, startAngle + (this.state.percentage / 100 * totalAngle)]
    });

    const titleValue = this.degAnimatedValue.interpolate({
      inputRange: [0, this.state.percentage],
      outputRange: [0, this.state.percentage / 100 * lastItem]
    });

    return (
      <View>
        <Svg height={radius * 2} width={radius * 2}>
          <Defs>
            {this.degreeTextKeys.map(this.definedDegreeTextPath)}
            {this.contentTextKeys.map(this.definedContentTextPath)}
          </Defs>
          {this.props.contentStrokeColors.map(this.drawContentStrokeItem)}
          {this.degreeTextKeys.map(this.drawDegreeTextItem)}
          {this.contentTextKeys.map(this.drawContentTextItem)}
          <AnimatedDashProgress
            progressRadius={this.props.progressRadius}
            radius={radius}
            totalAngle={totalAngle}
            startAngle={startAngle}
            endAngle={progressAnimatedValue}
          />
          <AnimatedDashArrow
            radius={radius}
            needleRadius={this.props.needleRadius}
            centerSpotRadius={centerSpotRadius}
            angle={arrowAnimatedAngle}
            needleAngle={needleAngle}
          />
        </Svg>
        <AnimatedDashTitle
          title={titleValue}
          startAngle={startAngle}
          radius={radius}
          innerRadius={this.props.progressRadius}
          subTitle={contentTexts[this.getSubtitle([this.state.percentage / 100 * lastItem])]}
        />
      </View>
    );
  }

  getSubtitle = (percentage) => {
    const {degreeTexts} = this.props;
    let findIndex = 0;
    for (let i = 0; i < degreeTexts.length; i++) {
      const value = degreeTexts[i];
      if (value >= percentage) {
        findIndex = i;
        break;
      }
    }

    if (findIndex === degreeTexts.length - 1) {
      findIndex--;
    }

    return findIndex;
  };

  startAnimation = () => {
    Animated.spring(this.degAnimatedValue, {
      toValue: this.state.percentage,
      duration: 4000,
    }).start();
  };
}