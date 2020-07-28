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
			<el-input maxlength="11"  clearable type="text"  v-model="xfGoods.goodsName" placeholder=""></el-input></div></div>
			<div><div class="input-title">成交价</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.goodsJg" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品折扣</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.goodsZk" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品数量</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.goodsZk" placeholder=""></el-input></div></div>
			<div><div class="input-title">产品说明</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.goodsStatus" placeholder=""></el-input></div></div>
			<div><div class="input-title">上传主图照片</div>
				<div class="sign-input photo-wrap">
					<img class="photo-item" :src="xfGoods.mainList[0]" v-if="xfGoods.mainList[0]!==''" @click="delMainPho(0)">
					<img class="photo-item" :src="xfGoods.mainList[1]" v-if="xfGoods.mainList[1]!==''" @click="delMainPho(1)">
					<img class="photo-item" :src="xfGoods.mainList[2]" v-if="xfGoods.mainList[2]!==''" @click="delMainPho(2)">
					<div class="photo-upload" v-if="xfGoods.mainList[2]==''">
						<input type="file" class="file-input" name="avatar" accept="image/gif,image/jpeg,image/jpg"
						 @change="changemainImg($event)"> 
						<i class="el-icon-plus"></i>
					</div>
				</div></div>
				<div><div class="input-title">上传详情照片</div>
					<div class="sign-input photo-wrap">
						<img class="photo-item" :src="xfGoods.phoList[0]" v-if="xfGoods.phoList[0]!==''" @click="delMainPho1(0)">
						<img class="photo-item" :src="xfGoods.phoList[1]" v-if="xfGoods.phoList[1]!==''" @click="delMainPho1(1)">
						<img class="photo-item" :src="xfGoods.phoList[2]" v-if="xfGoods.phoList[2]!==''" @click="delMainPho1(2)">
						<div class="photo-upload" v-if="xfGoods.phoList[2]==''">
							<input type="file" class="file-input" name="avatar" accept="image/gif,image/jpeg,image/jpg"
							 @change="changemainPho($event)"> 
							<i class="el-icon-plus"></i>
						</div>
					</div></div>
			<div><div class="input-title">类别标签</div> <div class="sign-input">
				  <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
				  <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
				
			</div></div>
			<div><div class="input-title">产品所属</div> <div class="sign-input">
			<el-input   clearable type="text"  v-model="xfGoods.goodsStatus" placeholder="商家手机号"></el-input></div></div>
			
			<div><div class="input-title">是否上架</div>
				<div class="switch-item">
					<el-switch
					  style="display: inline-block"
					  v-model="xfGoods.ifup"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  active-text="上架"
					  inactive-text="下架">
					</el-switch>
				</div>
			</div>
			
		<div class="sign-btn addgoods" ><el-button type="primary">立即添加</el-button></div>
		</div>
		<!-- 寄售 -->
		<div class="zh-info-box" v-else>
			<div> <div class="input-title">商品名称</div> <div class="sign-input"><el-input maxlength="11"  clearable type="text"  v-model="jsGoods.goodsName" placeholder=""></el-input></div></div>
			<div><div class="input-title">商品说明</div> <div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.goodsStatus" placeholder=""></el-input></div></div>
			<div><div class="input-title">成交价</div> <div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.goodsCj" placeholder=""></el-input></div></div>
			<div><div class="input-title">挂牌价</div> <div class="sign-input"><el-input   clearable type="text"  v-model="jsGoods.goodsGp" placeholder=""></el-input></div></div>
			<div><div class="input-title">上传照片</div> 
				<div class="sign-input">
					<img class="photo-item" :src="jsGoods.pho1" v-if="jsGoods.pho1" @click="delPho">
					<div class="photo-upload" v-if="jsGoods.pho1==''">
						<input type="file" class="file-input" name="avatar" accept="image/gif,image/jpeg,image/jpg"
						 @change="changeCoverImg($event)"> 
						<i class="el-icon-plus"></i>
					</div>
				</div></div>
			<div><div class="input-title">是否上架</div>
				<div class="switch-item">
					<el-switch
					  style="display: inline-block"
					  v-model="jsGoods.ifup"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  active-text="上架"
					  inactive-text="下架">
					</el-switch>
				</div>
			</div>
			<div class="sign-btn addgoods" ><el-button type="primary">立即添加</el-button></div>
		</div>
		
	</div>
</template>

<script>
export default {
	data (){
		return {
			goodsClass:true,
			jsGoods:{
				goodsGp:'',
				goodsCj:'',
				goodsName:'',
				goodsStatus:'',
				pho1:'',
				ifup:true,
			},
			xfGoods:{
				goodsName:'',
				goodsJg:'',
				goodsZk:'',
				goodsClassify:[{
					value:'classify1',
					name: '日常百货'
				},{
					value:'classify2',
					name: '养生保健'
				},{
					value:'classify3',
					name: '精品服饰'
				},{
					value:'classify3',
					name: '可爱美妆'
				},{
					value:'classify3',
					name: '可爱美妆'
				}],
				goodsNum:'',
				goodsStatus:'',
				mainList:['','',''],
				phoList:['','',''],
				ifUp:true,
			}
			
		}
	},
	methods:{
		// 删除寄售商品图
		delPho:function(){
				this.$set(this.jsGoods,'pho1','')
			// this.pho1=''
		},
		// 删除消费商品主图
		delMainPho:function(n){
				this.$set(this.xfGoods.mainList,n,'')
			// this.pho1=''
		},// 删除消费商品详情
		delMainPho1:function(n){
				this.$set(this.xfGoods.phoList,n,'')
			// this.pho1=''
		},
		// 上传寄售商品图
		changeCoverImg:function(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.$set(that.jsGoods,'pho1',this.result)		
				}
		},
		// 上消费商品主图
		changemainImg:function(e){
			var file = e.target.files[0]
			var reader = new FileReader()
			var that = this
			// var pho=[];
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				if(that.xfGoods.mainList[0]==''){
					// pho[0]=
					console.log(that.xfGoods.mainList)
					that.$set(that.xfGoods.mainList,0,this.result);
				}else if(that.xfGoods.mainList[1]==''){
					console.log(that.xfGoods.mainList)
						that.$set(that.xfGoods.mainList,1,this.result);
				}else{
					console.log(that.xfGoods.mainList)
					that.$set(that.xfGoods.mainList,2,this.result);
				}
						
			}
		},
		changemainPho:function(e){
			var file = e.target.files[0]
			var reader = new FileReader()
			var that = this
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				if(that.xfGoods.phoList[0]==''){
					// pho[0]=
					console.log(that.xfGoods.phoList)
					that.$set(that.xfGoods.phoList,0,this.result);
				}else if(that.xfGoods.phoList[1]==''){
					console.log(that.xfGoods.phoList)
						that.$set(that.xfGoods.phoList,1,this.result);
				}else{
					console.log(that.xfGoods.phoList)
					that.$set(that.xfGoods.phoList,2,this.result);
				}
						
			}
		}
	}
}
</script>

<style>

/* 	.main-box{
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
	}
	.sign-input{
		display: inline-block;
		width: 180px;
		margin-left: 20px;
	} */
	.switch-item{
		display: inline-block;
		width: 200px;
		margin-left: 20px;
	}
	/* .input-title{
		display: inline-block;
		font-size: 12px;
		width: 100px;
		text-align: right;
	}
	.sign-btn{
		margin-top: 20px;
		padding-left: 150px;
	} */
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
