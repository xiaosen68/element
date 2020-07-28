<template>
	<div class="main-box">
		<div class="zh-head">商品列表  <el-switch
		  style="display: inline-block;margin-left: 20px;"
		  v-model="goodsClass"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  active-text="寄售"
		  inactive-text="消费">
		</el-switch></div>
		<!-- 寄售 -->
		<div class="zh-info-box" v-if="goodsClass">
			  <el-table
			    :data="jsTableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="goodsId"
			      label="商品ID"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="goodsName"
			      label="商品名称"
			      width="180">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.goodsName"></el-input>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="goodsCj"
			      label="成交价">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.goodsCj"></el-input>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="goodsGp"
				  label="挂牌价">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.goodsGp"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="goodsPic"
				  label="图片">
				</el-table-column>
				<el-table-column
				  prop="goodsIfup"
				  label="上下架">
				  <template slot-scope="scope">
					  <el-switch
					    v-model="scope.row.goodsIfup"
					    active-color="#13ce66"
					    inactive-color="#ff4949">
					  </el-switch>
				  </template>
				</el-table-column>
				<el-table-column
				prop="goodsIfup"
				  label="操作">
				  <template slot-scope="scope">
					  <el-button type="success" size="mini" round>修改</el-button>
				  </template>
				</el-table-column>
			  </el-table>
		</div>
		<!-- 消费 -->
		<div class="zh-info-box" v-else>
			  <el-table
			    :data="xsTableDate"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="goodsId"
			      label="商品ID"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="goodsName"
			      label="商品名称"
			      width="120">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.goodsName"></el-input>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="goodsJg"
			      label="成交价"  width="90">
				  <template slot-scope="scope">
				  		<el-input v-model="scope.row.goodsCj"></el-input>
				  </template>
			    </el-table-column>
				<el-table-column
				  prop="goodsZk"
				  label="折扣" width="80">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.goodsGp"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="goodsNum"
				  label="数量" width="80">
				  <template slot-scope="scope">
						<el-input v-model="scope.row.goodsNum"></el-input>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="goodsClassify"
				  label="标签" width="80">
					<template slot-scope="scope">
						<el-button type="text">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column
				  prop="goodsStatus"
				  label="说明" width="200">
				    <template slot-scope="scope">
						<el-input v-model="scope.row.goodsStatus"></el-input>
				  	</template>
				</el-table-column>
				<el-table-column
				  prop="ifUp"
				  label="上下架" width="80">
				  <template slot-scope="scope">
					  <el-switch
					    v-model="scope.row.goodsIfup"
					    active-color="#13ce66"
					    inactive-color="#ff4949">
					  </el-switch>
				  </template>
				</el-table-column>
				<el-table-column
				prop="goodsIfup"
				  label="操作">
				  <template slot-scope="scope">
					  <el-button type="success" size="mini" round>修改</el-button>
				  </template>
				</el-table-column>
			  </el-table>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			goodsClass:true,
			jsTableData:[
				{
					goodsId:'123123213',
					goodsName:'哈哈哈',
					goodsCj:'123.00',
					goodsGp:'2131.00',
					goodsPic:'',
					goodsIfup:false,
				}
			],
			xsTableDate:[
				{
					goodsId:'123123213',
					goodsName:'哈哈哈',
					goodsJg:'123.00',
					goodsZk:'0.9',
					goodsClassify:[],
					goodsNum:'12',
					goodsStatus:'',
					mainList:['','',''],
					phoList:['','',''],
					ifUp:true,
				}
			]
		}
	},
	methods:{
		
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
	
</style>
