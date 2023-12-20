export default{
	
	namespaced: true,
	
	state: () => ({
		// 购物车数组
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
		
	}),
	
	mutations:{
		addToCart(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
			
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车的勾选状态
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车中修改的商品数量
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
			}
			this.commit('m_cart/saveToStorage')
		},
		//删除商品
		removeGoodsByID(state,goods_id){
			//过滤掉传过来的那个id
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		//全选商品或者取消全选商品
		updateAllGoodsState(state,newstate){
			state.cart.forEach(x=>x.goods_state = newstate)
			this.commit('m_cart/saveToStorage')
		}
		
	},
	 
	getters:{
		//商品总数
		total(state){
			let c = 0
			state.cart.forEach(x => c += x.goods_count)
			return c
			// state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		//被勾选的商品总数
		checkedCount(state){
			//filter过滤出已勾选的商品，reduce对已勾选商品总数进行累加
			return state.cart.filter(x =>x.goods_state).reduce((total,item)=>  total += item.goods_count,0)
		},
		
		checkedGoodsAmount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
		}
	}
}