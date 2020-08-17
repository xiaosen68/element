<template>
	<div class="main-box">
		<div class="zh-head">
			<div class="zh-head-item"><el-button autofocus plain :type="buttonTypeFn()" 
			size="small" @click="selectCaidan(1)">修改菜单</el-button></div>
			<div class="zh-head-item"><el-button autofocus plain :type="buttonTypeFn()"
			size="small" @click="selectCaidan(2)">新增菜单</el-button></div>
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人费率</el-button></div> -->
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人分润</el-button></div> -->
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人积分</el-button></div> -->
		</div>
		<div class="zh-info-box">
		<!-- 添加菜单 -->
				<div class="zh-info-item" v-if="showCaidan[1]==1">
					<div> 
						<b class="input-title">菜单英文名：</b> 
						<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="addCaidan.name"></el-input> </div> 
					</div>
					<div>
						<b class="input-title">菜单中文名：</b> 
						<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="addCaidan.nameZh"></el-input> </div> 
					</div>
					<div>
						<b class="input-title">菜单路径：</b> 
						<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="addCaidan.url"></el-input> </div> 
					</div>
					<div>
						<b class="input-title">菜单权重：</b> 
						<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="addCaidan.score"></el-input> </div> 
					</div>
					<div>
						<b class="input-title">上级id：</b> 
						<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="addCaidan.pid"></el-input> </div> 
					</div>
					<div>
						<b class="input-title"></b> 
						<el-button type="primary" @click="addCaidanFn()">确认添加</el-button>
					</div>
				</div>
		<!-- 修改菜单 -->
				<div class="zh-info-item" v-if="showCaidan[0]==1">
					 <el-tree
					      :data="treeData"
					     
					      node-key="id"
						  :props=defaultProps
					      default-expand-all
					      :expand-on-click-node="false">
					      <span class="custom-tree-node" slot-scope="{ node, data }">
					        <span class="tree-label">{{ node.label }}</span>
					        <span>
					          <el-button
					            type="text"
					            size="mini"
					            @click="changecaidan(data)">
					            修改菜单
					          </el-button>
					        </span>
					      </span>
					    </el-tree>
						<el-dialog
						  title="提示"
						  :visible.sync="caidanVisible"
						  width="400px">
						 <div>
						 	<b class="input-title">菜单id：</b> 
						 	<div class="input-box"><el-input class="input-item" disabled placeholder="请输入姓名" v-model="changeCaidan.id"></el-input> </div> 
						 </div>
						 <div> 
						 	<b class="input-title">菜单英文名：</b> 
						 	<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="changeCaidan.name"></el-input> </div> 
						 </div>
						 <div>
						 	<b class="input-title">菜单中文名：</b> 
						 	<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="changeCaidan.nameZh"></el-input> </div> 
						 </div>
						 <div>
						 	<b class="input-title">菜单路径：</b> 
						 	<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="changeCaidan.url"></el-input> </div> 
						 </div>
						 <div>
						 	<b class="input-title">菜单权重：</b> 
						 	<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="changeCaidan.score"></el-input> </div> 
						 </div>
						 <div>
						 	<b class="input-title">上级id：</b> 
						 	<div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="changeCaidan.pid"></el-input> </div> 
						 </div>
						 <div>
						 	<el-button @click="caidanVisible = false">取 消</el-button>
							<el-button type="primary" @click="changeCaidanFn()">确 定</el-button>
						 </div>
						
						</el-dialog>
						
				</div>
			
		
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			addCaidan:{
				nameZh:'',
				name:'',
				score:'',
				url:'',
				pid:'',
			},
			changeCaidan:{
				id:'',
				nameZh:'',
				name:'',
				score:'',
				url:'',
				pid:'',
			},
			treeData:[],//菜单列表
			caidanVisible:false,
			defaultProps:{
				label:"nameZh",
				children:'childPermission'
			},
			buttonType:['success','info','warning','danger','primary'],
			userInfo:{},
			showCaidan:[1,0,0,0],
		}
	},
	created() {
		this.http.get(this.api.getPermission,{},
		sessionStorage.getItem('token')).then(res => {
			console.log(res)
		          if(res.code == 0){
					  this.treeData=res.data;
					// this.$message.success(res.data);
		          }
		       });
	},
	methods:{
		buttonTypeFn:function(){
			
			// let index=Math.floor(Math.random()*5);
			return this.buttonType[2];
		},
		selectCaidan:function(n){
			if(n==1){
				this.showCaidan=[1,0,0,0]
			}else if(n==2){
				this.showCaidan=[0,1,0,0]
			}
		},
		// 添加菜单
		addCaidanFn:function(){
			this.http.post(this.api.savePermission,
			this.addCaidan,sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						this.$message.success(res.data);
			          }
			       });
		},
		// // 修改菜单
		changeCaidanFn:function(){
			this.http.post(this.api.updatePermission,
			this.changeCaidan,sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						this.$message.success(res.data)
						this.caidanVisible=false;
			          }else{
						  this.$message.warning(res.data)
						  this.caidanVisible=false;
					  }
			       });
		},
		// 修改菜单弹框
		changecaidan:function(data){
			console.log(data);
			this.changeCaidan.id=data.id;
			this.changeCaidan.nameZh=data.nameZh,
			this.changeCaidan.name=data.name,
			this.changeCaidan.score=data.score,
			this.changeCaidan.url=data.url,
			this.changeCaidan.pid=data.pid,
			this.caidanVisible=true;
			console.log(this.caidanVisible)
		}
	},
	filters:{
		realName(val){
			if(val=='NOT_COMMITTED'){
				return '未实名'
			}else if(val=='FAIL'){
				return '实名失败'
			}else if(val=='TO_BE_REVIEWED'){
				return '实名审核中'
			}else if(val=='PASS'){
				return '已实名'
			}	
		}
	}
}
</script>

<style scoped="scoped">
	  .custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 8px;
	  }
	.main-box{
		width: 98%;
		margin: 0 auto;
		margin-top: 4px;
		min-height: 200px;
		border-top: #e7eaec 4px solid;
		background-color: #ffffff;
		text-align: left;
	}
	.zh-head{
		display: flex;
		line-height: 3em;
		font-size: 14px;
		font-weight: 600;
		padding: 0 16px;
		border-bottom: 1px solid #e7eeec;
	}
	.zh-head-item{
		margin: 10px  10px;
		width: 80px;
	}
	.zh-info-box{
		padding: 0 16px;
		line-height: 3em;
	}
	.zh-info-title{
		display: inline-block;
		width: 120px;
		text-align: right;
		margin-right: 20px;
	}
	.zh-info-item{
		width: 300px;
	}
	b{
		font-weight: 400;
	}
</style>
