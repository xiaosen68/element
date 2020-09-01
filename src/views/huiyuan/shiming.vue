<template>
	<div class="main-box">
		<div class="zh-head">实名审核 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
					<el-input placeholder="请输入内容" type="tel" maxlength="11" 
					prefix-icon="el-icon-search" v-model="phone"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
					<el-input placeholder="请输入内容" type="text" maxlength="5"
					 prefix-icon="el-icon-search" v-model="realName"></el-input></div> </div>
				<div class="seach-item"><el-button type="primary"  size="small " @click="userRealNameListPage">查询</el-button></div>
			</div>
			</div>
			<div class="sign-waring"> 待审核列表</div>
			<el-table  :data="tableData"  stripe style="width: 100%">
				<el-table-column type="index"  width="50"> </el-table-column>
			    <el-table-column  prop="create_time" label="注册日期" width="100">   </el-table-column>
				<el-table-column  prop="update_time" label="提交日期" width="100">   </el-table-column>
			    <el-table-column  prop="real_name" label="姓名" width="60"> </el-table-column>
				<el-table-column  prop="phone" label="手机号"  > </el-table-column>
				<el-table-column  prop="id_number" label="身份证号" > </el-table-column>
				<el-table-column  prop="photo" label="查看照片" >
					<template slot-scope="scope">
					<el-popover  placement="right"trigger="click">
						<div class="photo-box">
							<el-image style="width: 280px; height: 280px"
							    :src="scope.row.front_phone_of_id_card" 
							    >
							  </el-image>
							  <el-image style="width: 280px; height: 280px"
							      :src="scope.row.reverse_phone_of_id_card" 
							      >
							    </el-image>
								<el-image style="width: 280px; height: 280px"
								    :src="scope.row.holding_id_card" 
								    >
								  </el-image>
						</div>
						<el-button size="small"  slot="reference" @click="">查看</el-button>
					 </el-popover>
					</template >
				</el-table-column>
				<el-table-column   label="操作"  > 
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="updateRealNameState(scope.row.user_id,'PASS')">通过</el-button>
						<el-button size="small" type="text" @click="updateRealNameState(scope.row.user_id,'FAIL')">不通过</el-button>
					</template>
				</el-table-column>
				<el-table-column  prop="zhuangtai" label="审核状态"> 
				</el-table-column>
			</el-table>
			<!-- 主页面分页 -->
			<el-pagination
			   layout="prev, pager, next"
			   :total="totalSize"
			   :page-size="size"
			    :current-page.sync="currentPage"
			   @current-change="userRealNameListPage"
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
			phone:'',
			realName:'',
			idNumber:'',
			state:'',
			page:0,
			size:20,
			totalSize:'',
			currentPage:0,
			tableData:[{
				
			}
			]
		}
	},
	beforeMount(){
		this.userRealNameListPage();
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
				page:this.page,
				size:this.currentPage
				
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
