import axios from 'axios';
import { Message } from 'element-ui';
let localhosts = "http://47.96.91.58:8088/huqing";   //请求的后台域名
// let localhosts = process.env.VUE_APP_BASE_URL;//本地路劲

axios.interceptors.request.use(config => {//请求之前(可以设置token)
// console.log(config)
    return config
},error =>{
	// console.log(error)
    Message.error(error)
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {//数据拿到之后
    return response.data
},error => {
    Message.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);;
});
function successfun(res){//处理后台返回的非200错误
    if(res.code === 0){
        return res
    }else{   
		if(res.msg){
			Message.warning(res.msg);
		}else{
			 return res;
			// Message.warning('后台未返回错误类型');
		}
        
    } 
}
function errorfun(res){
    if(res.code != 0){
        Message.error(res.msg);
        return res;
    }
}
export default{
    post(url,data,token){//post请求
        return axios({
            method:'post',
            baseURL:localhosts,
			headers:{
				'Content-Type':'application/json',
				'token':token,
			},
            url,
            data: data,
            withCredentials: true,
            timeout:5000,//响应时间
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })
    },
    get(url,params,token){//get请求
        return axios({
            method:'get',
            baseURL:localhosts,
			headers:{
				'Content-Type':'application/json',
				'token':token,
			},
            url,
            params,
            withCredentials: true,
            timeout:5000,
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err)
        })
    },
	getexcel(execelName,url,params,token){//下载表格
	    return axios({
	        method:'get',
	        baseURL:localhosts,
			headers:{
				'Content-Type':'application/json;application/octet-stream',
				'token':token,
				'Cache-Control':'no-cache'
			},
	        url,
	        // data:params,
			responseType: 'blob',
	    }).then(res => {
			if(res){
					let urls =URL.createObjectURL( new Blob([res]));
					const link = document.createElement('a');  // 创建元素
					link.style.display = 'none';
					link.href = urls;   // 创建下载的链接
					
					//num++
					 link.setAttribute('download', execelName+'.xls');  // 给下载后的文件命名
					document.body.appendChild(link);
					link.click();  // 点击下载
					 // urls =URL.createObjectURL( new Blob([]));
					URL.revokeObjectURL(urls);  // 释放掉blob对象
					URL.revokeObjectURL(link);  // 释放掉blob对象
					URL.revokeObjectURL(link.href);  // 释放掉blob对象
					document.body.removeChild(link);  //  下载完成移除元素
				
			}else{
				return 
			}
			
			
	    },err => {
	        return errorfun(err)
	    })
	}
	
    //(delete,put等请求同上)...
}