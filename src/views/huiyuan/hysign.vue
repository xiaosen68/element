<template>
	<div class="main-box">
		<div class="zh-head">快速注册 </div>
		<div class="zh-info-box">
			<div class="sign-waring"> 所注册用户的默认登录密码和支付密码均为“a123456”</div>
			<div> <div class="input-title">手机号码</div> <div class="sign-input">
			<el-input maxlength="11"  clearable type="tel"  v-model="phone" placeholder="请输入内容"></el-input></div></div>
			<div><div class="input-title">所属上级号码</div> <div class="sign-input">
			<el-input maxlength="11"  clearable type="tel"  v-model="superiorUserPhone" placeholder="请输入内容"></el-input></div></div>
			<div class="sign-btn" ><el-button type="primary" @click="fastRegistration">立即注册</el-button></div>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			phone:'',
			superiorUserPhone:''
		}
	},
	created() {
		
	},methods:{
		fastRegistration:function(){
			this.http.post(this.api.fastRegistration,
			{
				phone:this.phone,
			password:this.password,
			},sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						   this.$message({
						            message: res.data,
						            type: 'success'
						          });
			          }
			       });
		}  
	}
}
</script>

<style>
/* 	.main-box{
		width: 98%;
		margin: 0 auto;
		margin-top: 4px;
		min-height: 200px;
		border-top: #e7eaec 4px solid;
		background-color: #ffffff;
		text-align: left;
	}
	.zh-head{
		line-height: 3em;
		font-size: 14px;
		font-weight: 600;
		padding: 0 16px;
		border-bottom: 1px solid #e7eeec;
	}
	.zh-info-box{
		padding: 0 16px;
		line-height: 3em;
	}
	.sign-waring{
		background-color: #eeeeee;
		border-left:4px solid #00aaff;
		padding-left: 10px;
		margin-bottom: 20px;
	} */
	.sign-input{
		display: inline-block;
		width: 400px;
		margin-left: 20px;
	}
	.input-title{
		display: inline-block;
		font-size: 12px;
		width: 100px;
		text-align: right;
	}
	.sign-btn{
		margin-top: 20px;
		padding-left: 150px;
	}
</style>
