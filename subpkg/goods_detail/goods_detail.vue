<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 商品信息主体 -->
			<view class="goods_info_body">
				<view class="goods_name">
					{{goods_info.goods_name}}
				</view>
				<view class="goods_fav">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="trasfee">
				快递：免运费
			</view>
		</view>
		<!-- 富文本，可渲染出html等 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 导航组件区 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info:[],
				options:[{
					icon:'headphones',
					text:'客服'
				},{
					icon:'cart',
					text:'购物车'
				}],
				buttonGroup:[{
					text:'加入购物车',
					backgroundColor:'#ff0000',
					color:'#fff'
				},{
					text:'立即购买',
					backgroundColor:'#ffa200',
					color:'#fff'
				}]
			};
		},
		onLoad(options){
			const goods_id =options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods:{
			async getGoodsDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status !== 200)return uni.$showMsg()
				
				res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ')
				this.goods_info = res.message
			},
			preview(i){
				// 预览轮播图图片
				uni.previewImage({
					//预览时，当前图片的索引
					current:i,
					//所有图片的url地址的数组
					urls:this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/Cart/Cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	image{
		height: 100%;
		width: 100%;
	}
}

.goods-info-box{
	padding: 10px;
	padding-right: 0px;
	.price{
		color: #C00000;
		font-size: 20px;
		margin: 10px 0px;
	}
	.goods_info_body{
		display: flex;
		justify-content: space-between;
		.goods_name{
			margin-right: 10px;
			font-size: 16px;
		}
		.goods_fav{
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color:gray
		}
	}
	.trasfee{
		font-size: 12px;
		color: gray;
		margin:10px 0px;
	}
}
.goods_nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.goods-detail-container{
	padding-bottom: 50px;
}
</style>
