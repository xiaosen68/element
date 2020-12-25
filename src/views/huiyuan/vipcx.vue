<template>
	<div class="main-box">
		<div class="zh-head">
			<el-button type="primary"  size="small " @click="dengjisearchFn">等级变更查询</el-button>
			<el-button type="success" size="small " @click="dengjiShFn">等级变更审核</el-button>
			<el-button type="warning" size="small " @click="gaojisearch">可提升联合创始人列表</el-button>
		</div>
		<!-- 等级变更查询 -->
		<div class="zh-info-box" v-if="ifSearch=='1'">
			<div class="seach-box">
				<div class="seach-item">更改人手机号 
					<div class="search-input"><el-input placeholder="请输入内容" 
					type="tel" maxlength="11"  v-model="changeUserPhone"></el-input></div> 
				</div>
				<div class="seach-item">被更改人手机号
					<div class="search-input"><el-input placeholder="请输入内容" 
					type="tel" maxlength="11"  v-model="adjustmentUserPhone"></el-input></div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="vipSearch">查询</el-button></div>
			</div>
			  <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="changeTime"
			      label="日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="adjustmentUserName"
			      label="被更改人姓名"
			      width="120">
				  <template slot-scope="scope">
					  <div>
						  {{scope.row.adjustmentUserName}}
					  </div>
					  <div>
						{{scope.row.adjustmentUserPhone}}
					  </div>		 
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="changeBeforeLevel"
				  label="原等级"
				  width="100">
				  <template slot-scope="scope">
					  {{scope.row.changeBeforeLevel|levelFilters}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="changeAfterLevel"
				  label="更改等级"
				   width="100">
				  <template slot-scope="scope">
				  	{{scope.row.changeAfterLevel|levelFilters}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="changeUserName"
				  label="更改人姓名"
				  width="120">
				  <template slot-scope="scope">
					  <div>
						  {{scope.row.changeUserName}}
					  </div>
					  <div>
						{{scope.row.changeUserPhone}}
					  </div>		 
				  </template>
				</el-table-column>
				<el-table-column
				  prop="adjustmentMechanism"
				  label="调整方式"
				  width="100">
				  <template slot-scope="scope">
					  <div>
						  {{scope.row.adjustmentMechanism}}
					  </div>	 
				  </template>
				</el-table-column>
				<el-table-column
				  prop="adjustmentReason"
				  label="备注"
				  width="100">
				</el-table-column>
			  </el-table>
			  <!-- 主页面分页 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			     :current-page.sync="currentPage"
			     @current-change="vipSearch"
			     @prev-click="prevFn"
			     @next-click="nextFn"
			     >
			   </el-pagination>
		</div>
		<!-- 等级变更审核 -->
		<div class="zh-info-box one" v-if="ifSearch=='2'">
			<div class="seach-box">
				
				<div class="seach-item">审核状态 <div class="search-input">
					<el-select v-model="state" placeholder="请选择" size="small"  :popper-append-to-body="false">
						<el-option
						  v-for="item in stateList"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select></div> 
				</div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="dengjiShFn">查询</el-button></div>
			</div>
			  <el-table
			    :data="levelList"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="createTime"
			      label="日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="upgradUserName"
			      label="被申请人姓名"
			      width="120">
				  <template slot-scope="scope">
				  	<div>{{scope.row.upgradUserName}}</div>
					<div>{{scope.row.upgradPhone}}</div>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="upgradeAfterUserLevelName"
				  label="更改等级"
				   width="100">
					<template slot-scope="scope">
					  {{scope.row.upgradeAfterUserLevelName}}
					</template>
				</el-table-column>
				<el-table-column
				  prop="upgradeBeforeUserLevelName"
				  label="原等级"
				   width="100">
				  <template slot-scope="scope">
					  {{scope.row.upgradeBeforeUserLevelName}}
					</template>
				</el-table-column>
				
				<el-table-column
				  prop="userName"
				  label="申请人姓名"
				  width="120">
				  <template slot-scope="scope">
				  	<div>{{scope.row.userName}}</div>
				  	<div>{{scope.row.phone}}</div>
				  </template>
				</el-table-column>
			
				<el-table-column
				  prop="userLevelName"
				  label="申请人等级"
				   width="120">
				   <template slot-scope="scope">
					  <div>
						  {{scope.row.userLevelName}}
					  </div>	 
				   </template>
				</el-table-column>
				<el-table-column prop="userLevelName" label="操作" width="120">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="updateUpgradeUserLevelState(scope.row.id,'PASS')">通过</el-button>
						<el-button size="small" type="text" @click="updateUpgradeUserLevelState(scope.row.id,'NO_PASS')">拒绝</el-button>
					</template>
				</el-table-column>
				<el-table-column
				  prop="state"
				  label="审核状态"
				   width="120">
				   <template slot-scope="scope">
					  <div>
						  {{scope.row.state|filterState}}
					  </div>	 
				   </template>
				</el-table-column>
			  </el-table>
			  <!-- 主页面分页 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			     :current-page.sync="currentPage"
			     @current-change="getUpgradeUserLevelList"
			     @prev-click="prevFn"
			     @next-click="nextFn"
			     >
			   </el-pagination>
		</div>
		<!-- 高级业务合伙人列表 -->
		<div class="zh-info-box two" v-if="ifSearch=='3'">
			<div class="seach-box">	
			</div>
			  <el-table
			    :data="gaojiList"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="createTime"
			      label="日期"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="userName"
			      label="姓名"
				  width="120">
				  <template slot-scope="scope">
				  	<div>{{scope.row.userName}}</div>
				  	<div>{{scope.row.phone}}</div>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="userLevelName"
				  label="原等级"
				  width="120">
				  <template slot-scope="scope">
				  	{{scope.row.userLevelName}}
				  </template>
				</el-table-column>
				<el-table-column
				  prop="superiorUserName"
				  label="上级姓名"
				  width="120">
				  <template slot-scope="scope">
				  	<div>{{scope.row.superiorUserName}}</div>
				  	<div>{{scope.row.superiorUserPhone}}</div>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="superiorLevelName"
				  label="上级等级"
				  width="120">
				  <template slot-scope="scope">
					  {{scope.row.superiorLevelName}}
					</template>  
				</el-table-column>
				<el-table-column prop="userLevelName" label="是否提升至联合创始人" width="160">
					<template slot-scope="scope">
						<el-button size="small" type="success" @click="updateUpgradeSeniorPartner(scope.row.id,'hah')">提升</el-button>
					</template>
				</el-table-column>
			  </el-table>
			  <!-- 主页面分页 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="totalSize"
			     :page-size="size"
			     :current-page.sync="currentPage"
			     @current-change="getGaoji"
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
			adjustmentUserPhone:'',
			changeUserPhone:'',
			tableData:[
			],
			currentPage:1,
			size:20,
			totalPage:0,
			totalSize:0,
			ifSearch:1,
			state:'',//申请状态
			stateList:[{
				value:'TO_BE_REVIEWED',
				label:'待审核'
			},{
				value:'NO_PASS',
				label:'不通过'
			},{
				value:'PASS',
				label:'通过'
			}],
			levelList:[],
			gaojiList:[],
		}
	},
	beforeMount() {
		this.vipSearch()
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
		// 高级合伙人列表查询
		gaojisearch:function(){
			this.currentPage=1;
			this.getGaoji();
			this.ifSearch=3;
		},
		// 等级变更查询
		dengjisearchFn:function(){
			this.currentPage=1;
			this.vipSearch();
			this.ifSearch=1;
		},
		// 提升高级审核列表查询
		dengjiShFn:function(){
			this.currentPage=1;
			this.ifSearch=2;
			this.getUpgradeUserLevelList();
		},
		// 获取高级合伙人列表
		getGaoji:function(){
			this.http.post(this.api.upgradeableSeniorPartner,
				{ 	
					page:this.currentPage,
					size:this.size,
					state:this.state,
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.gaojiList=res.data.list;
							  this.totalSize=res.data.total_size;
							  this.currentPage=res.data.current_page;
							  // console.log( this.levelList)
				          }
				       });
		},
		// 提升至联合创始人
		updateUpgradeSeniorPartner:function(userId){
			this.http.post(this.api.updateUpgradeSeniorPartner,
				{ 	
					userId:userId,
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							 
							  // console.log( this.levelList)
				          }
				       });
		},
		// 获取提升高级申请列表
		getUpgradeUserLevelList:function(){
			this.http.post(this.api.getUpgradeUserLevelList,
				{ 	
					page:this.currentPage,
					size:this.size,
					state:this.state,
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.levelList=res.data.list;
							  this.totalSize=res.data.total_size;
							  this.currentPage=res.data.current_page;
							  // console.log( this.levelList)
				          }
				       });
		},
		// 审核提升高级业务合伙人
		updateUpgradeUserLevelState:function(upid,upstate){
			this.http.post(this.api.updateUpgradeUserLevelState,
				{ 	
					id:upid,
					state:upstate,
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  
				          }
				       });
		},
		// 查询vip申请
		vipSearch:function(){
			this.http.post(this.api.vipChangeUserLevelList,
			{ 	
				page:this.currentPage,
				size:this.size,
				adjustmentUserPhone :this.adjustmentUserPhone,
				changeUserPhone :this.changeUserPhone,
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.tableData=res.data.list;
						  this.totalSize=res.data.total_size;
						  this.currentPage=res.data.current_page;
						  // console.log( this.tableData)
			          }
			       });
		}
		
	},
	filters:{
		levelFilters:function(val){
			if(val==='ORDINARY_USERS'){
				return "会员"
			}else if(val==='MEMBERS'){
				return "VIP"
			}else if(val==='VIP_MEMBERS'){
				return "PLUS"
			}else if(val==='BUSINESS_PARTER'){
				return "业务合伙人"
			}else if(val==='SENIOR_PARTNER'){
				return "高级合伙人"
			}else if(val==='CO_FOUNDER'){
				return "联合创始人"
			}
		},
		filterState:function(val){
			if(val==='NO_PASS'){
				return "未通过"
			}else if(val==='PASS'){
				return "已通过"
			}else if(val==='TO_BE_REVIEWED'){
				return "待审核"
			}
		}
	}
}
</script>

<style>
/* 	.main-box{
		width: 98%;
		margin: 0 auto;
		margin-top: 4px;
		min-height: 200px;
		border-top: #e7eaec 4px solid;
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
	}
	.search-input{
		display: inline-block;
		margin-left: 8px;
		width: 140px;
	}
	.seach-item{
		padding-top: 1px;
		margin-right: 6px;
	} */
</style>
