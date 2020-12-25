<template>
	<div class="main-box">
		<div class="zh-head">上传实名信息 </div>
		<div class="zh-info-box">
			<div> <b class="input-title">姓名：</b> <div class="input-box">
			<el-input class="input-item"  placeholder="请输入姓名" v-model="realName"></el-input> </div> </div>
			<div> <b class="input-title">手机号：</b> <div class="input-box">
			<el-input class="input-item"  placeholder="请输入姓名" v-model="phone"></el-input> </div> </div>
			<div> <b class="input-title">身份证号：</b> <div class="input-box">
			<el-input class="input-item"  placeholder="请输入姓名" v-model="idNumber"></el-input> </div> </div>
			<div>
				<b class="input-title">上传身份证：</b>
			<el-upload
			  :action="baseUrl+'/api/v1/admin/upload/image'"
			  :headers="{'Content-Type':'application/json',
			'token':token}"
			list-type="picture-card"
				:auto-upload="false"
			  :on-change="uploadImageFn"
			  >
			  <i class="el-icon-plus"></i>
			</el-upload>
			
			</div>
			<div class="btn-box">
				<b class="input-title"></b> 
				<el-button type="primary" @click="uploadRealNameAuthentication">确认上传</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			realName:'',
			phone:'',
			idNumber:'',
			phoList:[],
			token:'',
			baseUrl:'',
		}
	},
	created() {
		this.token=sessionStorage.getItem('token');
		this.baseUrl= process.env.VUE_APP_BASE_URL;
	},
	methods:{
		// 上传图
		uploadImageFn(file){
			let formData = new FormData();
			formData.append('uploadType','ID_CARD_URL');
			formData.append('file',file.raw)
			this.http.post(this.api.uploadImage,
			formData,sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  if(this.phoList.length>0){
							  if(this.phoList.length>1){
								  this.$set(this.phoList,2,res.data.url);
							  }else{
								  this.$set(this.phoList,1,res.data.url);
							  }
						  }else{
							this.$set(this.phoList,0,res.data.url);  
						  }
						  console.log(this.phoList)
			          }
			       });
		},
		// 上传实名信息
		uploadRealNameAuthentication:function(){
			if(!this.realName||!this.idNumber||!this.phone||this.phoList.length!==3){
				this.$message.warning("请填写完整信息")
				return false
			}
			this.http.post(this.api.uploadRealNameAuthentication,
			{
				phone:this.phone,
				realName:this.realName,
				idNumber:this.idNumber,
				frontPhotoOfIdCard:this.phoList[0],
				reversePhotoOfIdCard:this.phoList[1],
				holdingIdCard:this.phoList[2]
				
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						 this.tableData=res.data.list; 
						 this.totalSize=res.data.total_size;
						 this.currentPage=res.data.current_page;
			          }
			       });
		}
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
