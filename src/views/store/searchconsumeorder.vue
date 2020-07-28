<template>
	<div class="main-box">
		<div class="zh-head">消费订单 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">订单号 <div class="search-input">  
				<el-input placeholder="请输入订单号" type="text" maxlength="20" prefix-icon="el-icon-search" v-model="orderNum"></el-input></div> </div>
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="orderTel"></el-input></div> </div>
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
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
							 <el-form-item label="商品列表" v-for="item in  props.row.goodsList">
							   <span>名称：{{ item.goodsName}};  成交价：{{item.goodsCj}};  挂牌价：{{item.goodsGp}};  数量：{{item.goodsNum}}</span>
							 </el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column
				  prop="orderDate"
				  label="订单时间" >
				</el-table-column>
			    <el-table-column
			      prop="orderNum"
			      label="订单编号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="orderJyNum"
			      label="交易编号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="orderName"
			      label="姓名">	 
			    </el-table-column>
				<el-table-column
				  prop="orderTel"
				  label="手机号">
				</el-table-column>

				<el-table-column
				  prop="orderCj"
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
				  prop="orderClass"
				  label="交易类型">
				</el-table-column>
				<el-table-column
				  prop="feilv"
				  label="费率">
				</el-table-column>
				<el-table-column
				  prop="shouxvfei"
				  label="手续费">
				</el-table-column>
				<el-table-column
				  prop="credit.num"
				  label="交易卡">
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
			tableData:[
				{
					orderNum:'12312321231213',
					orderJyNum:'12312312312312',
					orderDate:'2020-01-12 23:32:22',
					orderName:'王',
					orderTel:'13087897889',
					orderPtNum:'22231',
					goodsList:[
						{
							goodsName:'销卡',
							goodsCj:'100.00',
							goodsGp:'120.00',
							goodsNum:'12',
							goodsPic:''
						}
					],
					orderCj:'2230.00',
					orderGp:'2431.00',
					orderJs:'2130.00',
					orderStatus:'成功',
					orderClass:'NP消费',
					feilv:'2.05%',
					shouxvfei:'1',
					credit:{
						num:'21312312312312321312',
						bankingName:'中国银行'
					}
					
				}
			]
		}
	},
	methods:{
		
	}
}
</script>

<style>

 /* 	.seach-box{
		padding: 20px;
		width: 100%;
		display: flex;
		flex-wrap:wrap;
	} */
/*	.search-input{
		display: inline-block;
		margin-left: 8px;
		width: 200px;
	}
	.seach-item{
		padding-top: 1px;
		margin-right: 6px;
	}
	.sign-waring{
		background-color: #eeeeee;
		border-left:4px solid #00aaff;
		padding-left: 10px;
		margin-bottom: 20px;
	} */
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
