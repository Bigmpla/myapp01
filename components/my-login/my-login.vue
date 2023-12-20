<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100"></uni-icons>
			<button type="primary" class='btn-login' @click="getUserProfile">一键登录</button>
			<text class="login-tips">登录即享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			//获取用户信息
			getUserProfile() {
			    uni.getUserProfile({			
			     desc: '请求授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
			     success: (res) => {
			      // console.log(res)
			      // 更新用户信息			
			      this.updateUserInfo(res.userInfo)		
					  // console.log(res.userInfo)
			      this.getToken(res)
			     },
			
			     fail: (res) => {		
			      return uni.$showMsg("已取消登录授权")			
			     }			
			    })			
			   },
			   
			   async getToken(info){
				   const[err,res] = await uni.login().catch(err => err)
				   if(err || res.errMsg !== 'login:ok')return uni.$showMsg('登录失败')
				   
				   const query={
					   code:info.cloudID,
					   encryptedDate:info.encryptedData,
					   iv:info.iv,
					   rawData:info.iv
				   }
				   // console.log(info)
				   // console.log(query)
		
				   // const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				   // console.log(loginResult.meta.status)
				   // 无后端，这里请求不到token，于是直接写一个固定的token了
				   this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				   uni.$showMsg("登录成功！")
				   
			   }
			   
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.btn-login{
		width: 80%;
		margin: 20px 0;
		border-radius: 100px;
		background-color: #c00000;
	}
	.login-tips{
		font-size: 15px;
		color: gray;
	}
}
</style>