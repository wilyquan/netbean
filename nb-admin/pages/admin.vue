<template>
	<div>
		<nav-topbar></nav-topbar>
		<nav-menu></nav-menu>
		<div class="d-flex justify-content-center">
			<!-- 内容 -->
			<div class="cc-container wrap">
				<div class="d-flex justify-content-center">
					<!-- 侧边栏 -->
					<div class="cc-sidebar">
						<div class="cc-menu">
							<!-- 交互说明
                         1.给标签dl添加样式"open",显示下拉列表
                         2.给标签dt或dd添加样式"on",显示选中状态
                    -->
							<!--必须要判断菜单信息是否存在-->
							<!--<dl v-if="menu != null">
								<dt><i class="type-ico ico-setup"></i>{{menu.name}}</dt>-->
								<!--<dd v-for="subMenu in menu.subMenus" :key="subMenu.id">
									<a @click="selectMenu(subMenu.id)" v-bind:class="{ 'nuxt-link-exact-active cc-active-link': subMenu.selected }" href="script:;">{{ subMenu.name }} </a>-->
									<!--<nuxt-link @click="selectMenu(subMenu.id)" :to="subMenu.url">{{ subMenu.name }}</nuxt-link>-->
									<!--<nuxt-link :to="subMenu.url" @click="select()">{{ subMenu.name }}</nuxt-link>-->
									<!--							<router-link @click="th$router.push(subMenu.url)">Go to Bar</router-link>-->
								<!--</dd>-->
							<!--</dl>-->
							<dl>
								<!--<dt><i class="type-ico "></i>模版信息</dt>

								<dd class="selected">
									<a href="info.html">信息介绍</a>
								</dd>

								<dd class="">
									<nuxt-link to="change-pwd">修改密码</nuxt-link>
								</dd>
								<dd class="">
									<nuxt-link to="info" >用户信息</nuxt-link>
								</dd>-->

								<!--<dd class="">
									<a href="javascript:;">待审核任务</a>
								</dd>

								<dd class="">
									<a href="javascript:;">已审核任务</a>
								</dd>

								<dd class="">
									<a href="javascript:;">我提交的审核任务</a>
								</dd>-->
							</dl>
							<!--<dl>
								<dt><i class="type-ico ico-setup"></i>系统设置</dt>

								<dd class="">
									<a href="#">菜单信息</a>
								</dd>

								<dd class="">
									<a href="#">角色信息</a>
								</dd>

								<dd class="">
									<a href="#">字典信息</a>
								</dd>
							</dl>-->
							<!--<dl>
								<dt><i class="type-ico ico-setup"></i>系统用户</dt>

								<dd class="">
									<a href="#">用户管理</a>
								</dd>

								<dd class="">
									<a href="#">组织管理</a>
								</dd>

								<dd class="">
									<a href="#">区域管理</a>
								</dd>
							</dl>-->
							<!--<dl>
								<dt class=""><a href="/index.php/core/apply_progress"><i class="type-ico ico-apply"></i>支付申请</a></dt>
							</dl>-->
						</div>
					</div>
					<!-- 侧边栏 ]] -->

					<!-- 主区域 [[ -->
					<div class="cc-content">
						<nuxt-child/>
					</div>
				</div>
			</div>
			<!-- 主区域 -->
		</div>
		<!-- 内容 -->
		<!-- 底部 -->
		<nav-footer></nav-footer>
	</div>
</template>
<!--<style src="@/static/admin/css/bootstrap.css"/>
<style src="@/static/admin/css/icon.css"/>
<style src="@/static/admin/css/global.css"/>
<style src="@/static/admin/css/main.css"/>-->

<script>
	import NavTopbar from '~/components/admin/NavTopbar.vue'
	import NavMenu from '~/components/admin/NavMenu.vue'
	import NavFooter from '~/components/admin/Footer.vue'
	
	export default {
		//必须要注册该组件
		components: {
			NavTopbar,
			NavMenu,
			NavFooter
		},
		middleware: 'interceptor'
	}
</script>

<!--<script>
	import { mapMutations } from 'vuex'
	import Logo from '~/components/Logo.vue'

	export default {
		components: {
			Logo
		},
		data() {
			return {};
		},
		mounted() {
			
		},
		head: {
			title: "后台管理系统",
			meta: [{
					charset: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
				{
					hid: 'description',
					name: 'description',
					content: 'Meta description'
				}
			],
			script: [{
				//				src: '/js/bootstrap.min.js'
			}]
		},
		computed: {
			items() {
				return this.$store.state.menus;
			},
			menu() {
				//				debugger;

				//获得子菜单对象
				var menu;
				var menus = this.$store.state.menus;
				if(menus == null) {
					return null;
				}
				for(var i = 0; i < menus.length; i++) {
					var item = menus[i];
					if(item.selected) {
						menu = item.subMenu;
						break;
					}
				}

				return menu;
			}
		},
		methods: {
			initMenuSelect(item) {
				//初始化子菜单的选中操作
				console.log("initMenuSelect");
				var menu = item.subMenu;
				//				debugger;
				if(menu != null) {
					var subMenus = menu.subMenus;
					for(var i = 0; i < subMenus.length; i++) {
						var subMenu = subMenus[i];
						if(subMenu.selected) {
							this.$router.push(subMenu.url);
						}
					}
				}
			},
			selectItem(selectId) {
				//选择主菜单
				var items = this.items;
				if(items == null) {
					return;
				}
				for(var j = 0; j < items.length; j++) {
					var item = items[j];
					if(selectId === item.id) {
						item.selected = true;
						this.initMenuSelect(item);
					} else {
						item.selected = false;
					}
					console.log("select menu name = " + item.name);
				}
				//				localStorage.UserInfo = "wangquan";
				console.log("select menu id = " + selectId);

			},

			select() {
				debugger;
				console.log("---------");
			},
			selectMenu(selectId) {
				window.localStorage.user ="wangquan";
				console.log("window.localStorage.user = " + window.localStorage.user);
				//				debugger;
				var subMenus = this.menu.subMenus;
				for(var i = 0; i < subMenus.length; i++) {
					var subMenu = subMenus[i];
					if(subMenu.id === selectId) {
						subMenu.selected = true;
						//
						this.$router.push(subMenu.url);
					} else {
						subMenu.selected = false;
					}
					//					debugger;

				}
			},
			async logout() {
				try {
					console.log("logout = " + sessionStorage.getItem("authUser"))
		
					await this.$store.dispatch('logout')
					sessionStorage.setItem("authUser", null)
					console.log("logout122 = " + sessionStorage.getItem("authUser"))
					this.$router.replace("../sysLogin")
				} catch(e) {
					console.log("exception = " + e.message)
					this.formError = e.message
				}
			}
		}
	}
</script>-->