/* globals localStorage */

import axios from 'axios'

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    // 判断localStorage中是否存在api_token
//  if (localStorage.getItem('api_token')) {
//      //  存在将api_token写入 request header
//      config.headers.apiToken = `${localStorage.getItem('api_token')}`;
//  }
//	config.headers = {
//		//Content-Type(只限于三个值application/x-www-form-urlencoded、 multipart/form-data、text/plain)
//		//必须只能填写text/plain，否则无法通过body
//		'Content-Type': 'text/plain; charset=UTF-8',
//	}
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});


function checkStatus (response) {
	console.log(response);
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 ||
            response.status === 400)) {
            	console.log(response.data);
        return response
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode (res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        // alert(res.data.error_msg)
    }
    return res
}


// 请求方式的配置
export default {
    post (data) {  //  post
    	
	
//  		debugger;
 		console.log("post data = " + JSON.stringify(data));
        return axios({
            method: 'post',
            baseURL: 'http://127.0.0.1:8080/iot-admin/p/',
            url: '/api',
            data : JSON.stringify(data),
            timeout: 5000,
            responseType: 'json',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'text/plain; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get (url, params) {  // get
        return axios({
            method: 'get',
            baseURL: '/backapis',
            url,
            params, // get 请求时带的参数
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}