/**
 * Project - react-native-instrument-board
 * Author      : ljunb
 * Date        : 2017/11/22 下午8:33
 * Description : 内部的进度弧圈
 */
import React, { Component } from 'react'
import {
  G,
  Path,
} from 'react-native-svg';
import paintbrush from './paintbrush';

export default class BoardProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endAngle: props.endAngle
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.endAngle !== this.props.endAngle) {
      this.setState({endAngle: nextProps.endAngle})
    }
  }

  render() {
    const {
      progressRadius, radius, startAngle, totalAngle,
      progressColor, progressBackgroundColor
    } = this.props;
    const {endAngle} = this.state;

    return (
      <G>
        <Path
          d={paintbrush.drawArc(radius, progressRadius, startAngle, startAngle + totalAngle, true)}
          stroke={progressBackgroundColor}
          strokeWidth={2}
          fill="none"
        />
        <Path
          d={paintbrush.drawArc(radius, progressRadius, startAngle, endAngle, true)}
          stroke={progressColor}
          strokeWidth={2}
          fill="none"
        />
      </G>
    )
  }
}