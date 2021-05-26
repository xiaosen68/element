<template>
	<div class="main-box">
		<div class="zh-head">消费订单 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">订单号<div class="search-input">  
				<el-input placeholder="请输入订单号" type="text" maxlength="20"
				 v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">手机号<div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" 
				 v-model="phone"></el-input></div> </div>
				 <div class="seach-item">上级手机号<div class="search-input">
				 <el-input placeholder="请输入上级手机号" type="tel" maxlength="11" 
				  v-model="superOrderUserPhone"></el-input></div> </div>
				  <div class="seach-item">商家手机号<div class="search-input">
				  <el-input placeholder="请输入上级手机号" type="tel" maxlength="11" 
				   v-model="store"></el-input></div> </div>
				<div class="seach-item">销售订单 <div class="search-input">
					<el-select v-model="orderType" placeholder="请选择" :popper-append-to-body="false">
						<el-option
						  v-for="item in orderOp"
						  :key="item.value"
						  :label="item.orderName"
						  :value="item.orderType">
						</el-option>
					  </el-select></div>
				</div>
				<div class="seach-item">日期
					<div class="search-input">
						<el-date-picker style="width: 140px;"
						  v-model="orderDate"
						  type="date"
						  placeholder="选择日期"
						  size="small" 
						  value-format="yyyy-MM-dd">
						</el-date-picker>
					</div> 
				</div>	  
				<div class="seach-item"><el-button type="primary"  size="small " @click="getMailingOrder">查询</el-button></div>
				<div class="seach-item">
					<el-button type="warning"  size="small " 
					icon="el-icon-download" @click="excelGeneralOrder">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
				 <el-table-column type="expand">
				   <template slot-scope="props">
					   <el-form label-position="left" inline class="demo-table-expand" label-width="auto" v-if="scope.row.orderType='CONSUMPTION_ZONE'" >
							 <el-form-item v-for="(item, index) in  props.row.orderList" :key="index">
							   <span>名称：{{ item.productName}};  团购价：{{item.transactionPrice*item.discount}};  单价：{{item.transactionPrice}};  数量：{{item.payamount}}</span>
							 </el-form-item>
							 <el-form-item v-if="props.row.region" >
							   <span>收获地址：{{props.row.region}}{{props.row.addressDetails}}</span>
							 </el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column
				  prop="orderTime"
				  label="订单时间" >
				</el-table-column>
			    <el-table-column
			      prop="orderNo"
			      label="订单编号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="userName"
			      label="姓名">	 
				  <template slot-scope="scope">
				  	{{scope.row.userName}}{{scope.row.phone}}
				  </template>
			    </el-table-column>
				
				<el-table-column
				  prop="merchId"
				  label="商户号">
				</el-table-column>
				<el-table-column
				  prop="store"
				  label="商户">
				  <template slot-scope="scope">
				  	{{scope.row.merchName}}{{scope.row.store}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="totalTransactionPrice"
				  label="成交价">
				</el-table-column>
				<el-table-column
				  prop="stateMsg"
				  label="支付状态">
				</el-table-column>
				<el-table-column
				  prop="orderType"
				  label="订单类型">
				  <template slot-scope="scope">
				  	{{scope.row.orderType|orderFilter}}
				  </template>
				</el-table-column>
			
				<el-table-column
				  prop="rate"
				  label="费率">
				</el-table-column>
				<el-table-column
				  prop="fee"
				  label="手续费">
				</el-table-column>
				<el-table-column
				  prop="credit.num"
				  label="交易卡">
				  <template slot-scope="scope">
					 {{scope.row.payBank}}-{{scope.row.payNo}}
				  </template>
				</el-table-column>
			  </el-table>
			  </div>
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			      :current-page.sync="currentPage"
			     @current-change="getMailingOrder"
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
			tableData:[],
			orderNo:'',
			phone:'',
			superOrderUserPhone:'',//上级手机号
			store:'',
			stateCode:'',
			userLevel:'',
			size:20,
			totalSize:0,
			currentPage:1,
			totalPage:0,
			orderType:'',
			orderDate:'',
			orderOp:[
				{
					orderType:'CONSUMPTION_ZONE',
					orderName:'消费专区',
					orderNum:'4'
				},
				{
					orderType:'CUSTOM_ORDER',
					orderName:'扫码消费',
					orderNum:'5'
				},
				{
					orderType:'',
					orderName:'全部',
					orderNum:'8'
				},
			],
		}
	},
	beforeMount() {
		this.getMailingOrder()
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
			if(this.currentPage<this.totalPage){
					this.currentPage++;
			}
		},
		getMailingOrder:function(){
			this.http.post(this.api.getGeneralOrder,
			{
				orderNo:this.orderNo,
				phone:this.phone,
				stateCode:this.stateCode,
				userLevel:this.userLevel,
				orderType:this.orderType,
				size:this.size,
				page:this.currentPage
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list;
						  this.totalPage=res.data.total_page;
						  this.currentPage=res.data.current_page;
						  this.totalSize=res.data.total_size;
			          }
			       });
		},
		// 导出消费列表
		excelGeneralOrder:function(){
			this.http.getexcel('消费列表',this.api.excelGeneralOrderOne,{
				phone:this.phone,
				superOrderUserPhone:this.superOrderUserPhone,
				store:this.store,
				orderTime:this.orderDate,
			},sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						 console.log(res)
			          }
			       })
		}
		
	},
	filters:{
		orderFilter:function(value){
			if(value==='CONSUMPTION_ZONE'){
				return '商城消费'
			}else if(value==='CUSTOM_ORDER'){
				return '扫码消费'
			}
		}
	}
}
</script>

<style>

	.order-status{
		width: 60px;
		height: 30px;
		line-height: 30px;
		border-radius: 30px;
		color: #FFFFFF;
		text-align: center;
	}
	.success{
		background-color: #00AAFF;
	}
	.fail{
	background-color: #ff0000;	
	}
	.shouing{
	background-color: #ffaa00;		
	}
	
</style>
