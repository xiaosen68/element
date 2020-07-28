<template>
	<div class="main-box">
		<div class="zh-head">黑名单列表</div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input size="small" placeholder="请输入手机号" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="orderTel"></el-input></div> </div>
				<div class="seach-item">身份证号 <div class="search-input">
				<el-input size="small" placeholder="身份证号" type="text" maxlength="20" prefix-icon="el-icon-search" v-model="orderNum"></el-input></div> </div>
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
				<div class="seach-item"><el-button type="primary"  size="small ">添加黑名单</el-button></div>
				<div style="width: 100%;"> </div><!-- 强制换行 -->
				<div class="seach-item" >手机号 <div class="search-input">
		
				<el-input size="small" placeholder="请输入手机号" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="orderTel"></el-input></div> </div>
				<div class="seach-item" ><el-button type="primary"  size="small ">查询</el-button></div>
				
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
			      prop="blackDate"
			      label="创建日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="pingtaiNum"
			      label="平台编号"
			      width="80">
			    </el-table-column>
				<el-table-column
				  prop="blackName"
				  label="姓名">
				</el-table-column>
			    <el-table-column
			      prop="blackTel"
			      label="手机号">
			    </el-table-column>
				<el-table-column
				  prop="blackId"
				  label="身份证号">
				  <template slot-scope="scope">
				  	<div>{{scope.row.blackId|cardNumFilter}}</div>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="blackType"
				  label="类型状态">
				  <template slot-scope="scope">
				  	<div class="black-type black-login">{{scope.row.blackType}}</div>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="blackNum"
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
				  		<el-button type="warning" plain  size="mini">移出黑名单</el-button>
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
			orderNum:'',
			orderTel:'',
			blackType:'',
			blackTypeList:[
				{
					label:'登录',
					value:'1'
				},	{
					label:'提现',
					value:'2'
				},	{
					label:'消费',
					value:'3'
				}
			],
			tableData:[
				{
					blackDate:'2020-01-12 23:32:22',
					pingtaiNum:'123',
					blackName:'嘿嘿',
					blackTel:'13087897889',
					blackId:'13087897889',
					blackType:'登录',
					blackNum:'123123123',
					blackBeizhu:'2230.00',
				}
			]
		}
	},
	methods:{
		
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
