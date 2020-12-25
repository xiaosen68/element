<template>
  <div class="home">
   <el-container>
     <el-header height="60px">
		<div class="logo" v-if="!isCollapse">牛贝</div>
		<i  class="is-collapse  el-icon-s-unfold" v-if="isCollapse" @click="isCollapseFn"></i>
		<i  class="is-collapse el-icon-s-fold" v-else @click="isCollapseFn"></i>
		<el-breadcrumb separator="/" >
		  <el-breadcrumb-item  v-for="item in breadcrumb">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="user-info-box">
			欢迎管理员登录 {{userPhone}}
		</div>
		<div class="out-btn" @click="outlogin">退出</div>
	 </el-header>
     <el-container>
       <el-aside width="auto" :style="{height:asidHeight}">
		   
		<el-menu :default-active="defActive" background-color="#434343" text-color="#ffffff" 
		class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handSelect" :unique-opened="true" :collapse="isCollapse">
		  <el-submenu :index="items.permissionId" v-for="(items, indexs) in menuList1">
		    <template slot="title">
		      <i :class="iconList[indexs]"></i>
		      <span slot="title">{{items.pnameZh}}</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item :index="item.permissionId" 
			   v-for="(item,index) in items.childPermission">{{item.pnameZh}}</el-menu-item>
		     </el-menu-item-group>
		  </el-submenu>
		</el-menu>
	   </el-aside>
       <el-main :style="{height:asidHeight}">
		   <!-- 页面标签栏 -->
		   <div class="tabs-box">
			   <el-tag
			     closable disable-transitions
			     disable-transitions
				 :effect="item.select?'dark':'plain'"
				 v-for="item in dynamicTags"
			     @close="tagsColse(item)"
				 @click="tagsClick(item)">
				 {{item.pnameZh}}
			   </el-tag>
		   </div>
		   <router-view></router-view>
	   </el-main>
     </el-container>
   </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data (){
	return {
		userPhone:'',
		asidHeight:'',
		isCollapse: false,
		isCollapseClass:"el-icon-s-fold",//el-icon-s-unfold,el-icon-s-fold，导航伸缩图标样式
		menuList1:[
		],//导航数组
		dynamicTags: [
		],//标签栏内容
		breadcrumb:[],//面包屑数组
		select:{},//储存打开的导航栏内容
		defActive:'6',//默认打开导航栏
		hehe:[],
		iconList:['el-icon-user','el-icon-office-building','el-icon-goods','el-icon-s-order','el-icon-printer','el-icon-s-custom','el-icon-s-custom']
	}
  },
	  beforeMount:function(){
		  this.http.get(this.api.getPermissionByUserId,
		  {
		  },sessionStorage.getItem('token')).then(res => {
		  	console.log(res)
		            if(res.code == 0){
						// this.menuList1=res.data;
						this.hehe=res.data.map((item)=>{
							if( item.childPermission){
								 item.childPermission.map((items)=>{
									 items.permissionId=items.permissionId.toString();
									 return items
								 })
							}
							item.permissionId=item.permissionId.toString()
							return item
						})
						this.menuList1=this.hehe
						console.log(this.menuList1)
		            }
		         });
		  
		  // 加载默认打开的导航栏
		  this.menuList1.forEach((item)=>{
			  if(item.childPermission){
				  item.childPermission.forEach((items)=>{
					  if(items.permissionId===this.defActive){
						   this.tagsAdd(items)
					  }
				  })
			  }
		  })
		  this.userPhone=sessionStorage.getItem('userPhone')
		 
	  },
	methods: {
		// 退出登录
		outlogin(){
			sessionStorage.removeItem('token');
			this.$router.push({name:'Login'})
		},
		// 是否收起导航栏
		isCollapseFn(){	
			if(this.isCollapse){
				this.isCollapse=false;
				this.isCollapseClass="el-icon-s-fold";
			}else{
				this.isCollapse=true;
				this.isCollapseClass="el-icon-s-unfold";
			}
		},
		// 打开导航栏
		handleOpen(key, keyPath) {
		},
		// 关闭导航栏
		handleClose(key, keyPath) {
		},
		// 导航栏选择
		handSelect(key,keyPath){
			// console.log(key)
			let _this=this;
			// 添加面包屑
			_this.menuList1.forEach((items)=>{
					if(items.childPermission){
						items.childPermission.forEach((item)=>{
							if(item.permissionId==key){
								this.tagsAdd(item);
							}
						})
						
					}else{
						if(items.permissionId==key){
							this.tagsAdd(items);
						}
					}
			})
			// console.log(key,keyPath)
		},
		// 同步select
		sameSelect:function(item){
			this.select=item;
			this.dynamicTags.forEach((dy)=>{
				this.$set(dy,'select',false)
				if(dy.permissionId===this.select.permissionId){
					this.$set(dy,'select',true);
					
				}
			})
			this.defActive=this.select.permissionId;
			// console.log(this.select.path)
			this.menuList1.forEach((item)=>{
				if(item.permissionId===this.select.permissionId[0]){
					this.breadcrumb[0]=item.pnameZh;
					if(item.childPermission){
						item.childPermission.forEach((items)=>{
							if(items.permissionId===this.select.permissionId)
							this.breadcrumb[1]=items.pnameZh;
						})
					}
					
				}
			})
			this.$router.push({path:this.select.purl})
		},
		// 关闭页面标签
		tagsColse:function(tag){
			 this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			 if(this.dynamicTags.every((item)=>{
				 return !item.select
			 })){
				 this.sameSelect(this.dynamicTags[this.dynamicTags.length-1]);
			 }
		},
		// 点击页面标签
		tagsClick:function(tag){
			// 不重复点击
			if( this.select.permissionId!==tag.permissionId){
				 this.sameSelect(tag);
			}
		},
		// 添加页面标签
		tagsAdd:function(tag){
			// 判断标签是否已存在
			if(this.dynamicTags.some((item)=>{
				return item.permissionId===tag.permissionId
			})){
				// 存在
				this.dynamicTags.forEach((item)=>{
					if(item.permissionId===tag.permissionId){
						// 判断重复点击不跳转，不重复跳转
						if(item.select===false){
							// console.log(tag)
							 this.sameSelect(tag);
							
						}
					}
				})
				
			}else{
				// 不存在
				this.dynamicTags.push({
					permissionId:tag.permissionId,
					pnameZh:tag.pnameZh,
					purl:tag.purl,
					select:true,
				})
				 this.sameSelect(tag);
			}
			
		}
		
	},
	mounted(){
		console.log(sessionStorage.getItem('token'))
		window.onresize = () =>{
			return (()=>{
				this.asidHeight = document.documentElement.clientHeight-60+'px'
			})()
		}
	},
  created() {
	  this.asidHeight = document.documentElement.clientHeight-60+'px'
	  }
  }
