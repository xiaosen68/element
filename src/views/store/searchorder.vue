<template>
	<div class="main-box">
		<div class="zh-head">购买订单 </div>
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
				  prop="orderJs"
				  label="寄售垫付">
				</el-table-column>
				<el-table-column
				  prop="orderStatus"
				  label="支付状态">
				   <template slot-scope="scope">
					<div class="order-status success">授权中</div>
					</template>
				</el-table-column>
				<el-table-column
				  prop="orderStatus"
				  label="调单截图">
				   <template slot-scope="scope">
					<el-button type="success" plain size="mini" @click="dialogFn(scope.row)">详情</el-button>
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
					<div class="jt-status-title">王操马汉大酒店王操马汉大酒店王操马汉大酒店</div>
					<div class="jt-status-money">￥ <span style="color: #ff5500;">12.00</span> </div>
				</div>
				<div class="jt-status1">
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易金额</div>
						<div class="jt-status-item-status">12.00元</div>
					</div>
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
						<div class="jt-status-item-status">1231231231122312312423</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">商户号</div>
						<div class="jt-status-item-status">4321312312123123123223</div>
					</div>
				</div>
				<div class="js-status2">
					<div class="jt-status2-item">
						<span class="status-span">联系商户</span>
						<i class="el-icon-arrow-right status2-right"></i>
					</div>
					<div class="jt-status2-item">
						<span class="status-span">评价</span>
						<span class=" status2-right">未评价</span>
					</div>
					<div class="jt-status2-item">
						<span class="status-span">更多</span>
						<i class="el-icon-arrow-right status2-right"></i>
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
			//显示当前日期
			if(new Date().getHours()<10){
				if(new Date().getMinutes()<10){
					this.jtTime='0'+new Date().getHours()+':0'+new Date().getMinutes();
				}else{
					this.jtTime='0'+new Date().getHours()+':'+new Date().getMinutes();
				}
			}else{
				if(new Date().getMinutes()<10){
					this.jtTime=new Date().getHours()+':0'+new Date().getMinutes();
				}else{
					this.jtTime=new Date().getHours()+':'+new Date().getMinutes();
				}
			}
			
		},
		jtClose:function(){
			// 清除当前截图信息
			this.imgUrl='';
		},
		// 单击保存图片
		saveImg:function(){
			html2canvas(document.getElementById('jtbox'),{
				dpi: window.devicePixelRatio*4,
				scale: 4,
				width:document.getElementById('jtbox').offsetWidth,
				height:document.getElementById('jtbox').offsetHeight,
				useCORS:true
			}).then(canvas =>{
				let dataURL = canvas.toDataURL("image/jpeg");
				this.imgUrl = dataURL;
				
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
			width: 70px;
		}
		.jt-status-item-status{
			display: inline-block;
			color: #2d2d2d;
			/* width: 220px; */
			/* text-align: right; */
		}
		.jt-status-item{
			font-size: 12px;
			padding: 8px 0;
		}
		.jt-status-title{
			text-align: center;
			font-size: 14px;
			width: 200px;
			margin: 0 auto;
			/* font-weight: 600; */
			padding-top: 20px;
		}
		.jt-status-money{
			text-align: center;
			padding-top: 8px;
			padding-bottom: 14px;
			font-size: 18px;
			font-weight: 600;
			color: #202020;
		}
		.status2-right{
			float: right;
		}
		.jt-status2-item{
			font-size: 10px;
			padding: 8px 0px;
		}
		.jt-status{
			margin: 0 20px;
			border-bottom: 1px solid #dbdbdb;
		}
		.jt-status1{
			margin: 10px 20px;
			/* height: 200px; */
			padding: 10px 20px;
			border-radius: 10px;
			background-color: #ffffff;
		}
		.js-status2{
			margin: 0 20px;
			/* height: 100px; */
			padding: 10px 20px;
			border-radius: 10px;
			background-color: #ffffff;
		}
		.jt-close{
			float: left;
		}
		.jt-title{
			padding-top: 2px;
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
			padding: 6px 14px 8px 14px;
			background-color: #e6e6e6;
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
		/* background-color: #f8f8f8; */
		background-color: #f4f4f4;
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
