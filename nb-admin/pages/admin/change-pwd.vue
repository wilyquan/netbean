<template>
	<div class="cc-content-hd">
		<h2 class="cc-content-title"><p>修改密码</p></h2>
		<!--具体的内容页面-->
		<div class="cc-content-main">
			<!--<h6 class="mb-3">详细信息</h6>-->
			<div class="row">
				<div class="col-sm-12">
					<form class="needs-validation" novalidate>
						<div class="form-group row">
							<label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm text-right">旧密码</label>
							<div class="col-sm-4">
								<input type="text" class="form-control form-control-sm" id="info" placeholder="请输入旧密码" required/>
								<div class="invalid-feedback">
									旧密码不能为空
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm text-right">新密码</label>
							<div class="col-sm-4">
								<input type="text" class="form-control form-control-sm" id="info" placeholder="请输入新密码" required/>
								<div class="invalid-feedback">
									新密码不能为空
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm text-right">确认新密码</label>
							<div class="col-sm-4">
								<input type="text" class="form-control form-control-sm" id="info" placeholder="请输入新密码" required/>
								<div class="invalid-feedback">
									确认新密码不能为空
								</div>
							</div>
						</div>
						<hr class="mb-4">
						<div class=" row">
							<div class="col-sm-2"></div>
							<div class="col-sm-2">
								<button class="btn btn-primary btn-block cc-button cc-button-ok" type="submit">提交</button>
							</div>
						</div>
					</form>
				</div>
			</div>

		</div>
		<!--具体的内容页面-->
	</div>
</template>

<script>
	import AppLogo from '~/components/AppLogo.vue'

	export default {
		components: {
			AppLogo
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
		font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
		/* 1 */
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