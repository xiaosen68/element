<template>
	<div class="main-box">
		<div class="zh-head">
			<el-button type="primary"  plain size="small" 
			@click="statisticsFn(true)">商户列表</el-button>
			 <el-button type="success" plain size="small" 
			 @click="statisticsFn(false)">注册查询</el-button>
		</div>
		<div class="zh-info-box" v-if="statistics">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入内容" type="tel" maxlength="11" 
				prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				
				<div class="seach-item">商户号 <div class="search-input">
				<el-input placeholder="请输入内容" type="number" maxlength="11"
				 prefix-icon="el-icon-search" v-model="merchId"></el-input></div> </div>
				 <div class="seach-item">类型 <div class="search-input">
				 	<el-select v-model="merchType" placeholder="请选择" :popper-append-to-body="false">
				 		<el-option
				 		  v-for="item in merchTypeOp"
				 		  :key="item.value"
				 		  :label="item.merchName"
				 		  :value="item.merchType">
				 		</el-option>
				 	  </el-select></div>
				 	  </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="getMerchInfo">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 实名商户: <b class="font-fei">{{totalPeople}}</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
					<el-table-column prop="uId" label="id"></el-table-column>
				    <el-table-column prop="uUserName" label="姓名"></el-table-column>
				    <el-table-column prop="uPhone" label="手机号"> </el-table-column>
					<el-table-column prop="infoMerchId" label="商户号"> </el-table-column>
					<el-table-column prop="infoMerchType" label="类型">
						 <template slot-scope="scope">{{scope.row.infoMerchType|merchTypefilter}} </template>
					</el-table-column>
					
					<el-table-column prop="infoMerchAddr" label="商户地址"> 
					   <template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					          <p>地址: {{ scope.row.infoMerchAddr }}</p>
					          <div slot="reference" class="name-wrapper">
					            <el-tag size="medium">{{ scope.row.infoMerchAddr }}</el-tag>
					          </div>
					        </el-popover>
					      </template>
					</el-table-column>
				<!-- 	<el-table-column prop="dengji" label="商品"> 
						<template slot-scope="scope">
							<el-button size="small" @click="dialogFn(scope.row)">详情</el-button>
						</template>
					</el-table-column> -->
				<!-- 	<el-table-column prop="dengji" label="订单数"> </el-table-column>
					<el-table-column prop="dengji" label="未完成订单数"> </el-table-column>
					<el-table-column prop="dengji" label="交易金额"> </el-table-column> -->
					
					<el-table-column prop="dengji" label="操作">
						<template slot-scope="scope">
							<el-button size="small">操作</el-button>
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
			 <!-- 商品信息信息 -->
			 <el-dialog
			   title="详情信息"
			   :visible.sync="dialogVisible"
			   width="80%"
			   :before-close="handleClose">
			    <el-table
			       :data="dialogValue"
			       style="width: 100%"
			      >
			       <el-table-column
			         prop="date"
			         label="商品id"
			         width="100">
			       </el-table-column>
			       <el-table-column
			         prop="name"
			         label="商品名称"
			         width="100">
			       </el-table-column>
			       <el-table-column
			         prop="address"
			         label="商品售价">
			       </el-table-column>
				   <el-table-column
				     prop="address"
				     label="商品折扣">
				   </el-table-column>
				   <el-table-column
				     prop="address"
				     label="商品数量">
				   </el-table-column>
				   <el-table-column
				     prop="address"
				     label="剩余数量">
				   </el-table-column>
				   <el-table-column
				     prop="address"
				     label="是否上架">
				   </el-table-column>
				   <el-table-column
				     prop="address"
				     label="操作">
				   </el-table-column>
			     </el-table>
				
			 </el-dialog>
			
		</div>
		<!-- 注册失败列表 -->
		<div class="zh-info-box" v-else>
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入内容" type="tel" maxlength="11" 
				prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				 <div class="seach-item">类型 <div class="search-input">
				 	<el-select v-model="merchType" placeholder="请选择" :popper-append-to-body="false">
				 		<el-option
				 		  v-for="item in merchTypeOp"
				 		  :key="item.value"
				 		  :label="item.merchName"
				 		  :value="item.merchType">
				 		</el-option>
				 	  </el-select></div>
				 	  </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="registerMerchFailedLogPage">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box haha">
				<div class="sign-waring"> 实名商户: <b class="font-fei">{{wTotalPeople}}</b></div>
				  <el-table :data="registerList" stripe style="width: 100%" :highlight-current-row="true">
				    <el-table-column prop="logMerchType" label="类型">
				    	 <template slot-scope="scope">{{scope.row.logMerchType | merchTypefilter}} </template>
				    </el-table-column>
					<el-table-column prop="uUserName" label="姓名"></el-table-column>
				    <el-table-column prop="uPhone" label="手机号"> </el-table-column>
					<el-table-column prop="logState" label="状态">
						 <template slot-scope="scope">{{scope.row.logState | logState}} </template>
					</el-table-column>
					<el-table-column prop="logState" label="操作">
						<template slot-scope="scope" v-if="scope.row.logState=='MERCH_LOGIN_FAILED'">
							<el-button size="small" @click="setMerchFn(scope.row)">重新注册</el-button>
						</template>
					</el-table-column>
					
				  </el-table>
			</div>
			<el-pagination
			   layout="prev, pager, next"
			   :total="tableData.length">
			 </el-pagination>
			
		</div>
		
	</div>
