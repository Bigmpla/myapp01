<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar-pic"></image>
			<text class="nickname">{{userinfo.nickName}}</text>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>11</text>
						<text>我的收藏</text>
					</view>
					<view class="panel-item">
						<text>45</text>
						<text>我的关注</text>
					</view>
					<view class="panel-item">
						<text>1</text>
						<text>我的收藏</text>
					</view>
					<view class="panel-item">
						<text>141</text>
						<text>我的足迹</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size ="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size ="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size ="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{mapState,mapMutations}from 'vuex'
	export default {
		name:"user-info",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateAddress']),
			async logout(){
				const[err,succ] = await uni.showModal({
					title:'提示',
					content:"是否退出登录"
				}).catch(err=>err)
				
				if(succ && succ.confirm){
					this.updateAddress({})
					this.updateToken('')
					this.updateUserInfo({})
				}
			}
			
		},
		computed:{
			...mapState('m_user',['userinfo'])
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #F4F4F4;
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.avatar-pic{
			width: 100px;
			height: 100px;
			border-radius: 50px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 18px;
			color: #fff;
			font-weight: bold;
			margin-top:10px
		}
	}
	.panel-list{
		padding: 0 15px;
		position: relative;
		top: -10px;
		.panel{
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			.panel-title{
				line-height: 40px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
			}
			.panel-body{
				
				display: flex;
				justify-content: space-around;
				.panel-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					font-size: 12px;
					padding: 10px 0px;
					.icon{
						height: 35px;
						width: 35px;
					}
				}
			}
		}
		.panel-list-item{
			display: flex;
			justify-content:space-between;
			align-items: center;
			font-size: 16px;
			padding: 0 10px;
			line-height: 35px;
		}
	}
}
</style>