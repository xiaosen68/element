<template>
	<div class="main-box">
		<div class="zh-head">会员信息 </div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入内容" type="tel" maxlength="11" prefix-icon="el-icon-search" v-model="tel"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
				<el-input placeholder="请输入内容" type="text" maxlength="5" prefix-icon="el-icon-search" v-model="name"></el-input></div> </div>
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
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 平台注册人数: <b class="font-fei">123123</b>,平台实名人数:<b class="font-fei">123123</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
				    <el-table-column prop="date" label="注册日期" > </el-table-column>
				    <el-table-column prop="name" label="姓名"></el-table-column>
				    <el-table-column prop="tel" label="手机号"> </el-table-column>
					<el-table-column prop="houtaiNum" label="后台登录账号"> </el-table-column>
					<el-table-column prop="shiming" label="实名状态"> 
						<template slot-scope="scope">
							<div class="shiming-status1" v-if="scope.row.shiming===1">已实名</div>
							<div class="shiming-status2" v-else>未提交</div>
						</template>
					</el-table-column>
					<el-table-column prop="dengji" label="代理等级"> </el-table-column>
					<el-table-column prop="dengji" label="查看上级">
						<template slot-scope="scope">
						        <el-popover trigger="hover" placement="top">
						        <el-table :data="scope.row.shangji">
									 <el-table-column prop="guanxi" label="关系" width="80"></el-table-column>
									 <el-table-column prop="name" label="姓名" width="80"></el-table-column>
									 <el-table-column prop="dengji" label="等级" width="60"> </el-table-column>
									 <el-table-column prop="tel" label="手机号" width="120"> </el-table-column>
								</el-table>
						          <div slot="reference" class="name-wrapper">
						            <el-tag size="medium">{{ scope.row.name }}</el-tag>
						          </div>
						        </el-popover>
						      </template>
					</el-table-column>
					<el-table-column prop="dengji" label="查看下级">
						<template slot-scope="scope">
							<el-button size="small" @click="lowerFn(scope.row.tel)">下级</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="dengji" label="收益"> </el-table-column>
						<el-table-column prop="dengji" label="积分"> </el-table-column>
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
			   :before-close="handleClose">
				<div class="dialog-box-item"> 
					<span class="dialog-box-title">注册时间：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">注册品牌：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">手机号：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">实名状态：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">实名审核：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">账户余额：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">账户积分：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">总收益：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">收益余额：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">账户提现：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
				<div class="dialog-box-item">
					<span class="dialog-box-title">额外手续费：</span> 
					<span class="dialog-box-value">{{dialogValue.date}}</span>
				</div>
			 </el-dialog>
			 <!-- 下级弹框 -->
			 <el-dialog :title="lowerDialogtitle" :visible.sync="lowerDialogTableVisible" width="80%">
			   <el-table :data="lowerDate">
			     <el-table-column property="date" label="日期" width="100"></el-table-column>
				 <el-table-column property="pinpai" label="品牌" width="100"></el-table-column>
			     <el-table-column property="name" label="姓名" width="80"></el-table-column>
			     <el-table-column property="tel" label="手机号"></el-table-column>
				 <el-table-column property="dengji" label="等级"></el-table-column>
				 <el-table-column property="dengji" label="查看下级">
					 <template slot-scope="scope">
					 	<el-button size="small" @click="lowerFn(scope.row.tel)">下级</el-button>
					 </template>
				 </el-table-column>
				 <el-table-column property="yue" label="余额"></el-table-column>
				 <el-table-column property="tel" label="冻结余额"></el-table-column>
				 <el-table-column property="tel" label="账户积分"></el-table-column>
				 <el-table-column property="tel" label="收益余额"></el-table-column>
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
			tel:'',
			name:'',
			shiming:'',
			dengji:'',
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
		 tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
				  tel:'13012131',
				  houtaiNum:'12312312',
				  shiming:1,
				  shangpu:2,
				  dengji:0,
				  xinyongka:[
					  {
						  cardName:'中国银行',
						  cardNum:'23123123123123'
					  }
				  ],
				  chuxvka:[
					  {
						  cardName:'中国银行',
						  cardNum:'213123123123'
					  }
				  ],
				  beizhu:'qwe',
				  shangji:[
					  {
						  guanxi:'上级',
						  name:'哈哈',
						  dengji:'1',
						  tel:'1213213123'
					  }
				  ],
		          address: '上海市普陀区金沙江路 1518 弄'
		        },
				{
				  date: '2016-05-02',
				  name: '王小虎',
				  tel:'13012131',
				  shiming:1,
				  shangpu:1,
				  dengji:0,
				  shangji:[
					  {
						  guanxi:'上级',
						  name:'哈哈',
						  dengji:'1',
						  tel:'1213213123'
					  }
				  ],
				  address: '上海市普陀区金沙江路 1518 弄'
				}, 
				{
				  date: '2016-05-02',
				  name: '王小虎',
				  tel:'13012131',
				  shiming:1,
				  shangpu:1,
				  dengji:0,
				  shangji:[
					  {
						  guanxi:'上级',
						  name:'哈哈',
						  dengji:'1',
						  tel:'1213213123'
					  }
				  ],
				  address: '上海市普陀区金沙江路 1518 弄'
				}, 
				],
		}
	},
	methods:{
		beizhuFn:function(item){
			console.log(item)
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
