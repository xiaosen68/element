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
					<el-select v-model="shiming" placeholder="请选择" :popper-append-to-body="false">
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
				    <el-table-column prop="userName" label="姓名"></el-table-column>
				    <el-table-column prop="phone" label="手机号"> </el-table-column>
					<el-table-column prop="houtaiNum" label="后台登录账号"> </el-table-column>
					<el-table-column prop="shiming" label="实名状态"> 
						<template slot-scope="scope">
							<div class="shiming-status1" v-if="scope.row.shiming===1">已实名</div>
							<div class="shiming-status2" v-else>未提交</div>
						</template>
					</el-table-column>
					<el-table-column prop="userLevelName" label="代理等级"> </el-table-column>
					<el-table-column prop="revenue" label="查看上级">
						<template slot-scope="scope">
						        <el-popover trigger="hover" placement="top">
						        <el-table :data="scope.row.revenue">
									 <el-table-column prop="guanxi" label="关系" width="80"></el-table-column>
									 <el-table-column prop="name" label="姓名" width="80"></el-table-column>
									 <el-table-column prop="dengji" label="等级" width="60"> </el-table-column>
									 <el-table-column prop="phone" label="手机号" width="120"> </el-table-column>
								</el-table>
						          <div slot="reference" class="name-wrapper">
						            <el-tag size="medium">查看</el-tag>
						          </div>
						        </el-popover>
						      </template>
					</el-table-column>
					<el-table-column prop="dengji" label="查看下级">
						<template slot-scope="scope">
							<el-button size="small" @click="lowerFn(scope.row.uId)">下级</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="revenue" label="收益"> </el-table-column>
						<el-table-column prop="score" label="积分"> </el-table-column>
					<el-table-column prop="dengji" label="操作">
						<template slot-scope="scope">
							<el-button size="small" @click="dialogFn(scope.row)">详情</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="beizhu" label="信息推送" > 
						<template slot-scope="scope">
							<el-button size="small" @click="beizhuFn(scope.row)">信息</el-button>
						</template>
					</el-table-column>
				  </el-table>
			</div>
			<el-pagination
			   layout="prev, pager, next"
			   :total="tableData.length">
			 </el-pagination>
			 <!-- 详情信息 -->
			 <el-dialog
			   title="详情信息"
			   :visible.sync="dialogVisible"
			   width="30%"
			   >
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
					<span class="dialog-box-value">{{dialogValue.realNameState}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">实名审核：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
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
					 	<el-button size="small" @click="lowerFn(scope.row.uId,scope.row.phone)">下级</el-button>
					 </template>
				 </el-table-column>
				 <el-table-column property="balance" label="余额"></el-table-column>
				 <el-table-column property="frozenAmount" label="冻结余额"></el-table-column>
				 <el-table-column property="score" label="账户积分"></el-table-column>
				 <el-table-column property="phone" label="收益余额"></el-table-column>
			   </el-table>
			   <el-pagination
			      layout="prev, pager, next"
			      :total="lowerDate.length">
			    </el-pagination>
			 </el-dialog>
			
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			phone:'',
			userName:'',
			shiming:'',
			dengji:'',
			realNameNum:'',
			registNum:'',
			dialogVisible:false,//详情信息弹框
			dialogValue:{},
			lowerDialogTableVisible:false,
			lowerDialogtitle:'',
			lowerDate:[{}],//下级列表
			smOptions:[
				{
				value:'1',
				label:'全部'
				},
				{
				value:'2',
				label:'审核中'
				},
				{
				value:'3',
				label:'已实名'
				},
				{
				value:'4',
				label:'审核失败'
				},
				{
				value:'5',
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
		}
	},
	created(){
		// 获取会员列表
			this.http.post(this.api.pageAccountList,
			{
				 "page":1,
				"size":10

			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.registNum=res.data.registNum;
						 this.realNameNum=res.data.realNameNum;
			          }
			       });
	},
	methods:{
		beizhuFn:function(item){
		},
		// 查询会员
		searchHyFn(){
			this.http.post(this.api.pageAccountList,
			{
				 "page":1,
				"size":10,
				"phone":'',
				"userName":'',
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.registNum=res.data.registNum;
						 this.realNameNum=res.data.realNameNum;
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
			  console.log(item);
			  this.dialogVisible=true;
			  this.dialogValue=item;
		  },
		  handleClose:function(){
			  
		  },
		  // 获取下级会员列表
		  lowerFn:function(id,userPhone){
			  this.http.post(this.api.pageAccountList,
			  {
				  superiorUserId:id
			  },sessionStorage.getItem('token')).then(res => {
			  	// console.log(sessionStorage.getItem('token'))
			  	console.log(res)
			            if(res.code == 0){
			  			 this.lowerDate=res.data.list; 
						 this.lowerDialogtitle='下级会员共有：'+this.lowerDate.length+'名';
			            }
			         });
			  this.lowerDialogTableVisible=true;
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
</style>
