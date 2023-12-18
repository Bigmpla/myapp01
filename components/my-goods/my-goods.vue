<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<!-- 商品图片 -->
			<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名字信息 -->
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<!-- 商品价格信息 -->
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price | tofixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		
		data() {
			return {
				defaultPic:'https://c-ssl.duitang.com/uploads/blog/202102/26/20210226195625_096a6.jpeg'
				
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	padding: 10px 5px;
	border-bottom: 2px solid #f0f0f0;
	display: flex;
	.goods-item-left{
		margin-right: 6px;
		.goods-pic{
			width: 100px;
			height: 100px;
			display:block;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 12px;
		}
		.goods-info-box{
			.goods-price{
				color: #C00000;
				font-size: 16px;
			}
		}
	}
}
</style>