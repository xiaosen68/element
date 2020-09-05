<template>
	<div class="main-box">
		<div class="zh-head">会员信息 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入内容" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
				<el-input placeholder="请输入内容" type="text" maxlength="5"
				 prefix-icon="el-icon-search" v-model="userName"></el-input></div> </div>
				<div class="seach-item">实名状态 <div class="search-input">  
					<el-select v-model="realNameState" placeholder="请选择" :popper-append-to-body="false">
						<el-option
						  v-for="item in smOptions"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select></div> 
				</div>
				<div class="seach-item">等级 
					<div class="search-input">
						<el-select v-model="dengji" placeholder="请选择" :popper-append-to-body="false">
							<el-option
							  v-for="item in djOptions"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
					</div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="searchHyFn">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 平台注册人数: <b class="font-fei">{{registNum}}</b>,平台实名人数:<b class="font-fei">{{realNameNum}}</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
				    <el-table-column prop="createTime" label="注册日期" > </el-table-column>
				    <el-table-column prop="userName" label="姓名" ></el-table-column>
				    <el-table-column prop="phone" label="手机号" width="120"> </el-table-column>
					<el-table-column prop="houtaiNum" label="后台登录账号"> </el-table-column>
					<el-table-column prop="realNameState" label="实名状态"> 
						<template slot-scope="scope">
							<div class="shiming-status1" v-if="scope.row.realNameState==='PASS'">已实名</div>
							<div class="shiming-status1" v-if="scope.row.realNameState==='TO_BE_REVIEWED'">审核中</div>
							<div class="shiming-status1" v-if="scope.row.realNameState==='PAIL'">未通过</div>
							<div class="shiming-status2" v-if="scope.row.realNameState==='NOT_COMMITTED'">未提交</div>
						</template>
					</el-table-column>
					<el-table-column prop="userLevelName" label="代理等级"> </el-table-column>
					<el-table-column prop="revenue" label="查看上级" width="80">
						<template slot-scope="scope">
						        <el-popover trigger="click" @show="searchUp(scope.row.uId)" placement="top">
						        <el-table :data="superiorList">
									 <el-table-column prop="superiorLevelName" label="关系" width="80"></el-table-column>
									 <el-table-column prop="superiorLevelName" label="姓名" width="80"></el-table-column>
									 <el-table-column prop="userLevelName" label="等级" width="120"> </el-table-column>
									 <el-table-column prop="superiorUserPhone" label="手机号" width="120"> </el-table-column>
								</el-table>
						          <div slot="reference" class="name-wrapper">
						            <el-tag size="medium">查看</el-tag>
						          </div>
						        </el-popover>
						      </template>
					</el-table-column>
					<el-table-column prop="dengji" label="查看下级">
						<template slot-scope="scope">
							<el-button size="small" @click="lowerFn('dd',scope.row.uId)">下级</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="revenue" label="收益" width="80"> </el-table-column>
						<el-table-column prop="score" label="积分" width="80"> </el-table-column>
					<el-table-column prop="dengji" label="操作">
						<template slot-scope="scope">
							<el-button size="small" @click="dialogFn(scope.row)">详情</el-button>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="beizhu" label="信息推送" > 
						<template slot-scope="scope">
							<el-button size="small" @click="beizhuFn(scope.row)">信息</el-button>
						</template>
					</el-table-column> -->
				  </el-table>
			</div>
		
			 <!-- 详情信息 -->
			 <el-dialog
			   title="详情信息"
			   :visible.sync="dialogVisible"
			   width="80%"
			   >
				   <div class="xiangqing-box1">
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">注册时间：</span> 
					   	<span class="dialog-box-value">{{dialogValue.createTime}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">注册品牌：</span> 
					   	<span class="dialog-box-value">{{dialogValue.date}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">手机号：</span> 
					   	<span class="dialog-box-value">{{dialogValue.phone}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">实名状态：</span> 
					   	<span class="dialog-box-value">{{dialogValue.userName}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">实名审核：</span> 
					   	<span class="dialog-box-value">{{ dialogValue.realNameState|realNameFilter}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">账户余额：</span> 
					   	<span class="dialog-box-value">{{dialogValue.balance}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">账户积分：</span> 
					   	<span class="dialog-box-value">{{dialogValue.score}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">全部收益：</span> 
					   	<span class="dialog-box-value">{{dialogValue.totalRevenue}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">账户收益：</span> 
					   	<span class="dialog-box-value">{{dialogValue.revenue}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">账户已提现：</span> 
					   	<span class="dialog-box-value">{{dialogValue.withdrawnAmount}}</span>
					   </div>
					   <div class="dialog-box-item">
					   	<span class="dialog-box-title">额外手续费：</span> 
					   	<span class="dialog-box-value">{{dialogValue.date}}</span>
					   </div>
				   </div>
					<div class="xiangqing-box2">
						<h4>信用卡列表</h4>
						<div>银行名称、卡号、账单日、还款日、卡ID</div>
						<div v-for="item in xinyongList">{{item.bank}},{{item.cardNo}},{{item.billingDate}},{{item.repaymentDate}},{{item.id}}</div>
						<h4>储蓄卡列表</h4>
						<div>银行名称、卡号、手机号、卡ID</div>
						<div v-for="item in chuxvList">{{item.bank}},{{item.cardNo}},{{item.reservePhone}},{{item.id}}</div>
					</div>
			 </el-dialog>
			 <!-- 下级弹框 -->
			 <el-dialog :title="lowerDialogtitle" :visible.sync="lowerDialogTableVisible" width="80%">
			   <el-table :data="lowerDate">
			     <el-table-column property="createTime" label="日期" width="100"></el-table-column>
				 <el-table-column property="pinpai" label="品牌" width="100"></el-table-column>
			     <el-table-column property="userName" label="姓名" width="80"></el-table-column>
			     <el-table-column property="phone" label="手机号"></el-table-column>
				 <el-table-column property="dengji" label="等级"></el-table-column>
				 <el-table-column property="dengji" label="查看下级">
					 <template slot-scope="scope">
					 	<el-button size="small" @click="lowerFn('dd',scope.row.uId)">下级</el-button>
					 </template>
				 </el-table-column>
				 <el-table-column property="balance" label="余额"></el-table-column>
				 <el-table-column property="frozenAmount" label="冻结余额"></el-table-column>
				 <el-table-column property="score" label="账户积分"></el-table-column>
				 <el-table-column property="phone" label="收益余额"></el-table-column>
			   </el-table>
			   <!-- 下级分页 -->
			   <el-pagination
			      layout="prev, pager, next"
			   :total="xtotalSize"
			   :page-size="xsize"
			    :current-page.sync="xcurrentPage"
			   @current-change="lowerFn"
			   @prev-click="xprevFn"
			   @next-click="xnextFn"
				  >
			    </el-pagination>
			 </el-dialog>
			 <!-- 主页面分页 -->
			<el-pagination
			   layout="prev, pager, next"
			   :total="totalSize"
			   :page-size="size"
			    :current-page.sync="currentPage"
			   @current-change="searchHyFn"
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
			currentPage:1,
			size:20,
			totalPage:0,
			totalSize:0,
			xcurrentPage:1,
			xsize:10,
			xtotalPage:0,
			xtotalSize:0,
			xId:0,//下级id
			phone:'',
			userName:'',
			realNameState:'',
			dengji:'',
			realNameNum:'',
			registNum:'',
			dialogVisible:false,//详情信息弹框
			dialogValue:{},
			lowerDialogTableVisible:false,
			lowerDialogtitle:'',
			lowerDate:[],//下级列表
			smOptions:[
				{
				value:'',
				label:'全部'
				},
				{
				value:'TO_BE_REVIEWED',
				label:'审核中'
				},
				{
				value:'PASS',
				label:'已实名'
				},
				{
				value:'FAIL',
				label:'审核失败'
				},
				{
				value:'NOT_COMMITTED',
				label:'未提交'
				},
			],
			djOptions:[
				{
				value:'1',
				label:'创始合伙人'
				},
				{
				value:'2',
				label:'联合创始人'
				},
				{
				value:'3',
				label:'高级合伙人'
				},
				{
				value:'4',
				label:'业务合伙人'
				},
				{
				value:'5',
				label:'VIP会员'
				},
				{
				value:'6',
				label:'普通会员'
				},
			],
		 tableData: [],
		 superiorList:[],
		 xinyongList:[],
		 chuxvList:[]
		}
	},
	beforeMount(){
		this.searchHyFn();
	},
	methods:{
		searchUp:function(id){
			console.log(id)
			this.http.post(this.api.superiorUserList,
			{
				userId:id
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.superiorList=res.data;
			          }
			       });
		},
		prevFn(){
			if( this.currentPage>0){
				this.currentPage--;
			}
		},
		nextFn(){
		if(this.currentPage<this.totalPage){
			this.currentPage++;
		}	
		},
		// 查询会员
		searchHyFn(){
			this.http.post(this.api.pageAccountList,
			{
				 page:this.currentPage,
				size:this.size,
				phone:this.phone,
				userName:this.userName,
				realNameState:this.realNameState
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.registNum=res.data.registNum;
						 this.realNameNum=res.data.realNameNum;
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
			          }
			       });
		},
		//获取信用卡列表
		getxinyong:function(id){
			console.log(id)
			this.http.post(this.api.creditCardByUserList,
			{
				userId:id
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						this.xinyongList=res.data
			          }
			       });
		},
		// 获取储蓄卡列表
		getchuxv:function(id){
			this.http.post(this.api.savingsCardByUserList,
			{
				userId:id
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						this.chuxvList=res.data
			          }
			       });
		},
		
		// 添加备注，发送信息
		  beizhuFn() {
		        this.$prompt('请输入备注', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPlaceholder: '请输入备注',
		        }).then(({ value }) => {
		          
		        }).catch(() => {

		        });
		      },
		  dialogFn:function(item){
			 
			  this.getxinyong(item.uId);
			   console.log(item);
			  this.getchuxv(item.uId);
			  this.dialogVisible=true;
			  this.dialogValue=item;
		  },
		  handleClose:function(){
			  
		  },
		  xprevFn(){
		  	if( this.xcurrentPage>1){
		  		this.xcurrentPage--;
		  	}
		  },
		  xnextFn(){
		  if(this.xcurrentPage<this.xtotalPage){
		  	this.xcurrentPage++;
		  }	
		  },
		  // 获取下级会员列表
		  lowerFn:function(id,idd){
			  if(idd){
				this.xId=idd;  
			  }
			  this.http.post(this.api.pageAccountList,
			  {
				  "page":this.xcurrentPage,
				  "size":this.xsize,
				  superiorUserId:this.xId,
				  
			  },sessionStorage.getItem('token')).then(res => {
			  	console.log(res)
			            if(res.code == 0){
			  			 this.lowerDate=res.data.list; 
						 this.lowerDialogtitle='下级会员共有：'+res.data.total_size+'名';
						 this.xtotalSize=res.data.total_size;
						 this.xcurrentPage=res.data.current_page;
			            }
			         });
			  this.lowerDialogTableVisible=true;
		  },
		
	},
	filters:{
		realNameFilter(val){
			if(val==='PASS'){
				return '已实名'
			}else if(val==='TO_BE_REVIEWED'){
				return '审核中'
			}else if(val==='PAIL'){
				return '未通过'
			}else if(val==='NOT_COMMITTED'){
				return '未提交'
			}
		}
	}
}
</script>

<style>
	
	.font-fei{
		color: #00AAFF;
	}
	.hyinfo-box{
		max-height: 60vh;
		overflow-y: scroll;
	}
	.shiming-status1,.shiming-status2{
	display: inline-block;
	border-radius: 4px;
	line-height: 2em;
	font-size: 12px;
	padding: 0 10px;
	color: #FFFFFF;
	}
	.shiming-status1{
		background-color: #00AAFF;
		
	}
	.shiming-status2{
		background-color: #ff00ff;
		
	}
	  .demo-table-expand {
	    font-size: 0;
	  }
	  .demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	  }
	  .demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	  }
	  .dialog-box-item{
		 color: #A3A3A3;
			line-height: 2.5em;
			font-size: 14px;
	  }
	  .dialog-box-title{
		  display: inline-block;
		  width: 120px;
		  text-align: right;
		 margin-right: 40px; 
		 }
		 .xiangqing-box1{
			 display: inline-block;
			 width:30%;
		 }
		 .xiangqing-box2{
			 display: inline-block;
			 width: 60%;
			 vertical-align: top;
			 padding-left: 30px;
			 line-height: 2em;
		 }
</style>
