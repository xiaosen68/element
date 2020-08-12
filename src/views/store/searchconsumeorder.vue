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
				  prop="orderStatus"
				  label="支付状态">
				   <template slot-scope="scope">
					<el-button type="success" plain size="mini" @click="dialogFn(scope.row)">详情</el-button>
					</template>
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
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="380px"
		  @closed="jtClose"
		  >
			<div class="jt-box" id="jtbox" @click="saveImg">
				<div class="jt-header">
					<b class="jt-time">{{jtTime}}</b>
					<img class="jt-icon" src="../../assets/wi3.png" />
					<img class="jt-icon" src="../../assets/wi3.png" />
					<img class="jt-icon" src="../../assets/wi1.png" />
					<img class="jt-icon jt-icon-right" src="../../assets/wi2.png" />
					<img class="jt-icon jt-icon-right" src="../../assets/wi4.png" />
					<div class="jt-title">
						<b class="jt-close">X</b>
						<b>账单详情</b>
					</div>
				</div>
				<div class="jt-status">
					<div class="jt-status-title">hahah</div>
					<div class="jt-status-money">-12.00</div>
				</div>
				<div class="jt-status1">
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付状态</div>
						<div class="jt-status-item-status">支付成功</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付时间</div>
						<div class="jt-status-item-status">2020-08-01 10:27:32</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付方式</div>
						<div class="jt-status-item-status">民生银行信用卡(7868)</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易类型</div>
						<div class="jt-status-item-status">订单充值</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易单号</div>
						<div class="jt-status-item-status">12312312312343423</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">商户号</div>
						<div class="jt-status-item-status">43213123123221123</div>
					</div>
				</div>
			</div>
			<img :src="imgUrl" class="jt-image" @click="imgUrl=''" />
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveImg">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
import html2canvas from "html2canvas"
export default {
	data (){
		return {
			orderNum:'',
			orderTel:'',
			dialogVisible:false,
			imgUrl:'',
			jtTime:'',
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
		dialogFn:function(item){
			this.dialogVisible=true;
			this.jtTime=new Date().getHours()+':'+new Date().getMinutes();
		},
		jtClose:function(){
			this.imgUrl='';
		},
		saveImg:function(){
			html2canvas(document.getElementById('jtbox')).then(canvas =>{
				let dataURL = canvas.toDataURL("image/jpeg");
				this.imgUrl = dataURL;
				if(this.imgUrl !==""){
					console.log(this.imgUrl)
				}
			})
		}
	}
}
</script>

<style>
	.jt-image{
		position: absolute;
		top: 0;
		z-index: 20;
	}
	.jt-status-item-title{
		display: inline-block;
		width: 80px;
	}
	.jt-status-item-status{
		display: inline-block;
		color: #2d2d2d;
	}
	.jt-status-item{
		font-size: 12px;
		padding: 8px 0;
	}
	.jt-status-title{
		text-align: center;
		font-size: 18px;
		/* font-weight: 600; */
		padding-top: 20px;
	}
	.jt-status-money{
		text-align: center;
		padding-top: 2px;
		padding-bottom: 40px;
		font-size: 18px;
		font-weight: 600;
		color: #202020;
	}
	.jt-status{
		margin: 0 20px;
		border-bottom: 1px solid #dbdbdb;
	}
	.jt-status1{
		margin: 20px 20px;
	}
	.jt-close{
		float: left;
	}
	.jt-title{
		padding-top: 6px;
		text-align: center;
	}
	.jt-time{
		/* float: left; */
		font-size: 8px;
		padding-right: 2px;
		color: #515151;
		vertical-align: middle;
	}
	.jt-header{
		/* width: 100%; */
		/* height: 20px; */
		padding: 10px 14px 8px 14px;
		background-color: #D9D9D9;
	}
	.jt-icon-right{
		float: right;
	}
	.jt-icon{
		width: 20px;
		vertical-align: middle;
	}
.jt-box{
	width: 320px;
	height: 568px;
	/* padding: 10px 14px; */
	background-color: #f8f8f8;
}
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
