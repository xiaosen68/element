<template>
	<div class="main-box">
		<div class="zh-head">平台信息推送</div>
		<div class="zh-info-box">
			<div class="information-box">
				<el-button type="primary" size="small" @click="dialogFormVisible=!dialogFormVisible"> 信息推送</el-button>
			</div>
			<el-dialog title="推送平台消息" :visible.sync="dialogFormVisible">
			  <el-form :model="form">
			    <el-form-item label="推送结束时间" :label-width="formLabelWidth">
			        <el-date-picker
			            v-model="form.endDate"
			            type="datetime"
			            placeholder="选择日期时间">
			          </el-date-picker>
			    </el-form-item>
			    <el-form-item label="推送标题" :label-width="formLabelWidth">
			      <el-input v-model="form.title" autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="推送人员等级" :label-width="formLabelWidth">
				  <el-select v-model="form.people" placeholder="请选择">
				      <el-option
				        v-for="item in options"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="推送内容" :label-width="formLabelWidth">
				  <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" style="text-align: center;">
			    <el-button type="primary" @click="dialogFormVisible = false">推送信息</el-button>
			  </div>
			</el-dialog>
			<div class="information-list">
				<el-table
				    :data="tableData"
				    stripe
				    style="width: 100%">
					 <el-table-column
					      type="index"
					      width="50">
					    </el-table-column>
				    <el-table-column
				      prop="startDate"
				      label="创建日期"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      prop="endDate"
				      label="结束日期"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      prop="title"
				      label="标题"
					  width="140">
				    </el-table-column>
					<el-table-column
					  prop="people"
					  label="推送等级"
					  width="100">
					</el-table-column>
					<el-table-column
					  prop="content"
					  label="内容" width="440px">
					</el-table-column>
					<el-table-column
					  prop="title"
					  label="操作">
					  <template slot-scope="scope">
							 <el-button type="danger" size="mini">删除</el-button>
					  </template>
					</el-table-column>
				  </el-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			form:{
				endDate:'',
				title:'',
				content:'',
				people:'',
			},
			options:[{
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
				},{
				value:'7',
				label:'不限等级'
				},
			],
			dialogFormVisible:false,//推送弹框
			formLabelWidth:'120px',
			tableData:[{
				startDate:'2020/02/20 23:12:12',
				endDate:'2020/02/20 23:12:12',
				title:'很重很重要很重要要',
				people:'不限',
				content:'啊实打实大多撒所大所大所多',
			}]
		}
	},
	methods:{
		
		},
}
</script>

<style>
.information-box{
	width: 200px;
	float: right;
	margin: 10px 0;
	}
</style>