</template>

<script>
export default {
	data (){
		return {
			statistics:true,
			name:'',
			totalPeople:'',//商户个数
			wTotalPeople:'',//注册失败个数
			dialogVisible:false,//详情信息弹框
			dialogValue:{},
			tableData: [],
			size:20,
			totalSize:0,
			currentPage:0,
			totalPage:0,
			merchType:'',
			merchStatu:'',
			merchId:'',
			phone:'',
			cardId:'',
			merchTypeOp:[
				{
					merchType:'MERCHANTS',
					merchName:'商户',
					merchNum:'1'
				},
				{
					merchType:'SHOP',
					merchName:'店铺',
					merchNum:'2'
				}
			],
			merchStatus:[
				{
					Status:'MERCH_LOGIN_SUCCESSFUL',
					StatusName:'注册成功',
					StatusNum:'1'
				},
				{
					Status:'MERCH_LOGIN_FAILED',
					StatusName:'注册失败',
					StatusNum:'2'
				}
			],
			registerList:[],
		}
	},
	created() {
		this.getMerchInfo();
		// this.registerMerchFailedLogPage();
	},
	methods:{
		// 重新注册
		setMerchFn:function(user){
			console.log(user)
			this.http.post(this.api.savingsCardByUserList,
			{
				userId:user.uId,
			},sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
							if(res.data[0].id){
								this.cardId=res.data[0].id;
								// 若是开通店铺，注册店铺号。
							this.http.post(this.api.setMerch,
							{
								userId:user.uId,
								merchType:user.logMerchType,
								cardId:this.cardId,
							},sessionStorage.getItem('token')).then(res => {
								console.log(res)
									  if(res.code == 0){
										
									  }
								   });		 
							}else{
								this.$message.warning('会员未绑定银行卡')
							}
						}
			 })
		},
		statisticsFn:function(t){
			if(t){
				this.statistics=true;
					this.getMerchInfo();
			}else{
				this.statistics=false;
				this.registerMerchFailedLogPage();
			}
		},
		// 根据注册id查商户信息
		registerMerchFailedLogByLogId:function(id){
			this.http.post(this.api.registerMerchFailedLogByLogId,
			{
				id:id,
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			        return res
			       });
		},
		
		// 获取注册失败商户信息
		registerMerchFailedLogPage:function(){
			let _this=this;
			this.http.post(this.api.registerMerchFailedLogPage,
			{
				phone:this.phone,
				merchType:this.merchType,
				state:'MERCH_LOGIN_FAILED',
				size:this.size,
				page:this.currentPage
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.registerList=res.data.list;
						  this.wTotalPeople=res.data.total_size;
						  this.registerList.forEach((item)=>{
							  _this.registerMerchFailedLogByLogId(item.logId)
							  // console.log(_this.registerMerchFailedLogByLogId(item.logId))
							  
						  })
						  // console.log(this.registerList)
			          }
			       });
		},
		// 获取商户信息
		getMerchInfo:function(){
			console.log(this.merchType)
			this.http.post(this.api.getMerchInfo,
			{
				phone:this.phone,
				merchType:this.merchType,
				merchId:this.merchId,
				size:this.size,
				page:this.currentPage
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list;
						  this.totalPeople=res.data.total_size;
			          }
			       });
		},
		beizhuFn:function(item){
			console.log(item)
		},
		// 添加备注，发送信息
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
		  dialogFn:function(item){
			  console.log(item);
			  this.dialogVisible=true;
			  this.dialogValue=item;
		  },
		  lowerFn:function(tel){
			  console.log(tel);
			  this.lowerDate=[{
				  date:'2020-20-20',
				  name:'hahah',
				  tel:'1231231231',
				  dengji:'12',
				  pinpai:'牛贝',
				  yue:'0.00',
				  dongjie:'0.00',
				  jifen:'1231231'
			  }];
			  this.lowerDialogtitle=tel+'的下级会员共有：'+this.lowerDate.length+'名';
			  this.lowerDialogTableVisible=true;
		  },
		  handleClose(){
			  
		  }
	},filters:{
		merchTypefilter:function(val){
			if(val==='SHOP'||val=='shop'){
				return "店铺"
			}else if(val==='MERCHANTS'||val=='merchants'){
				return "商户"
			}
		},
		logState:function(val){
			if(val==='MERCH_LOGIN_SUCCESSFUL'||val=='1'){
				return "成功"
			}else if(val==='MERCH_LOGIN_FAILED'||val=='2'){
				return "失败"
			}
		}
	}
}
</script>

<style>
	
</style>
