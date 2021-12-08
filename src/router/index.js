import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Curriculum from '../views/Curriculum'
import Shop from '../views/Shop'
import My from '../views/My'
import Search from '../views/Search'
import SearchCurriculum from '../views/SearchCurriculum.vue'
import SearchShop from '../views/SearchShop.vue'
import CurriculumCateSearch from '../views/CurriculumCateSearch.vue';
import ShopDetail from '../views/ShopDetail.vue';
import ShopBuyDetail from '../views/ShopBuyDetail.vue';
import ShopBuyRegion from '../views/ShopBuyRegion.vue';
import Region from '../views/Region.vue';
import CarList from '../views/car/List.vue';
import MyUser from '../views/my/User.vue';
import CurXia from '../views/curriculum/xianxia.vue';
import CurSha from '../views/curriculum/xianshang.vue';
import CurXiaBm from '../views/curriculum/xianxiabm.vue'
import CurShang from '../views/curriculum/xianshang.vue';
import CurBuy from '../views/curriculum/xianshangbuy.vue';
import MyShopOrder from '../views/my/shopOrder.vue';



Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/curriculum',
        component: Curriculum
    },
    {
        path: '/shop',
        component: Shop
    },
    {
        path: '/my',
        component: My
    },
    {
        path:'/search',
        component:Search
    },
    {
        path:'/searcurr',
        component:SearchCurriculum
    },
    {
        path:'/searshop',
        component:SearchShop
    },
    {
        path:'/searCateCurriculum',
        component:CurriculumCateSearch
    },
    {
        path:'/shopdetail',
        component:ShopDetail
    },
    {
        path:'/shopbuydetail',
        component:ShopBuyDetail
    },
    {
        path:'/shopbuyregion',
        component:ShopBuyRegion
    },
    {
        path:'/region',
        component:Region
    },
    {
        path:'/car',
        component:CarList
    },
    {
        path:'/my/user',
        component:MyUser
    },
    {
       path:'/my/order',
       component:MyShopOrder
    },
    {
       path:'/my/order/detail',
       component:()=>import('../views/my/shopOrderDetail.vue')
    },
    {
       path:'/my/sale',
       component:()=>import('../views/my/Sale.vue')
    },
    {
       path:'/my/collection',
       component:()=>import('../views/my/collection.vue')
    },
    {
       path:'/my/vip',
       component:()=>import('../views/my/vip.vue')
    },
    {
      path:'/my/message',
      component:()=>import('../views/my/message.vue')
    },
    {
      path:'/my/site',
      component:()=>import('../views/my/site.vue')
    },
    {
      path:'/my/site/edit',
      component:()=>import('../views/site/edit.vue')
    },
    {
      path:'/my/extension/apply',
      component:()=>import('../views/extension/apply.vue')
    },
    {
        path:'/my/extension/detail',
        component:()=>import('../views/extension/detail.vue')
    },
    {
       path:'/my/extension/total',
       component:()=>import('../views/extension/total.vue')
    },
    {
      path:'/my/extension/balance',
      component:()=>import('../views/extension/balance.vue')
    },
    {
      path:'/my/extension/order',
      component:()=>import('../views/extension/order.vue')
    },
    {
      path:'/my/extension/url',
      component:()=>import('../views/extension/url.vue')
    },
    {
       path:'/cur/order',
       component:()=>import('../views/my/curOrder.vue')
    },
    {
        path:'/cur/xia',
        component:CurXia
    },
    {
        path:'/cur/sha',
        component:CurSha
    },
    {
        path:'/cur/xia/bm',
        component:CurXiaBm
    },
    {
        path:'/cur/shang',
        component:CurShang
    },
    {
        path:'/cur/buy',
        component:CurBuy
    }

]

const router = new VueRouter({
    routes
})

export default router
