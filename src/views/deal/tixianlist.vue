<template>
	<div class="main-box">
		<div class="zh-head">提现审核 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 
					<div class="search-input"><el-input placeholder="请输入内容" type="tel" maxlength="11"  v-model="tel1"></el-input></div> 
				</div>
				<div class="seach-item">提现状态 <div class="search-input">
					<el-select v-model="tixianStatus" placeholder="请选择" :popper-append-to-body="false">
						<el-option
						  v-for="item in txOptions"
						  :key="item.type"
						  :label="item.label"
						  :value="item.type">
						</el-option>
					  </el-select></div> 
				</div>
				<!-- <div class="seach-item">提现类型 <div class="search-input">
					<el-select v-model="tixianClassify" placeholder="请选择" :popper-append-to-body="false">
						<el-option
						  v-for="item in txClassify"
						  :key="item.type"
						  :label="item.label"
						  :value="item.type">
						</el-option>
					  </el-select></div> 
				</div> -->
				<div class="seach-item"><el-button type="primary"  size="small " @click="getTixianList">查询</el-button></div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="excelWithdrawalAmountAll">导出</el-button></div>
				<div class="seach-item">
					<!-- <el-upload
					  class="upload-demo"
					  ref="upload"
					  :action="baseUrl+'/api/v1/admin/account/importExcelUpdateWithdrawal'"
					  :headers="{'Content-Type':'application/json',
					  'token':token}"
					  :on-change="uploadExecFn"
					  > -->
					  <el-upload
					    class="upload-demo"
					    ref="upload"
					    :action="baseUrl+'/api/v1/admin/account/importExcelUpdateWithdrawal'"
					    :headers="{'Content-Type':'application/json',
					    'token':token}"
						:auto-upload="false"
						:on-preview="uploadExecFn"
						:on-error="uploaderror"
						:on-success="uploadsuccess"
					    >
					  <el-button slot="trigger" size="small" type="primary">上传</el-button>
					</el-upload>
					
				</div>
			
			</div>
			  <el-table
			    :data="tixianList"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="submit_time"
			      label="创建日期"
			      width="100">
			    </el-table-column>
				<el-table-column
				  prop="phone"
				  label="姓名/手机号"
				  width="120">
				  <template slot-scope="scope">
					  <p>{{scope.row.user_name}}</p>
					  <p>{{scope.row.phone}}</p>
				  </template>
				  </el-table-column>
				<el-table-column
				    prop="withdraw_bank"
				    label="开户行/卡号"
				    width="160">
					<template slot-scope="scope">
					  <p>{{scope.row.withdraw_bank}}</p>
					  <p>{{scope.row.bank_account}}</p>
					</template>
				</el-table-column>  
				<!-- <el-table-column
				  prop="updateTime"
				  label="更新日期"
				  width="100">
				</el-table-column> -->
			    <el-table-column
			      prop="apply_amount"
			      label="提现金额"
			      width="70">
			    </el-table-column>
				<el-table-column
				  prop="fee"
				  label="手续费"
				  width="70">
				</el-table-column>
				<el-table-column
				  prop="tax_amount"
				  label="税费"
				  width="70">
				</el-table-column>
			    <el-table-column
			      prop="amount"
			      label="余额"
				  width="70">
			    </el-table-column>
				<!-- <el-table-column
				  prop="state"
				  label="状态"
				  width="100">
				  <template slot-scope="scope">
				  	<p>{{scope.row.state|stateFilter}}</p>
				  </template>
				</el-table-column> -->
				<el-table-column
				  prop="state"
				  label="操作"
				  width="100">
				   <template slot-scope="scope">
						   	<el-select v-model="scope.row.state" placeholder="请选择" 
							:popper-append-to-body="true" size="mini" @change="cashWithdrawalByAudit( scope.row.state,scope.row.withdraw_id)">
							<el-option
							  v-for="item in txOptions"
							  :key="item.type"
							  :label="item.label"
							  :value="item.type">
							</el-option>
						  </el-select>
					
				   </template>
				</el-table-column>
			  </el-table>
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			      :current-page.sync="currentPage"
			     @current-change="getTixianList"
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
			tel1:'',
			tixianStatus:'',
			tixianClassify:'',
			tixianList:[],
			tixianId:0,
			currentPage:1,
			size:20,
			totalPage:0,
			totalSize:0,
			txOptions:[
			// 	{
			// 	type:'ACCEPTED',
			// 	code:'1',
			// 	label:'受理中',
			// },
			// {
			// 	type:'PAYMENT_IN_PROGRESS',
			// 	code:'2',
			// 	label:'打款中',
			// },
			{
				type:'SUCCESSFUL_PAY',
				code:'3',
				label:'打款成功',
			},
			{
				type:'PAYMENT_FAILED',
				code:'4',
				label:'打款失败',
			},
			// {
			// 	type:'REFUSE',
			// 	code:'5',
			// 	label:'拒绝',
			// },
			],
			// txClassify:[{
			// 	type:'21',
			// 	code:'1',
			// 	label:'收益提现',
			// },{
			// 	type:'12',
			// 	code:'2',
			// 	label:'营业额提现',
			// }],
			tableData:[
			
			],
			baseUrl:'',
			token:'',
		}
	},
	created() {
		this.baseUrl= process.env.VUE_APP_BASE_URL;	
		this.token=sessionStorage.getItem('token');
	},
	beforeMount(){
		this.getTixianList()
	},
	methods:{
		uploadsuccess:function(res){
			console.log('succe')
			console.log(res)
		},
		uploaderror:function(err){
			console.log('err')
			console.log(err)
		},
		uploadExecFn(file){
			let _this=this;
			let formData = new FormData();
			formData.append('uploadType','SHARING_POSTERS_URL');
			formData.append('file',file.raw)
			this.http.post(this.api.excelWithdrawalAmountAll,
			formData,sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  
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
		// 提现信息查询
		getTixianList:function(){
			let searchdata={};
			if(this.tel1){
				searchdata={
					page:this.currentPage,
					phone:this.tel1,
					}
			}else{
				searchdata={
					page:this.currentPage
				}
			}
			this.http.get(this.api.applicationList,
			searchdata,sessionStorage.getItem('token')).then(res => {
				console.log(res)
				if(res.list.length==0){
					this.$message.warning('未查询到数据')
				}else{
					this.tixianList=res.list;
					this.currentPage=res.page;
					this.totalSize=res.total;
				}
				
				// this.refreshLable();
			    //       if(res.code == 0){
						 //  this.tixianList=res.data.list;
						 //  this.totalSize=res.data.total_size;
						 //  this.currentPage=res.data.current_page;
						 //  // this.refreshLable();
			    //       }else if(res.code==200){
						 //  this.$message.success(res.error_code)
					  // }
			       });
			// this.http.post(this.api.getWithdrawalAmountAll,
			// {
			// 	page:this.currentPage,
			// 	size:this.size,
			// 	phone:this.phone,
			// 	state:this.tixianStatus,
			// },sessionStorage.getItem('token')).then(res => {
			// 	console.log(res)
			//           if(res.code == 0){
			// 			  this.tixianList=res.data.list;
			// 			  this.totalSize=res.data.total_size;
			// 			  this.currentPage=res.data.current_page;
			// 			  // this.refreshLable();
			//           }else if(res.code==200){
			// 			  this.$message.success(res.error_code)
			// 		  }
			//        });
			
		},
		// 提现信息审核
		// cashWithdrawalByAudit:function(tixianState,tixianId){
		// 	this.http.post(this.api.cashWithdrawalByAudit,
		// 	{
		// 		id:tixianId,
		// 		state:tixianState
			
		// 	},sessionStorage.getItem('token')).then(res => {
		// 		console.log(res)
		// 	          if(res.code == 0){
		// 				  this.$message.success(res.data)
		// 	          }
		// 	       });
		// },
		cashWithdrawalByAudit:function(tixianState,tixianId){
	
			this.http.post(this.api.changeStatus,
			{
				id:tixianId,
				state:tixianState
			
			},sessionStorage.getItem('token')).then(res => {
				
				
				console.log(res)
			          if(res.error_code ==200){
						  this.$message.success(res.status)
			          }else if(res.error_code==500){
						  this.$message.warning(res.error_msg)
					  }
			       });
		},
		
		
		// 导出提现列表
		excelWithdrawalAmountAll:function(){
			this.http.getexcel('提现列表',this.api.daochuexcel,{phone:this.phone,state:this.tixianStatus},sessionStorage.getItem('token')).then((res)=>{
				console.log(res)
			})
		},	
		// 导入提现列表
		importExcelUpdateWithdrawal:function(){
			this.http.post(this.api.importExcelUpdateWithdrawal,
			{
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tixianList=res.data.list;
						  this.totalSize=res.data.total_size;
						  this.currentPage=res.data.current_page;
						  // this.refreshLable();
			          }
			       });
		}
	},
	filters:{
		stateFilter:function(value){
			if(value==='ACCEPTED'){
				return "受理中"
			}else if(value==='PAYMENT_IN_PROGRESS'){
				return "打款中"
			}else if(value==='SUCCESSFUL_PAY'){
				return "打款成功"
			}else if(value==='PAYMENT_FAILED'){
				return "打款失败"
			}else if(value==='REFUSE'){
				return "拒绝"
			}
		}
	}
}
</script>

<style>

</style>
