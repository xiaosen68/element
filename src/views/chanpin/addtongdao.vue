<template>
	<div class="main-box">
		<div class="zh-head">添加通道 </div>
		<div class="zh-info-box">
			<div> <div class="input-title">通道ID</div> <div class="add-td-input"><el-input maxlength="11"  clearable type="text"  v-model="tdName" placeholder=""></el-input></div></div>
			<div><div class="input-title">通道名称</div> <div class="add-td-input"><el-input   clearable type="text"  v-model="tdId" placeholder=""></el-input></div></div>
			<div><div class="input-title">通道显示名称</div> <div class="add-td-input"><el-input   clearable type="text"  v-model="tdXsName" placeholder=""></el-input></div></div>
			<div><div class="input-title add-td-title">通道状态</div> <div class="add-td-input td-status-box">
				<el-switch
				  style="display: block"
				  v-model="tdStatus"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				  active-text="使用中"
				  inactive-text="维护中">
				</el-switch>
			</div></div>
			<div><div class="input-title">通道费率</div> 
			
			<div class="add-td-input feilv-popover">
				<el-popover trigger="click" placement="top" v-model="popover">
					<div class="pop-box-item" v-for="item in tdFeilv">
						<div class="pop-input-title">{{item.name}}</div>
						<div class="pop-input-box"><el-input v-model="item.feilv"></el-input></div>
					</div>
					<div class="pop-btn-box">
						<el-button  size="mini" type="warning" @click="popover=!popover">确定</el-button>
						<el-button  size="mini" type="info"  @click="popover=!popover">取消</el-button>
					</div>
					 <el-button slot="reference" size="mini" type="success">添加</el-button>
				</el-popover>
			</div></div>
			<div><div class="input-title">通道手续费</div> <div class="add-td-input"><el-input   clearable type="text"  v-model="tdXsName" placeholder=""></el-input></div></div>
			<div><div class="input-title">通道支持银行</div> <div class="add-td-input"><el-input   clearable type="text"  v-model="tdXsName" placeholder=""></el-input></div></div>
			<div class="sign-btn" ><el-button type="primary">立即添加</el-button></div>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        tdName:'',
			tdId:'',
			tdXsName:'',
			tdStatus:true,
			popover:false,
			tdFeilv:[
				{
					name:'基础费率',
					feilv:'2.0%',
				},
				{
					name:'基础费率',
					feilv:'2.0%',
				},
				{
					name:'基础费率',
					feilv:'2.0%',
				},
				{
					name:'基础费率',
					feilv:'2.0%',
				},
				{
					name:'基础费率',
					feilv:'2.0%',
				}
			]
			
	      };
	    }
	  }
</script>

<style>
	.add-td-input{
		display: inline-block;
		width: 200px;
	}
	.td-status-box{
		margin-left: 10px;
	}
	.feilv-popover{
		margin-left: 10px;
	}
</style>
