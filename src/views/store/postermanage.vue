<template>
	<div class="main-box">
		<div class="zh-head">分享海报 </div>
		<div class="zh-info-box">
			<div class="poster-list">
				<div class="poster-item-list" v-for="item in posterList" >
					<span class="delete-dio" @click="deleteImg">X</span>
					<el-image class="poster-item"
					    :src="item"
					    fit="fit" ></el-image>
				</div>
				 
			
				<div class="upload-box">
					  <el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					  </el-upload>
					  <el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					  </el-dialog>
				</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	  export default {
	      data() {
	        return {
				posterList:[require('../../assets/n1.jpg'),require('../../assets/n2.jpg'),require('../../assets/n3.jpg')],
	          dialogImageUrl: '',
	          dialogVisible: false
	        };
	      },
	      methods: {
	        handleRemove(file, fileList) {
	          console.log(file, fileList);
	        },
	        handlePictureCardPreview(file) {
	          this.dialogImageUrl = file.url;
	          this.dialogVisible = true;
	        },
			deleteImg:function(){
				alert("sadasda")
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
