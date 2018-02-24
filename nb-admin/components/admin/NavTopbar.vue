<!--topbar-->
<template>
	<div class="topbar">
		<div class="d-flex justify-content-center">
			<div class="topbar-content topbar-items">
				<div class="d-flex flex-row justify-content-end nav cc-nav">
					<a class="nav-link flaticon-piggy-bank" href="script:;" v-on:click="logout()">你好，退出</a>
					<div class="nav-item">
						<a class="nav-link" href="#"><img src="/admin/img/common/ico_docu.png" class="nav-item-icon" />开发文档</a>
					</div>
					<div class="nav-item">
						<a class="nav-link" href="#"><img src="/admin/img/common/ico_help.png" class="nav-item-icon" />帮助中心</a>
					</div>
					<div class="nav-item">
						<a class="nav-link active" href="#"><img src="/admin/img/common/ico_new.png" class="nav-item-icon" />消息中心</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import auth from '@/js/auth.js'

	export default {
		methods: {
			logout() {
				auth.logout();
				this.$router.replace('/');
			}
		}
	}
</script>