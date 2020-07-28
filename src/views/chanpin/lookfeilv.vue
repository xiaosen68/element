<template>
	<div class="main-box">
		<div class="zh-head">通道费率总览 </div>
		<div class="zh-info-box">
			 <el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="tdName"
			      label="通道名称"
			     >
			    </el-table-column>
			    <el-table-column
				v-for="(item, index) in tableData[0].tdFeilv"
			      prop="tdFeilv"
			      :label="item.name"
			     >
				<template slot-scope="scope">
					{{scope.row.tdFeilv[index].feilv}}
				 </template>
			    </el-table-column>
			   
			  </el-table>
		</div>
	</div>
</template>

<script>
	 export default{
		 data (){
			 return {
				 tableData:[
					 {
						 tdName:'NP消费',
						 tdId:'',
						 tdFeilv:[
							 {
								 name:'基础费率',
								 feilv:'1.2%',
							 }, {
								 name:'础费率',
								 feilv:'1.2%',
							 }, {
								 name:'1础费率',
								 feilv:'1.4%',
							 }, {
								 name:'基2础费率',
								 feilv:'1.3%',
							 }, {
								 name:'基础3费率',
								 feilv:'1.2%',
							 }
						 ]
					 }, {
						 tdName:'NP费',
						 tdId:'',
						 tdFeilv:[
							 {
								 name:'基础费率',
								 feilv:'1.33%',
							 }, {
								 name:'础费率',
								 feilv:'1.2%',
							 }, {
								 name:'1础费率',
								 feilv:'1.4%',
							 }, {
								 name:'基2础费率',
								 feilv:'1.3%',
							 }, {
								 name:'基础3费率',
								 feilv:'1.2%',
							 }
						 ]
					 }
				 ]
			 }
		 }
	 }
</script>

<style>
</style>
