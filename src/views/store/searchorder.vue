<template>
	<div class="main-box">
		<div class="zh-head">购买订单 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">订单号 <div class="search-input">  
				<el-input placeholder="请输入订单号" type="text" maxlength="20"
				 v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" 
				 v-model="phone"></el-input></div> </div>
				<div class="seach-item">寄售订单 <div class="search-input">
					<el-select v-model="orderType" placeholder="请选择" :popper-append-to-body="false">
						<el-option
						  v-for="item in orderOp"
						  :key="item.value"
						  :label="item.orderName"
						  :value="item.orderType">
						</el-option>
					  </el-select></div>
					  </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="getMailingOrder">查询</el-button></div>
				<!-- <div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div> -->
			</div>
			<div class="hyinfo-box">
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
							   <span>名称：{{ item.productName}};  成交价：{{item.transactionPrice}};  挂牌价：{{item.mailingPrice}};  数量：{{item.payamount}}</span>
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
				  prop="totalTransactionPrice"
				  label="寄售垫付">
				</el-table-column>
				<!-- <el-table-column
				  prop="orderStatus"
				  label="支付状态">
				   <template slot-scope="scope">
					<div class="order-status success">授权中</div>
					</template>
				</el-table-column> -->
				<el-table-column
				  prop="orderStatus"
				  label="调单截图">
				   <template slot-scope="scope">
					<el-button type="success" plain size="mini" @click="dialogFn(scope.row)">详情</el-button>
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
				  prop="payBank"
				  label="交易卡">
				  <template slot-scope="scope">
					  {{scope.row.payBank}}{{scope.row.payNo}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="receiveBank"
				  label="结算卡">
				  <template slot-scope="scope">
					  {{scope.row.receiveBank}}{{scope.row.receiveNo}}
				  </template>
				</el-table-column>
			  </el-table>
			 </div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="380px"
		  @closed="jtClose"
		  >
			<div class="jt-box" id="jtbox">
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
					<div class="jt-status-title">{{diaodan.merchName}}</div>
					<!-- <input class="jt-status-title" v-model="diaodan.merchName"> -->
					<div class="jt-status-money">￥ <span style="color: #ff5500;">{{diaodan.totalTransactionPrice}}</span> </div>
				</div>
				<div class="jt-status1">
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易金额</div>
						<div class="jt-status-item-status">{{diaodan.totalTransactionPrice}}元</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付状态</div>
						<div class="jt-status-item-status">支付成功</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付时间</div>
						<div class="jt-status-item-status">{{diaodan.orderTime}}</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">支付方式</div>
						<div class="jt-status-item-status">{{diaodan.payBank}}信用卡{{diaodan.payNo|bankFilters}}</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易类型</div>
						<div class="jt-status-item-status">订单充值</div>
					</div>
					
					<div class="jt-status-item">
						<div class="jt-status-item-title">交易单号</div>
						<div class="jt-status-item-status">{{diaodan.orderNo}}</div>
					</div>
					<div class="jt-status-item">
						<div class="jt-status-item-title">商户号</div>
						<!-- <input class="jt-status-item-status " v-model="diaodan.merchId"> -->
						<div class="jt-status-item-status">{{diaodan.merchId}}</div>
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
</template>

<script>
import html2canvas from "html2canvas"
export default {
	data (){
		return {
			dialogVisible:false,
			imgUrl:'',
			jtTime:'',
			tableData:[
			],
			tableData:[],
			orderNo:'',
			phone:'',
			stateCode:'',
			userLevel:'',
			size:20,
			totalSize:0,
			currentPage:1,
			totalPage:0,
			orderType:'',
			orderOp:[
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
					orderType:'',
					orderName:'全部',
					orderNum:'6'
				},
			],
			diaodan:{
				payNo:902131203,
			},
		}
	},
	beforeMount() {
		this.getMailingOrder()
	},
	methods:{
		prevFn:function(){
			if(this.currentPage>1){
					this.currentPage--;
			}
		},
		nextFn:function(){
			if(this.currentPage<this.totalPage){
					this.currentPage++;
			}
		},
		// 获取列表
		getMailingOrder:function(){
			this.http.post(this.api.getMailingOrder,
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
		dialogFn:function(item){
			
			console.log(item)
			this.diaodan=item;
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
	},filters:{
		bankFilters:function(val){
			return val.toString().substring(val.length-4)
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
			border: none;
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
