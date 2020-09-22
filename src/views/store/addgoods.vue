<template>
	<div class="main-box">
		<div class="zh-head">添加商品 <el-switch
		  style="display: inline-block;margin-left: 20px;"
		  v-model="goodsClass"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  active-text="消费"
		  inactive-text="寄售">
		</el-switch></div>
		<!-- 消费 -->
		<div class="zh-info-box" v-if="goodsClass">
			<div> <div class="input-title">商品名称</div> <div class="sign-input">
			<el-input maxlength="11"  clearable type="text"  v-model="xfGoods.productName" placeholder=""></el-input></div></div>
			<div><div class="input-title">成交价</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.transactionPrice" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品折扣</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.discount" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品数量</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.amount" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品说明</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.reason" placeholder=""></el-input></div></div>
			<div><div class="input-title">上传主图照片</div>
				<div class="sign-input">
					<!-- <img class="photo-item" :src="xfGoods.productUrl" v-if="xfGoods.productUrl" @click="delPho">
					<div class="photo-upload" v-if="xfGoods.productUrl==''">
						<input type="file" class="file-input" name="avatar" accept="image/gif,image/jpeg,image/jpg"
						 @change="changemainImg($event)"> 
						<i class="el-icon-plus"></i>
					</div> -->
					
					<el-upload
					  action="/dev/api/v1/admin/upload/image"
					  :headers="{'Content-Type':'application/json',
					'token':token}"
					list-type="picture-card"
						:auto-upload="false"
					  :on-change="uploadXfMainBefore"
					  >
					  <i class="el-icon-plus"></i>
					</el-upload>
				</div></div>
				<div><div class="input-title">上传详情照片</div>
					<div class="sign-input">
					<el-upload
					  action="/dev/api/v1/admin/upload/image"
					  :headers="{'Content-Type':'application/json',
					'token':token}"
					list-type="picture-card"
						:auto-upload="false"
					  :on-change="uploadXfStatusBefore"
					  >
					  <i class="el-icon-plus"></i>
					</el-upload>
					</div></div>
			<div><div class="input-title">类别标签</div> <div class="sign-input">
				<el-checkbox-group v-model="selectClassify" >
				  <el-checkbox :label="item.lable" border v-for="item in goodsClassify"></el-checkbox>
				</el-checkbox-group>	
			</div></div>
			<div><div class="input-title">产品所属</div> <div class="sign-input">
			<el-input   clearable type="tel" maxlength="11"  v-model="xfGoods.store" placeholder="商家手机号" ></el-input></div></div>
			
			<div><div class="input-title">是否上架</div>
				<div class="switch-item">
					<el-switch
					  style="display: inline-block"
					  v-model="xfGoods.state"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  active-text="上架"
					  inactive-text="下架"
					   active-value="ON_THE_SHELF"
					   inactive-value="OFF_THE_SHELF"
					  >
					</el-switch>
				</div>
			</div>
			
		<div class="sign-btn addgoods" ><el-button type="primary" @click="addXfFn">立即添加</el-button></div>
		</div>
		<!-- 寄售 -->
		<div class="zh-info-box" v-else>
			<div> <div class="input-title">商品名称</div> 
			<div class="sign-input"><el-input maxlength="11"  clearable type="text"  v-model="jsGoods.productName" placeholder=""></el-input></div></div>
			<div><div class="input-title">商品说明</div>
			<div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.reason" placeholder=""></el-input></div></div>
			<div><div class="input-title">数量</div>
			<div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.amount" placeholder=""></el-input></div></div>
			
			<div><div class="input-title">成交价</div> 
			<div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.transactionPrice" placeholder=""></el-input></div></div>
			<div><div class="input-title">挂牌价</div> 
			<div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.mailingPrice" placeholder=""></el-input></div></div>
			<div><div class="input-title">上传照片</div> 
				<div class="sign-input">
				<el-upload
				  action="/dev/api/v1/admin/upload/image"
				  :headers="{'Content-Type':'application/json',
				'token':token}"
				list-type="picture-card"
					:auto-upload="false"
				  :on-change="uploadJsMainBefore"
				  >
				  <i class="el-icon-plus"></i>
				</el-upload>
				</div></div>
			<div><div class="input-title">是否上架</div>
				<div class="switch-item">
					<el-switch
					  style="display: inline-block"
					  v-model="jsGoods.state"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  active-text="上架"
					  inactive-text="下架"
					  inactive-value="OFF_THE_SHELF"
					  active-value="ON_THE_SHELF"
					  />
					</el-switch>
				</div>
			</div>
			<div class="sign-btn addgoods" ><el-button type="primary" @click="addJsFN">立即添加</el-button></div>
		</div>
		
	</div>
</template>

