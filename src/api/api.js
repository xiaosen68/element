export default {
	login:"/api/v1/admin/login/login",
	savePermission:"/api/v1/admin/rolePermission/savePermission",//新增菜单
	updatePermission:"/api/v1/admin/rolePermission/updatePermission",//修改菜单
	saveRole:"/api/v1/admin/rolePermission/saveRole",//新增权限
	updateRole:"/api/v1/admin/rolePermission/updateRole",//修改权限
	getPermissionByUserId:"/api/v1/admin/rolePermission/getPermissionByUserId",//初始化当前用户菜单
	getRoleById:"/api/v1/admin/rolePermission/getRoleById",//根据权限id查询权限
	setUserRole:"/api/v1/admin/rolePermission/setUserRole",//设置用户和权限的关系
	setPermissionRole:"/api/v1/admin/rolePermission/setPermissionRole",//设置权限与菜单的关系
	getPermission:"/api/v1/admin/rolePermission/getPermission",//获取菜单和子菜单列表
	// 会员管理
	fastRegistration:"/api/v1/admin/account/fastRegistration",//快速注册
	pageAccountList:"/api/v1/admin/account/pageAccountList",//会员列表
	pageAccountList:"/api/v1/admin/account/pageAccountList",//查看会员下级
	addPersonalMessage:"/api/v1/pri/meassage/addPersonalMessage",//个人信息推送
	addPlatformMessage:"/api/v1/pri/meassage/addPlatformMessage",//平台推送
	getWithdrawalAmountAll:"/api/v1/admin/account/getWithdrawalAmountAll",//查询用户提现信息
	cashWithdrawalByAudit:"/api/v1/admin/account/cashWithdrawalByAudit",//用户提现审核
	updateUserLevel:"/api/v1/admin/account/updateUserLevel",//修改用户等级
	getRole:"/api/v1/admin/rolePermission/getRole",//获取权限列表
	
	// 商城
	uploadImage:"/api/v1/admin/upload/image",//上传图片
	addMailingProduct: "/api/v1/admin/mall/addMailingProduct",//添加寄售商品
	addGeneralProduct:"/api/v1/admin/mall/addGeneralProduct",//添加消费商品
	updateMailingProduct:"/api/v1/admin/mall/updateMailingProduct",//修改寄售商品
	updateGeneralProduct:"/api/v1/admin/mall/updateGeneralProduct",//修改消费商品
	getMailingProductAll:"/api/v1/admin/mall/getMailingProductAll",//寄售商品列表
	getGeneralProductAll:"/api/v1/admin/mall/getGeneralProductAll",//消费商品列表
	setPermissionRole:"/api/v1/admin/rolePermission/setPermissionRole",//初始化消费专区订单
	
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