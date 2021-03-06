/* protocol object defined */

import http from '@/js/http'

'use strict';

export const sSuccess = 0;
export const sFail = 1;

export const APPLICATION = "LV90KKJKNBYTADEB004589UIBIOMJU76";
export const SERVICE_SYS = "sys";
export const SUBSERVICE_LOGIN = "login";
export const SUBSERVICE_MENUS = "menus";

export const errors = new Map([
	[102, '用户名或密码不存在'],
	[103, '用户名或密码不能为空'],
	[116, '用户名或密码错误']
]);

class Object {
	//将对象转换为json字符串
	toJSONString() {
		return JSON.stringify(this);
	}
	toJSONObject(jsonString) {
		return JSON.parse(jsonString);
	}
}

class Header extends Object {

	constructor(application, service, subservice) {
		super();
		this.application = application;
		this.service = service;
		this.subservice = subservice;
	}

}

class Body extends Object {

	setStatus(code, msg) {
		this.status = {
			code: code,
			msg: msg
		};
	}

	getStatus() {
		if(this.status == null) {
			this.status = {
				code: sFail,
				msg: "default msg"
			};
		}
		return this.status;
	}
}

class Message extends Object {

	constructor(application, service, subservice) {
		super();
		this.header = new Header(application, service, subservice);
	}

	toString() {
		return this.msg;
	}

	setStatus(code, msg) {
		this.body = {
			status: {
				code: code,
				msg: msg
			}
		}

	}

	getStatus() {
		if(this.body == null || this.body.status == null) {
			return {
				code: sFail,
				msg: "default msg"
			}
		}

		return this.body.status;
	}

	setData(data) {
		if(this.body == null) {
			this.body = {
				data: data
			}
		} else {
			this.body.data = data;
		}

	}

	getData() {
		if(this.body == null) {
			return null;
		}
		return this.body.data;
	}

	//如果data部分为数组，则建议用此函数
	addData(data) {
		var d = this.getData();
		if(d == null) {
			d = new Array();
			//记得添加新data
			this.setData(d);
		}
		if(d.constructor == Array) {
			d.push(data);
		} else {
			throw Error("data type error", "data type error, please check!")
		}
	}

	//添加翻页配置信息
	setPage(page) {
		if(this.body == null) {
			this.body = {
				page: page
			}
		} else {
			this.body.page = page;
		}
	}

	getPage() {
		if(this.body == null) {
			return null;
		}

		return this.body.page;

	}

	//设置跳转到下一页配置配置信息
	setNextPage() {
		var page = getPage();
		if(page != null) {
			var hasNextPage = page.hasNextPage;
			if(hasNextPage) {
				page.gotoPage++;
			}
		}
	}

	//设置跳转到前一页
	setPrePage() {
		var page = getPage();
		if(page != null) {
			var hasPrePage = page.hasPrePage;
			if(hasPrePage) {
				page.gotoPage--;
			}
		}
	}

	setGotoPage(gotoPage) {
		var page = getPage();
		if(page == null) {
			page = {
				gotoPage: 1
			}
		}
		this.body.page.gotoPage = gotoPage;
	}

	request(h) {
		http.postA(this, this.resHandler, h);
	}

	resHandler(res, h) {
		console.log("======resHandler(res)");
		var isOk = false;
		var response;
		var msg;
		var code = -1;
		//		debugger;
		if(res && res.status === 200) {
			if(h != null) {
				if(res.data != null) {
					response = new Response(res.data);
					isOk = response.isOK()
					msg = response.getStatusMsg();
				}
			}
		} else {
			console.log("network error")
			msg = '网络异常！';
		}

		if(h != null) {
			h(isOk, msg, response);
		}
	}

}

//处理应答消息对象
class Response extends Object {
	constructor(json) {
		super();
		if(typeof json == 'string') {
			this.respString = json;
			this.resp = this.toJSONObject(json);
		} else {
			this.resp = json;
		}

	}

	getRespString() {
		return this.respString;
	}

	getRespObject() {
		return this.resp;
	}

	getApplication() {
		if(this.resp != null && this.resp.header != null) {
			return this.resp.header.application;
		}
		return null;
	}

	getService() {
		if(this.resp != null && this.resp.header != null) {
			return this.resp.header.service;
		}
		return null;
	}

	getSubservice() {
		if(this.resp != null && this.resp.header != null) {
			return this.resp.header.subservice;
		}
		return null;
	}

	getStatus() {
		if(this.resp != null && this.resp.body != null) {
			return this.resp.body.status;
		}
		return null;
	}

	getCode() {
		var status = this.getStatus();
		if(status != null) {
			return status.code;
		}
		return sFail;
	}

	getStatusMsg() {
		var status = this.getStatus();
		if(status != null) {
			var code = status.code;
			var msg = errors.get(code);
			if (msg != null){
				return msg;
			}
			return status.msg;
		}
		return "";
	}

	//应答信息状态
	isOK() {
		var code = this.getCode();
		if(code == sSuccess) {
			return true;
		}
		return false;
	}

	//获得应答数据，应答数据只会是数组
	getData() {
		if(this.resp != null && this.resp.body != null) {
			return this.resp.body.data;
		}
		return null;
	}

	getPage() {
		if(this.resp != null && this.resp.body != null) {
			return this.resp.body.page;
		}
	}

	//总数
	totalSize() {
		var page = this.getPage();
		if(page != null) {
			return page.totalSize;
		}
		return 0;
	}

	//总页数
	pageSize() {
		var page = this.getPage();
		if(page != null) {
			return page.pageSize;
		}
		return 0;
	}

	//当前页数据的数量
	actualPageSize() {
		var page = this.getPage();
		if(page != null) {
			return page.actualPageSize;
		}
		return 0;
	}

	//总页数
	countPage() {
		var page = this.getPage();
		if(page != null) {
			return page.countPage;
		}
		return 0;
	}

	//跳转到指定页
	gotoPage() {
		var page = this.getPage();
		if(page != null) {
			return page.gotoPage;
		}
		return 0;
	}

	//当前页码
	pageNo() {
		var page = this.getPage();
		if(page != null) {
			return page.pageNo;
		}
		return 0;
	}

	//是否有下一页
	hasNextPage() {
		var page = this.getPage();
		if(page != null) {
			return page.hasNextPage;
		}
		return false;
	}

	//是否有前一页
	hasPrePage() {
		var page = this.getPage();
		if(page != null) {
			return page.hasPrePage;
		}
		return false;
	}

}

export var Login = new Message(APPLICATION, SERVICE_SYS, SUBSERVICE_LOGIN);

export {
	Message,
	Header,
	Object,
	Response
};