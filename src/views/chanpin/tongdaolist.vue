<template>
	<div class="main-box">
		<div class="zh-head">通道列表 </div>
		<el-button ref="popo" id="popo-btn" ></el-button>
		<div class="zh-info-box">
			  <el-table
			    :data="tongdaoList"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="id"
				  width="60">
			    </el-table-column>
			    <el-table-column
			      prop="displayName"
			      label="通道原始名称">
			    </el-table-column>
				<el-table-column
				  prop="passageWayName"
				  label="通道显示名称">
				  <template slot-scope="scope">
					<el-input v-model="scope.row.passageWayName"></el-input>
					</template>
				</el-table-column>
				<el-table-column
				  prop="passageWayStatus"
				  label="状态"
				  width="140">
				  <template slot-scope="scope">
						<el-switch
						  style="display: block"
						  v-model="scope.row.passageWayStatus"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  active-text="使用"
						  inactive-text="维护">
						</el-switch>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="feilvList"
				  label="通道费率" width="80">
				  <template slot-scope="scope">
				  	<el-popover trigger="click" placement="top"  @show="popoverShow(scope.row)">
						<!-- <div class="pop-box-item" v-for="item in scope.row.feilvList">
							<div class="pop-input-title">{{item.name}}</div>
							<div class="pop-input-box"><el-input v-model="item.feilv"></el-input></div>
						</div> -->
						<div class="pop-box-item">
							<div class="pop-input-title">基础费率</div>
							<div class="pop-input-box"><el-input v-model="scope.row.baseRate"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">创始合伙人</div>
							<div class="pop-input-box"><el-input v-model="scope.row.foundingPartner"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">联合创始人</div>
							<div class="pop-input-box"><el-input v-model="scope.row.coFounder"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">高级合伙人</div>
							<div class="pop-input-box"><el-input v-model="scope.row.seniorPartner"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">业务合伙人</div>
							<div class="pop-input-box"><el-input v-model="scope.row.businessParter"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">VIP用户</div>
							<div class="pop-input-box"><el-input v-model="scope.row.vipMembers"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">普通用户</div>
							<div class="pop-input-box"><el-input v-model="scope.row.ordinaryUsers"></el-input></div>
						</div>
						<div class="pop-box-item">
							<div class="pop-input-title">消费费率</div>
							<div class="pop-input-box"><el-input v-model="scope.row.baseRate"></el-input></div>
						</div>
						
						<div class="pop-btn-box">
							<el-button  size="mini" type="warning" @click="feiSureFn(scope.row)">确定</el-button>
							<el-button  size="mini" type="info"  @click="feiCancleFn">取消</el-button>
						</div>
						 <el-button slot="reference" size="mini" type="success">查看</el-button>
					</el-popover>	
				  </template>
				</el-table-column>
				<el-table-column
				  prop="singleAdditionalHandlingCharge"
				  label="手续费" width="80">
				  <template slot-scope="scope">
					<el-input v-model="scope.row.singleAdditionalHandlingCharge"></el-input>
				</template>
				</el-table-column>
			    <el-table-column
			      prop="bankList"
			      label="支持列表" width="80">
				    <template slot-scope="scope">
						<el-popover trigger="click" placement="top">
							<div class="td-bank-box">
								<div class="td-bank" :style="{backgroundColor:random()}" v-for="item in bankList">{{item.passageWayBankName}}</div>
							</div>
							<el-popover
							  placement="top"
							  width="160"
							  v-model="bankVisible">
							 <el-input
							    placeholder="请输入银行名称"
							   
							    v-model="bankName">
							  </el-input>
							   <el-input
							      placeholder="请输入银行编码"
							      v-model="bankCode">
							    </el-input>
							  <div style="text-align: center; margin: 6px">
							    <el-button size="mini" type="info" @click="bankVisible=false">取消</el-button>
							    <el-button type="success" size="mini" @click="addSureBankFN()">确定</el-button>
							  </div>
							 
							</el-popover>
							 <el-button  size="mini"  type="info" plain @click="addBankFn()">添加</el-button>
							
							<el-button slot="reference" size="mini" type="success" @click="lookBankList(scope.row.id)">查看</el-button>
						</el-popover>
					</template>
			    </el-table-column>
				<el-table-column
				  prop="bankList"
				  label="操作">
				   <template slot-scope="scope">
				   		 <el-button slot="reference" size="mini" type="danger"  @click="changeTdFn(scope.row)">修改</el-button>
						<el-button slot="reference" size="mini" type="info"  @click="changeTdFn(scope.row)">取消</el-button>
					</template>
				</el-table-column>
			  </el-table>
		</div>
	
	</div>
