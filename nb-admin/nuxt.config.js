module.exports = {
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'nb-admin',
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
				content: 'Nuxt.js project'
			}
		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}],
		/** 全局js在这里加载*/
		script: [{
				src: '/admin/js/jquery-1.9.1.min.js'
			},
			{
				src: '/admin/js/bootstrap.min.js'
			}
		]
	},
	css: [
		'@/static/admin/css/bootstrap.css',
		'@/static/admin/css/icon.css',
		'@/static/admin/css/global.css',
		'@/static/admin/css/main.css',
//		'@/static/admin/css/login.css'
	],

	/**
	 * router middleware
	 */
	router: {
		linkActiveClass: 'cc-active-link',
		middleware: ['user-agent']
	},
	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#3B8070'
	},

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
//		'@nuxtjs/axios'
		// Doc: https://bootstrap-vue.js.org/docs/
//		'bootstrap-vue/nuxt'
	],

	/*
	 ** Build configuration
	 */
	build: {
		vendor: ['axios'],
		/*
		 ** Run ESLint on save
		 */
		extend(config, {
			isDev,
			isClient
		}) {
			if(isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}