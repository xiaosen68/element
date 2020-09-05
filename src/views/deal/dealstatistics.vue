<template>
	<div class="main-box">
		<div class="zh-head">
			 <el-button type="primary" autofocus plain size="small" @click="statistics=true">交易统计</el-button>
			  <el-button type="success" plain size="small" @click="statistics=false">交易汇总</el-button>
		</div>
		<div class="zh-info-box" v-show="statistics">
			<!-- 交易汇总表 -->
			<div>
				 <el-table
				    :data="collectDate"
				    stripe
				    style="width: 100%">
				    <el-table-column
				      prop="date"
				      label="统计日期" >
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="NP交易金额">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="Np交易笔数">
				    </el-table-column>
					<el-table-column
					  prop="address"
					  label="小额快捷金额">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="小额快捷笔数">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="消费金额">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="消费笔数">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="提现金额">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="提现笔数">
					</el-table-column>
				  </el-table>
				  <!-- 分页 -->
				  <el-pagination
				     layout="prev, pager, next"
				     :total="10">
				   </el-pagination>
			</div>
		
			
		</div>
		<div class="zh-info-box" v-show="!statistics">
			<div class="seach-box">
				<div class="seach-item">交易类型 <div class="search-input">  
					<el-select v-model="dealClass" placeholder="请选择" size="small"  :popper-append-to-body="false">
						<el-option
						  v-for="item in dealsClass"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select></div> 
				</div>
				<div class="seach-item">交易状态 
					<div class="search-input">
						<el-select v-model="dealStatus" placeholder="请选择" size="small"  :popper-append-to-body="false">
							<el-option
							  v-for="item in dealsStatus"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
					</div> 
				</div>
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
			<!-- 交易汇总图 -->
			<div  id="echarts_box" style="width: 600px;height:400px;"></div>	
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'
export default {
	data (){
		return {
			statistics:true,//统计显示
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
	mounted() {
		var myChart = echarts.init(document.getElementById('echarts_box'));
		
		        // 指定图表的配置项和数据
		        var option = {
					// type:'pie',
		            title: {
		                text: '日统计明细'
		            },
					toolbox:{
						 show: true,
						  feature:{
							dataView:{
								show:true
							},
							magicType: {
								type: [ 'bar', 'tiled','line']
							},
							restore:{
								show: true,   
							}
						  }
					},
		            tooltip:{
						trigger: 'axis'
					},
		            legend: {
		                data:['笔数','金额']
		            },
		            xAxis: [
					{
					    data: ["2/2","2/3","2/4","2/5","2/6","2/7"]
					}
					],
		            yAxis: [{
						type:'value',
						scale:true,
						name:'金额',
						max:15000,
						min:0,
						boundaryGap:[0.2,0.2]
					},{
						type:'value',
						scale:true,
						name:'笔数',
						max:100,
						min:0,
						boundaryGap:[0.2,0.2]
					}],
		            series: [{
		                name: '金额',
		                type: 'bar',
		                data: [500, 2000, 360, 100, 10000, 2000],
						yAxisIndex:0,
						itemStyle:{
							normal:{
								color:'#ff5500'
							}
						}
		            },
					{
					    name: '笔数',
					    type: 'line',
					    data: [5, 20, 36, 10, 10, 20],
						yAxisIndex:1,
						itemStyle:{
							normal:{
								lineStyle:{
									color:'#00ffff'
								}
							}
						}
					}]
		        };
		
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
	},
}
</script>

<style>
	  .jiaoyi-box{
		  line-height: 2em;
		  margin-top: -40px;
	  }
	  .user-box{
		 margin-top: -40px; 
	  }
	  .seach-date.search-input{
		width: 400px;  
	  }
	  .icon-item{
		  font-size: 24px;
		  /* vertical-align: middle; */
		  line-height: 50px;
		  margin-left: 20px;
	  }
</style>
