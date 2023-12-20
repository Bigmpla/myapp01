import {mapGetters} from 'vuex'
export default{
	computed:{
		...mapGetters('m_cart',['total'])
	},
	onShow(){
		this.setBadge()
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				//购物车图标的索引
				index:2,
				//text的值必须是字符串所以''是为了转成字符串
				text: this.total +''
			})
		}
	}
}