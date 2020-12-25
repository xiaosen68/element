<template>
	<div class="main-box">
		<div class="zh-head">分享海报 </div>
		<div class="zh-info-box">
			<div class="poster-list">
				<div class="poster-item-list" v-for="item in posterList" >
					<span class="delete-dio" @click="deleteImg(item.id)">X</span>
					<el-image class="poster-item"
					    :src="item.url"
					    fit="fit" ></el-image>
				</div>
				 
			
				<div class="upload-box">
						<el-upload
						  :action="baseUrl+'/api/v1/admin/upload/image'"
						  :headers="{'Content-Type':'application/json',
						  'token':token}"
						list-type="picture-card"
							:auto-upload="false"
							:on-preview="handlePictureCardPreview"
						  :on-change="uploadImageFn"
						  :on-remove="handleRemove"
						  >
						<i class="el-icon-plus"></i>
					  </el-upload>
					  <el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					  </el-dialog>
				</div>
			</div>
			
			<el-button @click="saveSharingPoster"> 确定</el-button>
		</div>
	</div>
</template>

<script>
	  export default {
	      data() {
	        return {
				// posterList:[require('../../assets/n1.jpg'),require('../../assets/n2.jpg'),require('../../assets/n3.jpg')],
				posterList:[],
	          dialogImageUrl: '',
	          dialogVisible: false,
			  uploadUrl:'',
			  baseUrl:'',
			  token:'',
	        };
	      },
		  beforeMount(){
			  this.findSharingPosters()
		  },
		created() {
			this.token=sessionStorage.getItem('token');
			console.log(this.token)
			this.baseUrl= process.env.VUE_APP_BASE_URL;
		},
	      methods: {
			  // 获取海报
			  findSharingPosters:function(){
				  this.http.post(this.api.findSharingPosters,
				  {
				  },sessionStorage.getItem('token')).then(res => {
				  	console.log(res)
				            if(res.code == 0){
				  			 this.posterList=res.data; 
				            }
				         });
			  },
			  // 上传图
			  uploadImageFn(file){
				  let _this=this;
			  	let formData = new FormData();
			  	formData.append('uploadType','SHARING_POSTERS_URL');
			  	formData.append('file',file.raw)
			  	this.http.post(this.api.uploadImage,
			  	formData,sessionStorage.getItem('token')).then(res => {
			  		console.log(res)
			  	          if(res.code == 0){
							  this.uploadUrl=res.data.url;
			  	          }
			  	       });
			  },
			  // 添加海报；
			  saveSharingPoster(){
				this.http.post(this.api.saveSharingPoster,
				{
					 sname:'heihei',
					url:this.uploadUrl,
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.$message.success(res.data)
							  this.findSharingPosters();
				          }
				       });
			 },
	        handleRemove(file, fileList) {
	          console.log(file, fileList);
	        },
	        handlePictureCardPreview(file) {
	          this.dialogImageUrl = file.url;
	          this.dialogVisible = true;
	        },
			// 删除海报
			deleteImg:function(n){
				this.http.post(this.api.deleteSharingPoster,
				{
					id:n
				},sessionStorage.getItem('token')).then(res => {
					console.log(res)
				          if(res.code == 0){
							  this.$message.success(res.data)
							  this.findSharingPosters();
				          }
				       });
			}
	      }
	    
	  }
</script>

<style >

	  .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 260px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 260px;
	    display: block;
	  }
	  .poster-list{
		  display: flex;
	  }
	  .poster-item-list{
		  position: relative;
	  }
	  .poster-item{
		  width: 160px;
		  height: 200px;
		  margin: 20px;
	  }
	  .upload-box{
		  display: inline-block;
		  margin: 40px 20px;
		  vertical-align: bottom;
	  }
	  .delete-dio{
		  display: inline-block;
		  font-size: 12px;
		  line-height: 20px;
		  width: 20px;
		  text-align: center;
		  color: #EEEEEE;
		  border-radius: 50%;
		  background-color: #FF0000;
		 position: absolute;
		 right: 10px;
		 top: 10px;
		 z-index: 20;
	  }
</style>
