/* globals localStorage */

const kSessionKey = 'NETBEAN-ADMIN-USER-KEY';

export default {
  login (username, pwd) {
  	var token = Math.random().toString(36).substring(7);
  	sessionStorage.kSessionKey = token;
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
