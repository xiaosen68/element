<template>
	<div class="main-box">
		<div class="zh-head">VIP变更查询 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">更改人手机号 
					<div class="search-input"><el-input placeholder="请输入内容" 
					type="tel" maxlength="11"  v-model="changeUserPhone"></el-input></div> 
				</div>
				<div class="seach-item">被更改人手机号
					<div class="search-input"><el-input placeholder="请输入内容" 
					type="tel" maxlength="11"  v-model="adjustmentUserPhone"></el-input></div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="vipSearch">查询</el-button></div>
			</div>
			  <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="changeTime"
			      label="日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="adjustmentUserName"
			      label="被更改人姓名"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="adjustmentUserPhone"
			      label="被更改人手机号">
			    </el-table-column>
				<el-table-column
				  prop="changeBeforeLevel"
				  label="原等级">
				  <template slot-scope="scope">
					  {{scope.row.changeBeforeLevel|levelFilters}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="changeAfterLevel"
				  label="更改等级">
				  <template slot-scope="scope">
				  	{{scope.row.changeAfterLevel|levelFilters}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="changeUserName"
				  label="更改人姓名">
				</el-table-column>
				<el-table-column
				  prop="changeUserPhone"
				  label="更改人手机号">
				</el-table-column>
				
			  </el-table>
			  <!-- 主页面分页 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			      :current-page.sync="currentPage"
			     @current-change="vipSearch"
			     @prev-click="prevFn"
			     @next-click="nextFn"
			     >
			   </el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			adjustmentUserPhone:'',
			changeUserPhone:'',
			tableData:[
			],
			currentPage:1,
			size:4,
			totalPage:0,
			totalSize:0,
		}
	},
	beforeMount() {
		this.vipSearch()
	},
	methods:{
		prevFn(){
			if( this.currentPage>0){
				this.currentPage--;
			}
		},
		nextFn(){
			if(this.currentPage<this.totalPage){
				this.currentPage++;
			}	
		},
		vipSearch:function(){
			this.http.post(this.api.vipChangeUserLevelList,
			{ 	
				page:this.currentPage,
				size:this.size,
				adjustmentUserPhone :this.adjustmentUserPhone,
				changeUserPhone :this.changeUserPhone,
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list;
						  this.totalSize=res.data.total_size;
						  this.currentPage=res.data.current_page;
						  console.log( this.tableData)
			          }
			       });
		}
		
	},
	filters:{
		levelFilters:function(val){
			if(val==='ORDINARY_USERS'){
				return "普通会员"
			}else if(val==='MEMBERS'){
				return "会员"
			}else if(val==='VIP_MEMBERS'){
				return "VIP会员"
			}else if(val==='BUSINESS_PARTER'){
				return "业务合伙人"
			}else if(val==='SENIOR_PARTNER'){
				return "高级合伙人"
			}else if(val==='CO_FOUNDER'){
				return "联合创始人"
			}
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
