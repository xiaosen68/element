<template>
	<div class="main-box">
		<div class="zh-head">商品列表  <el-switch
		  style="display: inline-block;margin-left: 20px;"
		  v-model="goodsClass"
		  @change="getGoodsList"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  active-text="寄售"
		  inactive-text="消费">
		</el-switch></div>
		<!-- 寄售 -->
		<div class="zh-info-box" v-if="goodsClass">
			<div class="hyinfo-box">
			  <el-table
			    :data="jsTableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="商品ID"
			      width="70">
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="商品名称"
			      width="180">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.productName"></el-input>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="amount"
				  label="商品数量"
				  width="180">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.amount"></el-input>
				  </template>
				</el-table-column>
			    <el-table-column
			      prop="transactionPrice"
			      label="成交价">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.transactionPrice"></el-input>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="mailingPrice"
				  label="挂牌价">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.mailingPrice"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="productUrl"
				  label="图片">
				  <template slot-scope="scope">
					  <img class="product-img-scope" :src="scope.row.productUrl|changUrl" />
					<!--  <el-image
					       style="width: 100px; height: 100px"
					       :src="scope.row.productUrl"
					       fit="contain"></el-image> -->
				  </template>
				</el-table-column>
				<el-table-column
				  prop="state"
				  label="上下架">
				  <template slot-scope="scope">
					  <el-switch
					    v-model="scope.row.state"
					    active-color="#13ce66"
					    inactive-color="#ff4949"
						active-value="ON_THE_SHELF"
						inactive-value="OFF_THE_SHELF"
							>
					  </el-switch>
				  </template>
				</el-table-column>
				<el-table-column
				prop="id"
				  label="操作">
				  <template slot-scope="scope">
					  <el-button type="success" size="mini" round @click="changeJsGoods(scope.row)">修改</el-button>
				  </template>
				</el-table-column>
			  </el-table>
			  </div>
			  <!-- 页码 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="jtotalSize"
			     :page-size="size"
			      :current-page.sync="jcurrentPage"
			     @current-change="getGoodsList"
			     @prev-click="prevFn"
			     @next-click="nextFn"
			     >
			   </el-pagination>
		</div>
		<!-- 消费 -->
		<div class="zh-info-box" v-else>
			<div class="hyinfo-box">
			  <el-table
			    :data="xsTableDate"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="商品ID"
			      width="70">
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="商品名称"
			      width="120">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.productName"></el-input>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="transactionPrice"
			      label="成交价"  width="90">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.transactionPrice"></el-input>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="store"
				  label="商户"  width="90">
				  <template slot-scope="scope">
					  <!-- {{scope.row.store}} -->
				  		<el-input v-model="scope.row.store"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="discount"
				  label="折扣" width="80">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.discount" max="1" min="0.1"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="amount"
				  label="数量" width="80">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.amount"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="lable"
				  label="标签" width="80">
					<template slot-scope="scope">
						{{scope.row.lable}}
					</template>
				</el-table-column>
				<el-table-column
				  prop="reason"
				  label="说明" width="200">
				    <template slot-scope="scope">
						<el-input v-model="scope.row.reason"></el-input>
				  	</template>
				</el-table-column>
				<el-table-column
				  prop="state"
				  label="上下架" width="80">
				  <template slot-scope="scope">
					  <el-switch
					    v-model="scope.row.state"
					    active-color="#13ce66"
					    inactive-color="#ff4949"
						active-value="ON_THE_SHELF"
						inactive-value="OFF_THE_SHELF">
					  </el-switch>
				  </template>
				</el-table-column>
				<el-table-column
				prop="goodsIfup"
				  label="操作">
				  <template slot-scope="scope">
					  <el-button type="success" size="mini" round @click="changeXfGoods(scope.row)">修改</el-button>
				  </template>
				</el-table-column>
			  </el-table>
			  </div>
			  <!-- 页码 -->
			  <el-pagination
			     layout="prev, pager, next"
			     :total="xtotalSize"
			     :page-size="size"
			      :current-page.sync="xcurrentPage"
			     @current-change="getGoodsList"
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
			size:20,
			xtotalSize:0,
			xtotalPage:0,
			xcurrentPage:1,
			jtotalSize:0,
			jtotalPage:0,
			jcurrentPage:1,
			goodsClass:true,
			
			jsTableData:[
			
			],
			xsTableDate:[
			
			],
		}
	},
	created() {
		console.log(process.env.VUE_APP_BASE_URL);
		this.http.post(this.api.getMailingProductAll,
		{
		"page":1,
		"size":this.size
		},sessionStorage.getItem('token')).then(res => {
			console.log(res)
		          if(res.code == 0){
					  this.jsTableData=res.data.list
		          }
		       });
	},
	methods:{
		prevFn:function(){
			if(this.goodsClass){
				if(this.jcurrentPage==1){
					this.jcurrentPage=1;
				}else if(this.jcurrentPage>1){
						this.jcurrentPage--;
				}
			}else{
				if(this.xcurrentPage==1){
					this.xcurrentPage=1;
				}else if(this.xcurrentPage>1){
						this.xcurrentPage--;
				}
			}
			
			
		},
		nextFn:function(){
			if(this.goodsClass){
				if(this.xcurrentPage<this.xtotalPage){
						this.xcurrentPage++;
				}
			}else{
				if(this.jcurrentPage<this.jtotalPage){
						this.jcurrentPage++;
				}
			}
			
		},
		getGoodsList(){
			
			if(this.goodsClass){
				this.http.post(this.api.getMailingProductAll,
				{
				"page":this.jcurrentPage,
				"size":this.size
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.jsTableData=res.data.list;
							  this.jtotalSize=res.data.total_size
							  this.jcurrentPage=res.data.current_page;
							  this.jtotalPage=res.data.total_page
				          }
				       });
			}else{
				this.http.post(this.api.getGeneralProductAll,
				{
				"page":this.xcurrentPage,
				"size":this.size
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.xsTableDate=res.data.list
							  this.xtotalSize=res.data.total_size
							  this.xcurrentPage=res.data.current_page;
							  this.xtotalPage=res.data.total_page
				          }
				       });
			}
			
		},
		changeJsGoods(item){
			this.http.post(this.api.updateMailingProduct,
			{
				"id":item.id,
				"productName":item.productName,
				"productType":"MAILING",
				"productUrl":item.productUrl,
				"transactionPrice":item.transactionPrice,
				"mailingPrice":item.mailingPrice,
				"amount":item.amount,
				"state":item.state,
				"reason":item.reason

			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.$message({
						          message: res.data,
						          type: 'success'
						        });
						  // this.userInfo= res.data;
			          }
			       });
		},
		changeXfGoods(item){
			this.http.post(this.api.updateGeneralProduct,
			{
				"id":item.id,
				"productName":item.productName,
				"productType":"GENERAL",
				"transactionPrice":item.transactionPrice,
				"amount":item.amount,
				"state":item.state,
				"reason":item.reason,
				"productDetailsUrl":item.productDetailsUrl,
				"productUrl":item.productUrl,
				"lable":item.lable.toString(),
				"store":item.store,
				"discount":item.discount
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.$message({
						          message: res.data,
						          type: 'success'
						        });
						  // this.userInfo= res.data;
			          }
			       });
		}
	},
	filters:{
		changUrl(url){
			return url
		}
	}
}
</script>

<style>
	.product-img-scope{
		width: 100px;
		
	}
</style>
