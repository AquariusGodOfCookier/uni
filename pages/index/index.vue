<template>
	<!-- 整体 -->
	<view class="SliderContent" v-on:touchstart="bodyTouchStart" v-on:touchmove="bodyTouchMove" v-on:touchend="bodyTouchEnd">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image class="sw-img" src="../../static/img/O1CN010Cu1G91DCTpa1nHjl_!!180-0-lubanu.jpg" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="sw-img" src="../../static/img/O1CN01nOJGZ11Cbq90pZj3Y_!!100-0-lubanu.jpg" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 功能按钮 -->
		<view class="Function">
			<view v-for="(item,index) in dataList" class="Function-Content" :key="index">
				<view class="Photo" v-on:click="">
					<image class="ImgContainer" :src="item.photoSrc" mode=""></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 淘宝头条 -->
		<view class="HeadLines">
			<view class="HeadLinesTitle">
				{{HeadLinesTitle}}
			</view>
			<view class="HeadLinesSwiper">
				<swiper :indicator-dots="false" :autoplay="true" :interval="2000" :duration="1000" vertical="true" circular="true">
					<swiper-item>
						<view class="swiper-item">
							<view class="swiper-containers">
								<span class='remen'>热门</span>
								<p class="HeadContainer">华为新机已经曝光</p>
							</view>
							<view class="swiper-containers">
								<span class='remen'>热门</span>
								<p class="HeadContainer">华为新机已经曝光</p>
							</view>
							<image :src="toutiaoimg" class="toutiaoimg" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="swiper-containers">
								<span class='remen'>热门</span>
								<p class="HeadContainer">华为新机已经曝光</p>
							</view>
							<view class="swiper-containers">
								<span class='remen'>热门</span>
								<p class="HeadContainer">华为新机已经曝光</p>
							</view>
							<image :src="toutiaoimg" class="toutiaoimg" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 淘抢购 有好货 哇哦视频 必买清单 -->
		<view class="FourTypes">
			<view class="FourTypesContent" v-for="(item,index) in FourTypesList" :key="index">
				<view class="FourTypesTitle">
					{{item.title}}
					<view class="FourTypesMiddleImg">
						<image class="MiddleImg" :src="item.MiddleImg" mode=""></image>
					</view>

				</view>
				<view class="FourTypesBigImg">
					<image class="BigImg" :src="item.BigImg" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="IBelieveYouLike">
			<view class="IBYTitle">
				<span>
					<image :src="IBYImage" mode=""></image>
				</span>
				猜你喜欢
			</view>
			<view class="IBelieveContent">
				<view class="IBYListContent" :id="item.id" @click="ceshi($event)" v-for="(item,index) in IBYList" :key="index">
					<view class="IBYPhoto">
						<image :src="item.IBYPhoto" mode=""></image>
					</view>
					<view class="IBYPTitle">
						{{item.IBYPTitle}}
					</view>
					<view class="IBYMoney">
						<span class="IBYMoneys">{{item.IBYMoney}}</span>
						<span class="IBYMoneyP">{{item.IBYPay}}</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: () => {
			// 初始化
		},
		onReachBottom: function() {
			//下拉
			uni.showLoading({
				title: "加载中"
			})
			if (this.$data.number <= 3) {
				this.$data.number++;
				this.$data.IBYList.push({
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款',
				}, {
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款',
				}, )
			}
			uni.hideLoading();
		},
		onNavigationBarSearchInputClicked() {
			console.log("我点击了输入框")
		},
		data() {
			return {
				number: 0,
				toutiaoimg: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1405861646,1949508008&fm=58&bpow=617&bpoh=416',
				HeadLinesTitle: "淘宝头条",
				HeadLinesSwiper: [
					"哈哈哈哈哈哈",
					"啊啊啊啊啊啊啊啊啊啊"
				],
				IBYImage: '../../static/img/IBY.png',
				dataList: [{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					},
					{
						title: '聚划算',
						photoSrc: '../../static/img/财富.png'
					},
					{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					},
					{
						title: '聚划算',
						photoSrc: '../../static/img/财富.png'
					},
					{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					},
					{
						title: '聚划算',
						photoSrc: '../../static/img/财富.png'
					},
					{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					},
					{
						title: '聚划算',
						photoSrc: '../../static/img/财富.png'
					},
					{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					},
					{
						title: "天猫",
						photoSrc: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp'
					}
				],
				FourTypesList: [{
					title: '淘抢购',
					MiddleImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0',
					BigImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0'
				}, {
					title: '淘抢购s',
					MiddleImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0',
					BigImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0'
				}, {
					title: '淘抢购a',
					MiddleImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0',
					BigImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0'
				}, {
					title: '淘抢购d',
					MiddleImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0',
					BigImg: 'https://paimgcdn.baidu.com/DCFDB967A5129468?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F1379185538.jpg&rz=urar_2_968_600&v=0'

				}],
				IBYList: [{
					id: '1',
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款'

				}, {
					id: '2',
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款'

				}, {
					id: '3',
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款'

				}, {
					id: '4',
					IBYPhoto: 'https://img.alicdn.com/bao/uploaded/i1/TB1JePFKFXXXXaYXVXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp',
					IBYPTitle: '法式经典 复古珐琅镶水钻做旧小鞋 好多个鞋',
					IBYMoney: '￥48',
					IBYPay: '19人付款'

				}],
				// 记录滑动的起始坐标
				TouchStart: 0,
				// 记录滑动的终止坐标
				TouchEnd: 0,
				//记录滑动的距离
				distance: 0
			}
		},
		methods: {
			ceshi(event) {
				uni.navigateTo({
					url: 'test?what=1&id=1&name=1',
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			bodyTouchEnd(event) {
				this.TouchEnd = event.changedTouches[0].pageX
				//判断是左滑还是右滑
				if (this.TouchEnd > this.TouchStart && this.TouchEnd - this.TouchStart >= 250) {
					console.log("左滑跳转页面成功")
				} else if (this.TouchStart > this.TouchEnd && this.TouchStart - this.TouchEnd >= 250) {
					console.log("页面右滑跳转成功s")
					uni.switchTab({
						url:"../page/page",
						
					})
				}
			},
			bodyTouchStart(event) {
				this.TouchStart = event.touches[0].pageX
			},
			bodyTouchMove(event) {

			}
		},

	}
</script>

<style>
	@import url("../../static/css/index.css")
</style>
