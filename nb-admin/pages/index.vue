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
import nb from '@/js/message';
//var nb = require('@/js/object')

export default {
  components: {
    AppLogo
  },
	asyncData(){
		console.log(nb)
		nb.header("application", "service", "subservice");
		console.log(nb.header.application);
		
//		var m = new message("application", "service", "subservice", "msg");
//		console.log("asyncData index = " + m);
////		console.log(m.toString());
//		var h = new header("application", "service", "subservice");
//		console.log(h.application);
//		console.log(h.service);
//		console.log(h.subservice);
//		console.log(h)
		
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
