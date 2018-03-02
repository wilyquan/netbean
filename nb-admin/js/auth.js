/* globals localStorage */

const kSessionKey = 'NETBEAN-ADMIN-USER-KEY';

import * as nb from '@/js/message';
import http from '@/js/http'
////导入AES加密模块
//import {AES} from 'crypto-js'
////导入SHA256加密模块
//import {SHA256} from 'crypto-js'

export default {
	 
	async login(username, pwd, handler) {

		var code = false;
		var msg = "ok";
		var userInfo = sessionStorage.userInfo;
		console.log('login(username, pwd)');
		//如果没有登陆
		if(userInfo == null) {
			//		console.log(username);
			//		console.log(pwd);
			var userLogin = new nb.Message(nb.APPLICATION, nb.SERVICE_SYS, nb.SUBSERVICE_LOGIN);
			userLogin.setData({
				username: username,
				password: pwd
			});
			//		console.log(userLogin.toJSONString());

			//登陆成功后，将用户信息保存到缓存中
			await userLogin.request(function h(isOK, statusMsg, response) {
//				debugger;
//				console.log("message response ...");
//				console.log(isOK);
//				console.log(statusMsg);
//				console.log(response);
				if(isOK) {
					var userInfo = response.getData()[0];
					sessionStorage.userInfo = JSON.stringify(userInfo);
					sessionStorage.userId = userInfo.userId;
					
				}
				handler(isOK, statusMsg);

			});
		}else{
			handler(true, msg);
		}
	},

	getUserInfo(){
		if (sessionStorage.userInfo != null){
			return JSON.parse(sessionStorage.userInfo);
		}
		return null;
	},
	
	getUserId(){
		return sessionStorage.userId;
	},
	
	getToken() {
		return sessionStorage.userInfo
	},

	logout() {
		delete sessionStorage.userInfo;
	},

	//是否登陆过
	loggedIn() {
		return !!sessionStorage.userInfo;
	},

	onChange() {}
}

//function pretendRequest (email, pass, cb) {
//setTimeout(() => {
//  if (email === 'joe@example.com' && pass === 'password1') {
//    cb({
//      authenticated: true,
//      token: Math.random().toString(36).substring(7)
//    })
//  } else {
//    cb({ authenticated: false })
//  }
//}, 0)
//}