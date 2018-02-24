<!--导航-main menu-->
<template>
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
					<!--<a v-if="menus != null" v-for="item in menus" :key="item.id" class="nav-link header-nav-item" v-on:click="selectMenu(item.id)" v-bind:class="{ active: item.selected }">{{item.name}}</a>-->
					<a href="javascript:;" class="nav-link header-nav-item">我的面板</a>
					<a href="javascript:;" class="nav-link header-nav-item">系统设置</a>
					<a href="javascript:;" class="nav-link header-nav-item">客户管理</a>
					<a href="javascript:;" class="nav-link header-nav-item active">模版管理</a>
				</div>
			</div>
		</div>
	</header>
</template>