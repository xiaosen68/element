<template>
	<div class="main-box">
		<div class="zh-head">用户分润明细</div>
		<div class="zh-info-box" >
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small"  v-model="tel1"></el-input></div> </div>
				<div class="seach-item">收益人手机号 <div class="search-input">
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small"  v-model="tel2"></el-input></div> </div>
				<div class="seach-item">交易流水号 <div class="search-input">
				<el-input placeholder="请输入交易流水号" type="text" maxlength="20" size="small"  v-model="dealNum"></el-input></div> </div>
				<div class="seach-item">日期
					<div class="search-input seach-date">
						  <el-date-picker
							value-format='yyyy-MM-dd'
						      v-model="selectDate"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
							  :picker-options='pickerOption'
							  >
						    </el-date-picker>
					</div> 
				</div>
				
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
				
			</div>
			<!-- 交易汇总表 -->
			<div>
				 <el-table
				    :data="collectDate"
				    stripe
					size="small"
				    style="width: 100%">
					<el-table-column
					  prop="superior"
					  label="上级" width="60px" >
					</el-table-column>
				    <el-table-column
				      prop="dealDate"
				      label="交易时间" >
				    </el-table-column>
				    <el-table-column
				      prop="dealName"
				      label="刷卡人">
					  <template slot-scope="scope">
						  <p>{{scope.row.dealName}}</p>
						  <p>{{scope.row.dealTel | telFilter}}</p>
					  </template>
				    </el-table-column>
				    <el-table-column
				      prop="dealNum"
				      label="交易流水号" >
				    </el-table-column>
					<el-table-column
					  prop="dealNum"
					  label="分润">
					 <template slot-scope="scope">
					 	<el-popover trigger="click" placement="top" width="800">
							<div class="popover-head-box">分润详情（注意：还款消费不产生分润）</div>
							<div class="popover-header-status">
								交易时间:29292992898 交易流水号：21312312312321323消费金额：12312
							</div>
								<el-table :data="collectDate" >
								    <el-table-column  property="date" label="上级"></el-table-column>
								    <el-table-column property="name" label="姓名"></el-table-column>
								    <el-table-column property="address" label="手机号"></el-table-column>
									<el-table-column  property="date" label="刷卡费率"></el-table-column>
									<el-table-column  property="name" label="上级姓名"></el-table-column>
									<el-table-column   property="address" label="上级手机号"></el-table-column>
									<el-table-column  property="date" label="费率"></el-table-column>
									<el-table-column   property="name" label="分润金额"></el-table-column>
									<el-table-column  property="address" label="分润备注"></el-table-column>
								  </el-table>
							 <el-button slot="reference" size="mini" type="success">查看</el-button>
						</el-popover>	
					 </template>
					</el-table-column>
					<el-table-column
					  prop="dealMoney"
					  label="交易金额">
					</el-table-column>
					<el-table-column
					  prop="dealFeilv"
					  label="交易费率">
					</el-table-column>
					<el-table-column
					  prop="superiorName"
					  label="受益人">
					  <template slot-scope="scope">
						  <p>{{scope.row.superiorName}}</p>
						  <p>{{scope.row.superiorTel | telFilter}}</p>
					  </template>
					</el-table-column>
					<el-table-column
					  prop="superiorFeilv"
					  label="费率">
					</el-table-column>
					<el-table-column
					  prop="superiorMoney"
					  label="获得分润">
					</el-table-column>
					<el-table-column
					  prop="superiorStatus"
					  label="分润备注">
					</el-table-column>
				  </el-table>
				  <!-- 分页 -->
				  <el-pagination
				     layout="prev, pager, next"
				     :total="10">
				   </el-pagination>
			</div>
		
			
		</div>
		
	</div>
</template>

<script>

export default {
	data (){
		return {
			tel1:'',//手机号
			tel2:'',//受益人手机号
			dealNum:'',//交易流水号
			selectDate:[],//日期范围
			pickerOption:{//日期选择器配置
				disabledDate:function(newDate){
					if(Date.parse(newDate)>Date.parse(new Date())){
						return true
					}else{
						return false
					}
				}
			},
			dealClass:'',
			dealStatus:'',
			dealsClass:[
				{
				value:'1',
				label:'全部'
				},
				{
				value:'2',
				label:'NP交易'
				},
				{
				value:'3',
				label:'小额快捷'
				},
			],
			dealsStatus:[
				{
				value:'1',
				label:'交易已成功'
				},
				{
				value:'2',
				label:'交易待处理'
				},
				{
				value:'3',
				label:'交易失败'
				},
				{
				value:'4',
				label:'交易待结算'
				}
			],
			collectDate:[{
				superior:'0',
				superiorName:'请问',
				superiorTel:'12312312312',
				superiorFeilv:'0.0012',
				superiorMoney:'122',
				superiorStatus:'品牌自清',
				dealDate:'1212/01/21 12:12:32',
				dealName:'订单',
				dealTel:'1231231212',
				dealNum:'2132313123123123123',
				dealMoney:'21321',
				dealFeilv:'0.0012',
				
			}]
		 }
	},
	methods:{
		beizhuFn:function(item){
			console.log(item)
		},
	},
	filters:{
		cardNumFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
		telFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		}
	},
	
}
</script>

<style>
	.popover-head-box{
		line-height: 2em;
		font-size: 14px;
		font-weight: 600;
		width: 100%;
	}
	.popover-header-status{
		line-height: 2em;
		border-left: 4px solid #00AAFF;
		padding-left: 10px;
		margin-top: 6px;
		background-color: #f5f5f5;
		width: 100%;
	}
</style>
