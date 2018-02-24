/**
 * 
 * 拦截器
 * 
 * 1、做是否登陆的拦截
 * 
 */
import auth from '@/js/auth.js'

export default function({context, store, route, isClient, isServer, redirect}) {
	console.log('context.route.path = ' + route.path);
	let path = route.path;
   console.log('store.state.token = ' + store.state.token);
	//admin后面的路径信息，需要判断用户是否登陆，如果没有登陆，则重定向到登陆页面。
	console.log("isClient = " + isClient);
	if(isClient) {
		if(!auth.loggedIn() && path.startsWith("/admin")) {
			redirect("/login");
		}
	} 
//	else {
//		if(!store.state.token && path.startsWith("/admin")) {
//			redirect("/login");
//		}
//	}

}