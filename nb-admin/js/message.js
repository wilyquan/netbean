/* protocol object defined */

'use strict';

var nb = exports = module.exports = {};

nb.init = function init(){
	console.log("init");
	this.header = {};
	this.msg = "";
}

nb.header = function header(application, service, subservice){
	this.header = {
		application : application,
		service : service,
		subservice : subservice
	}
}

exports.nb = nb;

//class NBObject {
//	
//}
//
//class NBHeader extends NBObject {
//
//	constructor(application, service, subservice) {
//		super();
//		this.application = application;
//		this.service = service;
//		this.subservice = subservice;
//	}
//
//}
//
//class NBMessage extends NBObject {
//	
//	constructor(application, service, subservice, msg) {
//		super();
//		this.header = new NBHeader(application, service, subservice);
//		this.msg = msg;
//	}
//
//	toString() {
//		return this.msg;
//	}
//}
//
//exports.header = NBHeader;
//exports.message = NBMessage;
//module.exports.hello=hello;