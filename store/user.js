export default{
	namespaced: true,
	
	//数据节点
	state: () => ({
		address_info:JSON.parse(uni.getStorageSync('address_info') || '{}')
	}),
	
	//方法节点
	mutations:{
		updateAddress(state,address){
			state.address_info = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address_info',JSON.stringify(state.address_info))
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