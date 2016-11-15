# lowhtml-loader

##安装
```shell
npm install lowhtml-loader
```

##日志
* 2.1.1 完善readme.md 说明
* 2.1.2 代码的参数更正

##webpack配置
``` javascript
module:{
    // 加载器
    loaders: [
    	//static为loader参数,作用是让build出来的html里面的css & js文件的路径目录,默认是//127.0.0.1/dist
        { test: /\.(html|tpl)$/, loader: 'lowhtml?static=localhost:3000/dist'}
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

