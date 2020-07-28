<template>
	<div class="main-box">
		<div class="zh-head">实名审核 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
					<el-input placeholder="请输入内容" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="tel"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
					<el-input placeholder="请输入内容" type="text" maxlength="5" prefix-icon="el-icon-search" v-model="name"></el-input></div> </div>
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
			</div>
			</div>
			<div class="sign-waring"> 待审核列表</div>
			<el-table  :data="tableData"  stripe style="width: 100%">
				<el-table-column type="index"  width="50"> </el-table-column>
			    <el-table-column  prop="date1" label="注册日期" width="100">   </el-table-column>
				<el-table-column  prop="date2" label="提交日期" width="100">   </el-table-column>
			    <el-table-column  prop="name" label="姓名" width="60"> </el-table-column>
				<el-table-column  prop="tel" label="手机号"  > </el-table-column>
				<el-table-column  prop="idCard" label="身份证号" > </el-table-column>
				<el-table-column  prop="photo" label="查看照片" >
					<template slot-scope="scope">
					<el-popover  placement="right"trigger="click">
						<div class="photo-box">
							<el-image style="width: 280px; height: 280px"
							    :src="item" 
							    v-for="item in scope.row.photoList">
							  </el-image>
						</div>
						<el-button size="small"  slot="reference" @click="">查看</el-button>
					 </el-popover>
					</template >
				</el-table-column>
				<el-table-column   label="操作"  > 
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="">通过</el-button>
						<el-button size="small" type="text" @click="noTongguo()">不通过</el-button>
					</template>
				</el-table-column>
				<el-table-column  prop="zhuangtai" label="审核状态"> 
				</el-table-column>
			</el-table>
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
			tel:'',
			name:'',
			tableData:[{
				date1:'2020-02-21 12:23:32',
				date2:'2020-02-21 12:23:32',
				name:'小黑',
				tel:'13017102923',
				idCard:'123123123213123',
				photoList:{
					ph1:require('../../assets/n1.jpg'),
					ph2:require('../../assets/n2.jpg'),
					ph3:require('../../assets/n3.jpg')
				}
			},
			{
				date1:'2020-02-21 12:23:32',
				date2:'2020-02-21 12:23:32',
				name:'小黑',
				tel:'13017102923',
				idCard:'123123123213123',
				photoList:{
					ph1:'',
					ph2:'',
					ph3:''
				}
			},
			]
		}
	},
	methods:{
		noTongguo:function(){
			this.$prompt('请输入不通过原因', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputPlaceholder: '请输入原因注',
			}).then(({ value }) => {
			  
			}).catch(() => {
			
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
