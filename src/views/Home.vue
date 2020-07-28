<template>
  <div class="home">
   <el-container>
     <el-header height="60px">
		<div class="logo">牛贝</div>
		<i  class="is-collapse  el-icon-s-unfold" v-if="isCollapse" @click="isCollapseFn"></i>
		<i  class="is-collapse el-icon-s-fold" v-else @click="isCollapseFn"></i>
		<el-breadcrumb separator="/" >
		  <el-breadcrumb-item  v-for="item in breadcrumb">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="user-info-box">
			欢迎管理员登录 131238213123
		</div>
		<div class="out-btn">退出</div>
	 </el-header>
     <el-container>
       <el-aside width="auto" :style="{height:asidHeight}">
		   
		<el-menu :default-active="defActive" background-color="#434343" text-color="#ffffff" 
		class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handSelect" :unique-opened="true" :collapse="isCollapse">
		  <el-submenu :index="items.index" v-for="(items, indexs) in menuList1" v-if="items.show">
		    <template slot="title">
		      <i :class="items.icon"></i>
		      <span slot="title">{{items.lable}}</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item :index="item.index" v-if="item.show" v-for="(item,index) in items.children">{{item.lable}}</el-menu-item>
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
				 {{item.lable}}
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
		asidHeight:'',
		isCollapse: false,
		isCollapseClass:"el-icon-s-fold",//el-icon-s-unfold,el-icon-s-fold，导航伸缩图标样式
		menuList1:[
			{
				index:'1',
				lable:'会员管理',
				show:true,
				icon:'el-icon-user',
				children:[
					{
						index:'1-1',
						lable:'快速注册会员',
						show:true,//是否显示
						path:'/home/hysign'
					},{
						index:'1-2',
						lable:'会员信息查询',
						show:true,
						path:'/home/hyinfo'
					},{
						index:'1-3',
						lable:'会员操作',
						show:true,
						path:'/home/hycaozuo'
					},{
						index:'1-4',
						lable:'实名审核',
						show:true,
						path:'/home/shiming'
					},{
						index:'1-5',
						lable:'实名审核信息上传',
						show:true,
						path:'/home/shimingsc'
					},{
						index:'1-6',
						lable:'VIP信息变更查询',
						show:true,
						path:'/home/vipcx'
					}
				]
			},
			{
				index:'2',
				lable:'商城管理',
				show:true,
				icon:'el-icon-office-building',
				children:[
					{
						index:'2-1',
						lable:'添加商品',
						show:true,
						path:'/home/addgoods',
					},{
						index:'2-2',
						lable:'商品列表',
						show:true,
						path:'/home/goodslist'
					},{
						index:'2-3',
						lable:'购买订单查询',
						show:true,
						path:'/home/searchorder'
					},{
						index:'2-4',
						lable:'寄售订单查询',
						show:true,
						path:'/home/searchorderjs'
					},{
						index:'2-5',
						lable:'消费订单查询',
						show:true,
						path:'/home/searchconsumeorder'
					},{
						index:'2-6',
						lable:'宣传海报',
						show:true,
						path:'/home/postermanage'
					},{
						index:'2-7',
						lable:'类别管理',
						show:true,
						path:'/home/goodsclassify'
					},{
						index:'2-8',
						lable:'商户列表',
						show:true,
						path:'/home/businesslist',
					}
				]
			},
			{
				index:'3',
				lable:'产品管理',
				show:true,
				icon:'el-icon-goods',
				children:[
					{
						index:'3-1',
						lable:'通道列表',
						show:true,
						path:'/home/tongdaolist'
					},{
						index:'3-2',
						lable:'通道费率总览',
						show:true,
						path:'/home/lookfeilv'
					},{
						index:'3-3',
						lable:'添加通道',
						show:true,
						path:'/home/addtongdao'
					},{
						index:'3-4',
						lable:'信息推送',
						show:true,
						path:'/home/informationpush'
					}
					
				]
			},
			{
				index:'4',
				lable:'交易管理',
				show:true,
				icon:'el-icon-s-order',
				children:[
					{
						index:'4-1',
						lable:'交易查询',
						show:true,
						path:'/home/dealquery'
					},
					{
						index:'4-2',
						lable:'交易汇总',
						show:true,
						path:'/home/dealstatics'
					},
					{
						index:'4-3',
						lable:'分润信息',
						show:true,
						path:'/home/fenruninfo'
					},
				]
			},
			{
				index:'5',
				lable:'平台管理',
				show:true,
				icon:'el-icon-printer',
				children:[
					{
						index:'5-1',
						lable:'平台列表',
						show:true,
						path:'/home/terracelist'
					},
					{
						index:'5-2',
						lable:'添加平台',
						show:true,
						path:'/home/addterrace'
					},
				]
			},
			{
				index:'6',
				lable:'账户管理',
				show:true,
				icon:'el-icon-s-custom',
				children:[
					{
						index:'6-1',
						lable:'个人信息管理',
						show:true,
						path:'/home/zhinfo'
					},
					{
						index:'6-2',
						lable:'黑名单管理',
						show:true,
						path:'/home/blacklist'
					}
				]
			}
		],//导航数组
		dynamicTags: [
		],//标签栏内容
		breadcrumb:[],//面包屑数组
		select:{},//储存打开的导航栏内容
		defActive:'2-6',//默认打开导航栏
	}
  },
	  beforeMount:function(){
		  // 加载默认打开的导航栏
		  this.menuList1.forEach((item)=>{
			  if(item.children){
				  item.children.forEach((items)=>{
					  if(items.index===this.defActive){
						   this.tagsAdd(items)
					  }
				  })
			  }
		  })
		 
	  },
	methods: {
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
			let _this=this;
			// 添加面包屑
			_this.menuList1.forEach((items)=>{
					if(items.children){
						items.children.forEach((item)=>{
							if(item.index===key){
								this.tagsAdd(item);
							}
						})
						
					}else{
						if(items.index==key){
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
				if(dy.index===this.select.index){
					this.$set(dy,'select',true);
					
				}
			})
			this.defActive=this.select.index;
			console.log(this.select.path)
			this.menuList1.forEach((item)=>{
				if(item.index===this.select.index[0]){
					this.breadcrumb[0]=item.lable;
					if(item.children){
						item.children.forEach((items)=>{
							if(items.index===this.select.index)
							this.breadcrumb[1]=items.lable;
						})
					}
					
				}
			})
			this.$router.push({path:this.select.path})
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
			if( this.select.index!==tag.index){
				 this.sameSelect(tag);
			}
		},
		// 添加页面标签
		tagsAdd:function(tag){
			// 判断标签是否已存在
			if(this.dynamicTags.some((item)=>{
				return item.index===tag.index
			})){
				// 存在
				this.dynamicTags.forEach((item)=>{
					if(item.index===tag.index){
						// 判断重复点击不跳转，不重复跳转
						if(item.select===false){
							console.log(tag)
							 this.sameSelect(tag);
							
						}
					}
				})
				
			}else{
				// 不存在
				this.dynamicTags.push({
					index:tag.index,
					lable:tag.lable,
					path:tag.path,
					select:true,
				})
				 this.sameSelect(tag);
			}
			
		}
		
	},
	mounted(){
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
