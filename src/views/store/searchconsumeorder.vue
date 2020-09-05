<template>
	<div class="main-box">
		<div class="zh-head">消费订单 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">订单号 <div class="search-input">  
				<el-input placeholder="请输入订单号" type="text" maxlength="20"
				 prefix-icon="el-icon-search" v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" 
				prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="getMailingOrder">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
				 <el-table-column type="expand">
				   <template slot-scope="props">
					   <el-form label-position="left" inline class="demo-table-expand" label-width="auto">
							 <el-form-item label="交易平台编号">
							   <span>{{ props.row.orderPtNum }}</span>
							 </el-form-item>
							 <el-form-item label="商品列表" v-for="item in  props.row.orderList">
							   <span>名称：{{ item.goodsName}};  成交价：{{item.goodsCj}};  挂牌价：{{item.goodsGp}};  数量：{{item.goodsNum}}</span>
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
			  <!--  <el-table-column
			      prop="orderJyNum"
			      label="交易编号"
			      >
			    </el-table-column> -->
			    <el-table-column
			      prop="userName"
			      label="姓名">	 
			    </el-table-column>
				<el-table-column
				  prop="phone"
				  label="手机号">
				</el-table-column>

				<el-table-column
				  prop="totalTransactionPrice"
				  label="成交价">
				</el-table-column>
				<el-table-column
				  prop="orderStatus"
				  label="支付状态">
				   <template slot-scope="scope">
					<div class="order-status success">授权中</div>
					</template>
				</el-table-column>
				<el-table-column
				  prop="passageWayName"
				  label="交易类型">
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
					 {{payBank}}-{{payNo}}
				  </template>
				</el-table-column>
			  </el-table>
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
			stateCode:'',
			userLevel:'',
			size:20,
			totalSize:'',
			currentPage:0,
			totalPage:'',
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
					this.getMailingOrder();
			}
		},
		nextFn:function(){
			if(this.currentPage==this.totalPage){
				this.currentPage=this.totalPage;
			}else if(this.currentPage<this.totalPage){
					this.currentPage++;
					this.getMailingOrder();
			}
		},
		getMailingOrder:function(){
			this.http.post(this.api.getMailingOrder,
			{
				orderNo:this.orderNo,
				phone:this.phone,
				stateCode:this.stateCode,
				userLevel:this.userLevel,
				orderType:"CONSUMPTION_ZONE",
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