</template>

<script>
	 export default{
		 data (){
			 return {
				 bankVisible:false,
				 bankName:'',
				 bankCode:'',
				 tongdaoId:'',
				 tongdaoList:[
				 				 
				 ],
				 bankList:[],
			 }
		 },
		 created() {
		 	this.http.post(this.api.getPassageWay,
		 	{
				page:1,
				size:30
		 	
		 	},sessionStorage.getItem('token')).then(res => {
		 		console.log(res)
		 	          if(res.code == 0){
						  this.tongdaoList=res.data.list;
		 				  // this.refreshLable();
		 	          }
		 	       });
		 },
		 methods:{
			 lookBankList(id){
				this.http.post(this.api.getPassageWayBankByPassageWayId,
				{page:1,size:100,passageWayId:id},sessionStorage.getItem('token')).then(res => {
				          if(res.code == 0){
							  console.log(res)
							  this.bankList=res.data.list;
							  // this.jsGoods.productUrl=res.data
				          }
				       }); 
				  	this.tongdaoId=id; 
			 },
			 addBankFn:function(){
				 this.bankVisible=true;
			 },
			 addSureBankFN(){
			 				 this.http.post(this.api.addPassageWayBank,
			 				 				 {passageWayBankName:this.bankName,bankCode:this.bankCode,passageWayId:this.tongdaoId},sessionStorage.getItem('token')).then(res => {
			 				 				           if(res.code == 0){
			 				 				 			  console.log(res)
			 				 				           }
			 				 				        }); 
			 				 },
			 random:function(){
				 let colorList=['#409eff','#55ff7f','#ff5500','#0055ff','#00aa00','#00aaff','#ff55ff'];
				 return colorList[Math.floor(Math.random()*7)]
			 },
			 feiSureFn:function(n){
				 
				this.changeTong=n
				this.http.post(this.api.updatePassageWayRate,
				n,sessionStorage.getItem('token')).then(res => {
									   if(res.code == 0){
										  console.log(res)
									   }
									}); 
				this.$refs.popo.$el.click()
				this.changeTong=''
				
			 },
			 popoverShow:function(n){
				 this.changeTong=n
			 },
			 feiCancleFn:function(){
				 this.changeTong='';
				 this.$refs.popo.$el.click()
				 console.log(this.changeTong)
			 },
			 changeTdFn:function(n){
				 this.http.post(this.api.updatePassageWay,
			 n,sessionStorage.getItem('token')).then(res => {
					   if(res.code == 0){
						  console.log(res)
					   }
					}); 
			 }
		 }
	 }
</script>

<style>
	.pop-box-item{
		width: 200px;
	}
	.pop-input-title{
		display: inline-block;
		width: 100px;
	}
	.pop-input-box{
		display: inline-block;
		width: 100px;
	}
	.pop-btn-box{
			display: flex;
			margin-top: 6px;
			justify-content: space-around;
	}
	#popo-btn{
		width: 0;
		height: 0;
		border: none;
		padding: 0;
		margin: 0;
		
	}
	.td-bank-box{
		display: flex;
		flex-wrap: wrap;
		max-width: 400px;
	}
	.td-bank{
		display: inline-block;
		padding: 4px 8px;
		background-color: #00AAFF;
		border-radius: 4px;
		line-height: 20px;
		font-size: 12px;
		color: #FFFFFF;
		margin: 6px;
	}
</style>
