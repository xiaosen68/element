<template>
	<div class="main-box">
		<div class="zh-head">添加通道 </div>
		<div class="zh-info-box">
			<div><div class="input-title">通道名称</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="passageWayName" placeholder=""></el-input></div></div>
			<div><div class="input-title">通道显示名称</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="displayName" placeholder=""></el-input></div></div>
			<div><div class="input-title add-td-title">通道状态</div> <div class="add-td-input td-status-box">
				<el-switch
				  style="display: block"
				  v-model="passageWayStatus"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				  active-text="使用中"
				  inactive-text="维护中"
				  active-value="NORMAL"
				      inactive-value="STOP">
				</el-switch>
			</div></div>
			<div><div class="input-title">通道费率</div> 
			
			<div class="add-td-input feilv-popover">
				<el-popover trigger="click" placement="top" v-model="popover">
					<div class="pop-box-item"><div class="pop-input-title">底价费率</div>
						<div class="pop-input-box"><el-input v-model="baseRate"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">创始合伙人</div>
						<div class="pop-input-box"><el-input v-model="foundingPartner"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">联合创始人</div>
						<div class="pop-input-box"><el-input v-model="coFounder"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">高级合伙人</div>
						<div class="pop-input-box"><el-input v-model="seniorPartner"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">业务合伙人</div>
						<div class="pop-input-box"><el-input v-model="businessParter"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">VIP会员</div>
						<div class="pop-input-box"><el-input v-model="vipMembers"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">普通用户</div>
						<div class="pop-input-box"><el-input v-model="ordinaryUsers"></el-input></div></div>
					<div class="pop-box-item"><div class="pop-input-title">消费率</div>
						<div class="pop-input-box"><el-input v-model="consumptionRate"></el-input></div></div>
					<div class="pop-btn-box">
						<el-button  size="mini" type="warning" @click="popover=!popover">确定</el-button>
						<el-button  size="mini" type="info"  @click="popover=!popover">取消</el-button>
					</div>
					 <el-button slot="reference" size="mini" type="success">添加</el-button>
				</el-popover>
			</div></div>
			<div><div class="input-title">通道手续费</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="singleAdditionalHandlingCharge" placeholder=""></el-input></div></div>
			<div><div class="input-title">通道支持银行</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="bankListstring" placeholder="格式为: 中国银行=ASDS,上海银行=ADSD"></el-input></div></div>
			<div><div class="input-title">单笔限额</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="singleLimit" placeholder=""></el-input></div></div>
			<div><div class="input-title">单日限额</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="oneDayLimit" placeholder=""></el-input></div></div>
			<div><div class="input-title">描述</div> <div class="add-td-input">
			<el-input   clearable type="text"  v-model="describe" placeholder=""></el-input></div></div>
			
			<div class="sign-btn" ><el-button type="primary" @click="addTongdaoFn">立即添加</el-button></div>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
			  popover:false,
	        passageWayName:'',
			displayName:'',
			passageWayStatus:'NORMAL',
			baseRate:'',
			foundingPartner:'',
			coFounder:'',
			seniorPartner:'',
			businessParter:'',
			vipMembers:'',
			ordinaryUsers:'',
			consumptionRate:'',
			singleAdditionalHandlingCharge:'',
			singleLimit:'',
			oneDayLimit:'',
			describe:'',
			bankListstring:'',
			bankList:[{
				bankCode:'',
				passageWayBankName:''
			}],
	      };
	    },
		methods:{
			getBankList(val){
				let bankListOne=val.split(",");
				return bankListOne.map((item)=>{
					if(item.split("=")[0]&&item.split("=")[1]){
						return {passageWayBankName:item.split("=")[0],bankCode:item.split("=")[1]}
					}
					
				})
			},
			addTongdaoFn(){
				console.log(this.getBankList(this.bankListstring))
				this.http.post(this.api.addPassageWay,
				{  passageWayName:this.passageWayName,
			displayName:this.displayName,
			passageWayStatus:this.passageWayStatus,
			baseRate:this.baseRate,
			foundingPartner:this.foundingPartner,
			coFounder:this.coFounder,
			seniorPartner:this.seniorPartner,
			businessParter:this.businessParter,
			vipMembers:this.vipMembers,
			ordinaryUsers:this.ordinaryUsers,
			singleAdditionalHandlingCharge:this.singleAdditionalHandlingCharge,
			singleLimit:this.singleLimit,
			oneDayLimit:this.oneDayLimit,
			describe:this.describe,
			bankList:this.getBankList(this.bankListstring)},sessionStorage.getItem('token')).then(res => {
									   if(res.code == 0){
										  console.log(res)
									   }
									}); 
			}
		}
	  }
</script>

<style>
	.add-td-input{
		display: inline-block;
		width: 400px;
	}
	.td-status-box{
		margin-left: 10px;
	}
	.feilv-popover{
		margin-left: 10px;
	}
</style>
