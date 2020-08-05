<template>
	<div class="main-box">
		<div class="zh-head">
			商品分类列表
		</div>
		<div class="zh-info-box">
			<el-tag
			    v-for="item in classify"
			    :key="item.id"
			    :type="roundTypeFn()"
			    effect="plain"
				 :closable="ifClosabled"
				 @close="handleClose(tag)"
				 class="classify-tab">
			    {{ item.lable }}
			  </el-tag>
			<el-input
			  class="input-new-tag"
			  v-if="inputVisible"
			  v-model="inputValue"
			  ref="saveTagInput"
			  size="small"
			  @keyup.enter.native="handleInputConfirm"
			  @blur="handleInputConfirm"></el-input>
			<el-button v-else class="button-new-tag" size="small" @click="showInput">+添加分类</el-button>
			 <el-button type="danger" icon="el-icon-delete" size="small" circle @click="showClose"></el-button>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			ifClosabled:false,
			    inputVisible: false,
			        inputValue: '',
			classify:[
			],
			classifyType:['success','info','danger','warning','']
		}
	},
	created() {
		this.refreshLable();
	},
	methods:{
		roundTypeFn:function(){
			return this.classifyType[Math.floor(Math.random()*this.classifyType.length)]
		},
		// 刷新标签列表
		refreshLable(){
			this.http.get(this.api.generalLableAll,
			{
			},sessionStorage.getItem('token')).then(res => {
				console.log(res)
			          if(res.code == 0){
						  this.classify=res.data
			          }
			       });
		},
		
		 handleClose(tag) {
			 
		        this.classify.splice(this.classify.indexOf(tag), 1);
		      },
			// 显示添加分类
					 showInput() {
		        this.inputVisible = true;
		        this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
		      },
			  
			  // 添加标签
			  handleInputConfirm() {
				  this.http.post(this.api.addGeneralLable,
				  {
					  "lable":this.inputValue,
					  "reason":"0"

				  },sessionStorage.getItem('token')).then(res => {
				  	console.log(res)
				            if(res.code == 0){
				  			  this.refreshLable();
				            }
				         });
				  
				  
				  
			   this.inputVisible=false;
			      },
				  // 删除标签
			  deleteClassify(){
				
				  
				},
				  
			showClose:function(){
				this.ifClosabled=!this.ifClosabled;
			}
	}
}
</script>

<style scoped="scoped">
	.classify-tab{
		margin: 20px 10px;
	}
	  .el-tag + .el-tag {
	    margin-left: 10px;
	  }
	  .button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
	  .manage-btn{
		  margin-left: 20px;
		  /* float: right; */
	  }
</style>
