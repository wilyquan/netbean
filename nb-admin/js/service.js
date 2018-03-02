/* 
 * 服务接口
 * */
import * as nb from '@/js/message';
import http from '@/js/http'
import auth from '@/js/auth'

////导入AES加密模块
//import {AES} from 'crypto-js'
////导入SHA256加密模块
//import {SHA256} from 'crypto-js'

export default {
	//获得用户菜单列表
	async getMenus(handler) {
//		var userInfo = sessionStorage.userInfo;
		var userId = sessionStorage.userId;
//		console.log(userId);
//		console.log(auth.getUserInfo().userId);
		//如果没有登陆
		if(userId != null) {
			var menuObject = new nb.Message(nb.APPLICATION, nb.SERVICE_SYS, nb.SUBSERVICE_MENUS);
			menuObject.setData({userId : userId});
			//登陆成功后，将用户信息保存到缓存中
			menuObject.request(handler);
		}else{
			handler(false, "session not", null);
		}
	},

//	getToken() {
//		return sessionStorage.userInfo
//	},
//
//	logout() {
//		delete sessionStorage.userInfo;
//	},
//
//	//是否登陆过
//	loggedIn() {
//		return !!sessionStorage.userInfo;
//	},
//
//	onChange() {}
}
