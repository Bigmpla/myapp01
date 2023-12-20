<template>
	<view>
		<!-- 选择收获地址 -->
		<view class="address-choose-box" v-if ="JSON.stringify(address_info)==='{}'">
			<button type="primary" size ="mini" class="btnChooseAddress" @click="chooseAdr">选择收货地址</button>
		</view>
		
		<!-- 收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAdr()">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address_info.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话:{{address_info.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
				
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import{mapState, mapMutations,mapGetters} from 'vuex'
	
	export default {
		name:"my-address",
		data() {
			return {
				// address_info:{}
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAdr(){
				const [err,succ] = await uni.chooseAddress().catch(err => err)
				if(err === null && succ.errMsg === 'chooseAddress:ok'){
					// console.log(succ)
					// this.address_info = succ
					this.updateAddress(succ)
				}
			}
		},
		computed:{
			...mapState('m_user',['address_info']),
			...mapGetters('m_user',['addstr'])
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right{
			display: flex;
		}
	}
	.row2{
		margin-top: 10px;
		display: flex;
		align-items: center;
		.row2-left{
			white-space: nowrap;
		}
		.row2-right{
			margin-left: 5px;
		}
	}
}
</style>