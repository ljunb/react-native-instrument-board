/**
 * Project - react-native-instrument-board
 * Author      : ljunb
 * Date        : 2017/11/22 下午9:24
 * Description : 画笔类
 */
class Paintbrush {

  /**
   * 绘制弧线
   *
   * @param {Number} outerRadius 外层半径
   * @param {Number} innerRadius 内层半径
   * @param {Number} startAngle 起始点角度，0-360
   * @param {Number} endAngle 结束点角度，0-360
   * @param {Boolean} progress 是否绘制进度条，这里用于区分svg的镜像取值
   * @return {String} svg绘制语句
   */
  static drawArc = (outerRadius, innerRadius, startAngle, endAngle, progress = false) => {
    const {x: startX, y: startY} = Paintbrush.drawPoint(outerRadius, innerRadius, startAngle);
    const {x: endX, y: endY} = Paintbrush.drawPoint(outerRadius, innerRadius, endAngle);

    let mirrorImage = 0;
    if (progress) {
      mirrorImage = endAngle - startAngle >= 180 ? 1 : 0;
    }

    return `M ${startX} ${startY} A ${innerRadius} ${innerRadius} 0 ${mirrorImage} 1 ${endX} ${endY}`;
  };

  /**
   * 绘制点
   *
   * @param {Number} outerRadius 外层半径
   * @param {Number} innerRadius 内层半径
   * @param {Number} angle 点角度，0-360
   * @return {Object} 一个点对象{x, y}
   */
  static drawPoint = (outerRadius, innerRadius, angle) => {
    const x = outerRadius + innerRadius * Math.sin(2 * Math.PI / 360 * (360 - angle));
    const y = outerRadius + innerRadius * Math.cos(2 * Math.PI / 360 * angle);
    return {x, y};
  };
}

export default Paintbrush;