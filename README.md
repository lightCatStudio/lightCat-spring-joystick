# lightCat-joystick.js

[Github-lightCat-joystick](https://github.com/lightCatStudio/lightCat-spring-joystick/tree/main "项目地址")

目录

1. 引入地址
2. 版本
3. 插件方法
4. 定制方法
5. MIT开源许可证
6. 工作室声明

##### 一，引入地址

你可以通过jsDelivr来引入lightCat-joystick的依赖文件:

`https://cdn.jsdelivr.net/gh/lightCatStudio/lightCat-spring-joystick@main/lightCat-joystick.js`

但是我们不建议使用原文件，因为它相对于压缩文件占用了一部分的加载时间，我们更建议你使用lightCat-joystick压缩文件:

`https://cdn.jsdelivr.net/gh/lightCatStudio/lightCat-spring-joystick@main/lightCat-joystick.min.js`

当然，你也可以直接从Github仓库下载lightCat-joystick.js或者lightCat-joystick.min.js

##### 二，版本

version: 1.0.0

此版本具备一般摇杆的功能，但是这并不代表着它满足所有开发者对于游戏摇杆的需求，它具备一定的定制能力和适配能力，可以满足80%以上的摇杆需求，但是此版本是基于light-spring游戏需求开发的，所以大部分接口都是为了满足light-spring的开发需求，在后续的版本中可能会重新编写摇杆的功能。

##### 三，插件方法

在使用插件时，你必须通过使用 new 关键字和构造函数来创建对象。在这种情况下，lightJoystick 是一个构造函数，通过 new lightJoystick() 创建一个新的 lightJoystick 实例对象，因为只有这样你才可以正常使用joystick插件。在插件中也只有一个方法:  **.joystick()**

> 错误实例创建：`lightJoystick.joystick()`


> 正确实例创建：`var light = new lightJoystick();`

有了实例并且创建了别名之后，你会发现什么都没有发生🤔，这时.joystick()方法就有用了，通过使用刚刚创建的别名light你可以使用light.joystick()来在屏幕上面绘制摇杆，这时，你就可以看见摇杆了!只是此时，当你操作摇杆时，控制台会告诉你：**callback is not a function**，不要担心，你的每一步都没有错，只是摇杆不知道现在应该把它自己的位置告诉给谁，你只需把light.joystick()稍作修改，这件事就可以完美解决。在light.joystick()里面添加获取回调的函数
`light.joystick(function(data) {//其他操作});`控制台就不会再告诉你 **callback is not a function**，这里的其他操作，就是摇杆返回位置后对应的处理函数了，在回调`function(data)`里面并非必须是data，你也可以换为别的，这里以data为例。回调一共会有三个分别为data.delta.x，data.delta.y，data.distance，你可以通过这几个回调知道摇杆对应的x轴位置，y轴位置和距离摇杆中心的距离。例如：
`console.log("Distance: " + data.delta.x);//输出x轴位置`
`console.log("Distance: " + data.delta.y);//输出y轴位置`
`console.log("Distance: " + data.distance);//输出距离摇杆中心的位置`

> 警告：请不要尝试直接使用data或者其他回调定义名来获取所有回调内容否则控制台会告诉你：[object Object]

##### 四，定制方法

lightCat-joystick一共有20种样式定义方法：

* JOBP: 定义了摇杆容器的定位方式，默认设置为 'fixed'，表示固定定位在屏幕上。
* JOBT: 定义了摇杆容器距离顶部的位置。可以根据需要设置具体数值或使用空字符串 ''。
* JOBB: 定义了摇杆容器距离底部的位置。可以根据需要设置具体数值或使用空字符串 ''。
* JOBL: 定义了摇杆容器距离左侧的位置。可以根据需要设置具体数值或使用空字符串 ''。
* JOBR: 定义了摇杆容器距离右侧的位置。可以根据需要设置具体数值或使用空字符串 ''。
* JOBBS: 定义了摇杆容器的边框样式，默认设置为 'solid'，表示实线边框。
* JOBBW: 定义了摇杆容器的边框宽度，默认设置为 '1px'，表示边框宽度为1像素。
* JOBBR: 定义了摇杆容器的边框圆角半径，默认设置为 '50%'，表示圆角半径为容器宽度的50%。
* JOBBC: 定义了摇杆容器的边框颜色，默认设置为 '#D0D0D0'，表示边框颜色为灰色。
* JOBBGC: 定义了摇杆容器的背景颜色，默认设置为 'rgba(255,255,255,0)'，表示背景颜色为透明。
* JOBS: 定义了摇杆容器的宽度和高度，默认设置为 '200px'，表示容器的宽度和高度都为200像素。
* JIBBC: 定义了摇杆的边框颜色，默认设置为 '#EEEEEE'，表示边框颜色为浅灰色。
* JIBG: 定义了摇杆的背景颜色，默认设置为 '#FFFFFF'，表示背景颜色为白色。
* JIBBS: 定义了摇杆的边框样式，默认设置为 'solid'，表示实线边框。
* JIBBR: 定义了摇杆的边框圆角半径，默认设置为 '50%'，表示圆角半径为摇杆宽度的50%。
* JIBS: 定义了摇杆的宽度和高度，默认设置为 '70px'，表示摇杆的宽度和高度都为70像素。
* scale: 定义了摇杆容器在触摸时的缩放比例，默认设置为 '1.1'，表示缩放比例为1.1倍。
* ZOI: 定义了摇杆容器的层级，默认设置为 9998，表示层级为9998。
* ZII: 定义了摇杆的层级，默认设置为 9999，表示层级为9999。
* MM: 定义了摇杆的最大半径与容器宽度的比例，默认设置为 1.4，表示允许摇杆偏移最大半径为容器宽度的1.4倍。

**这些定制方法都必须在创建实例时就加入** 比如你使用 `var` 定义一个`info{MM:1,scale: '1.1'//.....其它}`以表示你想要更改默认样式，那么当你想要把它作用于实际摇杆时，你就需要在创建实例时使用`var light = new lightJoystick(info);`，这样你就可以得到一个你自己定制的摇杆了，当然，你也可以像这样使用`var light = new lightJoystick({MM:1,scale: '1.1'//.....其它});`。

##### 五，MIT开源许可证

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
##### 六，工作室声明
此框架由光猫工作室开发，一切问题请在[lightCatCode](https://lightCatCode.flarum.cloud"社区地址")社区留言，或者发送邮件至zry110522@163.com。
