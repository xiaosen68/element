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
			    {{ item.name }}
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
				{
					id:'1',
					name:'玩转数码'
				},{
					id:'2',
					name:'品质家居'
				},{
					id:'3',
					name:'时尚美妆'
				},{
					id:'4',
					name:'日常百货'
				},{
					id:'5',
					name:'精品服饰'
				},{
					id:'6',
					name:'养生保健'
				}
			],
			classifyType:['success','info','danger','warning','']
		}
	},
	methods:{
		roundTypeFn:function(){
			return this.classifyType[Math.floor(Math.random()*this.classifyType.length)]
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
			  handleInputConfirm() {
			   this.inputVisible=false;
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
