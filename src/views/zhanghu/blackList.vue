<template>
	<div class="main-box">
		<div class="zh-head">黑名单列表</div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input size="small" placeholder="请输入手机号" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				<div class="seach-item">黑名单类型 <div class="search-input">
					<el-select size="small" v-model="blackType" placeholder="请选择">
						<el-option
						  v-for="item in blackTypeList"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select>
				</div> </div>
				<div class="seach-item">原因 <div class="search-input">
				<el-input size="small" placeholder="请输入原因" type="text" maxlength="11" prefix-icon="el-icon-search" v-model="blackoutReason"></el-input></div> </div>
				
				<div class="seach-item"><el-button type="primary"  size="small " @click="addBlack">添加黑名单</el-button></div>
				<div style="width: 100%;"> </div><!-- 强制换行 -->
				<div class="seach-item" >手机号 <div class="search-input">
				<el-input size="small" placeholder="请输入手机号" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="searchPhone"></el-input></div> </div>
				<div class="seach-item">身份证号 <div class="search-input">
				<el-input size="small" placeholder="身份证号" type="text" maxlength="20" prefix-icon="el-icon-search" v-model="searchIdNumber"></el-input></div> </div>
				<div class="seach-item" ><el-button type="primary"  size="small " @click="searchBlack">查询</el-button></div>
				
			</div>
			<div class="seach-box">
					
			</div>
			  <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
				 <el-table-column
				      type="index"
				      width="50">
				 </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="创建日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="isCertification"
			      label="平台编号"
			      width="80">
			    </el-table-column>
				<el-table-column
				  prop="userName"
				  label="姓名">
				</el-table-column>
			    <el-table-column
			      prop="phone"
			      label="手机号">
			    </el-table-column>
				<!-- <el-table-column
				  prop="blackId"
				  label="身份证号">
				  <template slot-scope="scope">
				  	<div>{{scope.row.blackId|cardNumFilter}}</div>
				  </template>
				</el-table-column> -->
				<el-table-column
				  prop="blackType"
				  label="类型状态">
				  <template slot-scope="scope">
				  	<div class="black-type black-login">{{scope.row.course}}</div>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="uId"
				  label="用户编号">
				</el-table-column>
				<el-table-column
				  prop="blackBeizhu"
				  label="备注">
				</el-table-column>
				<el-table-column
				  prop="blackTel"
				  label="操作">
				   <template slot-scope="scope">
				  		<el-button type="warning" plain @click="removeBlack(scope.row.uId,scope.row.blackType)" size="mini">移出黑名单</el-button>
				  	 </template>
				</el-table-column>
			  </el-table>
		
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			
			searchPhone:'',
			searchIdNumber:'',
			phone:'',
			blackType:'',
			blackoutReason:'',
			blackTypeList:[
				{
					label:'登录',
					value:'app_no_login'
				},	{
					label:'提现',
					value:'no_withdrawa'
				},	{
					label:'消费',
					value:'no_credit_car'
				}
			],
			tableData:[
			]
		}
	},
	created() {
		this.refreshBlackList()
	},
	methods:{
		refreshBlackList(){
			this.http.post(this.api.blackListUser,
			{
				"page":1,
				"size":10
			
			},sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						  this.tableData=res.data.list
						  if(res.data.list.length==0){
						  							  this.$message.success('没有查询到黑名单')
						  }
			          }
			       });
		},
		// 查找黑名单
		searchBlack(){
			this.http.post(this.api.blackListUser,
			{
				page:1,
				size:10,
				idNumber:this.searchIdNumber,
				phone:this.searchPhone,
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list
						  if(res.data.list.length==0){
							  this.$message.success('没有查询到黑名单')
						  }
			          }
			       });
		},
		// 添加黑名单
		addBlack(){
			this.http.post(this.api.addBlack,
			{
				phone:this.phone,
				blackType:this.blackType,
				blackoutReason:this.phone,
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list
			          }
			       });
				   // setTimeout( this.refreshBlackList(),200)
				   // this.refreshBlackList()
		},
		// 移除黑名单
		removeBlack(uid,blackType){
			this.http.post(this.api.removeBlack,
			{
				userId:uid,
				blackType:blackType,
				blackoutReason:this.phone,
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						   this.$message({
						            message: res.data,
						            type: 'success'
						          });
			          }
			       });
				   // this.refreshBlackList()
		}
	},
	filters:{
		cardNumFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
	}
}
</script>

<style>	
.black-type{
	display: inline-block;
	padding: 4px 14px;
	line-height: 18px;
	color: #FFFFFF;
	text-align: center;
	border-radius: 4px;
}
.black-login{
	background-color: #ffaa7f;
}
.black-deposit{
	background-color: #ffaa00;
}
.black-consume{
	background-color: #aa2e26;
}
</style>
