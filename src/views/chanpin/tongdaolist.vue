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
			      prop="tdId"
			      label="id"
				  width="80">
			    </el-table-column>
			    <el-table-column
			      prop="tdName"
			      label="通道原始名称">
			    </el-table-column>
				<el-table-column
				  prop="tdXsName"
				  label="通道显示名称">
				  <template slot-scope="scope">
					<el-input v-model="scope.row.tdXsName"></el-input>
					</template>
				</el-table-column>
				<el-table-column
				  prop="tdStatus"
				  label="状态"
				  width="140">
				  <template slot-scope="scope">
						<el-switch
						  style="display: block"
						  v-model="scope.row.tdStatus"
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
						<div class="pop-box-item" v-for="item in scope.row.feilvList">
							<div class="pop-input-title">{{item.name}}</div>
							<div class="pop-input-box"><el-input v-model="item.feilv"></el-input></div>
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
				  prop="sxfei"
				  label="手续费" width="80">
				  <template slot-scope="scope">
					<el-input v-model="scope.row.sxfei"></el-input>
				</template>
				</el-table-column>
			    <el-table-column
			      prop="bankList"
			      label="支持列表" width="80">
				    <template slot-scope="scope">
						<el-popover trigger="click" placement="top">
							<div class="td-bank-box">
								<div class="td-bank" :style="{backgroundColor:random()}" v-for="item in scope.row.bankList">{{item.name}}</div>
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
							      v-model="bankNum">
							    </el-input>
							  <div style="text-align: center; margin: 6px">
							    <el-button size="mini" type="info" @click="bankVisible=false">取消</el-button>
							    <el-button type="success" size="mini" @click="bankVisible=false">确定</el-button>
							  </div>
							 
							</el-popover>
							 <el-button  size="mini"  type="info" plain @click="addBankFn()">添加</el-button>
							
							<el-button slot="reference" size="mini" type="success">查看</el-button>
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
				 bankNum:'',
				 changeTong:'',//要修改的通道；赋值
				 tongdaoList:[
				 				 {
				 					 tdName:'NP消费',
				 					 tdXsName:'GP消费',
				 					 tdId:'2131',
				 					 sxfei:'3.00',
									 tdStatus:true,
				 					 feilvList:[
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 },
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 },
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 },
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 },
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 },
										 {
											 name:'基础费率',
											 feilv:'2.1%',
										 }
				 					 ],
				 					 bankList:[
										 {
											name:'工商银行',
											 bankNum:'BDII'
										 },
										 {
										 											name:'工商银行',
										 											 bankNum:'BDII'
										 },
										 {
										 											name:'工商银行',
										 											 bankNum:'BDII'
										 },
										 {
										 											name:'工商银行',
										 											 bankNum:'BDII'
										 },
									 ],
				 				 },
								 {
								 				 					 tdName:'NP消费',
								 				 					 tdXsName:'GP消费',
								 				 					 tdId:'2131',
								 				 					 sxfei:'3.00',
								 									 tdStatus:true,
								 				 					 feilvList:[
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.2%',
								 										 },
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.1%',
								 										 },
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.1%',
								 										 },
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.1%',
								 										 },
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.1%',
								 										 },
								 										 {
								 											 name:'基础费率',
								 											 feilv:'2.1%',
								 										 }
								 				 					 ],
								 				 					 bankList:[
								 										 
								 									 ],
								 }
				 ]
			 }
		 },
		 methods:{
			 addBankFn:function(){
				 this.bankVisible=true;
			 },
			 random:function(){
				 let colorList=['#409eff','#55ff7f','#ff5500','#0055ff','#00aa00','#00aaff','#ff55ff'];
				 return colorList[Math.floor(Math.random()*7)]
			 },
			 feiSureFn:function(n){
				 
				this.changeTong=n
				console.log(this.changeTong)
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
				 this.changeTong=n
				 console.log(this.changeTong)
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
