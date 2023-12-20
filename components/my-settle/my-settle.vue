<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isAllCheck"/><text>全选</text>
		</label>
		
		<view class="sum-up">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import{mapGetters,mapMutations,mapState}from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isAllCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isAllCheck)
			},
			settlement(){
				if(!this.checkedCount)return uni.$showMsg("请选择要结算的商品！")
				if(!this.addstr)return uni.$showMsg("请选择收货地址！")
				if(!this.token)return uni.$showMsg("请登录！")
				
				this.payOrder()
			},
			async payOrder(){
				const orderInfo={
					order_price:0.01,
					// order_price:this.checkedGoodsAmount,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map(x=> ({
						goods_id :x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
				
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(res.meta.status !== 200)return uni.$showMsg('创建订单失败')
				const orderNumber = res.message.order_number
				
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				if(res2.meta.status !== 200)return uni.$showMsg('订单创建失败！')
				const payInfo = res2.message.pay
				
				const[err,succ] = await uni.requestPayment(payInfo)
				if(err)uni.$showMsg('订单未支付！1')
				const{data: res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				if(res3.meta.status !== 200)return uni.$showMsg('订单未支付！2')
				uni.showToast({
					title:'支付完成！',
					icon:'success'
				})
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 45px;
	width: 100%;
	bottom: 0px;
	background-color: aliceblue;
	padding-left: 5px;
	.radio{
		display: flex;
		align-items:  center;
	}
	.sum-up{
		.amount{
			font-weight: bold;
			color: #C00000;
			
		}
	}
	.btn-settle{
		background-color: #C00000;
		height: 45px;
		color: white;
		line-height: 45px;
		min-width: 60px;
		text-align: center;
		padding: 0 10px;
		
	}
}
</style>