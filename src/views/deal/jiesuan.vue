<template>
	<div class="main-box">
		<div class="zh-head">结算信息</div>
		<div class="zh-info-box">
			<div class="seach-box">
			
				<div class="seach-item">交易单号 <div class="search-input">
				<el-input placeholder="请输入交易单号" type="tel" maxlength="11" size="small"  v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">交易类型 <div class="search-input">  
					<el-select v-model="orderType" placeholder="请选择" size="small"  :popper-append-to-body="false">
						<el-option
						  v-for="item in dealsClass"
						  :key="item.orderNum"
						  :label="item.orderName"
						  :value="item.orderType">
						</el-option>
					  </el-select></div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small" @click="transactionInquiry">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
					<el-table-column prop="orderNo" label="订单编号">
					</el-table-column>
				    <el-table-column prop="settlementOrderTime" label="交易日期" > </el-table-column>
				    <el-table-column prop="userName" label="姓名/手机号">
						<template slot-scope="scope">
							<div>{{scope.row.userName}}</div>
							<div>{{scope.row.phone | telFilter}}</div>
						</template>	
					</el-table-column>
					<el-table-column prop="totalTransactionPrice" label="支付金额"> </el-table-column>
					<el-table-column prop="rate" label="费率"> </el-table-column>
					<el-table-column prop="fee" label="手续费"> </el-table-column>
					
					<el-table-column prop="payNo" label="支付卡">
						<template slot-scope="scope">
							<div>{{scope.row.payBank}}</div>
							<div>{{scope.row.payNo | cardNumFilter}}</div>
						</template>	
					</el-table-column>
					
					<el-table-column prop="merchName" label="商户名">
						<template slot-scope="scope">
							<div>{{scope.row.merchName}}</div>
							<div>{{scope.row.merchId}}</div>
						</template>	
					</el-table-column>
				  </el-table>
				  <el-table-column prop="settlementOrderAmount" label="结算金额"> </el-table-column>
				  <el-table-column prop="payNo" label="结算卡">
				  	<!-- <template slot-scope="scope">
				  		<div>{{scope.row.payNo}}</div>
				  		<div>{{scope.row.payNo | cardNumFilter}}</div>
				  	</template>	 -->
				  </el-table-column>
				  <el-table-column prop="queryResultMsg" label="订单状态"> </el-table-column>
				  <el-table-column prop="settlementResultMsg" label="结算状态"> </el-table-column>
			</div>
		
			
			<!-- 分页 -->
			<el-pagination
			   layout="prev, pager, next"
			   :total="totalSize"
			   :page-size="size"
			    :current-page.sync="currentPage"
			   @current-change="transactionInquiry"
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
			orderNo:'',
			orderType:'',
			currentPage:0,
			totalSize:0,
			totalpPage:0,
			page:0,
			size:0,
			dealsClass:[
			{
				orderType:'MEMBER_PLUS',
				orderName:'会员PLUS',
				orderNum:'1'
			},
			{
				orderType:'EXPRESS_PAYMENT',
				orderName:'快捷支付',
				orderNum:'2'
			},
			{
				orderType:'CARD_COUPON_SPACE',
				orderName:'卡券空间',
				orderNum:'3'
			},
				{
				orderType:'CONSUMPTION_ZONE',
				orderName:'消费专区',
				orderNum:'4'
			},
			{
				orderType:'CUSTOM_ORDER',
				orderName:'扫码支付',
				orderNum:'5'
			},
			{
				orderType:'',
				orderName:'全部',
				orderNum:'6'
			},
			],
		 tableData: [],
				
		}
	},
	beforeMount(){
	},
	methods:{
		prevFn:function(){
			if(this.currentPage==1){
				this.currentPage=1;
			}else if(this.currentPage>1){
					this.currentPage--;
			}
		},
		nextFn:function(){
			if(this.currentPage==this.totalPage){
				this.currentPage=this.totalPage;
			}else if(this.currentPage<this.totalPage){
					this.currentPage++;
			}
		},
		// 查询结算信息
		transactionInquiry:function(){
			this.http.post(this.api.queryOrderSettlement,
			{
				orderNo:this.orderNo,
				orderType:this.orderType,
			},
			sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData[0]=res.data;
						
			          }
			       });
		}
	},
	filters:{
		cardNumFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
		telFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		}
	}
}
</script>

<style>
	  .jiaoyi-box{
		  line-height: 2em;
		  margin-top: -40px;
	  }
	  .user-box{
		 margin-top: -40px; 
	  }
</style>
