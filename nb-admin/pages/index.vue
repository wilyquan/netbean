<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nb-admin
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
       	 <nuxt-link :to="'/admin'">admin</nuxt-link>
      </div>
    </div>
    
    <nuxt-child/>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import {Message, Header, Response} from '@/js/message';
//var nb = require('@/js/object')

export default {
  components: {
    AppLogo
  },
	asyncData(){
//		console.log(nb)
//		nb.head("application", "service", "subservice");
//		console.log(nb.header.application);
//		console.log(nb);
//		var js = JSON.stringify(nb);
//		console.log(js);
		
		var m = new Message("application", "service", "subservice", "msg");
		console.log("asyncData index = " + m);
//		console.log(m.toString());
		var h = new Header("application", "service", "subservice");
		console.log(h.application);
		console.log(h.service);
		console.log(h.subservice);
		console.log("status = " + m.getStatus())
		
		m.setStatus(0, "hello");
		console.log("data = " + m.getData());
		if(m.getData() == null){
			console.log("data no defined ");
		}
		m.addData("hello");
		m.addData("world");
		console.log("data = " + m.getData());
		var js = JSON.stringify(m);
		console.log(js);
		
		var j = '{"header":{"application":"application","service":"service","subservice":"subservice"},"msg":"msg","status":{"code":0,"msg":"hello"}}';
		var msg = JSON.parse(j);
		console.log(msg);
		
		var r = new Response(j);
		console.log(r.getApplication())
		
	}
  
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
