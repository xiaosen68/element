import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Hysign from '../views/huiyuan/hysign.vue'
import Hyinfo from '../views/huiyuan/hyinfo.vue'
import Hycaozuo from '../views/huiyuan/hycaozuo.vue'
import Zhinfo from '../views/zhanghu/zhanghhinfo.vue'
import Shiming from '../views/huiyuan/shiming.vue'
import Shimingsc from '../views/huiyuan/shimingsc.vue'
import Vipcx from '../views/huiyuan/vipcx.vue'
import Addgoods from '../views/store/addgoods.vue'
import Goodslist from '../views/store/goodslist.vue'
import Postermanage from '../views/store/postermanage.vue'
import Searchorder from '../views/store/searchorder.vue'
import Searchorderjs from '../views/store/searchorderjs.vue'
import Tongdaolist from '../views/chanpin/tongdaolist.vue'
import Addtongdao from '../views/chanpin/addtongdao.vue'
import Lookfeilv from '../views/chanpin/lookfeilv.vue'
import Dealquery from '../views/deal/dealquery.vue'
import Dealstatics from '../views/deal/dealstatistics.vue'
import Fenruninfo from '../views/deal/fenruninfo.vue'
import Addterrace from '../views/pingtai/addTerrace.vue'
import Terracelist from '../views/pingtai/terraceList.vue'
import Informationpush from '../views/chanpin/informationpush.vue'
import Blacklist from '../views/zhanghu/blackList.vue'
import Goodsclassify from '../views/store/goodsClassify.vue'
import Searchconsumeorder from '../views/store/searchconsumeorder.vue'
import Businesslist from '../views/store/businessList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
	children:[
		{
			path: 'hysign',
			component: Hysign
		},
		{
			path: 'hyinfo',
			component: Hyinfo
		},
		{
			path:'hycaozuo',
			component: Hycaozuo
		},
		{
			path:'zhinfo',
			component: Zhinfo
		},
		{
			path:'shiming',
			component: Shiming
		},
		{
			path:'shimingsc',
			component: Shimingsc
		},
		{
			path:'vipcx',
			component: Vipcx
		},
		{
			path:'addgoods',
			component: Addgoods
		},
		{
			path:'goodslist',
			component: Goodslist
		},
		{
			path:'postermanage',
			component: Postermanage
		},
		{
			path:'searchorder',
			component: Searchorder
		},
		{
			path:'searchorderjs',
			component: Searchorderjs
		},
		{
			path:'addtongdao',
			component: Addtongdao
		},
		{
			path:'tongdaolist',
			component: Tongdaolist
		},
		{
			path:'lookfeilv',
			component: Lookfeilv
		},
		{
			path:'dealquery',
			component: Dealquery
		},
		{
			path:'dealstatics',
			component: Dealstatics
		},
		{
			path:'fenruninfo',
			component: Fenruninfo
		},
		{
			path:'terracelist',
			component: Terracelist
		},{
			path:'addterrace',
			component: Addterrace
		},{
			path:'informationpush',
			component: Informationpush
		},{
			path:'blacklist',
			component: Blacklist
		},{
			path:'goodsclassify',
			component: Goodsclassify
		},
		{
			path:'searchconsumeorder',
			component:Searchconsumeorder
		},
		{
			path:'businesslist',
			component:Businesslist
		}
		
		
	]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
