# lightCat-joystick

![lightCat-Studio](https://img.shields.io/badge/lightCat_Studio-lightCatCode-blue)

![MIT](https://img.shields.io/badge/MIT-green)

[Github-lightCat-spring](https://github.com/lightCatStudio/lightCat-spring-joystick/tree/main)
[lightCatCode](https://lightcatcode.flarum.cloud)

## 目录

1. 版本介绍
2. 引入地址
3. 使用方法
4. 定制方法
5. MIT开源许可证
6. 工作室声明

## 一，版本介绍

version: 1.0.1
此版本具备一般摇杆功能，但是这并不代表着它满足所有开发者对于游戏摇杆的需求，它具备一定的定制能力和适配能力，可以满足80%以上的摇杆需求，但是此版本是基于light-spring游戏需求开发的，所以大部分接口都是为了满足light-spring的开发需求而制作的。在后续的版本中可能会重新编写此摇杆的功能及其接口。此版本相对于1.0.0版本，新增了内外摇杆阴影设置和内外摇杆背景设置。

> 警告：此版本的摇杆不支持多实例创建，即只可以有一个实例对象！

## 二，引入地址

你可以通过jsDelivr来引入lightCat-joystick的依赖文件：

```
<script src="https://cdn.jsdelivr.net/gh/lightCatStudio/lightCat-spring-joystick@main/lightCat-joystick.js"></script>
```

但是我们不建议使用原文件，因为它相对于压缩文件占用了一部分的加载时间，我们更建议你使用lightCat-joystick压缩文件：

```
<script src="https://cdn.jsdelivr.net/gh/lightCatStudio/lightCat-spring-joystick@main/lightCat-joystick.min.js"></script>
```

当然，你也可以直接从[Github](https://github.com/lightCatStudio/lightCat-spring-joystick/tree/main)仓库下载lightCat-joystick.js或者lightCat-joystick.min.js，并且通过本地引入的方式使用摇杆。

## 三，使用方法

**在开始之前，请确保你的HTML中已经正确引入lightCat-joystick！**

首先，你必须通过使用new 关键字和构造函数来创建对象。在这种情况下，lightJoystick 是一个构造函数，通过 new lightJoystick()创建一个新的 lightJoystick 实例对象，就像这样：

```JavaScript
var light = new lightJoystick();
```

你创建了一个名为light的lightJoystick实例，接着，你需要通过摇杆的唯一核心方法`.joystick()`在页面上面绘制摇杆，就像这样：

```JavaScript
var light = new lightJoystick();
light.joystick();
```

> 警告：不可以在未创建实例之前直接通过lightJoystick.joystick();来绘制摇杆，因为这将导致你正在调用一个不存在的函数！

这时，当你刷新页面之后，你就可以看见摇杆了，只不过，如果此时你操作摇杆，控制台会一直抛出错误：**null**。对于摇杆而言，摇杆本身的作用就是返回此时所在的位置，距离，方向等信息，而你在调用它的时候，并没有考虑到这一点，也就导致了摇杆不知道应该把数据告诉谁，从而也就使得控制台一直在抛出错误！所以，你在调用它的时候，你需要给他一个接收返回数据的对象：

```JavaScript
var light = new lightJoystick();
light.joystick(function(data) {
    //对数据进行处理的函数
})
```

这样问题就可以解决了，对于上面这段代码，你会发现它多了一个 `function (data){}` 函数，这个，就是用来处理返回数据的函数，仔细观察不难发现，在这个函数的开头，原本为 `function (){}` 的原生函数，变为了 `function (data){}`，也就代表着它是一个回调函数，data 是一个形参，它代表在触发事件或条件时会传递给回调函数的数据，这里的data可以简单理解为你给返回数据起的一个名字，当然，你也可以换为别的，这里就使用data来作为示例。在回调数据中，一共有六个参数：

| 参数 | 内容 | 输出示例 |
| --- | --- | --- |
| .x | 返回x轴位置 | console.log(data.x); |
| .y | 返回y轴位置 | console.log(data.y); |
| .angle | 返回摇杆角度 | console.log(data.angle); |
| .distance | 返回摇杆距离中心距离 | console.log(data.distance); |
| .isTouching | 返回摇杆是否被触摸 | console.log(data.isTouching); |
| .direction | 返回摇杆方向 | console.log(data.direction); |

> 注意：因为刚刚使用的是data作为形参示例，所以在示例输出时也要以形参data作为开头，如果你使用的是其他名字的形参，注意对其进行修改，例：你使用的形参名为info，当你想要得到摇杆方向时，你就应该使用：`info.direction`

使用示例(输出摇杆的角度)：
```JavaScript
var light = new lightJoystick();
light.joystick(function(data) {
    console.log(data.angle); 
})
```

## 四，定制方法

摇杆一共有28种样式定义方法：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| JOSZ | 100px | 摇杆容器的尺寸 |
| JOBS | solid | 摇杆容器的边框样式 |
| JOBW | 1px | 摇杆容器的边框宽度 |
| JOBC | #D6D6D6 | 摇杆容器的边框颜色 |
| JOBR | 50% | 摇杆容器的边框圆角半径 |
| JOP | fixed | 摇杆容器的定位属性 |
| JOT | (空) | 摇杆容器距离顶部的位置 |
| JOB | (空) | 摇杆容器距离底部的位置 |
| JOL | (空) | 摇杆容器距离左侧的位置 |
| JOR | (空) | 摇杆容器距离右侧的位置 |
| JOBG | rgba(255,255,255,0) | 摇杆容器的背景颜色 |
| JOBGIM | (空) | 摇杆容器的背景图像 |
| JOSD | 0px 0px 5px #D6D6D6 | 摇杆容器的阴影样式 |
| JIBS | solid | 摇杆的边框样式 |
| JIBW | 1px | 摇杆的边框宽度 |
| JIBC | #DFDFDF | 摇杆的边框颜色 |
| JIBR | 50% | 摇杆的边框圆角半径 |
| JISZ | 50px | 摇杆的尺寸 |
| JIBG | rgba(255,255,255,1) | 摇杆的背景颜色 |
| JIBGIM | (空) | 摇杆的背景图像 |
| JISD | 0px 0px 5px #D6D6D6 | 摇杆的阴影样式 |
| transitionout | 0.1 | 摇杆容器缩放的过渡时间(秒) |
| transition | 0.2 | 摇杆返回虚拟摇杆中心时的过渡时间(秒) |
| transitionback | 200 | 摇杆返回虚拟摇杆中心时的延迟时间(毫秒) |
| scale | 1.1 | 摇杆按下时摇杆容器的缩放比例 |
| MM | 1.4 | 摇杆可移动的最大距离与摇杆容器半径之间的比例 |
| ZOI | 999 | 摇杆容器的层级 |
| ZII | 9999 | 摇杆的层级 |

**这些定制方法都必须在创建实例时就加入** 比如你使用 `var` 定义一个`info{MM:1,scale: '1.1'//.....其它}`以表示你想要更改默认样式，那么当你想要把它作用于实际摇杆时，你就需要在创建实例时使用`var light = new lightJoystick(info);`，这样你就可以得到一个你自己定制的摇杆了，当然，你也可以像这样使用`var light = new lightJoystick({MM:1,scale: '1.1'//.....其它});`。

## 五，MIT开源许可证

MIT开源许可证（中文版）

版权所有（c）2023年 光猫工作室

特此授予任何获得本软件和相关文档文件（“软件”）副本的人免费许可证，以在软件中不受限制地处理软件，包括但不限于使用、复制、修改、合并、发布、分发、再许可和/或销售本软件的副本，并允许向其提供软件的人这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在本软件的所有副本或实质性部分中。

本软件按“原样”提供，不提供任何形式的明示或暗示保证，包括但不限于适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任承担责任，无论是在合同、侵权或其他方面，由本软件或本软件的使用或其他行为引起的或与之相关的。

MIT License (English Version)

Copyright (c) 2023year lightCat-Studio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 六，工作室声明

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com?user=lightCatStudio&theme=ambient-gradient&hide_border=%E7%9C%9F&border_radius=10&locale=zh_Hans&date_format=n%2Fj%5B%2FY%5D)](https://git.io/streak-stats)

此框架由光猫工作室开发，一切问题请在[lightCatCode](https://lightCatCode.flarum.cloud)社区留言，或者发送邮件至zry110522@163.com。
