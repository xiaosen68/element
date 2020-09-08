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
				      prop="days"
				      label="统计日期" >
				    </el-table-column>
				    <el-table-column
				      prop="totalTransactionPrice"
				      label="NP交易金额">
				    </el-table-column>
				    <el-table-column
				      prop="tiaoshu"
				      label="Np交易笔数">
				    </el-table-column>
					
				  </el-table>
				  <!-- 分页 -->
				  <el-pagination
				    layout="prev, pager, next"
				    :total="totalSize"
				    :page-size="size"
				     :current-page.sync="currentPage"
				    @current-change="dealstatisticFn"
				    @prev-click="prevFn"
				    @next-click="nextFn">
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
				<div class="seach-item">天数
					<div class="search-input">
					<el-input placeholder="天数" type="tel" 
					maxlength="11" size="small"  v-model="days"></el-input></div>
				</div>
				
				<div class="seach-item"><el-button type="primary"  size="small " @click="gethuizongFn">查询</el-button></div>
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
			days:10,
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
				
			}],
			dayList:[],
			totalTransactionPrice:[],
			tiaoshu:[],
			currentPage:0,
			size:20,
			totalSize:0,
		 }
	},
	beforeMount() {
			this.dealstatisticFn();
			// this.gethuizongFn();
	},
	methods:{
		prevFn:function(){
			if(this.currentPage>1){
					this.currentPage--;
			}
		},
		nextFn:function(){
			if(this.currentPage<this.totalPage){
					this.currentPage++;
			}
		},
		beizhuFn:function(item){
			console.log(item)
		},
		gethuizongFn:function(){
			this.currentPage=1;
			this.size-this.days;
			this.dealstatisticFn();
		},
		gethuizongdata:function(){
			let _this=this;
			_this.collectDate.forEach((item)=>{
				_this.dayList.push(item.days);
				_this.tiaoshu.push(item.tiaoshu);
				_this.totalTransactionPrice.push(item.totalTransactionPrice)
			})
		},
		// 获取数据
		dealstatisticFn:function(){
			this.http.post(this.api.transactionStatistics,
			{
				 page:this.currentPage,
				size:this.size,
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.collectDate=res.data.list; 
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
			          }
			       });
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
		let _this=this;
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
					    data: _this.dayList
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
		                data: _this.totalTransactionPrice,
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
					    data: _this.tiaoshu,
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
