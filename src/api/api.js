export default {
	login:"/api/v1/admin/login/login",
	fastRegistration:"/api/v1/admin/account/fastRegistration",//快速注册
	pageAccountList:"/api/v1/admin/account/pageAccountList",//会员列表
	pageAccountList:"/api/v1/admin/account/pageAccountList",//查看会员下级
	
	// 商城
	addMailingProduct: "/api/v1/admin/mall/addMailingProduct",//添加寄售商品
	addGeneralProduct:"/api/v1/admin/mall/addGeneralProduct",//添加消费商品
	updateMailingProduct:"/api/v1/admin/mall/updateMailingProduct",//修改寄售商品
	updateGeneralProduct:"/api/v1/admin/mall/updateGeneralProduct",//修改消费商品
	getMailingProductAll:"/api/v1/admin/mall/getMailingProductAll",//寄售商品列表
	getGeneralProductAll:"/api/v1/admin/mall/getGeneralProductAll",//消费商品列表
	// 类别管理
	generalLableAll:"/api/v1/admin/mall/generalLableAll",//标签列表
	addGeneralLable:"/api/v1/admin/mall/addGeneralLable",//新增标签
	// 产品管理
	getPassageWay:"/api/v1/admin/passageway/getPassageWay",//获取通道列表
	addPassageWayBank:"/api/v1/admin/passageway/addPassageWayBank",//新增支持银行（单个）
	updatePassageWayRate:"/api/v1/admin/passageway/updatePassageWayRate",//修改费率
	updatePassageWay:"/api/v1/admin/passageway/updatePassageWay",//修改通道信息（不包括银行卡）
	getPassageWayBankByPassageWayId:"/api/v1/admin/passageway/getPassageWayBankByPassageWayId",//查看银行卡支持列表
	getPassageWay:"/api/v1/admin/passageway/getPassageWay",//通道费率总览
	addPassageWay:"/api/v1/admin/passageway/addPassageWay",//添加通道
	
	// 账户管理
	
	backgroundQueryUser:"/api/v1/admin/account/backgroundQueryUser",//个人信息管理
	// 黑名单
	blackListUser:"/api/v1/admin/account/blackListUser",//黑名单列表
	removeBlack:"/api/v1/admin/account/removeBlack",//移除黑名单
	addBlack:"/api/v1/admin/account/addBlack",//添加黑名单
	
}
// 使用方法
  // this.http.get(this.api.login,data)
  //        .then(res => {
  //           if(res.code == 200){
  //               this.info = res.data.list
  //               this.page = res.data
  //           }
  //        });