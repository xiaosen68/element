<template>
	<div class="main-box">
		<div class="zh-head">实名审核 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
					<el-input placeholder="请输入内容" type="tel" maxlength="11" 
					 v-model="phone"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
					<el-input placeholder="请输入内容" type="text" maxlength="5"
					 v-model="realName"></el-input></div> </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="userRealNameListPage">查询</el-button></div>
			</div>
			</div>
			<div class="sign-waring"> 待审核列表</div>
			<el-table  :data="tableData"  stripe style="width: 100%">
				<el-table-column type="index"  width="50"> </el-table-column>
			    <el-table-column  prop="create_time" label="注册日期" width="100">   </el-table-column>
				<!-- <el-table-column  prop="update_time" label="提交日期" width="100">   </el-table-column> -->
			    <el-table-column  prop="real_name" label="姓名" width="120"> 
					<template slot-scope="scope">
						<div>{{scope.row.real_name}}</div>
						<div>{{scope.row.phone}}</div>
					</template>
				</el-table-column>
				<el-table-column  prop="id_number" label="身份证号" width="160" > </el-table-column>
				<el-table-column  prop="photo" label="查看照片" width="100">
					<template slot-scope="scope">
					<el-popover  placement="right" trigger="click">
						<div class="photo-box">
							<el-image style="width: 280px; height: 280px ;margin: 20px;" 
							    :src="scope.row.front_photo_of_id_card" 
								:preview-src-list="[scope.row.front_photo_of_id_card,scope.row.reverse_photo_of_id_card,scope.row.holding_id_card]"
								 >
							  </el-image>
							 <el-image style="width: 280px; height: 280px ;margin: 20px;"
							      :src="scope.row.reverse_photo_of_id_card" 
								  :preview-src-list="[scope.row.front_photo_of_id_card,scope.row.reverse_photo_of_id_card,scope.row.holding_id_card]"
							      >
							    </el-image>
								<el-image style="width: 280px; height: 280px;margin: 20px;"
								    :src="scope.row.holding_id_card" 
									:preview-src-list="[scope.row.front_photo_of_id_card,scope.row.reverse_photo_of_id_card,scope.row.holding_id_card]"
								    >
								  </el-image> 
						</div>
						<el-button size="small"  slot="reference" @click="">查看</el-button>
					 </el-popover>
					</template >
				</el-table-column>
				<el-table-column   label="操作"  width="100"> 
					<!-- <template slot-scope="scope" v-if="scope.row.state==='PASS'">
						
					</template>
					<template slot-scope="scope" v-if-else="scope.row.state==='TO_BE_REVIEWED'">
						<el-button size="small" type="text" @click="updateRealNameState(scope.row.user_id,'PASS')">通过</el-button>
						<el-button size="small" type="text" @click="updateRealNameState(scope.row.user_id,'FAIL')">不通过</el-button>
					</template slot-scope="scope"> -->
					<template slot-scope="scope"v-if="scope.row.state==='TO_BE_REVIEWED'">
							<el-button size="small"   type="text"
							@click="updateRealNameState(scope.row.user_id,'PASS')">通过</el-button>
							<el-button size="small" type="text" 
							@click="updateRealNameState(scope.row.user_id,'FAIL')">不通过</el-button>
						</template>
						
						<template slot-scope="scope" v-else-if="scope.row.state==='PASS'" >
						<el-button size="small" type="text"
						@click="dialogVisibleFn(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
				<el-table-column  prop="state" label="审核状态" width="100">
					<template slot-scope="scope">
						{{scope.row.state|shimingstateFilters}}
					</template>
				</el-table-column>
			</el-table>
			<!-- 主页面分页 -->
			<el-pagination
			   layout="prev, pager, next"
			   :total="totalSize"
			   :page-size="size"
			    :page-count="totalPage"
			    :current-page.sync="currentPage"
			   @current-change="userRealNameListPage"
			   @prev-click="prevFn"
			   @next-click="nextFn"
			   >
			 </el-pagination>
			 <el-dialog
			   title="详情信息"
			   :visible.sync="dialogVisible"
			   width="80%"
			   >
			 	   <div class="xiangqing-box1">
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">真实姓名：</span> 
			 			<span class="dialog-box-value">{{dialogValue.front_name}}({{dialogValue.front_sex}})</span>
			 		   </div>
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">身份证地址：</span> 
			 			<span class="dialog-box-value">{{dialogValue.front_address}}</span>
			 		   </div>
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">身份证有效期：</span> 
			 			<span class="dialog-box-value">{{dialogValue.back_timelimit}}</span>
			 		   </div>
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">身份证号：</span> 
			 			<span class="dialog-box-value">{{dialogValue.front_number}}</span>
			 		   </div>
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">实名审核：</span> 
			 			<span class="dialog-box-value">{{ dialogValue.realNameState|shimingstateFilters}}</span>
			 		   </div>
			 		   <div class="dialog-box-item">
			 			<span class="dialog-box-title">手机号：</span> 
			 			<span class="dialog-box-value">{{dialogValue.phone}}</span>
			 		   </div>
			 		 <div class="photo-box">
			 		 	<el-image style="width: 180px; height: 180px ;margin: 20px;" 
			 		 	    :src="dialogValue.front_photo_of_id_card" 
			 		 		 >
			 		 	  </el-image>
			 		 	 <el-image style="width: 180px; height: 180px ;margin: 20px;"
			 		 	      :src="dialogValue.reverse_photo_of_id_card" 
			 		 	      >
			 		 	    </el-image>
			 		 		<el-image style="width: 180px; height: 180px;margin: 20px;"
			 		 		    :src="dialogValue.holding_id_card" 
			 		 		    >
			 		 		  </el-image> 
			 		 </div>
			 	   </div>
			 </el-dialog>
		</div>
		
	</div>
