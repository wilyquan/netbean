<template>
	<div>
		<nav-topbar></nav-topbar>
		<header>
			<div class="d-flex justify-content-center">
				<div class="header-content">
					<div class="d-flex flex-row justify-content-start nav">
						<!--返回到首页-->
						<nuxt-link to="/" class="header-logo" href="" alt="return home page"><img src="/admin/img/common/logo.png" /></nuxt-link>
						<!--<a href="#" class="header-logo">
							<img src="/admin/img/common/logo.png" />
						</a>-->
						<!--<dd v-for="item in menus" :key="item.id">
						<nuxt-link to="/person/info">{{item.name}}</nuxt-link>
						</dd>-->
						<a v-if="menus != null" v-for="item in menus" :key="item.id" class="nav-link header-nav-item" v-on:click="selectMenu(item.id)" v-bind:class="{ active: item.selected }" href="#">{{item.name}}</a>
						<!--<a href="javascript:;" class="nav-link header-nav-item">我的面板</a>
						<a href="javascript:;" class="nav-link header-nav-item">系统设置</a>
						<a href="javascript:;" class="nav-link header-nav-item">客户管理</a>
						<a href="javascript:;" class="nav-link header-nav-item active">模版管理</a>-->
					</div>
				</div>
			</div>
		</header>
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
							<dl v-if="subMenus != null" v-for="subMenu in subMenus" :key="subMenu.id">
								<dt><i class="type-ico ico-setup"></i>{{subMenu.name}}</dt>
								<dd v-for="subMenuItem in subMenu.subChild" :key="subMenuItem.id">
									<a @click="selectSubMenu(subMenuItem.id)" v-bind:class="{ 'nuxt-link-exact-active cc-active-link': subMenuItem.selected }" href="#">{{ subMenuItem.name }} </a>
								</dd>
							</dl>
							<dl>
								<!--<dt><i class="type-ico "></i>模版信息</dt>

								<dd class="selected">
									<a href="info.html">信息介绍</a>
								</dd>-->

								<!--<dd class="">
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
	import service from '@/js/service'
	import auth from '@/js/auth'
	import nb from '@/js/message'
	import menuList from '@/js/menus'
	export default {
		middleware: 'interceptor',
		//必须要注册该组件
		components: {
			NavTopbar,
			NavMenu,
			NavFooter
		},
		data() {
			return {
				menus: [],
				subMenus: [],
				selectSubMenuItem: {}
			}
		},
		computed: {
			//			gotoUrl: function(){
			//				console.log("================gotourl");
			//				this.$router.push(this.selectSubMenuItem.href);
			//				return "";
			//			}
		},
		//		asyncData (context) {

		//		},
		async mounted() {
			console.log("mounted------");
			if(!auth.loggedIn()) {
				//如果没有登陆，则跳转到登陆页面
				this.$router.push("/login");
			} else {
				var __this = this;
				
				await service.getMenus(function(isOK, msg, response) {
					if(isOK) {
						var newMenus = response.getData();
						__this.selectSubMenuItem = menuList.initMenu(newMenus);
						__this.menus = newMenus;
						if(newMenus != null && newMenus.length > 0) {
							__this.subMenus = newMenus[0].subChild;
						}
						__this.push(__this.selectSubMenuItem);
					}
				});
			}
		},
		methods: {
			selectMenu(selectId) {
				var subMenus = menuList.updateMenuSelected(this.menus, selectId);
				this.subMenus = subMenus.subMenu;
				this.selectMenuItem = subMenus.selectMenuItem; //				debugger;
				this.push(this.selectSubMenuItem);
			},
			selectSubMenu(selectId) {
				var selectMenuItem = menuList.updateSubMenuSelected(this.subMenus, selectId);
				//				debugger;
				if(selectMenuItem != null) {
					//					if (selectId == "99fde26642304a9994eb6bac434f8f9e"){
					//						this.$router.push("info1");
					//					}else{
					//						this.$router.push("info");
					//					}
					this.push(selectMenuItem);
				}

			},
			push(selectMenuItem) {
				this.$router.push(selectMenuItem.href);
			}

		}
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