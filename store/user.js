export default{
	namespaced: true,
	
	//数据节点
	state: () => ({
		address_info:JSON.parse(uni.getStorageSync('address_info') || '{}'),
		token:JSON.parse(uni.getStorageSync('Token')||''),
		userinfo:JSON.parse(uni.getStorageSync('userInfo') || '{}')
	}),
	
	//方法节点
	mutations:{
		//更新地址信息
		updateAddress(state,address){
			state.address_info = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address_info',JSON.stringify(state.address_info))
		},
		//更新用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenStorage')
		},
		saveTokenStorage(state){
			uni.setStorageSync('Token',JSON.stringify(state.token))
		}
	},
	getters:{
		addstr(state){
			if(!state.address_info.provinceName)return ''
			//拼接地址
			return state.address_info.provinceName + state.address_info.cityName+state.address_info.countyName+state.address_info.detailInfo
		}
	}
}