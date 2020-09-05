<template>
	<div class="main-box">
		<div class="zh-head">会员信息 </div>
		<div class="zh-info-box">
		<!-- 添加菜单 -->
				<div class="zh-info-item" >
					<el-select v-model="roleId" placeholder="请选择">
					  <el-option
						v-for="item in limitsOption"
						:key="item.roleId"
						:label="item.description"
						:value="item.id">
					  </el-option>
					</el-select>
					<div>
					   <el-tree
						 :data="treeData"
						 show-checkbox
						 node-key="id"
						 :props="defaultProps"
						 @check="checkFn()"
						 ref="tree">
					   </el-tree>
					</div>
					<el-button type="primary" @click="quanXIanSure()">确 定</el-button>
				</div>
		<!-- 权限菜单配置 -->
		
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			limitsOption:{
				
			},//权限列表
			roleId:'',//权限id
			permissionId:[],//菜单id
			treeData:[],//菜单列表
			defaultProps:{
				label:"nameZh",
				children:'childPermission'
			},//菜单树属性
		}
	},
	created() {
		// 获取权限列表
		this.http.get(this.api.getRole,
		{},sessionStorage.getItem('token')).then(res => {
			console.log(res)
		          if(res.code == 0){
					this.limitsOption=res.data;
					console.log(this.limitsOption)
		          }
		       });
			   // 获取菜单树
	   this.http.get(this.api.getPermission,{},
	   sessionStorage.getItem('token')).then(res => {
		console.log(res)
				 if(res.code == 0){
				  this.treeData=res.data;
				 }
			  });
	},
	methods:{
		// 配置权限菜单
		quanXIanSure:function(){
			this.http.post(this.api.setPermissionRole,
			{
				roleId:this.roleId,
				permissionId:this.permissionId,
			},
			sessionStorage.getItem('token')).then(res => {
					console.log(res)
							 if(res.code == 0){
								 this.$message.success(res.data)
							  // this.treeData=res.data;
							 }
						  });
		},
		// 选择菜单；
		checkFn:function(e){
		console.log(this.$refs.tree.getCheckedKeys())	
		this.permissionId=this.$refs.tree.getCheckedKeys();
		}

	},
	filters:{
		
	}
}
</script>

<style>
	 
</style>
