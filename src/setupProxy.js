//官方在1.0.0版本后废弃了proxy方法，改为使用createProxyMiddleware
// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app){
	app.use(
		createProxyMiddleware('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
			// target:'http://localhost:5000', //请求转发给谁
			target:'http://www.huagecloud.top:8091', //请求转发给谁
			changeOrigin:true,//控制服务器收到的请求头中Host的值
			pathRewrite:{'^/api1':''} //重写请求路径(必须)
		}),
		createProxyMiddleware('/api2',{
			target:'https://music.163.com',
			changeOrigin:true,
			pathRewrite:{'^/api2':''}
		}),
	)
}
// changeOrigin:false
// 有人请求服务器1
// 请求来自于 localhost:3000
// 请求的地址 /students
//
//changeOrigin:true
// 有人请求服务器2
// 请求来自于 localhost:5001
// 请求的地址 /cars


