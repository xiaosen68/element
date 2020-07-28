<template>
	<div class="main-box">
		<div class="zh-head">交易信息</div>
		<div class="zh-info-box">
			<div class="seach-box">
				<div class="seach-item">手机号 <div class="search-input">  
				<el-input placeholder="请输入手机号" type="tel" maxlength="11" size="small"  v-model="tel"></el-input></div> </div>
				<div class="seach-item">姓名 <div class="search-input">  
				<el-input placeholder="请输入姓名" type="text" maxlength="5" size="small"  v-model="name"></el-input></div> </div>
				
				<div class="seach-item">交易单号 <div class="search-input">
				<el-input placeholder="请输入交易单号" type="tel" maxlength="11" size="small"  v-model="tel"></el-input></div> </div>
				<div class="seach-item">信用卡号 <div class="search-input">
				<el-input placeholder="请输入信用卡号" type="tel" maxlength="11" size="small"  v-model="tel"></el-input></div> </div>
				
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
					<div class="search-input">
						<el-date-picker style="width: 140px;"
						  v-model="date1"
						  type="date"
						  placeholder="选择日期"
						  size="small" >
						</el-date-picker>
					</div> 
				</div>
				
				<div class="seach-item"><el-button type="primary"  size="small ">查询</el-button></div>
				<div class="seach-item"><el-button type="warning"  size="small " icon="el-icon-download">导出表格</el-button></div>
			</div>
			<div class="hyinfo-box">
				<div class="sign-waring"> 交易总笔数: <b class="font-fei">123123</b>,交易总金额:<b class="font-fei">123123</b></div>
				  <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
					<el-table-column type="index"width="40"></el-table-column>
				    <el-table-column prop="date" label="交易日期" > </el-table-column>
				    <el-table-column prop="name" label="姓名/手机号">
						<template slot-scope="scope">
							<div>{{scope.row.name}}</div>
							<div>{{scope.row.tel | telFilter}}</div>
						</template>	
					</el-table-column>
				    <el-table-column prop="tel" label="用户信息">
						<template slot-scope="scope">
							  <el-button size="mini"  plain type="primary" @click="showUserInfo()">用户信息</el-button>
						</template>	
					</el-table-column>
					<el-table-column prop="money1" label="总金额"> </el-table-column>
					<el-table-column prop="feilv" label="刷卡费率"> </el-table-column>
					<el-table-column prop="money2" label="实际金额"> </el-table-column>
					<el-table-column prop="dingdan" label="订单编号"> 
						<template slot-scope="scope">
							<div>{{scope.row.dingdan | cardNumFilter}}</div>
							<el-button size="small" type="text" @click="jiaoyiShow()">查看详情</el-button>
						</template>	
					</el-table-column>
					<el-table-column prop="xinyongka" label="交易卡">
						<template slot-scope="scope">
							<div>{{scope.row.xinyongka.cardName}}</div>
							<div>{{scope.row.xinyongka.cardNum | cardNumFilter}}</div>
						</template>	
					</el-table-column>
					<el-table-column prop="tongdao" label="通道/状态">
						<template slot-scope="scope">
							<div>{{scope.row.tongdao}}</div>
							<div style="color: #67C23A;fontSize:12px" v-if="scope.row.status==='1'"><i class="el-icon-success" ></i>已成功</div>
							<div style="color: #E6A23C;fontSize:12px" v-else-if="scope.row.status==='2'"><i class="el-icon-warning" ></i>待处理</div>
							<div style="color: #F56C6C;fontSize:12px" v-else-if="scope.row.status==='3'"><i class="el-icon-error" ></i>已失败</div>
							<div style="color: #909399;fontSize:12px" v-else-if="scope.row.status==='4'"><i class="el-icon-info" ></i>待结算</div>
						</template>	
					</el-table-column>
					<el-table-column prop="miaoshu" label="描述"> </el-table-column>
				  </el-table>
			</div>
			<!-- 用户信息 -->
			<el-dialog  title="用户信息" :visible.sync="userInfoPopo"  width="60%" >
				<div class="user-box">
					<div>姓名：<b>{{userInfo.name}}</b></div>
					<div>手机号：<b>{{userInfo.tel}}</b></div>
					<div>身份证号：<b>{{userInfo.idCard}}</b></div>
					<div>银行名称：<b>{{userInfo.bankName}}</b></div>
					<div>银行卡号：<b>{{userInfo.bankNum}}</b></div>
					<div>用户上传照片：
									<el-image  style="width: 120px; height: 100px; margin-left: 20px; " v-for="item in userInfo.picList" :src="item"  :preview-src-list=" userInfo.picList"> </el-image>
					</div>
				</div>
			</el-dialog>
			<!-- 交易信息 -->
			<el-dialog  title="用户信息" :visible.sync="jiaoyiInfoPopo"  width="60%" >
				<div class="jiaoyi-box">
					<div>交易时间：<b>{{userInfo.name}}</b></div>
					<div>姓名：<b>{{userInfo.tel}}</b></div>
					<div>总金额：<b>{{userInfo.idCard}}</b></div>
					<div>刷卡费率：<b>{{userInfo.bankName}}</b></div>
					<div>商品订单号：<b>{{userInfo.bankNum}}</b></div>
					<div>交易订单号：<b>{{userInfo.bankNum}}</b></div>
					<div>支付通道：<b>{{userInfo.name}}</b></div>
					<div>出款卡：<b>{{userInfo.bankNum}}</b></div>
					<div>到账卡：<b>{{userInfo.bankNum}}</b></div>
					<div>商户订单编号：<b>{{userInfo.bankNum}}</b></div>
					<div>描述：<b>{{userInfo.name}}</b></div>
					<div>类型：<b>{{userInfo.name}}</b></div>
					<div>状态：<b>{{userInfo.name}}</b></div>
					<div>备注：<b>{{userInfo.name}}</b></div>
				</div>
			</el-dialog>
			<!-- 分页 -->
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
			userInfoPopo:false,//用户信息弹框
			userInfo:{
				name:'haha',
				tel:'12312312',
				idCard:'123123123213123',
				bankName:'民生银行',
				bankNum:'12312312312312312',
				picList:[require('../../assets/n1.jpg'),require('../../assets/n2.jpg'),require('../../assets/n3.jpg')],
			},
			jiaoyiInfoPopo:false,//交易详情信息弹框
			tel:'',
			name:'',
			date1:'',
			date2:'',
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
		 tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
				  tel:'13012131',
				  money1:'12312312',
				  feilv:1,
				  money2:2,
				  dingdan:'123123123123123123',
				  xinyongka:
					  {
						  cardName:'中国银行',
						  cardNum:'23123123123123'
					  }
				  ,
				  chuxvka:
					  {
						  cardName:'中国银行',
						  cardNum:'213123123123'
					  }
				  ,
				  tongdao:'KS小额',
				  status:'1',
				  miaoshu:'qwe',
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
				  tel:'13012131',
				  money1:'12312312',
				  feilv:1,
				  money2:2,
				  dingdan:'123123123123123123',
				  xinyongka:
					  {
						  cardName:'中国银行',
						  cardNum:'23123123123123'
					  }
				  ,
				  chuxvka:
					  {
						  cardName:'中国银行',
						  cardNum:'213123123123'
					  }
				  ,
				  tongdao:'KS小额',
				  status:'2',
				  miaoshu:'qwe',
		        },{
		          date: '2016-05-02',
		          name: '王小虎',
				  tel:'13012131',
				  money1:'12312312',
				  feilv:1,
				  money2:2,
				  dingdan:'123123123123123123',
				  xinyongka:
					  {
						  cardName:'中国银行',
						  cardNum:'23123123123123'
					  }
				  ,
				  chuxvka:
					  {
						  cardName:'中国银行',
						  cardNum:'213123123123'
					  }
				  ,
				  tongdao:'KS小额',
				  status:'3',
				  miaoshu:'qwe',
		        },{
		          date: '2016-05-02',
		          name: '王小虎',
				  tel:'13012131',
				  money1:'12312312',
				  feilv:1,
				  money2:2,
				  dingdan:'123123123123123123',
				  xinyongka:
					  {
						  cardName:'中国银行',
						  cardNum:'23123123123123'
					  }
				  ,
				  chuxvka:
					  {
						  cardName:'中国银行',
						  cardNum:'213123123123'
					  }
				  ,
				  tongdao:'KS小额',
				  status:'4',
				  miaoshu:'qwe',
		        },
				],
		}
	},
	methods:{
		beizhuFn:function(item){
			console.log(item)
		},
		showUserInfo:function(){
			this.userInfoPopo=true;
		},
		jiaoyiShow:function(){
			this.jiaoyiInfoPopo=true;
		}
	},
	filters:{
		cardNumFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		},
		telFilter:function(value){
			return value.substring(0,3)+'***'+value.substring(value.length-4)
		}
	}
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
</style>
