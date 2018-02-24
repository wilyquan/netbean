<template>
	<div class="login-bg">
		<div class="lg-topbar">
			<div class="d-flex justify-content-between">
				<div class="lg-topbar-content lg-topbar-items">
					<div class="d-flex flex-row justify-content-end nav lg-cc-nav">
						<a class="lg-nav-link flaticon-piggy-bank" href="#">欢迎登陆后台管理系统</a>
						<!--<div class="nav-item">
							<a class="nav-link" href="#"><img src="img/common/ico_docu.png" class="nav-item-icon" />开发文档</a>
						</div>
						<div class="nav-item">
							<a class="nav-link" href="#"><img src="img/common/ico_help.png" class="nav-item-icon" />帮助中心</a>
						</div>
						<div class="nav-item">
							<a class="nav-link active" href="#"><img src="img/common/ico_new.png" class="nav-item-icon" />消息中心</a>
						</div>-->
					</div>
				</div>
				<div class="lg-topbar-content lg-topbar-items">
					<div class="d-flex flex-row justify-content-end nav lg-cc-nav">
						<!--<a class="nav-link flaticon-piggy-bank" href="#">首页</a>-->
						<nuxt-link to="/" class="lg-nav-link flaticon-piggy-bank" href="" alt="return home page">首页</nuxt-link>
						<div class="lg-nav-item">
							<a class="lg-nav-link" href="#"><img src="admin/img/common/ico_docu.png" class="lg-nav-item-icon" />开发文档</a>
						</div>
						<div class="lg-nav-item">
							<a class="lg-nav-link" href="#"><img src="admin/img/common/ico_help.png" class="lg-nav-item-icon" />帮助中心</a>
						</div>
						<div class="lg-nav-item">
							<a class="lg-nav-link active" href="#"><img src="admin/img/common/ico_new.png" class="lg-nav-item-icon" />消息中心</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-center align-items-center align-self-center" id="container">
			<div class="lg-container d-flex justify-content-center  align-items-center">
				<div class="card text-center" style="width: 350px;">
					<div class="card-header" style="color: #0056B3;font-weight: 400;font-size: 25px;">
						后台管理系统登陆
					</div>
					<div class="card-body">
						<form class="needs-validation" novalidate @submit.prevent="login">
							<div class="form-group row">
								<!--<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>-->
								<div class="col-12">
									<input type="text" class="form-control" id="inputPassword" v-model="formUsername" placeholder="用户名" required>
									<div class="invalid-feedback">
										用户名称不能为空
									</div>
								</div>
							</div>
							<div class="form-group row">
								<!--<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>-->
								<div class="col-12">
									<input type="password" class="form-control" id="inputPassword1" v-model="formPassword" placeholder="密码" required>
									<div class="invalid-feedback">
										密码不能为空
									</div>
								</div>
							</div>
							<button class="btn btn-primary btn-block" type="submit" style="background:#44b549; border-color: #44b549;">提交</button>
						</form>
						<!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
						<p class="error" v-if="formError">{{ formError }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- 底部 -->
		<div class="d-flex justify-content-center fixed-bottom">
			<div class="cc-footer">
				<a href="#">关于财付通</a>
				<i class="vs">|</i>
				<a href="#">联系邮箱</a>
				<i class="vs">|</i>
				<a href="#">商户平台使用协议</a>
				<i class="vs">|</i> Powered By Tencent &amp; Tenpay　Copyright &copy; 2005-2016 All Rights Reserved.
			</div>
		</div>

		<script type="text/javascript">
			$(document).ready(function() {
				var winHeight = $(window).height();
				$('#container').css('height', winHeight - 100);
				//				$(window).resize(function() {
				//					winHeight = $(window).height();
				//					$("#container").css("height", winHeight);
				//				});
			});
			// Example starter JavaScript for disabling form submissions if there are invalid fields
			(function() {
				'use strict';

				window.addEventListener('load', function() {
					// Fetch all the forms we want to apply custom Bootstrap validation styles to
					var forms = document.getElementsByClassName('needs-validation');

					// Loop over them and prevent submission
					var validation = Array.prototype.filter.call(forms, function(form) {
						form.addEventListener('submit', function(event) {
							if(form.checkValidity() === false) {
								event.preventDefault();
								event.stopPropagation();
							}
							form.classList.add('was-validated');
						}, false);
					});
				}, false);
			})();
		</script>
	</div>
</template>

<!--<style src="@/static/admin/css/bootstrap.css"/>
<style src="@/static/admin/css/login.css" />-->
<!--<script src="@/static/js/jquery-1.9.1.min.js" />
<script src="@/static/js/bootstrap.min.js" />-->

<script>
	//导入鉴权api
	import auth from '@/js/auth'
	import { mapState } from 'vuex'
	export default {
		head: {
			title: "后台管理系统-登陆",
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
//			script: [
//				{src: '/admin/js/jquery-1.9.1.min.js'},
//				{src: '/admin/js/bootstrap.min.js'}
//				]
		},
		data() {
			return {
				formError: null,
				formUsername: '',
				formPassword: ''
			};
		},
		methods: {
			async login(){
				auth.login(this.formUsername, this.formPassword);
				this.$store.commit('SET_TOKEN', 'token');
				this.$router.push('/admin');
			},
			async logout(){
				auth.logout();
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
			return {
				formError: null,
				formUsername: '',
				formPassword: ''
			};
		},
		mounted() {
			console.log("hhhhhh");
			window.localStorage.user = "wangquan";
			console.log("window.localStorage.user = " + window.localStorage.user)
		},
		head: {
			title: "后台管理系统-登陆",
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
				src: 'js/jquery-1.9.1.min.js'
			}, {
				src: 'js/bootstrap.min.js'
			}]
		},
		computed: {
			items() {
				return null;
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
			async login() {
				try {
					await this.$store.dispatch('login', {
						username: this.formUsername,
						password: this.formPassword
					})
					this.formUsername = ''
					this.formPassword = ''
					this.formError = null
					console.log("async login() {")
					debugger;
					this.$router.replace('/')
					console.log("this.$router.replace('/')")
				} catch(e) {
					this.formError = e.message
				}
			},
			async logout() {
				try {
					await this.$store.dispatch('logout')
				} catch(e) {
					this.formError = e.message
				}
			}
		}
	}
</script>-->
	
<style>
	
.login-bg{height: 100%;background-color: #333;background:url("/admin/img/common/bg-1.jpg");background-size:cover;background-repeat:no-repeat;}
.lg-topbar{background: rgba(60,71,74,.3); height: 30px;}
.lg-topbar-items{height: 30px; line-height: 30px;}
.lg-topbar-content{/*width: 1200px;*/ /*background: #0056B3;*/}
.lg-nav-link {padding: 0px 10px;color: #dddddd;font-size: 13px;}
.lg-nav-link {padding: 0px 10px;color: #dddddd;font-size: 13px;}
.lg-nav-item .lg-nav-item-icon {vertical-align: middle; display: inline-block; width: 16px;height: 16px; margin:-3px 5px 0 0;}
.lg-cc-nav a.lg-nav-link:hover{color: #FFFFFF;}

/* 脚部 */
.cc-footer{padding-bottom:30px;color:#8d8d8d;text-align:center;font:12px/1.6 tahoma,arial,"Hiragino Sans GB",\5B8B\4F53,sans-serif;}
.cc-footer a{color:#8d8d8d;}
.cc-footer a:hover{color:#459ae9}
.cc-footer .vs{color:#ccc;}

.lg-container{width: 1200px; height: 100%;}

</style>
