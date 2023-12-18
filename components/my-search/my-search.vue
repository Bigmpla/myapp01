<template>
	<view class ="my-serach-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
			<uni-icons type="search" size="20"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			//背景颜色
			bgcolor:{
				type:String,
				default:'#007AFF'	
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				console.log("111")
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-serach-container{
	height: 50px;
	// background-color: #007AFF;
	display: flex;
	align-items: center;
	padding:0px 20px ;
	.my-search-box{
		width: 100%;
		height: 36px;
		background-color: #FFFFFF;
		// border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>