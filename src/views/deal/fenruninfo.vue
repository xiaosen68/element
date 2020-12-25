<template>
	<div class="main-box">
		<div class="zh-head">用户分润明细</div>
		<div class="zh-info-box" >
			<div class="seach-box">
				<div class="seach-item">下单手机号 <div class="search-input">
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small" 
				 v-model="orderUserPhone"></el-input></div> </div>
				<div class="seach-item">收益人手机号 <div class="search-input">
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small" 
				 v-model="relUserPhone"></el-input></div> </div>
				<div class="seach-item">交易流水号 <div class="search-input">
				<el-input placeholder="请输入交易流水号" type="text" maxlength="20" size="small"  v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">日期
					<div class="search-input seach-date">
						  <el-date-picker
							value-format='yyyy-MM-dd'
						      v-model="selectDate"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
							  :picker-options='pickerOption'
							  >
						    </el-date-picker>
					</div> 
				</div>
				
				<div class="seach-item"><el-button type="primary"  size="small " @click="getUserRevelPage">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
				
			</div>
			<!-- 交易汇总表 -->
			<div>
				 <el-table
				    :data="tableData"
				    stripe
					size="small"
				    style="width: 100%">
				    <el-table-column
				      prop="revenueTime"
				      label="交易时间" >
				    </el-table-column>
				    <el-table-column
				      prop="orderUserRealName"
				      label="刷卡人">
					  <template slot-scope="scope">
						  <p>{{scope.row.orderUserRealName}}</p>
						  <p>{{scope.row.orderUserPhone}}</p>
					  </template>
				    </el-table-column>
				    <el-table-column
				      prop="revenueOrder"
				      label="交易流水号" >
				    </el-table-column>
					<el-table-column
					  prop="revenueAmount"
					  label="分润">
					</el-table-column>
				<!-- 	<el-table-column
					  prop="dealMoney"
					  label="交易金额">
					</el-table-column> -->
					<!-- <el-table-column
					  prop="dealFeilv"
					  label="交易费率">
					</el-table-column> -->
					<el-table-column
					  prop="relUserRealName"
					  label="受益人">
					  <template slot-scope="scope">
						  <p>{{scope.row.relUserRealName}}</p>
						  <p>{{scope.row.relUserPhone }}</p>
					  </template>
					</el-table-column>
					<!-- <el-table-column
					  prop="superiorFeilv"
					  label="费率">
					</el-table-column> -->
					<el-table-column
					  prop="revenueAmount"
					  label="获得分润">
					</el-table-column>
					<el-table-column
					  prop="revenueReason"
					  label="分润备注">
					</el-table-column>
					<el-table-column
					  prop="revenueState"
					  label="分润备注">
					  <template slot-scope="scope">
					  		{{scope.row.revenueState|revenueStateFilter}}	
					</el-table-column>
				  </el-table>
				 <!-- 主页面分页 -->
				 <el-pagination
				    layout="prev, pager, next"
				    :total="totalSize"
				    :page-size="size"
				     :current-page.sync="currentPage"
				    @current-change="getUserRevelPage"
				    @prev-click="prevFn"
				    @next-click="nextFn"
				    >
				  </el-pagination>
			</div>
		
			
		</div>
		
	</div>
</template>

<script>

export default {
	data (){
		return {
			orderUserPhone:'',//手机号
			relUserPhone:'',//受益人手机号
			page:1,
			size:20,
			currentPage:0,
			totalPage:0,
			totalSize:0,
			orderNo:'',//交易流水号
			selectDate:[],//日期范围
			pickerOption:{//日期选择器配置
				disabledDate:function(newDate){
					if(Date.parse(newDate)>Date.parse(new Date())){
						return true
					}else{
						return false
					}
				}
			},
			dealClass:'',
			dealStatus:'',
			dealsClass:[
				{
				value:'1',
				label:'全部'
				},
				{
				value:'2',
				label:'NP交易'
				},
				{
				value:'3',
				label:'小额快捷'
				},
			],
			dealsStatus:[
				{
				value:'1',
				label:'交易已成功'
				},
				{
				value:'2',
				label:'交易待处理'
				},
				{
				value:'3',
				label:'交易失败'
				},
				{
				value:'4',
				label:'交易待结算'
				}
			],
			tableData:[]
		 }
	},
	beforeMount() {
	this.getUserRevelPage();	
	},
	methods:{
		prevFn:function(){
			if(this.currentPage>1){
				this.currentPage--;
			}
		},
		nextFn:function(){
			if(this.currentPage<this.totalPage){
				this.currentPage++
			}
		},
		beizhuFn:function(item){
			console.log(item)
		},
		// 分润信息查询
		getUserRevelPage:function(){
			this.http.post(this.api.getUserRevelPage,
			{
				 page:this.currentPage,
				size:this.size,
				orderUserPhone:this.orderUserPhone,
				relUserPhone:this.relUserPhone,
				startTime:this.selectDate[0],
				endTime:this.selectDate[1],
				orderNo:this.orderNo
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
			          }
			       });
		},
	},
	filters:{
		cardNumFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
		telFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
		revenueStateFilter:function(value){
			if(value=='NO_WITHDRAWAL'){
				return value
			}else if(value=='UNABLE_TO_WITHDRAW_CASH'){
				return value
			}
			
		}
	},
	
}
</script>

<style>
	.popover-head-box{
		line-height: 2em;
		font-size: 14px;
		font-weight: 600;
		width: 100%;
	}
	.popover-header-status{
		line-height: 2em;
		border-left: 4px solid #00AAFF;
		padding-left: 10px;
		margin-top: 6px;
		background-color: #f5f5f5;
		width: 100%;
	}
</style>
