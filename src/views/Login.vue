<template>
  <div class="login-box">
	<div class="login-input-box">
		<el-input placeholder="请输入账号" class="login-input" prefix-icon="el-icon-user" v-model="phone">
		</el-input>
		<el-input placeholder="请输入密码" class="login-input"  type="password" 
		prefix-icon="el-icon-lock" show-password v-model="password">
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
		phone:'',
		password:'',
		checked:true
	}  
  },
  methods:{
	loginFn:function(){	
		this.http.post(this.api.login,
		{
			phone:this.phone,
		password:this.password,
		}).then(res => {
		          if(res.code == 0){
					  sessionStorage.setItem('userPhone',this.phone)
					  sessionStorage.setItem('token',res.data);
					 // this.$store.commit("setToken",res.data);
					 this.$router.push({name:'Home'})
		          }
		       });
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