</script>
<style>
	
</style>
<style scoped lang="scss">
	.el-header{
		line-height: 60px;
	}
	.el-main{
		overflow: auto;
	}
	.out-btn{
		float: right;
		margin-right: 60px;
		// line-height: 60px;
	}
	.user-info-box{
		display: inline-block;
		margin-left: 40px;
		// margin: 0 auto;
	}
	.el-main{
		padding: 0;
		background-color: #f3f3f4;
	}
	.el-tag{
		margin: 0 10px;
	}
	.tabs-box{
		height: 40px;
		border-bottom: 2px solid #b2b2b1;
		text-align: left;
		line-height: 40px;
		overflow-x: auto;
	}
	  .el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    // min-height: 400px;
	  }
	.is-collapse{
		display: inline-block;
		font-size: 40px;
		line-height: 60px;
		vertical-align: middle;
		// float: left;
		margin-right: 10px;
	}
	.el-header{
		background-color: #00aaff;
		color: white;
		padding: 0;
		text-align: left;
		// padding: 6px 10px;
	}
.el-breadcrumb{
	display: inline-block;
	// float: left;
	// width: 300px;
	// height: 60px;
	// margin-left: 400px;
	line-height: 60px;
	vertical-align: middle;
		
	}
	.el-aside{
		background-color: #b2b2b1;
		height: 80vh;
		color: white;
		// padding-top: 10px;
	}
	.logo{
		display: inline-block;
		font-size: 20px;
		text-align: center;
		vertical-align: middle;
		// line-height: 60px;
		// float: left;
		width: 200px;
	}
	.el-submenu{
		text-align: left;
	}
</style>
