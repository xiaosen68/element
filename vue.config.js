
module.exports = {
  outputDir: 'dist',   //build输出目录
     assetsDir: 'assets', //静态资源目录（js, css, img）
     lintOnSave: false, //是否开启eslint
	 publicPath: '/admin/',
     devServer: {
         open: true, //是否自动弹出浏览器页面
         host: "localhost", 
         port: '8083', 
         https: false,   //是否使用https协议
         hotOnly: true, //是否开启热更新
         proxy: {
			 '/dev':{
				 // target:'http://localhost:8081',
				 target:'http://47.96.91.58:8088',
				 ws: true,
				 changeOrigin: true,
				 pathRewrite: {
					 '^/dev':''
				 }
			 }
		 },
     }
}