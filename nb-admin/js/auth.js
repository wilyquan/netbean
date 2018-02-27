/* globals localStorage */

const kSessionKey = 'NETBEAN-ADMIN-USER-KEY';

import * as nb from '@/js/message';
import http from '@/js/http'



export default {
  login (username, pwd) {
  	var token = sessionStorage.kSessionKey;
  	//如果没有登陆
  	if (token == null){
  		console.log(username);
  		console.log(pwd);
		var userLogin = new nb.Message(nb.APPLICATION, nb.SERVICE_SYS, nb.SUBSERVICE_LOGIN);
		userLogin.setData({username : username, password : pwd});
		http.post(userLogin.toJSONString());
//		console.log(userLogin.toJSONString());
//		const { data } = axios.post('http://127.0.0.1:8080/iot-admin/p/api', userLogin.toJSONString(), headers: {
//          'Content-Type': 'application/x-www-form-urlencoded',
//    })
  		
  		var token = Math.random().toString(36).substring(7);
  		sessionStorage.kSessionKey = token;
  	}
  	
  	return token;
  },

  getToken () {
    return sessionStorage.token
  },

  logout () {
    delete sessionStorage.kSessionKey;
  },

  //是否登陆过
  loggedIn () {
    return !!sessionStorage.kSessionKey;
  },

  onChange () {}
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
