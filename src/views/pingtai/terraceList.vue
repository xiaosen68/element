<template>
	<div class="main-box">
		<div class="zh-head">平台列表</div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">平台编号 <div class="search-input">  
				<el-input placeholder="请输入平台编号" type="tel" maxlength="11" size="small"  v-model="terraceNum"></el-input></div> </div>
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="text" maxlength="11" size="small"  v-model="terraceTel"></el-input></div> </div>
				<div class="seach-item">日期
					<div class="search-input">
						<el-date-picker style="width: 140px;"
						  v-model="terraceDate"
						  type="date"
						  placeholder="选择日期"
						  size="small" >
						</el-date-picker>
					</div> 
				</div>
				
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<!-- <div class="sign-waring"> 交易总笔数: <b class="font-fei">123123</b>,交易总金额:<b class="font-fei">123123</b></div> -->
			 <el-table
			      :data="tableData"
			      style="width: 100%">
			      <el-table-column
			        prop="date"
			        label="名称"
			        width="80">
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="编号"
			        width="180">
			      </el-table-column>
				  <el-table-column
				    prop="name"
				    label="手机号"
				    width="180">
				  </el-table-column>
			      <el-table-column
			        prop="address"
			        label="总交易金额">
			      </el-table-column>
				  <el-table-column
				    prop="address"
				    label="总交易笔数">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="日交易金额">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="日交易笔数">
				  </el-table-column>
			    </el-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			terraceNum:'',
			terraceTel:'',
			terraceDate:'',
			tableData:[]
		}
	},
	methods:{
		
		},
}
</script>

<style>

</style>
