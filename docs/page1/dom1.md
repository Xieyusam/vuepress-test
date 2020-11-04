
# Vue项目中引入jquery和jqueryui
之前一直不喜欢在vue里面引入jq的东西，因为和vue的理念是背道而驰的，但是后来因为项目需求难以解决，不得不引入入jquery去解决，才感叹jq还是很强大的啊

真香嘻嘻

我的项目是基于vue 2.0的。3.0的可能会有些不同，但是应该问题不大了

首先，我们得在package.json文件中的dependencies添加

```javascript
    "jquery": "^3.4.1",
    "jquery-ui-dist": "^1.12.1",
```

然后我们npm install一下，安装jq和jqui

接着我们修改webpack.base.conf.js文件
在上方添加

```javascript
var webpack = require("webpack")
```
然后在module.exports里面添加

```javascript
//在这里插入代码片
plugins: [
    
    new webpack.ProvidePlugin({
    jQuery: "jquery",
    jquery: "jquery",
    $: "jquery",
    "windows.jQuery":"jquery"
    })
    ],
```
去到入口文件main.js

```javascript
//引入jq库
// import $ from 'jquery'
// Vue.use($)
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.css'
```
一定要引入css，不然没有办法使用
jq在这里可以不用引入了
不然会报错
因为在webpack已经设置过了

重新npm run dev一下
大功告成