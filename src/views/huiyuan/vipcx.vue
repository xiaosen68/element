<template>
	<div class="main-box">
		<div class="zh-head">VIP变更查询 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">更改人手机号 
					<div class="search-input"><el-input placeholder="请输入内容" type="tel" maxlength="11"  v-model="tel1"></el-input></div> 
				</div>
				<div class="seach-item">被更改人手机号
					<div class="search-input"><el-input placeholder="请输入内容" type="tel" maxlength="11"  v-model="tel2"></el-input></div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
			</div>
			  <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="被更改人姓名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="tel1"
			      label="被更改人手机号">
			    </el-table-column>
				<el-table-column
				  prop="tel2"
				  label="更改人手机号">
				</el-table-column>
				<el-table-column
				  prop="vip1"
				  label="原等级">
				</el-table-column>
				<el-table-column
				  prop="vip2"
				  label="更改等级">
				</el-table-column>
			  </el-table>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			tel1:'',
			tel2:'',
			tableData:[
				{
					date:'2020-02-21 08:32:23',
					name:'哈哈',
					tel1:'123212312',
					tel2:'213123123',
					vip1:'普通用户',
					vip2:'vip会员'
				}
			]
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
	.seach-box{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
	}
	.search-input{
		display: inline-block;
		margin-left: 8px;
		width: 140px;
	}
	.seach-item{
		padding-top: 1px;
		margin-right: 6px;
	} */
</style>
