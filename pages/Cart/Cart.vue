<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<uni-icons type="shop" size = "18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		 </view>
		
		<!-- 商品列表的商品区域 -->
		<uni-swipe-action>
			<block v-for="(good,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipItemClickHandler(good)">
				<my-goods :item="good" :showRadio="true" @radio-change="radioChangeHandler" :show-num="true" @num-change="numberChangehandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<view>
			<my-settle></my-settle>
		</view>
		
	</view>
	
	<!-- 空白购物车 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tips">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				options:[{
					text:"删除",
					style:{
						backgroundColor:'#C00000'
					}
				}]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsByID']),
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			numberChangehandler(e){
				this.updateGoodsCount(e)
			},
			swipItemClickHandler(good){
				this.removeGoodsByID(good.goods_id)
			}
		}
		
	}
</script>

<style lang="scss">
.cart-container{
		padding-bottom: 45px;
}
.cart-title{
	height:40px;
	displace:flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		font-size:14px;
		margin-left:10px;
		
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 100px;
		height: 100px;
	}
	.tips{
		font-size: 16px;
		padding-top: 20px;
		color:gray
	}
}
</style>