</template>

<script>
export default {
	data (){
		return {
			phone:'',
			realName:'',
			idNumber:'',
			state:'',
			page:0,
			size:20,
			totalSize:0,
			totalPage:0,
			currentPage:1,
			tableData:[{
				
			}
			],
			dialogValue:{},
			dialogVisible:false
		}
		
	},
	beforeMount(){
		this.userRealNameListPage();
	},
	methods:{
		dialogVisibleFn:function(item){
			this.dialogValue=item;
			this.dialogVisible=true;
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
		noTongguo:function(){
			this.$prompt('请输入不通过原因', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPlaceholder: '请输入原因注',
			}).then(({ value }) => {
			  
			}).catch(() => {
			
			});
		},
		userRealNameListPage:function(){
			this.http.post(this.api.userRealNameListPage,
			{
				phone:this.phone,
				realName:this.realName,
				state:this.state,
				page:this.currentPage,
				size:this.size
				
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
						this.totalPage=res.data.total_page;
			          }
			       });
		},
		updateRealNameState:function(userId,state){
			this.http.post(this.api.updateRealNameState,
			{
				userId:userId,
				state:state,
				
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
						
						//  this.totalSize=res.data.total_size;
						//  this.currentPage=res.data.current_page;
			          }
			       });
		}
	},
	filters:{
		shimingstateFilters:function(val){
			if(val==='PASS'){
				return '已通过'
			}else if(val==='TO_BE_REVIEWED'){
				return "待审核"
			}else if(val==='FAIL'){
				return "不通过"
			}else if(val==='NOT_COMMITTED'){
					return "未提交"
			}
		}
	}
}
</script>

<style>
	/* .main-box{
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
	.sign-waring{
		background-color: #eeeeee;
		border-left:4px solid #00aaff;
		padding-left: 10px;
		margin-bottom: 20px;
	} */
	/* .seach-box{
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
	.photo-box{
		display: flex;
		justify-content: space-around;
		width: 900px;
	}
	.photo-box-item{
		width: 280px;
	}
</style>
