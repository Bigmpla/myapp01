<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isAllCheck"/><text>全选</text>
		</label>
		
		<view class="sum-up">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import{mapGetters,mapMutations}from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			isAllCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isAllCheck)
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