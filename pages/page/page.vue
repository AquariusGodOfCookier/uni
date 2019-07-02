<template>
	<view id="Content" v-on:touchstart="bodyTouchStart" v-on:touchend="bodyTouchEnd">
		<view class="NavHeaderContent">
			<view class="NavButton" :class="{active:isActiveAll}" @tap="isallTap">
				全部
			</view>
			<view class="NavButton" :class="{active:isActiveWait}" @tap="isWaitPayTap">
				待付款
			</view>
			<view class="NavButton" :class="{active:isActiveDeliver}" @tap="isWaitDeliverTap">
				待发货
			</view>
			<view class="NavButton" :class="{active:isActiveRecieve}" @tap="isWaitRecieveTap">
				待收货
			</view>
			<view class="NavButton" :class="{active:isActiveApply}" @tap="isWaitApplyTap">
				待评价
			</view>
		</view>
		<view id="Container">
			<view class="SearchContent">
				<input class="search-input" type="text" value="" placeholder="搜索全部订单" />
				<button class="search-button" type="primary">搜索</button>
			</view>
			<view class="OrderContainer">
				<view v-if="isActive==='All'">
					<view class="OrderContent" v-for="(item,index) in AllList" :key="'AllList'+index">
						<view class="NavBussName">
							<view class="BussName">
								<view class="platform">
									{{item.platform}}
								</view>
								{{item.business}} >
							</view>
							<view class="BussState" v-if="item.isSuccess==true">
								交易成功
							</view>
							<view class="BussState" v-else>
								交易失败
							</view>
						</view>
						<view class="GoosInfor">
							<image :src="item.image" mode=""></image>
							<view class="GoosInforContext">
								<view class="GoosName">
									{{item.goosname}}
								</view>
								<view class="GoosSize">
									{{item.goossize}}
								</view>
								<view class="GoosActive">
									<view class="GoosActiveList" v-for="(item,index) in item.active" :key="'active'+index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="Goosmoney">
								￥{{item.money}}
								<view style="float: right; font-size: 20upx; color: rgba(0,0,0,0.5);">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="FreightInsurance" v-show="item.isFreightInsurance">
							<view class="FISContainer">
								运费险 <view class="FIState">确认收货前退换货可理赔</view>
							</view>
							<view class="FIisInvalid" v-if="item.FIisInvalid=='true'">
								已失效
							</view>
							<view class="FIisInvalid" v-else-if="tem.FIisInvalid=='false'">
								未失效
							</view>
						</view>
						<view class="Money">
							共{{item.number}}件商品 合计:<view class="Moneys">￥{{item.money}}</view>
						</view>
						<view class="Buttons">
							<view class="ellipsis">
								...
							</view>
							<view class="ThreeButton">
								<view class="TB">
									查看物流
								</view>
								<view class="TB">
									卖了换钱
								</view>
								<view class="evaluate TB">
									评价
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="isActive==='Wait'">
					<view class="OrderContent" v-for="(item,index) in WatiList" :key="'WatiList'+index">
						<view class="NavBussName">
							<view class="BussName">
								<view class="platform">
									{{item.platform}}
								</view>
								{{item.business}} >
							</view>
							<view class="BussState" v-if="item.isSuccess==true">
								交易成功
							</view>
							<view class="BussState" v-else>
								交易失败
							</view>
						</view>
						<view class="GoosInfor">
							<image :src="item.image" mode=""></image>
							<view class="GoosInforContext">
								<view class="GoosName">
									{{item.goosname}}
								</view>
								<view class="GoosSize">
									{{item.goossize}}
								</view>
								<view class="GoosActive">
									<view class="GoosActiveList" v-for="(item,index) in item.active" :key="'active'+index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="Goosmoney">
								￥{{item.money}}
								<view style="float: right; font-size: 20upx; color: rgba(0,0,0,0.5);">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="FreightInsurance" v-show="item.isFreightInsurance">
							<view class="FISContainer">
								运费险 <view class="FIState">确认收货前退换货可理赔</view>
							</view>
							<view class="FIisInvalid" v-if="item.FIisInvalid=='true'">
								已失效
							</view>
							<view class="FIisInvalid" v-else-if="tem.FIisInvalid=='false'">
								未失效
							</view>
						</view>
						<view class="Money">
							共{{item.number}}件商品 合计:<view class="Moneys">￥{{item.money}}</view>
						</view>
						<view class="Buttons">
							<view class="ellipsis">
								...
							</view>
							<view class="ThreeButton">
								<view class="TB">
									查看物流
								</view>
								<view class="TB">
									卖了换钱
								</view>
								<view class="evaluate TB">
									评价
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="isActive==='Deliver'">
					<view class="OrderContent" v-for="(item,index) in DeliverList" :key="'DeliverList'+index">
						<view class="NavBussName">
							<view class="BussName">
								<view class="platform">
									{{item.platform}}
								</view>
								{{item.business}} >
							</view>
							<view class="BussState" v-if="item.isSuccess==true">
								交易成功
							</view>
							<view class="BussState" v-else>
								交易失败
							</view>
						</view>
						<view class="GoosInfor">
							<image :src="item.image" mode=""></image>
							<view class="GoosInforContext">
								<view class="GoosName">
									{{item.goosname}}
								</view>
								<view class="GoosSize">
									{{item.goossize}}
								</view>
								<view class="GoosActive">
									<view class="GoosActiveList" v-for="(item,index) in item.active" :key="'active'+index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="Goosmoney">
								￥{{item.money}}
								<view style="float: right; font-size: 20upx; color: rgba(0,0,0,0.5);">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="FreightInsurance" v-show="item.isFreightInsurance">
							<view class="FISContainer">
								运费险 <view class="FIState">确认收货前退换货可理赔</view>
							</view>
							<view class="FIisInvalid" v-if="item.FIisInvalid=='true'">
								已失效
							</view>
							<view class="FIisInvalid" v-else-if="tem.FIisInvalid=='false'">
								未失效
							</view>
						</view>
						<view class="Money">
							共{{item.number}}件商品 合计:<view class="Moneys">￥{{item.money}}</view>
						</view>
						<view class="Buttons">
							<view class="ellipsis">
								...
							</view>
							<view class="ThreeButton">
								<view class="TB">
									查看物流
								</view>
								<view class="TB">
									卖了换钱
								</view>
								<view class="evaluate TB">
									评价
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="isActive==='Recieve'">
					<view class="OrderContent" v-for="(item,index) in RecieveList" :key="'RecieveList'+index">
						<view class="NavBussName">
							<view class="BussName">
								<view class="platform">
									{{item.platform}}
								</view>
								{{item.business}} >
							</view>
							<view class="BussState" v-if="item.isSuccess==true">
								交易成功
							</view>
							<view class="BussState" v-else>
								交易失败
							</view>
						</view>
						<view class="GoosInfor">
							<image :src="item.image" mode=""></image>
							<view class="GoosInforContext">
								<view class="GoosName">
									{{item.goosname}}
								</view>
								<view class="GoosSize">
									{{item.goossize}}
								</view>
								<view class="GoosActive">
									<view class="GoosActiveList" v-for="(item,index) in item.active" :key="'active'+index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="Goosmoney">
								￥{{item.money}}
								<view style="float: right; font-size: 20upx; color: rgba(0,0,0,0.5);">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="FreightInsurance" v-show="item.isFreightInsurance">
							<view class="FISContainer">
								运费险 <view class="FIState">确认收货前退换货可理赔</view>
							</view>
							<view class="FIisInvalid" v-if="item.FIisInvalid=='true'">
								已失效
							</view>
							<view class="FIisInvalid" v-else-if="tem.FIisInvalid=='false'">
								未失效
							</view>
						</view>
						<view class="Money">
							共{{item.number}}件商品 合计:<view class="Moneys">￥{{item.money}}</view>
						</view>
						<view class="Buttons">
							<view class="ellipsis">
								...
							</view>
							<view class="ThreeButton">
								<view class="TB">
									查看物流
								</view>
								<view class="TB">
									卖了换钱
								</view>
								<view class="evaluate TB">
									评价
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="isActive==='Apply'">
					<view class="OrderContent" v-for="(item,index) in ApplyList" :key="'ApplyList'+index">
						<view class="NavBussName">
							<view class="BussName">
								<view class="platform">
									{{item.platform}}
								</view>
								{{item.business}} >
							</view>
							<view class="BussState" v-if="item.isSuccess==true">
								交易成功
							</view>
							<view class="BussState" v-else>
								交易失败
							</view>
						</view>
						<view class="GoosInfor">
							<image :src="item.image" mode=""></image>
							<view class="GoosInforContext">
								<view class="GoosName">
									{{item.goosname}}
								</view>
								<view class="GoosSize">
									{{item.goossize}}
								</view>
								<view class="GoosActive">
									<view class="GoosActiveList" v-for="(item,index) in item.active" :key="'active'+index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="Goosmoney">
								￥{{item.money}}
								<view style="float: right; font-size: 20upx; color: rgba(0,0,0,0.5);">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="FreightInsurance" v-show="item.isFreightInsurance">
							<view class="FISContainer">
								运费险 <view class="FIState">确认收货前退换货可理赔</view>
							</view>
							<view class="FIisInvalid" v-if="item.FIisInvalid=='true'">
								已失效
							</view>
							<view class="FIisInvalid" v-else-if="tem.FIisInvalid=='false'">
								未失效
							</view>
						</view>
						<view class="Money">
							共{{item.number}}件商品 合计:<view class="Moneys">￥{{item.money}}</view>
						</view>
						<view class="Buttons">
							<view class="ellipsis">
								...
							</view>
							<view class="ThreeButton">
								<view class="TB">
									查看物流
								</view>
								<view class="TB">
									卖了换钱
								</view>
								<view class="evaluate TB">
									评价
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
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
					fail: function() {
						console.log('fail')
					},
					icon: 'loading',
				})
			} else {
				this.userinfor.userid = res[0]
			}
		},
		onLoad: function(option) {
			var that = this;
			uni.showLoading({
				title: "加载中"
			});
			// var id = uni.getStorageSync('id');
			uni.request({
				url: " http://127.0.0.1:3389/myorder",
				method: "POST",
				data: {},
				dataType: 'json',
				success: function(data) {
					that.AllList = data.data.myorder;
					for (var i in that.AllList) {
						let WhatState = that.AllList[i].state;
						//待付款
						if (WhatState == "WaitForPay") {
							that.WatiList.push(that.AllList[i]);
						}
						//待发货
						else if (WhatState == "WaitForDeliver") {
							that.DeliverList.push(that.AllList[i]);
						}
						//待收货
						else if (WhatState == "WaitForRecieve") {
							that.RecieveList.push(that.AllList[i]);
						}
						//待评价
						else if (WhatState == "WaitForApply") {
							that.ApplyList.push(that.AllList[i]);
						}
					}
				},
			});
			uni.hideLoading();
		},
		onReady: function() {

		},
		data() {
			return {
				userinfor: {
					userid: ""
				},
				TouchEnd: 0,
				TouchStart: 0,
				isActiveAll: true,
				isActiveDeliver: false,
				isActiveRecieve: false,
				isActiveApply: false,
				isActiveWait: false,
				isActive: "All",
				AllList: [],
				WatiList: [],
				DeliverList: [],
				RecieveList: [],
				ApplyList: [],
				slidenumber: 0,
			}
		},
		methods: {
			bodyTouchEnd(event) {
				this.TouchEnd = event.changedTouches[0].pageX
				//判断是左滑还是右滑
				//从左往右滑
				if (this.TouchEnd > this.TouchStart && this.TouchEnd - this.TouchStart >= 200) {
					this.slidenumber = this.slidenumber - 1;
					if (this.slidenumber < 0) {
						this.slidenumber = 0;
					}
					switch (this.slidenumber) {
						case 0:
							this.isActive = "All";
							this.isActiveAll = true;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 1:
							this.isActive = "Wait";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = true;
							break;
						case 2:
							this.isActive = "Deliver";
							this.isActiveAll = false;
							this.isActiveDeliver = true;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 3:
							this.isActive = "Recieve";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = true;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 4:
							this.isActive = "Apply";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = true;
							this.isActiveWait = false;
							break;
					} //从右往左滑
				} else if (this.TouchStart > this.TouchEnd && this.TouchStart - this.TouchEnd >= 200) {
					this.slidenumber = this.slidenumber + 1;
					if (this.slidenumber > 4) {
						this.slidenumber = 4
					}
					switch (this.slidenumber) {
						case 0:
							this.isActive = "All";
							this.isActiveAll = true;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 1:
							this.isActive = "Wait";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = true;
							break;
						case 2:
							this.isActive = "Deliver";
							this.isActiveAll = false;
							this.isActiveDeliver = true;
							this.isActiveRecieve = false;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 3:
							this.isActive = "Recieve";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = true;
							this.isActiveApply = false;
							this.isActiveWait = false;
							break;
						case 4:
							this.isActive = "Apply";
							this.isActiveAll = false;
							this.isActiveDeliver = false;
							this.isActiveRecieve = false;
							this.isActiveApply = true;
							this.isActiveWait = false;
							break;
					}
				}
			},
			bodyTouchStart(event) {
				this.TouchStart = event.touches[0].pageX
			},
			isallTap() {
				this.slidenumber = 0;
				this.isActive = "All",
					this.isActiveAll = true,
					this.isActiveDeliver = false,
					this.isActiveRecieve = false,
					this.isActiveApply = false,
					this.isActiveWait = false
			},
			isWaitPayTap() {
				this.slidenumber = 1;
				this.isActive = "Wait",
					this.isActiveAll = false,
					this.isActiveDeliver = false,
					this.isActiveRecieve = false,
					this.isActiveApply = false,
					this.isActiveWait = true
			},
			isWaitDeliverTap() {
				this.slidenumber = 2;
				this.isActive = "Deliver",
					this.isActiveAll = false,
					this.isActiveDeliver = true,
					this.isActiveRecieve = false,
					this.isActiveApply = false,
					this.isActiveWait = false
			},
			isWaitRecieveTap() {
				this.slidenumber = 3;
				this.isActive = "Recieve",
					this.isActiveAll = false,
					this.isActiveDeliver = false,
					this.isActiveRecieve = true,
					this.isActiveApply = false,
					this.isActiveWait = false
			},
			isWaitApplyTap() {
				this.slidenumber = 4;
				this.isActive = "Apply",
					this.isActiveAll = false,
					this.isActiveDeliver = false,
					this.isActiveRecieve = false,
					this.isActiveApply = true,
					this.isActiveWait = false
			}
		},
	}
</script>
<style>
	@import url("../../static/css/page.css");
</style>
