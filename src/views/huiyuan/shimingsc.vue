<template>
	<div class="main-box">
		<div class="zh-head">上传实名信息 </div>
		<div class="zh-info-box">
			<div> <b class="input-title">姓名：</b> <div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="name"></el-input> </div> </div>
			<div> <b class="input-title">手机号：</b> <div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="tel"></el-input> </div> </div>
			<div> <b class="input-title">身份证号：</b> <div class="input-box"><el-input class="input-item"  placeholder="请输入姓名" v-model="idCard"></el-input> </div> </div>
			<div>
				<b class="input-title">上传身份证：</b>
				<img class="photo-item" :src="pho1" v-if="pho1" @click="delPho(1)">
				<img class="photo-item" :src="pho2" v-if="pho2"  @click="delPho(2)">
				<img class="photo-item" :src="pho3" v-if="pho3"  @click="delPho(3)">
				<div class="photo-upload" v-if="pho1==''||pho2==''||pho3==''"> 				
					<input type="file" class="file-input" name="avatar" accept="image/gif,image/jpeg,image/jpg"
					 @change="changeCoverImg($event)"> 
					<i class="el-icon-plus"></i>
				</div>
			</div>
			<div class="btn-box">
				<b class="input-title"></b> 
				<el-button type="primary">确认上传</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			name:'',
			tel:'',
			idCard:'',
			pho1:'',
			pho2:'',
			pho3:''
		}
	},
	methods:{
		delPho:function(n){
			if(n===1){
				this.pho1=''
			}else if(n===2){
				this.pho2=''
			}else{
				this.pho3=''
			}
		},
		changeCoverImg:function(e) {
		    var file = e.target.files[0]
		    var reader = new FileReader()
		    var that = this
		    reader.readAsDataURL(file)
		    reader.onload = function(e) {
				if(that.pho1!==''){
					if(that.pho2!==''){
						that.pho3 = this.result
					}else{
						that.pho2 = this.result
					}
				}else {
					that.pho1 = this.result
				}
		        
		        // console.log(that.coverImg)
		    }
		},
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
	
	
	.input-title{
		display: inline-block;
		width: 80px;
	} */
	.input-box{
		display: inline-block;
		width: 200px;
	}
	.photo-item{
		display: inline-block;
		width: 200px;
		height: 160px;
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
	.btn-box{
		margin-top: 20px;
	}
</style>
