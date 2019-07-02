<template>
	<view class="Content" :style="contentHeight" style="overflow: hidden;">
		<!-- 滑动出现顶部部分 -->
		<view class="Cucustom" v-if="show">
			<view style="float: left;" class="Back BCS" @click="back()">
				<image src="../../static/img/后退2.png" mode=""></image>
			</view>
			<view id="shangpin" :class="{active:isActives}" class="CucustomTitle" @tap="showwho">
				商品
			</view>
			<view id="pingjia" :class="{active:isActivep}" class="CucustomTitle" @tap="showwho">
				评价
			</view>
			<view id="xiangqing" :class="{active:isActivex}" class="CucustomTitle" @tap="showwho">
				详情
			</view>
		</view>
		<view class="PhotoContainer">
			<view class="BackOrCar">
				<view class="Back BCS" @click="back()">
					<image src="../../static/img/后退2.png" mode=""></image>
				</view>
				<view class="Car BCS" @click="GoCar()()">
					<image src="../../static/img/购物车2.png" mode=""></image>
				</view>
			</view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in infor.photo" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<!-- 关于货物信息部分 -->
		<view class="AboutGoodsInforContent">
			<view class="NewMoney">
				<view class="NMRed">
					<span style="font-size: 30upx;">￥</span>{{infor.NewMoney}}
				</view>
				<view class="NMAC" v-for="(item,index) in infor.Active" :key="index">
					{{item}}
				</view>
			</view>
			<view class="OldMoeny">
				<span style="font-size: 20upx;">价格:￥</span><del>{{infor.OldMoney}}</del>
			</view>
			<view class="GoosName">
				{{infor.Name}}
			</view>
			<view class="OthersInfo">
				<view class="Others" v-for="(item,index) in infor.OthersInfo" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 中部关于商品信号部分 -->
		<view class="AboutGoosSize">
			<view class="choose" @tap="showModal" data-target="chooseModal">
				<view class="title">
					选择
				</view>
				<view class="titlecontext">
					请选择包装长度 颜色分类
				</view>
				<view class="icons">
					>
				</view>
			</view>
			<view class="size" @click="showsize" @tap="showModal" data-target="sizeModal">
				<view class="title">
					参数
				</view>
				<view class="titlecontext">
					品牌 型号...
				</view>
				<view class="icons">
					>
				</view>
			</view>
		</view>
		<!-- 中部序商品评价与问大家 -->
		<view class="AboutGoosAssess">
			<view class="remarkTitle">
				<view class="number-assess">
					商品评价({{remark.number}})
				</view>
				<view class="say-all" @click="sayallcomment">
					查看全部 >
				</view>
			</view>
			<view class="remarkSpan">
				<view class="remarkSpanContainer" v-for="(item,index) in remark.classification" :key="index">
					{{item.name}}({{item.namenumber}})
				</view>
			</view>
			<view class="remarkAssess">
				<view class="RepreAssess">
					<view class="whoremark">
						<image :src="remark.selecterEssays.touxiang" mode="aspectFit"></image>
						<span class="essaysname">{{remark.selecterEssays.essaysname}}</span>
						<view class="issuper" v-show="remark.selecterEssays.issuper">超级会员</view>
					</view>
					<view class="remarkcontent">
						{{remark.selecterEssays.content}}
					</view>
					<view class="buywhat">
						{{remark.selecterEssays.BuyWhat}}
					</view>
				</view>
			</view>
		</view>
		<!-- 中部关于商家信息 -->
		<view class="AboutBussiness">
			<view class="BussContainer">
				<image :src="Bussness.image" mode="aspectFit"></image>
				<view class="numcon">
					{{Bussness.name}}
					<view class="buswhere">
						{{Bussness.where}}
					</view>
				</view>
			</view>
			<view class="BussMiaoshu">
				<view class="BussMiaoshuContext" v-for="(item,index) in Bussness.servicie" :key="index">
					{{item.miaoshucontent}}{{item.miaoshu}}
					<view :class="item.isup" class="isup"></view>
				</view>
			</view>
			<view class="BussButton">
				<view class="all-goos BBButton">
					全部商品
				</view>
				<view class="go-shop BBButton">
					进入店铺
				</view>
			</view>
		</view>
		<!-- 下部关于详情部分 -->
		<view id="BottomPhotoContent" class="BottomPhotoContent">
			<view class="BottomPhoto" v-for="(item,index) in infor.BottomPhoto" :key="index">
				<image :src="item.url" mode="widthFix"></image>
			</view>
		</view>
		<!-- 底部部分 -->
		<view class="Foot cu-bar bg-white tabbar border shop">
			<view class="action">
				<view class="cuIcon-shop"></view> 店铺
			</view>
			<view class="action text-orange">
				<view class="cuIcon-favorfill"></view> 已收藏
			</view>
			<view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="bg-orange submit bv1" @tap="showModal" data-target="bottomModal">加入购物车</view>
			<view class="bg-red submit bv2" @click="NowBuy()">立即订购</view>

		</view>

		<!-- 模态框部分 -->
		<view class="cu-modal bottom-modal car-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog gouchar-modal">
				<view class="padding-xl">
					这是购物车模态框的内容
				</view>
				<button class="cu-btn bg-grey lg" @tap="hideModal">取消</button>
			</view>
		</view>
		<!-- 选择商品包装长度，颜色分类模态框 -->
		<view @touchmove.stop.prevent="moveHandle" class="cu-modal bottom-modal" :class="modalName=='chooseModal'?'show':''">
			<view class="cu-dialog gouchar-modal" id="choosemodel">
				<view class="padding-xl">
					<view class="choosemodelhead">
						<view class="cmhiContainer">
							<image class="wodetianimg" src="https://img.alicdn.com/imgextra/i3/397370407/O1CN011EsRfc9zerjDs5u_!!397370407.jpg_200x200Q50s50.jpg"
							 mode=""></image>
						</view>
						<view class="main">
							<view class="price-wrap">
								价格￥8840.00
							</view>
							<view class="sku-info">
								已选择:优雅绿#518定制 2米以上
							</view>
						</view>
						<image @tap="hideModal" class="back" src="../../static/img/退出.png" mode=""></image>
					</view>
					<scroll-view style="height: 100%;" scroll-y='true'>

					</scroll-view>
					<view class="Button">
						<view class="gocar">
							加入购物车
						</view>
						<view class="buynow">
							立即购买
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品参数，型号模态框 -->
		<view @touchmove.stop.prevent="moveHandle" class="cu-modal bottom-modal" :class="modalName=='sizeModal'?'show':''">
			<view class="cu-dialog gouchar-modal" id="sizemodel">
				<view class="padding-xl">
					<scroll-view style="height: 100%;" scroll-y='true'>
						<view class="BaseInfor others">
							基本信息
						</view>
						<view class="BaseInfor" v-for="(item,index) in BaseInfor" :key="index">
							<view class="BaseInforname">
								{{item.name}}
							</view>
							<view class="BaseInfornamecontent">
								{{item.content}}
							</view>
						</view>
					</scroll-view>
				</view>
				<button class="cu-btn bg-grey lg" @tap="hideModal">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 监听页面加载
		onLoad: function(option) {
			uni.showLoading({
				title: "正在加载"
			});
			let what = option.what;
			let id = option.id;
			let name = option.name;
			var that = this;
			uni.request({
				url: " http://127.0.0.1:3389/remark",
				method: "POST",
				data: {},
				dataType: 'json',
				success: function(data) {
					data = data.data
					console.log(data)
					that.remark = data.remark
					that.Bussness = data.Bussness
					that.infor = data.infor
				},

			})
		},
		// 监听页面初次渲染完成
		onReady: function() {
			uni.hideLoading();
			console.log("初始化完毕");
			console.log(this.$data)
		},
		onPageScroll: function(e) {
			if (e.scrollTop >= 200) {
				this.$data.show = true
			} else {
				this.$data.show = false
			}
			if(e.scrollTop>=200&&e.scrollTop<570){
				this.isActives=true;
				this.isActivep=false;
				this.isActivex=false;
			}else if(e.scrollTop>=570&&e.scrollTop<1000){
				this.isActives=false;
				this.isActivep=true;
				this.isActivex=false;
			}else if(e.scrollTop>=1000){
				this.isActives=false;
				this.isActivep=false;
				this.isActivex=true;				
			}
		},
		data() {
			return {
				dotStyle: true,
				towerStart: 0,
				direction: '',
				modalName: null,
				show: false,
				isActives: true,
				isActivep: false,
				isActivex: false,
				remark: {
					classification: [],
					number: '',
					selecterEssays: {
						BuyWhat: '',
						content: '',
						essayname: '',
						issuper: false
					}
				},
				Bussness: {
					name: '',
					image: '',
					where: '',
					service: []
				},
				BaseInfor: [],
				infor: {
					OthersInfo: [],
					Active: [],
					photo: [],
					NewMoney: "",
					OldMoney: "",
					Name: "",
					BottomPhoto: []
				},
				contentHeight: "height:auto",

			}
		},
		methods: {
			GoCar() {
				console.log('现在点击了加入购物车');
			},
			NowBuy() {
				console.log("现在点击了立即购买");
			},
			back() {
				uni.navigateBack({
					delta: 2,
					animationDuration: 200,
					animationType: 'pop-out'
				});
			},
			showModal(e) {
				var that = this
				this.modalName = e.currentTarget.dataset.target
				this.contentHeight = "height:800upx"
				if (this.modalName == "sizeModal") {
					uni.request({
						url: " http://127.0.0.1:3389/BaseInfor",
						method: "POST",
						data: {},
						dataType: 'json',
						success: function(data) {
							that.BaseInfor = data.data.BaseInfo
						}
					})
					this.isActive = true
				} else if (this.modalName == "chooseModal") {
					console.log("chooseModal")
				}
			},
			hideModal(e) {
				this.modalName = null;
				this.contentHeight = "height:auto"
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			showwho(e) {
				this.who = e.target.id;
				if (this.who == 'shangpin') {
					uni.pageScrollTo({
						scrollTop: 0
					})
					this.isActives = true
					this.isActivep = false
					this.isActivex = false

				} else if (this.who == 'pingjia') {
					uni.pageScrollTo({
						scrollTop: 578
					})
					this.isActives = false
					this.isActivep = true
					this.isActivex = false
				} else if (this.who = 'xiangqing') {
					uni.pageScrollTo({
						scrollTop: 1000
					})
					this.isActives = false
					this.isActivep = false
					this.isActivex = true
				}
			},
			moveHandle() {
				return true
			},
			sayallcomment(){
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
					uni.navigateTo({
						url:"comment?bussid=0"
					})
				}
			}

		}


	}
</script>

<style>
	@import url("../../static/css/test.css");
</style>
