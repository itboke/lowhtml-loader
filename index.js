/*
 * lowhtml-loader
 * @author hzl
*/
const Path   = require('path');
const fs     = require('fs');
var cssReg = /@@css\([\'|\"](\S+)[\'|\"]\)/;
var jsReg  = /@@js\([\'|\"](\S+)[\'|\"]\)/;
var includeReg = /@@include\([\'|\"](\S+)[\'|\"]\)/g;
function parseQuery(query){
	var obj = {};
	var query = query.replace(/^\?/,'').split('&');
	for(var i = 0, l = query.length;i < l; i++){
		var o = query[i].split('=');
		obj[o[0]] = o[1];
	}
	return obj;
};
module.exports = function(content){
	this.cacheable && this.cacheable();
	var _file = this.resourcePath.replace(/(\S+\\html\\)/i,'');//获取html文件的目录路径
	var _content = String(content);
	var _self = this;
	var query = {};
	if(this.query){
		query = parseQuery(this.query);
	}
	if(!query.static){
		query.static = '//127.0.0.1/dist';
	}
	this._compiler.plugin('emit',function(compilation,callback){
			var stats = compilation.getStats().toJson({
	                hash: true,
	                publicPath: true,
	                assets: true,
	                chunks: false,
	                modules: false,
	                source: false,
	                errorDetails: false,
	                timings: false
            });
            var mapJson = {};
            var assetsArr = stats.assets;
            assetsArr.map((item)=>{
                var _name = item.name;
                var _nameObj = Path.parse(_name);
                var _ext = _nameObj.ext;
                var _regx = new RegExp(".*\\.([a-z0-9]+)"+_ext);
                var _match,_arr,_rstr;
                if(_regx.test(_name)){
                    _match = _name.match(_regx);
                    //去掉hash
                    if(_match[1]){
                        _rstr = _match[1]+'.';
                    }else{
                        _arr = _nameObj.name.split('.');
                        _rstr = _arr[_arr.length-2]+'.';
                    }
                    _name =  _name.replace(_rstr,'');
                }
                //过滤map 文件
                if(_ext != '.map'){
                    mapJson[_name] = item.name;
                }
            });
            var _assets = compilation.assets;
			var _css = _content.match(cssReg);
			var _js  = _content.match(jsReg);
			var _cssArr,_jsArr,_cssLinks = '',_jsLinks  = '';
			if(_css){
				_cssArr = _css[1].split(',');
				_cssArr.forEach(function(key) {
		            key = 'css/' + key;
		            key = mapJson[key] === undefined ? key : mapJson[key];
		            _cssLinks += "<link href='//" + query.static + "/" + key + "' rel='stylesheet' type='text/css' />";
	        	});
	        	_content = _content.replace(_css[0],_cssLinks);
			}
			if(_js){
				_jsArr  = _js[1].split(',');
				_jsArr.forEach(function(key) {
		            key = 'js/' + key;
		            key = mapJson[key] === undefined ? key : mapJson[key];
		            _jsLinks += "<script src='//" + query.static + "/" + key + "'></script>";
		        });
		        _content = _content.replace(_js[0],_jsLinks);
			}

			var _includes = _content.match(includeReg);
			if(_includes){
				_includes.map(function(str){
					var _str = str.replace(/@@include\(\'|@@include\(\"/,'');
					_str = _str.replace(/\'\)|\"\)/,'');
					var _path = Path.resolve(Path.dirname(_self.resourcePath),_str);
					var _fileContent = fs.readFileSync(_path,'utf-8');
					if(!_fileContent){
						_content = _content.replace(str,'');
					}else{
						_content = _content.replace(str,_fileContent);
					}
				})
			}
			//html文件目录匹配

			compilation.assets[_file] = {
				source:function(){
					return _content;
				},
				size:function(){
					return _content.length;
				}
			};
			callback();
	})
	return JSON.stringify(String(_content));
};
module.exports.raw = true;
