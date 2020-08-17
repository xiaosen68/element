<template>
	<div class="main-box">
		<div class="zh-head">会员信息 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入内容" type="tel" maxlength="11"
				 prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
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
						<el-select v-model="level" placeholder="请选择" :popper-append-to-body="false">
							<el-option
							  v-for="item in djOptions"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
					</div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 平台注册人数: <b class="font-fei">{{registNum}}</b>,平台实名人数:<b class="font-fei">{{realNameNum}}</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
				    <el-table-column prop="createTime" label="日期" width="100" > </el-table-column>
				    <el-table-column prop="userName" label="姓名" width="100"></el-table-column>
				    <el-table-column prop="phone" label="手机号" width="120"> </el-table-column>
					<el-table-column prop="houtaiNum" label="后台登录账号" width="120"> </el-table-column>
					<el-table-column prop="realNameState" label="实名状态" width="100">
						<template slot-scope="scope">
							<div class="shiming-status1" v-if="scope.row.realNameState==='PASS'">已实名</div>
							<div class="shiming-status1" v-if="scope.row.realNameState==='TO_BE_REVIEWED'">审核中</div>
							<div class="shiming-status1" v-if="scope.row.realNameState==='PAIL'">未通过</div>
							<div class="shiming-status2" v-if="scope.row.realNameState==='NOT_COMMITTED'">未提交</div>
						</template>
					</el-table-column>
					<el-table-column prop="userLevelName" label="等级" width="120"></el-table-column>
					<el-table-column prop="level" label="操作" width="260">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="dengjiFn(scope.row)">等级</el-button>
							<el-button size="small" type="text" @click="limitsFN(scope.row)">权限</el-button>
							<el-button size="small" type="text" @click="statusFn(scope.row)">详情</el-button>
							<el-button size="small" type="text" @click="earningsFn(scope.row)">收益</el-button>
							<el-button size="small" type="text" @click="blackFN(scope.row)">拉黑</el-button>
							<el-button size="small" type="text" @click="beizhuFn(scope.row)">推送</el-button>
						</template>
					</el-table-column>
						<el-table-column prop="level" label="黑名单状态" width="100"></el-table-column>
				  </el-table>
			</div>
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
			 <!-- 等级弹框 -->
			 <el-dialog title="更改用户等级" :visible.sync="dengjiVisible" width="500px">
			   <el-form :model="dengjiForm" label-width="120px">
			     <el-form-item label="用户编号" >
			       <el-input v-model="dengjiForm.num" ></el-input>
			     </el-form-item>
			     <el-form-item label="用户姓名">
			      <el-input v-model="dengjiForm.name" ></el-input>
			     </el-form-item>
				 <el-form-item label="用户手机号">
				  <el-input v-model="dengjiForm.tel" ></el-input>
				 </el-form-item>
				 <el-form-item label="用户等级" >
				  <el-select v-model="dengjiForm.level" placeholder="请选择">
				      <el-option
				        v-for="item in djOptions"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value">
				      </el-option>
				    </el-select>
				 </el-form-item>
			   </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="dengjiVisible = false">取 消</el-button>
			     <el-button type="primary" @click="dengjiVisible = false">确 定</el-button>
			   </div>
			 </el-dialog>
			 <!-- 权限弹框 -->
			 <el-dialog title="更改用户权限" :visible.sync="limitsVisible" width="500px">
			   <el-form :model="limitsForm" label-width="120px">
			     <el-form-item label="用户编号" >
			       <el-input v-model="limitsForm.userId" disabled></el-input>
			     </el-form-item>
			     <el-form-item label="用户姓名">
			      <el-input v-model="limitsForm.userName" disabled></el-input>
			     </el-form-item>
				 <el-form-item label="备注">
				  <el-input v-model="limitsForm.remarks" ></el-input>
				 </el-form-item>
				 <el-form-item label="用户权限" >
				  <el-select v-model="limitsForm.roleId" placeholder="请选择">
					  <el-option
						v-for="item in limitsOption"
						:key="item.roleId"
						:label="item.description"
						:value="item.id">
					  </el-option>
					</el-select>
				 </el-form-item>
			   </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="limitsVisible = false">取 消</el-button>
			     <el-button type="primary" @click="setlimitsFn">确 定</el-button>
			   </div>
			 </el-dialog>
			 <!-- 黑名单弹框 -->
			 <el-dialog title="拉入黑名单" :visible.sync="blackVisible" 
			 width="500px">
			   <el-form :model="blackForm" label-width="120px">
			     <el-form-item label="用户编号" >
			       <el-input v-model="blackForm.uId" ></el-input>
			     </el-form-item>
			     <el-form-item label="用户姓名">
			      <el-input v-model="blackForm.userName" ></el-input>
			     </el-form-item>
				 <el-form-item label="用户手机号">
				  <el-input v-model="blackForm.phone" ></el-input>
				 </el-form-item>
				 <el-form-item label="黑名单类型" >
				  <el-select v-model="blackForm.black" placeholder="请选择">
					  <el-option
						v-for="item in blackOption"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					  </el-option>
					</el-select>
				 </el-form-item>
				 <el-form-item label="拉黑原因">
				  <el-input v-model="blackForm.blackStatus" ></el-input>
				 </el-form-item>
			   </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="blackVisible = false">取 消</el-button>
			     <el-button type="primary" @click="subBlackFn">确 定</el-button>
			   </div>
			 </el-dialog>
			 <!-- 详情信息 -->
			 <el-dialog
			   title="详情信息"
			   :visible.sync="dialogVisible"
			   width="60%"
			   :before-close="statushandleClose">
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
			 </el-dialog>
			 <!-- 收益信息 -->
			 <el-dialog
			   title="收益信息"
			   :visible.sync="earningsVisible"
			   width="80%"
			   :before-close="earninghandleClose">
			   <div class="earnings-body">
				    <el-date-picker
				         v-model="earningDate"
				         type="daterange"
				         range-separator="至"
				         start-placeholder="开始日期"
				         end-placeholder="结束日期"
						 size="small">
				       </el-date-picker>
					    <el-button type="primary" size="small" style="marginLeft: 20px;">查询</el-button>
					 <el-table
					    :data="earningsDialog"
					    border
					    style="width: 100%">
					    <el-table-column
					      prop="label"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="num"
					      label="人数"
					     >
					    </el-table-column>
					    <el-table-column
					      prop="consumMoney"
					      label="消费">
					    </el-table-column>
						<el-table-column
						  prop="topupMoney"
						  label="充值">
						</el-table-column>
						<el-table-column
						  prop="returnMoney"
						  label="还款">
						</el-table-column>
						<el-table-column
						  prop="returnMoney"
						  label="交易总量">
						  <template slot-scope="scope">
							  <span>{{scope.row.returnMoney+scope.row.consumMoney+scope.row.topupMoney}}</span>
						  </template>
						</el-table-column>
						<el-table-column
						  prop="earningsMoney"
						  label="收益">
						</el-table-column>
					  </el-table>
					
			   </div>
				 <span slot="footer" class="dialog-footer">
					<el-button @click="earningsVisible = false" size="small">取 消</el-button>
					<el-button type="primary" @click="earningsVisible = false" size="small">确 定</el-button>
				  </span>
			 </el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			currentPage:1,
			size:2,
			totalPage:0,
			totalSize:0,
			xcurrentPage:1,
			xsize:1,
			xtotalPage:0,
			xtotalSize:0,
			phone:'',
			userName:'',
			shiming:'',
			level:'',
			realNameNum:'',
			registNum:'',
			dengjiVisible:false,//修改等级弹框
			dengjiForm:{
				name:'www',
				num:'123123',
				tel:'1231231231',
				level:'2',
			},//修改等级
			limitsVisible:false,//修改用户权限
			limitsForm:{
				userName:'',
				remarks:'',
				userId:'',
				roleId:'',
			},//修改用户权限
			limitsOption:[
			],
			blackVisible:false,//拉入黑名单
			blackForm:{
				userName:'',
				uId:'',
				phone:'',
				black:'',
				blackStatus:''
			},
			blackOption:[
				{
					value:'app_no_login',
					label:'禁止登录'
				},
				{
					value:'no_withdrawal',
					label:'禁止提现'
				},
				{
					value:'no_credit_card',
					label:'禁止消费'
				},
			],
			dialogVisible:false,
			dialogValue:{
				
			},
			earningsVisible:false,
			earningsDialog:[
				{
				label:'直推',
				num:12,
				consumMoney:2131,
				returnMoney:2131,
				topupMoney:12312,
				earningsMoney:123
			},{
				label:'间推',
				num:12,
				consumMoney:2131,
				returnMoney:2131,
				topupMoney:12312,
				earningsMoney:123
			},{
				label:'个人',
				num:12,
				consumMoney:2131,
				returnMoney:2131,
				topupMoney:12312,
				earningsMoney:123
			}
			],
			earningDate:'',
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
	created() {
		this.http.get(this.api.getRole,
		{
		},sessionStorage.getItem('token')).then(res => {
			console.log(res)
		          if(res.code == 0){
					this.limitsOption=res.data;
					console.log(this.limitsOption)
		          }
		       });
		
	},
	beforeMount(){
		this.searchHyFn();
	},
	methods:{
		
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
		// 发送信息
		  beizhuFn(userStatus) {
		        this.$prompt('请输入推送', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPlaceholder: '请输入信息',
		        }).then(({ value }) => {
					console.log(value)
		          this.http.post(this.api.addPersonalMessage,
		          {
		          	 userId:userStatus.uId,
		          	title:'后台推送',
		          	content:value,
		          
		          },sessionStorage.getItem('token')).then(res => {
		          	console.log(res)
		                    if(res.code == 0){
		          			 this.$message.success(res.data)
		                    }
		                 });
				  
		        }).catch(() => {

		        });
		      },
			  dengjiFn:function(item){
				  console.log(item);
				  this.$set(this.dengjiForm,'name',item.name);
				  this.$set(this.dengjiForm,'tel',item.tel);
				  this.$set(this.dengjiForm,'level',item.level);
				  this.dengjiVisible=true;
				  
			  },
			  // 打开权限弹框
			  limitsFN:function(item){
				console.log(item);
				
				this.$set(this.limitsForm,'userName',item.userName);
				this.$set(this.limitsForm,'userId',item.uId);
				  this.limitsVisible=true;
			  },
			  // 设置权限
			  setlimitsFn:function(){
				  console.log(this.limitsForm)
				  this.http.post(this.api.setUserRole,
				  {
				  	userName:this.limitsForm.userName,
				  	remarks:this.limitsForm.remarks,
				  	userId:this.limitsForm.userId,
				  	roleId:this.limitsForm.roleId,
				  },sessionStorage.getItem('token')).then(res => {
				  	console.log(res)
				            if(res.code == 0){
				  			 this.$message.success(res.data)
							 this.limitsVisible=false;
				            }
				         });
				  
			  },
			  // 打开黑名单弹框
			  blackFN:function(item){
				  console.log(item);
				  this.$set(this.blackForm,'uId',item.uId);
				  this.$set(this.blackForm,'userName',item.userName);
				  this.$set(this.blackForm,'phone',item.phone);
				    this.blackVisible=true;
					
			  },
			  subBlackFn:function(){
				  this.http.post(this.api.addBlack,
				  {
				  	 userId:this.blackForm.uId,
					 phone:this.blackForm.phone,
				  	blackType:this.blackForm.black,
				  	blackoutReason:this.blackForm.blackStatus,
				  
				  },sessionStorage.getItem('token')).then(res => {
				  	console.log(res)
				            if(res.code == 0){
								this.blackVisible=false;
				  			 this.$message.success(res.data)
				            }
				         });
			  },
			  statusFn:function(item){
				  this.dialogVisible=true;
				   this.dialogValue=item;
			  },
			  earningsFn:function(item){
				  this.earningsVisible=true;
				  
			  },
			  handleClose:function(){
				  
			  },
			  earninghandleClose:function(){
				  this.earningsVisible=false;
			  },statushandleClose:function(){
				  this.dialogVisible=false;
			  }
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
	.main-box{
		width: 98%;
		margin: 0 auto;
		margin-top: 4px;
		min-height: 200px;
		border-top: #e7eaec 4px solid;
		/* border-bottom: #e7eaec 4px solid; */
		background-color: #ffffff;
		text-align: left;
	}
	.zh-head{
		line-height: 3em;
		font-size: 14px;
		font-weight: 600;
		padding: 0 16px;
		border-bottom: 1px solid #e7eeec;
	}
	.zh-info-box{
		padding: 0 16px;
		line-height: 3em;
	}
	.seach-box{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
		padding: 20px;
	}
	.search-input{
		display: inline-block;
		margin-left: 8px;
		width: 140px;
	}
	.seach-item{
		padding-top: 1px;
		margin-right: 6px;
	}
	.font-fei{
		color: #00AAFF;
	}
	.hyinfo-box{
		max-height: 60vh;
		overflow-y: scroll;
		/* text-align: center; */
	}
	.shiming-status1,.shiming-status2{
	/* width: 80px; */
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
</style>
