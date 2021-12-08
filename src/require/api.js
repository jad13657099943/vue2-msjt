import {
    get,
    post
} from './http';

//轮播图
export const swipe = (params) => get('adcate/list', params);
//课程分类
export const curriculum = (params) => get('type/curriculum', params);
//课程列表
export const curriculumList = (params) => get('curriculum/list', params);
//课程详情
export const CurDet=(params)=>get('curriculum/detail',params);
//线下课程报名
export const CurSign=(params)=>post('curriculum/sign',params);
//线上课程下单
export const CurOrder=(params)=>post('curriculum/order',params);
//收藏课程
export const CurCollectionAdd=(params)=>post('collection/add',params);
//删除课程收藏
export const CurCollectionDel=(params)=>post('collection/del',params);
//商品分类
export const goods = (params) => get('type/goods', params);
//商品列表
export const goodsList = (params) => get('goods/list', params);
//用户信息
export const userInfo = () => get('user/info');
//搜索记录
export const searchList = (params) => get('search/list', params);
//热门搜索
export const hot = (params) => get('search/hot', params);
//删除搜索记录
export const searchDel = (params) => post('search/del', params);
//商品详情
export const goodsDetail = (params) => get('goods/info', params);
//基础配置
export const config = (params) => get('config/config', params);
//收藏
export const collectionAdd = (params) => post('collection/add', params);
//取消收藏
export const collectionDel = (params) => post('collection/del', params);
//加入购物车
export const carAdd = (params) => post('car/add', params);
//收货地址
export const regionList = (params) => get('region/list', params);
//运费
export const freight = () => get('order/freight');
//添加地址
export const RegionAdd = (params) => post('region/set', params);
//地址列表
export const RegionList = (params) => get('region/list', params);
//下单
export const OrderSet = (params) => post('order/set', params);
//购物车列表
export const CarLists = (params) => get('car/lists',params);
//删除购物车
export const CarDel=(params)=>post('car/del',params);
//用户信息
export const UserInfo=()=>get('user/info');
//编辑用户信息
export const UserSet=(params)=>post('user/set',params);
//用户商品订单
export const UserOrder=(params)=>get('user/order',params);
//取消订单
export const UserDel=(params)=>post('user/del',params);
//订单详情
export const UserDeatil=(params)=>get('user/detail',params);
//售后列表
export const SaleList=(params)=>get('sale/lists',params);
//课程订单列表
export const UserCurList=(params)=>get('user/curriculum',params);
//取消课程订单
export const CancelCurOrder=(params)=>post('user/cancelCurriculum',params);
//收藏列表
export const CollectionList=(params)=>get('collection/lists',params);
//删除收藏
export const CollectionDel=(params)=>post('collection/del',params);
//等级制度
export const UserGrade=(params)=>get('user/grade',params);
//提交反馈信息
export const MessageSet=(params)=>post('message/set',params);
//上传图片
export const UploadImg=(params)=>post('upload/upload',params,2);
//设置默认地址
export const RegionDefault=(params)=>post('region/default',params);
//删除地址
export const RegionDel=(params)=>post('region/del',params);
//编辑地址
export const RegionUpdate=(params)=>post('region/update',params);
//提交申请
export const ApplyAdd=(params)=>post('apply/add',params);
//推广中心收益量
export const AgencyCentre=()=>get('agency/centre');
//人员统计
export const AgencyTotal=(params)=>get('agency/total',params);
//佣金明细
export const AgencyBalance=(params)=>get('agency/balance',params);
//佣金订单
export const AgencyOrder=(params)=>get('agency/order',params);
//邀请码图片
export const AdcateList=()=>get('adcate/list');