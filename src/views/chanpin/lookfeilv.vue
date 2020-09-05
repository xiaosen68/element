<template>
	<div class="main-box">
		<div class="zh-head">通道费率总览 </div>
		<div class="zh-info-box">
			 <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="passageWayName"
			      label="通道名称"
			     >
			    </el-table-column>
				<el-table-column
				  prop="baseRate"
				  label="基础费率"
				 >
				</el-table-column>
				<el-table-column
				  prop="coFounder"
				  label="联合创始人"
				 >
				</el-table-column>
				<el-table-column
				  prop="seniorPartner"
				  label="高级合伙人"
				 >
				</el-table-column>
				<el-table-column
				  prop="businessParter"
				  label="业务合伙人"
				 >
				</el-table-column>
				<el-table-column
				  prop="vipMembers"
				  label="VIP会员"
				 >
				</el-table-column>
				<el-table-column
				  prop="members"
				  label="会员"
				 >
				</el-table-column>
				<el-table-column
				  prop="ordinaryUsers"
				  label="普通用户"
				 >
				</el-table-column>
			  </el-table>
		</div>
	</div>
</template>

<script>
	 export default{
		 data (){
			 return {
				 tableData:[]
			 }
		 },
		 created(){
			 this.http.post(this.api.getPassageWay,
			 {
			 	page:1,
			 	size:30
			 
			 },sessionStorage.getItem('token')).then(res => {
			 	console.log(res)
			           if(res.code == 0){
			 			  this.tableData=res.data.list;
			 			  // this.refreshLable();
			           }
			        });
		 },
		 methods:{
			 
		 }
	 }
</script>

<style>
</style>
