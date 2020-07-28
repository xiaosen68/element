<template>
	<div class="main-box">
		<div class="zh-head">平台列表 </div>
		<div class="zh-info-box">
			<el-form label-position="right" label-width="120px" :model="form">
			  <el-form-item label="平台名称">
				  <div class="terrace-input-box"><el-input v-model="form.name"></el-input></div>
			  </el-form-item>
			  <el-form-item label="平台编号">
			     <div class="terrace-input-box"><el-input v-model="form.number"></el-input></div>
			  </el-form-item>
			  <el-form-item label="平台手机号">
			     <div class="terrace-input-box"><el-input v-model="form.tel"></el-input></div>
			  </el-form-item>
			<!--  <el-form-item label="开通通道">
			     <div class="terrace-input-box">
					<el-select v-model="form.tongdaoList" multiple placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
				</div>
			  </el-form-item> -->
			   <el-form-item>
			      <el-button type="primary" @click="">立即添加</el-button>
			      <el-button>取消</el-button>
			    </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			form:{
				name:'',
				number:'',
				tel:'',
				tongdaoList:'',
			},
			options:[
				{
					name:'通道1',
					id:'12'
				},
				{
					name:'通道2',
					id:'121'
				},
				{
					name:'通道3',
					id:'123'
				},
			]
		}
	},
	methods:{
		
		},
}
</script>

<style scoped="scoped">
.zh-info-box{
	padding-bottom: 60px;
	}
.terrace-input-box{
	width: 400px;
}
</style>
