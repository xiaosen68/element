import axios from 'axios';
import { Message } from 'element-ui';
let localhosts = process.env.VUE_APP_BASE_URL;   //请求的后台域名
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
         Message.warning(res.msg);
         return res;
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
    }
    //(delete,put等请求同上)...
}