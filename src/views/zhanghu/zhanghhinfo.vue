<template>
	<div class="main-box">
		<div class="zh-head">
			<div class="zh-head-item"><el-button autofocus plain :type="buttonTypeFn()" size="small">个人信息</el-button></div>
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人费率</el-button></div> -->
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人分润</el-button></div> -->
			<!-- <div class="zh-head-item"><el-button plain :type="buttonTypeFn()"size="small">个人积分</el-button></div> -->
		</div>
		<div class="zh-info-box">
			<div>
				<div class="zh-info-item">
					<b class="zh-info-title">注册时间：</b> <span>201010102103</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">手机号码：</b><span>201010102103</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">账户姓名：</b><span>二哈</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">实名状态：</b> <span>已实名</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">收益余额：</b><span>2329元</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">冻结金额：</b><span>0元</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">账户积分：</b><span>22222分</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">账户余额：</b><span>2888元</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">账户提现：</b><span>2999元</span>
				</div>
				<div class="zh-info-item">
					<b class="zh-info-title">额外手续费：</b><span>3元</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			info:{
				
			},
			buttonType:['success','info','warning','danger','primary']
		}
	},
	methods:{
		buttonTypeFn:function(){
			let index=Math.floor(Math.random()*5);
			return this.buttonType[index]
		}
	}
}
</script>

<style scoped="scoped">
	.main-box{
		width: 98%;
		margin: 0 auto;
		margin-top: 4px;
		min-height: 200px;
		border-top: #e7eaec 4px solid;
		background-color: #ffffff;
		text-align: left;
	}
	.zh-head{
		display: flex;
		line-height: 3em;
		font-size: 14px;
		font-weight: 600;
		padding: 0 16px;
		border-bottom: 1px solid #e7eeec;
	}
	.zh-head-item{
		margin: 10px  10px;
		width: 80px;
	}
	.zh-info-box{
		padding: 0 16px;
		line-height: 3em;
	}
	.zh-info-title{
		display: inline-block;
		width: 120px;
		text-align: right;
		margin-right: 20px;
	}
	.zh-info-item{
		/* line-height: 3em; */
		/* margin: 4px 0; */
	}
	b{
		font-weight: 400;
	}
</style>
