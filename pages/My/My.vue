<template>
	<view>
		<my-login v-if="!token">
			
		</my-login>
		
		<user-info class ="user-info-container" v-else>
			
		</user-info> 
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page,	
.user-info-container{
	height: 100%;
}
</style>
