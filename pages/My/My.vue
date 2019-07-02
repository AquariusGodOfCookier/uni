<template>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">导航栏</block>
	</cu-custom>

</template>

<script>
	export default {
		onShow: function() {
			var res = this.globalIslogin();
			if (!res) {
				console.log('未登录')
				uni.showModal({
					title: '请登录',
					content: "请登录",
					success: function() {
						uni.navigateTo({
							url: "/pages/login/login"
						});
					},
					fail:function(){
						console.log('fail')
					},
					icon:'loading',
				})
			}else{
				this.userinfor.userid=res[0]
			}
		},
		onLoad:function(){
			console.log(this.$data)
		},
		data(){
			return{
				userinfor:{
					userid:""
				},
				
			}
		}
}
</script>


<style>
</style>
