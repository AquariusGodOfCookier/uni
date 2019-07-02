<template>
	<view id="Container">
		<view class="navhead">
			<view class="navheadcontainer" :class="{active:isall}" @tap="allReamrktap">
				全部({{remarknumber}})
			</view>
			<view class="navheadcontainer" :class="{active:isappend}" @tap="appendRemarktap">
				追加({{appendnumber}})
			</view>
			<view class="navheadcontainer" :class="{active:ishavephoto}" @tap="havePhotoRemarktap">
				有图({{havePhotonumber}})
			</view>
		</view>
		<!-- 全部评论 -->
		<view v-show="isall" class="remarkAssess" v-for="(item,index) in allremark" :key="index">
			<view class="whoremark">
				<view class="whoremark1">
					<span class="essaysname">{{item.name}}</span>
					<view class="issuper" v-show="item.issuer">超级会员</view>
				</view>
				<view class="whoremark2">
					{{item.time}}
				</view>
			</view>
			<view class="remarkcontent">
				{{item.content}}
			</view>
			<view class="apply" v-show="item.isapply">
				掌柜回复:{{item.applys}}
			</view>
			<view class="isphoto" v-show="item.isphoto">
				<view v-for="(item,index) in item.photo" :key="index">
					<image :src="item" mode=""></image>
				</view>
			</view>
			<view class="isappend" v-show="item.isappend">
				<view class="appendtime">
					{{item.appendTime}}天后追评
				</view>
				<view class="appendContent">
					{{item.append}}
				</view>
			</view>
			<view class="buywhat">
				颜色分类:{{item.buyWhat}}
			</view>
		</view>
		<!-- 	追加评论 -->
		<view v-show="isappend" class="remarkAssess" v-for="(item,index) in appendremark" :key="'appendremark'+index">
			<view class="whoremark">
				<view class="whoremark1">
					<span class="essaysname">{{item.name}}</span>
					<view class="issuper" v-show="item.issuer">超级会员</view>
				</view>
				<view class="whoremark2">
					{{item.time}}
				</view>
			</view>
			<view class="remarkcontent">
				{{item.content}}
			</view>
			<view class="apply" v-show="item.isapply">
				掌柜回复:{{item.applys}}
			</view>
			<view class="isphoto" v-show="item.isphoto">
				<view v-for="(item,index) in item.photo" :key="index">
					<image :src="item" mode=""></image>
				</view>
			</view>
			<view class="isappend" v-show="item.isappend">
				<view class="appendtime">
					{{item.appendTime}}天后追评
				</view>
				<view class="appendContent">
					{{item.append}}
				</view>
			</view>
			<view class="buywhat">
				颜色分类:{{item.buyWhat}}
			</view>

		</view>
		<!-- 	有图评论 -->
		<view v-show="ishavephoto" class="remarkAssess" v-for="(item,index) in havePhotoRemark" :key="'havePhotoRemark'+index">
			<view class="whoremark">
				<view class="whoremark1">
					<span class="essaysname">{{item.name}}</span>
					<view class="issuper" v-show="item.issuer">超级会员</view>
				</view>
				<view class="whoremark2">
					{{item.time}}
				</view>
			</view>
			<view class="remarkcontent">
				{{item.content}}
			</view>
			<view class="apply" v-show="item.isapply">
				掌柜回复:{{item.applys}}
			</view>
			<view class="isphoto" v-show="item.isphoto">
				<view v-for="(item,index) in item.photo" :key="index">
					<image :src="item" mode=""></image>
				</view>
			</view>
			<view class="isappend" v-show="item.isappend">
				<view class="appendtime">
					{{item.appendTime}}天后追评
				</view>
				<view class="appendContent">
					{{item.append}}
				</view>
			</view>
			<view class="buywhat">
				颜色分类:{{item.buyWhat}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad: function(option) {
			uni.showLoading({
				title: "加载中"
			})
			var id = option.bussid;
			var that = this
			uni.request({
				url: "http://127.0.0.1:3389/comment",
				method: "POST",
				data: {
					id: id
				},
				dataType: 'json',
				success: function(data) {
					var allReamrk = data.data.allremark
					that.allremark = allReamrk;
					that.remarknumber = allReamrk.length;
					for (var i in allReamrk) {
						if (allReamrk[i].isappend) {
							that.appendremark.push(allReamrk[i])
							that.appendnumber++;
						} else if (allReamrk[i].isphoto) {
							that.havePhotoRemark.push(allReamrk[i])
							that.havePhotonumber++;
						}
					}
					uni.hideLoading()
				}
			})
		},
		onReady: function() {
			console.log(this.$data)
		},
		data() {
			return {
				remarknumber: '',
				appendnumber: '',
				havePhotonumber: '',
				allremark: [],
				appendremark: [],
				havePhotoRemark: [],
				isall: true,
				isappend: false,
				ishavephoto: false
			}
		},
		methods: {
			appendRemarktap() {
				this.isall = false;
				this.isappend = true;
				this.ishavephoto = false;
			},
			havePhotoRemarktap() {
				this.isall = false;
				this.isappend = false;
				this.ishavephoto = true;
				console.log("有图评论");
			},
			allReamrktap() {
				this.isall = true;
				this.isappend = false;
				this.ishavephoto = false;
				console.log('全部评论')
			}
		}

	}
</script>

<style>
	@import url("../../static/css/comment.css");
</style>
