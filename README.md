# lowhtml-loader

##安装
```shell
npm install lowhtml-loader
```

##日志
* 2.1.1 完善readme.md 说明
* 2.1.2 代码的参数更正
* 2.1.3 完善构建html文件中的css,js文件的路径,添加配置说明

##webpack-lowhtml?参数=参数值配置
* static 静态资源的域的链接目录 如//localhost:3000/dist/css/xx.css
* defaultStatic 静态资源的相对目录,如/dist/css/xx.css
* publicPath 静态资源的CDN目录,如 http://static.xx.com/css/xx.css
* 提示：当都没有填写的时候,静态文件中的css,js引用/dist/目录下,建议填写static或者defaultStatic
``` javascript
module:{
    // 加载器
    loaders: [
        { test: /\.(html)$/, loader: 'lowhtml?static=localhost:3000/dist&defautlStatic=distpublicPath=http://127.0.0.1/dist'}
    ]
}
```

##当需要webpack构建html文件到生产或者开发目录下
* 例如demo目录src下的首页index.js文件对应的就是inde.html文件
* 在index.js引入当前的业务html文件,让webpack构建
``` js
import '../html/index.html';
```

##功能说明
* @@include 可以帮你构建公共的头部文件
* @@css     可以帮你构建index.css等文件路径
* @@js      可以帮你构建index.js等文件路径
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    @@include('./_common/head.html')
    @@css('index.css')
</head>
<body>
    <h1 id="app"></h1>
    @@js("vue.min.js,index.js")
    @@include('./_common/foot.html')
</body>
</html>
```