<script>
export default {
	data (){
		return {
			goodsClass:true,
			imageData:{uploadType:'GENERAL_PRODUCT_URL'},
			token:'',
			jsGoods:{
				productName:'',
				productType:'MAILING',//类型‘GENERAL’消费，‘MAILING’寄售
				productUrl:'',//图片
				transactionPrice:'',//成交价
				mailingPrice:'',//寄售价
				amount:'',//数量
				state:'ON_THE_SHELF',//上架‘ON_THE_SHELF’上架，‘OFF_THE_SHELF’下架
				reason:'',//说明
			},
			xfGoods:{
				productName:'',
				productType:'GENERAL',//类型‘GENERAL’消费，‘MAILING’寄售
				productUrl:'',//图片
				productDetailsUrl:'',//详情图
				transactionPrice:'',//成交价
				store:'',//商家
				amount:'',//数量
				discount:'',//折扣
				lable:'',//标签
				state:'ON_THE_SHELF',//上架‘ON_THE_SHELF’上架，‘OFF_THE_SHELF’下架
				reason:'',//说明
			},goodsClassify:[],
			selectClassify:[],
			
		}
	},
	created() {
		this.token=sessionStorage.getItem('token')
		this.http.get(this.api.generalLableAll,
		{	
		},sessionStorage.getItem('token')).then(res => {
			console.log(res)
		          if(res.code == 0){
					  this.goodsClassify=res.data
		          }
		       });
	},
	methods:{
		// 上传寄售主图
		uploadJsMainBefore(file){
			let formData = new FormData();
			formData.append('uploadType','GENERAL_PRODUCT_URL');
			formData.append('file',file.raw)
			this.http.post(this.api.uploadImage,
			formData,sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						  this.jsGoods.productUrl=res.data.url
			          }
			       });
		},
		// 上传消费主图
		uploadXfMainBefore(file){
			let formData = new FormData();
			formData.append('uploadType','MAILING_PRODUCT_URL');
			formData.append('file',file.raw)
			this.http.post(this.api.uploadImage,
			formData,sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						  this.xfGoods.productUrl=res.data.url
			          }
			       });
		},
		// 上传消费详情图
		uploadXfStatusBefore(file){
			let formData = new FormData();
			formData.append('uploadType','MAILING_PRODUCT_URL');
			formData.append('file',file.raw)
			this.http.post(this.api.uploadImage,
			formData,sessionStorage.getItem('token')).then(res => {
			          if(res.code == 0){
						  this.xfGoods.productDetailsUrl=res.data.url
			          }
			       });
		},
		// 添加寄售商品
		addJsFN(){
			console.log(this.jsGoods)
			this.http.post(this.api.addMailingProduct,
			{
				 "productName":this.jsGoods.productName,
				"productType":this.jsGoods.productType,
				"productUrl":this.jsGoods.productUrl,
				"transactionPrice":this.jsGoods.transactionPrice,
				"mailingPrice":this.jsGoods.mailingPrice,
				"amount":this.jsGoods.amount,
				"state":this.jsGoods.state,
				"reason":this.jsGoods.reason,
			
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.$message.success(res.data)
			          }
			       });
		},
		// 添加消费商品
		addXfFn(){
			console.log(this.xfGoods)
			if(this.xfGoods.discount>1||this.xfGoods.discount<=0){
				this.$message.error('折扣数额不能大于1，小于0');
				return false
			}
			
			this.http.post(this.api.addGeneralProduct,
			{
				 "productName":this.xfGoods.productName,
				"productType":this.xfGoods.productType,
				"productUrl":this.xfGoods.productUrl,
				"productDetailsUrl":this.xfGoods.productDetailsUrl,
				"transactionPrice":this.xfGoods.transactionPrice,
				"store":this.xfGoods.store,
				"amount":this.xfGoods.amount,
				"state":this.xfGoods.state,
				"reason":this.xfGoods.reason,
				"discount":this.xfGoods.discount,
				"lable":this.selectClassify.toString(),
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.$message.success(res.data)
			          }
			       });
			
		},
		// 删除寄售商品图
		delPho:function(){
				this.$set(this.jsGoods,'productUrl','')
			// this.pho1=''
		},
		// 删除消费商品主图
		delMainPho:function(n){
				this.$set(this.xfGoods,'productUrl','')
			// this.pho1=''
		},// 删除消费商品详情
		delMainPho1:function(n){
				this.$set(this.xfGoods,'productDetailsUrl','')
			// this.pho1=''
		},
		// 上传寄售商品图
		changeCoverImg:function(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.$set(that.jsGoods,'productUrl',this.result)		
				}
		},
		// 上消费商品主图
		changemainImg:function(e){
			var file = e.target.files[0]
			var reader = new FileReader()
			var that = this
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				that.$set(that.xfGoods,'productUrl',this.result)		
			}
		},
		// 上消费商品详情图
		changedetailImg:function(e){
			var file = e.target.files[0]
			var reader = new FileReader()
			var that = this
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				that.$set(that.xfGoods,'productDetailsUrl',this.result)		
			}
		},
	}
}
</script>

<style>
	.switch-item{
		display: inline-block;
		width: 200px;
		margin-left: 20px;
	}
	.photo-item{
		display: inline-block;
		width: 200px;
		height: 160px;
		margin-right: 20px;
		vertical-align: bottom;
	}
	.photo-upload{
		position: relative;
		display: inline-block;
		width: 120px;
		height: 100px;
		border: 1px solid #a3a3a3;
		text-align: center;
		line-height: 100px;
		font-size: 70px;
		color: #a3a3a3;
		vertical-align: bottom;
	}
	.file-input{
		display: inline-block;
		width: 120px;
		height: 100px;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0);
		opacity: 0;
		
	}
	.sign-input,.photo-wrap{
		width: 800px;
	}
	.zh-info-box{
		padding-bottom: 20px;
	}
</style>
