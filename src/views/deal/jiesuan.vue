<template>
	<div class="main-box">
		<div class="zh-head">结算信息</div>
		<div class="zh-info-box">
			<div class="seach-box">
			
				<div class="seach-item">交易单号 <div class="search-input">
				<el-input placeholder="请输入交易单号" type="tel" size="small"  v-model="orderNo"></el-input></div> </div>
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
				<div class="jiaoyi-box">
					<div>交易时间：<b>{{tableData.settlementOrderTime}}</b></div>
					<div>姓名：<b>{{tableData.userName}}{{tableData.phone}}</b></div>
					<div>总金额：<b>{{tableData.totalTransactionPrice}}</b></div>
					<div>刷卡费率：<b>{{tableData.rate}}</b></div>
					<div>手续费：<b>{{tableData.fee}}</b></div>
					<div>交易订单号：<b>{{tableData.orderNo}}</b></div>
					<div>支付通道：<b>{{tableData.passageWayName}}</b></div>
					<div>支付卡：<b>{{tableData.payBank}}{{tableData.payNo}}</b></div>
					<div>到账卡：<b>{{tableData.receiveBank}}{{tableData.payNo}}</b></div>
					<div>商户名：<b>{{tableData.merchName}}</b></div>
					<div>商户订单编号：<b>{{tableData.merchId}}</b></div>
					<div>描述：<b>{{tableData.name}}</b></div>
					<div>订单状态：<b>{{tableData.queryResultMsg}}</b></div>
					<div>结算状态：<b>{{tableData.settlementResultMsg}}</b></div>
				</div>
			</div>
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
		 tableData: '',
				
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
						  this.tableData=res.data;
						
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
