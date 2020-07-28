<template>
  <div class="login-box">
	<div class="login-input-box">
		<el-input placeholder="请输入账号" class="login-input" prefix-icon="el-icon-user" v-model="number">
		</el-input>
		<el-input placeholder="请输入密码" class="login-input"  type="password" prefix-icon="el-icon-lock" show-password v-model="pws">
		</el-input>
		<el-checkbox v-model="checked" class="login-remer">记住密码</el-checkbox>
		<el-button type="primary" class="login-btn" @click="loginFn">登录</el-button>
	</div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  props: {
  },
  data (){
	return {
		number:'',
		pws:'',
		checked:true
	}  
  },
  methods:{
	loginFn:function(){
		this.$router.push({name:'Home'})
	}  
  },
  created(){
  }
}
</script>
<style scoped lang="scss">
	.login-box{
		width:100%;
		height: 100%;
		position: absolute;
		background:url(../assets/login/login_bg_01.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
	.login-input-box{
		width: 300px;
		margin:200px auto;
	}
	.login-input{
		margin-bottom: 20px;
	}
	.login-remer{
		float: right;
	}
	.login-btn{
		width: 100%;
		margin-top: 30px;
	}
</style>