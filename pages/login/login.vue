<template>
	<view id="content">
		<view class="header">
			<view class="headertitle">
				您需要登陆才能继续访问
			</view>
			<view class="headerexit" @tap="back">
				关闭
			</view>
		</view>
		<view class="subjectContaienr">
			<view class="usernameAndpwd">
				<view class="unpdcontainer">
					<input type="text" v-model="username" value="" name="username" placeholder="手机号/邮箱/会员名" />
				</view>
				<view class="unpdcontainer">
					<input type="text" v-model="password" value="" name="password" placeholder="请输入密码" />
				</view>
			</view>
			<view class="registerContainer">
				<view @tap="shortmessageLoad">
					短信验证码登录
				</view>
				<view @tap="freeregister">
					免费注册
				</view>
			</view>
			<button type="primary" @click="load">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			shortmessageLoad: function() {
				console.log("短信验证码登录")
			},
			freeregister: function() {
				console.log("免费注册")
			},
			load: function() {
				var username = this.username;
				var password = this.password;
				if (username.length <= 0) {
					uni.showModal({
						title: "用户名不能为空"
					})
					return;
				}
				if (password.length <= 0) {
					uni.showModal({
						title: "密码不能为空"
					})
					return;
				}
				uni.request({
					url: "http://127.0.0.1:3389/load",
					method: "POST",
					dataType: String,
					data: {
						username: username,
						password: password
					},
					success: function(data) {
						if (data.data == 'error') {
							uni.showModal({
								title: '状态',
								content: '账号或密码错误',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						} else if (typeof(data.data) == 'object') {
							uni.setStorage({
								key: 'id',
								data: data.data
							})
							uni.navigateBack()
							
						}
						console.log(data)
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},
			back(){
				uni.navigateBack({
					delta: 2
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
</style>
