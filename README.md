# react-native-instrument-board

[![npm](https://img.shields.io/npm/v/react-native-instrument-board.svg)](https://www.npmjs.com/package/react-native-instrument-board)
[![npm](https://img.shields.io/npm/dt/react-native-instrument-board.svg)](https://www.npmjs.com/package/react-native-instrument-board)
[![npm](https://img.shields.io/npm/l/react-native-instrument-board.svg)](https://github.com/ljunb/react-native-instrument-board/blob/master/LICENSE)

该组件源于公司项目，当前业务主要用于反馈买车用户的一个消费态度，工作之余就将其抽取出来了。主要还是当做一个记录，如果后续时间允许，会考虑写一篇关于做这个组件的文章，写写当时遇到的问题和一些技术点。组件依赖于`react-native-svg`，所以基本是`SVG`绘制语句的应用。目前测试情况来看，可能需要 RN >= 0.50.0 😶😶~

如果你想在项目中使用，Android 下可能需要修改项目的 support 包到 25 版本，如 `example` 中的 [gradle 文件](https://github.com/ljunb/react-native-instrument-board/blob/master/example/android/app/build.gradle) 所示。

## 示例效果
![demo](https://github.com/ljunb/screenshots/blob/master/instrument_board.jpeg)

## 安装

使用`npm`：
```
npm install react-native-instrument-board --save
```
用`yarn`：
```
yarn add react-native-instrument-board 
```
安装后，需要执行以下命令：
```
react-native link react-native-svg
```

## 运行example
进入项目根目录
```
cd example
npm install
react-native run-ios/run-android
```

## 参数

名称              | 类型   |  默认值      | 参数描述
----------------  | ------ | -------- | -----------  
percentage             | number |  80  | 进度百分比，内圈红色部分，范围0-100
radius             | number |  150  | 仪表盘半径，注意是外圈半径 
strokeWidth              | number |   8   | 仪表盘边框宽度
startAngle         | number |   36   | 仪表盘0°位置的角度，以经过仪表盘圆点的垂直线作为基准，顺时针方向的角度
contentStrokeColors        | array |   [颜色数组]    |  仪表盘每个区间的边框颜色，与区间个数对应，数组格式
degreeTexts     | array | ['0', '1.0', '2.0', '3.0', '4.0'] | 仪表盘刻度值数组
degreeTextRadius | number | 118 | 仪表盘刻度值的半径，决定了刻度值的显示位置
degreeTextStartOffset | array | ['4%', '0', '0', '0'] | 用于调整仪表盘刻度值偏移量的数组
degreeTextColor      | string | '#999' | 刻度值文本颜色
contentTexts | array | ['精打细算', '理想消费', '不差钱', '有的是钱'] | 仪表盘分段内容的数组
contentTextRadius   | number | 120 | 类似于`degreeTextRadius`仪表盘分段内容的半径，决定了内容区的显示位置
contentTextStartOffset   | array | ['28%', '28%', '35%', '28%'] | 类似于`degreeTextStartOffset`，用于调整内容区文本的偏移量
contentTextColor  | string | '#999' | 仪表盘分段内容的文本颜色
progressRadius    | number | 110  | 进度条半径
progressBackgroundColor | string | '#ccc' | 进度条背景颜色
progressRadius    | string | 'rgb(234, 0, 22)' | 进度条指示颜色
needleRadius   | number  | 80  | 仪表盘指针半径，指圆心至针尖之间长度
needleAngle   | number  | 60  | 仪表盘指针角度，指针在中心圆边缘上所占的扇形角度
centerSpotRadius | number | 16 | 仪表盘中心圆半径
animated  | bool | true | 是否开启动画，暂时只有`Animated.spring`模式
