# lowhtml-loader

##安装
loader描述 : 用在webpack中监控html文件 build到 生产目录dist
...shell
npm install lowhtml-loader
...

##日志
*2.1.1 完善readme.md 说明


##webpack配置
... javascript
module:{
    // 加载器
    loaders: [
        { test: /\.(html)$/, loader: 'lowhtml'}
    ]
}
...


##如果需要webpack构建html文件到生产或者开发目录下
###例如我下面的demo目录src下的首页index.js文件对应的就是inde.html文件
####在index.js引入当前的业务html文件,让webpack构建
... js
	import '../html/index.html';
...

