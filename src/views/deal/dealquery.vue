<template>
	<div class="main-box">
		<div class="zh-head">交易信息</div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small"  v-model="phone"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
				<el-input placeholder="请输入姓名" type="text" maxlength="5" size="small"  v-model="realName"></el-input></div> </div>
				
				<div class="seach-item">交易单号 <div class="search-input">
				<el-input placeholder="请输入交易单号" type="tel" size="small"  v-model="orderNo"></el-input></div> </div>
				<div class="seach-item">信用卡号 <div class="search-input">
				<el-input placeholder="请输入信用卡号" type="tel" size="small"  v-model="payNo"></el-input></div> </div>
				
				<div class="seach-item">交易类型 <div class="search-input">  
					<el-select v-model="tranType" placeholder="请选择" size="small"  :popper-append-to-body="false">
						<el-option
						  v-for="item in dealsClass"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select></div> 
				</div>
				<div class="seach-item">交易状态 
					<div class="search-input">
						<el-select v-model="orderState" placeholder="请选择" size="small"  :popper-append-to-body="false">
							<el-option
							  v-for="item in dealsStatus"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
					</div> 
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
				
				<div class="seach-item"><el-button type="primary"  size="small" @click="transactionInquiry">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 交易总笔数: <b class="font-fei">{{tranNum}}</b>,交易总金额:<b class="font-fei">{{totalTransactionPrice}}</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
				    <el-table-column prop="createTime" label="交易日期" width="120"> </el-table-column>
				    <el-table-column prop="realName" label="姓名/手机号" width="180">
						<template slot-scope="scope">
							<div>{{scope.row.realName}}</div>
							<div>{{scope.row.phone}}</div>
						</template>	
					</el-table-column>
				    <el-table-column prop="phone" label="用户信息">
						<template slot-scope="scope">
							  <el-button size="mini"  plain type="primary" @click="showUserInfo(scope.row)">用户信息</el-button>
						</template>	
					</el-table-column>
					<el-table-column prop="totalTransactionPrice" label="总金额"> </el-table-column>
					<el-table-column prop="rate" label="刷卡费率"> </el-table-column>
				<!-- 	<el-table-column prop="" label="实际金额"> </el-table-column> -->
					<el-table-column prop="orderNo" label="订单编号"> 
						<template slot-scope="scope">
							<div>{{scope.row.orderNo}}</div>
							<el-button size="small" type="text" @click="jiaoyiShow(scope.row)">查看详情</el-button>
						</template>	
					</el-table-column>
					<el-table-column prop="payNo" label="交易卡">
						<template slot-scope="scope">
							<div>{{scope.row.payBank}}</div>
							<!-- <div>{{scope.row.payNo | cardNumFilter}}</div> -->
							<div>{{scope.row.payNo}}</div>
						</template>	
					</el-table-column>
					<el-table-column prop="receiveNo" label="结算卡">
						<template slot-scope="scope">
							<div>{{scope.row.receiveBank}}</div>
							<!-- <div>{{scope.row.receiveNo | cardNumFilter}}</div> -->
							<div>{{scope.row.receiveNo}}</div>
						</template>	
					</el-table-column>
					<el-table-column prop="store" label="结算商户">
						<template slot-scope="scope">
							<div>{{scope.row.merchName}}</div>
							<!-- <div>{{scope.row.store | telFilter}}</div> -->
							<div>{{scope.row.store}}</div>
						</template>	
					</el-table-column>
					<el-table-column prop="tongdao" label="通道/状态">
						<template slot-scope="scope">
							<div>{{scope.row.passageWayName}}</div>
							<!-- <div style="color: #67C23A;fontSize:12px" v-if="scope.row.status==='1'"><i class="el-icon-success" ></i>已成功</div>
							<div style="color: #E6A23C;fontSize:12px" v-else-if="scope.row.status==='2'"><i class="el-icon-warning" ></i>待处理</div>
							<div style="color: #F56C6C;fontSize:12px" v-else-if="scope.row.status==='3'"><i class="el-icon-error" ></i>已失败</div>
							<div style="color: #909399;fontSize:12px" v-else-if="scope.row.status==='4'"><i class="el-icon-info" ></i>待结算</div> -->
						</template>	
					</el-table-column>
					<el-table-column prop="orderType" label="类型">
						<template slot-scope="scope">
							<div>{{scope.row.orderType|orderTypeFile}}</div>
						</template>	
					</el-table-column>
				  </el-table>
			</div>
			<!-- 用户信息 -->
			<el-dialog  title="用户信息" :visible.sync="userInfoPopo"  width="60%" >
				<div class="user-box">
					<div>姓名：<b>{{userInfo.realName}}</b></div>
					<div>手机号：<b>{{userInfo.phone}}</b></div>
					<div>等级：<b>{{userInfo.userLevelName}}</b></div>
					<!-- <div>身份证号：<b>{{userInfo.rnsMap.idNumber}}</b></div>
					<div>银行卡号：<b>{{userInfo.payNo}}</b></div>
					<div v-if="userInfo.rnsMap">用户上传照片：
						<el-image  style="width: 120px; height: 100px; margin-left: 20px; "  :src="userInfo.rnsMap.frontPhotoOfIdCard" > </el-image>
						<el-image  style="width: 120px; height: 100px; margin-left: 20px; "  :src="userInfo.rnsMap.reversePhotoOfIdCard" > </el-image>
						<el-image  style="width: 120px; height: 100px; margin-left: 20px; "  :src="userInfo.rnsMap.holdingIdCard" > </el-image>
					</div> -->
				</div>
			</el-dialog>
			<!-- 交易信息 -->
			<el-dialog  title="用户信息" :visible.sync="jiaoyiInfoPopo"  width="60%" >
				<div class="jiaoyi-box">
					<div>交易时间：<b>{{jiaoInfo.createTime}}</b></div>
					<div>姓名：<b>{{jiaoInfo.realName}}</b></div>
					<div>总金额：<b>{{jiaoInfo.totalTransactionPrice}}</b></div>
					<div>刷卡费率：<b>{{jiaoInfo.rate}}</b></div>
					<div>手续费：<b>{{jiaoInfo.fee}}</b></div>
					<div>交易订单号：<b>{{jiaoInfo.orderNo}}</b></div>
					<div>支付通道：<b>{{jiaoInfo.passageWayName}}</b></div>
					<div>支付卡：<b>{{jiaoInfo.payBank}}{{jiaoInfo.payNo}}</b></div>
					<div>到账卡：<b>{{jiaoInfo.receiveBank}}{{jiaoInfo.receiveNo}}</b></div>
					<div>商户名：<b>{{jiaoInfo.merchName}}{{jiaoInfo.store}}</b></div>
					<div>商户订单编号：<b>{{jiaoInfo.merchId}}</b></div>
					<div>类型：<b>{{jiaoInfo.orderType|orderTypeFile}}</b></div>
				</div>
			</el-dialog>
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
			userInfoPopo:false,//用户信息弹框
			userInfo:{
				},
			jiaoInfo:{},
			jiaoyiInfoPopo:false,//交易详情信息弹框
			phone:'',
			realName:'',
			orderNo:'',
			currentPage:1,
			totalSize:0,
			totalpPage:0,
			totalTransactionPrice:0,
			tranNum:0,
			tranType:'',
			orderState:'',
			orderDate:'',
			payNo:'',
			page:0,
			size:20,
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
		 tableData: [],
				
		}
	},
	beforeMount(){
		this.transactionInquiry();
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
		beizhuFn:function(item){
			console.log(item)
		},
		// 查询详情
		showUserInfo:function(item){
			this.http.post(this.api.pageAccountList,
			{
				 page:1,
				size:1,
				phone:item.phone,
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.userInfo=res.data.list[0]; 
			          }
			       });
			this.userInfoPopo=true;
		},
		// 查询会员
		
		jiaoyiShow:function(item){
			this.jiaoInfo=item;
			this.jiaoyiInfoPopo=true;
		},
		// 查询交易信息
		transactionInquiry:function(){
			console.log(this.orderDate)
			this.http.post(this.api.transactionInquiry,
			{
				phone:this.phone,
				realName:this.realName,
				orderNo:this.orderNo,
				tranType:this.tranType,
				orderState:this.orderState,
				orderDate:this.orderDate,
				payNo:this.payNo,
				page:this.currentPage,
				size:this.size
			},
			sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list;
						  this.totalSize=res.data.total_size;
						  this.currentPage=res.data.current_page;
						 this.totalpPage=res.data.total_page;
						 this.totalTransactionPrice=res.data.totalTransactionPrice;
						 this.tranNum=res.data.tranNum
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
		},
		orderTypeFile:function(value){
			if(value=='MEMBER_PLUS'){
				return '会员PLUS'
			}else if(value=='EXPRESS_PAYMENT'){
				return '消费专区'
			}else if(value=='CONSUMPTION_ZONE'){
				return '快捷支付'
			}else if(value=='CARD_COUPON_SPACE'){
				return '卡券空间'
			}else if(value=='CUSTOM_ORDER'){
				return '扫码消费'
			}
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
