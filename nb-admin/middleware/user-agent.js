/**
 * 获得 user-agent 信息
 * 设置 浏览器是否是mobile访问
 */
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  context.isMobile = /mobile/i.test(context.userAgent)
//console.log("userAgent = " + context.userAgent);
//console.log("isMobile = " + context.isMobile);
}
