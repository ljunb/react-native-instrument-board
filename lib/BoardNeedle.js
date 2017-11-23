/**
 * Project - react-native-instrument-board
 * Author      : ljunb
 * Date        : 2017/11/22 下午8:33
 * Description : 中间仪表盘针
 */
import React, {Component} from 'react'
import {
  Polyline,
  G,
  Circle,
} from 'react-native-svg';
import paintbrush from './paintbrush';

export default class BoardNeedle extends Component {

  constructor(props) {
    super(props);
    this.state = this.convertAngle(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.angle !== this.props.angle) {
      this.setState(this.convertAngle(nextProps))
    }
  }

  convertAngle = ({radius, needleRadius, centerSpotRadius, angle, needleAngle}) => {
    // 画箭头
    const {x: x1, y: y1} = paintbrush.drawPoint(radius, needleRadius, angle);
    const {x: x2, y: y2} = paintbrush.drawPoint(radius, centerSpotRadius, angle - needleAngle / 2);
    const {x: x3, y: y3} = paintbrush.drawPoint(radius, centerSpotRadius, angle + needleAngle / 2);

    // 里层灰色
    const {x: x4, y: y4} = paintbrush.drawPoint(radius, centerSpotRadius - 5, angle);
    const {x: x5, y: y5} = paintbrush.drawPoint(radius, centerSpotRadius - 5, angle - needleAngle / 2);

    return {x1, y1, x2, y2, x3, y3, x4, y4, x5, y5}
  };

  render() {
    const {x1, y1, x2, y2, x3, y3, x4, y4, x5, y5} = this.state;

    return (
      <G>
        <Circle
          cx={this.props.radius}
          cy={this.props.radius}
          r={this.props.centerSpotRadius}
          fill="rgb(234, 0, 22)"
        />
        <Circle
          cx={this.props.radius}
          cy={this.props.radius}
          r={this.props.centerSpotRadius - 5}
          strokeWidth={5}
          stroke="rgb(220, 0, 7)"
          fill="none"
        />

        <Polyline
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill="rgb(234, 0, 22)"
        />
        <Polyline
          points={`${x1},${y1} ${x4},${y4} ${x5},${y5}`}
          fill="rgb(220, 0, 7)"
        />
      </G>
    )
  }
}